"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

const pillars = [
  {
    title: "Sermon Companion",
    eyebrow: "Sunday to Friday, tied to one sermon",
    body: "Upload a sermon, transcript, or notes. Zoe turns it into a Mon-Fri formation plan with reflection, scripture, and a concrete next step. Staff can preview, edit, and approve before anything sends.",
    icon: <Mic className="h-6 w-6" />,
    iconWrap: "bg-vibrant-cyan/10 text-vibrant-cyan",
    borderGlow: "from-vibrant-cyan/30 via-vibrant-cyan/10 to-transparent",
    layout: "lg:col-span-3",
  },
  {
    title: "Church Theological Profile",
    eyebrow: "A guided wizard, not a blank textbox",
    body: "Pick your tradition, answer theology questions, set guardrails, and define when Zoe should defer to a priest, pastor, or staff member.",
    icon: <BookOpen className="h-6 w-6" />,
    iconWrap: "bg-vibrant-jade/10 text-vibrant-jade",
    borderGlow: "from-vibrant-jade/30 via-vibrant-jade/10 to-transparent",
    layout: "lg:col-span-3",
  },
  {
    title: "Trust Sandbox",
    eyebrow: "Ask the hard questions before launch",
    body: "Clergy can pressure-test Zoe with real edge cases and see the exact response before a single member joins.",
    icon: <Eye className="h-6 w-6" />,
    iconWrap: "bg-slate-900/5 text-slate-900",
    borderGlow: "from-slate-300 via-slate-200 to-transparent",
    layout: "lg:col-span-2",
  },
  {
    title: "Church Prayer Circle",
    eyebrow: "Your church showed up for you",
    body: "Opt-in prayer requests are privacy-scrubbed, sent to the audience you choose, and reported back with simple human proof: people from your church prayed today.",
    icon: <Heart className="h-6 w-6" />,
    iconWrap: "bg-rose-500/10 text-rose-500",
    borderGlow: "from-rose-300 via-rose-100 to-transparent",
    layout: "lg:col-span-2",
  },
  {
    title: "Congregation Launch Kit",
    eyebrow: "Three clean entry paths",
    body: "Launch with bulk SMS, QR codes or invite links, and an organic fallback for anyone who hears about Zoe from a friend or the bulletin.",
    icon: <QrCode className="h-6 w-6" />,
    iconWrap: "bg-amber-500/10 text-amber-600",
    borderGlow: "from-amber-300 via-amber-100 to-transparent",
    layout: "lg:col-span-2",
  },
];

const setupSteps = [
  {
    step: "01",
    title: "Choose your tradition",
    body: "Catholic, Baptist, Anglican, non-denom, Pentecostal. Start there, then answer the real theology questions that shape the tone.",
    accent: "text-vibrant-cyan",
  },
  {
    step: "02",
    title: "Set your guardrails",
    body: "Mark sensitive topics, write your deferral rules, and tell Zoe when to hand something to clergy or staff.",
    accent: "text-vibrant-jade",
  },
  {
    step: "03",
    title: "Upload this Sunday's sermon",
    body: "Use notes, transcript, or audio. Zoe drafts the weekday companion and your team can tighten it up before approval.",
    accent: "text-slate-900",
  },
  {
    step: "04",
    title: "Run the sandbox",
    body: "Ask the questions you'd actually worry about. See the answer exactly as a member would see it, then adjust until it feels right.",
    accent: "text-rose-500",
  },
  {
    step: "05",
    title: "Launch your congregation",
    body: "Send a bulk SMS invite, drop a QR code into the bulletin, or share a link from the stage. People join however your church already communicates.",
    accent: "text-amber-600",
  },
];

const trustCards = [
  {
    title: "Preview, edit, approve",
    body: "Every sermon companion stays in staff review until you are happy with the phrasing, scripture selections, and cadence.",
    icon: <FileText className="h-6 w-6" />,
    iconWrap: "bg-vibrant-cyan/10 text-vibrant-cyan",
  },
  {
    title: "Theology with edges",
    body: "You can define where Zoe speaks confidently, where it offers multiple views, and where it stops and points people back to your team.",
    icon: <ShieldCheck className="h-6 w-6" />,
    iconWrap: "bg-vibrant-jade/10 text-vibrant-jade",
  },
  {
    title: "Human handoff built in",
    body: "When someone says, \"I need to talk to a priest\" or raises a sensitive pastoral issue, the thread routes toward a real person instead of faking certainty.",
    icon: <Hand className="h-6 w-6" />,
    iconWrap: "bg-rose-500/10 text-rose-500",
  },
];

