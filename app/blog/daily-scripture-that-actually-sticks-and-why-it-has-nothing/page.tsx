import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../../../components/Footer";
import FaqSchema from "../../../components/FaqSchema";

export const metadata: Metadata = {
  openGraph: {
    images: ["/blog/daily-scripture-that-actually-sticks-and-why-it-has-nothing/hero.jpg"],
  },
  title: "Daily Scripture That Actually Sticks (And Why It Has Nothing to Do With Discipline)",
  description:
    "*Waiting for ✅ approval from Tony or Greg before publishing.",
};

const faqs = [
  {
    "q": "What if daily scripture reading feels like another item on my to-do list?",
    "a": "The key is shifting your perspective from obligation to connection. Try finding a quiet time that feels natural and exploring different formats, like listening to an audio Bible or journaling your thoughts. Zoe helps you discover how to make it a life-giving experience, not a duty."
  },
  {
    "q": "I struggle to remember what I read in the Bible. How can I make it stick?",
    "a": "True retention comes from engagement, not just passive reading. Try interacting with the text by highlighting, summarizing passages in your own words, or even discussing them with a friend. This helps the words move from your eyes to your heart."
  },
  {
    "q": "Is there a 'right' way to approach daily scripture so it actually makes an impact?",
    "a": "The 'right' way is deeply personal and what works for you. Some thrive with structured plans, while others prefer simply opening their Bible and seeing where it leads. The goal is to find a consistent rhythm that genuinely resonates, allowing God's word to speak to you."
  },
  {
    "q": "Why does the post suggest connecting with scripture has nothing to do with discipline?",
    "a": "We often rely on willpower, but lasting engagement stems from desire and genuine connection, not forced effort. When you truly experience the power and relevance of God's word, discipline becomes less necessary because you *want* to engage. Zoe helps cultivate this heartfelt desire."
  },
  {
    "q": "How can Zoe help me build a more consistent and meaningful scripture habit?",
    "a": "Zoe focuses on fostering authentic engagement and personal resonance with God's word. Instead of rigid rules, we guide you to explore methods and perspectives that make scripture truly come alive for *you*. It's about building a living relationship, not just checking off a box."
  }
];

export default function DailyScriptureThatActuallySticksPage() {
  return (
    <>
    <FaqSchema faqs={faqs} />
    <div className="min-h-screen text-slate-900">
      <section className="relative overflow-hidden bg-[#141008] py-32 px-6 pt-40">
        {/* Hero Background */}
        <Image
          src="/blog/daily-scripture-that-actually-sticks-and-why-it-has-nothing/hero.jpg"
          alt="Daily Scripture That Actually Sticks"
          fill
          className="object-cover opacity-25"
          priority
        />
        {/* Subtle blur over left/text area */}
        <div className="absolute inset-0 z-10 pointer-events-none backdrop-blur-[2px]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 30% 50%, black 0%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 60% 80% at 30% 50%, black 0%, transparent 100%)',
          }}
        />
        {/* Dimming radial gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,_rgba(0,0,0,0.55)_0%,_transparent_100%)]" />
        {/* Bottom fade to white article */}
        <div className="absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-b from-transparent to-[#141008]" />
        <div className="relative z-20 mx-auto max-w-3xl">
          <div className="mb-6">
            <Link href="/blog" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">&larr; Blog</Link>
          </div>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <span className="inline-flex items-center rounded-full border border-brand-jade/30 bg-brand-jade/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-jade">Discipleship</span>
            <span className="text-slate-400 text-xs font-medium">March 2026</span>
            <span className="text-slate-600 text-xs">&middot;</span>
            <span className="text-slate-400 text-xs font-medium">1 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl tracking-tighter-editorial text-white leading-[1.1] font-bold mb-6">Daily Scripture That Actually Sticks (And Why It Has Nothing to Do With Discipline)</h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">*Waiting for ✅ approval from Tony or Greg before publishing.</p>
            </div>
      </section>

      <article className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-3xl">

          {/* TL;DR */}
          <section className="mb-12 py-8 px-6 bg-brand-jade/5 border-y border-brand-jade/10 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-8 rounded bg-brand-jade/20 flex items-center justify-center text-brand-jade font-bold text-sm tracking-wider">TL;DR</div>
              <p className="text-slate-700 font-medium leading-relaxed">
                <strong>Consistent daily scripture reading isn&apos;t about rigid discipline, but about cultivating a genuine desire and connection to God&apos;s word.</strong> Zoe helps you achieve this by fostering authentic engagement that makes scripture a natural, life-giving part of your routine, rather than just another item on your to-do list.
              </p>
            </div>
          </section>

          <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed text-lg space-y-6">

            <p>Waiting for &#x2705; approval from Tony or Greg before publishing.</p>

          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-brand-jade px-8 py-4 text-base font-semibold text-white hover:bg-brand-jade/90 transition-colors"
            >
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl tracking-tighter-editorial text-slate-900 font-bold mb-10">Frequently asked questions</h2>
          <div className="space-y-8">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}