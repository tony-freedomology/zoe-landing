"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "manual";

function legacyCopy(text: string) {
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

/** "Copy link" pill. Falls back to showing the URL as selectable text. */
export default function CopyLinkButton({ url }: { url: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copied = () => {
    setStatus("copied");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 1600);
  };

  const onClick = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        copied();
        return;
      }
    } catch {
      // fall through to the legacy path
    }
    if (legacyCopy(url)) copied();
    else setStatus("manual");
  };

  const display = url.replace(/^https?:\/\//, "");

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex max-w-full items-center gap-2 rounded-full bg-zoe-surface px-3.5 py-2.5 text-[13px] font-bold leading-none text-zoe-ink transition-colors hover:bg-[#EFEBE4]"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
      </svg>
      <span aria-live="polite" className={status === "manual" ? "select-all truncate" : undefined}>
        {status === "copied" ? "Copied" : status === "manual" ? display : "Copy link"}
      </span>
    </button>
  );
}
