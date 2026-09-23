"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import clsx from "clsx";

import ZoeMark from "./ZoeMark";

// Sitewide header: a floating Oat pill that looks the same over the home hero
// and once scrolled (only its shadow deepens). Same destinations everywhere.

const leadLinks = [{ href: "/#day", label: "How it works" }];

const trailLinks = [
  { href: "/#faq", label: "FAQ" },
  { href: "/churches", label: "For churches" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

const journeyLinks = [
  { href: "/journeys", label: "All Journeys" },
  { href: "/journeys/new-believer", label: "First Steps" },
  { href: "/journeys/james-deep", label: "James: 10 Days Deep" },
  { href: "/journeys/still", label: "Still: Contemplative Prayer" },
  { href: "/journeys/the-examen", label: "The Examen" },
  { href: "/journeys/rooted", label: "Rooted: 30 Days in the Psalms" },
  { href: "/journeys/way-of-jesus", label: "The Way of Jesus" },
];

const desktopLink =
  "rounded-full px-3 py-2 text-sm font-semibold text-zoe-ink/[0.82] no-underline transition-colors hover:bg-zoe-surface hover:text-zoe-ink";
const mobileLink =
  "block rounded-2xl px-4 py-3 text-[15px] font-semibold text-zoe-ink no-underline transition-colors hover:bg-zoe-surface";
const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-zoe-sap font-bold leading-none text-white no-underline transition-[transform,filter] duration-200 hover:brightness-105 active:scale-[0.97]";

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const hideOnPath =
    pathname === "/subscribe" || pathname === "/thanks" || pathname.startsWith("/journeys/lesson-preview");

  const [scrolled, setScrolled] = useState(false);
  const [journeysOpen, setJourneysOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const journeysRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const journeysId = useId();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setJourneysOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.toggleAttribute("data-mobile-menu-open", mobileOpen);
    return () => document.body.removeAttribute("data-mobile-menu-open");
  }, [mobileOpen]);

  // Escape closes whichever menu is open; clicks outside close the dropdown.
  useEffect(() => {
    if (!journeysOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setJourneysOpen(false);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (journeysRef.current && !journeysRef.current.contains(e.target as Node)) setJourneysOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [journeysOpen, mobileOpen]);

  if (hideOnPath) {
    return null;
  }

  const menuTransition = reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.16, 1, 0.3, 1] };

  return (
    <header className="zoe-site-nav pointer-events-none fixed inset-x-0 top-0 z-[60] px-[clamp(10px,2vw,24px)] pt-[calc(10px+env(safe-area-inset-top,0px))]">
      <div
        className={clsx(
          "pointer-events-auto relative mx-auto flex h-14 max-w-[1200px] items-center gap-7 rounded-full bg-zoe-oat pl-4 pr-1.5 transition-shadow duration-300 min-[861px]:pl-[22px] min-[861px]:pr-2",
          scrolled
            ? "shadow-[0_12px_34px_rgba(45,50,49,0.13),0_0_0_1px_rgba(187,202,193,0.55)]"
            : "shadow-[0_10px_30px_rgba(45,50,49,0.10),0_0_0_1px_rgba(187,202,193,0.45)]"
        )}
      >
        <Link href="/" aria-label="Zoe home" className="block leading-none">
          <ZoeMark className="h-[30px] w-auto text-zoe-sap" />
        </Link>

        <nav aria-label="Main" className="ml-1 hidden items-center gap-0.5 lg:flex">
          {leadLinks.map((link) => (
            <Link key={link.href} href={link.href} className={desktopLink}>
              {link.label}
            </Link>
          ))}

          <div
            ref={journeysRef}
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setJourneysOpen(false);
            }}
          >
            <button
              type="button"
              aria-expanded={journeysOpen}
              aria-controls={journeysId}
              onClick={() => setJourneysOpen((v) => !v)}
              className={clsx(desktopLink, "flex items-center gap-1", journeysOpen && "bg-zoe-surface text-zoe-ink")}
            >
              Journeys
              <ChevronDown
                className={clsx("h-4 w-4 transition-transform duration-200", journeysOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence>
              {journeysOpen && (
                <motion.div
                  id={journeysId}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={menuTransition}
                  className="absolute left-0 top-[calc(100%+14px)] w-60 overflow-hidden rounded-3xl bg-zoe-oat p-1.5 shadow-[0_20px_50px_rgba(45,50,49,0.12),0_0_0_1px_rgba(187,202,193,0.55)]"
                >
                  {journeyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setJourneysOpen(false)}
                      className="block rounded-2xl px-4 py-2.5 text-sm font-semibold text-zoe-ink/[0.82] no-underline transition-colors hover:bg-zoe-surface hover:text-zoe-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {trailLinks.map((link) => (
            <Link key={link.href} href={link.href} className={desktopLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 min-[861px]:gap-3.5">
          <Link
            href="/#waitlist"
            className={clsx(ctaClass, "px-3.5 py-2.5 text-sm min-[421px]:px-[18px] min-[421px]:py-[11px]")}
          >
            Join the walk
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-zoe-ink transition-colors hover:bg-zoe-surface lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id={menuId}
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={menuTransition}
            className="pointer-events-auto mx-auto mt-2 max-h-[calc(100svh-90px)] max-w-[1200px] overflow-y-auto rounded-[28px] bg-zoe-oat p-2 shadow-[0_20px_50px_rgba(45,50,49,0.14),0_0_0_1px_rgba(187,202,193,0.55)] lg:hidden"
          >
            {leadLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={mobileLink}>
                {link.label}
              </Link>
            ))}
            {trailLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={mobileLink}>
                {link.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-zoe-outline/40 pt-1">
              <p className="px-4 pb-1 pt-3 text-[13px] font-bold text-zoe-muted">Journeys</p>
              {journeyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 text-sm font-medium text-zoe-ink/80 no-underline transition-colors hover:bg-zoe-surface"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-1 border-t border-zoe-outline/40 p-2 pt-3">
              <Link
                href="/#waitlist"
                onClick={() => setMobileOpen(false)}
                className={clsx(ctaClass, "w-full px-5 py-3.5 text-[15px]")}
              >
                Join the walk
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
