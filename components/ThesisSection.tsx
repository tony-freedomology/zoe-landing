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

const tenets = [
  {
    title: "Not a replacement.",
    body: "Zoe does not pretend to be a pastor, a friend, or the Holy Spirit. It is a quiet tool for attention and follow-through.",
  },
  {
    title: "Built for the ordinary week.",
    body: "The work is not a better devotional at 7am. The work is helping scripture stay present at noon, at dinner, and before sleep.",
  },
  {
    title: "Memory serves obedience.",
    body: "Continuity matters because formation takes time. Zoe remembers what you said so it can help you come back to it.",
  },
];

export default function ThesisSection({ variant = "default" }: ThesisProps = {}) {
  const isDefault = variant === "default";

  return (
    <section
      className={clsx(
        "relative border-b px-6 py-24 md:py-32",
        isDefault ? "border-white/10 bg-[#173A2E] text-white" : "border-zoe-outline/45 bg-zoe-oat text-zoe-ink",
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
            The thesis
          </p>
          <h2
            className={clsx(
              "mt-6 max-w-4xl text-[3.3rem] font-extrabold leading-[0.92] tracking-[-0.075em] md:text-[5.9rem]",
              isDefault ? "text-white" : "text-zoe-ink",
            )}
          >
            AI that helps attention return to Jesus.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className={clsx(
            "rounded-[2rem] p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] md:p-10",
            isDefault ? "bg-white/8 ring-1 ring-white/12" : "bg-white ring-1 ring-zoe-outline/45",
          )}
        >
          <p
            className={clsx(
              "font-serif text-3xl italic leading-[1.22] tracking-normal [word-spacing:0.06em] md:text-4xl",
              isDefault ? "text-white/88" : "text-zoe-forest",
            )}
          >
            The question is not whether AI can make spiritual content. The question is whether it can stay quiet enough to help people practice what they already believe.
          </p>
          <div className={clsx("mt-8 h-px", isDefault ? "bg-white/12" : "bg-zoe-outline/55")} />
          <div className="mt-8 grid gap-6">
            {tenets.map((tenet, index) => (
              <div key={tenet.title} className="grid gap-4 md:grid-cols-[3.5rem_1fr]">
                <p className="font-serif text-3xl italic leading-none text-zoe-sap">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className={clsx("text-xl font-extrabold tracking-[-0.03em]", isDefault ? "text-white" : "text-zoe-ink")}>
                    {tenet.title}
                  </h3>
                  <p className={clsx("mt-2 font-medium leading-7 tracking-normal [word-spacing:0.08em]", isDefault ? "text-white/62" : "text-zoe-muted")}>
                    {tenet.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
