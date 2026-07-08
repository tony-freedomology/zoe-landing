import type { Metadata } from "next";
import ZoeQuoteArtwork from "../../components/ZoeQuoteArtwork";

export const metadata: Metadata = {
  title: "Why “Zoe”?",
  description:
    "Zoe is the Greek word the New Testament uses for the life only God gives. We named a texting tool after the life it can't give, on purpose, so it never forgets its job: pointing you past itself.",
  alternates: {
    canonical: "/why-zoe",
  },
};

export default function WhyZoePage() {
  return <ZoeQuoteArtwork />;
}
