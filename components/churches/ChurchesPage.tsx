import { Newsreader } from "next/font/google";
import FaqSchema from "../FaqSchema";
import Footer from "../Footer";
import ChurchBurden from "./ChurchBurden";
import ChurchClose from "./ChurchClose";
import ChurchFaq, { CHURCH_FAQS } from "./ChurchFaq";
import ChurchFloatingCta from "./ChurchFloatingCta";
import ChurchHero from "./ChurchHero";
import ChurchPilot from "./ChurchPilot";
import ChurchPrivacy from "./ChurchPrivacy";
import ChurchShaped from "./ChurchShaped";
import SermonWeekScene from "./SermonWeekScene";
import "./churches.css";

// The sitewide Newsreader (app/layout.tsx) ships only the upright face, so italic
// accents get synthesized. Every serif on this page is an italic accent, so load
// the real italic with the optical-size axis (as in the approved prototype) and
// point --font-serif at it for this page only.
const newsreaderItalic = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-serif",
});

// zoe.live/churches, redesigned in September 2026 from a prototype Tony approved.
// Sections alternate Oat / Surface as stacked paper sheets, like the home page.
export default function ChurchesPage() {
  return (
    <div
      id="churches-root"
      className={`${newsreaderItalic.variable} bg-zoe-oat font-sans leading-[1.55] text-zoe-ink`}
    >
      <main id="top" className="tracking-normal">
        <ChurchHero />
        <ChurchBurden />
        <SermonWeekScene />
        <ChurchPrivacy />
        <ChurchShaped />
        <ChurchPilot />
        <ChurchFaq />
        <ChurchClose />
      </main>
      <Footer />
      <ChurchFloatingCta />
      <FaqSchema faqs={CHURCH_FAQS} />
    </div>
  );
}
