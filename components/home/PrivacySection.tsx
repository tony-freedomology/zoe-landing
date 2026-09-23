import Link from "next/link";
import type { ReactNode } from "react";
import { displayHeading, lede, sectionPad, sheet, wrap } from "./styles";

const icon = (children: ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const GROUPS = [
  {
    title: "When it's just you",
    cards: [
      {
        icon: icon(
          <>
            <rect x="4" y="11" width="16" height="10" rx="2.5" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </>
        ),
        title: "Just between you and God.",
        body: "Your conversations are never shared with your church, your pastor, or anyone else.",
      },
      {
        icon: icon(
          <>
            <path d="M12 3v12M7 10l5 5 5-5" />
            <path d="M5 21h14" />
          </>
        ),
        title: "Your data, your rules.",
        body: "Take your full history with you, or ask us to erase it completely. No hard feelings, no questions asked.",
      },
    ],
  },
  {
    title: "When your church uses Zoe",
    cards: [
      {
        icon: icon(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />),
        title: "Trends, not secrets.",
        body: "Pastors can see themes surfacing across the church, but never individual messages or personal confessions.",
      },
      {
        icon: icon(
          <>
            <circle cx="8" cy="15" r="4" />
            <path d="m11 12 9-9M17 6l3 3M14 9l2 2" />
          </>
        ),
        title: "You hold the keys.",
        body: "Any sharing at the congregation level is always opt-in, and we're clear about exactly what's shared.",
      },
    ],
  },
];

export default function PrivacySection() {
  return (
    <section id="privacy" aria-labelledby="pv-h" className={`${sheet} ${sectionPad} bg-zoe-surface`}>
      <div className={wrap}>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 id="pv-h" className={displayHeading}>
            How private is this?
          </h2>
          <p className={`${lede} mx-auto mt-5 max-w-[56ch]`}>
            Private by default. If a church uses Zoe, leaders see patterns, never personal threads. Any deeper sharing is
            opt-in, narrow, and clearly explained.
          </p>
        </div>

        <div className="mt-[clamp(44px,6vw,72px)] grid gap-[clamp(20px,3vw,32px)] min-[821px]:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3.5 ml-1 text-base font-extrabold text-zoe-ink">{group.title}</h3>
              <div className="grid gap-3.5">
                {group.cards.map((card) => (
                  <div
                    key={card.title}
                    className="grid grid-cols-[44px_1fr] gap-4 rounded-3xl bg-white px-[26px] pb-7 pt-[26px] outline outline-1 outline-zoe-outline/40"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[#E4F6EE] text-zoe-sap">{card.icon}</span>
                    <div>
                      <h4 className="mb-1.5 mt-1.5 text-xl font-extrabold leading-[1.2] tracking-[-0.025em] text-zoe-ink">
                        {card.title}
                      </h4>
                      <p className="text-[15.5px] leading-[1.6] text-zoe-muted">{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid justify-items-center gap-[18px] text-center">
          <p className="max-w-[56ch] font-medium text-zoe-muted">
            We never sell your data, and we never use your personal conversations to train public models.
          </p>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14.5px] font-bold text-zoe-ink no-underline outline outline-1 outline-zoe-outline/60"
          >
            Read the full privacy policy
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
