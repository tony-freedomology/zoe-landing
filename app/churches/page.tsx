"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, FileText, Heart, ShieldCheck } from "lucide-react";
import Footer from "../../components/Footer";
import { usePhoneFormatter } from "../hooks/usePhoneFormatter";
import {
  isWaitlistEmailValid,
  isWaitlistNameValid,
  isWaitlistPhoneValid,
} from "../../lib/waitlistValidation";

const pillars = [
  {
    title: "Sermon Echo",
    body: "Upload the sermon, transcript, or notes. Zoe turns Sunday into a weekday companion your team can review before it sends.",
  },
  {
    title: "Church Profile",
    body: "Set tradition, tone, theological guardrails, and handoff rules so Zoe sounds aligned without needing prompt engineering.",
  },
  {
    title: "Prayer Circle",
    body: "Members can opt into prayer support. Requests are privacy-scrubbed and routed to the audience your church chooses.",
  },
  {
    title: "Pastoral Brief",
    body: "Leaders see cohort patterns, what landed, what confused people, and where someone explicitly asked for human follow-up.",
  },
];

const setup = [
  "Choose your tradition and guardrails.",
  "Upload this Sunday's sermon.",
  "Preview the weekday companion.",
  "Run the sandbox questions you actually worry about.",
  "Invite members by SMS, QR code, or link.",
];

const faqs = [
  {
    q: "Can staff approve what goes out?",
    a: "Yes. Sermon companions are previewed before they send. Zoe should extend your church's voice, not surprise it.",
  },
  {
    q: "Can pastors read private conversations?",
    a: "No, not by default. The church view is built around aggregated patterns and explicit hand-raises, not surveillance.",
  },
  {
    q: "Does this replace pastoral care?",
    a: "No. It catches moments during the week and routes important ones toward real humans instead of pretending the tool can pastor everything.",
  },
  {
    q: "Do members need an app?",
    a: "No. Zoe lives in text messages because that is where ordinary weekday follow-through is most likely to happen.",
  },
];

