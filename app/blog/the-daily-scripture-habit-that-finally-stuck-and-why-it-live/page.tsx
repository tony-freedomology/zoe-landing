import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // Added for the hero image
import { ArrowRight } from "lucide-react";
import Footer from "../../../components/Footer";
import FaqSchema from "../../../components/FaqSchema";

export const metadata: Metadata = {
  openGraph: {
    images: ["/blog/the-daily-scripture-habit-that-finally-stuck-and-why-it-live/hero.jpg"],
  },
  title: "Daily Scripture That Actually Sticks (And Why It Has Nothing to Do With Discipline)",
  description:
    "The daily decision is what kills scripture habits — not lack of faith. Here's how removing that choice builds the kind of consistent rhythm that actually lasts.",
};

const faqs = [
  {
    q: "Why can't I make daily scripture a consistent habit?",
    a: "The most common reason is decision fatigue — having to actively choose to open an app every morning draws from the same mental energy you use for everything else. Remove the daily decision and consistency follows naturally.",
  },
  {
    q: "How does Zoe help with daily scripture consistency?",
    a: "Zoe sends your daily scripture directly to your text messages. No app to open, no choice to make. The habit builds itself because the Word arrives where you already are.",
  },
  {
    q: "Is a morning quiet time the only way to read scripture daily?",
    a: "Not at all. Daily scripture that arrives throughout your day — in texts, during gaps in your routine — can actually be more connected to real life than one isolated morning session. Zoe is built around this idea.",
  },
  {
    q: "How long does it take to read a Zoe daily message?",
    a: "About 30-60 seconds for the passage and reflection. You can go deeper in conversation if you want, but the daily contact happens in under a minute.",
  },
  {
    q: "Is Zoe free to try?",
    a: "Yes. Start a free trial at zoe.live — your first daily scripture arrives the next morning, no app required.",
  },
];

export default function DailyScriptureHabitPage() {
  return (
    <>
    <FaqSchema faqs={faqs} />
    <div className="min-h-screen text-slate-900">
      <section className="relative overflow-hidden bg-[#141008] py-32 px-6 pt-40">
        {/* Hero Background */}
        <Image
          src="/blog/the-daily-scripture-habit-that-finally-stuck-and-why-it-live/hero.jpg"
          alt="Daily scripture habit"
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
            <span className="text-slate-400 text-xs font-medium">4 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl tracking-tighter-editorial text-white leading-[1.1] font-bold mb-6">Daily Scripture That Actually Sticks (And Why It Has Nothing to Do With Discipline)</h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">The daily decision is what kills scripture habits — not lack of faith. Here&apos;s how removing that choice builds the kind of consistent rhythm that actually lasts.</p>
            </div>
      </section>

      {/* Hero Image Section */}

      <article className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-3xl">

          {/* TL;DR section removed as no content was provided for it in the new post details. */}

          <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed text-lg space-y-6">

            <p>Here&apos;s something I&apos;ve noticed after years of watching people try to build a consistent daily scripture habit.</p>

            <p>The ones who struggle aren&apos;t short on faith. They care deeply. They want to be in the Word. What&apos;s actually tripping them up is something quieter — and way more fixable.</p>

            <hr className="border-slate-200 my-10" />

            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">The Real Enemy Is the Daily Decision</h2>

            <p>Every morning, when you sit down to read scripture, you&apos;re making a choice. Open the app or not. Which passage today. Do I have time right now. Where did I leave off.</p>

            <p>Those micro-decisions don&apos;t sound like much, but they stack. Researchers call it <strong>decision fatigue</strong> — the idea that every choice you make draws from the same finite pool of mental energy. By the time you&apos;ve gotten the kids sorted, checked your first few emails, and figured out your day, that pool gets shallow fast.</p>

            <p>And so the Bible app sits untouched, not because you stopped caring, but because you had to actively choose it — every single morning, against the friction of a hundred other things pulling at you.</p>

            <p>That&apos;s the pattern. And once you see it, the fix becomes obvious.</p>

            <hr className="border-slate-200 my-10" />

            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">Remove the Choice. Build the Rhythm.</h2>

            <p>Habits that stick aren&apos;t built on willpower. They&apos;re built on systems that make the desired behavior happen without requiring a daily decision.</p>

            <p>That&apos;s exactly what Zoe does. Daily scripture lands in your text messages. Your phone buzzes. You read it. There&apos;s no decision point. The habit stops requiring activation energy and starts just... happening.</p>

            <p>The consistency you&apos;ve been chasing doesn&apos;t come from trying harder. It comes from setting up something that works with how your brain actually operates. When scripture arrives in the same place you&apos;re already looking — your texts — it stops being a task you have to remember and becomes a moment that finds you.</p>

            <p>That rhythm builds fast. And once it&apos;s built, it feels effortless — not because you&apos;ve developed superhuman discipline, but because you designed out the friction.</p>

            <hr className="border-slate-200 my-10" />

            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">Walking With Jesus Throughout the Day, Not Just for Ten Minutes</h2>

            <p>There&apos;s a version of the faith life that looks like this: one dedicated quiet time in the morning, Bible open, coffee hot, totally unhurried. That&apos;s a beautiful thing when it happens.</p>

            <p>But most mornings are not that morning.</p>

            <p>And more importantly — why should one ten-minute window be the only touchpoint with Jesus in a sixteen-hour day?</p>

            <p>When scripture arrives in your texts, it shows up at the carpool line. During the gap between meetings. On the walk home. Those are the moments when a verse can actually land in the middle of real life, where it connects to what you&apos;re actually carrying that day.</p>

            <p>That&apos;s a richer way to walk with Jesus than a single morning ritual. Scripture woven through your whole day — showing up when you&apos;re distracted, when you&apos;re stressed, when you&apos;re just going about it — is discipleship working the way it was meant to. Consistent contact. Not performance.</p>

            <hr className="border-slate-200 my-10" />

            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">What This Looks Like in Practice</h2>

            <p>Every morning, a Zoe text arrives. A passage. A short reflection. Sometimes a question worth sitting with through the day.</p>

            <p>You read it in thirty seconds, or you go deeper if the morning allows. Either way, the Word showed up. No app to open, no decision to make, no streak to maintain.</p>

            <p>Over time — and it doesn&apos;t take long — those daily contacts accumulate. You start remembering verses at the right moments. Specific words come back when you need them. The practice does what it&apos;s supposed to do: form the kind of thinking that scripture has shaped over time, in the texture of an ordinary Tuesday.</p>

            <p>Start a free trial at <a href="https://zoe.live" className="text-brand-cyan hover:underline">zoe.live</a>. Your first daily scripture arrives tomorrow morning.</p>

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