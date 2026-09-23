"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Clickable "life" in the about letter. Opens a native modal <dialog> on Lewis's
 * bios / zoe distinction (focus containment, Esc, and the top layer come from the
 * browser; focus returns to the trigger on close).
 * Passages from Mere Christianity, Book IV (Beyond Personality). Keep verbatim.
 */
const LEWIS_PASSAGES = [
  {
    id: "names",
    chapter: "Making and Begetting",
    body: (
      <>
        <p>
          In reality, the difference between Biological life and Spiritual life is so important that I am going to give them two distinct names. The Biological sort which comes to us through Nature, and which (like everything else in Nature) is always tending to run down and decay so that it can only be kept up by perpetual subsidies from Nature in the form of air, water, food, etc., is{" "}
          <b className="font-extrabold text-zoe-forest">Bios</b>. The Spiritual life which is in God from all eternity, and which made the whole natural universe, is{" "}
          <b className="font-extrabold text-zoe-forest">Zoe</b>.
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
          <b className="font-extrabold text-zoe-forest">Zoe</b> or spiritual life: only{" "}
          <b className="font-extrabold text-zoe-forest">Bios</b> or biological life which is presently going to run down and die.
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
        <b className="font-extrabold text-zoe-forest">Zoe</b>, the new life. (I mean new to us, of course: in its own place Zoe has existed for ever and ever.) And He transmits it not by heredity but by what I have called &lsquo;good infection.&rsquo; Everyone who gets it gets it by personal contact with Him.
      </p>
    ),
  },
] as const;

export default function AboutZoeLifeWord() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      document.documentElement.style.overflow = "";
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const show = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    setOpen(true);
  };

  return (
    <>
      <p>
        There&apos;s a kind of{" "}
        <button
          ref={triggerRef}
          type="button"
          onClick={show}
          className="relative inline border-0 bg-transparent p-0 font-extrabold text-zoe-forest underline decoration-zoe-sap/50 decoration-2 underline-offset-[0.18em] transition-colors hover:decoration-zoe-sap focus-visible:rounded focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-zoe-sap"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          life
          <sup className="ml-[3px] inline-grid h-[17px] w-[17px] place-items-center rounded-full bg-[#E4F6EE] align-[0.35em] text-[11px] font-extrabold leading-none text-zoe-forest">
            ?
          </sup>
        </button>{" "}
        we are invited to with God, and I&apos;m convinced it starts with where you&apos;re placing your attention. The eternal God, I believe, stands ready at every moment, inviting us to return, remember, and relate to Him. We are just so often somewhere else.
      </p>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-full max-w-[min(560px,calc(100vw-32px))] rounded-[26px] border-0 bg-zoe-oat p-0 text-zoe-ink shadow-[0_30px_80px_rgba(20,25,24,0.3)] backdrop:bg-[rgba(26,31,30,0.5)]"
      >
        <div className="grid max-h-[min(86dvh,760px)] gap-3.5 overflow-auto p-[clamp(22px,4vw,34px)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="text-2xl font-extrabold tracking-[-0.03em]">
                Bios and Zoe
              </h2>
              <p className="mt-1 text-[13.5px] font-semibold text-zoe-muted">
                C.S. Lewis · <em className="not-italic">Mere Christianity</em>, Book IV
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Close"
              className="grid h-10 w-10 flex-none place-items-center rounded-full border-0 bg-white text-zoe-ink shadow-[0_0_0_1px_rgba(187,202,193,0.6)] transition-colors hover:bg-zoe-surface"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {LEWIS_PASSAGES.map((passage) => (
            <figure
              key={passage.id}
              className="m-0 rounded-[18px] bg-white px-5 py-[18px] shadow-[0_8px_24px_rgba(45,50,49,0.05)]"
            >
              <blockquote className="m-0 grid gap-3 text-[15.5px] leading-[1.7] text-zoe-ink/[0.86]">
                {passage.body}
              </blockquote>
              <figcaption className="mt-2.5 text-[12.5px] font-bold text-zoe-muted">{passage.chapter}</figcaption>
            </figure>
          ))}

          <p className="mt-1 text-sm font-medium leading-6 text-zoe-muted">
            That&apos;s the kind of life this product is named after — not more screen time, but the life of God breaking into ordinary days.
          </p>
        </div>
      </dialog>
    </>
  );
}
