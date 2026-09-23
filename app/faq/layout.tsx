import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/faq",
  title: "FAQ",
  description:
    "Common questions about Zoe, AI that helps you walk with Jesus by text: how the daily texts work, how your privacy is protected, and how to get started.",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
