import { breadcrumbSchema } from "../lib/site";
import { journeyPath } from "../lib/journeyMetadata";

/** BreadcrumbList JSON-LD for a journey detail page: Home > Journeys > {title}. */
export default function JourneyJsonLd({ journey }: { journey: { slug: string; title: string } }) {
  const schema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Journeys", path: "/journeys" },
    { name: journey.title, path: journeyPath(journey.slug) },
  ]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
