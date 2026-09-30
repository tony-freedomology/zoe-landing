# Zoe Design System: The Modern Apothecary (Bold Edition)

This is the official agent-facing design system for Zoe's default brand.

Use this document when designing or editing Zoe marketing pages, supporting pages, waitlist flows, church-facing pages, and shared UI. This is the handoff doc for other agents.

Retired prototype systems are explicitly excluded from this system unless a task says otherwise.

## 1. Brand Intent

**System name:** `The Modern Apothecary (Bold Edition)`
**Creative North Star:** `The Living Editorial`

Zoe should feel:
- calm
- hopeful
- premium
- restrained
- trustworthy
- warm
- modern
- spiritually grounded
- light

Zoe should not feel:
- corporate
- university-like
- glossy
- glassmorphic
- moody
- navy/cyan SaaS
- heavy with dark slabs and dramatic contrast
- like an editorial magazine

## 2. Core Rules

These are the non-negotiables.

1. The default Zoe system is light-mode only.
2. Warm oat and soft beige surfaces are preferred over stark white.
3. Jade `#1DC286` is the primary accent and CTA fill.
4. CTA text on Jade is always white.
5. `Plus Jakarta Sans` is the dominant typeface.
6. Heading accents are a hand-drawn Jade pen stroke (one per page) and a Mint highlighter, never a serif italic. `Newsreader Italic` is only for quoted Scripture and verbatim quotes.
7. Dark green sections are not the default brand language.
8. Gradients and glassmorphism are not part of the default Zoe system.
9. Layouts should feel calm, balanced, and restrained rather than editorial.

## 3. Tokens

### Core palette

| Token | Value | Use |
| --- | --- | --- |
| `--zoe-oat` | `#FCF9F4` | Default page background |
| `--zoe-surface` | `#F6F3EE` | Secondary sections |
| `--zoe-card` | `#FFFFFF` | Elevated cards/forms |
| `--zoe-ink` | `#2d3231` | Main text |
| `--zoe-muted` | `#5F5E5B` | Secondary text |
| `--zoe-outline` | `#BBCAC1` | Soft outlines/dividers |
| `--zoe-sap` | `#1DC286` | Jade: canonical primary CTA/accent |
| `--zoe-leaf` | `#1DC286` | Alias to Jade for supporting active/link accents |
| `--zoe-forest` | `#007354` | Deeper trust-oriented accent |
| Mint | `#BFEBD8` | Highlighter band behind accented heading phrases only |

### Font roles

- `font-sans` -> `Plus Jakarta Sans`
- `font-serif` -> `Newsreader`

Agents should use `font-serif` only for quoted Scripture and verbatim quotes. Do not use it for heading accents, and do not introduce a different serif font.

## 4. Typography

### Default type hierarchy

- Primary UI/body/system: `font-sans`
- Main section headlines: bold Plus Jakarta Sans with tight-but-controlled tracking
- Buttons/nav/forms/metadata: Plus Jakarta Sans only, usually semibold or bold
- Serif: quoted Scripture and verbatim quotes only

### Headline guidance

Default Zoe headlines should generally use:
- `font-bold` or `font-extrabold`
- slightly tight tracking
- controlled line height

The goal is authoritative, geometric clarity with warmth, not literary/editorial drama.

### Heading accent: Jade pen stroke + Mint highlighter

Adopted September 30, 2026 (option "E"). It replaces the old serif italic accent.

- Accented words stay in Plus Jakarta Sans at the headline's own weight, tracking and color.
- **Jade pen stroke:** the page's one primary headline gets a hand-drawn Jade (`#1DC286`) stroke under its accented words, from the same pen as the wordmark.
- **Mint highlighter:** a handful of other key phrases get a flat Mint (`#BFEBD8`) band sitting low on the words. It draws in left to right as it scrolls into view and stays static under reduced motion.
- One stroke per page, a few highlights. Not every heading needs an accent.
- Implementation: use `headingAccent` (adds `.zoe-accent`). With `<html data-accent="combo">`, an accent inside an `h1` (or with `.zoe-accent-primary`) gets the stroke and every other accent gets the highlighter. Styles live in `app/globals.css`.

### Newsreader Italic

Use it for quoted Scripture and verbatim human quotes, plus legacy surfaces (the blog) until they're migrated. Never use it as a heading or emphasis accent, for nav, CTA buttons, feature titles, or body copy.

## 5. Surfaces

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
- large-radius corners

Avoid:
- glassmorphism
- loud blur halos
- heavy borders
- glossy gradients

## 6. Buttons

Primary CTA:
- `bg-zoe-sap`
- `text-white`
- rounded full
- confident, flat, bright
- shadow is soft and controlled, never dramatic

Do not use:
- dark text on Jade CTAs
- navy CTA buttons in default Zoe
- loud neon glows

## 7. Layout

Preferred layout behavior:
- centered or balanced composition
- generous whitespace
- precise rhythm
- clear content blocks
- calm structure over asymmetry

Spacing guidance:
- section padding usually `py-20` to `py-32`
- block spacing usually `gap-6` to `gap-10`
- card padding usually `p-6` to `p-8`

Radii:
- premium radius is large
- common Zoe radii are around `rounded-[1.75rem]` to `rounded-[2rem]`
- pills and CTAs should often be fully rounded

## 8. Component Rules

### Navbar

- light warm translucent nav on default pages
- restrained brand mark treatment
- restrained links
- Jade CTA with white text

### FAQ

- collapsed by default
- only question row visible until opened
- green accordion indicator
- cards should be warm white with subtle outline

### Waitlist sections

- avoid glass shells
- prefer one clean inner form card
- let whitespace and typography carry the section

### About/features/blog close sections

- keep them in the light Zoe system
- avoid dark full-width closes unless a specific campaign needs it
- CTA carries the emphasis, not the background slab

## 9. Page Guidance

### Preserve these sections structurally

- hero section
- sticky SMS section
- sticky rhythms environment and imagery

These can receive typography/color refinements, but not a structural reinvention.

### Priorities for unification

- opt-in / waitlist
- FAQ
- objection handling / thesis / trust beats
- about page
- blog index and blog posts
- features page
- journey marketing pages
- supporting CTA sections

## 10. Do / Don't

### Do

- use oat and surface backgrounds
- use Jade for emphasis
- keep `Plus Jakarta Sans` dominant
- use the Jade stroke and Mint highlighter for heading accents, sparingly
- keep shadows subtle
- prefer calm over spectacle
- preserve the feeling of a lightweight tool

### Don't

- bring back cyan as a major accent
- use navy as the main supporting color
- bring back serif italic accents in headings
- highlight every heading
- default to dark sections
- use glassmorphism for core landing surfaces
- make Zoe feel like a bank, university, or enterprise dashboard

## 11. Implementation Notes For Agents

When editing default Zoe pages:

1. Start from existing Zoe tokens before inventing new colors.
2. Prefer updating surfaces and accents over redesigning page structure.
3. If a heading needs emphasis, use the one Jade stroke or a Mint highlight, not a serif or a new typography system.
4. Keep retired prototype systems untouched unless the task explicitly includes them.
5. If a page feels too editorial, remove flourish before changing layout.
6. If a page feels too corporate, check for dark panels, navy text systems, or hard contrast sections.

