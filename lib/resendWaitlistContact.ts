type ResendContactInput = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  source: string;
  phonePlatform?: string | null;
  typeTag: string;
  eventId: string;
};

type ResendContactResult = {
  id: string | null;
  created: boolean;
  duplicate: boolean;
  updated: boolean;
  savedWithProperties: boolean;
};

type ResendContactResponse = {
  id?: string;
  message?: string;
};

const WAITLIST_CONTACT_PROPERTIES = [
  "phone",
  "source",
  "phone_platform",
  "waitlist_type",
  "signup_event_id",
  "signup_path",
  "joined_at",
];

let waitlistContactPropertiesReady: Promise<void> | null = null;

function buildSegments() {
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID?.trim();
  return segmentId ? [{ id: segmentId }] : undefined;
}

function buildContactPayload(input: ResendContactInput) {
  return {
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    unsubscribed: false,
    properties: {
      phone: input.phone,
      source: input.source,
      phone_platform: input.phonePlatform ?? "",
      waitlist_type: input.typeTag,
      signup_event_id: input.eventId,
      signup_path: input.source.startsWith("churches-") ? "churches" : "individuals",
      joined_at: new Date().toISOString(),
    },
  };
}

function buildMinimalContactPayload(input: ResendContactInput) {
  return {
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    unsubscribed: false,
  };
}

async function readResendResponse(response: Response): Promise<ResendContactResponse> {
  const raw = await response.text();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as ResendContactResponse;
  } catch {
    return { message: raw };
  }
}

async function updateExistingContact(
  apiKey: string,
  input: ResendContactInput,
  includeProperties = true
): Promise<ResendContactResult> {
  const response = await fetch(
    `https://api.resend.com/contacts/${encodeURIComponent(input.email)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `zoe-waitlist-contact-update-${input.eventId}`,
      },
      body: JSON.stringify(
        includeProperties ? buildContactPayload(input) : buildMinimalContactPayload(input)
      ),
    }
  );

  const data = await readResendResponse(response);

  if (!response.ok) {
    throw new Error(
      `Resend waitlist contact update failed (${response.status}): ${
        data.message || "Unknown error"
      }`
    );
  }

  await addContactToSegment(apiKey, input);

  return {
    id: data.id ?? null,
    created: false,
    duplicate: true,
    updated: true,
    savedWithProperties: includeProperties,
  };
}

async function ensureWaitlistContactProperties(apiKey: string) {
  waitlistContactPropertiesReady ??= Promise.all(
    WAITLIST_CONTACT_PROPERTIES.map(async (key) => {
      const response = await fetch("https://api.resend.com/contact-properties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          type: "string",
          fallbackValue: "",
        }),
      });

      if (response.ok || response.status === 409) {
        return;
      }

      const data = await readResendResponse(response);
      const message = data.message || "";
      if (/already exists/i.test(message)) {
        return;
      }

      throw new Error(
        `Resend contact property ${key} failed (${response.status}): ${
          message || "Unknown error"
        }`
      );
    })
  ).then(() => undefined);

  try {
    await waitlistContactPropertiesReady;
  } catch (error) {
    waitlistContactPropertiesReady = null;
    throw error;
  }
}

async function addContactToSegment(apiKey: string, input: ResendContactInput) {
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID?.trim();
  if (!segmentId) {
    return;
  }

  const response = await fetch(
    `https://api.resend.com/contacts/${encodeURIComponent(
      input.email
    )}/segments/${encodeURIComponent(segmentId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `zoe-waitlist-contact-segment-${input.eventId}`,
      },
    }
  );

  if (response.ok || response.status === 409) {
    return;
  }

  const data = await readResendResponse(response);
  throw new Error(
    `Resend waitlist segment add failed (${response.status}): ${
      data.message || "Unknown error"
    }`
  );
}

export async function saveResendWaitlistContact(
  input: ResendContactInput
): Promise<ResendContactResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  try {
    await ensureWaitlistContactProperties(apiKey);
  } catch (error) {
    console.warn("Resend waitlist contact property bootstrap skipped", {
      error: error instanceof Error ? error.message : String(error),
      source: input.source,
    });
  }

  const contact = await createResendContact(apiKey, input, true);
  if (contact) {
    return contact;
  }

  console.warn("Resend waitlist contact properties skipped for fallback save", {
    source: input.source,
    email: input.email,
  });

  const fallbackContact = await createResendContact(apiKey, input, false);
  if (fallbackContact) {
    return fallbackContact;
  }

  throw new Error("Resend waitlist contact failed after full and fallback saves");
}

async function createResendContact(
  apiKey: string,
  input: ResendContactInput,
  includeProperties: boolean
): Promise<ResendContactResult | null> {
  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `zoe-waitlist-contact-${
        includeProperties ? "full" : "minimal"
      }-${input.eventId}`,
    },
    body: JSON.stringify({
      ...(includeProperties
        ? buildContactPayload(input)
        : buildMinimalContactPayload(input)),
      segments: buildSegments(),
    }),
  });

  const data = await readResendResponse(response);

  if (response.ok) {
    return {
      id: data.id ?? null,
      created: true,
      duplicate: false,
      updated: false,
      savedWithProperties: includeProperties,
    };
  }

  const message = data.message || "";
  if (response.status === 409 || /already exists/i.test(message)) {
    return updateExistingContact(apiKey, input, includeProperties);
  }

  if (includeProperties) {
    console.warn("Resend waitlist contact full save failed", {
      status: response.status,
      message,
      source: input.source,
      email: input.email,
    });
    return null;
  }

  throw new Error(
    `Resend waitlist contact failed (${response.status}): ${
      message || "Unknown error"
    }`
  );
}
