"use client";

import { useEffect, useRef, type ReactNode } from "react";
import ZoeMark from "../ZoeMark";
import { bubbleYou, bubbleZoe } from "./styles";

// "One ordinary day with Zoe": a 520vh scroll track with a sticky 100svh stage.
// Scroll progress p (0..1) drives the sky, sun/moon, hills tint, which texts are
// visible, the typing indicator, the 1:48 PM banner, the status-bar clock and the
// copy beat. Everything is written straight to the DOM from one rAF-throttled
// scroll handler, so React never re-renders while scrolling.

const PHASES = [
  { at: 0, clock: "7:04", label: "7:00 AM · Morning" },
  { at: 0.37, clock: "1:48", label: "1:48 PM · Midday" },
  { at: 0.66, clock: "9:02", label: "9:02 PM · Evening" },
];

const RAIL = [
  { time: "7:00 AM", label: "Morning" },
  { time: "1:48 PM", label: "Midday" },
  { time: "9:02 PM", label: "Evening" },
];

const BEATS: { title: string; body: ReactNode }[] = [
  {
    title: "Begin with Jesus.",
    body: (
      <>
        Before the email and the noise, Zoe texts you a passage, a little context, and one honest question.{" "}
        <b>No app, no login.</b> Just your messages.
      </>
    ),
  },
  {
    title: "Return in the middle.",
    body: (
      <>
        <b>Zoe remembers</b> what mattered at 7am and brings it back right when the day gets loud.
      </>
    ),
  },
  {
    title: "Notice and release.",
    body: (
      <>
        A short look back before sleep: where you trusted, and <b>the people you said you&apos;d pray for.</b>
      </>
    ),
  },
];

// Deterministic star field (same on server and client).
const STARS = (() => {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: 46 }, () => ({
    left: (rand() * 100).toFixed(1),
    top: (rand() * 100).toFixed(1),
    delay: (rand() * 3).toFixed(2),
    big: rand() > 0.75,
  }));
})();

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const tsClass = "self-center mb-[3px] mt-2.5 text-[11px] font-semibold text-[#8a8a8e]";
const memClass =
  "home-pop mb-px mt-1 inline-flex items-center gap-1.5 self-start rounded-full py-[5px] pl-2 pr-2.5 text-[11px] font-bold";

function Zoe({ t, children }: { t: number; children: ReactNode }) {
  return (
    <div className={`home-pop ${bubbleZoe}`} data-t={t} data-zoe="" hidden>
      {children}
    </div>
  );
}

function You({ t, children }: { t: number; children: ReactNode }) {
  return (
    <div className={`home-pop ${bubbleYou}`} data-t={t} hidden>
      {children}
    </div>
  );
}

