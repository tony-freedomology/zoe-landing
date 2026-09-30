"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Verse check: shows a from-memory quote being caught and replaced   */
/* with the exact World English Bible text.                           */
/* ------------------------------------------------------------------ */

const FROM_MEMORY = "Come to me, all you who are weary and burdened, and I will give you rest.";
const EXACT_WEB = "Come to me, all you who labor and are heavily burdened, and I will give you rest.";

export function VerseCheck() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(3);
      return;
    }
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStep(0);
        timers = [900, 2300, 3500].map((ms, i) => window.setTimeout(() => setStep(i + 1), ms));
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [run]);

  const stages = ["The AI drafts a reply", "Code checks every quote", "Mismatch found", "Exact text goes out"];

  return (
    <div ref={ref} className="rounded-[30px] bg-white p-[clamp(18px,3vw,30px)] shadow-[0_24px_60px_rgba(45,50,49,0.08)] outline outline-1 outline-zoe-outline/40">
      <ol className="grid grid-cols-4 gap-1.5" aria-label="Verse check steps">
        {stages.map((label, i) => (
          <li key={label} className="grid gap-2">
            <span
              className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? (i === 2 ? "bg-[#E8A33D]" : "bg-zoe-sap") : "bg-zoe-surface"}`}
            />
            <span className={`text-[11.5px] font-bold leading-tight transition-colors duration-500 min-[521px]:text-[12.5px] ${i <= step ? "text-zoe-ink" : "text-zoe-muted/60"}`}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-3">
        <div className="rounded-[20px] bg-zoe-surface p-5">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-zoe-muted">Draft · written from memory</p>
          <p
            className={`mt-2 text-[17px] font-semibold leading-[1.5] transition-all duration-700 ${
              step >= 2 ? "text-zoe-muted line-through decoration-[#E8A33D] decoration-2" : "text-zoe-ink"
            } ${step === 1 ? "tc-scan" : ""}`}
          >
            &ldquo;{FROM_MEMORY}&rdquo;
          </p>
          <p
            className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-bold transition-opacity duration-500 ${
              step >= 2 ? "bg-[#FBEFD9] text-[#8A5A10] opacity-100" : "opacity-0"
            }`}
            aria-hidden={step < 2}
          >
            Doesn&apos;t match the World English Bible
          </p>
        </div>

        <div
          className={`rounded-[20px] p-5 outline outline-2 transition-all duration-700 ${
            step >= 3 ? "bg-[#E4F6EE] outline-zoe-sap/50 opacity-100 translate-y-0" : "bg-[#E4F6EE] outline-transparent opacity-0 translate-y-2"
          }`}
          aria-hidden={step < 3}
        >
          <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-zoe-forest">What you actually get</p>
          <p className="mt-2 text-[17px] font-semibold leading-[1.5] text-zoe-ink">&ldquo;{EXACT_WEB}&rdquo;</p>
          <p className="mt-2 text-[13.5px] font-bold text-zoe-forest">Matthew 11:28 · World English Bible</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-zoe-muted">
          The first line is close. Close isn&apos;t good enough for Scripture.
        </p>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setRun((r) => r + 1);
          }}
          className="shrink-0 rounded-full bg-zoe-surface px-3.5 py-2 text-[13px] font-bold text-zoe-ink transition-transform hover:-translate-y-px active:scale-[0.97]"
        >
          Replay
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Belief rings: clear at the center, humble in the middle, your      */
/* church's call at the edge.                                          */
/* ------------------------------------------------------------------ */

