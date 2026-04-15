# Zoe Design System: The Modern Apothecary (Bold Edition)

This is the official agent-facing design system for Zoe's default brand.

Use this document when designing or editing Zoe marketing pages, supporting pages, waitlist flows, church-facing pages, and shared UI. This is the handoff doc for other agents.

`jesus-red` is explicitly excluded from this system unless a task says otherwise.

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
6. `Newsreader Italic` is used only as a very occasional serif trust accent.
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
| `--zoe-ink` | `#1C1C19` | Main text |
| `--zoe-muted` | `#5F5E5B` | Secondary text |
| `--zoe-outline` | `#BBCAC1` | Soft outlines/dividers |
| `--zoe-sap` | `#1DC286` | Jade: canonical primary CTA/accent |
| `--zoe-leaf` | `#1DC286` | Alias to Jade for supporting active/link accents |
| `--zoe-forest` | `#166534` | Deeper trust-oriented accent |

### Font roles

- `font-sans` -> `Plus Jakarta Sans`
- `font-serif` -> `Newsreader`

Agents should use `font-serif` only for rare trust accents. Do not introduce a different serif font.

## 4. Typography

### Default type hierarchy

- Primary UI/body/system: `font-sans`
- Main section headlines: bold Plus Jakarta Sans with tight-but-controlled tracking
- Buttons/nav/forms/metadata: Plus Jakarta Sans only, usually semibold or bold
- Serif: accent only

### Headline guidance

Default Zoe headlines should generally use:
- `font-bold` or `font-extrabold`
- slightly tight tracking
- controlled line height

The goal is authoritative, geometric clarity with warmth, not literary/editorial drama.

### Serif trust accent

This is a real part of the system and should be used occasionally.

Use serif accents for:
- short trust beats
- reflective asides
- privacy/trust micro-headings
- brief spiritual-weight moments
- small brand-level statements like `quiet by design`

Do not use serif for:
- main hero headlines
- nav
- body copy
- CTA buttons
- feature-grid titles
- long paragraphs

Recommended styling:
- `font-serif`
- `italic`
- `text-zoe-forest` or `text-zoe-leaf`
- small-to-medium size
- one controlled use per section at most

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

1. Start from existing Zoe tokens before inventing new colors.
2. Prefer updating surfaces and accents over redesigning page structure.
3. If you need a serif moment, use one trust accent, not a new typography system.
4. Keep `jesus-red` untouched unless the task explicitly includes it.
5. If a page feels too editorial, remove flourish before changing layout.
6. If a page feels too corporate, check for dark panels, navy text systems, or hard contrast sections.
