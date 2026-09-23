import type { Metadata } from "next";
import ChurchesPage from "../../components/churches/ChurchesPage";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/churches",
  title: "Zoe for Churches — Take Sunday into Monday through Saturday",
  absoluteTitle: true,
  description:
    "Zoe helps your people carry Sunday's teaching into Monday through Saturday by text, and gives pastors shared patterns, never private threads.",
});

export default function Churches() {
  return <ChurchesPage />;
}
