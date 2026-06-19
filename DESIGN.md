# Zoe Brand Design System: The Modern Apothecary (Bold Edition)

## 1. Overview & Creative North Star

**Creative North Star: "The Living Editorial"**

Zoe is a brand built on the intersection of ancient wisdom and modern vitality. The aesthetic rejects the frantic, high-contrast "SaaS" look in favor of a calm, premium, and restrained digital sanctuary. It should feel like high-quality matte paper—organic but precise, modern but grounded.

## 2. Color Palette

### Primary Surfaces

- **Oat (Canvas):** `#FCF9F4` — The primary background color for all screens. It provides warmth and a soft "paper" feel.
- **Surface (Layering):** `#F6F3EE` — Used for tonal background shifts and secondary sections to create depth without borders.

### Accents & Action

- **Jade (Primary Accent):** `#1DC286` — The color of vitality and action. Used for primary CTAs (pill-shaped), active states, and brand signifiers.
- **Forest (Secondary Accent):** `#007354` — Grounding and trust-oriented. Used for secondary elements or moments where a more serious tone is required.
- **Ink (Typography):** `#2d3231` — The primary "black." Never use pure #000000. This charcoal-adjacent shade feels softer and more premium.
- **Outline:** `#BBCAC1` — A subtle, muted green used sparingly for low-contrast dividers or border moments.

## 3. Typography Hierarchy

### Primary Workhorse: Plus Jakarta Sans

- **Headlines:** Use **Bold** weight with tight-but-controlled tracking. It should feel authoritative, geometric, and anchored.
- **Interface Labels:** Use Bold or SemiBold for clarity and a modern, high-end feel.
- **Default page labels:** Avoid decorative uppercase eyebrow labels above headings on the default `zoe.live` pages. If metadata is needed, keep it quieter in the supporting text instead of making it a pre-title badge.
- **Tracking:** Keep headline tracking tight, not compressed. Italic accents should use normal letter spacing so emphasized words never visually collide with the next word.

### Trust Accent: Newsreader Italic

- **Usage:** Reserved for rare captions, pull-quotes, and brand-level statements to provide warmth and an editorial "soul." Never used for functional UI labels or buttons.

## 4. Non-Negotiable Principles

### Use Whitespace Generously

Content is curated, not crowded. Minimum 48px-64px between major sections to allow the design to "breathe."

### No Gradients or Glassmorphism

Colors are solid and architectural. Depth is achieved via tonal layering (shifting between Oat and Surface), never through blurs or transparency.

### Generous Rounding

- **Cards & Sections:** Use **24px+ corner radii** to maintain a soft, friendly, and contemporary feel.
- **CTAs:** Primary buttons must be fully **pill-shaped** (rounded-full).

### Literal Iconography

Use 2px stroke icons that match the visual weight of the typography. Icons should be clear and functional, never overly illustrative or decorative.

### Solid Paper Aesthetic

The UI should feel like stacked sheets of premium cardstock. Use subtle, soft shadows (max 4% opacity) to denote elevation and hierarchy.

## 5. Visual Anchors

- **Signature CTA:** Pill-shaped, Jade (#1DC286) background with White text.
- **Tonal Card Layering:** Use slightly darker background shifts for structural division instead of heavy borders.
- **Minimalist Forms:** Clean, simple inputs with subtle Jade markers to guide the user.

## 6. Favicon

- **Default Icon:** Use the hand-drawn Jade Z on an Oat circular field from `public/images/brand/zoe-favicon-generated-z.png`.
- **Derived Assets:** Keep `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon.ico`, `public/apple-touch-icon.png`, `app/favicon.ico`, `app/icon.png`, and `app/apple-icon.png` in sync with the source mark.
- **Avoid:** Do not use the older blue square Z for the default `zoe.live` favicon.
