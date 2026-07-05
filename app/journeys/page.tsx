import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../../components/Footer";
import JourneyHeroSection from "../../components/JourneyHeroSection";
import { journeyCatalog, type JourneySummary } from "../../lib/journeyCatalog";
import JourneyHubCard from "./JourneyHubCard";

export const metadata: Metadata = {
  title: "Journeys - Zoe",
  description:
    "Choose a Journey and let Zoe gently guide you through Scripture, prayer, reflection, and small daily practices focused on one area of your life.",
};

const journeySections = [
  {
    title: "Scripture Paths",
    slugs: ["james-deep", "rooted", "way-of-jesus", "new-believer", "the-examen", "still"],
  },
  {
    title: "Practice Paths",
    slugs: ["identity", "purpose", "prayer", "faith-doubt", "wisdom", "gratitude", "patience", "rest"],
  },
  {
    title: "Relational Paths",
    slugs: ["love", "marriage", "parenting", "friendship", "forgiveness", "anger"],
  },
  {
    title: "Calling Paths",
    slugs: ["leadership", "money", "work-ambition", "generosity", "legacy", "courage"],
  },
  {
    title: "Rebuilding Paths",
    slugs: ["fear-anxiety", "grief", "suffering", "addiction", "health"],
  },
];

const journeyBySlug = new Map(journeyCatalog.map((journey) => [journey.slug, journey]));

export default function JourneysHubPage() {
  return (
    <div className="min-h-screen text-zoe-ink bg-zoe-surface">
      <JourneyHeroSection />

      <section id="browse-paths" className="scroll-mt-28 space-y-20 overflow-hidden py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-zoe-leaf">Browse paths</p>
        </div>

        <div className="space-y-16">
          {journeySections.map((section, index) => {
            const journeys = section.slugs
              .map((slug) => journeyBySlug.get(slug))
              .filter((journey): journey is JourneySummary => Boolean(journey));
            const marqueeJourneys = Array.from({ length: 4 }, () => journeys).flat();

            return (
              <div key={section.title} className="space-y-5">
                <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6">
                  <h2 className="text-3xl font-bold tracking-tight text-zoe-ink md:text-4xl">
                    {section.title}
                  </h2>
                  <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-zoe-muted sm:inline">
                    {journeys.length} paths
                  </span>
                </div>

                <div className="journey-marquee-row journey-mobile-snap">
                  <div className={`journey-marquee-track items-start px-5 md:px-0 ${index % 2 === 1 ? "journey-marquee-track-reverse" : ""}`}>
                    {marqueeJourneys.map((journey, itemIndex) => (
                      <JourneyHubCard
                        key={`${section.title}-${journey.slug}-${itemIndex}`}
                        journey={journey}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 px-6 bg-zoe-ink">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl tracking-tight font-sans text-white font-bold leading-[1.1] mb-6">Your simple rhythm.</h2>
          <p className="text-lg text-zoe-outline font-medium leading-relaxed mb-10">Zoe is currently in early access. Join the waitlist to build a rhythm of scripture, prayer, practice, and reflection by text.</p>
          <Link href="/#waitlist" className="inline-flex items-center gap-2 rounded-full bg-white text-zoe-ink px-8 py-4 text-base font-bold shadow-lg hover:bg-slate-100 transition-all duration-200">
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}