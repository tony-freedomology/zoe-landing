import Link from "next/link";
import type { ReactNode } from "react";
import { btnJade, sectionPad, sheet, wrap } from "../home/styles";
import { serifItalic } from "./fonts";
import { aboutH2, aboutLede, btnGhost } from "./styles";

/** Newsreader Italic accent inside a heading. */
function Accent({ children }: { children: ReactNode }) {
  return <em className={`${serifItalic} font-normal tracking-[-0.01em] text-zoe-sap`}>{children}</em>;
}

function Icon({ children, size = 22, stroke = 2 }: { children: ReactNode; size?: number; stroke?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const boundaries = [
  {
    title: "Unmistakably AI",
    body: "Not a pastor. Not a friend. Not the Holy Spirit. Code that can help you remember, return, and follow through.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M9 9h6v6H9z" />
      </>
    ),
  },
  {
    title: "Where people already are",
    body: "SMS and iMessage. No app to download, no dashboard to remember, no new habit stacked on top of the rest of life.",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
  {
    title: "Toward Him, not toward Zoe",
    body: "If it starts pulling people deeper into the tool and further from Jesus or real community, we will have failed.",
    icon: <path d="M12 19V5M5 12l7-7 7 7" />,
    dark: true,
  },
];

export function AboutBoundaries() {
  return (
    <section aria-labelledby="bd-h" className={`${sheet} ${sectionPad} bg-zoe-oat`}>
      <div className={wrap}>
        <h2 id="bd-h" className={`${aboutH2} max-w-[15ch]`}>
          A small experiment in attention, <Accent>not another feed.</Accent>
        </h2>
        <p className={aboutLede}>Three lines we&apos;re building around, and won&apos;t cross.</p>
        <div className="mt-[clamp(40px,5vw,60px)] grid gap-4 min-[901px]:grid-cols-3">
          {boundaries.map((b) => (
            <div
              key={b.title}
              className={`grid content-start gap-2.5 rounded-[26px] px-7 py-[30px] ${
                b.dark ? "bg-zoe-ink" : "bg-white outline outline-1 outline-zoe-outline/40"
              }`}
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-[14px] text-zoe-sap ${
                  b.dark ? "bg-zoe-sap/[0.18]" : "bg-[#E4F6EE]"
                }`}
              >
                <Icon>{b.icon}</Icon>
              </span>
              <h3 className={`mt-2.5 text-[22px] font-extrabold tracking-[-0.03em] ${b.dark ? "text-white" : "text-zoe-ink"}`}>
                {b.title}
              </h3>
              <p className={`text-base leading-[1.6] ${b.dark ? "text-white/[0.78]" : "text-zoe-muted"}`}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const arrow = <path d="M5 12h14M13 6l6 6-6 6" />;
const wayClass =
  "grid grid-cols-[44px_1fr] items-center gap-4 rounded-[22px] bg-white px-5 py-[18px] text-zoe-ink no-underline outline outline-1 outline-zoe-outline/40 min-[521px]:grid-cols-[52px_1fr_auto]";
const wayIcon =
  "grid h-11 w-11 place-items-center rounded-2xl bg-zoe-sap text-white min-[521px]:h-[52px] min-[521px]:w-[52px]";
const wayTitle = "block text-[17.5px] font-extrabold tracking-[-0.015em]";
const wayBody = "text-[14.5px] text-zoe-muted";
const wayGo = "hidden text-zoe-forest min-[521px]:block";
const cmd = "rounded-md bg-zoe-surface px-1.5 py-px font-sans font-extrabold text-zoe-ink";

const linkedWays = {
  beta: {
    href: "/#waitlist",
    title: "Try the beta",
    body: "Join the waitlist. We invite people in small groups.",
    icon: arrow,
  },
  church: {
    href: "/churches",
    title: "Bring it to your church",
    body: "Pilots start with a small group. Take Sunday into the week.",
    icon: <path d="M3 21h18M5 21V10l7-5 7 5v11M10 21v-5h4v5" />,
  },
  read: {
    href: "/blog",
    title: "Read along",
    body: "The journal is where we think out loud about AI and faith.",
    icon: (
      <>
        <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
        <path d="M9 7h6M9 11h6" />
      </>
    ),
  },
};

function WayLink({ way }: { way: (typeof linkedWays)[keyof typeof linkedWays] }) {
  return (
    <Link href={way.href} className={`${wayClass} transition-transform duration-200 hover:-translate-y-0.5`}>
      <span className={wayIcon}>
        <Icon>{way.icon}</Icon>
      </span>
      <span>
        <b className={wayTitle}>{way.title}</b>
        <span className={wayBody}>{way.body}</span>
      </span>
      <span className={wayGo}>
        <Icon size={18} stroke={2.4}>
          {arrow}
        </Icon>
      </span>
    </Link>
  );
}

export function AboutHelp() {
  return (
    <section id="help" aria-labelledby="help-h" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-surface`}>
      <div className={`${wrap} grid items-start gap-[clamp(32px,6vw,88px)] min-[901px]:grid-cols-[0.85fr_1.15fr]`}>
        <div>
          <h2 id="help-h" className={aboutH2}>
            Help us build it <Accent>well.</Accent>
          </h2>
          <p className={aboutLede}>
            Zoe gets better because thoughtful people use it and tell us the truth. Here&apos;s how you can be part of that.
          </p>
        </div>
        <div className="grid gap-3">
          <WayLink way={linkedWays.beta} />
          <div className={wayClass}>
            <span className={wayIcon}>
              <Icon>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M12 7v4M12 14h.01" />
              </Icon>
            </span>
            <div>
              <b className={wayTitle}>Tell us what&apos;s off</b>
              <span className={wayBody}>
                Start a text to Zoe with <code className={cmd}>BUG:</code> or <code className={cmd}>FEEDBACK:</code> and it
                comes straight to us. I read it.
              </span>
            </div>
          </div>
          <WayLink way={linkedWays.church} />
          <WayLink way={linkedWays.read} />
        </div>
      </div>
    </section>
  );
}

export function AboutClose() {
  return (
    <section aria-labelledby="about-close-h" className={`${sheet} ${sectionPad} bg-zoe-oat text-center`}>
      <div className={wrap}>
        <h2
          id="about-close-h"
          className="mx-auto max-w-[13ch] text-[clamp(44px,7vw,96px)] font-extrabold leading-[0.95] tracking-[-0.052em] text-zoe-ink [text-wrap:balance]"
        >
          Walk with us while Zoe <Accent>grows up.</Accent>
        </h2>
        <p className="mx-auto mb-[30px] mt-[22px] max-w-[48ch] text-[clamp(17px,1.5vw,19px)] font-medium text-zoe-muted">
          Join the waitlist, read the journal, or just email me. We&apos;re building carefully, and thoughtful people make that
          better.
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2.5">
          <Link href="/#waitlist" className={btnJade}>
            Join the waitlist
          </Link>
          <Link href="/blog" className={btnGhost}>
            Read the journal
          </Link>
        </div>
      </div>
    </section>
  );
}
