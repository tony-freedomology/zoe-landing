"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

interface ThesisProps {
  variant?: "default" | "jesus-red" | "emerald-uni";
}

export default function ThesisSection(_props: ThesisProps = {}) {
  return (
    <section className="relative bg-zoe-oat px-6 pb-24 pt-14 text-zoe-ink md:pb-32 md:pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
            The question
          </p>
          <h2 className="mt-6 max-w-4xl text-[3.3rem] font-extrabold leading-[0.92] tracking-[-0.058em] text-zoe-ink [word-spacing:0.045em] md:text-[5.9rem] md:tracking-[-0.075em]">
            AI that helps you walk with Jesus more consistently.
          </h2>
          <p className="mt-7 max-w-2xl text-xl font-medium leading-9 tracking-normal text-zoe-muted [word-spacing:0.08em]">
            Wait...can that be done?...should it? And how?
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 md:p-10"
        >
          <p className="font-serif text-3xl italic leading-[1.22] tracking-normal text-zoe-sap [word-spacing:0.06em] md:text-4xl">
            The tension
          </p>
          <div className="mt-8 h-px bg-zoe-outline/55" />
          <div className="mt-8 space-y-6 text-lg font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
            <p>
              AI is here whether we like it or not, and the church needs to figure out what we&apos;re going to do about it.
            </p>
            <p>
              We think there are better and worse ways to integrate AI and the spiritual life. That&apos;s why we&apos;re building in public and talking about it in public and inviting you to join the conversation (and the alpha!)
            </p>
            <p>
              Our goal is to build something that helps people turn toward him daily. We&apos;re really not interested in AI that tries to replace pastors (we are pastors, so that would be silly), tries to fill the role of the Holy Spirit, or offers fake spiritual certainty.
            </p>
            <p>
              But we are very interested in how AI could be used to help people&apos;s attention turn to Christ more often. We already know AI can make a great morning devotional, but what we need is <span className="font-extrabold text-zoe-sap">day-long devotion.</span>
            </p>
            <p>
              <span className="font-extrabold text-zoe-ink">Can it help with that?</span>
            </p>
          </div>
          <p className="mt-8 font-serif text-4xl italic leading-none text-zoe-sap md:text-5xl">
            Meet Zoe.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
