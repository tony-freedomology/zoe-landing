"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import clsx from "clsx";
import ZoeSVG from "./ZoeSVG";
import { zoeQuoteHeroLine, zoeQuoteSections } from "../lib/zoeQuote";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionTones = [
  {
    border: "border-[#d4c090]/25",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(214,188,127,0.18),transparent_48%)]",
    badge: "border-[#c8a962]/35 bg-[#c8a962]/8 text-[#ead8ae]",
    number: "text-[#d9c188]/35",
  },
  {
    border: "border-[#9cc5ae]/25",
    glow: "bg-[radial-gradient(circle_at_top_right,rgba(94,139,116,0.18),transparent_46%)]",
    badge: "border-[#7fa58a]/35 bg-[#7fa58a]/10 text-[#d7ebde]",
    number: "text-[#96b9a0]/35",
  },
  {
    border: "border-[#7fb4cf]/25",
    glow: "bg-[radial-gradient(circle_at_bottom_left,rgba(110,163,191,0.20),transparent_50%)]",
    badge: "border-[#7baecc]/35 bg-[#7baecc]/10 text-[#dcebf4]",
    number: "text-[#8eb8d0]/35",
  },
] as const;

export default function ZoeQuoteArtwork() {
  useEffect(() => {
    document.body.classList.add("hide-navbar");
    return () => document.body.classList.remove("hide-navbar");
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d1312] text-[#f4ecd8]">
      <style jsx global>{`
        html,
        body {
          background: #0d1312 !important;
          min-height: 100%;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,212,164,0.10),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(77,115,96,0.26),transparent_34%),radial-gradient(circle_at_80%_26%,rgba(28,52,64,0.34),transparent_32%),linear-gradient(180deg,#0d1312_0%,#111917_45%,#0d1312_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-screen">
          <Image
            src="/assets/hero/parchment-bg.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute left-1/2 top-[-8rem] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#f0d9a3]/16 blur-[120px]" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-[22rem] w-[22rem] rounded-full bg-[#386251]/20 blur-[130px]" />
        <div className="absolute left-[-6rem] top-[28rem] h-[16rem] w-[16rem] rounded-full bg-[#486a7c]/16 blur-[120px]" />
        <div className="absolute right-[-10vw] top-[10rem] hidden w-[34rem] opacity-[0.08] lg:block">
          <ZoeSVG variant="default" color="#f1dfb7" fast={true} />
        </div>
      </div>

      <header className="relative z-20 px-5 pt-4 md:px-8 md:pt-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#d9c89f]/78">
              A Meditation On Zoe
            </p>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-[#f4ecd8]/82 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-[#f4ecd8]"
          >
            Back to site
          </Link>
        </div>
      </header>

      <section className="relative z-10 px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:items-end">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-4xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#d9c89f]/74">
              Not a landing page
            </p>
            <h1 className="mt-5 max-w-[11ch] font-serif text-[3.5rem] leading-[0.9] text-[#f8f1df] md:text-[5.75rem] lg:text-[6.6rem]">
              {zoeQuoteHeroLine}
            </h1>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-[#e7dcc3]/76 md:text-lg md:leading-8">
              The short pages can keep the warm, conversational voice. This page gives the quote its own room,
              with enough atmosphere and space to read it slowly.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-[#d4c090]/18 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur-md md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,210,159,0.14),transparent_42%)]" />
            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#d9c89f]/76">
                Opening Movement
              </p>
              <p className="mt-5 font-serif text-[1.9rem] leading-[0.96] text-[#f8f1df] md:text-[2.6rem]">
                There is a life which keeps the heart beating and the lungs at their trade.
              </p>
              <p className="mt-5 text-[15px] leading-7 text-[#e7dcc3]/78 md:text-base md:leading-8">
                It is good, and God made it. Yet it lives by borrowing.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-5 pb-28 md:px-8 md:pb-36">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="self-start lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md md:p-6">
              <div className="w-20 opacity-82">
                <ZoeSVG variant="default" color="#f3e6c5" fast={true} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.36em] text-[#d9c89f]/72">
                Gallery Notes
              </p>
              <p className="mt-3 text-sm leading-7 text-[#e7dcc3]/72">
                Read it in three movements: borrowed life, higher life, then Tuesday afternoon.
              </p>
              <div className="mt-8 space-y-3">
                {zoeQuoteSections.map((section, index) => (
                  <div key={section.id} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d9c89f]/64">
                      {section.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#f4ecd8]/84">
                      {section.highlight}
                    </p>
                    <p className="mt-1 text-xs text-[#e7dcc3]/54">Movement 0{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-8 md:space-y-10">
            {zoeQuoteSections.map((section, index) => {
              const tone = sectionTones[index];

              return (
                <motion.article
                  key={section.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={fadeUp}
                  className={clsx(
                    "relative overflow-hidden rounded-[2rem] border bg-white/[0.045] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-md md:p-10",
                    tone.border
                  )}
                >
                  <div className={clsx("absolute inset-0", tone.glow)} />
                  <div className="relative z-10 grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8">
                    <div className="flex items-start gap-4 md:flex-col md:gap-3">
                      <span className={clsx("rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em]", tone.badge)}>
                        {section.label}
                      </span>
                      <span className={clsx("font-serif text-5xl leading-none md:text-7xl", tone.number)}>
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h2 className="max-w-[14ch] font-serif text-[2.05rem] leading-[0.96] text-[#f8f1df] md:text-[3.25rem]">
                        {section.highlight}
                      </h2>
                      <p className="mt-6 text-[15px] leading-7 text-[#ece2cb]/80 md:text-[17px] md:leading-8">
                        {section.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-5 pb-10 md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md md:flex-row md:items-end md:justify-between md:p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#d9c89f]/72">
              Final Line
            </p>
            <p className="mt-3 max-w-[18ch] font-serif text-[2rem] leading-[0.96] text-[#f8f1df] md:text-[2.7rem]">
              Heaven begins even here.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-[#f4ecd8]/82 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-[#f4ecd8]"
          >
            Return to Zoe
          </Link>
        </div>
      </footer>
    </main>
  );
}