export default function DayScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const day = sectionRef.current;
    const ds = stageRef.current;
    if (!day || !ds) return;

    const q = <T extends Element = HTMLElement>(sel: string) => ds.querySelector(sel) as T;
    const qa = (sel: string) => Array.from(ds.querySelectorAll<HTMLElement>(sel));
    const skyNoon = q("[data-sky-noon]");
    const skyNight = q("[data-sky-night]");
    const stars = q("[data-stars]");
    const sun = q("[data-sun]");
    const moon = q<SVGElement>("[data-moon]");
    const cDay = q("[data-cloud-day]");
    const cNight = q("[data-cloud-night]");
    const hDusk = q("[data-hills-dusk]");
    const hNight = q("[data-hills-night]");
    const typing = q("[data-typing]");
    const banner = q("[data-banner]");
    const clock = q("[data-clock]");
    const chip = q("[data-chip]");
    const rail = qa("[data-rail] li");
    const beats = qa("[data-beat]");
    const items = qa("[data-thread] [data-t]").map((el) => ({
      el,
      t: Number(el.dataset.t),
      zoe: el.hasAttribute("data-zoe"),
    }));

    let lastPhase = -1;

    const frame = () => {
      const r = day.getBoundingClientRect();
      const p = clamp(-r.top / (day.offsetHeight - window.innerHeight));
      const W = ds.offsetWidth;
      const H = ds.offsetHeight;

      const noon = clamp((p - 0.3) / 0.1);
      const night = clamp((p - 0.59) / 0.12);
      skyNoon.style.opacity = String(noon * (1 - night));
      skyNight.style.opacity = String(night);
      stars.style.opacity = String(clamp((p - 0.66) / 0.1));
      cNight.style.opacity = String(night);
      cDay.style.opacity = String(1 - night);
      hDusk.style.opacity = String(clamp((p - 0.48) / 0.1) * (1 - clamp((p - 0.66) / 0.1)));
      hNight.style.opacity = String(clamp((p - 0.64) / 0.1));

      const st = clamp(p / 0.72);
      const sx = -0.08 * W + st * 1.16 * W;
      const sy = H * 0.5 - Math.sin(Math.PI * st) * H * 0.4;
      sun.style.transform = `translate3d(${sx.toFixed(0)}px,${sy.toFixed(0)}px,0)`;

      const mt = clamp((p - 0.62) / 0.38);
      moon.style.opacity = String(clamp((p - 0.62) / 0.06));
      moon.style.transform = `translate3d(${(W * (0.08 + mt * 0.6)).toFixed(0)}px,${(
        H *
        (0.62 - Math.sin((mt * Math.PI) / 2) * 0.5)
      ).toFixed(0)}px,0) rotate(${(-20 + mt * 30).toFixed(1)}deg)`;

      let phase = 0;
      PHASES.forEach((ph, i) => {
        if (p >= ph.at) phase = i;
      });
      if (phase !== lastPhase) {
        lastPhase = phase;
        rail.forEach((li, i) => li.classList.toggle("is-on", i === phase));
        beats.forEach((b, i) => {
          b.classList.toggle("is-on", i === phase);
          b.setAttribute("aria-hidden", String(i !== phase));
        });
        clock.textContent = PHASES[phase].clock;
        chip.textContent = PHASES[phase].label;
        ds.classList.toggle("is-night", phase === 2);
      }

      let typingOn = false;
      for (const it of items) {
        const vis = p >= it.t;
        if (it.el.hidden === vis) it.el.hidden = !vis;
        if (it.zoe && !vis && p > it.t - 0.028 && p > 0.02) typingOn = true;
      }
      typing.hidden = !typingOn;
      banner.classList.toggle("is-shown", p > 0.385 && p < 0.44);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = day.getBoundingClientRect();
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
    <section ref={sectionRef} id="day" aria-label="One day with Zoe" className="relative z-[4] -mt-10 h-[520vh]">
      <div ref={stageRef} className="home-day-stage sticky top-0 h-[100svh] overflow-hidden">
        <div className="home-sky-dawn absolute inset-0" />
        <div className="home-sky-noon absolute inset-0" data-sky-noon />
        <div className="home-sky-night absolute inset-0" data-sky-night />
        <div className="home-stars absolute inset-x-0 bottom-[40%] top-0 opacity-0" data-stars aria-hidden="true">
          {STARS.map((s, i) => (
            <i
              key={i}
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
                ...(s.big ? { width: 3, height: 3 } : null),
              }}
            />
          ))}
        </div>
        <div
          className="home-sun absolute left-0 top-0 aspect-square w-[clamp(84px,9vw,132px)] rounded-full"
          data-sun
          aria-hidden="true"
        />
        <svg
          className="absolute left-0 top-0 aspect-square w-[clamp(60px,6vw,92px)] opacity-0 [filter:drop-shadow(0_0_24px_rgba(200,210,255,0.55))] [will-change:transform]"
          viewBox="0 0 200 200"
          data-moon
          aria-hidden="true"
        >
          <path d="M130 40C130 90 90 130 40 130c20 30 60 40 100 20 30-20 40-60 20-100-10-10-20-15-30-10Z" fill="#eef1f8" />
        </svg>
        <div className="home-cloud-ribbon absolute inset-x-0 top-[-2%] h-[46%]" data-cloud-day aria-hidden="true" />
        <div className="home-cloud-ribbon is-night absolute inset-x-0 top-[-2%] h-[46%]" data-cloud-night aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-[60%]" aria-hidden="true">
          {(["", "home-hills-dusk", "home-hills-night"] as const).map((tone) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={tone || "day"}
              src="/assets/home/hills.webp"
              alt=""
              width={2400}
              height={1018}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full max-w-none object-cover object-[50%_100%] ${tone}`}
              {...(tone === "home-hills-dusk" ? { "data-hills-dusk": "" } : {})}
              {...(tone === "home-hills-night" ? { "data-hills-night": "" } : {})}
            />
          ))}
        </div>

        <div className="relative z-[5] mx-auto grid h-full w-full max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-center gap-[clamp(32px,6vw,96px)] px-[clamp(16px,4vw,40px)] pt-[68px] max-[860px]:grid-cols-1 max-[860px]:grid-rows-[auto_minmax(0,1fr)] max-[860px]:justify-items-center max-[860px]:gap-3.5 max-[860px]:pt-[74px] max-[860px]:text-center">
          <div className="home-day-copy max-w-[490px] rounded-[30px] px-[50px] pb-[44px] pt-[46px] shadow-[0_24px_60px_rgba(30,34,60,0.16)] max-[860px]:w-full max-[860px]:max-w-[420px] max-[860px]:rounded-[22px] max-[860px]:px-[18px] max-[860px]:pb-4 max-[860px]:pt-3.5">
            <ol className="home-rail m-0 mb-[34px] grid list-none gap-2.5 p-0 max-[860px]:hidden" data-rail>
              {RAIL.map((r) => (
                <li key={r.time} className="flex items-center gap-3 text-sm font-bold">
                  <time className="min-w-[74px] tabular-nums">{r.time}</time>
                  {r.label}
                </li>
              ))}
            </ol>
            <span
              className="home-day-chip mb-2 hidden items-center gap-2 rounded-full bg-[#E4F6EE] px-3 py-[5px] text-[12.5px] font-bold tabular-nums text-zoe-forest max-[860px]:inline-flex"
              data-chip
            >
              {PHASES[0].label}
            </span>
            <div className="relative min-h-[250px] max-[860px]:min-h-[116px]">
              {BEATS.map((beat) => (
                <div key={beat.title} className="home-beat" data-beat>
                  <h2 className="text-[clamp(42px,5vw,68px)] font-extrabold leading-[0.98] tracking-[-0.045em] max-[860px]:text-[clamp(30px,8.4vw,40px)]">
                    {beat.title}
                  </h2>
                  <p className="mt-[18px] text-[clamp(17px,1.5vw,20px)] font-medium leading-[1.6] max-[860px]:mt-2 max-[860px]:text-[15.5px] max-[860px]:leading-[1.5] [&_b]:font-bold">
                    {beat.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative h-[min(740px,calc(100svh-108px))] w-[min(356px,86vw)] rounded-[56px] bg-[#1d2120] p-[11px] text-left shadow-[0_50px_90px_-20px_rgba(17,22,40,0.45),inset_0_0_0_1px_rgba(255,255,255,0.06)] max-[860px]:-mb-14 max-[860px]:h-full max-[860px]:max-h-[690px] max-[860px]:w-[min(340px,84vw)] max-[860px]:self-end"
            role="img"
            aria-label="Example text conversation with Zoe over one day: a morning passage from Proverbs 3, a midday reminder before a meeting, and an evening reflection with a prayer for a friend."
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[46px] bg-white">
              <div className="absolute left-1/2 top-2.5 h-[29px] w-[100px] -translate-x-1/2 rounded-[20px] bg-[#111]" />
              <div className="flex items-center justify-between px-[26px] pb-1 pt-[15px] text-[14.5px] font-bold tabular-nums text-[#111]">
                <span data-clock>7:00</span>
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

              <div
                className="home-banner absolute inset-x-2.5 top-12 z-[3] grid grid-cols-[36px_1fr] items-center gap-2.5 rounded-[20px] bg-[#f4f2ee] px-[13px] py-[11px] shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
                data-banner
                aria-hidden="true"
              >
                <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-zoe-sap">
                  <ZoeMark className="h-3.5 w-auto text-white" />
                </span>
                <p className="text-[13px] leading-[1.3] text-[#222]">
                  <b className="flex justify-between text-[13px]">
                    Zoe <span className="font-medium text-[#888]">now</span>
                  </b>
                  Hey! Meeting&apos;s in 12 ⏰ &ldquo;In all your ways&rdquo; includes that room too…
                </p>
              </div>

              <div className="flex flex-col items-center gap-[3px] border-b border-[#eee] pb-[9px] pt-1.5">
                <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-zoe-oat outline outline-1 outline-zoe-outline/60">
                  <ZoeMark className="h-[17px] w-auto text-zoe-sap" />
                </span>
                <span className="text-[11.5px] font-semibold text-[#333]">Zoe</span>
              </div>

              <div
                className="home-thread flex min-h-0 flex-1 flex-col justify-end gap-[5px] overflow-hidden px-3 py-2.5"
                data-thread
                aria-hidden="true"
              >
                <div className={tsClass} data-t={0.01} hidden>
                  <b className="font-bold text-[#555]">Today</b> 7:00 AM
                </div>
                <Zoe t={0.03}>Morning Tony ☀️ Day 1 of Wisdom &amp; Decisions! We&apos;re starting in Proverbs 👇</Zoe>
                <Zoe t={0.075}>
                  <div className="mt-2 rounded-[13px] bg-white px-3 pb-[11px] pt-2.5">
                    <small className="mb-1.5 block text-[10.5px] font-extrabold leading-none tracking-[0.09em] text-zoe-forest">
                      PROVERBS 3:5–6 · NIV
                    </small>
                    <q className="font-serif text-[15.5px] italic leading-[1.38] text-[#1d2221] [quotes:none]">
                      Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to
                      him, and he will make your paths straight.
                    </q>
                  </div>
                </Zoe>
                <Zoe t={0.12}>
                  Did you catch it? &ldquo;All&rdquo; shows up twice 👀 All your heart. All your ways. Not just the big decisions.
                </Zoe>
                <Zoe t={0.16}>
                  So here&apos;s my question for today 🤔 Which small calls do you usually make without checking in with God?
                </Zoe>
                <You t={0.215}>honestly most of them. big meeting at 2 and i already want to push hard for my plan</You>
                <Zoe t={0.27}>
                  Ha, that&apos;s most of us 😅 Maybe bring it to God before you bring it to the room? Something as simple as:
                  &ldquo;I don&apos;t fully understand this. I&apos;m trusting You with the path.&rdquo;
                </Zoe>

                <div className={tsClass} data-t={0.43} hidden>
                  1:48 PM
                </div>
                <div className={`${memClass} bg-[#E4F6EE] text-zoe-forest`} data-t={0.44} hidden>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M9 14 4 9l5-5" />
                    <path d="M4 9h10a6 6 0 0 1 0 12h-2" />
                  </svg>
                  From 7:04 AM · &ldquo;big meeting at 2&rdquo;
                </div>
                <Zoe t={0.45}>
                  Hey! Meeting&apos;s in 12 ⏰ &ldquo;In all your ways&rdquo; includes <span className="home-mark">that room</span> too.
                  Open hands 🙌
                </Zoe>
                <You t={0.52}>needed that. walking in now</You>
                <Zoe t={0.565}>Deep breath 🙂 God&apos;s closer than your next one.</Zoe>

                <div className={tsClass} data-t={0.705} hidden>
                  9:02 PM
                </div>
                <Zoe t={0.72}>Quick one before you crash 😴 Where did you practice trust today?</Zoe>
                <You t={0.775}>in the meeting honestly. i wanted certainty but i held it more loosely</You>
                <Zoe t={0.825}>Wait, that&apos;s huge 😮 That&apos;s Proverbs 3 walking right into a conference room.</Zoe>
                <div className={`${memClass} bg-[#FDECEC] text-[#B4435B]`} data-t={0.865} hidden>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1Z" />
                  </svg>
                  Prayer list · Jess starts her new job tomorrow
                </div>
                <Zoe t={0.875}>
                  Also, you asked me to help you remember Jess 💛 Want a simple way to pray for her before bed?
                </Zoe>
                <You t={0.915}>yes please</You>
                <Zoe t={0.955}>
                  Try: &ldquo;God, go ahead of Jess tomorrow. Give her courage and good people.&rdquo; Ecclesiastes 3 at 7. Sleep well
                  🌙
                </Zoe>
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

              <div className="flex items-center gap-2 px-3 pb-5 pt-2" aria-hidden="true">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eee] text-xl leading-none text-[#777]">+</span>
                <span className="flex-1 rounded-full border border-[#ddd] px-3.5 py-2 text-sm text-[#aaa]">Text Message</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
