export const ZOE_START_PHONE =
  process.env.NEXT_PUBLIC_ZOE_START_PHONE ?? process.env.NEXT_PUBLIC_ZOE_SMS_NUMBER ?? "+12133314986";

export const ZOE_START_BODY = process.env.NEXT_PUBLIC_ZOE_START_BODY ?? "Hey Zoe, I'm ready to start the beta.";

export const ZOE_CONTACT_CARD_HREF = process.env.NEXT_PUBLIC_ZOE_CONTACT_CARD_HREF ?? "https://api.zoe.live/zoe.vcf";

export const ZOE_TEXT_SUPPORT_LINE = "Best on your phone. This page opens a prepared text so you can start cleanly.";

export function buildTextStartHref(address = ZOE_START_PHONE, body = ZOE_START_BODY): string {
  const separator = address.includes("?") ? "&" : "?";
  return `sms:${address}${separator}&body=${encodeURIComponent(body)}`;
}
