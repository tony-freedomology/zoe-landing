"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Clickable "life" in the about letter — opens a modal on Lewis's bios / zoe distinction.
 * Passages from Mere Christianity, Book IV (Beyond Personality).
 */
const LEWIS_PASSAGES = [
  {
    id: "names",
    chapter: "Making and Begetting",
    body: (
      <>
        <p>
          In reality, the difference between Biological life and Spiritual life is so important that I am going to give them two distinct names. The Biological sort which comes to us through Nature, and which (like everything else in Nature) is always tending to run down and decay so that it can only be kept up by perpetual subsidies from Nature in the form of air, water, food, etc., is{" "}
          <span className="font-extrabold text-zoe-ink">Bios</span>. The Spiritual life which is in God from all eternity, and which made the whole natural universe, is{" "}
          <span className="font-extrabold text-zoe-sap">Zoe</span>.
        </p>
        <p>
          Bios has, to be sure, a certain shadowy or symbolic resemblance to Zoe: but only the sort of resemblance there is between a photo and a place, or a statue and a man. A man who changed from having Bios to having Zoe would have gone through as big a change as a statue which changed from being a carved stone to being a real man.
        </p>
      </>
    ),
  },
  {
    id: "statues",
    chapter: "Good Infection",
    body: (
      <>
        <p>
          We are not begotten by God, we are only made by Him: in our natural state we are not sons of God, only (so to speak) statues. We have not got{" "}
          <span className="font-extrabold text-zoe-sap">Zoe</span> or spiritual life: only{" "}
          <span className="font-extrabold text-zoe-ink">Bios</span> or biological life which is presently going to run down and die.
        </p>
        <p>
          He came to this world and became a man in order to spread to other men the kind of life He has — by what I call &lsquo;good infection.&rsquo; Every Christian is to become a little Christ. The whole purpose of becoming a Christian is simply nothing else.
        </p>
      </>
    ),
  },
  {
    id: "open",
    chapter: "Good Infection",
    body: (
      <p>
        We have not got to try to climb up into spiritual life by our own efforts; it has already come down into the human race. If we will only lay ourselves open to the one Man in whom it was fully present, and who, in spite of being God, is also a real man, He will do it in us and for us.
      </p>
    ),
  },
  {
    id: "contact",
    chapter: "The New Men",
    body: (
      <p>
        He came into the created universe, of His own will, bringing with Him the{" "}
        <span className="font-extrabold text-zoe-sap">Zoe</span>, the new life. (I mean new to us, of course: in its own place Zoe has existed for ever and ever.) And He transmits it not by heredity but by what I have called &lsquo;good infection.&rsquo; Everyone who gets it gets it by personal contact with Him.
      </p>
    ),
  },
] as const;

export default function AboutZoeLifeWord() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <p className="text-[1.1rem] font-medium leading-[1.78] text-zoe-ink/84 sm:text-[1.14rem] sm:leading-[1.82]">
        There&apos;s a kind of{" "}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="group relative inline font-extrabold text-zoe-sap underline decoration-zoe-sap/35 decoration-2 underline-offset-[0.18em] transition hover:decoration-zoe-sap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zoe-sap/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          life
          <span className="ml-1 inline-flex h-4 w-4 translate-y-[-0.05em] items-center justify-center rounded-full bg-zoe-sap/12 text-[0.65rem] font-bold text-zoe-sap transition group-hover:bg-zoe-sap/20">
            ?
          </span>
        </button>{" "}
        we are invited to with God, and I&apos;m convinced it starts with where you&apos;re placing your attention. The eternal God, I believe, stands ready at every moment, inviting us to return, remember, and relate to Him. We are just so often somewhere else.
      </p>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <button
              type="button"
              aria-label="Close quote"
              className="absolute inset-0 bg-[#1a1f1e]/55 backdrop-blur-[3px]"
              onClick={close}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-[1] max-h-[min(90dvh,820px)] w-full overflow-y-auto rounded-t-[1.75rem] bg-zoe-oat shadow-[0_40px_120px_rgba(26,31,30,0.35)] ring-1 ring-white/30 sm:max-w-[36rem] sm:rounded-[1.75rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 380, damping: 32 }
              }
            >
              <div className="relative px-6 pb-8 pt-6 sm:px-9 sm:pb-10 sm:pt-8">
                <div className="sticky top-0 z-[2] -mx-6 mb-2 flex items-start justify-between gap-4 bg-zoe-oat/95 px-6 pb-4 pt-0 backdrop-blur-sm sm:-mx-9 sm:px-9">
                  <div className="pt-1">
                    <h2
                      id={titleId}
                      className="text-[1.55rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-zoe-ink sm:text-[1.75rem]"
                    >
                      Why the name Zoe
                    </h2>
                    <p className="mt-2 text-sm font-medium text-zoe-muted">
                      C.S. Lewis · <em className="not-italic font-semibold text-zoe-ink/70">Mere Christianity</em>, Book IV
                    </p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-zoe-ink shadow-sm ring-1 ring-zoe-outline/40 transition hover:bg-zoe-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zoe-sap/40"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {LEWIS_PASSAGES.map((passage, index) => (
                    <figure
                      key={passage.id}
                      className="rounded-[1.25rem] bg-white px-5 py-5 shadow-[0_10px_32px_rgba(45,50,49,0.04)] ring-1 ring-zoe-outline/35 sm:px-6 sm:py-6"
                    >
                      <figcaption className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zoe-sap/12 text-[0.65rem] font-extrabold text-zoe-sap">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-zoe-muted">
                          {passage.chapter}
                        </span>
                      </figcaption>
                      <blockquote className="mt-3.5 space-y-4 text-[1.02rem] font-medium leading-[1.72] text-zoe-ink/88 sm:text-[1.06rem] sm:leading-[1.76]">
                        {passage.body}
                      </blockquote>
                    </figure>
                  ))}
                </div>

                <p className="mt-6 text-sm font-medium leading-6 text-zoe-muted">
                  That&apos;s the kind of life this product is named after — not more screen time, but the life of God breaking into ordinary days.
                </p>

                <button
                  type="button"
                  onClick={close}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-zoe-sap px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#19b078] active:scale-[0.99] sm:w-auto sm:px-8"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
