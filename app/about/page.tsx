import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import AboutZoeLifeWord from "../../components/AboutZoeLifeWord";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hi, I'm Tony. Pastor and builder of Zoe — an experiment in whether phones can turn attention back to Jesus instead of away from Him.",
  alternates: {
    canonical: "/about",
  },
};

const bioBeforeQuote = [
  "I bet you have questions. I do too.",
  "The big one I'm asking is how can (and should) technology be used to help experience the life of God more fully. Is technology ALWAYS a barrier? Does it have to be?",
  "For the last 15 years, I've been a pastor, and the thing I keep hearing is that people feel scattered. Like everything is competing for our attention. We're addicted to our phones, scrolling endlessly, looking for... what exactly?",
];

const bioAfterLifeParagraph = [
  "So I wondered: could we build a tool that met people where they already were? Not one more app or content stream, but something that reminds us of that invitation? Of where real life is to be found?",
];

const bioAfterQuote = [
  "It seems worth trying, so that's what we're doing.",
  "I'm still a pastor at my local church, and I have no desire to build something that pulls people further into technology and away from human connection. Zoe is an experiment in doing just the opposite.",
  "I'm glad you're here. I welcome your questions, thoughts, critiques, and suggestions. We are all one body, and we need to help our world turn its eyes to Christ.",
];

