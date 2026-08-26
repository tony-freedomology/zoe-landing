type ZoeMarketingWaitlistInput = {
  name: string;
  phone: string;
  email: string;
  source: string;
  phonePlatform?: "iphone" | "android" | null;
  eventId: string;
  eventSourceUrl?: string;
  submittedAt: string;
  smsConsent?: boolean;
  timezone?: string | null;
};

type ZoeMarketingWaitlistResult = {
  contactId: string | null;
  resendSyncStatus: string | null;
};

function getZoeApiBaseUrl() {
  return (process.env.ZOE_API_BASE_URL ?? "https://api.zoe.live").replace(/\/+$/, "");
}

function getMarketingApiKey() {
  return process.env.ZOE_MARKETING_API_KEY?.trim() || process.env.MARKETING_API_KEY?.trim() || "";
}

export async function saveZoeMarketingWaitlistContact(
  input: ZoeMarketingWaitlistInput
): Promise<ZoeMarketingWaitlistResult> {
  const marketingApiKey = getMarketingApiKey();
  if (!marketingApiKey) {
    throw new Error("ZOE_MARKETING_API_KEY is not configured");
  }
  const isChurchLead = input.source.startsWith("churches-");
  const backendSource = isChurchLead ? "churches-waitlist" : input.source;

  const response = await fetch(`${getZoeApiBaseUrl()}/api/marketing/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Zoe-Marketing-Key": marketingApiKey,
    },
    body: JSON.stringify({
      name: input.name,
      phone: input.phone,
      email: input.email,
      source: backendSource,
      submittedAt: input.submittedAt,
      phonePlatform: input.phonePlatform ?? undefined,
      eventId: input.eventId,
      eventSourceUrl: input.eventSourceUrl,
      smsConsent: input.smsConsent,
      metadata: {
        phonePlatform: input.phonePlatform ?? undefined,
        signupEventId: input.eventId,
        smsConsent: input.smsConsent,
        signupPath: isChurchLead ? "churches" : "individuals",
        landingSource: input.source,
        timezone: input.timezone ?? undefined,
      },
    }),
  });

  const raw = await response.text();
  let data: Record<string, unknown> = {};
  if (raw) {
    try {
      data = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      data = { raw };
    }
  }

  if (!response.ok) {
    throw new Error(
      `Zoe marketing waitlist save failed (${response.status}): ${
        typeof data.error === "string" ? data.error : "Unknown error"
      }`
    );
  }

  return {
    contactId: typeof data.contactId === "string" ? data.contactId : null,
    resendSyncStatus: typeof data.resendSyncStatus === "string" ? data.resendSyncStatus : null,
  };
}
