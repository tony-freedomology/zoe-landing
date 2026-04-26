import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "./Footer";
import type { JourneyContent } from "../lib/journeyContent";
import { getJourneyImagePath, type JourneyImageSlug } from "../lib/journeyImages";

interface JourneyDetailPageProps {
  journey: JourneyContent;
  heroImage?: string;
}

export default function JourneyDetailPage({ journey, heroImage }: JourneyDetailPageProps) {
  const resolvedHeroImage = heroImage ?? getJourneyImagePath(journey.slug as JourneyImageSlug);

  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="px-6 pb-12 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
                Journey · {journey.duration}
              </p>
              <h1 className="mt-6 max-w-4xl text-[3.7rem] font-extrabold leading-[0.9] tracking-[-0.075em] text-zoe-ink md:text-[6.4rem]">
                {journey.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em] md:text-xl md:leading-9">
                {journey.description}
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[2rem] bg-zoe-surface shadow-[0_24px_70px_rgba(45,50,49,0.08)] ring-1 ring-zoe-outline/45">
                <Image
                  src={resolvedHeroImage}
                  alt={journey.heroAlt}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <article className="rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 md:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-zoe-sap">
              How this walk works
            </p>
            <div className="mt-8 space-y-6 text-[1.08rem] font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
              {journey.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-[2rem] bg-zoe-surface p-7 ring-1 ring-zoe-outline/45">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-zoe-sap">
              Shape
            </p>
            <div className="mt-6 divide-y divide-zoe-outline/55">
              {journey.stats.map((stat) => (
                <div key={stat.label} className="py-5 first:pt-0 last:pb-0">
                  <p className="text-[2.35rem] font-extrabold leading-none tracking-[-0.06em] text-zoe-ink">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-zoe-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/#waitlist"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zoe-sap px-6 py-4 text-sm font-bold tracking-normal text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:bg-zoe-forest [word-spacing:0.14em]"
            >
              Start this journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-zoe-surface px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-zoe-sap">
            Daily path
          </p>
          <h2 className="mt-5 text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.07em] text-zoe-ink md:text-[5rem]">
            The {journey.days.length} days.
          </h2>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-zoe-outline/55 bg-zoe-outline/55">
            {journey.days.map((entry) => (
              <div key={entry.day} className="grid gap-4 bg-zoe-oat p-6 md:grid-cols-[72px_160px_1fr] md:p-7">
                <p className="font-serif text-4xl italic leading-none text-zoe-sap">
                  {String(entry.day).padStart(2, "0")}
                </p>
                <div>
                  <p className="text-sm font-extrabold tracking-[-0.02em] text-zoe-ink">{entry.passage}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zoe-muted">{entry.theme}</p>
                </div>
                <p className="font-serif text-xl italic leading-8 tracking-normal text-zoe-forest [word-spacing:0.06em]">
                  {entry.prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#173A2E] px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-zoe-sap">
            Begin the journey
          </p>
          <h2 className="mt-5 text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.07em] md:text-[5rem]">
            Let the thread carry it.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-8 tracking-normal text-white/68 [word-spacing:0.08em]">
            Join the waitlist to be among the first to walk through {journey.ctaLabel} with scripture, reflection, and check-ins in your texts.
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
