# Zoe Landing Agent Notes

## Canonical Brand Source

Before making any UI, styling, or marketing-page changes in this repo, read:
- `DESIGN.md`
- `docs/ZOE-BRAND-REFERENCE.html`

These two files define the canonical Zoe brand direction for the default site.

## Default Brand Rule

There is one canonical Zoe brand identity for default `zoe.live` work.

Do not use older prototype directions as default brand guidance.
In particular:
- do not treat `emerald-uni` as the active default visual system
- do not treat `jesus-red` as the active default visual system

Those may remain as legacy or campaign-specific surfaces, but they are not the source of truth for new default-brand work.

## Canonical Style Summary

Default Zoe is `The Modern Apothecary (Bold Edition)` with a `Living Editorial` creative north star.

Non-negotiables:
- `Plus Jakarta Sans` is the dominant typeface
- `Newsreader Italic` is only a rare trust-bearing accent
- `#FCF9F4` is the primary canvas
- `#F6F3EE` is the primary tonal layering surface
- `#1DC286` Jade is the primary CTA fill
- CTA text on Jade buttons is always white
- no gradients
- no glassmorphism
- keep the site feeling like warm, stacked premium paper

## Home Page Guidance

When restyling the default home page:
- leave the hero section structurally intact unless the task explicitly says otherwise
- leave the sticky SMS section structurally intact; only adapt typography/colors as needed
- leave the sticky rhythms environment largely intact; focus on typography and surrounding UI
- focus major visual unification work on the waitlist, FAQ, objection handling, supporting sections, and page-close treatments

## Journey Lesson Pages

- The canonical journey-day lesson reference is `app/journeys/lesson-preview/page.tsx` backed by `components/JourneyLessonPage.tsx`.
- Use that implementation as the structural source of truth when building real journey/course lesson routes.
- The visual rules for this page family live in `DESIGN.md`, section `8. Page Family Guidance`.
- Preserve the scenic hero overlap, quiet lesson-sheet feel, and intimate mobile-first structure.
- Do not reintroduce scrapbook motifs, sparkle icons, or generic SaaS dashboard patterns for journey lesson pages.
