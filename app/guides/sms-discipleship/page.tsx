import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../../../components/Footer";
import FaqSchema from "../../../components/FaqSchema";
import StructuredData from "../../../components/StructuredData";
import { breadcrumbSchema } from "../../../lib/site";

export const metadata: Metadata = {
  title: "SMS Discipleship: Bible Study Without Downloading Another App",
  description:
    "SMS discipleship delivers daily scripture, original-language context, and guided reflection via text message — no download, no login, no friction. Here's how it works and why it builds habits that apps don't.",
  alternates: {
    canonical: "/guides/sms-discipleship",
  },
};

const comparison = [
  { label: "How you access it", sms: "It arrives automatically in your texts", app: "You must remember to open the app" },
  { label: "Download required", sms: "No", app: "Yes" },
  { label: "Works on any phone", sms: "Yes (including non-smartphones)", app: "Smartphone required" },
  { label: "Notification dependency", sms: "None", app: "Requires push notifications" },
  { label: "Steps to read today's content", sms: "1 — it's already there", app: "4–6 steps minimum" },
  { label: "Open rate", sms: "~95%+ (SMS industry average)", app: "Varies — most users inactive" },
  { label: "Abandonment at 90 days", sms: "Significantly lower", app: "71% abandon within 90 days" },
];

const faqs = [
  {
    q: "What is SMS discipleship?",
    a: "SMS discipleship is a method of daily spiritual growth delivered via text message rather than an app. Daily scripture passages, original-language context, and reflection prompts arrive in your existing text thread automatically — no download, no login, and no friction. It's designed for people who want a consistent Bible habit but have struggled to maintain one using apps.",
  },
  {
    q: "How is SMS discipleship different from a Bible app?",
    a: "A Bible app requires you to remember to open it, find it on your phone, and get to your reading plan. SMS discipleship arrives automatically in your text messages — the same channel you already check dozens of times per day. The core difference is activation energy: apps require effort; SMS requires none.",
  },
  {
    q: "Is Zoe an app?",
    a: "No. Zoe is SMS-based. You don't download anything. Daily scripture and reflection prompts are delivered to your existing text messages. It works on any phone capable of receiving SMS.",
  },
  {
    q: "What content does Zoe send each day?",
    a: "Each day Zoe sends: the day's scripture passage, relevant original-language context (Greek or Hebrew word studies where applicable), historical or cultural background for the passage, and a reflection prompt. The content is structured to be read in 90 seconds or less.",
  },
  {
    q: "Can pastors use SMS discipleship with their entire congregation?",
    a: "Yes. Zoe is specifically built for church-level deployment. Pastors can deploy Zoe across their congregation as a daily discipleship layer that extends Sunday teaching into the rest of the week — without requiring congregation members to download anything.",
  },
  {
    q: "What reading pace options are available?",
    a: "Zoe offers multiple journey tracks at different paces — typically 30, 60, or 90 days through a book of the Bible. You select your journey and pace; Zoe handles the daily delivery.",
  },
  {
    q: "Why does SMS work better than apps for habit formation?",
    a: "Habit research is consistent: the more friction between a person and a behavior, the more likely they are to skip it. SMS messages are already part of how people communicate daily — opening rates exceed 95%, and most texts are read within 3 minutes. You don't build a new habit; you attach the practice to a habit that's already there.",
  },
];

