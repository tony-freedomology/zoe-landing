"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import JourneyHeroCinemagraph, { JOURNEY_HERO_POSTER_SRC } from "./JourneyHeroCinemagraph";

export default function JourneyHeroSection() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (scene) {
      scene.style.setProperty("--journey-hero-image", `url(${JOURNEY_HERO_POSTER_SRC})`);
    }
  }, []);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setSceneReady(true);
    }, 1200);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <section ref={sceneRef} className={`journey-scene${sceneReady ? " is-ready" : ""}`}>
      <div className="journey-scene__hero" aria-hidden="true">
        <JourneyHeroCinemagraph onReady={() => setSceneReady(true)} />
      </div>
      <div className="journey-scene__photo-haze" aria-hidden="true" />
      <div className="journey-scene__photo-foreground" aria-hidden="true" />
      <div className="journey-scene__oat-light" aria-hidden="true" />
      <div className="journey-scene__blur" aria-hidden="true" />
      <div className="journey-scene__radial" aria-hidden="true" />

      <div className="journey-scene__content">
        <div className="w-full max-w-xl">
          <h1 className="max-w-[12ch] text-[2.75rem] font-bold leading-[1.02] tracking-[-0.04em] text-zoe-ink sm:text-[3.15rem] lg:text-[3.75rem]">
            Walk one road for a while.
          </h1>
          <p className="mt-6 max-w-md text-lg font-medium leading-8 text-zoe-muted">
            Growth rarely happens all at once.
          </p>
          <p className="mt-4 max-w-lg text-lg font-medium leading-8 text-zoe-muted">
            Choose a Journey, and Zoe will gently guide you through Scripture, prayer, reflection, and small daily practices focused on one area of your life.
          </p>
          <Link
            href="#browse-paths"
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-zoe-sap px-7 py-4 text-base font-bold text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:brightness-105 active:scale-[0.98]"
          >
            Browse Journeys
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}