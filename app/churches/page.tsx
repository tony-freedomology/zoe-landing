"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle,
  BarChart3,
  Settings,
  ShieldCheck,
  BookOpen,
  FileText,
  Heart,
  Calendar,
  Hand,
  Mic,
  Eye,
  QrCode,
  Lock,
  Quote,
  Send,
} from "lucide-react";
import SmsAnimation from "../../components/SmsAnimation";
import Footer from "../../components/Footer";
import { usePhoneFormatter } from "../hooks/usePhoneFormatter";
import communityBg from "../../public/images/community-image.png";

/* ━━━ Animation Tokens (matching main page) ━━━ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

/* ━━━ Data ━━━ */
const pillars = [
  {
    title: "Sermon Companion",
    eyebrow: "Sunday to Friday, tied to one sermon",
    body: "Upload a sermon, transcript, or notes. Zoe turns it into a Mon–Fri formation plan with reflection, scripture, and a concrete next step. Your team previews, edits, and approves before anything sends.",
    icon: <Mic className="h-6 w-6" />,
    accent: "text-brand-jade",
    accentBg: "bg-brand-jade/10",
    layout: "lg:col-span-3",
  },
  {
    title: "Church Theological Profile",
    eyebrow: "A guided wizard, not a blank textbox",
    body: "Pick your tradition, answer theology questions, set guardrails, and define when Zoe should defer to a priest, pastor, or staff member. No prompt engineering required.",
    icon: <BookOpen className="h-6 w-6" />,
    accent: "text-brand-cyan",
    accentBg: "bg-brand-cyan/10",
    layout: "lg:col-span-3",
  },
  {
    title: "Trust Sandbox",
    eyebrow: "Ask the hard questions before launch",
    body: "Clergy can pressure-test Zoe with real edge cases and see the exact response before a single member joins.",
    icon: <Eye className="h-6 w-6" />,
    accent: "text-zinc-700",
    accentBg: "bg-zinc-100",
    layout: "lg:col-span-2",
  },
  {
    title: "Church Prayer Circle",
    eyebrow: "Your church showed up for you",
    body: "Opt-in prayer requests are privacy-scrubbed, sent to the audience you choose, and reported back with simple human proof: people from your church prayed today.",
    icon: <Heart className="h-6 w-6" />,
    accent: "text-amber-600",
    accentBg: "bg-amber-50",
    layout: "lg:col-span-2",
  },
  {
    title: "Congregation Launch Kit",
    eyebrow: "Three clean entry paths",
    body: "Launch with bulk SMS, QR codes or invite links, and an organic fallback for anyone who hears about Zoe from a friend or the bulletin.",
    icon: <QrCode className="h-6 w-6" />,
    accent: "text-brand-jade",
    accentBg: "bg-brand-jade/10",
    layout: "lg:col-span-2",
  },
];

const setupSteps = [
  { step: "01", title: "Choose your tradition", body: "Catholic, Baptist, Anglican, non-denom, Pentecostal. Start there, then answer the real theology questions that shape the tone." },
  { step: "02", title: "Set your guardrails", body: "Mark sensitive topics, write your deferral rules, and tell Zoe when to hand something to clergy or staff." },
  { step: "03", title: "Upload this Sunday's sermon", body: "Use notes, transcript, or audio. Zoe drafts the weekday companion and your team can tighten it up before approval." },
  { step: "04", title: "Run the sandbox", body: "Ask the questions you'd actually worry about. See the answer exactly as a member would see it, then adjust until it feels right." },
  { step: "05", title: "Launch your congregation", body: "Send a bulk SMS invite, drop a QR code into the bulletin, or share a link from the stage." },
];

