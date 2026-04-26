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

const shelves = [
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
      <section className="px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.34em] text-zoe-sap">
              Guided journeys · Scripture rhythms
            </p>
            <h1 className="mt-7 max-w-5xl text-[4.3rem] font-extrabold leading-[0.86] tracking-[-0.045em] text-zoe-ink [word-spacing:0.08em] md:text-[8.25rem] md:tracking-[-0.08em] md:[word-spacing:0.02em]">
              Choose the road under your feet.
            </h1>
            <p className="mt-7 max-w-2xl font-serif text-[1.55rem] italic leading-9 tracking-normal text-zoe-sap md:text-[2rem] md:leading-10">
              Not a giant catalog to sort through. A few shelves for the season you are actually in.
            </p>
          </div>

          <Link
            href={`/journeys/${heroJourney.slug}`}
            className="group grid overflow-hidden rounded-[2rem] bg-zoe-ink text-white shadow-[0_30px_90px_rgba(45,50,49,0.14)] md:grid-cols-[0.92fr_1.08fr]"
          >
            <div className="relative min-h-[22rem] overflow-hidden bg-zoe-surface md:min-h-[30rem]">
              <Image
                src={heroJourney.image}
                alt={heroJourney.title}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-contain p-3 transition duration-700 group-hover:scale-[1.02]"
              />
              <p className="absolute bottom-6 left-6 rounded-full bg-zoe-oat/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zoe-ink backdrop-blur">
                Featured path
              </p>
            </div>
            <div className="flex flex-col justify-between p-7 md:p-10">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-sap">
                  {heroJourney.duration} · {heroJourney.difficulty}
                </p>
                <h2 className="mt-5 text-[2.55rem] font-extrabold leading-[0.94] tracking-[-0.04em] [word-spacing:0.07em] md:text-[4.25rem] md:tracking-[-0.065em] md:[word-spacing:0.02em]">
                  {heroJourney.title}
                </h2>
                <p className="mt-6 text-base font-medium leading-7 tracking-normal text-white/72 md:text-lg md:leading-8">
                  {heroJourney.description}
                </p>
              </div>
              <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-zoe-sap px-6 py-3 text-sm font-bold text-white transition [word-spacing:0.12em] group-hover:bg-[#17aa74]">
                Start here
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-zoe-outline/55 bg-white/45 px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["31", "guided paths"],
            ["5", "shelves by season"],
            ["10-40", "days per journey"],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline gap-4">
              <p className="font-serif text-5xl italic leading-none text-zoe-sap">{value}</p>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-zoe-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {shelves.map((shelf) => (
        <JourneyCarousel key={shelf.title} {...shelf} />
      ))}

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-zoe-outline/50 bg-white p-7 shadow-[0_24px_70px_rgba(45,50,49,0.06)] md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-sap">
              Start small
            </p>
            <h2 className="mt-4 max-w-3xl text-[2.55rem] font-extrabold leading-[0.92] tracking-[-0.04em] text-zoe-ink [word-spacing:0.07em] sm:text-[3rem] md:text-[5rem] md:tracking-[-0.07em] md:[word-spacing:0.02em]">
              One passage. One question. One thread.
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 tracking-normal text-zoe-muted">
              Zoe is in early access. Join the waitlist to be among the first to walk through guided journeys by text.
            </p>
          </div>
          <Link
            href="/#waitlist"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold tracking-normal text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition [word-spacing:0.12em] hover:bg-[#17aa74]"
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
