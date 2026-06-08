import crypto from "crypto";

const GRAPH_API_VERSION = "v24.0";

type MetaLeadEventInput = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  eventId: string;
  eventSourceUrl?: string;
  source: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  fbp?: string;
  fbc?: string;
};

function hashForMeta(value: string): string | undefined {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function hashPhoneForMeta(value: string): string | undefined {
  const normalized = value.replace(/[^\d]/g, "");
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function withoutUndefined<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== "")
  ) as T;
}

export async function sendMetaLeadEvent(input: MetaLeadEventInput): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return;
  }

  const userData = withoutUndefined({
    em: hashForMeta(input.email),
    ph: hashPhoneForMeta(input.phone),
    fn: hashForMeta(input.firstName),
    ln: hashForMeta(input.lastName),
    client_ip_address: input.ipAddress ?? undefined,
    client_user_agent: input.userAgent ?? undefined,
    fbp: input.fbp,
    fbc: input.fbc,
  });

  const payload = withoutUndefined({
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl,
        user_data: userData,
        custom_data: {
          content_name: input.source.startsWith("churches")
            ? "Zoe church pilot"
            : "Zoe waitlist",
          content_category: input.source,
        },
      },
    ],
    test_event_code: process.env.META_CONVERSIONS_API_TEST_EVENT_CODE,
  });

  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Meta CAPI Lead event failed (${response.status}): ${errorText}`);
  }
}