const RINGS = [
  {
    key: "core",
    label: "Held firmly",
    title: "The center of the faith.",
    body: "Where Scripture and the historic church speak clearly, Zoe says so plainly. No hedging.",
    items: [
      "One God in three persons: Father, Son, and Holy Spirit",
      "Jesus is fully God, and the clearest picture of who God is",
      "Jesus rose bodily from the dead",
      "We're saved by grace through faith, not by earning it",
    ],
  },
  {
    key: "open",
    label: "Held humbly",
    title: "Where faithful Christians disagree.",
    body: "Zoe lays out the serious views instead of picking a team, and won't pretend the Bible settles what it doesn't settle.",
    items: [
      "Predestination and free will",
      "Women's roles in church leadership and the home",
      "How Genesis and science fit together",
      "The hard questions about hell and judgment",
    ],
  },
  {
    key: "church",
    label: "Your church's call",
    title: "What your tradition gets to answer.",
    body: "Zoe isn't here to referee your denomination. On these, it points you back to your church and your pastor.",
    items: [
      "How baptism and communion are practiced",
      "How your church is led, and church discipline",
      "Decisions that belong to your local pastor",
      "The distinctives your tradition holds its own way",
    ],
  },
] as const;

export function BeliefRings() {
  const [active, setActive] = useState(0);
  const ring = RINGS[active];
  // Outer to inner so the center paints on top.
  const circles = [
    { i: 2, r: 148 },
    { i: 1, r: 104 },
    { i: 0, r: 58 },
  ];

  return (
    <div className="grid items-center gap-[clamp(28px,5vw,64px)] min-[861px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="mx-auto w-full max-w-[250px] min-[861px]:max-w-[360px]">
        <svg viewBox="0 0 320 320" className="w-full" role="img" aria-label="Three rings: held firmly at the center, held humbly around it, your church's call at the edge">
          {circles.map(({ i, r }) => {
            const on = i === active;
            return (
              <circle
                key={i}
                cx="160"
                cy="160"
                r={r}
                onClick={() => setActive(i)}
                className="cursor-pointer transition-all duration-300"
                fill={on ? (i === 0 ? "#1DC286" : "#E4F6EE") : i === 0 ? "#BFEBD8" : i === 1 ? "#F6F3EE" : "#FCF9F4"}
                stroke={on ? "#1DC286" : "#BBCAC1"}
                strokeWidth={on ? 2.5 : 1.2}
              />
            );
          })}
          <text x="160" y="164" textAnchor="middle" className="pointer-events-none" fontSize="13" fontWeight="800" fill={active === 0 ? "#fff" : "#007354"}>
            Firmly
          </text>
          <text x="160" y="80" textAnchor="middle" className="pointer-events-none" fontSize="12.5" fontWeight="800" fill={active === 1 ? "#007354" : "#5f5e5b"}>
            Humbly
          </text>
          <text x="160" y="36" textAnchor="middle" className="pointer-events-none" fontSize="12.5" fontWeight="800" fill={active === 2 ? "#007354" : "#5f5e5b"}>
            Your church
          </text>
        </svg>
      </div>

      <div>
        <div role="tablist" aria-label="How firmly Zoe holds a belief" className="flex flex-wrap gap-2">
          {RINGS.map((r, i) => (
            <button
              key={r.key}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2.5 text-[14px] font-bold transition-colors ${
                i === active ? "bg-zoe-ink text-white" : "bg-white text-zoe-ink outline outline-1 outline-zoe-outline/60 hover:bg-zoe-surface"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div key={ring.key} role="tabpanel" className="tc-fade mt-5 rounded-[26px] bg-white p-[clamp(22px,3vw,32px)] outline outline-1 outline-zoe-outline/40">
          <h3 className="text-[clamp(22px,2.4vw,28px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-zoe-ink">{ring.title}</h3>
          <p className="mt-2.5 text-[16px] leading-[1.6] text-zoe-muted">{ring.body}</p>
          <ul className="mt-5 grid gap-2.5">
            {ring.items.map((item) => (
              <li key={item} className="grid grid-cols-[20px_1fr] items-start gap-3 text-[15.5px] font-semibold leading-[1.45] text-zoe-ink">
                <span className={`mt-[5px] h-2.5 w-2.5 rounded-full ${active === 0 ? "bg-zoe-sap" : active === 1 ? "bg-zoe-sap/50" : "outline outline-2 outline-zoe-sap/60"}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
