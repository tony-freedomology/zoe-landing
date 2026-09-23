#!/usr/bin/env node
// Re-encodes oversized marketing images into lighter web variants.
// Usage: node scripts/optimize-images.mjs
// Requires the `sharp` devDependency. Safe to re-run; outputs are overwritten.
import { existsSync } from "node:fs";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const pub = (p) => path.join(root, "public", p);

const jobs = [
  // Social share image: 1200x630 JPEG (OG crawlers handle JPEG most reliably).
  { src: "images/zoe-og.png", out: "images/zoe-og.jpg", width: 1200, format: "jpeg", quality: 82 },
  // Blog hero (featured on /blog and the post itself) + an OG-friendly JPEG.
  { src: "images/blog-ai-prayer-reflex.png", out: "images/blog-ai-prayer-reflex.webp", width: 1200, format: "webp", quality: 72 },
  { src: "images/blog-ai-prayer-reflex.png", out: "images/blog-ai-prayer-reflex-og.jpg", width: 1200, format: "jpeg", quality: 78 },
  // /beta-welcome background texture.
  { src: "images/text/zoe-text-path-bg.png", out: "images/text/zoe-text-path-bg.webp", format: "webp", quality: 70 },
  // /journeys full-bleed hero poster (the JPEG stays as the OG image).
  { src: "images/journeys/journeys-hero-poster.jpg", out: "images/journeys/journeys-hero-poster.webp", format: "webp", quality: 70 },
  // /subscribe hero.
  { src: "images/generated/subscribe-hero-phone-off.jpg", out: "images/generated/subscribe-hero-phone-off.webp", format: "webp", quality: 72 },
];

async function encode({ src, out, width, format, quality }) {
  // Originals that are no longer referenced were removed after encoding;
  // skip them so the script stays re-runnable for the journey cards.
  if (!existsSync(pub(src))) {
    console.log(`skip ${src} (source removed; ${out} already committed)`);
    return;
  }
  let pipeline = sharp(pub(src));
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  pipeline = format === "jpeg" ? pipeline.jpeg({ quality, mozjpeg: true }) : pipeline.webp({ quality });
  await pipeline.toFile(pub(out));
  const [before, after] = await Promise.all([stat(pub(src)), stat(pub(out))]);
  console.log(`${src} (${Math.round(before.size / 1024)} KB) -> ${out} (${Math.round(after.size / 1024)} KB)`);
}

for (const job of jobs) {
  await encode(job);
}

// Journey card thumbnails: 640px WebP next to each 1376x768 source.
const journeyDir = pub("images/journeys");
await mkdir(path.join(journeyDir, "cards"), { recursive: true });
for (const file of await readdir(journeyDir)) {
  if (!file.endsWith(".jpg") || file.startsWith("journeys-hero")) continue;
  const name = file.replace(/\.jpg$/, "");
  await encode({
    src: `images/journeys/${file}`,
    out: `images/journeys/cards/${name}.webp`,
    width: 640,
    format: "webp",
    quality: 72,
  });
}
