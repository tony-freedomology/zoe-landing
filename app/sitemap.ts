import type { MetadataRoute } from "next";
import { SITE_URL, toAbsoluteUrl } from "../lib/site";

type SitemapEntry = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const lastModified = new Date();

// Exclude utility, checkout, and campaign-variant routes from indexing.
const routes: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/features", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/churches", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/brand-facts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides/best-discipleship-apps-2026", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides/christian-ai-tools", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides/sms-discipleship", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/ai-can-sort-your-thoughts", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys", changeFrequency: "weekly", priority: 0.8 },
  { path: "/journeys/james-deep", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/new-believer", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/rooted", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/still", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/the-examen", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/way-of-jesus", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/leadership", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/love", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/money", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/health", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/fear-anxiety", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/marriage", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/parenting", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/purpose", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/identity", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/forgiveness", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/prayer", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/faith-doubt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/work-ambition", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/grief", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/friendship", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/anger", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/wisdom", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/addiction", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/gratitude", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/patience", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/quote", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: toAbsoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
