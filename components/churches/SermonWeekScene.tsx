"use client";

import { useEffect, useRef, type ReactNode } from "react";
import ZoeMark from "../ZoeMark";
import { wrap } from "../home/styles";
import { HeartIcon, LockIcon, ReturnIcon } from "./icons";

// "One sermon, one week": a 560vh scroll track with a sticky 100svh stage.
// Scroll progress p (0..1) drives the 7-day rail, the copy beat, the status-bar
// clock, which texts are visible (with a typing indicator before each Zoe text),
// and the "What Pastor Mike sees" cards. Below 1060px those cards appear one at a
// time as a bottom sheet over the phone, inside SHEET_WINDOWS. Everything is
// written straight to the DOM from one rAF-throttled scroll handler, so React
// never re-renders while scrolling (same pattern as components/home/DayScene).

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PHASES = [
  { at: 0, day: 0, clock: "12:10" },
  { at: 0.23, day: 2, clock: "7:00" },
  { at: 0.44, day: 4, clock: "4:12" },
  { at: 0.7, day: 6, clock: "9:00" },
];

type CardId = "setup" | "care" | "brief";

/** [card, from, to): when each pastor card shows as the mobile/tablet bottom sheet. */
const SHEET_WINDOWS: [CardId, number, number][] = [
  ["setup", 0.03, 0.2],
  ["care", 0.645, 0.7],
  ["brief", 0.72, 1.01],
];

/** When each card appears in the desktop pastor column. */
const CARD_AT: Record<CardId, number> = { setup: 0.03, care: 0.645, brief: 0.72 };

