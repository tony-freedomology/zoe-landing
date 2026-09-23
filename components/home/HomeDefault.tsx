import Footer from "../Footer";
import CloseSection from "./CloseSection";
import DayScene from "./DayScene";
import FloatingCta from "./FloatingCta";
import HomeFaq from "./HomeFaq";
import HomeHero from "./HomeHero";
import HomeThesis from "./HomeThesis";
import HomeWaitlist from "./HomeWaitlist";
import JourneysSection from "./JourneysSection";
import PrayerSection from "./PrayerSection";
import PrivacySection from "./PrivacySection";

// The default zoe.live home page. Section order and behavior are documented in
// AGENTS.md ("Home Page Guidance"); keep them in sync.
export default function HomeDefault() {
  return (
    <div id="home-root" className="bg-zoe-oat font-sans text-zoe-ink">
      <main id="top">
        <HomeHero />
        <HomeThesis />
        <DayScene />
        <PrayerSection />
        <JourneysSection />
        <HomeWaitlist />
        <PrivacySection />
        <HomeFaq />
        <CloseSection />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
