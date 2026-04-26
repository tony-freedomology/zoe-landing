"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

interface ThesisProps {
  variant?: "default" | "jesus-red" | "emerald-uni";
}

export default function ThesisSection({ variant = "default" }: ThesisProps = {}) {
  const isDefault = variant === "default";

  return (
    <section
      className={clsx(
        "relative border-b px-6 py-24 md:py-32",
        isDefault ? "border-zoe-ink bg-zoe-ink text-white" : "border-zoe-outline/45 bg-zoe-oat text-zoe-ink",
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
            The question
          </p>
          <h2
            className={clsx(
              "mt-6 max-w-4xl text-[3.3rem] font-extrabold leading-[0.92] tracking-[-0.058em] [word-spacing:0.045em] md:text-[5.9rem] md:tracking-[-0.075em]",
              isDefault ? "text-white" : "text-zoe-ink",
            )}
          >
            AI that helps you walk with Jesus more consistently.
          </h2>
          <p className={clsx("mt-7 max-w-2xl text-xl font-medium leading-9 tracking-normal [word-spacing:0.08em]", isDefault ? "text-white/70" : "text-zoe-muted")}>
            Wait...can that be done?...should it? And how?
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className={clsx(
            "rounded-[2rem] p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] md:p-10",
            isDefault ? "bg-white/[0.055]" : "bg-white ring-1 ring-zoe-outline/45",
          )}
        >
          <p
            className={clsx(
              "font-serif text-3xl italic leading-[1.22] tracking-normal [word-spacing:0.06em] md:text-4xl",
              isDefault ? "text-white/92" : "text-zoe-forest",
            )}
          >
            The tension
          </p>
          <div className={clsx("mt-8 h-px", isDefault ? "bg-white/14" : "bg-zoe-outline/55")} />
          <div className={clsx("mt-8 space-y-6 text-lg font-medium leading-8 tracking-normal [word-spacing:0.08em]", isDefault ? "text-white/70" : "text-zoe-muted")}>
            <p>
              It sounds obvious, but it really isn&apos;t. How do you make it helpful but not invasive? Proactive but not creepy? How do you make sure it points people <span className="font-extrabold text-zoe-sap">TO</span> Jesus and doesn&apos;t become a substitute <span className="font-extrabold text-zoe-sap">FOR</span> Him?
            </p>
            <p>
              Here&apos;s what <span className={clsx("font-extrabold", isDefault ? "text-white" : "text-zoe-ink")}>IS</span> obvious: AI is here, whether we like it or not, and the church (at large) needs to figure out what we&apos;re going to do about it. That&apos;s why we&apos;re building in public, and talking about it in public, and inviting you to join the conversation (and the alpha!)
            </p>
            <p>
              We&apos;re really not interested in AI that tries to replace pastors (we are pastors, so that would be silly), tries to fill the role of the Holy Spirit, or offers fake spiritual certainty.
            </p>
            <p>
              But we are very interested in how AI could be used to help people&apos;s attention turn to Christ more often. We already know AI can make a great morning devotional, but what we need is <span className="font-extrabold text-zoe-sap">day-long devotion.</span>
            </p>
            <p>
              <span className={clsx("font-extrabold", isDefault ? "text-white" : "text-zoe-ink")}>Can it help with that?</span>
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
