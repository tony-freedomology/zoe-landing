// Single source for homepage pricing language.
//
// Beta is free through October 14, 2026. Starting October 15, 2026 Zoe becomes a
// paid subscription and existing beta members keep a founding price of
// $4.99/month. New-member pricing is not final, so never publish a price for
// new members here.
//
// NEEDS CONFIRMATION (Tony): whether people who join the waitlist now, but are
// admitted later, also get the $4.99 founding price. Until then the copy only
// promises the founding price to "beta members".

export const FOUNDING_PRICE = "$4.99/month";

/** Short trust line under the waitlist steps. */
export const waitlistPricingLine = "Free through Oct 14 · Beta members keep $4.99/mo";

/** Supporting line in the homepage close section. */
export const closePricingLine =
  "Zoe is free during the beta, through October 14. Beta members keep a founding price of $4.99/month after that.";

/**
 * Homepage-only override for the "How much does Zoe cost?" FAQ answer.
 * lib/mainFaqs.ts (shared with /faq) still carries the older "beta is free"
 * answer and needs the same update before October 15, 2026.
 */
export const homeCostFaqAnswer =
  "The beta is free through October 14.\n\nThe only thing we ask is that you honestly consider what would make a tool like Zoe useful to you in your walk with Jesus and give us the feedback we need to build something awesome.\n\nStarting October 15, Zoe becomes a paid subscription, because AI messages, phone delivery, and infrastructure cost real money. Beta members keep a founding price of $4.99/month.\n\nNo surprise charges. No sneaky nonsense.";
