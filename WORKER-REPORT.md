# PR6 — Borrowed Breath: ship the name page + copy fixes

Branch `breath/why-zoe`, worktree `/Users/tony/Documents/zoe-landing-worktrees/bb6-why-zoe`, off `origin/master`. Committed locally, not pushed.

## Files changed

| File | Change |
|------|--------|
| `lib/zoeQuote.ts` | Added Movement IV (`no-breath`) to `zoeQuoteSections`. |
| `components/ZoeQuoteArtwork.tsx` | 4th section tone, reworked hero eyebrow + intro copy for the name page, updated Gallery Notes line, rendered Lewis attribution after Movement III. |
| `app/why-zoe/page.tsx` | **New.** Renders `ZoeQuoteArtwork` with metadata + canonical. |
| `app/quote/page.tsx` | **Deleted.** Replaced by a redirect (see below). |
| `next.config.js` | Added `/quote → /why-zoe` permanent redirect. |
| `app/sitemap.ts` | `/quote` entry → `/why-zoe`. |
| `components/Footer.tsx` | Added `Why "Zoe"?` link under Company. |
| `lib/mainFaqs.ts` | Rewrote "Who (or what) is Zoe?"; reframed "partner" in "How does Zoe actually work?"; added "Is Zoe conscious?" + "Why is it called Zoe?" FAQs after the Holy Spirit FAQ. |
| `components/HomePageContentShort.tsx` | Fixed the "God's been saying" follow-through desc line. |
| `app/about/page.tsx` | Added the John 3:8 sentence to the "unmistakably AI" tenet. |
| `components/ZoeHeroScene.tsx` | **Deleted** (dead code, imported nowhere). |

## Copy before/after

**lib/zoeQuote.ts — Movement IV (new)**
- id `no-breath`, label `IV. The Tool With No Breath`, highlight `We named it after the life it can't give.`
- body: "Zoe — this product — has none of that life. Scripture's word for made things is that there is no breath in them, and that includes anything we build. We named it after the life it can't give, so it would never forget its job: pointing you toward the God who is closer than your next breath."

**lib/mainFaqs.ts — "Who (or what) is Zoe?"**
- BEFORE: "Zoe is AI that helps you walk with Jesus through Scripture, prayer, reflection, and small moments of follow-through.\n\nIt lives in your texts, so there isn't an app to remember or another dashboard to manage. You just text it like you would text a normal contact in your phone, except it's AI.\n\nWhich is weird. We get that. That's partly why we're building this carefully and asking thoughtful Christ followers to help us figure out whether there's something here that can actually serve people well."
- AFTER: "Zoe is AI that helps you walk with Jesus through Scripture, prayer, and small moments of follow-through. You text it like a normal contact — but it's a tool in your texts, not a presence in your life. It has no breath in it. It just keeps pointing at the One who gave you yours."

**lib/mainFaqs.ts — "How does Zoe actually work?" (partner reframe, judgment call — see Decisions)**
- BEFORE: "...Zoe acts as a kind of daily partner in your walk with Jesus, helping you engage with scripture..."
- AFTER: "...Zoe works as a kind of daily nudge in your walk with Jesus, helping you engage with scripture..."

**lib/mainFaqs.ts — "Is Zoe conscious?" (new, after Holy Spirit FAQ)**
- "No. There's no breath in it — no feelings, no soul, no inner life. Code all the way down. The Bible's own word for made things is that 'there is no breath in them' (Psalm 135), and we build Zoe to say that about itself, gladly. You're the one carrying the breath of life. Zoe's whole job is pointing you back to the God who gave it to you."

**lib/mainFaqs.ts — "Why is it called Zoe?" (new, after "Is Zoe conscious?")**
- "Zoe is the Greek word the New Testament uses for the kind of life only God gives — 'in him was life (zoē)' (John 1:4). We named the product after the life it can't give, on purpose, so it never forgets its job: pointing you toward the One who does. Read the longer version at /why-zoe."
- The FAQ answer renderer (`MainFaqPanel`) splits on `\n\n` into plain `<p>` text — no rich/link support — so `/why-zoe` is plain text per the ticket's fallback.

