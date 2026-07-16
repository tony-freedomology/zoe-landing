import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hi, I'm Tony. Pastor and builder of Zoe — an experiment in whether phones can turn attention back to Jesus instead of away from Him.",
  alternates: {
    canonical: "/about",
  },
};

const bioParagraphs = [
  "I bet you have questions. I do too. The big one I'm asking is how can (and should) technology be used to help experience the life of God more fully. Is technology ALWAYS a barrier? Does it have to be?",
  "For the last 15 years, I've been a pastor, and the thing I keep hearing is that people feel scattered. Like everything is competing for our attention. We're addicted to our phones, scrolling endlessly, looking for... what exactly?",
  "There's a kind of life we are invited to with God, and I'm convinced it starts with where you're placing your attention. The eternal God, I believe, stands ready at every moment, inviting us to return, remember, and relate to Him. We are just so often somewhere else.",
  "So I wondered: could we build a tool that met people where they already were? Not one more app or content stream, but something that reminds us of that invitation? Of where real life is to be found?",
  "It seems worth trying, so that's what we're doing.",
  "I'm still a pastor at my local church, and I have no desire to build something that pulls people further into technology and away from human connection. Zoe is an experiment in doing just the opposite.",
  "I'm glad you're here. I welcome your questions, thoughts, critiques, and suggestions. We are all one body, and we need to help our world turn its eyes to Christ.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      {/* Hero — personal, not product */}
      <section className="px-5 pb-10 pt-28 sm:px-6 md:pb-14 md:pt-36">
        <div className="mx-auto grid max-w-5xl items-end gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-zoe-surface shadow-[0_22px_60px_rgba(45,50,49,0.07)] ring-1 ring-zoe-outline/40 lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
              <Image
                src="/assets/founder/tony-founder.jpg"
                alt="Tony Allen, pastor and founder of Zoe"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-[48%_22%]"
              />
            </div>
          </div>

          <div className="pb-1">
            <p className="text-sm font-bold tracking-normal text-zoe-forest">
              Pastor + builder · Cleveland, OH
            </p>
            <h1 className="mt-4 max-w-[12ch] text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-zoe-ink sm:text-[3.5rem] lg:text-[4.25rem]">
              Hi, I&apos;m Tony.
            </h1>
            <p className="mt-6 max-w-md text-lg font-medium leading-8 text-zoe-muted sm:text-xl sm:leading-8">
              I&apos;m building Zoe carefully, in public, because I want to know whether technology can help us turn toward Jesus more often in ordinary life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:tony@zoe.live"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(29,194,134,0.16)] transition hover:bg-zoe-forest"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                Email me
              </a>
              <Link
                href="/#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-zoe-ink shadow-[0_12px_28px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 transition hover:-translate-y-0.5"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Letter body */}
      <section className="px-5 pb-20 sm:px-6 md:pb-28">
        <div className="mx-auto max-w-5xl">
          <article className="rounded-[1.75rem] bg-white px-6 py-10 shadow-[0_18px_50px_rgba(45,50,49,0.045)] ring-1 ring-zoe-outline/40 sm:px-10 sm:py-12 md:px-14 md:py-14">
            <div className="mx-auto max-w-[38rem]">
              <div className="mb-8 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-zoe-outline/35">
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

              <div className="space-y-6 text-[1.08rem] font-medium leading-[1.75] text-zoe-ink/82 sm:text-[1.125rem] sm:leading-[1.8]">
                {bioParagraphs.slice(0, 4).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="my-10 border-l-[3px] border-zoe-sap pl-5 sm:pl-6">
                <p className="font-serif text-[1.35rem] italic leading-snug tracking-normal text-zoe-forest sm:text-[1.55rem] sm:leading-snug">
                  Could our phones actually turn our attention back to Jesus? Proactively?
                </p>
              </blockquote>

              <div className="space-y-6 text-[1.08rem] font-medium leading-[1.75] text-zoe-ink/82 sm:text-[1.125rem] sm:leading-[1.8]">
                {bioParagraphs.slice(4).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 rounded-[1.25rem] bg-zoe-oat px-5 py-5 ring-1 ring-zoe-outline/40 sm:px-6">
                <p className="text-base font-medium leading-7 text-zoe-ink/85">
                  If you ever want to reach me, shoot me an email at{" "}
                  <a
                    href="mailto:tony@zoe.live"
                    className="font-extrabold text-zoe-forest underline decoration-zoe-sap/50 underline-offset-4 transition hover:text-zoe-sap"
                  >
                    tony@zoe.live
                  </a>
                  .
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Quiet product boundaries — secondary to the personal letter */}
      <section className="border-t border-zoe-outline/35 bg-zoe-surface px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold text-zoe-forest">What Zoe is trying to be</p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-zoe-ink sm:text-[2.25rem]">
            A small experiment in attention, not another feed.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Unmistakably AI",
                body: "Not a pastor. Not a friend. Not the Holy Spirit. Code that can help you remember, return, and follow through.",
              },
              {
                title: "Where people already are",
                body: "SMS and iMessage. No app to download, no dashboard to remember, no new habit stacked on top of the rest of life.",
              },
              {
                title: "Toward Him, not toward Zoe",
                body: "If it starts pulling people deeper into the tool and further from Jesus or real community, we will have failed.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.35rem] bg-white p-6 shadow-[0_12px_34px_rgba(45,50,49,0.04)] ring-1 ring-zoe-outline/40"
              >
                <h3 className="text-base font-extrabold tracking-[-0.02em] text-zoe-ink">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-zoe-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="bg-zoe-oat px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.4rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-zoe-ink sm:text-[3.25rem]">
            Walk with us while Zoe grows up.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-zoe-muted sm:text-lg sm:leading-8">
            Join the waitlist, read the journal, or just email me. We&apos;re building carefully, and thoughtful people make that better.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:bg-zoe-forest"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-zoe-ink shadow-[0_14px_32px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 transition hover:-translate-y-0.5"
            >
              Read the journal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