const BEATS: { day: string; title: string; body: ReactNode }[] = [
  {
    day: "Sunday",
    title: "You preach.",
    body: (
      <>
        Share your notes or the sermon audio. Zoe learns <b>the big idea and the one practice</b> you want people to
        carry into the week.
      </>
    ),
  },
  {
    day: "Tuesday",
    title: "It shows up in real life.",
    body: (
      <>
        A short morning text with the passage and one honest question about <b>their actual week</b>. No app. Just
        their messages.
      </>
    ),
  },
  {
    day: "Thursday",
    title: "Someone needs a person.",
    body: (
      <>
        Zoe follows up on what people said mattered. When someone wants human care, <b>they choose what&apos;s shared</b>,
        and your team gets a simple request.
      </>
    ),
  },
  {
    day: "Saturday",
    title: "You see what's landing.",
    body: (
      <>
        A short brief of <b>shared patterns</b>: what&apos;s resonating, what might need clarifying, and who asked for a
        call. Never private messages.
      </>
    ),
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const bubble = "home-pop max-w-[80%] rounded-[19px] px-[13px] py-[9px] text-[14.5px] font-medium leading-[1.36]";
const tsClass = "self-center mb-[3px] mt-2.5 text-[11px] font-semibold text-[#8a8a8e] [&_b]:text-[#555]";
const memClass =
  "home-pop mb-px mt-1 inline-flex items-center gap-1.5 self-start rounded-full py-[5px] pl-2 pr-2.5 text-[11px] font-bold";

function Zoe({ t, children }: { t: number; children: ReactNode }) {
  return (
    <div className={`${bubble} self-start rounded-bl-[6px] bg-[#E9E9EB] text-[#111]`} data-t={t} data-zoe="" hidden>
      {children}
    </div>
  );
}

function You({ t, children }: { t: number; children: ReactNode }) {
  return (
    <div className={`${bubble} self-end rounded-br-[6px] bg-[#007AFF] text-white`} data-t={t} hidden>
      {children}
    </div>
  );
}

function Stamp({ t, day, time }: { t: number; day: string; time: string }) {
  return (
    <div className={tsClass} data-t={t} hidden>
      <b>{day}</b> {time}
    </div>
  );
}

const tag = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-extrabold";
const cardTitle = "mt-2.5 text-lg font-extrabold leading-[1.25] tracking-[-0.02em]";
const cardBody = "mt-1.5 text-sm leading-[1.5] text-zoe-muted [&_b]:text-zoe-ink";
const dlClass = "mb-0 mt-3 grid gap-2.5";
const dt = "text-xs font-extrabold text-zoe-muted";
const dd = "ml-0 mt-0.5 text-[14.5px] font-semibold leading-[1.4]";
// Matches the approved prototype render (muted 14px bold; the care card sits 10px lower).
const never =
  "mt-1.5 flex items-start gap-2 border-t border-[rgba(187,202,193,0.5)] pt-2.5 text-sm font-bold leading-[1.5] text-zoe-muted";

function PastorCard({ id }: { id: CardId }) {
  if (id === "setup") {
    return (
      <>
        <span className={`${tag} bg-[#E4F6EE] text-zoe-forest`}>Sunday · Sermon set up</span>
        <h4 className={cardTitle}>Peace in the storm · Philippians 4:4–9</h4>
        <dl className={dlClass}>
          <div>
            <dt className={dt}>Big idea</dt>
            <dd className={dd}>Anxiety isn&apos;t a lack of faith. Bring it to God.</dd>
          </div>
          <div>
            <dt className={dt}>Practice this week</dt>
            <dd className={dd}>Each morning, name one worry in prayer.</dd>
          </div>
        </dl>
      </>
    );
  }
  if (id === "care") {
    return (
      <>
        <span className={`${tag} bg-[#FBF0DF] text-[#9A5B1E]`}>Thursday · Care request</span>
        <h4 className={cardTitle}>Dana R. asked for a call</h4>
        <p className={cardBody}>
          She chose to share: <b>her name</b> and <b>&ldquo;Tuesday afternoons are best.&rdquo;</b>
        </p>
        <p className={`${never} !mt-2.5`}>
          <LockIcon size={14} className="mt-[3px] flex-none" />
          Nothing else from her conversation.
        </p>
      </>
    );
  }
  return (
    <>
      <span className={`${tag} bg-[#E4F6EE] text-zoe-forest`}>Saturday · Weekly brief</span>
      <span className="float-right mt-1 text-[11px] font-semibold text-[#9aa19e]">Example data</span>
      <h4 className={cardTitle}>64 people in this week&apos;s rhythm</h4>
      <dl className={dlClass}>
        <div>
          <dt className={dt}>What&apos;s landing</dt>
          <dd className={dd}>The morning worry prayer. 41 people tried it at least twice.</dd>
          <div className="mt-1.5 h-2 overflow-hidden rounded-lg bg-zoe-surface">
            <i className="block h-full w-[64%] rounded-lg bg-zoe-sap" />
          </div>
        </div>
        <div>
          <dt className={dt}>Worth clarifying</dt>
          <dd className={dd}>Some people are hearing anxiety as weak faith. One sentence from the pulpit could help.</dd>
        </div>
        <div>
          <dt className={dt}>Care requests</dt>
          <dd className={dd}>2 people asked for a call.</dd>
        </div>
      </dl>
      <p className={never}>
        <LockIcon size={14} className="mt-[3px] flex-none" />
        Never included: private messages, prayer lists, individual struggles.
      </p>
    </>
  );
}

const cardShell =
  "ch-pcard rounded-[22px] bg-white px-5 py-[18px] text-left shadow-[0_14px_34px_rgba(45,50,49,0.07)] outline outline-1 outline-[rgba(187,202,193,0.45)]";
const pastorLabel = "ch-pastor-label flex items-center gap-2 text-[13px] font-extrabold text-zoe-muted";
const CARD_IDS: CardId[] = ["setup", "care", "brief"];

export default function SermonWeekScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const week = sectionRef.current;
    const stage = stageRef.current;
    if (!week || !stage) return;

    const q = (sel: string) => stage.querySelector(sel) as HTMLElement;
    const qa = (sel: string) => Array.from(stage.querySelectorAll<HTMLElement>(sel));
    const items = qa("[data-thread] [data-t]").map((el) => ({
      el,
      t: Number(el.dataset.t),
      zoe: el.hasAttribute("data-zoe"),
    }));
    const cards = qa("[data-pastor] [data-card]").map((el) => ({ el, t: CARD_AT[el.dataset.card as CardId] }));
    const sheetCards = qa("[data-sheet] [data-card]");
    const typing = q("[data-typing]");
    const clock = q("[data-clock]");
    const sheet = q("[data-sheet]");
    const days = qa("[data-days] li");
    const beats = qa("[data-beat]");

    let lastPhase = -1;
    let lastSheet = "";

    const frame = () => {
      const r = week.getBoundingClientRect();
      const p = clamp(-r.top / (week.offsetHeight - window.innerHeight));

      let phase = 0;
      PHASES.forEach((ph, i) => {
        if (p >= ph.at) phase = i;
      });
      if (phase !== lastPhase) {
        lastPhase = phase;
        beats.forEach((b, i) => {
          b.classList.toggle("is-on", i === phase);
          b.setAttribute("aria-hidden", String(i !== phase));
        });
        const d = PHASES[phase].day;
        days.forEach((li, i) => {
          li.classList.toggle("is-now", i === d);
          li.classList.toggle("is-past", i < d);
        });
        clock.textContent = PHASES[phase].clock;
      }

      let typingOn = false;
      for (const it of items) {
        const vis = p >= it.t;
        if (it.el.hidden === vis) it.el.hidden = !vis;
        if (it.zoe && !vis && p > it.t - 0.028 && p > 0.015) typingOn = true;
      }
      typing.hidden = !typingOn;

      for (const c of cards) {
        const vis = p >= c.t;
        if (c.el.hidden === vis) c.el.hidden = !vis;
      }

      // The sheet keeps showing its last card while it slides away.
      const win = SHEET_WINDOWS.find(([, a, b]) => p >= a && p < b);
      const id = win ? win[0] : "";
      if (id !== lastSheet) {
        lastSheet = id;
        if (id) sheetCards.forEach((el) => (el.hidden = el.dataset.card !== id));
        sheet.classList.toggle("is-shown", Boolean(id));
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = week.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) frame();
      });
    };

    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="week" aria-label="One sermon, one week" className="relative z-[4] -mt-10 h-[560vh]">
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] overflow-hidden rounded-t-[36px] bg-zoe-oat shadow-[0_-14px_40px_rgba(45,50,49,0.07)]"
      >
        <div
          className={`${wrap} grid h-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[clamp(20px,3vw,48px)] pt-[78px] max-[1060px]:grid-cols-[minmax(0,1fr)_auto] max-[760px]:grid-cols-1 max-[760px]:grid-rows-[auto_minmax(0,1fr)] max-[760px]:justify-items-center max-[760px]:gap-3 max-[760px]:pt-[76px] max-[760px]:text-center`}
        >
          <div className="self-center max-[760px]:w-full max-[760px]:max-w-[420px] max-[760px]:rounded-[22px] max-[760px]:bg-zoe-surface max-[760px]:px-4 max-[760px]:py-3.5">
            <ol
              className="ch-days relative m-0 mb-7 grid max-w-[400px] list-none grid-cols-7 gap-1.5 p-0 max-[760px]:mx-auto max-[760px]:mb-2.5 max-[760px]:gap-1"
              data-days
              aria-hidden="true"
            >
              {DAYS.map((d, i) => (
                <li
                  key={d}
                  className={`rounded-xl bg-white py-[9px] text-center text-xs font-extrabold text-zoe-muted outline outline-1 outline-[rgba(187,202,193,0.45)] transition-all duration-[350ms] max-[760px]:py-1.5 max-[760px]:text-[11px]${i === 0 ? " is-now" : ""}`}
                >
                  {d}
                </li>
              ))}
            </ol>
            <div className="ch-beats relative min-h-[250px] max-[760px]:min-h-[118px]">
              {BEATS.map((beat, i) => (
                <div key={beat.title} className={`ch-beat${i === 0 ? " is-on" : ""}`} data-beat aria-hidden={i !== 0}>
                  <small className="text-[13px] font-extrabold text-zoe-forest max-[760px]:hidden">{beat.day}</small>
                  <h3 className="mt-1.5 text-[clamp(34px,3.6vw,52px)] font-extrabold leading-none tracking-[-0.045em] text-zoe-ink max-[760px]:text-[clamp(26px,7.4vw,34px)]">
                    {beat.title}
                  </h3>
                  <p className="mt-3.5 max-w-[40ch] text-[clamp(16px,1.3vw,18px)] font-medium leading-[1.6] text-zoe-muted max-[760px]:mx-auto max-[760px]:mt-2 max-[760px]:text-[14.5px] max-[760px]:leading-[1.5] [&_b]:text-zoe-ink">
                    {beat.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative h-[min(720px,calc(100svh-108px))] w-[min(340px,86vw)] rounded-[54px] bg-[#1d2120] p-[11px] text-left shadow-[0_50px_90px_-30px_rgba(17,22,40,0.35)] max-[760px]:-mb-[60px] max-[760px]:h-full max-[760px]:max-h-[660px] max-[760px]:w-[min(330px,84vw)] max-[760px]:self-end"
            role="img"
            aria-label="Example: a church member's texts with Zoe during the week. On Sunday Zoe shares Pastor Mike's big idea and this week's practice, and adds Dana's dad's surgery to her prayer list. On Tuesday it sends Philippians 4:6. On Thursday it asks how the surgery went and, with Dana's permission, passes along only her name and that Tuesday afternoons are best for a call."
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[44px] bg-white">
              <div className="absolute left-1/2 top-2.5 h-7 w-24 -translate-x-1/2 rounded-[20px] bg-[#111]" />
              <div className="flex items-center justify-between px-[26px] pb-1 pt-3.5 text-sm font-bold tabular-nums text-[#111]">
                <span data-clock>12:10</span>
                <span className="flex items-center gap-[5px]" aria-hidden="true">
                  <svg width="18" height="12" viewBox="0 0 18 12">
                    <rect x="0" y="8" width="3" height="4" rx="1" fill="#111" />
                    <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="#111" />
                    <rect x="10" y="3" width="3" height="9" rx="1" fill="#111" />
                    <rect x="15" y="0" width="3" height="12" rx="1" fill="#111" />
                  </svg>
                  <svg width="25" height="12" viewBox="0 0 25 12">
                    <rect x=".5" y=".5" width="21" height="11" rx="3.5" fill="none" stroke="#111" opacity=".5" />
                    <rect x="2" y="2" width="16" height="8" rx="2" fill="#111" />
                    <rect x="23" y="4" width="1.6" height="4" rx=".8" fill="#111" opacity=".5" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col items-center gap-[3px] border-b border-[#eee] pb-[9px] pt-1.5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-zoe-oat outline outline-1 outline-zoe-outline/60">
                  <ZoeMark className="h-4 w-auto text-zoe-sap" />
                </span>
                <span className="text-[11.5px] font-semibold text-[#333]">Zoe</span>
              </div>

              <div
                className="flex min-h-0 flex-1 flex-col justify-end gap-[5px] overflow-hidden px-3 py-2.5"
                data-thread
                aria-hidden="true"
              >
                <Stamp t={0.01} day="Sunday" time="12:10 PM" />
                <Zoe t={0.02}>
                  Hey Dana 👋 Pastor Mike&apos;s big idea this morning: anxiety isn&apos;t a lack of faith. It&apos;s something
                  to bring to God.
                </Zoe>
                <Zoe t={0.055}>Want to try this week&apos;s practice? Each morning, name one worry in prayer.</Zoe>
                <You t={0.095}>yes. my dad has surgery thursday and i&apos;m pretty anxious</You>
                <Zoe t={0.135}>
                  That&apos;s a lot to carry 💛 I&apos;ll send you Philippians 4:6 each morning. Want me to add your dad to
                  your prayer list?
                </Zoe>
                <You t={0.17}>please</You>
                <div className={`${memClass} bg-[#FDECEC] text-[#B4435B]`} data-t={0.19} hidden>
                  <HeartIcon size={12} />
                  Prayer list · Dad&apos;s surgery Thursday
                </div>

                <Stamp t={0.25} day="Tuesday" time="7:00 AM" />
                <Zoe t={0.26}>
                  Morning ☀️
                  <div className="mt-2 rounded-[13px] bg-white px-3 pb-[11px] pt-2.5">
                    <small className="mb-1.5 block text-[10.5px] font-extrabold leading-none tracking-[0.09em] text-zoe-forest">
                      PHILIPPIANS 4:6 · NIV
                    </small>
                    <q className="font-serif text-[15px] italic leading-[1.38] [quotes:none]">
                      Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving,
                      present your requests to God.
                    </q>
                  </div>
                </Zoe>
                <Zoe t={0.295}>What do you want to bring to God about your dad today? 🙏</Zoe>
                <You t={0.335}>that the surgeons are steady. and that i&apos;d actually sleep tonight</You>
                <Zoe t={0.375}>Bring exactly that. 1 Peter 5:7 says He cares for you. Sleep included 🙂</Zoe>

                <Stamp t={0.455} day="Thursday" time="4:12 PM" />
                <div className={`${memClass} bg-[#E4F6EE] text-zoe-forest`} data-t={0.465} hidden>
                  <ReturnIcon size={12} />
                  From Sunday · &ldquo;dad has surgery thursday&rdquo;
                </div>
                <Zoe t={0.475}>How did your dad&apos;s surgery go? 💛</Zoe>
                <You t={0.515}>it went well!! and i slept last night</You>
                <Zoe t={0.555}>
                  That&apos;s so good to hear 🙌 Would it help to have someone from Grace check in? Totally up to you.
                </Zoe>
                <You t={0.595}>yeah a call would be nice. tuesday afternoons are best</You>
                <Zoe t={0.635}>
                  Done. I&apos;ll pass along just your name and &ldquo;Tuesday afternoons.&rdquo; Nothing from our
                  conversation.
                </Zoe>

                <Stamp t={0.78} day="Saturday" time="9:00 AM" />
                <Zoe t={0.79}>
                  Pastor Mike finishes Philippians 4 tomorrow. Anything from this week you&apos;d want to thank God for?
                </Zoe>
                <You t={0.84}>honestly all of it</You>
                <div
                  className="home-typing flex gap-1 self-start rounded-[19px] rounded-bl-[6px] bg-[#E9E9EB] px-3.5 py-3"
                  data-typing
                  hidden
                >
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 pb-[18px] pt-2" aria-hidden="true">
                <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#eee] text-[#777]">+</span>
                <span className="flex-1 rounded-full border border-[#ddd] px-3.5 py-[7px] text-[13.5px] text-[#aaa]">
                  Text Message
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex h-[min(720px,calc(100svh-108px))] max-w-[400px] flex-col justify-end gap-3 self-center max-[1060px]:hidden"
            data-pastor
            aria-label="What the pastor sees"
          >
            <p className={pastorLabel}>What Pastor Mike sees</p>
            {CARD_IDS.map((id) => (
              <div key={id} className={cardShell} data-card={id} hidden>
                <PastorCard id={id} />
              </div>
            ))}
          </div>
        </div>

        <div className="ch-sheet" data-sheet aria-hidden="true">
          <p className={`${pastorLabel} mb-2 ml-1 !inline-flex rounded-full bg-zoe-oat px-3 py-1.5 !text-zoe-ink shadow-[0_6px_16px_rgba(45,50,49,0.12)]`}>
            What Pastor Mike sees
          </p>
          {CARD_IDS.map((id) => (
            <div key={id} className={cardShell} data-card={id} hidden={id !== "setup"}>
              <PastorCard id={id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
