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


// zoe.live/churches, redesigned in September 2026 from a prototype Tony approved.
// Sections alternate Oat / Surface as stacked paper sheets, like the home page.
export default function ChurchesPage() {
  return (
    <div
      id="churches-root"
      className={`bg-zoe-oat font-sans leading-[1.55] text-zoe-ink`}
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
