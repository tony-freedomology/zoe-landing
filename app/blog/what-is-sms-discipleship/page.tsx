import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../../../components/Footer";

export const metadata: Metadata = {
  title: "What Is SMS Discipleship?",
  description:
    "SMS discipleship is daily spiritual growth that happens through text messages — no app, no login, no friction. Here's why it works when nothing else does.",
};

export default function SmsDiscipleshipPost() {
  return (
    <div className="min-h-screen text-slate-900">
      <section className="relative overflow-hidden bg-[#141008] py-32 px-6 pt-40">
        {/* Hero Background */}
        <Image
          src="/blog/what-is-sms-discipleship/hero.jpg"
          alt="What is SMS discipleship"
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
            <span className="text-slate-400 text-xs font-medium">February 2026</span>
            <span className="text-slate-600 text-xs">&middot;</span>
            <span className="text-slate-400 text-xs font-medium">7 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl tracking-tighter-editorial text-white leading-[1.1] font-bold mb-6">What Is SMS Discipleship?</h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">SMS discipleship is daily spiritual growth that happens through text messages — no app, no login, no friction. Here&apos;s why it works when nothing else does.</p>
            </div>
      </section>
<article className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed text-lg space-y-6">
            <p>The phrase &quot;SMS discipleship&quot; didn&apos;t exist a year ago. And I get that it sounds a little strange at first — like smashing together a technology from 1992 with a concept from the first century.</p>
            <p>But stay with me, because the idea is simpler than it sounds. And I think it solves a problem that&apos;s been hiding in plain sight for a long time.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">The Problem Nobody Talks About</h2>
            <p>Here&apos;s something I saw over and over during my eleven years as a worship pastor: Sunday mornings would be incredible. People would encounter God. They&apos;d cry, they&apos;d write things down, they&apos;d come up after service and say &quot;that was exactly what I needed to hear.&quot;</p>
            <p>And then Monday would happen. By Wednesday, the note they typed during the sermon was buried under 40 other things on their phone. By the following Sunday, most people couldn&apos;t tell you what the message was about.</p>
            <p>That&apos;s not a faith problem. It&apos;s a follow-through problem. And it affects basically everyone.</p>
            <p>The desire is real — the consistency just isn&apos;t. And every tool we&apos;ve built to solve this — devotional books, Bible apps, reading plans — still requires someone to actively choose to engage, every single day, against the noise of everything else in their life.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">So What Is SMS Discipleship?</h2>
            <p>SMS discipleship is spiritual growth that happens through text messages. You don&apos;t download an app. You don&apos;t log in to anything. Scripture and reflection questions arrive in the same place your conversations already live — your texts.</p>
            <p>That&apos;s the whole concept.</p>
            <p>It works because it removes friction. You already check your texts dozens of times a day. When scripture shows up there, you don&apos;t have to form a new habit. The habit finds you.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">Why Text Messages Specifically?</h2>
            <p>Three reasons:</p>
            <p className="font-bold text-slate-900">1. Open rates.</p>
            <p>Text messages have a 95%+ open rate. App push notifications sit around 20%. When something arrives as a text, people actually see it.</p>
            <p className="font-bold text-slate-900">2. No new behavior required.</p>
            <p>Bible apps ask you to build a new habit — remembering to open the app, finding your place, staying focused. SMS meets you in a behavior you already have. You check your texts. The scripture is there.</p>
            <p className="font-bold text-slate-900">3. It works on any phone.</p>
            <p>Smartphones, basic phones, whatever. If it can receive a text message, it works. No download required. This matters a lot for churches where not everyone has the latest iPhone.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">What Zoe Does With SMS Discipleship</h2>
            <p><a href="https://zoe.live" className="text-brand-cyan hover:underline" target="_blank" rel="noopener noreferrer">Zoe</a> is the tool I built to make this work. Here&apos;s how it actually plays out:</p>
            <p>You pick a book of the Bible and a reading pace. Each morning, Zoe texts you your passage for the day — enriched with original-language context that you&apos;d normally need a stack of commentaries to access. The Greek behind &quot;patience.&quot; The Hebrew nuance behind &quot;righteousness.&quot; The cultural context that makes a first-century letter suddenly feel like it was written this morning.</p>
            <p>Then it asks you a question. Something like: &quot;What is God saying to you today? And what are you going to do about it?&quot;</p>
            <p>If you respond, Zoe remembers. And the next day, or a few days later, it checks back in. Did you do the thing you said you&apos;d do? How did that conversation go? What happened with the commitment you made on Tuesday?</p>
            <p>That follow-through loop is what makes SMS discipleship different from just receiving a daily verse. A daily verse is nice. A daily verse that asks you what you&apos;re going to do about it — and then remembers your answer — is actually useful.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">Who This Is For</h2>
            <p>Honestly? It&apos;s for the person who keeps trying and keeps falling off.</p>
            <p>You&apos;ve downloaded YouVersion. Maybe more than once. You&apos;ve started reading plans. You&apos;ve set alarms. You&apos;ve tried journaling. And it keeps not sticking — not because you don&apos;t care, but because the tools keep asking you to fight for consistency against everything else in your day.</p>
            <p>SMS discipleship is for the person who&apos;s tired of the guilt cycle. The person who wants to be in the Word but can&apos;t seem to make it a consistent part of their life. The person who&apos;d engage with scripture every day if it just showed up where they already are.</p>
            <p>It&apos;s also for pastors. If you lead a church, you know the discipleship gap between Sundays is real. Zoe gives you a way to stay present with your congregation every single day — without requiring them to download anything or learn a new tool.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">What SMS Discipleship Is Not</h2>
            <p>I want to be clear about the boundaries, because they matter:</p>
            <p>SMS discipleship is not a replacement for community. It&apos;s not a substitute for pastoral care, for small groups, for the kind of transformation that happens when someone who knows you sits across from you and asks a hard question.</p>
            <p>Zoe will never try to be your pastor. It will never claim to pray for you. It will never pretend to be something it&apos;s not. It&apos;s a tool — a well-built one, hopefully — that keeps scripture in front of you and your own commitments in front of you, every single day.</p>
            <p>The goal is to fill the gap between Sundays, not to replace Sunday. The goal is to make follow-through easier, not to automate spiritual growth. The actual transformation still happens between you and God, in the context of your real life and your real community.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">Getting Started</h2>
            <p>Zoe is live and free in beta. You can join the waitlist at <a href="https://zoe.live" className="text-brand-cyan hover:underline font-bold" target="_blank" rel="noopener noreferrer">zoe.live</a>.</p>
            <p>Pick a book. Set your pace. Your first message arrives tomorrow morning.</p>
            <p>No app. No login. Just Scripture in your texts.</p>
          </div>

          <div className="mt-12 bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center">
            <p className="text-lg font-bold text-slate-900 mb-3">Close the loop.</p>
            <p className="text-slate-600 font-medium leading-relaxed mb-6">Join the Zoe waitlist and experience discipleship that fits inside your actual day.</p>
            <Link href="/#waitlist" className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-8 py-4 text-base font-bold shadow-lg hover:bg-slate-700 transition-all duration-200">
              Join the Zoe Waitlist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
