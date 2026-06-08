import { NextRequest, NextResponse } from "next/server";
import { sendMetaLeadEvent } from "../../../lib/metaConversions";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

type WaitlistBody = {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  phonePlatform?: string;
  eventId?: string;
  eventSourceUrl?: string;
};

type PhonePlatform = "iphone" | "android";

function normalizePhone(rawPhone: string): string | null {
  const digits = rawPhone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  if (digits.length >= 8 && digits.length <= 15) {
    return `+${digits}`;
  }

  return null;
}

function normalizePhonePlatform(rawPlatform?: string): PhonePlatform | null {
  const platform = rawPlatform?.trim().toLowerCase();

  if (platform === "iphone" || platform === "ios") {
    return "iphone";
  }

  if (platform === "android") {
    return "android";
  }

  return null;
}

function getClientIp(req: NextRequest): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || null;
  }

  return req.headers.get("x-real-ip");
}

async function callGHL(
  url: string,
  options: RequestInit,
  retries = 1
): Promise<Response> {
  try {
    const resp = await fetch(url, options);
    return resp;
  } catch (err) {
    if (retries > 0) {
      console.warn("GHL fetch failed, retrying in 1s...", {
        error: err instanceof Error ? err.message : String(err),
        retriesLeft: retries,
      });
      await new Promise((r) => setTimeout(r, 1000));
      return callGHL(url, options, retries - 1);
    }
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as WaitlistBody;
    const name = body.name?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const phone = body.phone?.trim() || "";
    const source = body.source?.trim() || "Zoe Landing Page";
    const phonePlatform = normalizePhonePlatform(body.phonePlatform);
    const eventId = body.eventId?.trim() || crypto.randomUUID();

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        { ok: false, error: "A valid phone number is required" },
        { status: 400 }
      );
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      console.error("GHL credentials not configured", {
        hasApiKey: !!GHL_API_KEY,
        hasLocationId: !!GHL_LOCATION_ID,
        source,
      });
      return NextResponse.json(
        { ok: false, error: "CRM integration is not configured" },
        { status: 500 }
      );
    }

    // Split name into first/last
    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    // Determine tags based on source
    const typeTag = source.startsWith("churches-") ? "churches" : "individuals";
    const tags = ["zoe-waitlist", typeTag];

    if (phonePlatform) {
      tags.push(phonePlatform);
    }

    const ghlPayload = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      phone: normalizedPhone,
      email,
      tags,
      source,
    };

    const resp = await callGHL(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: GHL_VERSION,
      },
      body: JSON.stringify(ghlPayload),
    });

    const raw = await resp.text();
    let data: Record<string, unknown> = {};
    if (raw) {
      try {
        data = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        data = { raw };
      }
    }

    if (!resp.ok) {
      console.error("GHL upsert failed", {
        status: resp.status,
        source,
        email,
        message: data?.message,
        traceId: data?.traceId,
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Failed to save contact — please try again",
          details:
            typeof data?.message === "string"
              ? data.message
              : "Unknown GoHighLevel error",
        },
        { status: 502 }
      );
    }

    try {
      await sendMetaLeadEvent({
        email,
        phone: normalizedPhone,
        firstName,
        lastName,
        eventId,
        eventSourceUrl: body.eventSourceUrl,
        source,
        userAgent: req.headers.get("user-agent"),
        ipAddress: getClientIp(req),
        fbp: req.cookies.get("_fbp")?.value,
        fbc: req.cookies.get("_fbc")?.value,
      });
    } catch (metaError) {
      console.warn("Meta CAPI Lead event failed", {
        error: metaError instanceof Error ? metaError.message : String(metaError),
        source,
      });
    }

    return NextResponse.json({
      ok: true,
      eventId,
      contactId:
        (data.contact as { id?: string } | undefined)?.id ?? null,
    });
  } catch (err) {
    console.error("Waitlist error:", {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return NextResponse.json(
      { ok: false, error: "Something went wrong — please try again" },
      { status: 500 }
    );
  }
}
