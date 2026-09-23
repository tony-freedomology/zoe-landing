"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import ZoeSVG from "./ZoeSVG";
import Footer from "./Footer";
import { zoeQuoteHeroLine, zoeQuoteSections } from "../lib/zoeQuote";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Strip the roman numeral prefix ("I. Borrowed Life" -> "Borrowed Life").
const plainLabel = (label: string) => label.replace(/^[IVX]+\.\s*/, "");

export default function ZoeQuoteArtwork() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <main>
        <section className="px-5 pb-16 pt-28 sm:px-6 md:px-8 md:pb-24 md:pt-40">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-end lg:gap-16">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <p className="text-base font-bold text-zoe-forest">Why we named it Zoe</p>
              <h1 className="mt-5 max-w-[14ch] text-[2.9rem] font-bold leading-[0.98] tracking-[-0.05em] text-zoe-ink sm:text-[4rem] lg:text-[5rem]">
                {zoeQuoteHeroLine}
              </h1>
              <p className="mt-7 max-w-[34rem] text-lg font-medium leading-8 text-zoe-muted">
                Zoe is the Greek word the New Testament uses for the life only God gives. We named a texting tool after
                it on purpose, so it would always know what it isn&apos;t. Read it slowly.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] bg-zoe-surface p-7 md:p-9"
            >
              <div className="w-16 text-zoe-leaf" aria-hidden="true">
                <ZoeSVG variant="default" color="#1dc286" fast={true} />
              </div>
              <p className="mt-6 text-[1.55rem] font-bold leading-[1.18] tracking-[-0.03em] text-zoe-ink md:text-[1.9rem]">
                There is a life which keeps the heart beating and the lungs at their trade.
              </p>
              <p className="mt-4 text-base font-medium leading-7 text-zoe-muted">
                It is good, and God made it. Yet it lives by borrowing.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-6 md:px-8 md:pb-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
              <p className="text-sm font-bold text-zoe-ink">Four movements</p>
              <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">
                Borrowed life, higher life, then Tuesday afternoon, and one more about the tool itself.
              </p>
              <ol className="mt-6 space-y-1 border-l border-zoe-outline/60">
                {zoeQuoteSections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block py-2 pl-4 text-sm font-semibold text-zoe-muted transition-colors hover:text-zoe-forest"
                    >
                      <span className="text-zoe-forest">0{index + 1}</span>
                      <span className="ml-2">{plainLabel(section.label)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="space-y-5 md:space-y-6">
              {zoeQuoteSections.map((section, index) => {
                const isTool = index === zoeQuoteSections.length - 1;
                return (
                  <Fragment key={section.id}>
                    <motion.article
                      id={section.id}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={fadeUp}
                      className={`scroll-mt-28 rounded-[2rem] p-7 md:p-10 ${
                        isTool ? "bg-[#e5f5ed]" : "bg-white shadow-zoe-card ring-1 ring-zoe-outline/40"
                      }`}
                    >
                      <div className="grid gap-5 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-8">
                        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                          <span className="text-[2.5rem] font-bold leading-none tracking-[-0.05em] text-zoe-leaf md:text-[3.25rem]">
                            0{index + 1}
                          </span>
                          <span className="text-sm font-bold text-zoe-forest">{plainLabel(section.label)}</span>
                        </div>
                        <div>
                          <h2 className="max-w-[20ch] text-[1.85rem] font-bold leading-[1.08] tracking-[-0.035em] text-zoe-ink md:text-[2.5rem]">
                            {section.highlight}
                          </h2>
                          <p className="mt-5 text-[1.05rem] font-medium leading-8 text-zoe-muted md:text-[1.12rem]">
                            {section.body}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                    {index === 2 ? (
                      <p className="pr-2 text-right font-serif text-base italic text-zoe-muted">
                        after C.S. Lewis, Mere Christianity
                      </p>
                    ) : null}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-6 md:px-8 md:pb-32">
          <div className="mx-auto max-w-4xl rounded-[2.25rem] bg-zoe-surface px-6 py-14 text-center sm:px-12 md:py-20">
            <p className="font-serif text-[2.4rem] italic leading-[1.1] text-zoe-ink md:text-[3.4rem]">
              Heaven begins even here.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-8 text-zoe-muted">
              Zoe can schedule a text. It can&apos;t schedule the wind. Its whole job is pointing you toward the One who
              gives life.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-leaf px-7 py-4 text-base font-bold text-white transition hover:brightness-105"
              >
                Return to Zoe
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-bold text-zoe-ink ring-1 ring-zoe-outline/50 transition hover:bg-zoe-oat"
              >
                Read Tony&apos;s note
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer hideWhyZoe />
    </div>
  );
}
