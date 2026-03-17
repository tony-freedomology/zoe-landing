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
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog/what-is-sms-discipleship", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/can-ai-help-you-walk-with-jesus", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/equip-the-kingdom-to-use-ai-well", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/why-you-keep-quitting-your-bible-app", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.8 },
  { path: "/guides/best-discipleship-apps-2026", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides/christian-ai-tools", changeFrequency: "monthly", priority: 0.7 },
  { path: "/guides/sms-discipleship", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys", changeFrequency: "weekly", priority: 0.8 },
  { path: "/journeys/book-of-james", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/james-deep", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/new-believer", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/rooted", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/still", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/the-examen", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journeys/way-of-jesus", changeFrequency: "monthly", priority: 0.7 },
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
