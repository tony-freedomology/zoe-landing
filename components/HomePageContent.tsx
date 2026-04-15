"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, type FormEvent } from "react";
import clsx from "clsx";
import { CheckCircle, ChevronDown } from "lucide-react";
import ParallaxBackgrounds from './ParallaxBackgrounds';
import Hero2D from './Hero2D';
import StickySmsSection from './StickySmsSection';
import StickyRhythmsSection from './StickyRhythmsSection';
import JourneyMarquee from './JourneyMarquee';
import ThesisSection from './ThesisSection';
import Footer from "./Footer";
import { Highlight } from './Highlight';
import { usePhoneFormatter } from '../app/hooks/usePhoneFormatter';
import {
  isWaitlistEmailValid,
  isWaitlistNameValid,
  isWaitlistPhoneValid,
} from "../lib/waitlistValidation";

interface HomeProps {
  variant?: "default" | "jesus-red" | "emerald-uni" | "emerald-uni";
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const faqs = [
  {
    question: "Is Zoe replacing my pastor or my church?",
    answer: "Not even close. Zoe is built for the space between Sundays — the Monday through Saturday when your pastor isn't available and your small group isn't meeting. It's designed to point you toward God, not away from community. Think of it as the thing that helps you show up to church more engaged, not less.",
  },
  {
    question: "Is this just ChatGPT with a Bible?",
    answer: "No. Zoe is purpose-built for spiritual accompaniment, which means it's trained specifically to ask the right questions, hold your history, and walk at your pace — not generate generic religious content. The goal is never to give you information. It's to help you hear God and act on what He's saying.",
  },
  {
    question: "Is Zoe trying to replace the Holy Spirit?",
    answer: "No tool can do that and we'd never claim otherwise. Zoe's entire job is to help you pay attention — to what you're reading, what God might be saying, and what you're going to do about it. The Holy Spirit does the real work. Zoe just helps you stay in the room.",
  },
  {
    question: "Is Zoe biblically accurate?",
    answer: "We take this seriously. Zoe draws on original language scholarship, historical context, and sound theology to enrich your reading. When there are areas of theological debate, Zoe acknowledges them rather than pretending certainty that doesn't exist.",
  },
  {
    question: "Can my church use this? How would that work?",
    answer: "Yes — and it works well at the church level. A pastor or church leader can bring Zoe in as a tool for their congregation. Members use it individually and privately. Leadership gets an anonymized view of how the community is doing — what themes are surfacing, where people seem to be struggling — so they can preach and pastor more responsively. No individual messages are ever shared. If you're a church leader interested in rolling this out, reach out to us directly. We'd love to talk.",
  },
  {
    question: "Will this cause people to form unhealthy relationships with the technology?",
    answer: "It's a fair concern and we think about it constantly. Zoe is designed to point outward — toward God, toward Scripture, toward community — not to create dependency on the tool itself. We measure success by whether people are engaging more with their faith, not more with their phones.",
  },
  {
    question: "What about privacy?",
    answer: "See the full breakdown above. Short version: your conversations are private by default, data sharing is always opt-in, and we never sell your data or use it to train public models.",
  },
  {
    question: "Do humans at Zoe read my messages?",
    answer: "No. Your conversations are processed automatically to deliver your experience. No one on our team reads your personal messages.",
  },
  {
    question: "Is my data used to train models?",
    answer: "Your personal conversations are never used to train public models. Full stop.",
  },
  {
    question: "What does it cost?",
    answer: "We'll share pricing details when we open the waitlist. Join now and you'll be among the first to know — and the first in line for early adopter rates.",
  },
];

export default function HomePageContent({ variant = "default" }: HomeProps) {
  const isDefault = variant === "default";
  const defaultSectionHeading = "font-extrabold tracking-tight font-sans text-zoe-ink";
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");

  const trustRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trustScroll } = useScroll({
    target: trustRef,
    offset: ["start 80%", "end 60%"]
  });
  const trustLineHeight = useTransform(trustScroll, [0, 1], ["0%", "100%"]);