const extraFeatures = [
  {
    title: "Liturgical Season Engine",
    body: "Lent, Advent, Holy Week, feast days. Zoe adapts the weekday plan to the actual season your church is in.",
    icon: <Calendar className="h-5 w-5 text-vibrant-cyan" />,
  },
  {
    title: "Pastoral Hand-Raise Layer",
    body: "A simple path for, \"I need to talk to a priest,\" \"I want to join RCIA,\" or \"Can someone follow up with me?\"",
    icon: <Hand className="h-5 w-5 text-rose-500" />,
  },
  {
    title: "Sermon Feedback Loop",
    body: "An anonymized brief back to the pastor with what landed, what confused people, and what they actually tried this week.",
    icon: <BarChart3 className="h-5 w-5 text-vibrant-jade" />,
  },
];

const privacyPillars = [
  {
    title: "Private by default",
    body: "Leaders do not read members' personal threads. The default posture is private, not pastor surveillance.",
    icon: <Lock className="h-5 w-5 text-vibrant-jade" />,
  },
  {
    title: "Anonymized church insight",
    body: "Pastors see patterns, not confessions. Feedback and trends stay aggregated unless someone explicitly asks for follow-up.",
    icon: <BarChart3 className="h-5 w-5 text-vibrant-cyan" />,
  },
  {
    title: "Consent controls",
    body: "Members opt into prayer distribution, optional sharing, and any deeper support workflow. Nothing sneaks past consent.",
    icon: <Settings className="h-5 w-5 text-slate-700" />,
  },
  {
    title: "Clear records and auditability",
    body: "Sensitive actions are logged. Export and delete rights stay available. Staff access stays accountable.",
    icon: <FileText className="h-5 w-5 text-slate-700" />,
  },
];

