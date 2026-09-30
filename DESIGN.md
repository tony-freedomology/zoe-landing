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
- **Mint (Highlighter):** `#BFEBD8` — Accent-only. The flat marker band behind highlighted heading phrases (see Heading Accent). Never a fill, background, or text color.

## 3. Typography Hierarchy

### Primary Workhorse: Plus Jakarta Sans

- **Headlines:** Use **Bold** weight with tight-but-controlled tracking. It should feel authoritative, geometric, and anchored.
- **Interface Labels:** Use Bold or SemiBold for clarity and a modern, high-end feel.
- **Default page labels:** Avoid decorative uppercase eyebrow labels above headings on the default `zoe.live` pages. If metadata is needed, keep it quieter in the supporting text instead of making it a pre-title badge.
- **Tracking:** Keep headline tracking tight, not compressed. Accented words keep the headline's own tracking, weight and color; the stroke or highlighter does the emphasizing.

### Heading Accent: Jade Pen Stroke + Mint Highlighter

Adopted September 30, 2026 (Tony's option "E"). It replaces the Newsreader italic accent inside headings.

- **Same type, marked by hand.** Accented words stay in Plus Jakarta Sans at the headline's weight and color. Nothing switches to a serif or italic.
- **Jade pen stroke (one per page):** the page's primary headline gets a hand-drawn Jade (`#1DC286`) stroke under its accented words, pulled from the same pen as the wordmark.
- **Mint highlighter (a handful per page):** other key phrases get a flat Mint (`#BFEBD8`) marker band sitting low on the words, like highlighting a line in your Bible. It draws in left to right as it scrolls into view, and stays static under reduced motion. Not every heading needs one.
- **Keep it rare:** one stroke per page, a few highlights. If everything is marked, nothing is.
- **On zoe.live:** `headingAccent` adds `.zoe-accent`; `<html data-accent="combo">` turns it into the stroke (inside an `h1`, or with `.zoe-accent-primary`) or the highlighter (everywhere else). The styles live in `app/globals.css`.

### Newsreader Italic: Scripture and Quotes Only

- **Usage:** Quoted Scripture and verbatim human quotes, such as a blog post's `<blockquote>` pull quote of the author's own words.
- **Never:** a decorative or emphasis accent in headings, or any functional UI label or button.

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