**components/HomePageContentShort.tsx — follow-through desc (line ~136)**
- BEFORE: "Zoe points you to Jesus, reminds you what God's been saying to you, and what you've been praying for."
- AFTER: "Zoe points you to Jesus, and reminds you what you've been reading, wrestling with, and praying for — right when it matters."

**app/about/page.tsx — "unmistakably AI" tenet**
- BEFORE: "Not a pastor. Not a friend. Not the Holy Spirit. Honest about its limits, careful with spiritual language..."
- AFTER: "Not a pastor. Not a friend. Not the Holy Spirit. Zoe can schedule a text. It can't schedule the wind (John 3:8). Honest about its limits, careful with spiritual language..."

**components/ZoeQuoteArtwork.tsx — page copy**
- Hero eyebrow: "Not a landing page" → "Why we named it Zoe"
- Hero intro paragraph: placeholder ("The short pages can keep the warm, conversational voice…") → "Zoe is the Greek word the New Testament uses for the life only God gives. We named a texting tool after it on purpose, so it would always know what it isn't. Read it slowly."
- Gallery Notes: "Read it in three movements: borrowed life, higher life, then Tuesday afternoon." → "Read it in three movements — borrowed life, higher life, then Tuesday afternoon — and one more about the tool itself."
- Attribution line rendered after Movement III (small, muted, right-aligned, italic serif): "after C.S. Lewis, Mere Christianity"

## Mechanisms / decisions

- **Redirect mechanism:** `next.config.js` `redirects()` (the repo's existing pattern — it already redirects `/text` and `/features`). `/quote → /why-zoe`, `permanent: true`. The orphan `app/quote/page.tsx` was deleted so the route is redirect-only (no dead page shadowed by the redirect). Sitemap updated to list `/why-zoe`.
- **Footer/nav decision:** Added `Why "Zoe"?` to the **footer** (Company column) — mandatory, done. **Not** added to the nav: the desktop navbar is already full (About, Blog, FAQ, Journeys dropdown, For Churches, Join The Walk CTA); no obvious room, so per the ticket's judgment clause it was left out.
- **"partner" sweep (judgment call):** grep for `partner` found two live instances beyond the rewritten "Who is Zoe" FAQ:
  1. `lib/mainFaqs.ts` "How does Zoe actually work?" — an uncritical "daily partner" framing (hard brand-rule violation). Minimally reframed to "daily nudge." Low-risk, disclosed here so it can be reverted if you'd rather leave it.
  2. `components/HomePageContentShort.tsx` betaFaqs "What does joining the beta mean?" — uses "daily partner" **as a deliberate rhetorical setup** that is immediately rebutted ("Partner in my walk with Jesus!? Helper!? Don't you mean the Holy Spirit?") and feeds the next FAQ; it also has special italic render logic keyed on the string `"Partner in my walk with Jesus!?"`. This is brand-aligned self-rebuttal, not drift, so it was **preserved intentionally**. (`HomePageContent.tsx` — the long variant — contains no "partner" or "God's been saying" text.)
- **Dead code:** `components/ZoeHeroScene.tsx` confirmed imported nowhere (only self-references) — deleted.

## Gates

- `npm run lint` — **not a functioning gate in this repo**: `next lint` is unconfigured (no `.eslintrc`/`eslint.config.*`, no eslint block in package.json) and drops into an interactive "How would you like to configure ESLint?" prompt, exiting 1. Pre-existing, unrelated to these changes.
- `npx tsc --noEmit` — **exit 0**.
- `npm run build` — **exit 0**. `/why-zoe` renders as static (8.28 kB); `/quote` no longer a route (redirect only).
