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

I'm Tony, the founder of Zoe.

You're on the beta waitlist.

We're opening Zoe in waves as we learn what actually helps and what needs work. The honest version: AI + faith is a strange thing to build around. We're not pretending it is simple. We're trying to build something genuinely useful for ordinary Christians and, eventually, the church at large.

There will be rough edges. That's the point of a beta. I'm excited to have you in the loop, and I'll be asking for real feedback as we keep going.

Toward Him daily,
Tony

P.S. Zoe is AI, which means it can make mistakes. The goal is to point people toward Jesus, Scripture, prayer, and real people, not replace them.`;
}

function buildHtml(firstName: string): string {
  const safeFirstName = escapeHtml(firstName);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>You're on the Zoe beta waitlist</title>
  </head>
  <body style="margin:0; padding:0; background:#fcf9f4; color:#1f2827; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      You are on the Zoe beta waitlist. We are opening in waves as we build carefully.
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
                <p style="margin:0 0 18px; font-size:16px; line-height:26px;">I'm Tony, the founder of Zoe.</p>
                <h1 style="margin:0 0 20px; color:#1f2827; font-size:30px; line-height:34px; letter-spacing:-0.02em; font-weight:800;">You're on the beta waitlist.</h1>
                <p style="margin:0 0 18px; font-size:16px; line-height:26px;">We're opening Zoe in waves as we learn what actually helps and what needs work. The honest version: <strong>AI + faith is a strange thing to build around.</strong> We're not pretending it is simple. We're trying to build something genuinely useful for ordinary Christians and, eventually, the church at large.</p>
                <p style="margin:0 0 22px; font-size:16px; line-height:26px;">There will be rough edges. That's the point of a beta. I'm excited to have you in the loop, and I'll be asking for real feedback as we keep going.</p>
                <p style="margin:0; font-size:16px; line-height:26px;">Toward Him daily,<br><strong>Tony</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 4px 0; color:#65706f; font-size:13px; line-height:20px;">
                P.S. Zoe is AI, which means it can make mistakes. The goal is to point people toward Jesus, Scripture, prayer, and real people, not replace them.
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
      subject: "You're on the Zoe beta waitlist",
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