const faqs = [
  {
    question: "How long does setup actually take?",
    answer: "About 15 minutes to get the basics in place. The theology profile, staff deferral rules, one sermon upload, and a sandbox pass are enough to start. Most churches can launch a pilot the same week.",
  },
  {
    question: "Can our staff approve what goes out before members see it?",
    answer: "Yes. The sermon companion is not auto-send and hope for the best. Your staff can preview, edit, and approve the full Mon-Fri plan first.",
  },
  {
    question: "What happens if someone asks a hard theology question?",
    answer: "That is exactly what the theological profile and trust sandbox are for. You can test difficult questions before launch, tighten the rules, and define topics where Zoe should defer to clergy instead of improvising.",
  },
  {
    question: "Will pastors or staff read private conversations?",
    answer: "Not by default. Church dashboards are built around aggregated insight, anonymized sermon feedback, and explicit hand-raises from members who want follow-up.",
  },
  {
    question: "How does Prayer Circle stay private?",
    answer: "Requests are privacy-scrubbed before distribution, anonymous by default, and sent only to the audience you choose. A prayer team-only mode works just as well as a church-wide opt-in circle.",
  },
  {
    question: "Do members need an app or a login?",
    answer: "No. Zoe lives in text messages. That matters because the people you are trying to reach on Tuesday afternoon are not looking for another church app.",
  },
  {
    question: "Is this trying to replace pastoral staff?",
    answer: "No. The whole point is to extend Sunday into the week, not replace a priest, pastor, or small group leader. Zoe handles steady weekday follow-through and routes important human moments back to your team.",
  },
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

    const payload = {
      name,
      phone,
      email,
      source: "churches-waitlist",
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("zoe_waitlist_church", JSON.stringify(payload));
    } catch (storageError) {
      console.warn("Unable to store waitlist submission locally", storageError);
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        throw new Error(data?.details || data?.error || "Unable to submit church waitlist request");
      }

      setStatus("sent");
    } catch (error) {
      console.warn("Unable to submit waitlist", error);
      setStatus("idle");
      setSubmitError("We couldn't submit your request right now. Please try again in a moment.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20">
      <main className="relative z-10 overflow-hidden font-sans">
        <section className="relative px-6 pb-24 pt-28 md:pb-28 md:pt-36">
          <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_48%)] pointer-events-none" />
          <div className="absolute right-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-vibrant-jade/10 blur-[120px] pointer-events-none" />
          <div className="absolute left-[-8rem] top-40 h-[24rem] w-[24rem] rounded-full bg-vibrant-cyan/10 blur-[110px] pointer-events-none" />

          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
              <motion.div variants={fadeUp}>
                <div className="inline-flex items-center gap-3 rounded-full border border-vibrant-cyan/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#008ba3] shadow-sm backdrop-blur">
                  For pastors, priests, and church teams
                </div>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-8 max-w-4xl text-[2.85rem] font-extrabold leading-[1.02] tracking-tight text-slate-900 md:text-[4.7rem] lg:text-[5.35rem]"
              >
                Your church&apos;s weekday
                <br />
                <span className="bg-gradient-to-r from-vibrant-cyan to-vibrant-jade bg-clip-text text-transparent">
                  discipleship layer.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-slate-600 md:text-xl"
              >
                Sunday can hit hard. Then Monday shows up with work, school drop-off, hospital visits, bills, and
                a hundred other things. Zoe closes that Sunday-to-Monday gap with daily texts shaped by what your
                church actually taught.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-vibrant-cyan to-vibrant-jade px-8 py-4 text-sm font-bold text-slate-900 shadow-[0_20px_50px_-20px_rgba(0,194,146,0.65)] transition-transform hover:scale-[1.02]"
                >
                  Join the church waitlist
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  See Zoe for individuals
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 max-w-2xl rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                    <Quote className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold leading-relaxed text-slate-900 md:text-xl">
                      &quot;Take my sermon and help my people live it this week.&quot;
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                      That&apos;s the whole pitch. Keep Sunday&apos;s teaching alive when real life starts pressing on it.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500"
              >
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  Staff preview before send
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  No app for members
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  Human handoff when it matters
                </span>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative mx-auto w-full max-w-[36rem]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-vibrant-cyan/20 via-white to-vibrant-jade/20 blur-2xl" />
              <div className="relative rounded-[2.5rem] border border-white/80 bg-white/85 p-5 shadow-[0_35px_120px_-45px_rgba(15,23,42,0.5)] backdrop-blur md:p-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">This week at St. Mark</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">Sunday sermon companion</p>
                  </div>
                  <div className="rounded-full bg-vibrant-jade/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-vibrant-jade">
                    Ready to review
                  </div>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_19rem]">
                  <div className="space-y-4">
                    <div className="rounded-[1.75rem] bg-slate-900 p-5 text-white">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">The kingdom is closer than you think</span>
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-200">
                          Mon-Fri draft
                        </span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {[
                          "Mon: name the pressure point",
                          "Tue: one scripture, one question",
                          "Wed: a practice for the commute home",
                          "Thu: prayer circle follow-up",
                          "Fri: one concrete next step",
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2.5">
                            <CheckCircle className="h-4 w-4 shrink-0 text-vibrant-jade" />
                            <span className="text-sm text-slate-100">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Theology profile</p>
                        <p className="mt-2 text-base font-bold text-slate-900">Catholic</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                          Sacramental questions defer to clergy. Prayer language stays grounded and direct.
                        </p>
                      </div>
                      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Prayer circle</p>
                        <p className="mt-2 text-base font-bold text-slate-900">12 people prayed today</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                          Anonymous by default. Pastor chooses prayer team only or wider church opt-in.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-slate-100 p-3">
                    <div className="mx-auto max-w-[19rem]">
                      <SmsAnimation />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-5 max-w-[16rem] rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Launch kit</p>
                    <p className="text-sm font-semibold text-slate-900">Bulk SMS + QR + invite link</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white md:py-32">
          <div className="absolute right-[-12rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-vibrant-cyan/12 blur-[140px] pointer-events-none" />
          <div className="absolute left-[-10rem] bottom-[-10rem] h-[26rem] w-[26rem] rounded-full bg-vibrant-jade/12 blur-[130px] pointer-events-none" />

          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
                The problem
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Sunday inspires.
                <br />
                Monday reality hits.
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300">
                Most churches do not have a sermon problem. They have a follow-through problem. People leave with
                good intentions, then life gets loud again. Zoe gives the sermon somewhere to keep working after the
                parking lot empties.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-14 grid gap-5 md:grid-cols-3"
            >
              {[
                {
                  title: "Sunday afternoon",
                  body: "People mean it. They took notes. They felt convicted. They want to carry it into the week.",
                },
                {
                  title: "Tuesday afternoon",
                  body: "Work fires, family pressure, hospital waiting rooms, and bad news start crowding the sermon out.",
                },
                {
                  title: "By Friday",
                  body: "What sticks is whatever kept showing up. Zoe keeps showing up with small, clear next steps tied back to Sunday.",
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.8)] backdrop-blur"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{card.title}</p>
                  <p className="mt-4 text-xl font-bold text-white">{card.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-vibrant-jade/20 bg-vibrant-jade/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-vibrant-jade">
                Five pillars
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Built for the church week, not just the church service.
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                These are the pieces that make Zoe feel like a real weekday ministry layer instead of another thing
                your team has to babysit.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-16 grid gap-6 lg:grid-cols-6"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className={clsx(
                    "group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_-30px_rgba(15,23,42,0.35)]",
                    pillar.layout,
                  )}
                >
                  <div className={clsx("absolute inset-x-0 top-0 h-24 bg-gradient-to-r opacity-80", pillar.borderGlow)} />
                  <div className="relative">
                    <div className={clsx("flex h-12 w-12 items-center justify-center rounded-2xl", pillar.iconWrap)}>
                      {pillar.icon}
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{pillar.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900">{pillar.title}</h3>
                    <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">{pillar.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-vibrant-cyan/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#008ba3] shadow-sm">
                How it works
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">About 15 minutes to first launch.</h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                The setup is short because it has to be. You should not need a week of training to get one sermon into
                people&apos;s hands on Monday.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-16 grid gap-5 md:grid-cols-5"
            >
              {setupSteps.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className={clsx("text-xs font-bold uppercase tracking-[0.2em]", step.accent)}>Step {step.step}</p>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">{step.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white px-6 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-3 rounded-full border border-vibrant-cyan/20 bg-vibrant-cyan/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#008ba3]">
                Trust and control
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                You do not have to trust a black box.
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                The point is not to hand your weekday ministry to a mystery tool. It is to make your church&apos;s voice
                show up more consistently, with guardrails your team can actually inspect.
              </p>

              <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">What pastors usually want to know</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-vibrant-jade" />
                    <p className="text-sm font-medium leading-relaxed text-slate-600">
                      Can we see exactly what Zoe would say before launch? Yes. That is the sandbox.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-vibrant-jade" />
                    <p className="text-sm font-medium leading-relaxed text-slate-600">
                      Can clergy define the line between helpful guidance and pastoral care? Yes. That is part of the profile.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-vibrant-jade" />
                    <p className="text-sm font-medium leading-relaxed text-slate-600">
                      Can members ask for a real person? Yes. The hand-raise path is built in from day one.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-5"
            >
              {trustCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm"
                >
                  <div className={clsx("flex h-12 w-12 items-center justify-center rounded-2xl", card.iconWrap)}>
                    {card.icon}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">{card.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-rose-100 bg-gradient-to-br from-rose-50 via-white to-slate-50 px-6 py-24 md:py-32">
          <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-200/25 blur-[120px] pointer-events-none" />

          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-3 rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-600 shadow-sm">
                <Heart className="h-3.5 w-3.5" />
                Prayer Circle
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Your church showed up for you.
              </h2>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
                This is the most emotional part of the product for a reason. Someone shares a burden. Your church
                quietly carries it with them. Then the member gets a simple text back saying real people prayed today.
              </p>
              <div className="mt-8 rounded-[2rem] border border-rose-200 bg-white/85 p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-500">What the member sees</p>
                <p className="mt-4 text-2xl font-bold leading-tight text-slate-900">
                  &quot;12 people from your church prayed for this today.&quot;
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
                  No performance. No public thread. Just a clear, human sign that the church did not leave them alone.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-5"
            >
              <motion.div variants={fadeUp} className="rounded-[2rem] border border-rose-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Anonymous request</p>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-rose-600">
                    scrubbed
                  </span>
                </div>
                <p className="mt-5 rounded-[1.5rem] bg-slate-100 px-5 py-4 text-base font-medium leading-relaxed text-slate-700">
                  &quot;Please pray for a medical appointment this week. I&apos;m scared and could use peace.&quot;
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-[1.5rem] bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
                  <Send className="h-4 w-4" />
                  Sent to prayer team and opted-in members
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    title: "Privacy-scrubbed",
                    body: "The request is cleaned before it goes out. Identifying details stay out unless the member wants them in.",
                  },
                  {
                    title: "Pastor-controlled audience",
                    body: "Prayer team only or wider congregation. Your church chooses the right circle for each stage.",
                  },
                  {
                    title: "Anonymous by default",
                    body: "The default is care without exposure. People can share more if they want to, not because the system assumes it.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">{item.body}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-slate-100 bg-gradient-to-br from-vibrant-jade via-[#6ef1cf] to-vibrant-cyan px-6 py-24 text-slate-900 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="rounded-[2.25rem] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-[0_35px_70px_-35px_rgba(15,23,42,0.75)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Dashboard mockup</p>
                    <p className="mt-1 text-xl font-bold text-white">Church dashboard</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-200">
                    This week
                  </span>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Companion approved", value: "1 of 1" },
                    { label: "Prayer circle sends", value: "43" },
                    { label: "Hand-raises", value: "6" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white">Sermon feedback brief</p>
                    <div className="mt-4 space-y-4">
                      {[
                        { label: "Main idea remembered", value: "82%", tone: "bg-vibrant-cyan" },
                        { label: "People tried one next step", value: "61%", tone: "bg-vibrant-jade" },
                        { label: "Questions needing staff follow-up", value: "14%", tone: "bg-rose-400" },
                      ].map((row) => (
                        <div key={row.label}>
                          <div className="flex items-center justify-between text-sm text-slate-200">
                            <span>{row.label}</span>
                            <span className="font-semibold text-white">{row.value}</span>
                          </div>
                          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                            <div className={clsx("h-full rounded-full", row.tone, row.value === "82%" && "w-[82%]", row.value === "61%" && "w-[61%]", row.value === "14%" && "w-[14%]")} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold text-white">Theology profile</p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-300">
                        Anglican profile active. Sacraments defer to clergy. Marriage and crisis care route to staff.
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold text-white">Launch kit</p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-300">
                        1 bulk SMS draft, 2 QR codes, bulletin copy, and a branded invite link ready for Sunday.
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold text-white">Hand-raise queue</p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-300">
                        2 requests to talk to a priest, 1 RCIA interest, 3 pastoral care follow-ups.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-900/10 bg-white/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-900">
                What the church sees
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Clear signals, not dashboard noise.
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-800">
                The reporting side is there to help a pastor, priest, or ministry team make better calls. It should
                feel like a useful weekly brief, not an admin console.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  "See the sermon companion before it goes out and approve it with one click.",
                  "Track anonymized engagement so you know if the message actually stayed with people.",
                  "Catch hand-raises that need pastoral follow-up before they get lost in the week.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />
                    <span className="text-base font-medium leading-relaxed text-slate-800">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-4">
                {extraFeatures.map((feature) => (
                  <div key={feature.title} className="rounded-[1.75rem] border border-slate-900/10 bg-white/45 p-5 shadow-sm backdrop-blur">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/75 shadow-sm">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{feature.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative border-t border-slate-100 bg-white px-6 py-24 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.09),transparent_45%)] pointer-events-none" />
          <div className="mx-auto max-w-6xl relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mb-14 max-w-3xl text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-vibrant-cyan/20 bg-vibrant-cyan/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#008ba3]">
                Privacy pillars
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Pastoral visibility without surveillance.
              </h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                Church leaders need enough signal to care well. They do not need a hidden back door into private
                conversations.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-5 md:grid-cols-2"
            >
              {privacyPillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2.5 shadow-sm">
                    {pillar.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{pillar.title}</h3>
                  <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">{pillar.body}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500"
            >
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">No app required</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">Consent-first workflows</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">Export and delete rights</span>
              <a
                href="/privacy"
                className="rounded-full border border-vibrant-jade/30 bg-vibrant-jade/10 px-3 py-2 text-vibrant-jade transition-colors hover:bg-vibrant-jade/20"
              >
                Read privacy policy
              </a>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mb-14 max-w-3xl text-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-vibrant-cyan/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-900 shadow-sm">
                FAQ
              </div>
              <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Questions church leaders ask.</h2>
              <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                The practical stuff. The trust stuff. The rollout stuff.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  variants={fadeUp}
                  className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left transition-colors hover:bg-slate-50 sm:px-8"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="pr-4 text-lg font-bold text-slate-900">{faq.question}</span>
                    <div
                      className={clsx(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-transform duration-300",
                        openFaq === index && "rotate-180 border-vibrant-cyan/30 bg-vibrant-cyan/10",
                      )}
                    >
                      <ChevronDown
                        className={clsx(
                          "h-5 w-5 text-slate-500 transition-colors",
                          openFaq === index && "text-vibrant-cyan",
                        )}
                      />
                    </div>
                  </button>
                  {openFaq === index ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-6 pb-6 sm:px-8 sm:pb-8">
                      <p className="text-base font-medium leading-relaxed text-slate-600">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="waitlist" className="border-t border-slate-100 bg-gradient-to-br from-white via-slate-50 to-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)] md:p-12"
            >
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-vibrant-cyan/10 blur-[90px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-vibrant-jade/10 blur-[90px] pointer-events-none" />

              <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-3 rounded-full border border-vibrant-cyan/20 bg-vibrant-cyan/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#008ba3]">
                    Church waitlist
                  </div>
                  <h2 className="mt-7 text-4xl font-extrabold tracking-tight text-slate-900 md:text-[3.4rem]">
                    Ready to close the Sunday-to-Monday gap?
                  </h2>
                  <p className="mt-6 text-lg font-medium leading-relaxed text-slate-600">
                    We&apos;re working with a small group of churches first. If you want Zoe in your parish or
                    congregation, join the waitlist and we&apos;ll reach out when the next pilot opens.
                  </p>
                  <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Best fit right now</p>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                      Churches that want weekday follow-through from Sunday teaching, pastoral routing when needed, and
                      a launch path that does not require members to learn new software.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-slate-50/80 p-6 shadow-sm backdrop-blur">
                  {status === "sent" ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center px-4 py-10 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vibrant-jade/10">
                        <CheckCircle className="h-8 w-8 text-vibrant-jade" />
                      </div>
                      <h3 className="mt-6 text-2xl font-bold text-slate-900">Request received.</h3>
                      <p className="mt-3 max-w-md text-base font-medium leading-relaxed text-slate-600">
                        We&apos;ve got your info and we&apos;ll reach out when a church pilot slot opens.
                      </p>
                    </motion.div>
                  ) : (
                    <form className="flex flex-col gap-4" onSubmit={handleWaitlistSubmit}>
                      <input type="hidden" name="source" value="churches-waitlist" />
                      <input
                        required
                        type="text"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Your name / church name"
                        className="rounded-xl border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Phone number"
                        className="rounded-xl border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email address"
                        className="rounded-xl border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className={clsx(
                          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-bold transition-all duration-300",
                          status === "submitting"
                            ? "bg-slate-200 text-slate-500"
                            : "bg-gradient-to-r from-vibrant-cyan to-vibrant-jade text-slate-900 shadow-[0_18px_40px_-20px_rgba(0,194,146,0.65)] hover:scale-[1.01]",
                        )}
                      >
                        {status === "submitting" ? (
                          <div className="h-5 w-5 rounded-full border-2 border-slate-500/30 border-t-slate-500 animate-spin" />
                        ) : (
                          <>
                            Join the church waitlist
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                      {submitError ? <p className="text-center text-xs font-medium text-rose-600">{submitError}</p> : null}
                      <p className="mt-2 text-center text-xs leading-relaxed text-slate-400">
                        By joining, you consent to receive recurring automated SMS messages from Zoe by Freedomology at
                        the phone number provided. Msg frequency varies. Msg &amp; data rates may apply. Reply STOP to
                        opt out or HELP for help. <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>{" "}
                        · <a href="/terms" className="underline hover:text-slate-600">Terms of Service</a>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-900 px-6 py-10 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/70 px-8 py-10 text-center md:flex-row md:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-vibrant-cyan">For individuals</p>
              <h3 className="mt-3 text-2xl font-bold">Not leading a church? Zoe also works one person at a time.</h3>
              <p className="mt-2 max-w-2xl text-slate-300">
                The individual product keeps the same text-first experience for daily reflection, follow-through, and
                gentle accountability.
              </p>
            </div>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-sm transition-transform hover:scale-[1.02]"
            >
              Explore Zoe for individuals
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
