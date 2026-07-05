"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LOOP_CROSSFADE_MS = 3500;
const LOOP_CROSSFADE_SEC = LOOP_CROSSFADE_MS / 1000;

export const JOURNEY_HERO_POSTER_SRC = "/images/journeys/journeys-hero-poster.jpg";
const VIDEO_SRC = "/images/journeys/journeys-hero-loop.mp4";

function isBenignPlaybackError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

type JourneyHeroCinemagraphProps = {
  onReady?: () => void;
};

export default function JourneyHeroCinemagraph({ onReady }: JourneyHeroCinemagraphProps) {
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const [coverSlot, setCoverSlot] = useState<"a" | "b">("a");
  const [dissolving, setDissolving] = useState(false);
  const [useStill, setUseStill] = useState(false);
  const coverSlotRef = useRef<"a" | "b">("a");
  const dissolvingRef = useRef(false);
  const readyNotifiedRef = useRef(false);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const notifyReady = useCallback(() => {
    if (readyNotifiedRef.current) return;
    readyNotifiedRef.current = true;
    onReadyRef.current?.();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setUseStill(true);
    }
  }, []);

  useEffect(() => {
    if (useStill) {
      notifyReady();
    }
  }, [useStill, notifyReady]);

  useEffect(() => {
    coverSlotRef.current = coverSlot;
  }, [coverSlot]);

  const getLoopVideoClass = useCallback(
    (slot: "a" | "b") => {
      const isCover = coverSlot === slot;
      if (dissolving) {
        return isCover ? "is-loop-cover is-loop-dissolving" : "is-loop-base";
      }
      return isCover ? "is-loop-cover" : "";
    },
    [coverSlot, dissolving]
  );

  useEffect(() => {
    if (useStill) return;

    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    dissolvingRef.current = false;
    setDissolving(false);
    coverSlotRef.current = "a";
    setCoverSlot("a");
    a.currentTime = 0;
    b.pause();
    b.currentTime = 0;

    let cancelled = false;

    const startPlayback = async () => {
      try {
        await a.play();
      } catch (error) {
        if (cancelled || isBenignPlaybackError(error)) return;
        setUseStill(true);
      }
    };

    void startPlayback();

    const handleTimeUpdate = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      if (dissolvingRef.current || !video.duration || Number.isNaN(video.duration)) return;

      const cover = coverSlotRef.current === "a" ? a : b;
      if (video !== cover) return;

      const timeLeft = video.duration - video.currentTime;
      if (timeLeft > LOOP_CROSSFADE_SEC || timeLeft <= 0.05) return;

      const base = cover === a ? b : a;
      const nextCoverSlot = coverSlotRef.current === "a" ? "b" : "a";

      dissolvingRef.current = true;
      base.currentTime = 0;
      void base
        .play()
        .then(() => {
          if (cancelled) return;
          setDissolving(true);
          window.setTimeout(() => {
            if (cancelled) return;
            cover.pause();
            cover.currentTime = 0;
            coverSlotRef.current = nextCoverSlot;
            setCoverSlot(nextCoverSlot);
            dissolvingRef.current = false;
            setDissolving(false);
          }, LOOP_CROSSFADE_MS);
        })
        .catch((error) => {
          if (!isBenignPlaybackError(error)) {
            dissolvingRef.current = false;
            setDissolving(false);
          }
        });
    };

    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      cancelled = true;
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
      a.pause();
      b.pause();
    };
  }, [useStill]);

  const handleVideoReady = useCallback(() => {
    notifyReady();
  }, [notifyReady]);

  const handlePrimaryVideoError = useCallback(() => {
    setUseStill(true);
  }, []);

  if (useStill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={JOURNEY_HERO_POSTER_SRC}
        alt=""
        aria-hidden="true"
        className="journey-scene__hero-layer is-visible is-active"
        decoding="async"
        onLoad={handleVideoReady}
        onError={handleVideoReady}
      />
    );
  }

  return (
    <div className="journey-scene__hero-layer journey-scene__hero-loop is-visible is-active">
      <video
        ref={videoARef}
        src={VIDEO_SRC}
        poster={JOURNEY_HERO_POSTER_SRC}
        className={getLoopVideoClass("a")}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlayThrough={handleVideoReady}
        onLoadedData={handleVideoReady}
        onError={handlePrimaryVideoError}
      />
      <video
        ref={videoBRef}
        src={VIDEO_SRC}
        className={getLoopVideoClass("b")}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}