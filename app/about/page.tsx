import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";
import aboutBg from "../../public/images/about-bg.webp";

export const metadata: Metadata = {
  title: "About",
  description:
    "We're building something we wish existed — daily discipleship that fits inside real life, built by people who actually believe this stuff matters.",
};

const principles = [
  {
    badge: "Church-Aligned",
    badgeColor: "text-zoe-jade-deep border-zoe-jade/20 bg-zoe-jade/10",
    title: "Built for the church, not around it.",
    body: "Zoe is designed to extend pastoral care, not replace it. Every feature is built to reinforce what's coming from the pulpit and the community around you.",
  },
  {
    badge: "Privacy-First",
    badgeColor: "text-zoe-jade-deep border-zoe-jade/20 bg-zoe-jade/10",
    title: "Your conversations are yours.",
    body: "Private by default. Church leaders see aggregate trends, never your personal messages. You control what gets remembered and what gets erased.",
  },
  {
    badge: "Theologically Grounded",
    badgeColor: "text-amber-700 border-amber-200 bg-amber-50",
    title: "Scripture first. Always.",
    body: "Zoe doesn't give you the 'Christian answer.' It helps you sit with the real questions and engage the actual text. We'd rather help you go deeper than sound impressive.",
  },
  {
    badge: "Accessible",
    badgeColor: "text-[#6c7a73] border-zoe-outline/60 bg-white",
    title: "No app. No login. No friction.",
    body: "SMS because it already works. You don't need a new habit — you just need Zoe in the habit you already have.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-slate-900">
      <section className="relative aspect-video w-full overflow-hidden bg-slate-100" style={{ marginTop: "72px" }}>
        <Image src={aboutBg} alt="About Background" fill className="object-cover" priority />

        <div className="absolute inset-0 z-10 flex items-center md:w-2/3 lg:w-1/2">
          <div
            className="pointer-events-none h-[150%] w-full -ml-[20%] backdrop-blur-md"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-center md:w-2/3 lg:w-1/2">
          <div className="pointer-events-none h-[150%] w-full -ml-[20%] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(0,0,0,0.5)_0%,_transparent_100%)]" />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            <h1 className="mb-2 text-5xl font-bold leading-[1.05] tracking-tighter-editorial text-white md:text-7xl lg:mb-4 lg:text-[80px]">
              We&apos;re building something
              <br />
              we wish existed
            </h1>
            <p className="text-xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
              AI that helps you walk with Jesus 24/7.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zoe-jade/20 bg-zoe-jade/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zoe-jade-deep">
            The Problem We Saw
          </div>
          <h2 className="mb-8 text-4xl font-bold leading-[1.1] tracking-tighter-editorial text-slate-900 md:text-5xl">
            People want to grow. The structure just isn&apos;t there.
          </h2>
          <div className="prose max-w-none space-y-6 text-lg font-medium leading-relaxed text-slate-600">
            <p>Sunday morning, the sermon lands. You feel it. You mean it. You walk out with every intention of living differently this week.</p>
            <p>Then Monday shows up. The inbox is already full. The commute is already loud. The kids are already asking for something. By Tuesday, you can&apos;t quite remember the passage. By Thursday, the intention is just gone.</p>
            <p>And that gap is exactly what we built Zoe to close.</p>
            <p>The data confirms what anyone in ministry already knows: only 31% of regular churchgoers read the Bible every day. Most people who genuinely want to grow spiritually don&apos;t have a daily structure to act on that desire. The desire is real — but the daily scaffolding to act on it mostly isn&apos;t.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zoe-jade/20 bg-zoe-jade/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zoe-jade-deep">
            Why Text Messages
          </div>
          <h2 className="mb-8 text-4xl font-bold leading-[1.1] tracking-tighter-editorial text-slate-900 md:text-5xl">
            The habit is already there.
          </h2>
          <div className="prose max-w-none space-y-6 text-lg font-medium leading-relaxed text-slate-600">
            <p>People check their texts more than 10 times a day. It&apos;s where conversations actually happen — where your spouse sends you something funny, where your friend checks in, where your mom says she&apos;s praying for you.</p>
            <p>That personal, intimate channel is where Zoe lives. It&apos;s already part of how you communicate — Zoe just shows up inside it.</p>
            <p>SMS messages are opened at 98%, with most read within three minutes. That tells you where attention actually lives. Zoe doesn&apos;t build a new habit from scratch — it attaches spiritual practice to one people already have.</p>
            <p>No downloads. No logins. No learning curve. You already know how to reply to a text.</p>
          </div>
        </div>
      </section>

      <section className="bg-zoe-oat px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zoe-jade/20 bg-zoe-jade/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zoe-jade-deep">
            Who We Are
          </div>
          <h2 className="mb-10 text-4xl font-bold leading-[1.1] tracking-tighter-editorial text-slate-900 md:text-5xl">
            Built by people who believe this stuff matters.
          </h2>
          <div className="rounded-3xl border border-zoe-outline/35 bg-white p-8 shadow-[0_4px_30px_rgba(0,0,0,0.05)] md:p-12">
            <div className="flex flex-col items-start gap-8 md:flex-row">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-zoe-jade">
                <span className="text-xl font-bold tracking-tight text-white">TA</span>
              </div>
              <div>
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">Tony Allen</h3>
                <p className="mb-4 text-sm font-semibold text-zoe-jade-deep">Founder, Zoe · Freedomology</p>
                <div className="space-y-4 font-medium leading-relaxed text-slate-600">
                  <p>I never thought I&apos;d build an AI tool. For over a decade, I served as a worship pastor. My whole thing was presence — the kind that can&apos;t be automated, the kind that happens when a room full of broken people encounter a living God.</p>
                  <p>But I kept watching what happened after Sunday. People would leave transformed — or at least moved — and then life would close back over the moment like water over a stone. The transformation didn&apos;t stick, not because people didn&apos;t mean it, but because there was nothing to help them carry it through the week.</p>
                  <p>Zoe is what I wished existed. I&apos;m still very much a pastor at heart, and I want to help people hold onto what God is doing in them.</p>
                </div>
                <p className="mt-6 text-sm font-medium text-slate-400">Cleveland, OH · Freedomology.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zoe-jade/20 bg-zoe-jade/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zoe-jade-deep">
              Our Principles
            </div>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tighter-editorial text-slate-900 md:text-5xl">
              The values we build by.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.badge} className="rounded-3xl border border-zoe-outline/35 bg-zoe-surface p-8">
                <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${p.badgeColor}`}>
                  {p.badge}
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">{p.title}</h3>
                <p className="font-medium leading-relaxed text-slate-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zoe-outline/35 bg-zoe-surface px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 h-1.5 w-16 rounded-full bg-zoe-jade/80" />
          <h2 className="mb-6 text-4xl font-bold leading-[1.06] tracking-tighter-editorial-relaxed text-zoe-ink md:text-5xl">
            We&apos;re just getting started.
          </h2>
          <p className="mb-10 text-lg font-medium leading-relaxed text-zoe-muted">
            Zoe is early, and we&apos;re building it carefully. Join the waitlist to be part of the first group to experience it.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 rounded-full bg-zoe-jade px-8 py-4 text-base font-bold text-white shadow-[0_14px_30px_rgba(0,194,146,0.16)] transition-all duration-200 hover:bg-[#35d5a7]"
          >
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
