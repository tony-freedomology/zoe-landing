"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { CheckCircle, MessageCircle, BookOpen, ShieldCheck } from "lucide-react";
import ZoeSVG from "./ZoeSVG";
import { usePhoneFormatter } from "../app/hooks/usePhoneFormatter";

interface ShortProps {
  variant?: "default" | "jesus-red" | "emerald-uni";
}

export default function HomePageContentShort({ variant = "default" }: ShortProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setSubmitError(null);
    try {
      const payload = {
        name,
        phone,
        type: "individual",
        source: `short-landing-${variant}`,
        submittedAt: new Date().toISOString()
      };
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.details || data?.error || "Unable to submit");
      setStatus("sent");
    } catch (err: any) {
      setStatus("idle");
      setSubmitError(err.message || "We couldn't submit your request right now.");
    }
  };

  const isJR = variant === "jesus-red";
  const isEM = variant === "emerald-uni";

  // Theme values
  const accentColor = isJR ? "text-[#7a2332]" : isEM ? "text-[#009f52]" : "text-brand-jade";
  const accentBg = isJR ? "bg-[#7a2332]" : isEM ? "bg-[#009f52]" : "bg-brand-jade";
  const accentBgLight = isJR ? "bg-[#7a2332]/10" : isEM ? "bg-[#009f52]/10" : "bg-brand-jade/10";
  const mainBg = isJR ? "bg-[#f5efe6]" : isEM ? "bg-white" : "bg-[#F8FBFA]";
  const headlineFont = (isJR || isEM) ? "font-serif" : "font-sans";

  const proofPoints = [
    { icon: MessageCircle, title: "Arrives via text" },
    { icon: BookOpen, title: "Original language depth" },
    { icon: ShieldCheck, title: "Works on any phone" },
  ];

  return (
    <main className={clsx("h-[100dvh] w-full overflow-hidden flex flex-col md:flex-row", mainBg)}>
      {/* Left Column: Content & Form */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 z-20 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto md:mx-0 w-full"
        >
          <div className="mb-10 w-48 md:w-56">
            <ZoeSVG variant={variant} />
          </div>

          <h1 className={clsx("text-2xl md:text-3xl font-medium tracking-tight mb-8 text-slate-800", headlineFont)}>
            Walk with Jesus.
          </h1>

          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-4"
              >
                <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", accentBgLight)}>
                  <CheckCircle className={clsx("w-6 h-6", accentColor)} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">You&apos;re on the list.</h2>
                  <p className="text-slate-600 font-medium">We&apos;ll text you when spots open up.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0, x: -20 }}>
                <p className="text-slate-600 font-medium mb-8 leading-relaxed max-w-sm">
                  Join the pre-alpha waitlist. Deep discipleship. Zero friction. Just scripture in your texts.
                </p>

                <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3 mb-10">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-xl px-4 py-3 bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-brand-jade/20"
                  />
                  <input
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full rounded-xl px-4 py-3 bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-brand-jade/20"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={clsx("w-full rounded-xl px-6 py-4 font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 shadow-lg shadow-brand-jade/10", accentBg)}
                  >
                    {status === "submitting" ? "Joining..." : "Join the Waitlist"}
                  </button>
                  {submitError && <p className="text-red-500 text-sm font-medium mt-1">{submitError}</p>}
                </form>

                <div className="grid grid-cols-1 gap-4">
                  {proofPoints.map((point) => (
                    <div key={point.title} className="flex items-center gap-3">
                      <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", accentBgLight)}>
                        <point.icon className={clsx("w-4 h-4", accentColor)} />
                      </div>
                      <span className="text-slate-600 font-semibold text-sm">{point.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Column: Stunning Visual */}
      <div className="hidden md:block w-full md:w-[55%] lg:w-[60%] relative h-full bg-slate-900">
        {variant === "default" && (
          <div className="absolute inset-0">
            <img src="/assets/hero/sky.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
            <img src="/assets/hero/hills-man.png" className="absolute inset-0 w-full h-full object-cover object-bottom" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
          </div>
        )}
        {variant === "jesus-red" && (
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <img src="/assets/hero/parchment-bg.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="relative w-full h-full border-[12px] border-[#3c2a21]/5 rounded-[2rem] overflow-hidden">
              <img src="/assets/hero/parchment-bg.png" className="absolute inset-0 w-full h-full object-cover scale-110" alt="" />
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <img src="/jesus-red/apple-touch-icon.png" className="w-48 h-48 opacity-20 grayscale sepia" alt="" />
              </div>
            </div>
          </div>
        )}
        {variant === "emerald-uni" && (
          <div className="absolute inset-0">
            <img src="/assets/hero/emerald-campus.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
          </div>
        )}
      </div>

      {/* Mobile Visual Background (Subtle) */}
      <div className="md:hidden absolute inset-0 -z-10 opacity-30 pointer-events-none">
        {variant === "default" && <img src="/assets/hero/sky.png" className="w-full h-full object-cover" alt="" />}
        {variant === "jesus-red" && <img src="/assets/hero/parchment-bg.png" className="w-full h-full object-cover" alt="" />}
        {variant === "emerald-uni" && <img src="/assets/hero/emerald-campus.jpg" className="w-full h-full object-cover" alt="" />}
      </div>
    </main>
  );
}