export default function ChurchesPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formValid =
    isWaitlistNameValid(name) &&
    isWaitlistPhoneValid(phone) &&
    isWaitlistEmailValid(email);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValid) {
      setSubmitError("Enter a valid name, phone number, and email.");
      return;
    }

    setStatus("submitting");
    setSubmitError(null);
    const payload = { name, phone, email, source: "churches-waitlist", submittedAt: new Date().toISOString() };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) throw new Error(data?.error || "Unable to submit");
      setStatus("sent");
    } catch (error) {
      console.warn("Church waitlist submission failed:", error);
      setStatus("idle");
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="bg-[#173A2E] px-6 pb-24 pt-36 text-white md:pb-32 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_27rem] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
              For churches · weekday formation
            </p>
            <h1 className="mt-7 max-w-5xl text-[3.7rem] font-extrabold leading-[0.9] tracking-[-0.058em] [word-spacing:0.045em] md:text-[6.7rem] md:tracking-[-0.075em]">
              Sunday needs somewhere to go on Monday.
            </h1>
          </div>
          <div className="rounded-[2rem] bg-white/8 p-7 ring-1 ring-white/12">
            <p className="font-serif text-3xl italic leading-[1.22] tracking-normal text-white/86 [word-spacing:0.06em]">
              Zoe gives the sermon a weekday thread without giving leaders a back door into private souls.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a href="#waitlist" className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-6 py-4 text-sm font-bold text-white transition hover:bg-zoe-forest">
                Join the church waitlist <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/18 px-6 py-4 text-sm font-bold text-white/82 transition hover:bg-white/8">
                See Zoe for individuals
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">What the church gets</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-zoe-outline/55 bg-zoe-outline/55 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className="bg-zoe-oat p-8 md:p-10">
                <p className="font-serif text-4xl italic leading-none text-zoe-sap">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-9 text-4xl font-extrabold leading-[0.95] tracking-[-0.06em] text-zoe-ink md:text-5xl">
                  {pillar.title}
                </h2>
                <p className="mt-5 max-w-xl font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">Setup</p>
            <h2 className="mt-6 text-[3.1rem] font-extrabold leading-[0.92] tracking-[-0.066em] text-zoe-ink [word-spacing:0.025em] md:text-[5rem] md:tracking-[-0.075em]">
              About fifteen minutes to a pilot.
            </h2>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-zoe-outline/55 bg-zoe-outline/55">
            {setup.map((step, index) => (
              <div key={step} className="grid gap-4 bg-zoe-oat p-6 md:grid-cols-[72px_1fr] md:p-7">
                <p className="font-serif text-4xl italic leading-none text-zoe-sap">{String(index + 1).padStart(2, "0")}</p>
                <p className="text-2xl font-extrabold leading-8 tracking-[-0.04em] text-zoe-ink">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#173A2E] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">Trust posture</p>
            <h2 className="mt-6 text-[3.1rem] font-extrabold leading-[0.92] tracking-[-0.066em] [word-spacing:0.025em] md:text-[5rem] md:tracking-[-0.075em]">
              Cohort signal. Personal privacy.
            </h2>
            <p className="mt-7 max-w-xl text-lg font-medium leading-8 tracking-normal text-white/70 [word-spacing:0.08em]">
              The dashboard should help leaders care for the church without turning private formation into staff surveillance.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { icon: BarChart3, title: "Aggregated weekly insight", body: "Themes, engagement, hand-raises, and what stayed with people." },
              { icon: ShieldCheck, title: "Private by default", body: "Personal threads stay personal unless a member explicitly asks for follow-up." },
              { icon: FileText, title: "Preview before send", body: "Staff review keeps sermon companions aligned with the church's voice." },
              { icon: Heart, title: "Prayer without performance", body: "Prayer requests are scrubbed, routed, and reported back gently." },
            ].map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white/7 p-7 ring-1 ring-white/12">
                <item.icon className="h-5 w-5 text-zoe-sap" />
                <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-white">{item.title}</h3>
                <p className="mt-2 font-medium leading-7 tracking-normal text-white/60 [word-spacing:0.08em]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">FAQs</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-center text-[3rem] font-extrabold leading-[0.95] tracking-[-0.066em] text-zoe-ink [word-spacing:0.025em] md:text-[5rem] md:tracking-[-0.07em]">
            Questions pastors should ask.
          </h2>
          <div className="mt-12 grid gap-4">
            {faqs.map((faq) => (
              <article key={faq.q} className="rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45">
                <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-zoe-ink">{faq.q}</h3>
                <p className="mt-3 font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="border-t border-zoe-outline/55 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] bg-white p-7 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">Church waitlist</p>
            <h2 className="mt-5 text-[3rem] font-extrabold leading-[0.95] tracking-[-0.066em] text-zoe-ink [word-spacing:0.025em] md:text-[4.5rem] md:tracking-[-0.07em]">
              Pilot the weekday layer.
            </h2>
            <p className="mt-6 text-lg font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
              We are opening church deployments carefully. Join the list and we will reach out when a pilot slot is ready.
            </p>
          </div>

          {status === "sent" ? (
            <div className="rounded-[1.6rem] bg-zoe-oat p-8 text-center ring-1 ring-zoe-outline/45">
              <CheckCircle className="mx-auto h-10 w-10 text-zoe-sap" />
              <h3 className="mt-5 text-3xl font-extrabold tracking-[-0.05em] text-zoe-ink">You are on the list.</h3>
              <p className="mt-3 font-medium leading-7 text-zoe-muted">We will reach out when a church pilot slot opens.</p>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <input type="hidden" name="source" value="churches-waitlist" />
              <input required type="text" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name / church name" className="rounded-[1.2rem] border border-zoe-outline/45 bg-zoe-oat px-5 py-4 text-base font-medium text-zoe-ink placeholder:text-zoe-muted/60 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15" />
              <input required type="tel" name="phone" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="rounded-[1.2rem] border border-zoe-outline/45 bg-zoe-oat px-5 py-4 text-base font-medium text-zoe-ink placeholder:text-zoe-muted/60 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15" />
              <input required type="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="rounded-[1.2rem] border border-zoe-outline/45 bg-zoe-oat px-5 py-4 text-base font-medium text-zoe-ink placeholder:text-zoe-muted/60 focus:border-zoe-sap focus:outline-none focus:ring-2 focus:ring-zoe-sap/15" />
              <button type="submit" disabled={status === "submitting" || !formValid} className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:bg-zoe-forest disabled:bg-slate-200 disabled:text-slate-500">
                {status === "submitting" ? "Joining..." : "Join the church waitlist"}
              </button>
              {submitError ? <p className="text-center text-sm font-medium text-rose-600">{submitError}</p> : null}
              <p className="text-center text-xs leading-relaxed text-zoe-muted">
                By joining, you consent to receive recurring automated SMS messages. Msg &amp; data rates may apply. Reply STOP to opt out.{" "}
                <a href="/privacy" className="underline">Privacy Policy</a>{" · "}
                <a href="/terms" className="underline">Terms</a>
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
