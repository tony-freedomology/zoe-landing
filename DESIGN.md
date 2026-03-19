# Design System: Zoe Landing
**Project ID:** [Insert Stitch project ID here if needed]

## 1. Visual Theme & Atmosphere
Zoe Landing uses two related but distinct visual moods.

The `/subscribe` flow is calm, intimate, and conversion-focused. It uses warm stone neutrals, softened photographic imagery, ivory headline text, and a single confident jade accent to make the payment flow feel secure, quiet, and premium instead of transactional.

The `emerald-uni` variant is bright, academic, and editorial. It trades the warmer consumer-product softness for crisp whites, off-whites, vivid emerald actions, charcoal ink text, and restrained amber accents. The overall effect should feel like a modern university journal or a polished campus campaign site: literate, airy, and trustworthy.

## 2. Color Palette & Roles
### Subscribe Checkout
- **Warm Canvas** (`#f5f4f0`): Primary page background and the base tone that the hero image fades into.
- **Stone Halo** (`#e7ddd0`): Ambient blurred glow behind the lower section to keep the page from feeling flat.
- **Ivory Light** (`#fff8ef`): Hero logo and headline color over the darkened photography.
- **Deep Ink** (`#1c2433`): Primary text, labels, selected-tab text, and general UI foreground.
- **Primary Jade** (`#00c292`): Main action color for buttons, focus states, selected plan states, and Stripe UI emphasis.
- **Action Jade Hover** (`#00ae84`): Hover state for the main CTA.
- **Card White** (`#ffffff`): Main checkout sheet, Stripe surfaces, and selected tab backgrounds.
- **Soft Porcelain** (`#f8f7f3`): Inactive tab background.
- **Input Porcelain** (`#fbfaf7`): Phone field background and quiet card hover state.
- **Placeholder Slate** (`#8d94a5`): Placeholder and low-emphasis helper text in Stripe UI.
- **Muted Utility** (`#627070`): Disabled or waiting CTA state.
- **Error Wash** (`#f7ebed`): Error surface background.
- **Error Berry** (`#8f3441`): Inline error text on custom checkout UI.
- **Stripe Danger** (`#b64855`): Stripe-native error color.
- **Hero Scrim** (`rgba(12, 16, 20, 0.34)` to `rgba(12, 16, 20, 0.08)`): Dark overlay that keeps the hero image legible without turning it cinematic.

### Emerald University
- **Core Emerald** (`#009f52`): Primary accent for buttons, pills, links, borders, and highlight strokes.
- **Lifted Emerald** (`#00b35c`): Hover state for primary actions.
- **Deep Emerald** (`#008744`): Supporting darker emerald in the token set.
- **Vivid Emerald** (`#00c965`): Brighter emerald token available for emphasis.
- **Emerald Mist** (`#d1fae5`): Soft atmospheric tint and supportive accent wash.
- **Pure White** (`#ffffff`): Hero text, white cards, and clean high-contrast surfaces.
- **Off White** (`#fafcfb`): Main light section background for the brighter academic look.
- **Warm White** (`#f8faf9`): Secondary light background tone.
- **Primary Ink** (`#1f2937`): Main body text and dark surfaces.
- **Ink Light** (`#374151`): Supporting text.
- **Ink Medium** (`#4b5563`): Secondary iconography and subdued UI detail.
- **Slate Neutral** (`#6b7280`): General neutral support color.
- **Border Gray** (`#e5e7eb`): Default border color on cards and inputs.
- **Border Mist** (`#f3f4f6`): Lighter border tone for nav and footer separators.
- **Academic Gold** (`#d97706`): Small warm accent used where the page needs contrast against the emerald family.
- **Thesis Field** (`#0f1f1a`): Deep dark green-black used for the most serious content section.
- **Shared Jade Carryover** (`#00c292`): A brighter jade still appears in a few inherited shared components like the waitlist pill.

## 3. Typography Rules
### Subscribe Checkout
Use the serif display face for the hero headline only. It should feel devotional, soft, and elevated. All interactive UI, form copy, and price controls should stay in the sans-serif system. Headlines use tight negative tracking and large, vertically compact line-height to keep the narrow mobile layout feeling premium rather than cramped.

### Emerald University
Use an editorial serif voice for headings and a clean sans-serif for all supporting text and controls. Headings should feel thinner, more literary, and more spacious than the default site. Body copy should stay highly legible, neutral, and restrained. Small labels and pills can use uppercase text with generous tracking, but the page should never feel loud.

## 4. Component Stylings
### Buttons
Buttons should feel confident and simple.

On `/subscribe`, the primary CTA is pill-shaped, fully filled in jade (`#00c292`), with white text and a slightly luminous shadow. Disabled states flatten into muted gray-green. The main action should always read as the clearest visual anchor in the sheet.

