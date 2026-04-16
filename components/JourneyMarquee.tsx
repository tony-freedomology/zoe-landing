import Image from "next/image";
import Link from "next/link";
import { journeyCatalog } from "../lib/journeyCatalog";

const firstRow = journeyCatalog.filter((_, index) => index % 2 === 0);
const secondRow = journeyCatalog.filter((_, index) => index % 2 === 1);

function JourneyRow({ journeys, reverse = false }: { journeys: typeof journeyCatalog; reverse?: boolean }) {
  const items = [...journeys, ...journeys];

  return (
    <div className="journey-marquee-row">
      <div className={`journey-marquee-track ${reverse ? "journey-marquee-track-reverse" : ""}`}>
        {items.map((journey, index) => (
          <Link
            href={`/journeys/${journey.slug}`}
            key={`${journey.slug}-${index}`}
            className="group relative w-[288px] shrink-0 overflow-hidden rounded-[28px] border border-white/70 bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-zoe-surface">
              <Image
                src={journey.image}
                alt={journey.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute right-3 top-3 rounded-full border border-[#E7DED0] bg-[#FCF9F4] px-3 py-1.5 shadow-[0_12px_28px_rgba(45,50,49,0.14)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zoe-ink">
                  {journey.duration}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function JourneyMarquee() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-[#fffaf2] p-4 shadow-[0_28px_80px_rgba(15,23,42,0.08)] md:p-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#fffaf2] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#fffaf2] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(29,194,134,0.08),transparent_35%)]" />
      <div className="relative z-0 space-y-4">
        <JourneyRow journeys={firstRow} />
        <JourneyRow journeys={secondRow} reverse />
      </div>
    </div>
  );
}
