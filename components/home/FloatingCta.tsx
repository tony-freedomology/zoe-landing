"use client";

import { useEffect, useRef } from "react";
import { btnJade } from "./styles";

// Mobile-only "Join the walk" pill. Appears once the hero is mostly scrolled
// past, and hides while the day scene, the waitlist or the footer is on screen.
export default function FloatingCta() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cta = ref.current;
    const hero = document.getElementById("hero");
    if (!cta || !hero) return;

    const watched = ["day", "waitlist"]
      .map((id) => document.getElementById(id))
      .concat(document.querySelector<HTMLElement>("footer"))
      .filter((el): el is HTMLElement => Boolean(el));
    const visible = new Set<Element>();

    const update = () => {
      const show = window.scrollY > hero.offsetHeight * 0.7 && visible.size === 0;
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
      { threshold: 0.08 }
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
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-[55] flex justify-center min-[861px]:hidden">
      <a
        ref={ref}
        href="#waitlist"
        className={`${btnJade} pointer-events-auto translate-y-[140%] !shadow-[0_14px_30px_rgba(0,115,84,0.28)] !transition-transform !duration-[450ms] ![transition-timing-function:cubic-bezier(0.16,1,0.3,1)]`}
      >
        Join the walk
      </a>
    </div>
  );
}
