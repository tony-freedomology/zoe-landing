import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Footer from "../../components/Footer";
import { journeyCatalog } from "../../lib/journeyCatalog";

export const metadata: Metadata = {
  title: "Journeys - Zoe",
  description:
    "Explore guided reading, prayer, and reflection journeys built to help you walk with Jesus in the places real life hits hardest.",
};

const featured = journeyCatalog.slice(0, 3);
const rest = journeyCatalog.slice(3);

export default function JourneysHubPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="px-6 pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
            Guided journeys · Scripture rhythms
          </p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-[4.4rem] font-extrabold leading-[0.88] tracking-[-0.075em] text-zoe-ink md:text-[7.8rem]">
                Pick a path for the week ahead.
              </h1>
              <p className="mt-7 max-w-3xl font-serif text-[1.7rem] italic leading-9 text-zoe-sap md:text-[2rem] md:leading-10">
                Guided reading, prayer, and reflection delivered in the thread you already check.
              </p>
            </div>
            <p className="text-base font-medium leading-7 tracking-normal text-zoe-muted [word-spacing:0.08em]">
              Each journey gives Zoe a simple arc to walk with you through: a passage, a question, a thread of memory, and a next faithful step.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {featured.map((journey, index) => (
            <Link
              href={`/journeys/${journey.slug}`}
              key={journey.slug}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 transition hover:-translate-y-1"
            >
              <div className="relative aspect-[1.08] overflow-hidden bg-zoe-surface">
                <Image
                  src={journey.image}
                  alt={journey.title}
                  fill
                  className="object-contain p-3 transition duration-700 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  priority={index === 0}
                />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between gap-5">
                  <p className="font-serif text-5xl italic leading-none text-zoe-sap">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <span className="rounded-full bg-zoe-surface px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-zoe-muted">
                    {journey.duration}
                  </span>
                </div>
                <h2 className="mt-7 text-[2rem] font-extrabold leading-[0.98] tracking-[-0.058em] text-zoe-ink">
                  {journey.title}
                </h2>
                <p className="mt-4 line-clamp-4 text-sm font-medium leading-6 tracking-normal text-zoe-muted [word-spacing:0.06em]">
                  {journey.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-zoe-outline/55 bg-zoe-outline/55">
          {rest.map((journey, index) => (
            <Link
              href={`/journeys/${journey.slug}`}
              key={journey.slug}
              className="group grid gap-4 bg-zoe-oat p-6 transition hover:bg-white md:grid-cols-[92px_1fr_160px] md:items-center md:p-8"
            >
              <p className="font-serif text-4xl italic leading-none text-zoe-sap">
                {String(index + 4).padStart(2, "0")}
              </p>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zoe-sap">
                  {journey.difficulty}
                </p>
                <h2 className="mt-2 text-[1.65rem] font-extrabold leading-[0.98] tracking-[-0.052em] text-zoe-ink md:text-[2.35rem]">
                  {journey.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm font-medium leading-6 tracking-normal text-zoe-muted [word-spacing:0.06em] md:text-base md:leading-7">
                  {journey.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 md:justify-end">
                <span className="text-sm font-bold text-zoe-muted">{journey.duration}</span>
                <ArrowRight className="h-5 w-5 text-zoe-sap transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#173A2E] px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-zoe-sap">
            Start small
          </p>
          <h2 className="mt-5 text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.07em] md:text-[5rem]">
            One passage. One question. One thread.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-8 tracking-normal text-white/68 [word-spacing:0.08em]">
            Zoe is in early access. Join the waitlist to be among the first to walk through guided journeys by text.
          </p>
          <Link
            href="/#waitlist"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold tracking-normal text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:bg-zoe-forest [word-spacing:0.14em]"
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
