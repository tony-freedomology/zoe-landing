"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

import { Highlight } from "./Highlight";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

interface ThesisProps {
  variant?: "default" | "jesus-red" | "emerald-uni";
}

export default function ThesisSection({ variant = "default" }: ThesisProps = {}) {
  return (
    <section className="relative flex w-full justify-center border-b border-misty-green-900 bg-misty-green-950 px-4 py-24 text-white md:px-6 md:py-40">
      <div className="flex w-full max-w-[900px] flex-col gap-24 md:gap-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-brand-jade">The Promise</p>
          <h2
            className={clsx(
              "mb-8 text-4xl font-bold leading-[1.1] tracking-tighter-editorial-relaxed md:text-5xl lg:text-6xl",
              variant === "jesus-red" ? "text-[#f5efe6]" : "text-white"
            )}
          >
            "I have come that they may have life and have it to the <Highlight type="underline" color="text-brand-jade">full."</Highlight>
          </h2>
          <div className="space-y-6 text-xl font-medium leading-relaxed text-misty-green-100 md:text-2xl">
            <p>
              The Greek word Jesus uses for life here is{" "}
              <Highlight type="circle" color="text-amber-400" scrollOffset={["start 65%", "start 35%"]}>
                <span className="italic text-white">Zoe</span>
              </Highlight>
              . <span className="text-white">Zoe</span> means an abundant life. Vibrant. Active. Eternal.
            </p>
            <p>When Jesus uses this word, He&apos;s not talking about prosperity gospel, and he's not talking about just getting into heaven someday.</p>
            <p>
              He&apos;s talking about life the way it was meant to be - flourishing and fully integrated. He&apos;s talking about life{" "}
              <span className="italic text-white">with</span> God. It&apos;s what you were made for and{" "}
              <span
                className={clsx(
                  "font-bold",
                  variant === "jesus-red"
                    ? "rounded-sm border border-[#7a2332]/30 bg-[#7a2332]/20 px-2 py-0.5 text-[#f5efe6]"
                    : "text-brand-jade"
                )}
              >
                it&apos;s something that can start right now.
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-amber-500">The Reality</p>
          <h3
            className={clsx(
              "mb-6 text-2xl font-semibold leading-tight tracking-tighter-editorial-relaxed md:text-4xl",
              variant === "jesus-red" ? "text-[#f5efe6]" : "text-white"
            )}
          >
            Good intentions aren&apos;t enough when the world is this loud.
          </h3>
          <div className="space-y-6 text-lg leading-relaxed text-misty-green-200 md:text-[22px]">
            <p>
              I&apos;m sure you&apos;ve felt this. Most of us desperately want to walk the path that Jesus invites us to. We genuinely intend to follow God, but the{" "}
              <Highlight type="spiky" color="text-rose-500" scrollOffset={["start 50%", "start 25%"]}>
                busyness and noise
              </Highlight>{" "}
              of life in 2026 - the endless emails, the social media scroll, and the pace of our days - all work together to make it incredibly hard to hear him in the distraction.
            </p>
            <p>
              So we try to set up a practice. We set aside 15 minutes for a &quot;quiet time&quot; - our morning devotional. We mean well, but after a while it becomes like a{" "}
              <Highlight type="checkbox" color="text-rose-500" scrollOffset={["start 55%", "start 15%"]}>
                checkbox.
              </Highlight>{" "}
              A faith-related task we try to knock out early in the day so we can reassure ourselves we&apos;re &quot;good Christians,&quot; before we close the book and let the noise of the world take over the rest of our day.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mx-auto mt-4 max-w-3xl text-center"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-brand-jade">The Answer</p>
          <h3
            className={clsx(
              "mb-8 text-3xl font-semibold leading-tight tracking-tighter-editorial-relaxed md:text-5xl",
              variant === "jesus-red" ? "text-[#f5efe6]" : "text-white"
            )}
          >
            We don&apos;t need a daily devotional. We need <Highlight type="underline" color="text-brand-jade">day-long</Highlight> devotion.
          </h3>
          <p className="mb-12 text-xl font-medium leading-relaxed text-misty-green-100 md:text-2xl">
            What we actually want is a{" "}
            <span className="-translate-x-2 inline-block">
              <Highlight type="circle" color="text-brand-jade">fully integrated life.</Highlight>
            </span>{" "}
            We want to notice where God is actively working, to remember Him often, and to actually walk the path Jesus invited us to walk.
          </p>

          <p className="mb-12 text-xl font-medium leading-relaxed text-misty-green-100 md:text-2xl">
            That kind of life doesn&apos;t come from a better routine. It comes from a companion who walks through the day with you, reminding you what matters, helping you connect the dots, and pointing you back when you drift.
          </p>

          <div
            className={clsx(
              "relative overflow-hidden border p-8 md:p-12",
              variant === "jesus-red"
                ? "rounded-md border-[#e0d8cd] bg-[#f5efe6] shadow-xl shadow-black/20"
                : "rounded-[2rem] border-[#d9e4dc]/70 bg-[linear-gradient(180deg,rgba(252,249,244,0.98),rgba(245,241,234,0.98))] shadow-[0_28px_80px_rgba(0,0,0,0.18)]"
            )}
          >
            <div
              className={clsx(
                "absolute inset-0 bg-gradient-to-br to-transparent",
                variant === "jesus-red" ? "from-white/60" : "from-brand-jade/8 via-transparent"
              )}
            />
            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
              {variant !== "jesus-red" ? (
                <p className="mb-4 font-serif text-sm italic text-[#6c7a73]">Quiet by design.</p>
              ) : null}
              <h3
                className={clsx(
                  "mb-4 md:text-4xl",
                  variant === "jesus-red"
                    ? "text-2xl font-medium tracking-tighter-editorial-relaxed text-[#5c1624]"
                    : "text-2xl font-semibold tracking-tighter-sans text-slate-900"
                )}
              >
                That&apos;s exactly why we built Zoe.
              </h3>
              <p className={clsx("text-lg leading-relaxed md:text-[22px]", variant === "jesus-red" ? "text-slate-800" : "text-slate-600")}>
                It&apos;s not another app to feed your distraction, but a simple, quiet tool designed specifically to bring you back to what matters, all day long.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
