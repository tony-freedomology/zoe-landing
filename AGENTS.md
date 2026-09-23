# Zoe Landing Agent Notes

## Canonical Brand Source

Before making any UI, styling, or marketing-page changes in this repo, read:
- `docs/zoe-product-and-brand-brief.md`
- `DESIGN.md`
- `docs/ZOE-BRAND-REFERENCE.html`

These files define the canonical Zoe product, voice, and visual direction for the default site. The product and brand brief mirrors the backend repo's source-of-truth copy at `/Users/tony/Documents/zoe/docs/zoe-product-and-brand-brief.md`.

## Default Brand Rule

There is one canonical Zoe brand identity for default `zoe.live` work.

Do not use older prototype directions as default brand guidance.
In particular:
- do not treat `emerald-uni` as the active default visual system
- do not treat the retired red prototype as an active default, campaign, or routing surface

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

The default home page (`app/page.tsx` -> `components/home/HomeDefault.tsx`) was redesigned in September 2026 from a prototype Tony approved. Preserve its structure, copy, and behavior unless a task explicitly says otherwise. `components/HomePageContent.tsx` is now legacy and only serves `/emerald-uni`.

Section order (each in `components/home/`):
1. `HomeHero` — layered scenic art (`public/assets/home/*.webp`), the original tapered `ZoeSVG` canvas-pressure wordmark that crossfades to the calligraphic fill (reuse `ZoeSVG` as-is), H1 "Walk with Jesus." plus the one-line subline, Jade CTA + "See one day with Zoe". Desktop: mouse parallax. Phones (<760px): the stage is `heroHeight * 2.2857` wide and eases from the man (f=.30) to the cross (f=.64) over 11s after a 1.4s delay, with per-layer pan factors and the tree shift/drop. Reduced motion: static, framed on the man.
2. `HomeThesis` — "AI that helps you walk with Jesus more consistently." with Tony's byline, the tension card, and the "Here's one ordinary day with Zoe." cue. No signup form here.
3. `DayScene` — ONE sticky scroll scene (520vh track, 100svh stage) that replaced the old sticky SMS + rhythms sections: dawn→noon→night sky, sun/moon/stars, hills tint, rail (desktop) or time chip (mobile), three copy beats, and a phone thread revealed by scroll thresholds with a typing indicator, the 1:48 PM banner, the "From 7:04 AM" memory chip, and the evening prayer-list reminder. Everything is written to the DOM from one rAF scroll handler; do not move it to React state per frame. Mobile: copy card on top, phone below, tucked off the bottom edge.
4. `PrayerSection` — "Remember the people you're praying for." Zoe helps people remember to pray and follows up; it never prays for them or claims to.
5. `JourneysSection` — two-row marquee of readable cards (titles/durations from `lib/journeyCatalog.ts`, deduped by slug). Thumbnails always show the full 16:9 art (`aspect-[1376/768]`), never cropped.
6. `HomeWaitlist` (`id="waitlist"`) — the real signup: POST `/api/waitlist` with the canonical payload, one retry, Meta lead tracking, `signupConfirmation` states, inline per-field errors (the button is never disabled for validation), and the exact SMS consent text with Privacy/Terms links. `scripts/direct-beta-admission-copy.test.mjs` guards it.
7. `PrivacySection` — four cards (just you / your church) and the privacy-policy link.
8. `HomeFaq` — seven questions from `lib/mainFaqs.ts` verbatim (native `details/summary`) plus "See all questions" -> `/faq`. Do not edit `MainFaqPanel` for the home page; it belongs to `/faq`.
9. `CloseSection` — "Toward Him daily." then the sitewide `Footer`, then the mobile-only `FloatingCta` (hidden over the day scene, the waitlist, and the footer).

Other rules:
- Pricing language lives in `lib/pricingCopy.ts`; change it there, not inline.
- Jade `#1DC286` for accents and CTAs; Forest only for small text. Zoe's sample texts are warm and use face emoji; Zoe never speaks for God.
- The navbar (`components/Navbar.tsx`) is a floating Oat pill with the Jade vector wordmark (`components/ZoeMark.tsx`), identical over the hero and when scrolled, sitewide.
- Performance: only hero layers load eagerly; everything below the fold is lazy. Keep the home page well under 2 MB transferred.

## Journey Lesson Pages

- The canonical journey-day lesson reference is `app/journeys/lesson-preview/page.tsx` backed by `components/JourneyLessonPage.tsx`.
- Use that implementation as the structural source of truth when building real journey/course lesson routes.
- The visual rules for this page family live in `DESIGN.md`, section `8. Page Family Guidance`.
- Preserve the scenic hero overlap, quiet lesson-sheet feel, and intimate mobile-first structure.
- Do not reintroduce scrapbook motifs, sparkle icons, or generic SaaS dashboard patterns for journey lesson pages.

