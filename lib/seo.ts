import type { Metadata } from "next";

export const DEFAULT_OG_IMAGE = {
  url: "/images/zoe-og.jpg",
  width: 1200,
  height: 630,
  alt: "Zoe: AI that helps you walk with Jesus, by text",
};

type OgImage = { url: string; width?: number; height?: number; alt?: string };

type SocialOptions = {
  /** Canonical path, e.g. "/journeys". Also used as og:url. */
  path: string;
  /** Page title as passed to `metadata.title` (template "%s | Zoe" is applied by the root layout). */
  title: string;
  description: string;
  /** Use the title verbatim (no "| Zoe" suffix) for <title> and social titles. */
  absoluteTitle?: boolean;
  image?: string | OgImage;
  type?: "website" | "article";
};

function socialTitle(title: string, absolute?: boolean) {
  if (absolute || /\bZoe\b/.test(title)) return title;
  return `${title} | Zoe`;
}

/**
 * Builds per-page metadata with its own canonical, Open Graph, and Twitter card.
 * Next.js replaces (does not deep-merge) `openGraph` / `twitter` objects from the
 * root layout, so every indexable page should supply a complete set.
 */
export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle,
  image,
  type = "website",
}: SocialOptions): Metadata {
  const ogImage: OgImage = !image ? DEFAULT_OG_IMAGE : typeof image === "string" ? { url: image } : image;
  const shareTitle = socialTitle(title, absoluteTitle);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: "Zoe",
      type,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage.url],
    },
  };
}

/**
 * Adds Open Graph + Twitter tags to an existing metadata object, deriving title,
 * description, and og:url from its `title`, `description`, and
 * `alternates.canonical`. Any `openGraph` / `twitter` keys already present win.
 */
export function withSocial(
  meta: Metadata,
  options: { image?: string | OgImage; type?: "website" | "article" } = {},
): Metadata {
  const rawTitle = meta.title;
  const absolute = typeof rawTitle === "object" && rawTitle !== null && "absolute" in rawTitle;
  const title =
    typeof rawTitle === "string" ? rawTitle : absolute ? String((rawTitle as { absolute: string }).absolute) : "Zoe";
  const canonical = meta.alternates?.canonical;
  const path = typeof canonical === "string" ? canonical : canonical instanceof URL ? canonical.pathname : "/";
  const existingOgImages = meta.openGraph?.images;
  const firstExisting = Array.isArray(existingOgImages) ? existingOgImages[0] : existingOgImages;
  const image =
    options.image ??
    (typeof firstExisting === "string"
      ? firstExisting
      : firstExisting && typeof firstExisting === "object" && "url" in firstExisting
        ? { ...(firstExisting as OgImage), url: String((firstExisting as OgImage).url) }
        : undefined);

  const social = pageMetadata({
    path,
    title,
    description: meta.description ?? "",
    absoluteTitle: absolute,
    image,
    type: options.type,
  });

  return {
    ...meta,
    openGraph: { ...social.openGraph, ...meta.openGraph, images: social.openGraph?.images },
    twitter: { ...social.twitter, ...meta.twitter, images: social.twitter?.images },
  } as Metadata;
}

export const NOINDEX_ROBOTS: Metadata["robots"] = { index: false, follow: true };