export default function SmsDiscipleshipGuidePage() {
  return (
    <>
    <FaqSchema faqs={faqs} />
    <StructuredData
      id="breadcrumb-schema"
      data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "SMS Discipleship", path: "/guides/sms-discipleship" },
      ])}
    />
    <div className="min-h-screen text-zoe-ink">
      {/* Hero */}
      <section className="bg-zoe-ink py-32 px-6 pt-40">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link href="/guides" className="text-sm font-semibold text-zoe-muted hover:text-white transition-colors">← Guides</Link>
          </div>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <span className="inline-flex items-center rounded-full border border-zoe-sap/30 bg-zoe-sap/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zoe-sap">SMS & Habits</span>
            <span className="text-zoe-muted text-xs font-medium">Updated March 2026</span>
            <span className="text-zoe-muted text-xs">·</span>
            <span className="text-zoe-muted text-xs font-medium">5 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl tracking-tight font-sans text-white leading-[1.1] font-bold mb-6">
            SMS Discipleship: Bible Study Without Downloading Another App
          </h1>
          <p className="text-xl text-zoe-outline font-medium leading-relaxed">
            Daily scripture, original-language context, and guided reflection — delivered to your texts automatically. No download. No login. No friction.
          </p>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-12 px-6 bg-zoe-sap/5 border-y border-zoe-sap/10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 inline-flex items-center rounded-full border border-zoe-sap/30 bg-zoe-sap/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-zoe-sap mt-1">
              TL;DR
            </div>
            <p className="text-zoe-muted font-medium leading-relaxed">
              <strong className="text-zoe-ink">SMS discipleship</strong> delivers daily Bible content via text message — no app required. It works because SMS open rates exceed 95% and texts require zero activation effort. <strong className="text-zoe-ink">Zoe</strong> is the leading SMS discipleship tool: scripture + original Greek/Hebrew context + reflection prompts delivered daily to your phone. Works on any phone. Built for both individuals and church-level deployment.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-3xl space-y-12">

          <div className="prose prose-slate max-w-none text-zoe-muted font-medium leading-relaxed text-lg space-y-6">
            <h2 className="text-3xl tracking-tight font-sans text-zoe-ink font-bold">The problem SMS discipleship solves</h2>
            <p>71% of users abandon apps within 90 days of downloading them. For Bible apps, the number is likely higher — the motivation to install a Bible app often peaks at a Sunday morning feeling and drops steeply by Thursday.</p>
            <p>The friction model is the problem. Every time you want to use a Bible app, you need to: remember it exists, find it on your phone, open it, and get to your content. That's multiple decisions per day, every day. Habits that require repeated decisions tend not to last.</p>
            <p>SMS discipleship eliminates the decision. Daily content arrives in your existing text thread — the same place you're already checking throughout the day. You don't go to it. It comes to you.</p>

            <h2 className="text-3xl tracking-tight font-sans text-zoe-ink font-bold mt-10">How it works</h2>
            <p>Here's what SMS discipleship looks like in practice with Zoe:</p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>You join Zoe and select a Bible journey — a book and a reading pace (30, 60, or 90 days).</li>
              <li>Each morning, Zoe sends a text message with the day's scripture passage.</li>
              <li>The message includes original-language context — Greek or Hebrew word studies embedded directly in the message, where relevant to that day's passage.</li>
              <li>A short reflection prompt closes the message — one question designed to take the passage into your actual day.</li>
              <li>You read it, respond if you want, and continue your morning.</li>
            </ol>
            <p>Total time: 90 seconds. Zero friction. No app to open.</p>

            <h2 className="text-3xl tracking-tight font-sans text-zoe-ink font-bold mt-10">Why SMS specifically</h2>
            <p>SMS messages are opened at over 95%, with most read within three minutes of delivery. That's not a marketing metric — it's a description of behavior that's already happening. People check their texts. It's where real communication lives.</p>
            <p>Attaching a daily scripture habit to an already-existing behavior (checking texts) is how habits actually form. You don't need willpower. You need a system that works with your existing patterns.</p>
            <p>Additionally: SMS works on any phone. No smartphone required. For churches trying to reach older congregation members or communities with limited smartphone adoption, this matters significantly.</p>
          </div>

          {/* Comparison table */}
          <div>
            <h2 className="text-3xl tracking-tight font-sans text-zoe-ink font-bold mb-6">SMS discipleship vs. Bible apps</h2>
            <div className="overflow-x-auto rounded-2xl border border-zoe-outline/20 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="bg-zoe-ink text-white">
                    <th className="text-left px-5 py-4 font-semibold"></th>
                    <th className="text-left px-5 py-4 font-semibold text-zoe-sap">SMS (Zoe)</th>
                    <th className="text-left px-5 py-4 font-semibold text-zoe-muted">Bible Apps</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-zoe-surface"}>
                      <td className="px-5 py-4 font-semibold text-zoe-muted text-xs uppercase tracking-wide">{row.label}</td>
                      <td className="px-5 py-4 text-zoe-muted font-medium">{row.sms}</td>
                      <td className="px-5 py-4 text-zoe-muted">{row.app}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-zoe-muted font-medium leading-relaxed text-lg space-y-6">
            <h2 className="text-3xl tracking-tight font-sans text-zoe-ink font-bold">For pastors: SMS discipleship at scale</h2>
            <p>The same friction problem that affects individuals affects congregations. Pastors want their people growing in scripture between Sundays — but the tools available either require individual initiative (apps people download and forget) or significant church infrastructure (small group programs, weeknight gatherings).</p>
            <p>SMS discipleship works for churches because it requires nothing from congregation members except a phone number. No download, no account creation, no passwords. The pastor deploys it; the congregation receives it.</p>
            <p>Zoe is specifically designed for this: pastors can deploy the same journey track across their entire congregation, creating a shared daily experience that reinforces Sunday teaching and keeps scripture present throughout the week.</p>
          </div>

        </div>
      </article>

      {/* FAQ */}
      <section className="py-24 px-6 bg-zoe-surface">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl tracking-tight font-sans text-zoe-ink font-bold mb-10">Frequently asked questions</h2>
          <div className="space-y-5">
            {faqs.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-7 border border-zoe-outline/20">
                <h3 className="text-base font-bold text-zoe-ink mb-2">{item.q}</h3>
                <p className="text-zoe-muted font-medium leading-relaxed text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-zoe-ink">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl tracking-tight font-sans text-white font-bold leading-[1.1] mb-4">Daily scripture. No app required.</h2>
          <p className="text-lg text-zoe-outline font-medium leading-relaxed mb-10">Zoe delivers daily scripture and original-language context to your text messages. Any phone. No download. Join the waitlist.</p>
          <Link href="/#waitlist" className="inline-flex items-center gap-2 rounded-full bg-white text-zoe-ink px-8 py-4 text-base font-bold shadow-lg hover:bg-slate-100 transition-all duration-200">
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