On `emerald-uni`, primary actions use the darker, more academic emerald (`#009f52`) with a hover lift into `#00b35c`. Buttons should feel polished and institutional rather than flashy.

### Cards and Containers
The checkout sheet on `/subscribe` is a white floating panel with very large radii, a soft top shadow, and subtle warm-white gradients. It should feel like a polished physical card sliding up over the hero image.

On `emerald-uni`, cards should be crisp and bright: white or near-white surfaces, subtle gray borders, diffused shadows, and generous rounded corners. The effect is airy and premium, not glossy.

### Inputs and Forms
On `/subscribe`, inputs use pale porcelain backgrounds, centered text, soft dark-ink borders, and jade focus rings. Error states sit inside a rose-tinted wash rather than switching the whole form to red.

On `emerald-uni`, inputs should stay white with clean gray borders and a translucent emerald focus ring. Forms should read as calm and academic, not startup-neon.

## 5. Layout Principles
### Subscribe Checkout
The composition is mobile-first and vertically staged. The top half is visual and atmospheric; the bottom half is transactional. Keep the content constrained to a narrow centered column. Use rounded sheets, soft gradients, and restrained color so the user’s eye moves directly from headline to number entry to payment confirmation.

### Emerald University
The layout should feel more expansive and editorial. Use large open sections, generous vertical spacing, white and off-white canvases, and emerald accents only where hierarchy needs reinforcement. Dark sections should be rare and intentional, functioning as depth breaks rather than the dominant page style.

## 6. Implementation Notes
- Prefer semantic color naming in prompts and docs, but always attach exact hex codes.
- Preserve the distinction between the calmer checkout jade (`#00c292`) and the more academic emerald system (`#009f52` family).
- When generating new screens inspired by `emerald-uni`, bias toward white space, crisp typography, emerald accents, and restrained shadows.
- When generating new checkout or payment screens inspired by `/subscribe`, bias toward warm neutrals, soft photography overlays, ivory display text, and a single emerald action color.

## 7. Journey Lesson Pages
The canonical reference for Zoe journey-day pages is the implementation at `app/journeys/lesson-preview/page.tsx` and `components/JourneyLessonPage.tsx`.

These pages should feel like an intimate SMS deep-link destination rather than a normal marketing page. They are mobile-first, narrow, fast, and quiet. The winning direction is a scenic hero image with a floating white lesson card, airy off-white canvases, restrained asymmetry, and the brighter Zoe jade accent instead of the darker `emerald-uni` green.

### Required Visual Structure
- **Hero band with overlap**: Use a tall scenic image with soft shadow and a fade into the page background. The title/content card should overlap the lower edge of the image rather than sitting entirely below it.
- **Floating lesson sheet**: The primary lesson card should be a white or near-white glassy panel with large radii, subtle blur, and editorial serif heading treatment.
- **Editorial notes section**: Body copy should live in a lightly rotated off-white card with soft borders and an inset image strip for atmosphere.
- **Reflection prompt card**: Prompts sit in a second rotated white card. The floating badge should be a simple visible question mark, not a sparkle, emoji, or obscured decorative mark.
- **Dark prayer block**: The closing prayer uses the deepest tone on the page as a single intentional contrast moment.
- **Community reflections**: Comments should feel like pinned field notes, not a social feed. Keep them soft, readable, and mobile-first.

### Journey Lesson Palette
- **Lesson Background** (`#fafcfb`): Main page background.
- **Primary Ink** (`#1f2937`): Headings and strongest text.
- **Supporting Ink** (`#374151`): Body copy.
- **Neutral Slate** (`#6b7280`): Small metadata and helper labels.
- **Primary Jade** (`#00c292`): Accent pills, active UI, badges, and CTA.
- **Action Jade Hover** (`#00ae84`): Hover state on primary interactions.
- **Gold Accent** (`#d97706`): Small uppercase section labels.
- **Dark Prayer Field** (`#0f1f1a`): Closing prayer surface.
- **Border Gray** (`#e5e7eb`): Card borders.
- **Soft Jade Wash** (`rgba(0,194,146,0.12)` to `rgba(0,194,146,0.18)`): Tinted icon and badge backgrounds.

### Typography and Tone
- Headings use the editorial serif already established in the app.
- Supporting text stays in the sans-serif system.
- Labels can be uppercase with generous tracking, but avoid loud decorative type.
- Never use playful emojis, sparkle icons, scrapbook motifs, or childish language for this page family.

### Interaction Rules
- Assume this page is entered from SMS, so it should load cleanly without the global marketing navbar.
- Keep the experience vertically scrollable and lightweight.
- Reflection input can exist locally for prototypes, but the visual treatment should already match the eventual real comment system.
- Favor stillness over animation. Motion, if added, should be subtle and atmospheric.
