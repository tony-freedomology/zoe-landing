"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { btnJade } from "../home/styles";
import { PILOT_HREF } from "./links";

// Mobile-only "Start a pilot" pill (same treatment as the homepage FloatingCta).
// Appears after 60% of a viewport of scroll, and hides while the week scene, the
// pilot section or the footer is on screen.
export default function ChurchFloatingCta() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cta = ref.current;
    if (!cta) return;

    const watched = ["week", "pilot"]
      .map((id) => document.getElementById(id))
      .concat(document.querySelector<HTMLElement>("footer"))
      .filter((el): el is HTMLElement => Boolean(el));
    const visible = new Set<Element>();

    const update = () => {
      const show = window.scrollY > window.innerHeight * 0.6 && visible.size === 0;
      cta.classList.toggle("translate-y-[140%]", !show);
      cta.toggleAttribute("inert", !show);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        update();
      },
      { threshold: 0.06 }
    );
    watched.forEach((el) => io.observe(el));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-[55] flex justify-center min-[861px]:hidden">
      <Link
        ref={ref}
        href={PILOT_HREF}
        className={`${btnJade} pointer-events-auto translate-y-[140%] !shadow-[0_14px_30px_rgba(0,115,84,0.28)] !transition-transform !duration-[450ms] ![transition-timing-function:cubic-bezier(0.16,1,0.3,1)]`}
      >
        Start a pilot
      </Link>
    </div>
  );
}
