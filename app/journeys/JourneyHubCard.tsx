"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { JourneySummary } from "../../lib/journeyCatalog";

export default function JourneyHubCard({ journey }: { journey: JourneySummary }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="group w-[86vw] max-w-[420px] shrink-0 snap-center overflow-hidden rounded-[28px] border border-zoe-outline/20 bg-white p-3 shadow-sm transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform hover:-translate-y-0.5 hover:shadow-md active:scale-[0.985] sm:w-[380px] md:snap-none">
      <Link
        href={`/journeys/${journey.slug}`}
        className="relative block aspect-video w-full overflow-hidden rounded-[22px] bg-zoe-surface"
        aria-label={`Open ${journey.title}`}
      >
        <Image
          src={journey.image}
          alt={journey.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full border border-[#E7DED0] bg-[#FCF9F4] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-zoe-ink shadow-[0_12px_28px_rgba(45,50,49,0.14)]">
            {journey.duration}
          </span>
        </div>
      </Link>

      <div className="px-2 pb-2 pt-4">
        <div className="rounded-[24px] bg-zoe-surface/80">
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-zoe-muted transition-colors duration-200 hover:text-zoe-ink"
          >
            More details
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`grid transition-[grid-template-rows,opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-opacity ${
              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 pb-4 pt-1">
                <p className="text-sm font-medium leading-relaxed text-zoe-muted">
                  {journey.description}
                </p>
                <Link
                  href={`/journeys/${journey.slug}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-zoe-leaf px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(29,194,134,0.18)] transition-all duration-200 hover:brightness-105"
                >
                  Open Journey <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