const boundaries = [
  {
    n: "01",
    title: "Unmistakably AI",
    body: "Not a pastor. Not a friend. Not the Holy Spirit. Code that can help you remember, return, and follow through.",
  },
  {
    n: "02",
    title: "Where people already are",
    body: "SMS and iMessage. No app to download, no dashboard to remember, no new habit stacked on top of the rest of life.",
  },
  {
    n: "03",
    title: "Toward Him, not toward Zoe",
    body: "If it starts pulling people deeper into the tool and further from Jesus or real community, we will have failed.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-6 pt-24 sm:px-6 md:pb-8 md:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(ellipse_at_18%_0%,rgba(29,194,134,0.12),transparent_55%),radial-gradient(ellipse_at_88%_8%,rgba(29,194,134,0.06),transparent_48%)]"
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
            {/*
              Explicit crop of the landscape founder shot:
              - 15% off left and right
              - 15% off the top
              - bottom stays (full lower edge of the source)
              Visible region aspect ≈ 1.098 on a 4:3 source.
            */}
            <div className="relative order-1 mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#1a1f1e] shadow-[0_28px_70px_rgba(45,50,49,0.13)] ring-1 ring-black/10">
                {/* Crop window: 15% L/R, 15% top; preserve source aspect inside the window */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "980 / 892.5" }}
                >
                  <Image
                    src="/assets/founder/tony-founder.jpg"
                    alt="Tony Allen, pastor and founder of Zoe"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 560px"
                    className="!left-[-21.4286%] !top-[-17.6471%] !h-[117.6471%] !w-[142.8571%] !max-w-none"
                  />
                </div>
              </div>
            </div>

            <div className="order-2 flex flex-col justify-center pb-1 pt-1 lg:pl-2">
              <p className="text-sm font-bold tracking-normal text-zoe-sap">
                Pastor + builder · Cleveland, OH
              </p>
              <h1 className="mt-4 text-[3rem] font-extrabold leading-[0.92] tracking-[-0.05em] text-zoe-ink sm:text-[3.75rem] lg:text-[4.6rem]">
                Hi, I&apos;m Tony.
              </h1>
              <p className="mt-6 max-w-md text-lg font-medium leading-8 text-zoe-muted sm:text-[1.2rem] sm:leading-8">
                I&apos;m building Zoe carefully, in public, because I want to know whether technology can help us turn toward Jesus more often in ordinary life.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:tony@zoe.live"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_32px_rgba(29,194,134,0.2)] transition hover:bg-[#19b078] active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  Email me
                </a>
                <Link
                  href="/s"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-zoe-ink shadow-[0_12px_28px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/50 transition hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Start with Zoe
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-8 max-w-sm text-sm font-medium leading-6 text-zoe-muted/90 lg:hidden">
                Still pastoring locally. Still asking hard questions about technology and attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Letter ───────────────────────────────────────────── */}
      <section className="relative px-5 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(45,50,49,0.06)] ring-1 ring-zoe-outline/40">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-1.5 bg-gradient-to-b from-zoe-sap/0 via-zoe-sap/55 to-zoe-sap/0 md:block"
            />

            <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
              <aside className="hidden border-r border-zoe-outline/30 bg-zoe-oat/70 px-8 py-12 lg:block lg:px-10 lg:py-14">
                <div className="sticky top-32">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-white shadow-[0_10px_28px_rgba(45,50,49,0.1)]">
                    <Image
                      src="/assets/founder/tony-headshot.jpg"
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover object-[center_18%]"
                    />
                  </div>
                  <p className="mt-6 text-lg font-extrabold tracking-[-0.02em] text-zoe-ink">
                    Tony Allen
                  </p>
                  <p className="mt-1 text-sm font-medium text-zoe-muted">
                    Founder of Zoe
                  </p>
                  <div className="mt-8 border-t border-zoe-outline/40 pt-8">
                    <a
                      href="mailto:tony@zoe.live"
                      className="inline-flex items-center gap-2 text-sm font-bold text-zoe-sap transition hover:text-[#19b078]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      tony@zoe.live
                    </a>
                  </div>
                </div>
              </aside>

              <article className="px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:px-14 lg:py-16">
                <div className="mx-auto max-w-[36.5rem]">
                  <div className="mb-9 flex items-center gap-4 lg:hidden">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-zoe-outline/30">
                      <Image
                        src="/assets/founder/tony-headshot.jpg"
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover object-[center_18%]"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-zoe-ink">Tony Allen</p>
                      <p className="text-sm font-medium text-zoe-muted">Founder of Zoe</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-[1.1rem] font-medium leading-[1.78] text-zoe-ink/84 sm:text-[1.14rem] sm:leading-[1.82]">
                    {bioBeforeQuote.map((paragraph, i) => (
                      <p
                        key={paragraph}
                        className={
                          i === 0
                            ? "text-[1.22rem] font-semibold leading-[1.65] text-zoe-ink sm:text-[1.3rem] sm:leading-[1.68]"
                            : undefined
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                    <AboutZoeLifeWord />
                    {bioAfterLifeParagraph.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <blockquote className="my-11 rounded-[1.35rem] bg-zoe-oat px-6 py-7 ring-1 ring-zoe-outline/35 sm:px-8 sm:py-8">
                    <p className="text-[1.25rem] font-extrabold leading-[1.35] tracking-[-0.02em] text-zoe-ink sm:text-[1.4rem] sm:leading-[1.32]">
                      Could our phones actually turn our attention back to Jesus?{" "}
                      <span className="text-zoe-sap">Proactively?</span>
                    </p>
                  </blockquote>

                  <div className="space-y-6 text-[1.1rem] font-medium leading-[1.78] text-zoe-ink/84 sm:text-[1.14rem] sm:leading-[1.82]">
                    {bioAfterQuote.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-11 flex flex-col gap-4 rounded-[1.35rem] border border-zoe-outline/40 bg-gradient-to-br from-white to-zoe-oat/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div>
                      <p className="text-sm font-extrabold text-zoe-ink">Want to talk?</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-zoe-muted">
                        Questions, critiques, suggestions — all welcome.
                      </p>
                    </div>
                    <a
                      href="mailto:tony@zoe.live"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-zoe-sap px-5 py-3 text-sm font-bold text-white transition hover:bg-[#19b078]"
                    >
                      <Mail className="h-4 w-4" />
                      tony@zoe.live
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Zoe is trying to be ─────────────────────────── */}
      <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-zoe-sap">What Zoe is trying to be</p>
            <h2 className="mt-3 text-[2rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-zoe-ink sm:text-[2.55rem]">
              A small experiment in attention, not another feed.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-5">
            <div className="rounded-[1.5rem] bg-white p-7 shadow-[0_14px_40px_rgba(45,50,49,0.04)] ring-1 ring-zoe-outline/40 lg:col-span-5 lg:p-8">
              <p className="font-mono text-[0.7rem] font-bold tracking-[0.18em] text-zoe-sap">
                {boundaries[0].n}
              </p>
              <h3 className="mt-4 text-xl font-extrabold tracking-[-0.025em] text-zoe-ink">
                {boundaries[0].title}
              </h3>
              <p className="mt-3 text-base font-medium leading-7 text-zoe-muted">
                {boundaries[0].body}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white p-7 shadow-[0_14px_40px_rgba(45,50,49,0.04)] ring-1 ring-zoe-outline/40 lg:col-span-7 lg:p-8">
              <p className="font-mono text-[0.7rem] font-bold tracking-[0.18em] text-zoe-sap">
                {boundaries[1].n}
              </p>
              <h3 className="mt-4 text-xl font-extrabold tracking-[-0.025em] text-zoe-ink">
                {boundaries[1].title}
              </h3>
              <p className="mt-3 max-w-xl text-base font-medium leading-7 text-zoe-muted">
                {boundaries[1].body}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-zoe-ink p-7 text-white shadow-[0_18px_50px_rgba(45,50,49,0.18)] lg:col-span-12 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:p-9">
              <div className="max-w-2xl">
                <p className="font-mono text-[0.7rem] font-bold tracking-[0.18em] text-zoe-sap">
                  {boundaries[2].n}
                </p>
                <h3 className="mt-4 text-xl font-extrabold tracking-[-0.025em] sm:text-2xl">
                  {boundaries[2].title}
                </h3>
                <p className="mt-3 text-base font-medium leading-7 text-white/75">
                  {boundaries[2].body}
                </p>
              </div>
              <Link
                href="/faq"
                className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full bg-zoe-sap px-5 py-3 text-sm font-bold text-white transition hover:bg-[#19b078] lg:mt-0"
              >
                Read the FAQ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────────────── */}
      <section className="bg-zoe-ink px-5 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.5rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-white sm:text-[3.5rem]">
            Walk with us while Zoe grows up.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-7 text-white/70 sm:text-lg sm:leading-8">
            Join the beta, read the journal, or just email me. We&apos;re building carefully, and thoughtful people make that better.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/s"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold text-white shadow-[0_18px_36px_rgba(29,194,134,0.28)] transition hover:bg-[#19b078] active:scale-[0.98]"
            >
              Start with Zoe
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 transition hover:bg-white/15 active:scale-[0.98]"
            >
              Read the journal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer hideWhyZoe />
    </div>
  );
}
