# Zoe Design System

This is the official agent-facing design system for Zoe's default brand.

Use this document when designing or editing Zoe marketing pages, supporting pages, waitlist flows, church-facing pages, and shared UI. This is the handoff doc for other agents.

`jesus-red` is explicitly excluded from this system unless a task says otherwise.

## 1. Status

This is the canonical design system for Zoe's default public brand as of April 14, 2026.

Primary references:
- [docs/BRAND-SPEC.md](/Users/tony/Documents/zoe-landing/docs/BRAND-SPEC.md)
- [app/globals.css](/Users/tony/Documents/zoe-landing/app/globals.css)
- [tailwind.config.ts](/Users/tony/Documents/zoe-landing/tailwind.config.ts)

Canonical visual references in the repo:
- [components/HomePageContent.tsx](/Users/tony/Documents/zoe-landing/components/HomePageContent.tsx)
- [app/about/page.tsx](/Users/tony/Documents/zoe-landing/app/about/page.tsx)
- [app/features/page.tsx](/Users/tony/Documents/zoe-landing/app/features/page.tsx)
- [components/Navbar.tsx](/Users/tony/Documents/zoe-landing/components/Navbar.tsx)

Canonical external reference:
- Stitch project `Zoe Brand Lab`
- Reference screen: `9303d5e7daa84cedb0a697744c80bcd1`

## 2. Brand Intent

Zoe should feel:
- light
- warm
- modern
- spiritually serious without becoming dark or editorial
- premium without feeling luxurious or performative
- human and disarming, not institutionally polished

Zoe should not feel:
- corporate
- university-like
- glossy
- glassmorphic
- moody
- navy/cyan SaaS
- heavy with dark slabs and dramatic contrast

## 3. Core Rules

These are the non-negotiables.

1. The default Zoe system is light-mode only.
2. Warm oat and soft beige surfaces are preferred over stark white.
3. Jade is the primary accent and CTA color.
4. `Inter` is the dominant typeface.
5. `Newsreader` is used only as a very occasional serif trust accent.
6. Dark green sections are not the default brand language.
7. Cyan is not a primary accent in the default system.
8. Layouts should feel calm, balanced, and restrained rather than editorial.

## 4. Tokens

### CSS variables

Defined in [app/globals.css](/Users/tony/Documents/zoe-landing/app/globals.css):

| Token | Value | Use |
| --- | --- | --- |
| `--zoe-oat` | `#fcf9f4` | Default page background |
| `--zoe-surface` | `#f6f3ee` | Secondary sections |
| `--zoe-card` | `#ffffff` | Elevated cards/forms |
| `--zoe-ink` | `#1c1c19` | Main text |
| `--zoe-muted` | `#5f5e5b` | Secondary text |
| `--zoe-outline` | `#bbcac1` | Soft outlines/dividers |
| `--zoe-jade` | `#00c292` | Primary CTA/accent |
| `--zoe-jade-deep` | `#004935` | Deep jade contrast / trust accent |

### Tailwind tokens

Defined in [tailwind.config.ts](/Users/tony/Documents/zoe-landing/tailwind.config.ts):

- `bg-zoe-oat`
- `bg-zoe-surface`
- `bg-zoe-card`
- `text-zoe-ink`
- `text-zoe-muted`
- `border-zoe-outline`
- `bg-zoe-jade`
- `text-zoe-jade`
- `text-zoe-jade-deep`

### Fonts

- `font-sans` -> `Inter`
- `font-serif` -> `Newsreader`

Agents should use `font-serif` for Zoe serif accents. Do not introduce a different serif font.

## 5. Typography

### Default type hierarchy

- Primary UI/body/system: `font-sans`
- Main section headlines: bold sans with slightly tight tracking
- Buttons/nav/forms/metadata: sans only
- Serif: accent only

### Headline guidance

Default Zoe headlines should generally use:
- `font-bold`
- `tracking-tighter-editorial-relaxed` for big section headings
- `leading-[1.06]` to `leading-[1.1]`

The goal is Apple-like control with a little more warmth.

