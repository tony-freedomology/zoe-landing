"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

import type { JourneySummary } from "../lib/journeyCatalog";

type JourneyCarouselProps = {
  title: string;
  kicker: string;
  description: string;
  journeys: JourneySummary[];
  reverse?: boolean;
};

function JourneyCard({ journey }: { journey: JourneySummary }) {
  return (
    <Link
      href={`/journeys/${journey.slug}`}
      className="group flex h-[31rem] w-[19rem] shrink-0 flex-col overflow-hidden rounded-[1.75rem] bg-zoe-ink text-white shadow-[0_24px_70px_rgba(45,50,49,0.12)] ring-1 ring-zoe-outline/30 transition duration-300 hover:-translate-y-1 md:h-[35rem] md:w-[23rem]"
    >
      <div className="relative h-[18rem] shrink-0 overflow-hidden bg-zoe-surface md:h-[21rem]">
        <Image
          src={journey.image}
          alt={journey.title}
          fill
          sizes="(min-width: 768px) 23rem, 19rem"
          className="object-contain p-2 transition duration-700 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(23,58,46,0.34),rgba(23,58,46,0))]" />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-zoe-oat/92 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-zoe-ink backdrop-blur">
            {journey.duration}
          </span>
          <span className="rounded-full bg-zoe-sap px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white">
            {journey.difficulty}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
        <h3 className="text-[1.75rem] font-extrabold leading-[0.96] tracking-[-0.032em] text-white [word-spacing:0.07em] md:text-[2.15rem] md:tracking-[-0.055em] md:[word-spacing:0.02em]">
          {journey.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 tracking-normal text-white/68">
          {journey.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-zoe-sap [word-spacing:0.1em]">
          Open journey
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function JourneyCarousel({ title, kicker, description, journeys, reverse = false }: JourneyCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loop = [...journeys, ...journeys];

  function nudge(direction: "left" | "right") {
    scrollerRef.current?.scrollBy({
      left: direction === "right" ? 420 : -420,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-sap">
            {kicker}
          </p>
          <h2 className="mt-3 text-[2.75rem] font-extrabold leading-[0.92] tracking-[-0.04em] text-zoe-ink [word-spacing:0.06em] md:text-[4.5rem] md:tracking-[-0.065em] md:[word-spacing:0.02em]">
            {title}
          </h2>
        </div>
        <div className="flex items-end justify-between gap-5 md:min-w-[25rem]">
          <p className="max-w-sm text-sm font-semibold leading-6 tracking-normal text-zoe-muted md:text-base md:leading-7">
            {description}
          </p>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => nudge("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zoe-outline bg-white text-zoe-ink transition hover:border-zoe-sap hover:text-zoe-sap"
              aria-label={`Scroll ${title} left`}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => nudge("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zoe-outline bg-white text-zoe-ink transition hover:border-zoe-sap hover:text-zoe-sap"
              aria-label={`Scroll ${title} right`}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="journey-shelf group mt-8 overflow-x-auto px-5 pb-5 [scrollbar-width:none] md:mt-10 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        <div
          className={[
            "journey-shelf-track flex w-max gap-4 md:gap-6",
            reverse ? "journey-shelf-track-reverse" : "",
          ].join(" ")}
        >
          {loop.map((journey, index) => (
            <JourneyCard key={`${journey.slug}-${index}`} journey={journey} />
          ))}
        </div>
      </div>
    </section>
  );
}
