import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zoe is a quiet SMS discipleship tool shaped around six commitments: honesty, attention, memory, privacy, Scripture, and ordinary access.",
  alternates: {
    canonical: "/about",
  },
};

const tenets = [
  {
    title: "Zoe is unmistakably AI.",
    body: "Not a pastor. Not a friend. Not the Holy Spirit. Zoe can schedule a text. It can't schedule the wind (John 3:8). Honest about its limits, careful with spiritual language, and quick to send people toward humans when text isn't enough.",
  },
  {
    title: "Attention, not engagement.",
    body: "No streaks. No badges. No shame for the days someone doesn't show up. The goal isn't more time on a screen. The goal is a more attentive life with God.",
  },
  {
    title: "Memory serves follow-through.",
    body: "Zoe remembers the thread of a person's real life so it can help them return to what mattered: the promise from Tuesday, the verse from Sunday, the prayer they didn't want to lose.",
  },
  {
    title: "Pastors see the cohort, never the person.",
    body: "Church leaders can see patterns across a congregation, not private confessions. Aggregate insight, never surveillance. No surprise sharing. No pastoral dashboard full of individual messages.",
  },
  {
    title: "Historic Christianity, plainly.",
    body: "Scripture first. Essentials held firmly. Disputed things held with humility. Hard questions redirected toward pastors, friends, and wise human counsel.",
  },
  {
    title: "In the place people already are.",
    body: "No app. No login. No dashboard to remember. Zoe lives in SMS because real people already know how to receive a text, read it, and answer honestly.",
  },
];

const makerNotes = [
  {
    label: "Former worship pastor",
    body: "Tony spent more than a decade helping people encounter God on Sundays, then watching how quickly the week could bury what happened in the room.",
  },
  {
    label: "Builder by necessity",
    body: "Zoe is what he wished existed: a quiet structure for the space between sermon and follow-through, built with enough restraint to know what it isn't.",
  },
  {
    label: "Built in public",
    body: "The product is early, opinionated, and changing quickly. The journal is where the team writes about the theology, product choices, and lessons learned along the way.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="bg-zoe-oat px-6 pb-20 pt-32 text-zoe-ink md:pb-28 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-[2.85rem] lg:text-[3.25rem]">
                AI that's{" "}
                <span className="font-serif italic font-normal tracking-normal text-zoe-sap">
                  quiet enough
                </span>{" "}
                to point past itself.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-zoe-muted md:text-xl md:leading-8">
                Six commitments that shape every line of code, every nudge, every word Zoe sends, and every boundary we refuse to blur.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45">
              <p className="font-serif text-2xl italic leading-[1.25] tracking-normal text-zoe-sap">
                Useful technology should get quieter as faith gets more personal.
              </p>
              <p className="mt-5 text-sm font-semibold leading-7 text-zoe-muted">
                Zoe exists to help people return to scripture, prayer, and the next faithful step. The tool shouldn't become the point.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zoe-outline/55 bg-zoe-oat px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-zoe-outline/55 bg-zoe-outline/55 md:grid-cols-2 lg:grid-cols-3">
          {tenets.map((tenet, index) => (
            <article key={tenet.title} className="bg-zoe-oat p-8 md:min-h-[340px] md:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zoe-sap">
                Tenet {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-8 text-[2.2rem] font-extrabold leading-[0.96] tracking-[-0.062em] text-zoe-ink md:text-[3.15rem]">
                {tenet.title}
              </h2>
              <p className="mt-6 text-base font-medium leading-7 tracking-normal text-zoe-muted [word-spacing:0.08em]">
                {tenet.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-zoe-surface px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28 rounded-[2rem] bg-zoe-oat p-8 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/50">
            <h2 className="text-[3.1rem] font-extrabold leading-[0.9] tracking-[-0.04em] text-zoe-ink [word-spacing:0.045em] md:text-[4.7rem] md:tracking-[-0.048em]">
              Hi, I&apos;m Tony.
            </h2>
            <p className="mt-6 font-serif text-2xl italic leading-9 tracking-normal text-zoe-forest">
              Zoe isn't a replacement for the church. It's a small tool for the space where people usually lose the thread.
            </p>
          </div>

          <div>
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 md:p-10">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-zoe-outline/35 md:h-28 md:w-28">
                  <Image
                    src="/assets/founder/tony-headshot.jpg"
                    alt="Tony Allen, founder of Zoe"
                    fill
                    className="object-cover object-[center_18%]"
                    sizes="112px"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-normal text-zoe-forest">
                    Tony Allen · Founder
                  </p>
                  <div className="mt-6 space-y-5 text-[1.05rem] font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
                    <p>
                      For more than a decade, Tony served as a worship pastor. His work was presence: rooms, songs, prayer, scripture, and the moments when people know God is asking something of them.
                    </p>
                    <p>
                      But he kept watching the same thing happen after Sunday. The sermon landed. The note was written. The intention was real. Then Monday came, and the thread disappeared under ordinary life.
                    </p>
                    <p>
                      Zoe is the attempt to build a quiet structure for that gap. Not a spiritual authority. Not a replacement for people. A text thread that remembers, asks, points back to scripture, and helps someone take the next faithful step.
                    </p>
                  </div>
                  <p className="mt-7 text-sm font-semibold tracking-normal text-zoe-muted">
                    Built in Cleveland, OH.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {makerNotes.map((note) => (
                <div key={note.label} className="rounded-[1.6rem] bg-zoe-oat p-6 ring-1 ring-zoe-outline/45">
                  <p className="text-sm font-extrabold tracking-[-0.02em] text-zoe-ink">{note.label}</p>
                  <p className="mt-3 text-sm font-medium leading-6 tracking-normal text-zoe-muted [word-spacing:0.06em]">{note.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zoe-oat px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.045em] text-zoe-ink md:text-[5rem]">
            Walk with us while Zoe grows up.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
            Join the waitlist, read the journal, or bring Zoe into a church conversation. We're building carefully, and we want thoughtful people close to the work.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold tracking-normal text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:bg-zoe-forest [word-spacing:0.14em]"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold tracking-normal text-zoe-ink shadow-[0_18px_36px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 transition hover:-translate-y-0.5"
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
