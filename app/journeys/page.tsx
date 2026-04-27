import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";
import JourneyCarousel from "../../components/JourneyCarousel";
import { journeyCatalog, type JourneySummary } from "../../lib/journeyCatalog";

export const metadata: Metadata = {
  title: "Journeys - Zoe",
  description:
    "Explore guided reading, prayer, and reflection journeys built to help you walk with Jesus in the places real life hits hardest.",
};

const bySlug = Object.fromEntries(journeyCatalog.map((journey) => [journey.slug, journey])) as Record<string, JourneySummary>;

function pick(slugs: string[]) {
  return slugs.map((slug) => bySlug[slug]).filter(Boolean);
}

const journeyThemes = [
  {
    title: "Begin here.",
    kicker: "Foundations",
    description: "Clear starting points for prayer, scripture, and the first few steps of daily rhythm.",
    journeys: pick(["new-believer", "james-deep", "rooted", "still", "the-examen", "way-of-jesus"]),
  },
  {
    title: "The inner life.",
    kicker: "Attention and formation",
    description: "Journeys for the places nobody sees: identity, patience, wisdom, purpose, and the life beneath the work.",
    journeys: pick(["identity", "purpose", "patience", "wisdom", "gratitude", "rest"]),
    reverse: true,
  },
  {
    title: "People close to you.",
    kicker: "Relationships",
    description: "Practice love where it gets specific: marriage, parenting, friendship, forgiveness, generosity, and anger.",
    journeys: pick(["love", "marriage", "parenting", "friendship", "forgiveness", "generosity", "anger"]),
  },
  {
    title: "Work, money, and responsibility.",
    kicker: "Calling",
    description: "For ambition, leadership, legacy, health, money, and the responsibilities that shape your week.",
    journeys: pick(["leadership", "work-ambition", "money", "legacy", "health", "courage"]),
    reverse: true,
  },
  {
    title: "Hard places.",
    kicker: "When life presses in",
    description: "Gentle, scripture-shaped paths for anxiety, doubt, grief, suffering, addiction, and courage when the road is not clean.",
    journeys: pick(["fear-anxiety", "faith-doubt", "grief", "suffering", "addiction", "courage"]),
  },
];

const heroJourney = bySlug["way-of-jesus"];

export default function JourneysHubPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-zoe-oat text-zoe-ink">
      <section className="px-5 pb-10 pt-24 md:px-8 md:pb-14 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.34em] text-zoe-sap">
              Guided journeys · Scripture rhythms
            </p>
            <h1 className="mt-6 max-w-[10ch] text-6xl font-extrabold leading-[0.94] tracking-tighter-editorial-relaxed text-zoe-ink md:text-7xl xl:text-8xl">
              Daily paths through scripture.
            </h1>
          </div>

          <Link
            href={`/journeys/${heroJourney.slug}`}
            className="group overflow-hidden rounded-[2rem] border border-zoe-outline/35 bg-white p-4 text-zoe-ink shadow-[0_24px_70px_rgba(45,50,49,0.08)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_80px_rgba(45,50,49,0.1)] md:p-5"
          >
            <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-zoe-surface">
              <Image
                src={heroJourney.image}
                alt={heroJourney.title}
                fill
                priority
                sizes="(min-width: 1024px) 42rem, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <p className="absolute left-5 top-5 rounded-full bg-zoe-oat px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zoe-ink shadow-[0_12px_28px_rgba(45,50,49,0.12)]">
                Featured path
              </p>
            </div>
            <div className="flex flex-col gap-6 p-4 md:min-h-32 md:flex-row md:items-end md:justify-between md:p-6 lg:p-7">
              <p className="line-clamp-3 max-w-2xl text-base font-medium leading-7 tracking-normal text-zoe-muted md:text-lg md:leading-8">
                {heroJourney.description}
              </p>
              <span className="inline-flex w-fit shrink-0 items-center gap-2 self-end rounded-full bg-zoe-sap px-6 py-3 text-sm font-bold text-white transition group-hover:bg-[#17aa74]">
                Start here
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-zoe-outline/45 bg-white/45 px-5 py-6 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["31", "guided paths"],
            ["5", "journey themes"],
            ["10-40", "days per journey"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline gap-4">
              <p className="font-serif text-5xl italic leading-none text-zoe-sap">{value}</p>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-zoe-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {journeyThemes.map((theme) => (
        <JourneyCarousel key={theme.title} {...theme} />
      ))}

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-zoe-outline/50 bg-white p-7 shadow-[0_24px_70px_rgba(45,50,49,0.06)] md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-sap">
              Start small
            </p>
            <h2 className="mt-4 max-w-3xl text-[2.55rem] font-extrabold leading-[0.92] tracking-[-0.04em] text-zoe-ink [word-spacing:0.07em] sm:text-[3rem] md:text-[5rem] md:tracking-[-0.07em] md:[word-spacing:0.02em]">
              One passage. One question. One step.
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 tracking-normal text-zoe-muted">
              Zoe is in early access. Join the waitlist to be among the first to walk through guided journeys by text.
            </p>
          </div>
          <Link
            href="/#waitlist"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold tracking-normal text-white transition [word-spacing:0.12em] hover:bg-[#17aa74]"
          >
            Join the waitlist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
