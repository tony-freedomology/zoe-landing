"use client";

import { useEffect, useRef } from "react";

/**
 * Thin Jade reading-progress bar fixed to the top of the viewport.
 * Tracks the element with `targetId` (the article prose). Written straight to
 * the DOM from a rAF-throttled scroll handler, never through React state.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const target = document.getElementById(targetId);
    if (!bar || !target) return;

    let queued = false;
    const update = () => {
      queued = false;
      const rect = target.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (window.innerHeight * 0.4 - rect.top) / rect.height));
      bar.style.transform = `scaleX(${pct.toFixed(4)})`;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-zoe-sap" />
    </div>
  );
}