const trustCards = [
  {
    title: "Preview, edit, approve",
    body: "Every sermon companion stays in staff review until you're happy with the phrasing, scripture selections, and cadence.",
    icon: <FileText className="h-6 w-6" />,
    accent: "text-brand-jade",
    accentBg: "bg-brand-jade/10",
  },
  {
    title: "Theology with edges",
    body: "You define where Zoe speaks confidently, where it offers multiple views, and where it stops and points people back to your team.",
    icon: <ShieldCheck className="h-6 w-6" />,
    accent: "text-brand-cyan",
    accentBg: "bg-brand-cyan/10",
  },
  {
    title: "Human handoff built in",
    body: "When someone says, \"I need to talk to a priest\" or raises a sensitive pastoral issue, the thread routes toward a real person instead of faking certainty.",
    icon: <Hand className="h-6 w-6" />,
    accent: "text-amber-600",
    accentBg: "bg-amber-50",
  },
];

const extraFeatures = [
  { title: "Liturgical Season Engine", body: "Lent, Advent, Holy Week, feast days. Zoe adapts the weekday plan to the actual season your church is in.", icon: <Calendar className="h-5 w-5 text-brand-jade" /> },
  { title: "Pastoral Hand-Raise Layer", body: "A simple path for \"I need to talk to a priest,\" \"I want to join RCIA,\" or \"Can someone follow up with me?\"", icon: <Hand className="h-5 w-5 text-amber-600" /> },
  { title: "Sermon Feedback Loop", body: "An anonymized brief back to the pastor with what landed, what confused people, and what they actually tried this week.", icon: <BarChart3 className="h-5 w-5 text-brand-cyan" /> },
];

const privacyPillars = [
  { title: "Private by default", body: "Leaders don't read members' personal threads. The default posture is private, not pastoral surveillance.", icon: <Lock className="h-5 w-5 text-brand-jade" /> },
  { title: "Anonymized church insight", body: "Pastors see patterns, not confessions. Feedback and trends stay aggregated unless someone explicitly asks for follow-up.", icon: <BarChart3 className="h-5 w-5 text-brand-cyan" /> },
  { title: "Consent controls", body: "Members opt into prayer distribution, optional sharing, and any deeper support workflow. Nothing sneaks past consent.", icon: <Settings className="h-5 w-5 text-zinc-700" /> },
  { title: "Clear records and auditability", body: "Sensitive actions are logged. Export and delete rights stay available. Staff access stays accountable.", icon: <FileText className="h-5 w-5 text-zinc-700" /> },
];

const faqs = [
  { question: "How long does setup actually take?", answer: "About 15 minutes to get the basics in place. The theology profile, staff deferral rules, one sermon upload, and a sandbox pass are enough to start. Most churches can launch a pilot the same week." },
  { question: "Can our staff approve what goes out before members see it?", answer: "Yes. The sermon companion isn't auto-send and hope for the best. Your staff can preview, edit, and approve the full Mon–Fri plan first." },
  { question: "What happens if someone asks a hard theology question?", answer: "That's exactly what the theological profile and trust sandbox are for. You can test difficult questions before launch, tighten the rules, and define topics where Zoe should defer to clergy instead of improvising." },
  { question: "Will pastors or staff read private conversations?", answer: "Not by default. Church dashboards are built around aggregated insight, anonymized sermon feedback, and explicit hand-raises from members who want follow-up." },
  { question: "How does Prayer Circle stay private?", answer: "Requests are privacy-scrubbed before distribution, anonymous by default, and sent only to the audience you choose. A prayer team-only mode works just as well as a church-wide opt-in circle." },
  { question: "Do members need an app or a login?", answer: "No. Zoe lives in text messages. That matters because the people you're trying to reach on Tuesday afternoon aren't looking for another church app." },
  { question: "Is this trying to replace pastoral staff?", answer: "No. The whole point is to extend Sunday into the week, not replace a priest, pastor, or small group leader. Zoe handles steady weekday follow-through and routes important human moments back to your team." },
];

