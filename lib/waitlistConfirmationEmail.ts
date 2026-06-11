type WaitlistConfirmationInput = {
  email: string;
  firstName: string;
  eventId: string;
  source: string;
};

type WaitlistConfirmationResult = {
  sent: boolean;
  id?: string;
  skippedReason?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFirstName(value: string): string {
  return value.trim().split(/\s+/)[0] || "there";
}

function toResendTagValue(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 256) || "unknown";
}

function buildText(firstName: string): string {
  return `Hey ${firstName},

You're on the Zoe beta list! Nice.

Thanks for signing up. We're inviting people in small waves because Zoe is still early, and we don't want to go faster than we can actually get useful feedback.

Zoe is AI that helps you walk with Jesus through scripture, prayer, reflection, and small moments of follow-through. It's not trying to be a pastor, therapist, or another app to manage. It's just trying to help you turn your attention toward Him.

Quick question: what made you want to try Zoe?

Just hit reply and tell me in a sentence or two. I'm reading every email that comes in, because YOU are who we're building this for.

When we open your wave, we'll send the next step. Until then, thanks for being willing to test weird early stuff with us.

- Tony

P.S. Zoe is AI, which means it can make mistakes. The goal is to point you toward Jesus, scripture, prayer, and real people, not replace them.`;
}

function buildHtml(firstName: string): string {
  const safeFirstName = escapeHtml(firstName);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>You're on the Zoe beta list</title>
  </head>
  <body style="margin:0; padding:0; background:#fcf9f4; color:#1f2827; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      Thanks for signing up. Quick question: what made you want to try Zoe?
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fcf9f4; border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:28px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; border-collapse:collapse;">
            <tr>
              <td style="padding:0 0 22px;">
                <img src="https://www.zoe.live/images/email/zoe-logo-email.png" alt="Zoe" width="92" style="display:block; width:92px; height:auto; border:0;">
              </td>
            </tr>
            <tr>
              <td style="background:#fffdfa; border:1px solid #ded8cc; border-radius:18px; padding:32px 28px;">
                <p style="margin:0 0 18px; font-size:16px; line-height:26px;">Hey ${safeFirstName},</p>
                <h1 style="margin:0 0 20px; color:#1f2827; font-size:30px; line-height:34px; letter-spacing:-0.02em; font-weight:800;">You're on the Zoe beta list! Nice.</h1>
                <p style="margin:0 0 18px; font-size:16px; line-height:26px;">Thanks for signing up. We're inviting people in small waves because Zoe is still early, and we don't want to go faster than we can actually get useful feedback.</p>
                <p style="margin:0 0 18px; font-size:16px; line-height:26px;">Zoe is AI that helps you walk with Jesus through scripture, prayer, reflection, and small moments of follow-through. It's not trying to be a pastor, therapist, or another app to manage. It's just trying to help you turn your attention toward Him.</p>
                <p style="margin:0 0 18px; font-size:16px; line-height:26px;"><strong>Quick question: what made you want to try Zoe?</strong></p>
                <p style="margin:0 0 18px; font-size:16px; line-height:26px;">Just hit reply and tell me in a sentence or two. I'm reading every email that comes in, because <strong>YOU</strong> are who we're building this for.</p>
                <p style="margin:0 0 22px; font-size:16px; line-height:26px;">When we open your wave, we'll send the next step. Until then, thanks for being willing to test weird early stuff with us.</p>
                <p style="margin:0; font-size:16px; line-height:26px;">- Tony</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 4px 0; color:#65706f; font-size:13px; line-height:20px;">
                P.S. Zoe is AI, which means it can make mistakes. The goal is to point you toward Jesus, scripture, prayer, and real people, not replace them.
              </td>
            </tr>
            <tr>
              <td style="padding:18px 4px 0; color:#7a8583; font-size:12px; line-height:18px;">
                Zoe, zoe.live
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendWaitlistConfirmationEmail(
  input: WaitlistConfirmationInput
): Promise<WaitlistConfirmationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.WAITLIST_CONFIRMATION_FROM ||
    process.env.RESEND_FROM_EMAIL ||
    "";
  const replyTo =
    process.env.WAITLIST_CONFIRMATION_REPLY_TO ||
    process.env.WAITLIST_REPLY_TO ||
    "tony@zoe.live";

  if (!apiKey) {
    return { sent: false, skippedReason: "RESEND_API_KEY is not configured" };
  }

  if (!from) {
    return {
      sent: false,
      skippedReason: "WAITLIST_CONFIRMATION_FROM or RESEND_FROM_EMAIL is not configured",
    };
  }

  const firstName = getFirstName(input.firstName);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `zoe-waitlist-${input.eventId}`,
    },
    body: JSON.stringify({
      from,
      to: [input.email],
      reply_to: replyTo,
      subject: "You're on the Zoe beta list",
      html: buildHtml(firstName),
      text: buildText(firstName),
      tags: [
        { name: "source", value: toResendTagValue(input.source) },
        { name: "kind", value: "waitlist-confirmation" },
      ],
    }),
  });

  const raw = await response.text();
  let data: { id?: string; message?: string } = {};

  if (raw) {
    try {
      data = JSON.parse(raw) as { id?: string; message?: string };
    } catch {
      data = { message: raw };
    }
  }

  if (!response.ok) {
    throw new Error(
      `Resend waitlist confirmation failed (${response.status}): ${
        data.message || "Unknown error"
      }`
    );
  }

  return { sent: true, id: data.id };
}
