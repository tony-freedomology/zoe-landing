import type { Metadata } from "next";
import HomePageContent from "../components/HomePageContent";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Zoe — AI that helps you walk with Jesus, by text",
  absoluteTitle: true,
  description:
    "Zoe is AI that helps you walk with Jesus by text: scripture, prayer, and reflection woven through your morning, midday, and evening. No app to download.",
});

export default function Home() {
  return <HomePageContent variant="default" />;
}
