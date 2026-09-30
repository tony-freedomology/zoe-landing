"use client";

import { useEffect, useState } from "react";

// Local-only toggle for the accent exploration. Rendered by app/layout.tsx
// outside production; overrides data-accent on <html> (default "combo", set in
// the layout) and remembers the choice.
export const ACCENTS = [
  { key: "serif", label: "Old: serif italic" },
  { key: "weight", label: "A · Light + heavy" },
  { key: "stroke", label: "B · Jade stroke" },
  { key: "marker", label: "C · Mint marker" },
  { key: "tonal", label: "D · Jade, same weight" },
  { key: "combo", label: "E · Stroke + marker (default)" },
] as const;

export default function AccentPreview() {
  const [accent, setAccent] = useState<string>("combo");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("accent");
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("zoe-accent-preview");
    } catch {}
    const initial = fromUrl ?? saved ?? "combo";
    setAccent(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    try {
      window.localStorage.setItem("zoe-accent-preview", accent);
    } catch {}
  }, [accent]);

  return (
    <div className="fixed bottom-4 left-4 z-[100] max-w-[calc(100vw-32px)] font-sans">
      {open ? (
        <div className="rounded-[20px] bg-zoe-ink p-2 text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between px-2 pb-1.5 pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-zoe-sap">Accent preview</span>
            <button type="button" onClick={() => setOpen(false)} className="text-[12px] font-bold text-white/60 hover:text-white">
              Hide
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {ACCENTS.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => setAccent(a.key)}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-bold transition-colors ${
                  accent === a.key ? "bg-zoe-sap text-white" : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="rounded-full bg-zoe-ink px-4 py-2 text-[12.5px] font-bold text-white shadow-lg">
          Accent: {ACCENTS.find((a) => a.key === accent)?.label ?? accent}
        </button>
      )}
    </div>
  );
}
