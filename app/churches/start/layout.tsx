import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/churches/start",
  title: "Bring Zoe to Your Church",
  description:
    "Tell us about your church and your goals. Zoe helps your people carry Sunday into the week by text, with a privacy-minded view for pastors.",
});

export default function ChurchesStartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
