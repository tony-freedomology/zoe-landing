import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "./Footer";
import type { JourneyContent } from "../lib/journeyContent";

interface JourneyDetailPageProps {
  journey: JourneyContent;
  heroImage: StaticImageData;
}

export default function JourneyDetailPage({ journey, heroImage }: JourneyDetailPageProps) {
  return (
    <div className="min-h-screen text-slate-900">
      <section className="relative w-full overflow-hidden bg-misty-green-950" style={{ aspectRatio: "16/9" }}>
        <Image src={heroImage} alt={journey.heroAlt} fill placeholder="blur" className="object-cover" priority />
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto mb-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
            {journey.description}
          </p>
          <div>
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition-all duration-200 hover:bg-slate-100"
            >
              Start This Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FBFA] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {journey.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <p className="mb-1 text-3xl font-bold tracking-tighter-editorial text-slate-900">{stat.value}</p>
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-6 text-lg font-medium leading-relaxed text-slate-600">
            {journey.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-3xl font-bold tracking-tighter-editorial text-slate-900 md:text-4xl">
            The {journey.days.length} Days
          </h2>
          <div className="flex flex-col gap-4">
            {journey.days.map((entry) => (
              <div key={entry.day} className="flex items-start gap-5 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-900">
                  <span className="text-sm font-bold text-white">{entry.day}</span>
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-brand-jade">{entry.passage}</span>
                    <span className="text-sm text-slate-300">&middot;</span>
                    <span className="font-bold text-slate-900">{entry.theme}</span>
                  </div>
                  <p className="text-sm font-medium italic leading-relaxed text-slate-600">
                    &ldquo;{entry.prompt}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tighter-editorial text-white md:text-5xl">
            Begin the journey.
          </h2>
          <p className="mb-10 text-lg font-medium leading-relaxed text-slate-300">
            Zoe is currently in early access. Join the waitlist to be among the first to walk through {journey.ctaLabel} with a daily discipleship companion.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition-all duration-200 hover:bg-slate-100"
          >
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
