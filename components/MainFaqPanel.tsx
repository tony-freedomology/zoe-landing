"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserRound } from "lucide-react";
import clsx from "clsx";
import { mainFaqs } from "../lib/mainFaqs";

type MainFaqPanelProps = {
  context: "page" | "home";
  headingLevel: "h1" | "h2";
  isDefault?: boolean;
};

function LeafIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 15c3-8 7-11 12-12-1 7-4 11-10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12c-2-4 0-7 4-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function MainFaqPanel({
  context,
  headingLevel,
  isDefault = true,
}: MainFaqPanelProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(2);
  const baseId = useId();
  const isPage = context === "page";
  const Heading = headingLevel;

  return (
    <div
      className={clsx(
        "mx-auto max-w-7xl",
        isPage
          ? "rounded-none bg-transparent p-0 shadow-none ring-0 sm:rounded-[2.4rem] sm:bg-white/80 sm:p-4 sm:shadow-[0_28px_90px_rgba(45,50,49,0.07)] sm:ring-1 sm:ring-zoe-outline/35 lg:p-5"
          : isDefault
            ? "rounded-[2rem] bg-white/75 p-3 shadow-[0_28px_90px_rgba(45,50,49,0.07)] ring-1 ring-zoe-outline/35 sm:rounded-[2.4rem] sm:p-4 lg:p-5"
            : "rounded-[2rem] bg-white p-3 shadow-[0_28px_90px_rgba(45,50,49,0.07)] ring-1 ring-slate-200/70 sm:rounded-[2.4rem] sm:p-4 lg:p-5"
      )}
    >
      <div className="grid gap-5 lg:grid-cols-[0.76fr_1.24fr]">
        <aside
          className={clsx(
            "relative self-start overflow-hidden bg-[#fffdf8] p-6 shadow-[inset_0_0_0_1px_rgba(187,202,193,0.34),0_18px_50px_rgba(45,50,49,0.06)] min-[360px]:p-8 sm:rounded-[1.7rem] sm:p-10 lg:p-11",
            isPage ? "min-h-[760px] pb-12 sm:pb-14" : "min-h-[720px] pb-12 sm:pb-14"
          )}
          style={{ backgroundImage: "url('/images/faq/main-faq-paper-texture.jpg')" }}
        >
          <img
            src="/images/faq/main-faq-botanical-motif.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className={clsx(
              "pointer-events-none absolute bottom-[-4.5rem] right-[-6rem] h-96 w-96 rotate-[-8deg] object-contain opacity-[0.42]",
              isPage ? "sm:bottom-[-5.25rem] sm:right-[-6.5rem]" : "sm:h-[22rem] sm:w-[22rem]"
            )}
          />
          <div className="relative z-10">
            <Heading
              className={clsx(
                "max-w-[12ch] font-extrabold leading-[0.96] tracking-[-0.055em] text-zoe-ink",
                isPage
                  ? "text-[2.05rem] min-[360px]:text-[2.62rem] sm:text-[3.75rem] lg:text-[3.95rem]"
                  : "text-[2.05rem] min-[360px]:text-[2.6rem] sm:text-[3.6rem] lg:text-[3.85rem]"
              )}
            >
              Good<br />
              <span className="whitespace-nowrap">questions are</span><br />
              <span className="whitespace-nowrap">welcome here<span className="text-zoe-sap">.</span></span>
            </Heading>
            <svg aria-hidden="true" viewBox="0 0 230 20" className="mt-5 h-5 w-48 max-w-full text-zoe-ink/55" fill="none">
              <path d="M3 12c45-6 88-8 129-6 33 1 63 5 94 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className={clsx("mt-5 max-w-sm text-base font-semibold leading-7 text-zoe-ink/78", isPage ? "space-y-5" : "space-y-4")}>
              <p>You&apos;ve got questions. We get it. We&apos;d be worried if you didn&apos;t have any.</p>
              <p>
                Zoe is still early. You won&apos;t get perfection. You should get{" "}
                {isPage ? "presence, care," : "care, restraint,"} and a team that takes beta feedback seriously.
              </p>
              <p>Thanks for being here.</p>
            </div>
            <img
              src="/images/faq/tony-signature.svg"
              alt="Tony"
              className={clsx("mt-5 h-auto", isPage ? "w-28" : "w-24")}
            />
            <p className="mt-1 text-[0.72rem] font-semibold tracking-[0.08em] text-zoe-ink/55">
              building Zoe
            </p>
          </div>
        </aside>

        <div className="rounded-[1.7rem] bg-[#fffefa] p-4 shadow-[inset_0_0_0_1px_rgba(187,202,193,0.26)] sm:p-6 lg:p-8">
          <div className="flex flex-col gap-3.5">
            {mainFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              const answerId = `${baseId}-answer-${i}`;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[0.95rem] bg-white shadow-[0_8px_24px_rgba(45,50,49,0.07)] ring-1 ring-zoe-outline/35"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={clsx(
                      "flex w-full items-center justify-between gap-5 px-5 py-4 text-left transition sm:px-7 sm:py-5",
                      isDefault ? "hover:bg-zoe-surface/45" : "hover:bg-white/80"
                    )}
                  >
                    <span className="flex items-center gap-4 text-base font-extrabold tracking-[-0.01em] text-zoe-ink sm:text-lg">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-zoe-sap" />
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ scale: isOpen ? 1.05 : 1 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={clsx("shrink-0 text-2xl font-medium leading-none", isOpen ? "text-zoe-sap" : "text-zoe-ink")}
                      aria-hidden="true"
                    >
                      {isOpen ? "-" : "+"}
                    </motion.span>
                  </button>
                  <motion.div
                    id={answerId}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: isPage ? 0.26 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pl-[3.65rem] pt-0 sm:px-7 sm:pb-7 sm:pl-[4.45rem]">
                      <div className="max-w-3xl space-y-3 text-base font-medium leading-8 text-zoe-ink/78">
                        {faq.answer.split("\n\n").map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {faq.note ? (
                        <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zoe-sap/10 px-4 py-3 text-sm font-bold text-zoe-forest">
                          <LeafIcon />
                          {faq.note}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 grid gap-4 px-2 pb-1 pt-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center text-zoe-forest">
                <ShieldCheck className="h-9 w-9" strokeWidth={1.5} />
              </span>
              <p className="text-sm font-bold leading-5 text-zoe-ink">
                You&apos;re in control.
                <span className="block font-semibold text-zoe-muted">Text STOP anytime. No hard feelings.</span>
              </p>
            </div>
            <div className="hidden h-12 w-px bg-zoe-outline/70 sm:block" />
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-zoe-forest shadow-sm ring-1 ring-zoe-outline/35">
                <UserRound className="h-5 w-5" />
              </span>
              <p className="text-sm font-bold leading-5 text-zoe-ink">
                Feedback gets read.
                <span className="block font-semibold text-zoe-muted">I read beta feedback.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
