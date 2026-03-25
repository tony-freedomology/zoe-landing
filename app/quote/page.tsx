import type { Metadata } from "next";
import ZoeQuoteArtwork from "../../components/ZoeQuoteArtwork";

export const metadata: Metadata = {
  title: "Zoe is eternity already at work in a Tuesday afternoon",
  description:
    "A standalone editorial artwork page for the Zoe meditation quote.",
};

export default function QuotePage() {
  return <ZoeQuoteArtwork />;
}