export default function ChurchesPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setSubmitError(null);
    const payload = { name, phone, email, source: "churches-waitlist", submittedAt: new Date().toISOString() };
    try { localStorage.setItem("zoe_waitlist_church", JSON.stringify(payload)); } catch {}
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) throw new Error(data?.details || data?.error || "Unable to submit church waitlist request");
      setStatus("sent");
    } catch {
      setStatus("idle");
      setSubmitError("We couldn't submit your request right now. Please try again in a moment.");
    }
  };

  return (
    <div className="min-h-screen text-zinc-900 selection:bg-brand-jade/20">
      <main className="relative z-10 overflow-hidden font-sans">

        {/* ━━━ HERO ━━━ */}
        {/* ━━━ HERO ━━━ */}
        <section className="relative w-full overflow-hidden bg-[#0f1f1a] pt-32 pb-48 md:pt-40 md:pb-64 border-b border-white/10">
          <Image src={communityBg} alt="Church Community Background" fill className="object-cover opacity-25 mix-blend-luminosity" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f1a] via-[#0f1f1a]/80 to-[#0f1f1a]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-jade/20 via-transparent to-transparent opacity-70" />

          <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col items-center text-center">
            <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl flex flex-col items-center">
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-jade/30 bg-brand-jade/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-jade shadow-sm backdrop-blur-md">
                  For pastors, priests, and church teams
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-8 max-w-4xl text-[3.25rem] font-bold leading-[1.05] tracking-tighter-editorial text-white md:text-[5rem] lg:text-[5.5rem] drop-shadow-lg"
              >
                Your church&apos;s weekday
                <br />
                <span className="text-brand-jade">discipleship layer.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300 md:text-2xl drop-shadow">
                Sunday can hit hard. Then Monday shows up with work, school drop-off, hospital visits, bills, and
                a hundred other things. Zoe closes that gap with daily texts shaped by what your
                church actually taught.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center justify-center w-full sm:w-auto">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-jade px-10 py-4 text-base font-bold text-zinc-900 shadow-[0_0_40px_rgba(0,194,146,0.3)] transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-[0_0_60px_rgba(0,194,146,0.4)]"
                >
                  Join the church waitlist
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base font-semibold text-white backdrop-blur-md shadow-sm transition-colors hover:bg-white/10 hover:border-white/30"
                >
                  See Zoe for individuals
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm backdrop-blur-md">Staff preview before send</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm backdrop-blur-md">No app for members</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm backdrop-blur-md">Human handoff when it matters</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Hero Dashboard Preview OVERLAPPING */}
        <div className="relative z-20 mx-auto w-full max-w-6xl px-4 -mt-24 md:-mt-48 mb-24 md:mb-32">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="rounded-[2.5rem] border border-white/20 bg-white/95 p-6 shadow-[0_45px_150px_-30px_rgba(0,194,146,0.25)] backdrop-blur-2xl md:p-10">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">This week at St. Mark</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">Sunday sermon companion</p>
              </div>
              <div className="rounded-full bg-brand-jade/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-jade">
                Ready to review
              </div>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
              <div className="space-y-6">
                <div className="rounded-3xl bg-[#0f1f1a] p-8 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-jade/10 rounded-full blur-[80px] -mr-20 -mt-20" />
                  <div className="flex items-center justify-between text-base relative z-10">
                    <span className="font-bold text-xl">The kingdom is closer than you think</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-200 backdrop-blur-sm">Mon–Fri draft</span>
                  </div>
                  <div className="mt-8 space-y-4 relative z-10">
                    {["Mon: name the pressure point", "Tue: one scripture, one question", "Wed: a practice for the commute home", "Thu: prayer circle follow-up", "Fri: one concrete next step"].map((item) => (
                      <div key={item} className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/5 px-5 py-4 transition hover:bg-white/10">
                        <CheckCircle className="h-5 w-5 shrink-0 text-brand-jade" />
                        <span className="text-base font-medium text-zinc-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-brand-jade/30">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Theology profile</p>
                    <p className="mt-3 text-xl font-bold tracking-tight text-zinc-900">Catholic</p>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-600">Sacramental questions defer to clergy. Prayer language stays grounded and direct.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-amber-400/50">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Prayer circle</p>
                    <p className="mt-3 text-xl font-bold tracking-tight text-zinc-900">12 people prayed today</p>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-600">Anonymous by default. Pastor chooses prayer team only or wider church opt-in.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200/60 bg-[#F8FBFA] p-6 shadow-inner flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,194,146,0.05),transparent_60%)] pointer-events-none" />
                <div className="mx-auto max-w-[20rem] relative z-10">
                  <SmsAnimation />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute -bottom-8 left-12 max-w-[22rem] z-30">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100/50 shadow-sm"><QrCode className="h-6 w-6" /></div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Launch kit</p>
                  <p className="text-base font-bold text-zinc-900">Bulk SMS + QR + invite link</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ━━━ THE PROBLEM (dark section) ━━━ */}
        <section className="relative overflow-hidden bg-[#0f1f1a] px-6 py-32 text-white md:py-48 border-b border-white/5">
          <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-brand-jade/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="mx-auto max-w-6xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl">
              <p className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 shadow-sm backdrop-blur">
                The Reality
              </p>
              <h2 className="text-4xl font-bold tracking-tighter-editorial text-white md:text-5xl lg:text-[4.5rem] leading-[1.08] drop-shadow-md">
                Sunday inspires.
                <br />
                Monday reality hits.
              </h2>
              <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-zinc-300">
                Most churches don&apos;t have a sermon problem. They have a follow-through problem. People leave with
                good intentions, then life gets loud again. Zoe gives the sermon somewhere to keep working after the
                parking lot empties.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20 grid gap-6 md:grid-cols-3">
              {[
                { title: "Sunday afternoon", body: "People mean it. They took notes. They felt convicted. They want to carry it into the week." },
                { title: "Tuesday afternoon", body: "Work fires, family pressure, hospital waiting rooms, and bad news start crowding the sermon out." },
                { title: "By Friday", body: "What sticks is whatever kept showing up. Zoe keeps showing up with small, clear next steps tied back to Sunday." },
              ].map((card) => (
                <motion.div key={card.title} variants={fadeUp} className="group relative rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-[2rem]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-5 group-hover:text-brand-jade transition-colors">{card.title}</p>
                  <p className="text-2xl font-bold text-white leading-snug tracking-tight relative z-10">{card.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ FIVE PILLARS ━━━ */}
        <section className="relative bg-[#FCFAF8] px-6 py-32 md:py-48">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,146,0.03),transparent_60%)] pointer-events-none" />
          
          <div className="mx-auto max-w-6xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-jade/30 bg-brand-jade/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-jade shadow-sm">
                Five Pillars
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tighter-editorial text-zinc-900 md:text-5xl lg:text-[4rem] leading-[1.05]">
                Built for the church week, not just the church service.
              </h2>
              <p className="mt-8 text-xl font-medium leading-relaxed text-zinc-600 max-w-2xl mx-auto">
                These are the pieces that make Zoe feel like a real weekday ministry layer instead of another thing
                your team has to babysit.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20 grid gap-8 lg:grid-cols-6">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className={clsx(
                    "group relative overflow-hidden rounded-[2.5rem] border border-zinc-200/60 bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]",
                    pillar.layout,
                  )}
                >
                  <div className={clsx("absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none", pillar.accentBg)} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={clsx("flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm", pillar.accentBg, pillar.accent)}>
                      {pillar.icon}
                    </div>
                    <p className="mt-8 text-xs font-bold uppercase tracking-widest text-zinc-500">{pillar.eyebrow}</p>
                    <h3 className="mt-3 text-3xl font-bold text-zinc-900 tracking-tight">{pillar.title}</h3>
                    <p className="mt-5 text-lg font-medium leading-relaxed text-zinc-600">{pillar.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ HOW IT WORKS ━━━ */}
        <section className="relative bg-white px-6 py-32 md:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,194,146,0.03),transparent_70%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-cyan shadow-sm">
                How it works
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tighter-editorial text-zinc-900 md:text-5xl lg:text-[4rem] leading-[1.05]">About 15 minutes to first launch.</h2>
              <p className="mt-8 text-xl font-medium leading-relaxed text-zinc-600">
                The setup is short because it has to be. You shouldn&apos;t need a week of training to get one sermon into
                people&apos;s hands on Monday.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-20 grid gap-6 md:grid-cols-5 relative">
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand-jade/0 via-brand-cyan/20 to-amber-600/0 z-0" />
              {setupSteps.map((step, i) => (
                <motion.div key={step.step} variants={fadeUp} className="relative z-10 group rounded-[2rem] border border-zinc-100 bg-white p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                  <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg mb-6 shadow-sm border transition-colors group-hover:scale-110 duration-300", i === 0 ? "bg-brand-jade/5 text-brand-jade border-brand-jade/20 group-hover:bg-brand-jade/10" : i === 1 ? "bg-brand-cyan/5 text-brand-cyan border-brand-cyan/20 group-hover:bg-brand-cyan/10" : i === 2 ? "bg-zinc-50 text-zinc-900 border-zinc-200 group-hover:bg-zinc-100" : i === 3 ? "bg-amber-50/50 text-amber-600 border-amber-200 group-hover:bg-amber-50" : "bg-brand-jade/5 text-brand-jade border-brand-jade/20 group-hover:bg-brand-jade/10")}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">{step.title}</h3>
                  <p className="mt-4 text-base font-medium leading-relaxed text-zinc-500">{step.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ TRUST & CONTROL ━━━ */}
        <section className="bg-zinc-50 px-6 py-32 md:py-48 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[radial-gradient(ellipse_at_top_right,rgba(0,194,146,0.05),transparent_60%)] pointer-events-none" />
          
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-jade/30 bg-brand-jade/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-jade shadow-sm">
                Trust &amp; Control
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tighter-editorial text-zinc-900 md:text-5xl lg:text-[4.5rem] leading-[1.05]">
                You don&apos;t have to trust a black box.
              </h2>
              <p className="mt-8 text-xl font-medium leading-relaxed text-zinc-600">
                The point isn&apos;t to hand your weekday ministry to a mystery tool. It&apos;s to make your church&apos;s voice
                show up more consistently, with guardrails your team can actually inspect.
              </p>

              <div className="mt-12 rounded-[2rem] border border-zinc-200/60 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-jade/5 rounded-full blur-[40px] group-hover:bg-brand-jade/10 transition-colors duration-500 pointer-events-none" />
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">What pastors usually want to know</p>
                <div className="space-y-6">
                  {[
                    "Can we see exactly what Zoe would say before launch? Yes. That's the sandbox.",
                    "Can clergy define the line between helpful guidance and pastoral care? Yes. That's part of the profile.",
                    "Can members ask for a real person? Yes. The hand-raise path is built in from day one.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-jade/10 text-brand-jade mt-0.5"><CheckCircle className="h-4 w-4" /></div>
                      <p className="text-lg font-medium leading-relaxed text-zinc-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6">
              {trustCards.map((card) => (
                <motion.div key={card.title} variants={fadeUp} className="group flex flex-col sm:flex-row gap-8 rounded-[2rem] border border-zinc-200/60 bg-white p-8 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <div className={clsx("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110", card.accentBg, card.accent)}>{card.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{card.title}</h3>
                    <p className="mt-4 text-lg font-medium leading-relaxed text-zinc-600">{card.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ PRAYER CIRCLE ━━━ */}
        <section className="relative overflow-hidden bg-[#FCFAF8] px-6 py-32 md:py-48">
          <div className="absolute left-1/2 top-1/2 min-w-[50rem] min-h-[50rem] w-[80vw] h-[80vw] max-w-[80rem] max-h-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 shadow-sm backdrop-blur">
                <Heart className="h-4 w-4" />
                Prayer Circle
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tighter-editorial text-zinc-900 md:text-5xl lg:text-[4.5rem] leading-[1.05]">
                Your church showed up for you.
              </h2>
              <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-zinc-600">
                Someone shares a burden. Your church quietly carries it with them. Then the member gets a simple text back saying real people prayed today.
              </p>
              <div className="mt-12 rounded-[2rem] border border-amber-200/60 bg-white/60 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600">What the member sees</p>
                <p className="mt-6 text-3xl font-bold leading-tight text-zinc-900 tracking-tight">
                  &ldquo;12 people from your church prayed for this today.&rdquo;
                </p>
                <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-600">
                  No performance. No public thread. Just a clear, human sign that the church didn&apos;t leave them alone.
                </p>
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6">
              <motion.div variants={fadeUp} className="rounded-[2rem] border border-zinc-200/60 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Anonymous request</p>
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-700">scrubbed</span>
                </div>
                <p className="mt-8 rounded-2xl bg-[#FCFAF8] border border-zinc-100 px-6 py-6 text-xl font-medium leading-relaxed text-zinc-700 shadow-inner">
                  &ldquo;Please pray for a medical appointment this week. I&apos;m scared and could use peace.&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-brand-jade/10 border border-brand-jade/20 px-6 py-5 text-base font-bold text-brand-jade">
                  <Send className="h-5 w-5" />
                  Sent to prayer team and opted-in members
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-3">
                {[
                  { title: "Privacy-scrubbed", body: "Identifying details stay out unless they opt in." },
                  { title: "Pastor-controlled", body: "Prayer team only or wider congregation. Your call." },
                  { title: "Anonymous by default", body: "People can share more if they want to." },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-zinc-200/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-bold text-zinc-900">{item.title}</h3>
                    <p className="mt-3 text-base font-medium leading-relaxed text-zinc-500">{item.body}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ━━━ DASHBOARD ━━━ */}
        <section className="relative overflow-hidden border-t border-white/5 bg-[#0f1f1a] px-6 py-32 text-white md:py-48 border-b">
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-brand-jade/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_0.92fr] lg:items-center relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-2xl shadow-[0_35px_70px_-35px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-jade mb-1">Dashboard mockup</p>
                    <p className="text-2xl font-bold text-white tracking-tight">Church dashboard</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-zinc-200 backdrop-blur-md">This week</span>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {[
                    { label: "Companion approved", value: "1 of 1" },
                    { label: "Prayer circle sends", value: "43" },
                    { label: "Hand-raises", value: "6" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:bg-white/10 transition">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{stat.label}</p>
                      <p className="mt-3 text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition">
                    <p className="text-base font-bold text-white">Sermon feedback brief</p>
                    <div className="mt-6 space-y-5">
                      {[
                        { label: "Main idea remembered", value: "82%", width: "w-[82%]", tone: "bg-brand-jade shadow-[0_0_15px_rgba(0,194,146,0.5)]" },
                        { label: "People tried one next step", value: "61%", width: "w-[61%]", tone: "bg-brand-cyan shadow-[0_0_15px_rgba(0,184,217,0.5)]" },
                        { label: "Questions needing staff follow-up", value: "14%", width: "w-[14%]", tone: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]" },
                      ].map((row) => (
                        <div key={row.label}>
                          <div className="flex items-center justify-between text-sm text-zinc-300 font-medium mb-2">
                            <span>{row.label}</span>
                            <span className="font-bold text-white">{row.value}</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                            <div className={clsx("h-full rounded-full transition-all duration-1000", row.tone, row.width)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { title: "Theology profile", body: "Anglican profile active. Sacraments defer to clergy. Marriage & crisis route to staff." },
                      { title: "Launch kit", body: "1 bulk SMS draft, 2 QR codes, bulletin copy, and a branded link ready." },
                      { title: "Hand-raise queue", body: "2 requests to talk to a priest, 1 RCIA interest, 3 pastoral care." },
                    ].map((card) => (
                      <div key={card.title} className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:bg-white/10 transition">
                        <p className="text-sm font-bold text-white">{card.title}</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-400">{card.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-brand-jade font-bold tracking-widest uppercase text-xs mb-6 inline-flex items-center gap-2 rounded-full border border-brand-jade/30 bg-brand-jade/10 px-4 py-1.5 shadow-sm backdrop-blur">What the church sees</p>
              <h2 className="text-4xl font-bold tracking-tighter-editorial text-white md:text-5xl lg:text-[4rem] leading-[1.05] drop-shadow-md">
                Clear signals, not dashboard noise.
              </h2>
              <p className="mt-8 text-xl font-medium leading-relaxed text-zinc-300">
                The reporting side helps a pastor, priest, or ministry team make better calls. It should feel like a useful weekly brief, not an admin console.
              </p>

              <ul className="mt-10 space-y-6">
                {[
                  "See the sermon companion before it goes out and approve it with one click.",
                  "Track anonymized engagement so you know if the message actually stayed with people.",
                  "Catch hand-raises that need pastoral follow-up before they get lost in the week.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-brand-jade" />
                    <span className="text-lg font-medium leading-relaxed text-zinc-200">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 grid gap-5">
                {extraFeatures.map((feature) => (
                  <div key={feature.title} className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10 hover:border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 shadow-sm transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                        <p className="mt-1.5 text-sm font-medium leading-relaxed text-zinc-400">{feature.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ━━━ PRIVACY ━━━ */}
        <section className="relative bg-white px-6 py-32 md:py-48">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,194,146,0.03),transparent_45%)] pointer-events-none" />
          <div className="mx-auto max-w-6xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mb-16 max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-jade/30 bg-brand-jade/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-jade shadow-sm">
                Trust &amp; Privacy
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tighter-editorial text-zinc-900 md:text-5xl lg:text-[4rem] leading-[1.05]">
                Pastoral visibility without surveillance.
              </h2>
              <p className="mt-8 text-xl font-medium leading-relaxed text-zinc-600">
                Church leaders need enough signal to care well. They don&apos;t need a back door into private conversations.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2">
              {privacyPillars.map((pillar) => (
                <motion.div key={pillar.title} variants={fadeUp} className="group rounded-[2rem] border border-zinc-100 bg-[#F8FBFA] p-8 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center rounded-2xl border border-zinc-200/60 bg-white p-4 shadow-sm transition-transform duration-300 group-hover:scale-110">{pillar.icon}</div>
                  <h3 className="mt-8 text-2xl font-bold text-zinc-900 tracking-tight">{pillar.title}</h3>
                  <p className="mt-4 text-base font-medium leading-relaxed text-zinc-600">{pillar.body}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-16 text-center border-t border-zinc-200/60 pt-16">
              <p className="text-zinc-500 font-medium mb-8 max-w-2xl mx-auto text-lg">Zoe is a closed, secure loop. We never sell your data, and we never use personal moments to train public models.</p>
              <a href="/privacy" className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm text-zinc-600 px-8 py-4 font-bold hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-300">
                Read Full Privacy Policy
              </a>
            </motion.div>
          </div>
        </section>

        {/* ━━━ FAQ ━━━ */}
        <section className="border-t border-zinc-200/60 bg-[#FCFAF8] px-6 py-32 md:py-48">
          <div className="mx-auto max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mb-16 max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-cyan shadow-sm">
                FAQs
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tighter-editorial text-zinc-900 md:text-5xl lg:text-[4rem] leading-[1.05]">You&apos;ve got questions. We get it.</h2>
              <p className="mt-6 text-xl text-zinc-500 font-medium italic">(We&apos;d be worried if you didn&apos;t have any.)</p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-6">
              {faqs.map((faq, index) => (
                <motion.div key={faq.question} variants={fadeUp} className="group overflow-hidden rounded-[2rem] border border-zinc-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition hover:shadow-[0_10px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5">
                  <div className="w-full text-left p-8 md:p-10 pb-4 md:pb-6">
                    <span className="font-bold text-2xl text-brand-cyan tracking-tight">{faq.question}</span>
                  </div>
                  <div className="px-8 md:px-10 pb-8 md:pb-10 pt-0">
                    <p className="text-zinc-600 leading-relaxed font-medium text-lg">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ━━━ WAITLIST ━━━ */}
        <section ref={undefined} id="waitlist" className="border-t border-zinc-200/60 bg-white px-4 py-32 md:py-48">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[3rem] border border-zinc-100 bg-white p-8 md:p-16 shadow-[0_20px_80px_rgba(0,194,146,0.05)]"
            >
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-jade/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-cyan/5 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-jade/30 bg-brand-jade/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-jade shadow-sm">
                    Church Waitlist
                  </div>
                  <h2 className="mt-8 text-4xl font-bold tracking-tighter-editorial text-zinc-900 md:text-5xl leading-[1.05]">
                    Ready to close the Sunday-to-Monday gap?
                  </h2>
                  <p className="mt-8 text-xl font-medium leading-relaxed text-zinc-600">
                    We&apos;re working with a small group of churches first. Join the waitlist and we&apos;ll reach out when a pilot slot opens.
                  </p>
                  <div className="mt-10 rounded-2xl border border-zinc-100 bg-[#FCFAF8] p-6 shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Best fit right now</p>
                    <p className="mt-4 text-base font-medium leading-relaxed text-zinc-600">
                      Churches that want weekday follow-through from Sunday teaching, pastoral routing when needed, and
                      a launch path that doesn&apos;t require members to learn new software.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-100 bg-white p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-20">
                  {status === "sent" ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center px-4 py-12 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-jade/10 mb-2">
                        <CheckCircle className="h-10 w-10 text-brand-jade" />
                      </div>
                      <h3 className="mt-6 text-3xl font-bold text-zinc-900">You&apos;re on the list.</h3>
                      <p className="mt-4 max-w-md text-lg font-medium leading-relaxed text-zinc-600">
                        We&apos;ve got your info. We&apos;ll reach out when a church pilot slot opens.
                      </p>
                    </motion.div>
                  ) : (
                    <form className="flex flex-col gap-5 max-w-md mx-auto" onSubmit={handleWaitlistSubmit}>
                      <input type="hidden" name="source" value="churches-waitlist" />
                      <input required type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name / church name" className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-jade/50 focus:border-brand-jade/50 transition-all shadow-inner" />
                      <input required type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-jade/50 focus:border-brand-jade/50 transition-all shadow-inner" />
                      <input required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-base font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-jade/50 focus:border-brand-jade/50 transition-all shadow-inner" />
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={clsx(
                          "mt-2 px-6 py-4 text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 text-zinc-900 shadow-xl rounded-xl",
                          status === "submitting" ? "bg-zinc-300 text-zinc-500 shadow-none" : "bg-brand-jade hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(0,194,146,0.3)]",
                        )}
                      >
                        {status === "submitting" ? (
                          <div className="h-6 w-6 rounded-full border-2 border-zinc-600/30 border-t-slate-600 animate-spin" />
                        ) : "Join the Church Waitlist"}
                      </button>
                      {submitError ? <p className="text-center text-sm font-medium text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">{submitError}</p> : null}
                      <p className="mt-4 text-xs font-medium leading-relaxed text-zinc-400 text-center">
                        By joining, you consent to receive recurring automated SMS messages from Zoe by Freedomology at the phone number provided. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help.{" "}
                        <br />
                        <a href="/privacy" className="underline hover:text-zinc-600 transition-colors">Privacy Policy</a>{" · "}
                        <a href="/terms" className="underline hover:text-zinc-600 transition-colors">Terms of Service</a>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ━━━ CROSS-LINK ━━━ */}
        <section className="bg-[#0f1f1a] px-6 py-12 text-white border-t border-white/5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-center md:flex-row md:text-left backdrop-blur-xl transition hover:bg-white/10 hover:border-white/20">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-jade">For individuals</p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight">Not leading a church? Zoe also works one person at a time.</h3>
              <p className="mt-3 max-w-2xl text-lg font-medium text-zinc-400">
                The individual product keeps the same text-first experience for daily reflection, follow-through, and gentle accountability.
              </p>
            </div>
            <a href="/" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-zinc-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
              Explore Zoe for individuals
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