### Serif Trust Accent

This is a real part of the system and should be used occasionally.

Use serif accents for:
- short trust beats
- reflective asides
- privacy/trust micro-headings
- brief “spiritual weight” moments
- section ornaments that need warmth, not volume

Do not use serif for:
- main hero headlines
- nav
- body copy
- CTA buttons
- feature-grid titles
- long paragraphs

Recommended styling for serif trust accents:
- `font-serif`
- `italic` only when it improves softness
- `text-zoe-jade-deep` or `text-zoe-jade`
- small-to-medium size
- one controlled use per section at most

Good pattern examples:
- a short line above or between content blocks
- a small trust phrase inside a privacy section
- a single warm emphasis beat near a CTA or reflection section

Bad pattern examples:
- multiple serif headings per section
- alternating sans/serif everywhere
- turning the page into an editorial/magazine layout

## 6. Surfaces

### Page backgrounds

Preferred:
- `bg-zoe-oat`
- `bg-zoe-surface`
- white cards on warm surfaces

Avoid:
- pure white page background everywhere
- dark green full-width slabs as the default close section
- blue-gray SaaS backgrounds

### Cards

Cards should feel:
- soft
- bright
- lightly elevated
- low-drama

Use:
- warm white or white
- subtle outline
- very soft shadow
- rounded corners

Avoid:
- glassmorphism
- loud blur halos
- heavy borders
- glossy gradients

## 7. Buttons

Primary CTA:
- `bg-zoe-jade`
- `text-white`
- rounded full
- confident, flat, bright
- shadow is soft and jade-tinted, never dramatic

Do not use:
- dark text on jade CTAs
- navy CTA buttons in default Zoe
- secondary neon glows

## 8. Layout

Preferred layout behavior:
- centered or balanced composition
- generous whitespace
- precise rhythm
- clear content blocks

Spacing guidance:
- section padding usually `py-20` to `py-32`
- block spacing usually `gap-6` to `gap-10`
- card padding usually `p-6` to `p-8`

Radii:
- default premium radius is large
- common Zoe radii are around `rounded-[1.75rem]` to `rounded-[2rem]`
- pills and CTAs should often be fully rounded

## 9. Component Rules

### Navbar

- Light warm translucent nav on default pages
- Zoe SVG wordmark, not plain text
- Wordmark uses jade by default

### FAQ

- Collapsed by default
- Only question row visible until opened
- Jade accordion indicator
- Cards should be warm white with subtle outline

### Waitlist sections

- Avoid outer glass shells
- Prefer one clean inner form card
- Let whitespace and typography carry the section

### About/features close sections

- Keep them in the light Zoe system
- Avoid dark full-width closes unless a specific campaign needs it
- CTA carries the emphasis, not the background slab

## 10. Do / Don't

### Do

- use oat and surface backgrounds
- use jade for emphasis
- keep `Inter` dominant
- use serif only for trust accents
- keep shadows subtle
- prefer calm over spectacle
- preserve the feeling of a lightweight tool

### Don't

- bring back cyan as a major accent
- use navy as the main supporting color
- overuse serif
- default to dark sections
- use glassmorphism for core landing surfaces
- make Zoe feel like a bank, university, or enterprise dashboard

## 11. Implementation Notes For Agents

When editing default Zoe pages:

1. Start from existing `zoe-*` tokens before inventing new colors.
2. Prefer updating surfaces and accents over redesigning page structure.
3. If you need a serif moment, use one trust accent, not a new typography system.
4. Keep `jesus-red` untouched unless the task explicitly includes it.
5. If a page feels too editorial, remove styling flourishes before changing layout.
6. If a page feels too corporate, check for dark green slabs, navy text blocks, or hard contrast panels.

## 12. Current Gaps

This system is documented and tokenized, but not every page is fully aligned yet.

Known direction to continue:
- add occasional serif trust accents to the live site in controlled moments
- continue rolling the default system through remaining legacy pages
- gradually remove leftover cyan/navy/default-SaaS styling where it remains

