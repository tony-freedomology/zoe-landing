# Zoe Landing Agent Notes

## Journey Lesson Pages
- The canonical journey-day lesson reference is `app/journeys/lesson-preview/page.tsx` backed by `components/JourneyLessonPage.tsx`.
- Use that implementation as the source of truth when building real journey/course lesson routes.
- The visual rules for this page family live in `DESIGN.md`, section `7. Journey Lesson Pages`.
- Preserve the current palette: `#fafcfb` background, `#1f2937` primary ink, `#374151` body copy, `#00c292` accent, `#00ae84` hover, `#d97706` section labels, and `#0f1f1a` for the closing prayer block.
- Preserve the current structure: scenic hero with overlapping lesson card, rotated editorial content cards, visible `?` prompt badge, and calm field-note style comments.
- Do not reintroduce alternate prototype styles, sparkle icons, scrapbook treatments, or generic SaaS dashboard patterns for journey lesson pages.
