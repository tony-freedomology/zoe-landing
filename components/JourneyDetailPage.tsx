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
              <h1 className="max-w-4xl text-[2.9rem] font-bold leading-[0.98] tracking-[-0.045em] text-zoe-ink sm:text-[3.6rem] md:text-[4.6rem]">
                {journey.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-zoe-muted md:text-xl md:leading-9">
                {journey.description}
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[2rem] bg-zoe-surface shadow-zoe-card ring-1 ring-zoe-outline/45">
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
          <article className="rounded-[2rem] bg-white p-7 shadow-zoe-card ring-1 ring-zoe-outline/45 md:p-10">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-zoe-ink">How this Journey works</h2>
            <div className="mt-6 space-y-6 text-[1.08rem] font-medium leading-8 text-zoe-muted">
              {journey.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-[2rem] bg-zoe-surface p-7 ring-1 ring-zoe-outline/45">
            <h2 className="text-lg font-bold tracking-[-0.02em] text-zoe-ink">At a glance</h2>
            <div className="mt-6 divide-y divide-zoe-outline/55">
              {journey.stats.map((stat) => (
                <div key={stat.label} className="py-5 first:pt-0 last:pb-0">
                  <p className="text-[2.1rem] font-bold leading-none tracking-[-0.045em] text-zoe-ink">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zoe-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-sm font-medium leading-6 text-zoe-muted">
              Zoe is still in early access. These Path pages are previews; Paths start inside Zoe after you get access.
            </p>
            <Link
              href="/s"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zoe-sap px-6 py-4 text-sm font-bold text-white transition hover:brightness-105"
            >
              Start with Zoe
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://app.zoe.live/library"
              className="mt-4 block text-center text-sm font-bold text-zoe-forest underline decoration-zoe-outline underline-offset-4 transition hover:text-zoe-ink"
            >
              Already have beta access? Open your Path library.
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-zoe-surface px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-[2.6rem] font-bold leading-[1] tracking-[-0.045em] text-zoe-ink md:text-[3.75rem]">
            The {journey.days.length} days.
          </h2>
          <p className="mt-4 max-w-xl text-lg font-medium leading-8 text-zoe-muted">
            A passage for each day, and a question to carry with you.
          </p>

          <ol className="mt-10 space-y-3">
            {journey.days.map((entry) => (
              <li
                key={entry.day}
                className="grid gap-3 rounded-[1.5rem] bg-white p-6 ring-1 ring-zoe-outline/35 md:grid-cols-[64px_190px_1fr] md:gap-6 md:p-7"
              >
                <p className="text-[1.75rem] font-bold leading-none tracking-[-0.04em] text-zoe-leaf">
                  {String(entry.day).padStart(2, "0")}
                </p>
                <div>
                  <p className="text-base font-bold tracking-[-0.01em] text-zoe-ink">{entry.passage}</p>
                  <p className="mt-1 text-sm font-medium text-zoe-muted">{entry.theme}</p>
                </div>
                <p className="text-[1.05rem] font-semibold leading-7 text-zoe-ink md:text-lg md:leading-8">
                  {entry.prompt}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl rounded-[2.25rem] bg-white px-6 py-14 text-center shadow-zoe-card ring-1 ring-zoe-outline/40 sm:px-12 md:py-16">
          <h2 className="text-[2.6rem] font-bold leading-[1] tracking-[-0.045em] text-zoe-ink md:text-[3.75rem]">
            Let the thread carry it.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-8 text-zoe-muted">
            Join the waitlist to walk through {journey.ctaLabel} with scripture, reflection, and check-ins in your texts.
          </p>
          <Link
            href="/s"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold text-white transition hover:brightness-105"
          >
            Start with Zoe
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://app.zoe.live/library"
            className="mt-5 block text-sm font-bold text-zoe-forest underline decoration-zoe-outline underline-offset-4 transition hover:text-zoe-ink"
          >
            Already have beta access? Open your Path library.
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
