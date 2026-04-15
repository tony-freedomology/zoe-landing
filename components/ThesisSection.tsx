"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

function MarkedText({
  children,
  variant = "underline",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: "underline" | "circle";
  delay?: number;
  className?: string;
}) {
  return (
    <span className={clsx("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      {variant === "circle" ? (
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-2 -inset-y-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)] overflow-visible"
          viewBox="0 0 120 42"
          preserveAspectRatio="none"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.path
            d="M61 4C83 4 113 9 116 21C119 34 91 39 61 38C29 37 5 32 4 20C3 8 34 4 61 4Z"
            fill="none"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: { pathLength: 1, opacity: 1 },
            }}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.svg>
      ) : (
        <motion.svg
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full overflow-visible"
          viewBox="0 0 120 12"
          preserveAspectRatio="none"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.path
            d="M4 7C22 4 40 5 58 7C78 9 98 8 116 5"
            fill="none"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: { pathLength: 1, opacity: 1 },
            }}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4"
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.svg>
      )}
    </span>
  );
}

interface ThesisProps {
  variant?: "default" | "jesus-red" | "emerald-uni";
}

export default function ThesisSection({ variant = "default" }: ThesisProps = {}) {
  return (
    <section className="relative flex w-full justify-center border-b border-misty-green-900 bg-misty-green-950 px-4 py-20 text-white md:px-6 md:py-32">
      <div className="flex w-full max-w-[900px] flex-col gap-14 md:gap-[4.5rem]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-zoe-leaf">The Question</p>
          <h2
            className={clsx(
              "mb-8 text-4xl font-bold leading-[1.1] tracking-tighter-editorial-relaxed md:text-5xl lg:text-6xl",
              variant === "jesus-red" ? "text-[#f5efe6]" : "text-white"
            )}
          >
            AI that helps you walk with Jesus more consistently.
          </h2>
          <div className="space-y-6 text-xl font-normal leading-[1.8] tracking-[0.01em] text-[#E8E1D5]/85 md:text-[1.65rem]">
            <p>Wait&hellip;can that be done?...should it? And how?</p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-amber-500">The Tension</p>
          <div className="space-y-6 text-lg font-normal leading-[1.8] tracking-[0.01em] text-[#E8E1D5]/78 md:text-[22px]">
            <p>
              It sounds obvious, but it really isn&apos;t. How do you make it helpful but not invasive? Proactive but not creepy? How do you make sure it points people{" "}
              <MarkedText variant="circle" delay={0.15} className="font-semibold text-zoe-leaf">
                TO
              </MarkedText>{" "}
              Jesus and doesn&apos;t become a substitute{" "}
              <MarkedText variant="circle" delay={0.35} className="font-semibold text-amber-400">
                FOR
              </MarkedText>{" "}
              Him?
            </p>
            <p>
              Here&apos;s what <span className="font-semibold text-white">IS</span> obvious: AI is here, whether we like it or not, and the church (at large) needs to figure out what we&apos;re going to do about it. That&apos;s why we&apos;re building in public, and talking about it in public, and inviting you to join the conversation (and the alpha!)
            </p>
            <p>
              We&apos;re really not interested in AI that tries to replace pastors (we are pastors, so that would be silly), tries to fill the role of the Holy Spirit, or offers fake spiritual certainty.
            </p>
            <p>
              But we are very interested in how AI could be used to help people&apos;s attention turn to Christ more often. We already know AI can make a great morning devotional, but what we need is{" "}
              <MarkedText delay={0.55} className="font-semibold text-zoe-leaf">
                day-long devotion.
              </MarkedText>
            </p>
            <p>
              <MarkedText delay={0.75} className="font-semibold text-white">
                Can it help with that?
              </MarkedText>
            </p>
          </div>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto font-serif text-4xl italic text-zoe-leaf md:text-6xl"
        >
          Meet Zoe.
        </motion.p>
      </div>
    </section>
  );
}
