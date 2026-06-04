# Zoe Discoverability Notes

This repo keeps search and LLM discoverability grounded in the same public facts the site already shows.

## Current Technical Signals

- `app/robots.ts` allows normal crawlers and explicitly allows `OAI-SearchBot`, `GPTBot`, `ClaudeBot`, and `PerplexityBot` while keeping `/api/` disallowed.
- `app/sitemap.ts` lists the canonical public discovery routes and excludes utility, checkout, and campaign-variant routes.
- `public/llms.txt` provides a short machine-readable index of canonical Zoe pages and product facts. Treat it as a convenience file, not a guaranteed ranking or citation signal.
- `app/layout.tsx` emits global `Organization`, `SoftwareApplication`, and `WebSite` JSON-LD.
- `components/BlogArticleShell.tsx` emits `Article` and `BreadcrumbList` JSON-LD for blog posts using the visible title, deck, author, and route path.
- Guide pages emit `FAQPage` JSON-LD where visible FAQ content exists, plus `BreadcrumbList` JSON-LD.
- The FAQ route emits `FAQPage` JSON-LD from the visible FAQ list.

## Copy Boundary

Discoverability work should not rewrite public-facing website copy by default. Prefer metadata, canonical URLs, structured data that matches visible content, sitemap/robots changes, and documentation.

## Pricing Page Status

A public `/pricing` route is intentionally not added by this tranche. Existing source files contain mixed pricing references and a pricing page would require a product/copy decision. Add it only when pricing truth is approved for public display.
