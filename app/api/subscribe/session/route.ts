import { NextRequest, NextResponse } from "next/server";
import {
  getZoeApiBaseUrl,
  normalizeIndividualBillingPlan,
  normalizeUsPhoneInput,
} from "../../../../lib/subscribe";

type SubscribeBody = {
  phone?: string;
  plan?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubscribeBody;
    const phone = normalizeUsPhoneInput(body.phone);
    const plan = normalizeIndividualBillingPlan(body.plan);

    if (!phone) {
      return NextResponse.json(
        { error: "A valid US phone number is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${getZoeApiBaseUrl()}/api/billing/individual/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ phone, plan }),
    });

    const raw = await response.text();
    let data: Record<string, unknown> = {};

    if (raw) {
      try {
        data = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        data = { error: raw };
      }
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            typeof data.error === "string"
              ? data.error
              : "Unable to start checkout right now.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Subscribe session proxy failed:", err);
    return NextResponse.json(
      { error: "Unable to start checkout right now." },
      { status: 500 }
    );
  }
}
