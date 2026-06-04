"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, type FormEvent } from "react";
import clsx from "clsx";
import { CheckCircle, MessageCircle, BookOpen, ShieldCheck, Compass, Heart, Users } from "lucide-react";
import Hero2D from './Hero2D';
import ZoeSVG from "./ZoeSVG";
import LeftHeroSvg from "./LeftHeroSvg";
import RightHeroSvg from "./RightHeroSvg";
import { usePhoneFormatter } from "../app/hooks/usePhoneFormatter";
import {
  isWaitlistEmailValid,
  isWaitlistNameValid,
  isWaitlistPhoneValid,
} from "../lib/waitlistValidation";

interface ShortProps {
  variant?: "default" | "jesus-red" | "emerald-uni";
}

type PhonePlatform = "iphone" | "android";

export default function HomePageContentShort({ variant = "default" }: ShortProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");
  const [email, setEmail] = useState("");
  const [phonePlatform, setPhonePlatform] = useState<PhonePlatform | "">("");
  const [feedbackAgreed, setFeedbackAgreed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showStickyBetaCta, setShowStickyBetaCta] = useState(false);
  const waitlistFormValid =
    isWaitlistNameValid(name) &&
    isWaitlistPhoneValid(phone) &&
    isWaitlistEmailValid(email) &&
    phonePlatform !== "";

  const isJR = variant === "jesus-red";
  const isEM = variant === "emerald-uni";

  useEffect(() => {
    document.body.classList.add("hide-navbar");
    const handleScroll = () => setShowStickyBetaCta(window.scrollY > 720);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.body.classList.remove("hide-navbar");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!waitlistFormValid) {
      setSubmitError("Enter a valid name, phone number, and email.");
      return;
    }

    if (variant === "default" && !feedbackAgreed) {
      setSubmitError("Check the feedback box so we know you're up for the beta.");
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    const payload = {
      name,
      phone,
      email,
      phonePlatform,
      type: "individual",
      source: variant === "default" ? "beta-signup" : `short-landing-${variant}`,
      submittedAt: new Date().toISOString()
    };

    const attempt = async () => {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.details || data?.error || "Unable to submit");
      return data;
    };

    try {
      await attempt();
      setStatus("sent");
    } catch (firstError) {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        await attempt();
        setStatus("sent");
      } catch (retryError) {
        console.warn("Waitlist submission failed after retry:", retryError);
        setStatus("idle");
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  // Theme values Let's keep the focus ring conditional on the actual variant color
  const primaryColor = isJR ? "text-[#7a2332]" : isEM ? "text-[#1dc286]" : "text-zoe-leaf";
  const primaryBg = isJR ? "bg-[#7a2332]" : isEM ? "bg-[#1dc286]" : "bg-zoe-leaf";
  const primaryBgLight = isJR ? "bg-[#7a2332]/10" : isEM ? "bg-[#1dc286]/10" : "bg-zoe-leaf/10";
  const focusRing = isJR ? "focus:ring-[#7a2332]/30" : isEM ? "focus:ring-[#1dc286]/30" : "focus:ring-zoe-leaf/30";

  const mainBg = isJR ? "bg-[#f5efe6]" : "bg-white";
  const cardBg = isJR ? "bg-[#f5efe6]" : "bg-white"; // Bottom sheet on mobile matches theme
  const headlineFont = (isJR || isEM) ? "font-serif tracking-tighter-editorial-relaxed" : "font-sans tracking-tighter-sans";

  const proofPoints = [
    { icon: MessageCircle, title: "Meets you where you are", desc: "No new apps or logins. Just a daily text message in your natural rhythm." },
    { icon: BookOpen, title: "Profoundly deep", desc: "Uncover the richness of original Greek and Hebrew context in under 90 seconds." },
    { icon: ShieldCheck, title: "Radically accessible", desc: "Smartphone or flip phone, if it receives texts, it receives Zoe." },
  ];

  if (variant === "default") {
    const betaFormValid = waitlistFormValid && feedbackAgreed;
    const betaPoints = [
      { icon: Compass, title: "Test it early", desc: "Explore the core experience while we're still shaping it." },
      { icon: MessageCircle, title: "Give honest feedback", desc: "The good, the bad, and the ideas in between." },
      { icon: Heart, title: "Help the Church", desc: "Your input helps us build something that serves well." },
    ];
    const betaExpectations = [
      { icon: "/assets/icons/beta/ordinary-life.svg", title: "Use it in ordinary life", desc: "Morning, midday, or night. We want to learn where Zoe is actually helpful." },
      { icon: "/assets/icons/beta/honest-feedback.svg", title: "Tell us the good and the bad", desc: "Your honest notes will shape the product more than polite compliments." },
      { icon: "/assets/icons/beta/build-carefully.svg", title: "Help us build carefully", desc: "We're trying to build something useful for the Church with humility and patience." },
    ];
    const betaFaqs = [
      {
        question: "What does joining the beta mean?",
        answer: "You'll be considered for early access to Zoe, use it in your normal week, and tell us what's helpful, confusing, missing, or worth changing.",
      },
      {
        question: "Do I need to be technical?",
        answer: "Nope. We're looking for thoughtful Christ followers who will actually use Zoe and give plainspoken feedback.",
      },
      {
        question: "Is feedback really part of the deal?",
        answer: "Yes. Good, bad, and in-between feedback is the precondition. That's how we build slowly and serve well.",
      },
      {
        question: "Is Zoe trying to replace pastors or the Church?",
        answer: "No. Zoe is meant to be a quiet tool that helps people turn their attention toward Him daily, not a replacement for pastors, Scripture, community, or the Holy Spirit.",
      },
    ];

    return (
      <main className="min-h-screen bg-zoe-oat text-zoe-ink">
        <style jsx global>{`
          html, body {
            background-color: #fcf9f4 !important;
            margin: 0;
            padding: 0;
          }
        `}</style>

        <section className="lg:hidden">
          <div className="flex items-center justify-between px-5 pb-3 pt-5">
            <div className="w-24 text-zoe-sap">
              <ZoeSVG color="#1dc286" fast={true} />
            </div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-forest">Zoe Beta</p>
          </div>

          <div className="mx-5 overflow-hidden rounded-[1.1rem] bg-slate-900">
            <div className="relative h-32">
              <img
                src="/assets/hero/beta-mountains.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[50%_58%]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="absolute left-1/2 top-1/2 z-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.08)_46%,rgba(0,0,0,0)_76%)] blur-xl" />
                <div className="relative z-10 w-56 max-w-[70vw] drop-shadow-[0_16px_30px_rgba(0,0,0,0.28)]">
                  <ZoeSVG color="white" fast={true} />
                </div>
                <p className="relative z-10 -mt-1 text-xs font-semibold tracking-tight text-white drop-shadow">
                  Toward <span className="font-serif italic">Him</span>. Daily.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 pb-8 pt-5">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
              <h1 className="text-[2.72rem] font-extrabold leading-[0.88] tracking-[-0.055em] text-zoe-ink">
                Help us build Zoe for the Church<span className="text-zoe-sap">.</span>
              </h1>
              <p className="mt-3 text-[0.97rem] font-medium leading-6 text-zoe-muted">
                We're inviting thoughtful Christ followers to test Zoe in real life and tell us what's helpful, what's not, and what's missing.
              </p>
            </motion.div>

            <div className="mt-4 rounded-[0.95rem] border border-zoe-outline/35 bg-white/75 p-3 shadow-[0_14px_36px_rgba(45,50,49,0.05)]">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zoe-sap/10 text-zoe-sap">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-zoe-ink">This beta is built on honesty.</p>
                  <p className="mt-0.5 text-[0.82rem] font-medium leading-5 text-zoe-muted">
                    We want real feedback so we can build something that truly helps turn our attention <span className="font-serif italic text-zoe-sap">Toward Him Daily.</span>
                  </p>
                </div>
              </div>
            </div>

            <div id="beta-form-mobile" className="mt-5">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success-mobile"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-[1rem] border border-zoe-outline/35 bg-white p-5 shadow-[0_14px_36px_rgba(45,50,49,0.05)]"
                  >
                    <CheckCircle className="h-8 w-8 text-zoe-sap" />
                    <h2 className="mt-4 text-2xl font-extrabold text-zoe-ink">You're on the beta list.</h2>
                    <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">Thank you. We'll be in touch soon with next steps.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form-mobile" onSubmit={handleWaitlistSubmit} className="space-y-3" exit={{ opacity: 0, y: 8 }}>
                    <div>
                      <h2 className="text-[1.45rem] font-extrabold tracking-tight text-zoe-ink">Join the beta</h2>
                      <p className="text-sm font-medium text-zoe-muted">Sign up to be considered for early access.</p>
                    </div>

                    <fieldset className="grid grid-cols-2 gap-2 pt-1">
                      <legend className="sr-only">Phone type</legend>
                      {(["iphone", "android"] as const).map((platform) => (
                        <label
                          key={platform}
                          className={clsx(
                            "flex cursor-pointer items-center justify-center rounded-[0.85rem] border px-3 py-2.5 text-sm font-bold transition-all",
                            phonePlatform === platform
                              ? platform === "iphone"
                                ? "border-[#007AFF] bg-[#007AFF] text-white"
                                : "border-zoe-sap bg-zoe-sap text-white"
                              : "border-zoe-outline/45 bg-white text-slate-600 hover:border-zoe-outline"
                          )}
                        >
                          <input
                            type="radio"
                            name="phonePlatform"
                            value={platform}
                            checked={phonePlatform === platform}
                            onChange={() => setPhonePlatform(platform)}
                            className="sr-only"
                            required
                          />
                          <span>{platform === "iphone" ? "iPhone" : "Android"}</span>
                        </label>
                      ))}
                    </fieldset>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="First name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="min-w-0 rounded-[0.85rem] border border-zoe-outline/45 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15"
                      />
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="min-w-0 rounded-[0.85rem] border border-zoe-outline/45 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15"
                      />
                    </div>

                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full rounded-[0.85rem] border border-zoe-outline/45 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15"
                    />

                    <label className="flex items-start gap-2.5 rounded-[0.85rem] bg-white/75 p-2.5 text-[0.8rem] font-semibold leading-5 text-zoe-ink">
                      <input
                        type="checkbox"
                        checked={feedbackAgreed}
                        onChange={(event) => setFeedbackAgreed(event.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-zoe-outline text-zoe-sap accent-zoe-sap"
                        required
                      />
                      <span>I'm willing to give honest feedback: the good, the bad, and the in-between.</span>
                    </label>

                    <button
                      type="submit"
                      disabled={status === "submitting" || !betaFormValid}
                      className="w-full rounded-full bg-zoe-sap px-6 py-3.5 text-base font-extrabold text-white shadow-[0_14px_35px_rgba(29,194,134,0.22)] transition hover:brightness-105 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none"
                    >
                      {status === "submitting" ? "Applying..." : "Apply for the beta"}
                    </button>

                    {submitError ? <p className="text-sm font-semibold text-rose-600">{submitError}</p> : null}
                    <p className="text-center text-xs font-medium text-zoe-muted">Spots are limited. Feedback is part of the deal.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {showStickyBetaCta && status !== "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="fixed inset-x-5 bottom-4 z-50 rounded-full border border-zoe-outline/35 bg-white/90 p-2 shadow-[0_16px_42px_rgba(45,50,49,0.16)] backdrop-blur lg:hidden"
            >
              <a href="#beta-form-mobile" className="flex items-center justify-between gap-3 rounded-full bg-zoe-sap px-5 py-3.5 text-sm font-extrabold text-white">
                <span>Ready to test Zoe?</span>
                <span>Apply</span>
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="hidden min-h-screen lg:grid lg:grid-cols-[0.48fr_0.52fr]">
          <div className="relative min-h-[42vh] overflow-hidden bg-slate-900 lg:min-h-screen">
            <img
              src="/assets/hero/beta-mountains.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[50%_58%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <div className="absolute left-1/2 top-1/2 z-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0)_76%)] blur-2xl md:h-[38rem] md:w-[38rem]" />
              <div className="relative z-10 w-[28rem] max-w-[86vw] drop-shadow-[0_18px_36px_rgba(0,0,0,0.28)] md:w-[36rem]">
                <ZoeSVG color="white" fast={true} />
              </div>
              <p className="relative z-10 mt-4 text-lg font-semibold tracking-tight text-white drop-shadow-md">
                Toward <span className="font-serif italic text-white">Him</span>. Daily.
              </p>
            </div>
          </div>

          <div className="flex min-h-screen items-center bg-[linear-gradient(135deg,#fffdfa_0%,#fcf9f4_58%,#f5f1ea_100%)] px-5 py-10 sm:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-10 flex items-center justify-between gap-4">
                <div className="w-24 text-zoe-sap lg:hidden">
                  <ZoeSVG color="#1dc286" fast={true} />
                </div>
                <p className="ml-auto text-[12px] font-extrabold uppercase tracking-[0.32em] text-zoe-forest">
                  Zoe Beta
                </p>
              </div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <h1 className="max-w-2xl text-[3.4rem] font-extrabold leading-[0.93] tracking-[-0.058em] text-zoe-ink sm:text-[4.6rem] lg:text-[5.35rem]">
                  Help us build Zoe for the Church<span className="text-zoe-sap">.</span>
                </h1>
                <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-zoe-muted sm:text-xl">
                  Zoe is in beta, and we're inviting a small group of thoughtful Christ followers to test it, use it in ordinary life, and help shape what comes next.
                </p>
              </motion.div>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {betaPoints.map((point) => (
                  <div key={point.title} className="border-zoe-outline/45 sm:border-l sm:first:border-l-0 sm:pl-7 sm:first:pl-0">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-zoe-sap/10 text-zoe-sap">
                      <point.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-sm font-extrabold text-zoe-ink">{point.title}</h2>
                    <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">{point.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex gap-4 rounded-[1.35rem] border border-zoe-outline/35 bg-white/70 p-5 shadow-[0_16px_45px_rgba(45,50,49,0.05)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zoe-sap/10 text-zoe-sap">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-zoe-ink">This beta is built on honesty.</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-zoe-muted">
                    We're not looking for compliments. We want real feedback so we can build something that truly helps turn our attention <span className="font-serif italic text-zoe-sap">Toward Him Daily.</span>
                  </p>
                </div>
              </div>

              <div className="mt-9">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-[1.35rem] border border-zoe-outline/35 bg-white p-6 shadow-[0_16px_45px_rgba(45,50,49,0.05)]"
                    >
                      <CheckCircle className="h-8 w-8 text-zoe-sap" />
                      <h2 className="mt-4 text-2xl font-extrabold text-zoe-ink">You're on the beta list.</h2>
                      <p className="mt-2 max-w-md text-sm font-medium leading-6 text-zoe-muted">
                        Thank you. We'll be in touch soon with next steps.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleWaitlistSubmit} className="space-y-3" exit={{ opacity: 0, y: 8 }}>
                      <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-zoe-ink">Join the beta</h2>
                        <p className="mt-1 text-sm font-medium text-zoe-muted">Sign up to be considered for early access.</p>
                      </div>

                      <fieldset className="grid grid-cols-2 gap-2 pt-2">
                        <legend className="sr-only">Phone type</legend>
                        {(["iphone", "android"] as const).map((platform) => (
                          <label
                            key={platform}
                            className={clsx(
                              "flex cursor-pointer items-center justify-center rounded-[0.9rem] border px-3 py-3 text-sm font-bold transition-all",
                              phonePlatform === platform
                                ? platform === "iphone"
                                  ? "border-[#007AFF] bg-[#007AFF] text-white"
                                  : "border-zoe-sap bg-zoe-sap text-white"
                                : "border-zoe-outline/45 bg-white text-slate-600 hover:border-zoe-outline"
                            )}
                          >
                            <input
                              type="radio"
                              name="phonePlatform"
                              value={platform}
                              checked={phonePlatform === platform}
                              onChange={() => setPhonePlatform(platform)}
                              className="sr-only"
                              required
                            />
                            <span>{platform === "iphone" ? "iPhone" : "Android"}</span>
                          </label>
                        ))}
                      </fieldset>

                      <input
                        type="text"
                        placeholder="First name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded-[0.9rem] border border-zoe-outline/45 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15"
                      />
                      <input
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full rounded-[0.9rem] border border-zoe-outline/45 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15"
                      />
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-[0.9rem] border border-zoe-outline/45 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15"
                      />

                      <label className="flex items-start gap-3 rounded-[0.9rem] bg-white/65 p-3 text-sm font-semibold leading-6 text-zoe-ink">
                        <input
                          type="checkbox"
                          checked={feedbackAgreed}
                          onChange={(event) => setFeedbackAgreed(event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-zoe-outline text-zoe-sap accent-zoe-sap"
                          required
                        />
                        <span>I'm a follower of Jesus and I'm willing to give honest feedback: the good, the bad, and the in-between.</span>
                      </label>

                      <button
                        type="submit"
                        disabled={status === "submitting" || !betaFormValid}
                        className="w-full rounded-full bg-zoe-sap px-6 py-4 text-base font-extrabold text-white shadow-[0_14px_35px_rgba(29,194,134,0.22)] transition hover:brightness-105 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none"
                      >
                        {status === "submitting" ? "Applying..." : "Apply for the beta"}
                      </button>

                      {submitError ? <p className="text-sm font-semibold text-rose-600">{submitError}</p> : null}
                      <p className="text-center text-xs font-medium text-zoe-muted">Spots are limited. Feedback is part of the deal.</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-zoe-outline/25 bg-[#fffdfa] px-5 py-12 lg:px-14 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-sap">What beta testers can expect</p>
            <div className="mt-7 grid gap-3 lg:grid-cols-3 lg:gap-5">
              {betaExpectations.map((item) => (
                <div key={item.title} className="rounded-[1rem] border border-zoe-outline/35 bg-white p-5 shadow-[0_14px_40px_rgba(45,50,49,0.04)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-zoe-sap/15 text-zoe-sap">
                    <img src={item.icon} alt="" className="h-7 w-7 object-contain" />
                  </div>
                  <h2 className="text-base font-extrabold text-zoe-ink">{item.title}</h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="bg-zoe-oat px-5 pb-16 pt-4 lg:px-14 lg:pb-24 lg:pt-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-sap">FAQ</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-zoe-ink lg:text-5xl">
                A few honest answers.
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-zoe-muted">
                The beta is small on purpose. We want people who will help us build carefully, not just a bigger list.
              </p>
            </div>
            <div className="space-y-3">
              {betaFaqs.map((faq) => (
                <details key={faq.question} className="group rounded-[1rem] border border-zoe-outline/35 bg-white px-5 py-4 shadow-[0_12px_34px_rgba(45,50,49,0.035)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-extrabold text-zoe-ink">
                    <span>{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zoe-sap/10 text-lg leading-none text-zoe-sap transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm font-medium leading-6 text-zoe-muted lg:text-base lg:leading-7">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={clsx("fixed inset-0 w-full h-full overflow-hidden flex flex-col md:flex-row", mainBg)}>
      <style jsx global>{`
        html, body {
          background-color: ${isJR ? "#f5efe6" : "white"} !important;
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
      `}</style>

      {/* Mobile Visual (Background) */}
      <div className="md:hidden absolute inset-0 z-0 bg-slate-900 pointer-events-none flex flex-col">
        {variant === "jesus-red" && (
          <img src="/assets/hero/parchment-bg.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
        )}
        {variant === "emerald-uni" && (
          <div className="absolute inset-x-0 top-0 w-full h-[50dvh] overflow-hidden">
            <img src="/assets/hero/emerald-campus.jpg" className="absolute inset-0 w-full h-full object-cover object-[50%_30%]" alt="" />
          </div>
        )}
        {/* Subtle dark gradient fade so the top looks cinematic behind the overlapping card */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      </div>

      {/* Left Column (Desktop Visual) */}
      <div className="hidden md:flex w-full md:w-[50%] lg:w-[55%] relative h-full md:h-screen bg-slate-900 z-0 flex-col items-center justify-center p-12">
        {variant === "jesus-red" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img src="/assets/hero/parchment-bg.png" className="absolute inset-0 w-full h-full object-cover" alt="" />

            {/* Jesus Red Specific SVGs (Cross & Man) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="absolute left-[-10%] bottom-0 w-[60%] h-[70%]">
                <LeftHeroSvg className="w-full h-full object-contain object-bottom-left" />
              </div>
              <div className="absolute right-[5%] bottom-0 w-[60%] h-[70%]">
                <RightHeroSvg className="w-full h-full object-contain object-bottom-right" />
              </div>
            </div>
          </div>
        )}
        {variant === "emerald-uni" && (
          <div className="absolute inset-0 overflow-hidden">
            <img src="/assets/hero/emerald-campus-wide.jpg" className="absolute inset-0 w-full h-full object-cover object-center" alt="" />
            {/* Extremely subtle brightening green wash */}
            <div className="absolute inset-0 bg-[#00f2b5]/5 mix-blend-screen opacity-50" />
            <div className="absolute inset-0 bg-[#1dc286]/5 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-emerald-500/10 to-emerald-950/40" />
          </div>
        )}

        {/* Overlay Content on Visual */}
        <div className={clsx("relative z-10 flex flex-col items-center text-center p-4", isEM ? "mt-[-2%]" : "mt-[-10%]")}>
          {variant === "emerald-uni" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 1.2 }}
              className="absolute inset-0 flex items-center justify-center translate-y-[18%] pointer-events-none"
            >
              <div className="w-[140%] h-64 bg-black/24 blur-3xl rounded-full" />
              <div className="absolute w-[100%] h-48 bg-black/18 blur-[60px] rounded-full" />
            </motion.div>
          )}
          <div className="mb-8 w-64 md:w-80 lg:w-96 drop-shadow-2xl relative z-10">
            <ZoeSVG variant={variant} color={isJR ? "#3c2a21" : "white"} fast={true} />
          </div>
          <h1 className={clsx("text-4xl md:text-5xl lg:text-6xl font-medium drop-shadow-md relative z-10", headlineFont, isJR ? "text-[#3c2a21]" : "text-white")}>
            Walk with Jesus.
          </h1>
        </div>
      </div>

      {/* Mobile Overlay Content (Only visible on small screens before the bottom sheet covers it) */}
      <div className={clsx("md:hidden absolute inset-x-0 top-0 h-[40dvh] flex flex-col items-center justify-center z-0 px-6 pt-4", isEM && "translate-y-[8%]")}>
        {variant === "emerald-uni" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 1.2 }}
            className="absolute inset-0 flex items-center justify-center translate-y-[18%]"
          >
            <div className="w-[120%] h-48 bg-black/24 blur-2xl rounded-full" />
            <div className="absolute w-[80%] h-32 bg-black/18 blur-[40px] rounded-full" />
          </motion.div>
        )}
        <div className="mb-4 w-48 drop-shadow-2xl relative z-10">
          <ZoeSVG variant={variant} color={isJR ? "#3c2a21" : "white"} fast={true} />
        </div>
        <h1 className={clsx("text-3xl font-medium drop-shadow-md text-center relative z-10", headlineFont, isJR ? "text-[#3c2a21]" : "text-white")}>
          Walk with Jesus.
        </h1>
      </div>

      {/* Right Column (Desktop Content) / Bottom Sheet (Mobile Form) */}
      <div className={clsx(
        "absolute inset-x-0 bottom-0 z-10 h-auto max-h-[85dvh] rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.15)] pb-6", // Mobile bottom sheet - hugs content
        "md:static md:h-screen md:flex-1 md:w-[50%] lg:w-[45%] md:rounded-none md:shadow-[-20px_0_40px_rgba(0,0,0,0.05)] md:border-l md:border-black/5 md:pb-0", // Desktop split
        cardBg,
        "overflow-y-auto"
      )}>
        <div className="flex flex-col justify-center min-h-full px-6 md:px-12 lg:px-20 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md w-full mx-auto md:mx-0"
          >
            {/* Logo */}
            {/* <div className="mb-6 w-36 md:w-44">
              <ZoeSVG variant={variant} color={!isJR ? "#1e293b" : undefined} />
            </div> */}

            {/* Warm, Winsome Copy */}
            {/* <h1 className={clsx("text-3xl md:text-4xl font-semibold mb-3 text-slate-900", headlineFont)}>
              Walk with Jesus.
            </h1> */}
            <h2 className={clsx("text-2xl md:text-3xl font-medium mb-3 text-slate-800", headlineFont)}>
              Be among the first.
            </h2>
            <p className="text-slate-600 text-[15px] md:text-base font-medium mb-8 leading-relaxed">
              We're opening Zoe to a small group of early adopters. Join the waitlist and we'll let you know when your spot is ready.
            </p>

            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start gap-5 py-6"
                >
                  <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center shadow-inner", primaryBgLight)}>
                    <CheckCircle className={clsx("w-7 h-7", primaryColor)} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re on the list.</h2>
                    <p className="text-slate-600 font-medium leading-relaxed max-w-xs">
                      We&apos;re preparing something special. We&apos;ll text you as soon as your spot opens up.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, x: -20 }}>
                  {/* Compelling Opt-in */}
                  <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3 mb-10 w-full">
                    <fieldset className="grid grid-cols-2 gap-2">
                      <legend className="sr-only">Phone type</legend>
                      {(["iphone", "android"] as const).map((platform) => (
                        <label
                          key={platform}
                          className={clsx(
                            "flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-bold transition-all",
                            phonePlatform === platform
                              ? platform === "iphone"
                                ? "border-[#007AFF] bg-[#007AFF] text-white"
                                : clsx(primaryBg, "border-transparent text-white")
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                          )}
                        >
                          <input
                            type="radio"
                            name="phonePlatform"
                            value={platform}
                            checked={phonePlatform === platform}
                            onChange={() => setPhonePlatform(platform)}
                            className="sr-only"
                            required
                          />
                          <span>{platform === "iphone" ? "iPhone" : "Android"}</span>
                        </label>
                      ))}
                    </fieldset>
                    <input
                      type="text"
                      placeholder="Your First Name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={clsx(
                        "w-full rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium transition-shadow",
                        "focus:outline-none focus:ring-2 focus:border-transparent",
                        focusRing
                      )}
                    />
                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(555) 555-5555"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className={clsx(
                        "w-full rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium transition-shadow",
                        "focus:outline-none focus:ring-2 focus:border-transparent",
                        focusRing
                      )}
                    />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={clsx(
                        "w-full rounded-xl px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium transition-shadow",
                        "focus:outline-none focus:ring-2 focus:border-transparent",
                        focusRing
                      )}
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting" || !waitlistFormValid}
                      className={clsx(
                        "w-full rounded-xl px-6 py-4 font-bold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-1 shadow-lg shadow-black/5",
                        primaryBg
                      )}
                    >
                      {status === "submitting" ? "Joining..." : "Join The Walk"}
                    </button>
                    {submitError && (
                      <div className="mt-1 pl-1">
                        <p className="text-red-500 text-sm font-medium">{submitError}</p>
                        <button
                          type="submit"
                          disabled={status === "submitting" || !waitlistFormValid}
                          className={clsx(
                            "text-sm font-semibold underline mt-1 transition-colors disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed",
                            primaryColor
                          )}
                        >
                          Try again
                        </button>
                      </div>
                    )}
                  </form>

                  {/* Styled Proof Points */}
                  <div className="grid grid-cols-1 gap-6">
                    {proofPoints.map((point, idx) => (
                      <motion.div
                        key={point.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (idx * 0.1) }}
                        className="flex items-start gap-4"
                      >
                        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5", primaryBgLight)}>
                          <point.icon className={clsx("w-5 h-5", primaryColor)} />
                        </div>
                        <div>
                          <h3 className="text-slate-900 font-bold text-sm tracking-tight mb-1">{point.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{point.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

    </main>
  );
}
