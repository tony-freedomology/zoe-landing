"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "tony@zoe.live";

type CopyState = "idle" | "copied" | "selected";

const LABEL: Record<CopyState, string> = {
  idle: "Copy",
  copied: "Copied",
  selected: "Selected",
};

/** Tony's email as plain selectable text, with a Copy button (falls back to selecting the text). */
export default function CopyEmail({ className = "" }: { className?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const textRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = (next: CopyState) => {
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1600);
  };

  const selectText = () => {
    const node = textRef.current;
    const selection = typeof window !== "undefined" ? window.getSelection() : null;
    if (node && selection) selection.selectAllChildren(node);
    flash("selected");
  };

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(EMAIL);
      flash("copied");
    } catch {
      selectText();
    }
  };

  return (
    <p className={`flex flex-wrap items-center gap-2.5 text-[14.5px] font-semibold text-zoe-muted ${className}`}>
      <span>Email me anytime:</span>
      <code ref={textRef} className="select-all font-sans font-extrabold text-zoe-ink">
        {EMAIL}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={state === "idle" ? `Copy ${EMAIL}` : LABEL[state]}
        className="rounded-full border-0 bg-[#E4F6EE] px-[11px] py-[7px] text-[12.5px] font-bold leading-none text-zoe-forest transition-colors hover:bg-[#d6f1e5]"
      >
        {LABEL[state]}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Email address copied" : state === "selected" ? "Email address selected" : ""}
      </span>
    </p>
  );
}
