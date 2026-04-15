import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Users, BookOpen, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "../../components/Footer";
import featuresBg from "../../public/images/features-bg.webp";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Zoe checks in with you three times a day — dawn, noon, and dusk — with two simple questions that build a real discipleship practice.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      {/* Hero */}
      <section className="relative w-full aspect-video overflow-hidden bg-slate-100" style={{ marginTop: '72px' }}>
        <Image src={featuresBg} alt="Features Background" fill className="object-cover" priority />

        {/* Subtle Text Backdrop */}
        <div className="absolute inset-0 z-10 md:w-2/3 lg:w-1/2 flex items-center">
          <div className="w-full h-[150%] -ml-[20%] pointer-events-none backdrop-blur-md"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 100%)'
            }}
          />
        </div>
        <div className="absolute inset-0 z-10 md:w-2/3 lg:w-1/2 flex items-center">
          <div className="w-full h-[150%] -ml-[20%] pointer-events-none bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(0,0,0,0.5)_0%,_transparent_100%)]" />
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-[80px] tracking-tight font-sans text-white leading-[1.05] font-bold mb-2 lg:mb-4">
              Discipleship that fits<br />inside real life
            </h1>
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-medium tracking-tight">
              Three check-ins a day. Two questions. No App.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 1: Dawn/Noon/Dusk Rhythms */}
      <section className="bg-zoe-surface px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zoe-outline/45 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6c7a73] shadow-sm">
                Daily Rhythms
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight font-sans text-zoe-ink md:text-5xl">
                Dawn. Noon. Dusk.
              </h2>
              <p className="mb-6 text-lg font-medium leading-relaxed text-zoe-muted">
                Three times a day, at moments you choose, Zoe sends a short check-in. Not a broadcast. A conversation.
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
                    <span className="text-amber-500 text-sm font-bold">🌅</span>
                  </div>
                  <div>
                    <p className="font-semibold text-zoe-ink">Dawn</p>
                    <p className="text-sm leading-relaxed text-zoe-muted">What are you bringing into today? Set an intention before the noise starts.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-zoe-sap/20 bg-zoe-sap/10">
                    <span className="text-sm font-bold text-zoe-forest">☀️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-zoe-ink">Noon</p>
                    <p className="text-sm leading-relaxed text-zoe-muted">How&apos;s it actually going? A mid-day anchor to the morning&apos;s intention.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-zoe-outline/45 bg-white">
                    <span className="text-sm font-bold text-zoe-forest">🌙</span>
                  </div>
                  <div>
                    <p className="font-semibold text-zoe-ink">Dusk</p>
                    <p className="text-sm leading-relaxed text-zoe-muted">What happened today? What are you carrying forward?</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-zoe-outline/35 bg-white p-8 shadow-zoe-card">
              <div className="flex flex-col gap-4">
                <div className="max-w-xs rounded-2xl rounded-tl-none border border-zoe-outline/25 bg-zoe-surface px-4 py-3">
                  <p className="text-sm font-medium text-zoe-ink">Good morning. What&apos;s one thing you want to bring before God today?</p>
                  <p className="mt-1 text-xs text-zoe-muted/70">Zoe · 7:02 AM</p>
                </div>
                <div className="max-w-xs self-end rounded-2xl rounded-tr-none border border-zoe-sap/20 bg-zoe-sap/10 px-4 py-3">
                  <p className="text-sm font-medium text-zoe-ink">I want to actually listen today instead of just reacting.</p>
                  <p className="mt-1 text-xs text-zoe-muted/70">You · 7:14 AM</p>
                </div>
                <div className="max-w-xs rounded-2xl rounded-tl-none border border-zoe-outline/25 bg-zoe-surface px-4 py-3">
                  <p className="text-sm font-medium text-zoe-ink">That&apos;s a real posture. Checking in at noon to see how it&apos;s going. 🙏</p>
                  <p className="mt-1 text-xs text-zoe-muted/70">Zoe · 7:15 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Memory & Follow-Through */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 rounded-[2rem] border border-zoe-outline/35 bg-zoe-surface p-8 shadow-zoe-card md:order-1">
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-zoe-forest">Two questions. Every time.</p>
              <div className="flex flex-col gap-6">
                <div className="border-l-2 border-zoe-sap/45 pl-6">
                  <p className="text-2xl font-bold leading-snug tracking-tight text-zoe-ink">What is God saying to you?</p>
                  <p className="mt-2 text-sm leading-relaxed text-zoe-muted">Forces you to pay attention. Articulating it makes it real.</p>
                </div>
                <div className="border-l-2 border-zoe-forest/30 pl-6">
                  <p className="text-2xl font-bold leading-snug tracking-tight text-zoe-ink">What are you going to do about it?</p>
                  <p className="mt-2 text-sm leading-relaxed text-zoe-muted">Closes the gap between knowing and doing.</p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zoe-outline/45 bg-zoe-oat px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6c7a73] shadow-sm">
                Memory &amp; Follow-Through
              </div>
              <h2 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight font-sans text-zoe-ink md:text-5xl">
                It remembers what you said.
              </h2>
              <p className="mb-4 text-lg font-medium leading-relaxed text-zoe-muted">
                When you tell Zoe on Monday that you&apos;re going to have that hard conversation — Zoe brings it back on Thursday.
              </p>
              <p className="text-lg font-medium leading-relaxed text-zoe-muted">
                When you tell Zoe something on Monday, it can bring it back on Thursday. That continuity across days is what actually changes people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: For Churches */}
      <section className="bg-zoe-oat px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zoe-outline/45 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6c7a73] shadow-sm">
              For Churches
            </div>
            <h2 className="mx-auto max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight font-sans text-zoe-ink md:text-5xl">
              Extends the pulpit throughout the week.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-zoe-muted">
              Church leaders can align Zoe with sermon content, so what lands on Sunday doesn&apos;t evaporate by Tuesday.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen className="h-6 w-6 text-zoe-sap" />,
                title: "Sermon Alignment",
                body: "Align Zoe's weekly prompts with your sermon series, so mid-week check-ins reinforce what your congregation heard on Sunday.",
              },
              {
                icon: <Users className="h-6 w-6 text-zoe-forest" />,
                title: "Aggregate Insights",
                body: "Pastors see congregation-level trends — not personal messages. Know how your church is doing spiritually, not just who showed up.",
              },
              {
                icon: <MessageCircle className="h-6 w-6 text-amber-500" />,
                title: "No New Platform",
                body: "It all happens in SMS. Your congregation doesn't need to download anything. Zoe meets them where they already are.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-[2rem] border border-zoe-outline/35 bg-white p-8 shadow-zoe-card">
                <div className="mb-4">{card.icon}</div>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-zoe-ink">{card.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-zoe-muted">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 4: Trust & Privacy */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zoe-outline/45 bg-zoe-oat px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6c7a73] shadow-sm">
              Trust &amp; Privacy
            </div>
            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight font-sans text-zoe-ink md:text-5xl">
              Private by default.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-zoe-muted">
              Your conversations are yours. We never share them with your church leaders. Consent controls are yours to set.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <ShieldCheck className="h-6 w-6 text-zoe-sap" />,
                title: "Just between you and God",
                body: "Your one-to-one conversations are not visible to church leaders by default. Ever.",
              },
              {
                icon: <Users className="h-6 w-6 text-zoe-forest" />,
                title: "Aggregate trends only",
                body: "Church dashboards show trend-level health — not personal confessions or journal content.",
              },
              {
                icon: <MessageCircle className="h-6 w-6 text-amber-500" />,
                title: "Consent controls",
                body: "You control memory depth, support access, and optional data-sharing settings.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-zoe-muted" />,
                title: "Delete and export rights",
                body: "Export your full spiritual history or delete everything. No hard feelings, no questions asked.",
              },
            ].map((card) => (
              <div key={card.title} className="flex gap-5 rounded-[1.75rem] border border-zoe-outline/35 bg-zoe-surface p-6">
                <div className="flex-shrink-0 mt-1">{card.icon}</div>
                <div>
                  <h3 className="mb-1 font-bold text-zoe-ink">{card.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-zoe-muted">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zoe-outline/35 bg-zoe-surface px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 h-1.5 w-16 rounded-full bg-zoe-sap/80" />
          <h2 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight font-sans text-zoe-ink md:text-5xl">
            See what it feels like.
          </h2>
          <p className="mb-10 text-lg font-medium leading-relaxed text-zoe-muted">
            Zoe is in early access. Join the waitlist and see what it feels like to close the loop between Sunday and Monday.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:brightness-105 active:scale-95"
          >
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
