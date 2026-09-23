import type { Metadata } from "next";
import type { JourneyContent } from "./journeyContent";
import { journeyImagePaths, type JourneyImageSlug } from "./journeyImages";
import { pageMetadata } from "./seo";

type JourneyMetaInput = Pick<JourneyContent, "slug" | "title" | "metaDescription">;

export function journeyPath(slug: string) {
  return `/journeys/${slug}`;
}

/** Per-journey title, description, canonical, Open Graph, and Twitter card. */
export function journeyMetadata(journey: JourneyMetaInput): Metadata {
  const imagePath = journeyImagePaths[journey.slug as JourneyImageSlug];

  return pageMetadata({
    path: journeyPath(journey.slug),
    title: journey.title,
    description: journey.metaDescription,
    image: imagePath ? { url: imagePath, width: 1376, height: 768, alt: journey.title } : undefined,
  });
}
