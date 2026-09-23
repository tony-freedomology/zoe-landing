"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import ZoeSVG from "../ZoeSVG";
import { btnJade, btnQuiet } from "./styles";

// Layer order, parallax depth (desktop) and pan factor (mobile) match the
// approved prototype. `drop` layers sit 10% of the hero height lower on phones;
// the tree also shifts left by 12% of the stage width so the man stays clear.
const LAYERS = [
  { src: "sky.webp", depth: 0.05, pan: 0.55, sky: true, priority: true },
  { src: "cloud-1.webp", depth: 0.07, pan: 0.7 },
  { src: "cloud-2.webp", depth: 0.08, pan: 0.78 },
  { src: "cloud-3.webp", depth: 0.06, pan: 0.74 },
  { src: "hills-man.webp", depth: 0.15, pan: 1, drop: true, priority: true },
  { src: "tree-left.webp", depth: 0.3, pan: 1.22, drop: true, shift: -0.12 },
  { src: "ferns-right.webp", depth: 0.3, pan: 1.22, drop: true },
] as const;

const STAGE_RATIO = 2.2857; // art is 2000x875
const PAN_FROM = 0.3; // the man
const PAN_TO = 0.64; // the cross
const PAN_DELAY = 1400;
const PAN_DURATION = 11000;
const MOBILE_MAX = 759;

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t0 = performance.now();
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let running = false;

    const frame = (now: number) => {
      const heroH = hero.offsetHeight;
      const mobile = window.innerWidth <= MOBILE_MAX;
      let settled: boolean;

      if (mobile) {
        const W = heroH * STAGE_RATIO;
        const vw = window.innerWidth;
        const k = easeInOutSine(clamp((now - t0 - PAN_DELAY) / PAN_DURATION));
        const f = PAN_FROM + (PAN_TO - PAN_FROM) * k;
        const pan = clamp(vw / 2 - f * W, vw - W, 0);
        stage.style.setProperty("--pan", `${pan.toFixed(1)}px`);
        settled = k >= 1;
      } else {
        tx += (mx - tx) * 0.06;
        ty += (my - ty) * 0.06;
        stage.style.setProperty("--tx", `${tx.toFixed(1)}px`);
        stage.style.setProperty("--ty", `${ty.toFixed(1)}px`);
        settled = Math.abs(mx - tx) < 0.05 && Math.abs(my - ty) < 0.05;
      }

      // Stop when the hero is scrolled away or nothing is moving; any mouse
      // move, resize or scroll back into the hero restarts the loop.
      if (!settled && window.scrollY < heroH) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (running || window.scrollY >= hero.offsetHeight) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 200;
      my = (e.clientY / window.innerHeight - 0.5) * 200;
      kick();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", kick);
    window.addEventListener("scroll", kick, { passive: true });
    kick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", kick);
      window.removeEventListener("scroll", kick);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="home-h1"
      className="home-hero relative overflow-hidden bg-[#cfe0dc]"
    >
      <div ref={stageRef} className="home-hero-stage absolute inset-0" aria-hidden="true">
        {LAYERS.map((layer) => (
          <div
            key={layer.src}
            className={`home-hero-layer${"sky" in layer ? " is-sky" : ""}`}
            style={
              {
                "--d": layer.depth,
                "--p": layer.pan,
                "--drop": "drop" in layer ? 1 : 0,
                "--s": "shift" in layer ? layer.shift : 0,
              } as CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/assets/home/${layer.src}`}
              alt=""
              width={2000}
              height={875}
              decoding="async"
              {...("priority" in layer ? { fetchpriority: "high" } : {})}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 top-[calc(68px+clamp(18px,6svh,70px))] z-10 px-4 text-center">
        <div className="relative mx-auto w-[min(56vw,330px)]" role="img" aria-label="Zoe">
          {reduceMotion ? <ZoeSVG staticOnly /> : <ZoeSVG />}
        </div>
        <h1
          id="home-h1"
          className="home-fade-in mt-1.5 text-[clamp(34px,5.2vw,58px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-zoe-ink"
          style={{ animationDelay: "1.6s" }}
        >
          Walk with Jesus.
        </h1>
        <p
          className="home-fade-in mx-auto mt-3.5 max-w-[31ch] text-[clamp(16px,1.6vw,19px)] font-semibold leading-[1.45] text-zoe-ink/[0.86]"
          style={{ animationDelay: "1.85s" }}
        >
          Zoe is AI that helps you do it by text: morning, midday, and before you sleep.
        </p>
        <div
          className="home-fade-in mt-[22px] flex flex-wrap justify-center gap-x-3.5 gap-y-1.5"
          style={{ animationDelay: "2.1s" }}
        >
          <a href="#waitlist" className={btnJade}>
            Join the walk
          </a>
          <a href="#day" className={btnQuiet}>
            See one day with Zoe
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-[250ms] group-hover:translate-y-[3px]"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
