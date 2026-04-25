import { NextRequest, NextResponse } from "next/server";

type WaitlistBody = {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  submittedAt?: string;
};

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

function getZoeBackendUrl() {
  return (process.env.ZOE_API_BASE_URL || process.env.ZOE_BACKEND_URL || "").replace(/\/+$/, "");
}

async function callZoeMarketingApi(
  payload: Required<Pick<WaitlistBody, "name" | "phone" | "email" | "source">> & {
    submittedAt: string;
  },
  retries = 1
): Promise<Response> {
  const baseUrl = getZoeBackendUrl();
  if (!baseUrl) {
    throw new Error("ZOE_API_BASE_URL is not configured");
  }

  try {
    return await fetch(`${baseUrl}/api/marketing/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ZOE_MARKETING_API_KEY
          ? { "X-Zoe-Marketing-Key": process.env.ZOE_MARKETING_API_KEY }
          : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (err) {
    if (retries > 0) {
      console.warn("Zoe marketing API fetch failed, retrying in 1s...", {
        error: err instanceof Error ? err.message : String(err),
        retriesLeft: retries,
      });
      await new Promise((r) => setTimeout(r, 1000));
      return callZoeMarketingApi(payload, retries - 1);
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

    if (!name || !phone || !email) {
      return NextResponse.json(
        { ok: false, error: "Name, phone, and email are required" },
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

    const payload = {
      name,
      phone: normalizedPhone,
      email,
      source,
      submittedAt: body.submittedAt || new Date().toISOString(),
    };

    const resp = await callZoeMarketingApi(payload);
    const raw = await resp.text();
    let data: Record<string, unknown> = {};
    if (raw) {
      try {
        data = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        data = { raw };
      }
    }

    if (!resp.ok || data?.ok !== true) {
      console.error("Zoe marketing waitlist upsert failed", {
        status: resp.status,
        source,
        email,
        message: data?.error,
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Failed to save contact — please try again",
          details:
            typeof data?.error === "string"
              ? data.error
              : "Unknown Zoe marketing API error",
        },
        { status: resp.status >= 500 ? 502 : resp.status }
      );
    }

    return NextResponse.json({
      ok: true,
      contactId: typeof data.contactId === "string" ? data.contactId : null,
      segments: Array.isArray(data.segments) ? data.segments : [],
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
