"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import clsx from "clsx";

import ZoeSVG from "./ZoeSVG";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

const journeyLinks = [
  { href: "/journeys", label: "All Journeys" },
  { href: "/journeys/james-deep", label: "James: 10 Days Deep" },
  { href: "/journeys/still", label: "Still: Contemplative Prayer" },
  { href: "/journeys/the-examen", label: "The Examen" },
  { href: "/journeys/rooted", label: "Rooted: 30 Days in the Psalms" },
  { href: "/journeys/way-of-jesus", label: "The Way of Jesus" },

];

export default function Navbar() {
  const pathname = usePathname();
  const hideOnPath =
    pathname === "/subscribe" ||
    pathname === "/thanks" ||
    pathname.startsWith("/journeys/lesson-preview");
  const preserveTheme =
    pathname.startsWith("/jesus-red") ||
    pathname.startsWith("/s/jesus-red") ||
    pathname.startsWith("/emerald-uni") ||
    pathname.startsWith("/s/emerald-uni");
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [journeysOpen, setJourneysOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setJourneysOpen(false);
  }, [pathname]);

  const opaque = preserveTheme ? !isHomePage || scrolled : true;

  if (hideOnPath) {
    return null;
  }

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        preserveTheme
          ? opaque
            ? "bg-white/90 backdrop-blur-md border-b border-slate-100/60 shadow-sm"
            : "bg-transparent"
          : "bg-[rgba(252,249,244,0.86)] backdrop-blur-xl border-b border-zoe-outline/50 shadow-[0_10px_40px_rgba(28,28,25,0.05)]"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className={clsx(
            "flex items-center transition-opacity duration-300 hover:opacity-85",
            preserveTheme
              ? opaque
                ? "text-slate-900"
                : "text-white"
              : "text-zoe-ink"
          )}
        >
          <div className="w-[72px] md:w-[78px]">
            <ZoeSVG
              variant="default"
              color={preserveTheme && !opaque ? "#ffffff" : "var(--zoe-sap)"}
              staticOnly={true}
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "px-4 py-2 rounded-full text-sm transition-all duration-200",
                preserveTheme
                  ? opaque
                    ? "font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "font-semibold text-white/80 hover:text-white hover:bg-white/10"
                  : "font-medium text-zoe-muted hover:text-zoe-ink hover:bg-white/80",
                pathname === link.href &&
                  (preserveTheme
                    ? opaque
                      ? "text-slate-900 bg-slate-100"
                      : "text-white bg-white/10"
                    : "bg-white text-zoe-ink shadow-[0_8px_24px_rgba(28,28,25,0.04)]")
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Journeys Dropdown */}
          <div className="relative">
            <button
              onClick={() => setJourneysOpen((v) => !v)}
              onBlur={() => setTimeout(() => setJourneysOpen(false), 150)}
              className={clsx(
                "flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all duration-200",
                preserveTheme
                  ? opaque
                    ? "font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "font-semibold text-white/80 hover:text-white hover:bg-white/10"
                  : "font-medium text-zoe-muted hover:text-zoe-ink hover:bg-white/80"
              )}
            >
              Journeys
              <motion.div animate={{ rotate: journeysOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {journeysOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={clsx(
                    "absolute top-full left-0 mt-2 w-52 overflow-hidden py-1",
                    preserveTheme
                      ? "bg-white rounded-2xl shadow-xl border border-slate-100"
                      : "rounded-[1.5rem] border border-zoe-outline/60 bg-[rgba(252,249,244,0.98)] shadow-[0_20px_50px_rgba(28,28,25,0.06)]"
                  )}
                >
                  {journeyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "block px-4 py-3 text-sm transition-colors",
                        preserveTheme
                          ? "font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                          : "font-medium text-zoe-muted hover:text-zoe-ink hover:bg-white/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/churches"
            className={clsx(
              "px-4 py-2 rounded-full text-sm transition-all duration-200",
              preserveTheme
                ? opaque
                  ? "font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "font-semibold text-white/80 hover:text-white hover:bg-white/10"
                : "font-medium text-zoe-muted hover:text-zoe-ink hover:bg-white/80"
            )}
          >
            For Churches
          </Link>
          <Link
            href="/#waitlist"
            className={clsx(
              "rounded-full px-5 py-2 text-sm transition-all duration-200",
              preserveTheme
                ? "bg-slate-900 font-semibold text-white shadow-sm hover:bg-slate-700"
                : "bg-zoe-sap font-semibold text-white shadow-sm hover:brightness-105 active:scale-95"
            )}
          >
            Join The Walk
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={clsx(
            "md:hidden p-2 rounded-full transition-all duration-200",
            preserveTheme
              ? opaque
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
              : "text-zoe-ink hover:bg-white/80"
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={clsx(
              "md:hidden overflow-hidden border-t",
              preserveTheme
                ? "bg-white border-slate-100"
                : "bg-[rgba(252,249,244,0.98)] border-zoe-outline/50"
            )}
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "px-4 py-3 rounded-xl text-sm transition-colors",
                    preserveTheme
                      ? "font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      : "font-medium text-zoe-muted hover:text-zoe-ink hover:bg-white/80",
                    pathname === link.href &&
                      (preserveTheme ? "bg-slate-50 text-slate-900" : "bg-white text-zoe-ink")
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className={clsx("mt-2 pt-2 border-t", preserveTheme ? "border-slate-100" : "border-zoe-outline/40")}>
                <p className={clsx("px-4 py-2 text-xs uppercase tracking-widest", preserveTheme ? "font-semibold text-slate-400" : "font-medium text-[#6c7a73]")}>
                  Journeys
                </p>
                {journeyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "block px-4 py-3 rounded-xl text-sm transition-colors",
                      preserveTheme
                        ? "font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                        : "font-medium text-zoe-muted hover:text-zoe-ink hover:bg-white/80"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className={clsx("mt-2 pt-2 flex flex-col gap-2 border-t", preserveTheme ? "border-slate-100" : "border-zoe-outline/40")}>
                <Link
                  href="/churches"
                  className={clsx(
                    "px-4 py-3 rounded-xl text-sm transition-colors",
                    preserveTheme
                      ? "font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      : "font-medium text-zoe-muted hover:text-zoe-ink hover:bg-white/80"
                  )}
                >
                  For Churches
                </Link>
                <Link
                  href="/#waitlist"
                  className={clsx(
                    "mx-4 rounded-full px-5 py-3 text-sm text-center transition-all duration-200",
                    preserveTheme
                      ? "bg-slate-900 font-semibold text-white shadow-sm hover:bg-slate-700"
                      : "bg-zoe-sap font-semibold text-white shadow-sm hover:brightness-105 active:scale-95"
                  )}
                >
                  Join The Walk
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
