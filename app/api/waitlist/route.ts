import { NextRequest, NextResponse } from "next/server";
import { sendMetaLeadEvent } from "../../../lib/metaConversions";
import { saveZoeMarketingWaitlistContact } from "../../../lib/zoeMarketingWaitlist";

type WaitlistBody = {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  phonePlatform?: string;
  eventId?: string;
  eventSourceUrl?: string;
  submittedAt?: string;
  smsConsent?: boolean;
  requestedPath?: string;
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

    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";

    const typeTag = source.startsWith("churches-") ? "churches" : "individuals";

    let contactId: string | null = null;
    let resendSyncStatus: string | null = null;
    try {
      const contact = await saveZoeMarketingWaitlistContact({
        name,
        email,
        phone: normalizedPhone,
        source,
        phonePlatform,
        eventId,
        eventSourceUrl: body.eventSourceUrl,
        submittedAt: body.submittedAt ?? new Date().toISOString(),
        smsConsent: body.smsConsent ?? typeTag === "individuals",
        requestedPath: body.requestedPath?.trim() || undefined,
      });
      contactId = contact.contactId;
      resendSyncStatus = contact.resendSyncStatus;
    } catch (contactError) {
      console.error("Zoe marketing waitlist contact failed", {
        error:
          contactError instanceof Error
            ? contactError.message
            : String(contactError),
        source,
        email,
      });
      return NextResponse.json(
        { ok: false, error: "Failed to save contact — please try again" },
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
      contactId,
      resendSyncStatus,
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
