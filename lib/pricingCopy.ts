// Single source for homepage pricing language.
//
// Beta is free through October 14, 2026. Starting October 15, 2026 Zoe becomes a
// paid subscription. Beta members and people on the waitlist keep a founding
// price of $4.99/month (Tony, 2026-09-29). Pricing for anyone else is not
// final, so never publish another price here.

export const FOUNDING_PRICE_AMOUNT = "$4.99";
export const FOUNDING_PRICE = `${FOUNDING_PRICE_AMOUNT}/month`;

/** /subscribe?plan=beta headline. */
export const subscribeBetaLine = `Your founding beta price is ${FOUNDING_PRICE}.`;

/** Short trust line under the waitlist steps. */
export const waitlistPricingLine = "Free through Oct 14 · Beta and waitlist members keep $4.99/mo";

/** Supporting line in the homepage close section. */
export const closePricingLine =
  "Zoe is free during the beta, through October 14. Beta and waitlist members keep a founding price of $4.99/month after that.";

/** Homepage "How much does Zoe cost?" FAQ answer; keep in step with lib/mainFaqs.ts. */
export const homeCostFaqAnswer =
  "The beta is free through October 14.\n\nThe only thing we ask is that you honestly consider what would make a tool like Zoe useful to you in your walk with Jesus and give us the feedback we need to build something awesome.\n\nStarting October 15, Zoe becomes a paid subscription, because AI messages, phone delivery, and infrastructure cost real money. Beta members and everyone on the waitlist keep a founding price of $4.99/month.\n\nNo surprise charges. No sneaky nonsense.";