  const waitlistRef = useRef<HTMLElement>(null);
  const { scrollYProgress: waitlistScroll } = useScroll({
    target: waitlistRef,
    offset: ["end 70%", "end 20%"]
  });

  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const waitlistFormValid =
    isWaitlistNameValid(name) &&
    isWaitlistPhoneValid(phone) &&
    isWaitlistEmailValid(email);

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!waitlistFormValid) {
      setSubmitError("Enter a valid name, phone number, and email.");
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    const payload = {
      name,
      phone,
      email,
      source: "individuals-waitlist",
      submittedAt: new Date().toISOString(),
    };

    const attempt = async () => {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        throw new Error(data?.details || data?.error || "Unable to submit waitlist request");
      }
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

  return (
    <div className="min-h-screen text-zoe-ink selection:bg-zoe-sap/20">
      <main className="relative z-10 font-sans">
        <Hero2D variant={variant} />

        {/* Global Parallax Environment */}
        <ParallaxBackgrounds variant={variant} />

        {/* The Thesis */}
        <ThesisSection variant={variant} />

        {/* Act 1: The SMS Narrative */}
        <StickySmsSection variant={variant} />

        {/* Act 2: The Daily Rhythm */}
        <StickyRhythmsSection />

        <section className={clsx("relative overflow-hidden px-6 py-20 md:py-28", variant === "jesus-red" ? "bg-[#f8f1e7]" : isDefault ? "bg-zoe-oat" : "bg-[#FCFAF8]")}>
          <div className={clsx(
            "absolute inset-0 pointer-events-none",
            isDefault
              ? ""
              : "bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(29,194,134,0.08),transparent_40%)]"
          )} />
          <div className="mx-auto max-w-7xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mb-12 max-w-3xl text-center">
              {!isDefault ? (
                <div className={clsx("inline-flex items-center gap-2 border px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm",
                  variant === "jesus-red" ? "rounded-md border-[#7a2332]/20 bg-[rgba(122,35,50,0.06)] text-[#7a2332]" : variant === "emerald-uni" ? "rounded-full bg-[#1dc286] text-white border-transparent" : "rounded-full border-[#d97706]/20 bg-[#d97706]/10 text-[#d97706]")}>
                  Guided Journeys
                </div>
              ) : null}
              <h2 className={clsx("text-4xl md:text-5xl leading-[1.08]", isDefault ? defaultSectionHeading : "text-slate-900 font-bold tracking-tighter-editorial")}>
                {isDefault ? (
                  <>
                    Daily journeys tailored to your{" "}
                    <span className="font-serif font-normal italic text-zoe-leaf">actual life</span>
                  </>
                ) : (
                  "Scripture for the places people actually live."
                )}
              </h2>
              <p className={clsx("mt-5 text-lg md:text-xl font-medium leading-relaxed", isDefault ? "text-zoe-muted" : "text-slate-600")}>
                Choose a pre-made Daily path on fear, money, marriage, grief, prayer, or have Zoe create a custom one.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <JourneyMarquee />
            </motion.div>
          </div>
        </section>

        {/* Act 3: The Clearing (Unified CTA & Pricing) */}
        <section ref={waitlistRef} id="waitlist" className={clsx("min-h-[150vh] relative", variant === "jesus-red" ? "bg-[#f5efe6]" : isDefault ? "bg-zoe-surface" : "bg-[#F8FBFA]")}>
          <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center overflow-hidden py-24 md:py-40 px-4">
            {variant !== "jesus-red" && (
              <>
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(251,248,242,0.98),rgba(245,241,232,0.94))]" />
              </>
            )}

            <div className="mx-auto max-w-3xl relative z-10 w-full">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className={clsx("relative text-center", variant === "jesus-red" ? "overflow-hidden rounded-xl p-6 md:p-16" : "px-6 py-8 md:px-8 md:py-10")}>
                {variant === "jesus-red" && (
                  <div className="absolute inset-0 bg-[#faf7f0] border border-[#e0d8cd] shadow-lg shadow-black/5" />
                )}

                <div className="relative z-10 mx-auto max-w-3xl">
                  {isDefault && (
                    <div className="mx-auto mb-8 h-1.5 w-16 rounded-full bg-zoe-sap/80" />
                  )}
                  <div className={clsx("inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-8 shadow-sm",
                    variant === "jesus-red" ? "rounded-md border border-[#e0d8cd] bg-[#f5efe6] text-[#7a2332]" : variant === "emerald-uni" ? "rounded-full bg-[#1dc286] text-white border-transparent" : isDefault ? "rounded-full border border-zoe-outline/50 bg-white text-[#6c7a73]" : "rounded-full border border-zoe-leaf/20 bg-zoe-leaf/5 text-zoe-leaf")}>
                    Pre-Alpha Waitlist
                  </div>

                  <h2 className={clsx("mx-auto max-w-2xl text-4xl md:text-6xl leading-[1.06]", isDefault ? defaultSectionHeading : "text-slate-900 font-semibold tracking-tight")}>
                    Be among the first.
                  </h2>
                  <p className={clsx("mt-5 text-lg font-medium max-w-2xl mx-auto leading-relaxed", isDefault ? "text-zoe-muted" : "text-slate-600")}>
                    We're opening Zoe to a small group of early adopters. Join the waitlist and we'll let you know when your spot is ready.
                  </p>

                  <div className={clsx("mt-10 max-w-md mx-auto w-full p-5 md:p-6 relative overflow-hidden",
                    variant === "jesus-red" ? "bg-white border border-[#e0d8cd] shadow-sm rounded-lg" : isDefault ? "rounded-[2rem] border border-zoe-outline/45 bg-white shadow-[0_18px_44px_rgba(28,28,25,0.06)]" : "rounded-2xl bg-slate-50/80 backdrop-blur-xl border border-slate-100 shadow-sm")}>
                    {status === "sent" ? (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-8 px-4 text-center">
                        <div className="w-16 h-16 bg-zoe-leaf/10 rounded-full flex items-center justify-center mb-6">
                          <CheckCircle className="w-8 h-8 text-zoe-leaf" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">You're on the list!</h3>
                        <p className="text-slate-600 font-medium leading-relaxed">
                          We've received your request. We'll be in touch as soon as spots open up.
                        </p>
                      </motion.div>
                    ) : (
                      <form className="flex flex-col gap-4" onSubmit={handleWaitlistSubmit}>
                        <input type="hidden" name="source" value="individuals-waitlist" />
                        <input
                          required
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Your Name"
                          className={clsx(
                            "border px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-sm",
                            variant === "jesus-red"
                              ? "rounded-md focus:ring-2 focus:ring-[#7a2332]/50 focus:border-[#7a2332]/50"
                              : isDefault
                                ? "rounded-[1.2rem] border-zoe-outline/45 bg-zoe-oat focus:border-zoe-sap focus:ring-2 focus:ring-zoe-sap/15"
                                : "rounded-xl focus:ring-2 focus:ring-zoe-leaf/50 focus:border-zoe-leaf/50"
                          )}
                        />
                        <input
                          required
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="Phone Number"
                          className={clsx(
                            "border px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-sm",
                            variant === "jesus-red"
                              ? "rounded-md focus:ring-2 focus:ring-[#7a2332]/50 focus:border-[#7a2332]/50"
                              : isDefault
                                ? "rounded-[1.2rem] border-zoe-outline/45 bg-zoe-oat focus:border-zoe-sap focus:ring-2 focus:ring-zoe-sap/15"
                                : "rounded-xl focus:ring-2 focus:ring-zoe-leaf/50 focus:border-zoe-leaf/50"
                          )}
                        />
                        <input
                          required
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="Email Address"
                          className={clsx(
                            "border px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all shadow-sm",
                            variant === "jesus-red"
                              ? "rounded-md focus:ring-2 focus:ring-[#7a2332]/50 focus:border-[#7a2332]/50"
                              : isDefault
                                ? "rounded-[1.2rem] border-zoe-outline/45 bg-zoe-oat focus:border-zoe-sap focus:ring-2 focus:ring-zoe-sap/15"
                                : "rounded-xl focus:ring-2 focus:ring-zoe-leaf/50 focus:border-zoe-leaf/50"
                          )}
                        />
                        <button
                          className={clsx("mt-2 px-4 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-white shadow-lg",
                            variant === "jesus-red"
                              ? "rounded-md bg-[#7a2332] shadow-[#7a2332]/20 hover:bg-[#5c1624] hover:-translate-y-0.5 disabled:bg-[#7a2332]/45 disabled:shadow-none disabled:hover:translate-y-0"
                              : isDefault
                                ? "rounded-full bg-zoe-sap shadow-sm hover:brightness-105 active:scale-95 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none disabled:active:scale-100"
                                : "rounded-xl bg-slate-900 shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0")}
                          type="submit"
                          disabled={status === "submitting" || !waitlistFormValid}
                        >
                          {status === "submitting" ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : "Join The Walk"}
                        </button>
                        {submitError ? (
                          <div className="text-center">
                            <p className="text-xs font-medium text-rose-600 mb-2">{submitError}</p>
                            <button
                            type="submit"
                            disabled={status === "submitting" || !waitlistFormValid}
                            className={clsx(
                              "text-xs font-semibold underline transition-colors disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed",
                              isDefault ? "text-zoe-forest hover:text-zoe-forest/80" : "text-zoe-leaf hover:text-zoe-leaf/80"
                            )}
                          >
                            Try again
                          </button>
                          </div>
                        ) : null}
                        <p className="mt-3 text-xs leading-relaxed text-slate-400 text-center">
                          By joining, you consent to receive recurring automated SMS messages from Zoe by Freedomology at the phone number provided. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help.{" "}
                          <a href="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>{" · "}
                          <a href="/terms" className="underline hover:text-slate-600 transition-colors">Terms of Service</a>
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust & Privacy */}
        <section className={clsx("py-20 md:py-32 px-6 relative overflow-hidden", isDefault ? "bg-zoe-oat" : "bg-[#FCFAF8]")}>
          <div className={clsx("absolute inset-0 pointer-events-none", isDefault ? "" : "bg-[radial-gradient(circle_at_top_right,rgba(252,211,77,0.05),transparent_50%)]")} />
          <div className={clsx("absolute inset-0 pointer-events-none", isDefault ? "" : "bg-[radial-gradient(circle_at_bottom_left,rgba(29,194,134,0.05),transparent_50%)]")} />

          <div className="mx-auto max-w-3xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20">
              <div className={clsx("inline-flex items-center gap-2 border px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-8 shadow-sm",
                variant === "jesus-red" ? "rounded-md border-[#7a2332]/20 bg-[rgba(122,35,50,0.06)] text-[#7a2332]" : variant === "emerald-uni" ? "rounded-full bg-[#009f52] text-white border-transparent" : isDefault ? "rounded-full border-zoe-outline/50 bg-white text-[#6c7a73]" : "rounded-full border-zoe-leaf/20 bg-zoe-leaf/5 text-zoe-leaf")}>
                Trust & Privacy
              </div>
              <h2 className={clsx("text-4xl md:text-5xl lg:text-6xl leading-[1.1]", isDefault ? defaultSectionHeading : "text-slate-900 font-bold tracking-tighter-editorial-relaxed")}>
                {isDefault ? (
                  "How private is this?"
                ) : (
                  <>
                    How private is <Highlight type="underline" color="text-zoe-leaf" scrollOffset={["start 90%", "start 40%"]}>this?</Highlight>
                  </>
                )}
              </h2>
              <p className={clsx("mt-8 text-xl font-medium leading-relaxed", isDefault ? "text-zoe-muted" : "text-slate-600")}>
                {isDefault
                  ? "Private by default. If a church uses Zoe, leaders should see patterns, not personal threads. Any deeper sharing is opt-in, narrow, and clearly explained."
                  : "By default, completely private. We offer congregations the ability to anonymously share their data so church leaders can see broad trends but NEVER personal messages. Any kind of data sharing is opt-in and we are completely transparent about how your data gets processed to tailor your experience of Zoe."}
              </p>
            </motion.div>

            <div ref={trustRef} className="relative flex flex-col gap-16">
              <div className={clsx("absolute left-[1px] top-0 bottom-0 w-[2px] hidden md:block", isDefault ? "bg-zoe-outline/45" : "bg-zoe-leaf/10")} />
              <motion.div style={{ height: trustLineHeight }} className={clsx("absolute left-[1px] top-0 hidden md:block", isDefault ? "w-[2px] bg-zoe-sap" : "w-[2px] bg-zoe-leaf")} />

              {/* Individuals Block */}
              <div>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative md:pl-12 mb-8">
                  <h3 className={clsx("text-xl uppercase tracking-widest mb-6", isDefault ? "font-medium text-zoe-forest" : "font-bold text-zoe-leaf")}>For Individuals:</h3>
                </motion.div>

                <div className="flex flex-col gap-10">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} className="relative md:pl-12">
                    <div className={clsx("hidden md:flex absolute -left-[14px] top-0 w-8 h-8 rounded-full flex-col items-center justify-center z-10 transition-colors duration-500", isDefault ? "bg-zoe-oat border border-zoe-outline/60" : "bg-[#FCFAF8] border-2 border-zoe-leaf/30")}>
                      <div className={clsx("w-2 h-2 rounded-full", isDefault ? "bg-zoe-sap" : "bg-zoe-leaf/80")} />
                    </div>
                    <h4 className={clsx("text-2xl tracking-tight mb-3 text-slate-900", isDefault ? "font-semibold" : "font-bold")}>Just between you and God.</h4>
                    <p className={clsx("text-lg leading-relaxed", isDefault ? "text-zoe-muted" : "text-slate-600")}>Your conversations are never shared with your church, your pastor, or anyone else. What you bring to Zoe stays with you.</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="relative md:pl-12">
                    <div className={clsx("hidden md:flex absolute -left-[14px] top-0 w-8 h-8 rounded-full flex-col items-center justify-center z-10 transition-colors duration-500", isDefault ? "bg-zoe-oat border border-zoe-outline/60" : "bg-[#FCFAF8] border-2 border-zoe-leaf/30")}>
                      <div className={clsx("w-2 h-2 rounded-full", isDefault ? "bg-zoe-sap" : "bg-zoe-leaf/80")} />
                    </div>
                    <h4 className={clsx("text-2xl tracking-tight mb-3 text-slate-900", isDefault ? "font-semibold" : "font-bold")}>Your data, your rules.</h4>
                    <p className={clsx("text-lg leading-relaxed", isDefault ? "text-zoe-muted" : "text-slate-600")}>You can take your full history with you if you ever leave, or ask us to erase it completely. No hard feelings, no questions asked.</p>
                  </motion.div>
                </div>
              </div>

              {/* Churches Block */}
              <div className="mt-8">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative md:pl-12 mb-6">
                  <h3 className={clsx("text-xl uppercase tracking-widest mb-4", isDefault ? "font-medium text-zoe-forest" : "font-bold text-zoe-leaf")}>For Churches:</h3>
                  <p className={clsx("text-lg leading-relaxed mb-8 font-medium", isDefault ? "text-zoe-muted" : "text-slate-600")}>If your church or organization chooses to use Zoe collectively, here's what that looks like:</p>
                </motion.div>

                <div className="flex flex-col gap-10">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} className="relative md:pl-12">
                    <div className={clsx("hidden md:flex absolute -left-[14px] top-0 w-8 h-8 rounded-full flex-col items-center justify-center z-10 transition-colors duration-500", isDefault ? "bg-zoe-oat border border-zoe-outline/60" : "bg-[#FCFAF8] border-2 border-zoe-leaf/30")}>
                      <div className={clsx("w-2 h-2 rounded-full", isDefault ? "bg-zoe-sap" : "bg-zoe-leaf/80")} />
                    </div>
                    <h4 className={clsx("text-2xl tracking-tight mb-3 text-slate-900", isDefault ? "font-semibold" : "font-bold")}>We share trends, not secrets.</h4>
                    <p className={clsx("text-lg leading-relaxed", isDefault ? "text-zoe-muted" : "text-slate-600")}>Pastors can see how their congregation is doing as a whole — themes that are surfacing, areas where people are struggling — but never individual messages or personal confessions.</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="relative md:pl-12">
                    <div className={clsx("hidden md:flex absolute -left-[14px] top-0 w-8 h-8 rounded-full flex-col items-center justify-center z-10 transition-colors duration-500", isDefault ? "bg-zoe-oat border border-zoe-outline/60" : "bg-[#FCFAF8] border-2 border-zoe-leaf/30")}>
                      <div className={clsx("w-2 h-2 rounded-full", isDefault ? "bg-zoe-sap" : "bg-zoe-leaf/80")} />
                    </div>
                    <h4 className={clsx("text-2xl tracking-tight mb-3 text-slate-900", isDefault ? "font-semibold" : "font-bold")}>You hold the keys.</h4>
                    <p className={clsx("text-lg leading-relaxed", isDefault ? "text-zoe-muted" : "text-slate-600")}>Any data sharing at the congregation level is always opt-in. We are fully transparent about what gets shared and what doesn't.</p>
                  </motion.div>
                </div>
              </div>

            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className={clsx("mt-20 text-center pt-10", isDefault ? "border-t border-zoe-outline/40" : "border-t border-slate-200/60")}>
              <p className={clsx("font-medium mb-6 text-lg", isDefault ? "text-zoe-muted" : "text-slate-500")}>Zoe is a closed, secure loop. We never sell your data, and we never use your personal moments to train public models.</p>
              <a href="/privacy" className={clsx(
                "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-300",
                isDefault ? "border border-zoe-outline/45 bg-white text-zoe-ink shadow-zoe-card hover:bg-zoe-surface" : "border border-slate-200 bg-white shadow-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}>
                Read Full Privacy Policy
              </a>
            </motion.div>
          </div>
        </section>

        <section id="faq" className={clsx("scroll-mt-24 py-20 md:py-32 px-6 relative overflow-hidden", isDefault ? "bg-zoe-surface" : "bg-[#F8FBFA]")}>
          <div className="mx-auto max-w-4xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
              <div className={clsx("inline-flex items-center gap-2 border px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm",
                variant === "jesus-red" ? "rounded-md border-[#7a2332]/20 bg-[rgba(122,35,50,0.06)] text-[#7a2332]" : variant === "emerald-uni" ? "rounded-full bg-[#009f52] text-white border-transparent" : isDefault ? "rounded-full border-zoe-outline/50 bg-white text-[#6c7a73]" : "rounded-full border-zoe-leaf/20 bg-zoe-leaf/5 text-zoe-leaf")}>
                FAQs
              </div>
              <h2 className={clsx("text-4xl md:text-5xl", isDefault ? defaultSectionHeading : "text-slate-900 font-bold tracking-tighter-editorial-relaxed")}>You've got questions. <br className="md:hidden" />We get it.</h2>
              <p className={clsx("mt-6 text-lg font-medium max-w-2xl mx-auto", isDefault ? "text-zoe-muted" : "text-slate-600")}>
                We&apos;d be worried if you <span className="italic">didn&apos;t</span>!
              </p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <motion.div variants={fadeUp} key={i} className={clsx("overflow-hidden transition-all duration-300", variant === "jesus-red" ? "rounded-lg bg-[#faf7f0] border border-[#e0d8cd] shadow-[0_4px_20px_rgb(0,0,0,0.03)]" : isDefault ? "rounded-[1.75rem] bg-white border border-zoe-outline/35 shadow-zoe-card" : "rounded-3xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)]")}>
                  <button
                    type="button"
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 p-6 text-left md:p-8"
                  >
                    <span className={clsx("font-semibold text-xl pr-2", variant === "jesus-red" ? "text-slate-900" : isDefault ? "text-zoe-ink" : "text-zoe-leaf")}>
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={clsx(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border",
                        variant === "jesus-red"
                          ? "border-[#7a2332]/20 bg-[#7a2332]/10 text-[#7a2332]"
                          : isDefault
                            ? "border-zoe-sap/20 bg-zoe-sap/10 text-zoe-sap"
                            : "border-zoe-leaf/20 bg-zoe-leaf/10 text-zoe-leaf"
                      )}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={false}
                    animate={{
                      height: openFaq === i ? "auto" : 0,
                      opacity: openFaq === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 md:px-8 md:pb-8">
                      <p className={clsx("leading-relaxed font-medium md:text-lg", isDefault ? "text-zoe-muted" : "text-slate-600")}>{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />

        <motion.div
          style={{
            opacity: waitlistScroll,
            y: useTransform(waitlistScroll, [0, 1], [50, 0]),
            pointerEvents: useTransform(waitlistScroll, v => v > 0.1 ? 'auto' : 'none')
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none"
        >
          <button
            onClick={() => window.scrollTo({ top: waitlistRef.current?.offsetTop, behavior: 'smooth' })}
            className={clsx("px-6 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-white shadow-xl shadow-slate-900/20 hover:-translate-y-0.5",
              variant === "jesus-red" ? "rounded-md bg-[#7a2332] hover:bg-[#5c1624]" : isDefault ? "rounded-full bg-zoe-sap shadow-sm hover:brightness-105 active:scale-95" : "rounded-full bg-slate-900 hover:bg-slate-800")}
          >
            Join The Walk
          </button>
        </motion.div>
      </main>
    </div>
  );
}
