import Link from "next/link";
import type { ReactNode } from "react";
import { displayHeading, headingAccent, lede, sectionPad, sheet, wrap } from "./styles";

// Short answer to "who taught this thing the Bible?" The full version lives on
// /how-zoe-teaches; keep claims here in sync with that page.

const icon = (children: ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const PILLARS = [
  {
    icon: icon(
      <>
        <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
        <path d="m9 10 2 2 4-4" />
      </>
    ),
    title: "Real verses, checked in code.",
    body: "Every quote comes word for word from the World English Bible. The AI isn't allowed to quote from memory.",
  },
  {
    icon: icon(
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    title: "Theology you can read.",
    body: "Historic Christian orthodoxy at the center. Humble where Christians disagree. Your church's call on the rest.",
  },
  {
    icon: icon(
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M5.6 5.6l12.8 12.8" />
      </>
    ),
    title: "Lines it won't cross.",
    body: "It never claims God told it something, never says it's praying for you, and never stands in for your church.",
  },
];

export default function ScriptureSection() {
  return (
    <section id="scripture" aria-labelledby="sc-h" className={`${sheet} ${sectionPad} bg-zoe-oat`}>
      <div className={`${wrap} grid items-center gap-[clamp(36px,6vw,88px)] min-[901px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]`}>
        <div>
          <h2 id="sc-h" className={`${displayHeading} max-w-[11ch] [text-wrap:balance]`}>
            Who taught Zoe <em className={headingAccent}>the Bible?</em>
          </h2>
          <p className={`${lede} mt-5 max-w-[44ch]`}>
            Fair question. Nobody built a magic Bible AI. We built the guardrails around one, and we&apos;d rather show you
            than ask you to trust us.
          </p>
          <Link
            href="/how-zoe-teaches"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-zoe-ink px-[22px] py-[15px] text-[15px] font-bold leading-none text-white no-underline transition-transform duration-200 hover:-translate-y-px active:scale-[0.97]"
          >
            See how Zoe handles the Bible
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-3.5">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="grid grid-cols-[44px_1fr] gap-4 rounded-3xl bg-white px-[26px] pb-7 pt-[26px] outline outline-1 outline-zoe-outline/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#E4F6EE] text-zoe-sap">{p.icon}</span>
              <div>
                <h3 className="mb-1.5 mt-1.5 text-xl font-extrabold leading-[1.2] tracking-[-0.025em] text-zoe-ink">{p.title}</h3>
                <p className="text-[15.5px] leading-[1.6] text-zoe-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
