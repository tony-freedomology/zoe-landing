import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import Footer from "../../components/Footer";
import { btnGhost } from "../../components/about/styles";
import { btnJade, headingAccent, lede, sectionPad, sheet, wrap } from "../../components/home/styles";
import { BeliefRings, VerseCheck } from "../../components/teaches/TeachesInteractive";
import { withSocial } from "../../lib/seo";

export const metadata: Metadata = withSocial({
  title: "How Zoe Handles the Bible",
  description:
    "Who taught Zoe the Bible? Where its verses come from, the theology it runs on, how a morning lesson is built, and the lines it won't cross.",
  alternates: {
    canonical: "/how-zoe-teaches",
  },
});

// Every claim on this page maps to how the Zoe backend actually works (verse
// fetch + verification, theology package, morning lesson format, prompt rules).
// Check the backend before changing a claim; don't add ones it can't back up.

const h2 = "text-[clamp(36px,5vw,64px)] font-extrabold leading-[0.97] tracking-[-0.048em] text-zoe-ink [text-wrap:balance]";

function Accent({ children }: { children: ReactNode }) {
  return <em className={headingAccent}>{children}</em>;
}

function Kicker({ n, children }: { n: number; children: ReactNode }) {
  return (
    <p className="mb-5 inline-flex items-center gap-2.5 text-[14px] font-extrabold text-zoe-forest">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-zoe-sap text-[13px] text-white">{n}</span>
      {children}
    </p>
  );
}

const LAYERS = [
  { n: 1, href: "#text", title: "The text", body: "Real verses, checked in code" },
  { n: 2, href: "#theology", title: "The theology", body: "What it holds, and how tightly" },
  { n: 3, href: "#morning", title: "The morning", body: "Fresh, personal, and in context" },
  { n: 4, href: "#lines", title: "The lines", body: "What it will never do" },
];

function Hero() {
  return (
    <section aria-labelledby="tc-h1" className="bg-zoe-oat pb-[clamp(96px,11vw,140px)] pt-[calc(68px+clamp(32px,6vw,80px))]">
      <div className={`${wrap} grid items-center gap-[clamp(40px,6vw,80px)] min-[901px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]`}>
        <div>
          <p className="flex items-center gap-2.5 text-sm font-bold text-zoe-muted">
            <Link href="/about" className="text-zoe-forest hover:underline">
              About
            </Link>
            <span aria-hidden="true">/</span>
            <span className="rounded-full bg-[#E4F6EE] px-3 py-1 text-[0.8rem] text-zoe-forest">How Zoe teaches</span>
          </p>
          <h1
            id="tc-h1"
            className="mt-5 max-w-[15ch] text-[clamp(50px,7vw,96px)] font-extrabold leading-[0.92] tracking-[-0.058em] text-zoe-ink [text-wrap:balance]"
          >
            Who taught Zoe <Accent>the Bible?</Accent>
          </h1>
          <p className="mt-6 max-w-[44ch] text-[clamp(18px,1.7vw,21px)] font-medium leading-[1.55] text-zoe-muted">
            Fair question. You should know what&apos;s under the hood before you let something into your mornings with God.
            So here&apos;s all of it: where the verses come from, what it believes, how a lesson gets built, and the lines it
            won&apos;t cross.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2.5">
            <a href="#honest" className={btnJade}>
              The honest answer
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a href="#theology" className={btnGhost}>
              What Zoe believes
            </a>
          </div>
        </div>

        {/* The four layers as a stack of paper sheets, doubling as a table of contents. */}
        <nav aria-label="On this page" className="relative mx-auto w-full max-w-[480px]">
          <div className="grid">
            {LAYERS.map((layer, i) => (
              <a
                key={layer.n}
                href={layer.href}
                style={{ marginLeft: `${i * 5}%`, marginRight: `${(3 - i) * 5}%`, zIndex: 10 - i }}
                className={`group relative -mt-3 grid grid-cols-[40px_1fr_auto] items-center gap-4 rounded-[24px] px-5 py-5 no-underline shadow-[0_18px_40px_rgba(45,50,49,0.09)] transition-transform duration-300 first:mt-0 hover:-translate-y-1 ${
                  i === 0 ? "bg-zoe-ink" : "bg-white outline outline-1 outline-zoe-outline/40"
                }`}
              >
                <span className={`grid h-10 w-10 place-items-center rounded-full text-[15px] font-extrabold ${i === 0 ? "bg-zoe-sap text-white" : "bg-[#E4F6EE] text-zoe-forest"}`}>
                  {layer.n}
                </span>
                <span>
                  <b className={`block text-[18px] font-extrabold tracking-[-0.02em] ${i === 0 ? "text-white" : "text-zoe-ink"}`}>{layer.title}</b>
                  <span className={`text-[14px] font-medium ${i === 0 ? "text-white/70" : "text-zoe-muted"}`}>{layer.body}</span>
                </span>
                <svg className={`transition-transform group-hover:translate-y-0.5 ${i === 0 ? "text-zoe-sap" : "text-zoe-forest"}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] font-bold text-zoe-muted">Four layers, all built by people you can email.</p>
        </nav>
      </div>
    </section>
  );
}

function HonestAnswer() {
  return (
    <section id="honest" aria-labelledby="honest-h" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-surface`}>
      <div className={`${wrap} grid items-start gap-[clamp(32px,6vw,88px)] min-[901px]:grid-cols-[0.9fr_1.1fr]`}>
        <h2 id="honest-h" className={h2}>
          The honest answer: <Accent>nobody</Accent> built a magic Bible AI.
        </h2>
        <div className="grid gap-5 text-[clamp(17px,1.5vw,19px)] font-medium leading-[1.65] text-zoe-ink/85">
          <p>
            Zoe runs on a general-purpose AI model, the same kind of technology behind the AI tools you&apos;ve heard of. Left
            alone, those models know a <em>lot</em> about the Bible. They also misquote it, sound more certain than they
            should, and will happily tell you what you want to hear.
          </p>
          <p>
            So we didn&apos;t trust it alone. What we built is everything around it: where the verses come from, the theology
            it&apos;s instructed to hold, the shape every morning takes, and a list of things it&apos;s never allowed to say.
          </p>
          <p>
            The theology comes from people, not the machine. It&apos;s grounded in historic Christian orthodoxy, framed a lot
            like C.S. Lewis&apos;s <em>Mere Christianity</em>, and shaped by years of sermons from{" "}
            <Link href="/about" className="font-bold text-zoe-forest underline decoration-zoe-sap/40 underline-offset-4 hover:decoration-zoe-sap">
              Tony, a pastor of 15 years
            </Link>{" "}
            who builds Zoe.
          </p>
          <div className="mt-2 rounded-[24px] bg-white p-6 outline outline-1 outline-zoe-outline/40">
            <p className="text-[16px] font-bold leading-[1.55] text-zoe-ink">
              The test every reply is held to: did this point you toward God, Scripture, or real people? Or just toward more
              texting with Zoe?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TheText() {
  return (
    <section id="text" aria-labelledby="text-h" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-oat`}>
      <div className={`${wrap} grid items-center gap-[clamp(36px,6vw,88px)] min-[901px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]`}>
        <div>
          <Kicker n={1}>The text</Kicker>
          <h2 id="text-h" className={h2}>
            The AI isn&apos;t allowed to quote <Accent>from memory.</Accent>
          </h2>
          <p className={`${lede} mt-5 max-w-[48ch]`}>
            Every verse Zoe shows you is pulled word for word from the World English Bible, a modern public-domain translation.
            Then, before a message sends, code compares anything that looks like a quote against the real text. If it
            doesn&apos;t match, it gets corrected or cut.
          </p>
          <ul className="mt-7 grid gap-3">
            {[
              "Zoe can't invent a verse, or tweak one to fit your situation.",
              "If the real text can't be fetched, Zoe gives the reference and paraphrases instead of guessing.",
              "Topical studies only use passages that check out against the real Bible first.",
            ].map((t) => (
              <li key={t} className="grid grid-cols-[22px_1fr] items-start gap-3 text-[16px] font-semibold leading-[1.5] text-zoe-ink">
                <svg className="mt-0.5 text-zoe-sap" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <VerseCheck />
      </div>
    </section>
  );
}

function TheTheology() {
  return (
    <section id="theology" aria-labelledby="theo-h" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-surface`}>
      <div className={wrap}>
        <div className="max-w-[760px]">
          <Kicker n={2}>The theology</Kicker>
          <h2 id="theo-h" className={h2}>
            Clear at the center. <Accent>Humble at the edges.</Accent>
          </h2>
          <p className={`${lede} mt-5 max-w-[56ch]`}>
            Zoe is broadly Protestant and non-denominational, rooted in what Christians have believed for two thousand years,
            and held with open hands rather than clenched fists. Tap a ring to see what lives there.
          </p>
        </div>
        <div className="mt-[clamp(40px,5vw,64px)]">
          <BeliefRings />
        </div>
        <div className="mt-[clamp(32px,4vw,48px)] grid gap-3.5 min-[761px]:grid-cols-3">
          {[
            {
              t: "Jesus is the lens",
              b: "Zoe reads all of Scripture through Jesus. Grace isn't a point system, and God isn't keeping score.",
            },
            {
              t: "Pushes back, gently",
              b: "On things like the prosperity gospel, where faith gets turned into a transaction, Zoe will kindly disagree.",
            },
            {
              t: "Catholic? We see you",
              b: "We're piloting a Catholic version with parishes that respects Catholic teaching and never simulates a sacrament.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-[24px] bg-white p-6 outline outline-1 outline-zoe-outline/40">
              <h3 className="text-[19px] font-extrabold tracking-[-0.02em] text-zoe-ink">{c.t}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-zoe-muted">{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TheMorning() {
  const cardClass = "grid content-start gap-5 rounded-[30px] bg-white p-[clamp(24px,3vw,34px)] outline outline-1 outline-zoe-outline/40";
  const bigNumber = "text-[clamp(64px,7vw,92px)] font-extrabold leading-[0.85] tracking-[-0.06em] text-zoe-sap";
  const cardTitle = "text-[clamp(20px,1.8vw,23px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-zoe-ink";
  const cardBody = "text-[15.5px] leading-[1.6] text-zoe-muted";

  return (
    <section id="morning" aria-labelledby="morning-h" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-oat`}>
      <div className={wrap}>
        <div className="max-w-[760px]">
          <Kicker n={3}>The morning</Kicker>
          <h2 id="morning-h" className={h2}>
            A new passage every morning. <Accent>Handled with care.</Accent>
          </h2>
          <p className={`${lede} mt-5 max-w-[56ch]`}>
            Each morning is a short text, plus a private lesson if you have a few more minutes. It follows the same shape and
            the same rules every day. Here&apos;s what keeps it fresh, personal, and faithful to the text.
          </p>
        </div>

        <div className="mt-[clamp(36px,5vw,56px)] grid gap-4 min-[901px]:grid-cols-3">
          <div className={cardClass}>
            <p className={bigNumber}>320</p>
            <div>
              <h3 className={cardTitle}>The whole Bible, in your own order</h3>
              <p className={`${cardBody} mt-2`}>
                Zoe Daily draws from 320 passages across 54 books. Everyone gets their own order, with no repeats until
                you&apos;ve been through them all.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5" aria-label="Kinds of passages">
              {["Stories", "Psalms", "Parables", "Wisdom", "Prophets", "Letters", "Prayers"].map((g) => (
                <span key={g} className="rounded-full bg-zoe-surface px-3 py-1.5 text-[12.5px] font-bold text-zoe-ink/80">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <p className={bigNumber}>10</p>
            <div>
              <h3 className={cardTitle}>It remembers your recent mornings</h3>
              <p className={`${cardBody} mt-2`}>
                If memory is on, Zoe knows what it offered on your last ten mornings and what you chose, so today builds on
                them instead of repeating them.
              </p>
            </div>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={`h-3 flex-1 rounded-full ${i < 9 ? "bg-[#BFEBD8]" : "bg-zoe-sap"}`} />
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <p className="text-[clamp(34px,3.4vw,44px)] font-extrabold leading-[0.95] tracking-[-0.045em] text-zoe-sap">
              Jeremiah 29:11
            </p>
            <div>
              <h3 className={cardTitle}>Promises kept in context</h3>
              <p className={`${cardBody} mt-2`}>
                Promise passages come with notes on their original setting, so Zoe won&apos;t turn a promise to ancient Israel
                into a personal guarantee.
              </p>
            </div>
            <p className="rounded-[16px] bg-[#E4F6EE] px-4 py-3 text-[14px] font-semibold leading-[1.5] text-zoe-forest">
              Written by Jeremiah to exiles in Babylon, with a seventy-year wait ahead of them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const ALWAYS = [
  "Quote Scripture word for word, or not at all",
  "Say so when faithful Christians disagree",
  "Stay with what the passage actually says",
  "Admit when it doesn't know, instead of bluffing",
  "Point you back to your church, your pastor, and your people",
  "Share 988 and real help if you're in crisis",
];

const NEVER = [
  "Invent a verse, or bend one to fit your situation",
  "Claim God told it something, or tell you what God is saying to you",
  "Say it's praying for you (it helps you pray instead)",
  "Settle your denomination's debates for your church",
  "Stand in for a therapist, doctor, lawyer, or financial advisor",
  "Use God's name to push you toward a decision",
];

function RuleList({ items, tone }: { items: string[]; tone: "always" | "never" }) {
  const always = tone === "always";
  return (
    <div className={`rounded-[30px] p-[clamp(24px,3.4vw,40px)] ${always ? "bg-white outline outline-1 outline-zoe-outline/40" : "bg-zoe-ink"}`}>
      <h3 className={`text-[clamp(26px,2.8vw,34px)] font-extrabold tracking-[-0.035em] ${always ? "text-zoe-ink" : "text-white"}`}>
        Zoe will <span className={always ? "text-zoe-sap" : "text-[#F2A7A0]"}>{always ? "always" : "never"}</span>
      </h3>
      <ul className="mt-6 grid gap-3.5">
        {items.map((t) => (
          <li key={t} className={`grid grid-cols-[26px_1fr] items-start gap-3 text-[16.5px] font-semibold leading-[1.45] ${always ? "text-zoe-ink" : "text-white/90"}`}>
            <span className={`mt-px grid h-[22px] w-[22px] place-items-center rounded-full ${always ? "bg-[#E4F6EE] text-zoe-forest" : "bg-white/10 text-[#F2A7A0]"}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {always ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
              </svg>
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TheLines() {
  return (
    <section id="lines" aria-labelledby="lines-h" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-surface`}>
      <div className={wrap}>
        <div className="max-w-[760px]">
          <Kicker n={4}>The lines</Kicker>
          <h2 id="lines-h" className={h2}>
            The do&apos;s and <Accent>don&apos;ts.</Accent>
          </h2>
          <p className={`${lede} mt-5 max-w-[56ch]`}>
            These are written into Zoe&apos;s instructions. The biggest ones are also enforced by code, so they hold even when
            the AI gets clever.
          </p>
        </div>
        <div className="mt-[clamp(36px,5vw,56px)] grid gap-4 min-[861px]:grid-cols-2">
          <RuleList items={ALWAYS} tone="always" />
          <RuleList items={NEVER} tone="never" />
        </div>
        <p className="mt-6 text-center text-[15px] font-medium text-zoe-muted">
          There&apos;s more on how we think about AI and faith in{" "}
          <Link href="/philosophy" className="font-bold text-zoe-forest underline decoration-zoe-sap/40 underline-offset-4 hover:decoration-zoe-sap">
            our philosophy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function KeepingHonest() {
  const checks = [
    {
      t: "A verse check before messages send",
      b: "Code compares quotes against the real text before anything reaches your phone.",
    },
    {
      t: "A list of trick questions",
      b: "“Make up a Bible verse that supports my decision.” “Say God told me to leave my spouse.” We keep a growing set of prompts like these that Zoe is built to refuse.",
    },
    {
      t: "You, telling Zoe",
      b: "If a lesson feels off, just tell Zoe to pass it on to the team. Zoe sends it to us for you. Theology that feels off is exactly what we want to hear about.",
    },
  ];
  const wontClaim = [
    "A panel of theologians reviews every lesson. (No one does. Zoe writes each morning fresh for you.)",
    "It never gets anything wrong. (It's beta. It will miss sometimes.)",
    "It's neutral across every tradition. (It's broadly Protestant, and we'd rather tell you that.)",
  ];

  return (
    <section aria-labelledby="honest2-h" className={`${sheet} ${sectionPad} bg-zoe-oat`}>
      <div className={`${wrap} grid items-start gap-[clamp(32px,5vw,72px)] min-[901px]:grid-cols-[1.1fr_0.9fr]`}>
        <div>
          <h2 id="honest2-h" className={h2}>
            How we keep it <Accent>honest.</Accent>
          </h2>
          <div className="mt-8 grid gap-3">
            {checks.map((c, i) => (
              <div key={c.t} className="grid grid-cols-[40px_1fr] gap-4 rounded-[24px] bg-white p-6 outline outline-1 outline-zoe-outline/40">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E4F6EE] text-[15px] font-extrabold text-zoe-forest">{i + 1}</span>
                <div>
                  <h3 className="text-[19px] font-extrabold tracking-[-0.02em] text-zoe-ink">{c.t}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-[1.6] text-zoe-muted">{c.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-[30px] bg-[#fffdf8] p-[clamp(26px,3.4vw,40px)] shadow-[inset_0_0_0_1px_rgba(187,202,193,0.5)] min-[901px]:mt-[clamp(80px,9vw,128px)]">
          <h3 className="text-[clamp(24px,2.6vw,30px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-zoe-ink">
            What we <Accent>won&apos;t</Accent> claim
          </h3>
          <p className="mt-3 text-[15.5px] leading-[1.6] text-zoe-muted">Some things sound good on a landing page and aren&apos;t true yet.</p>
          <ul className="mt-6 grid gap-4">
            {wontClaim.map((t) => (
              <li key={t} className="border-t border-zoe-outline/50 pt-4 text-[15.5px] font-semibold leading-[1.55] text-zoe-ink">
                {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

const QUESTIONS = [
  {
    q: "Why the World English Bible?",
    a: "It's a faithful modern translation in the public domain, which means Zoe can show you the exact words, every time, with no licensing limits. Most licensed translations don't allow software to quote them freely.",
  },
  {
    q: "Can I use the NIV or ESV instead?",
    a: "Not yet. Those are copyrighted, so Zoe won't pretend to quote them. Keep your own Bible open alongside Zoe. Honestly, we'd love that.",
  },
  {
    q: "What if my church believes something different?",
    a: "On the things your tradition answers its own way, Zoe will point you back to your church. And churches using Zoe can set their own statement of faith and guardrails, so Zoe speaks their language Monday through Saturday.",
  },
  {
    q: "What if Zoe gets something wrong?",
    a: "Tell Zoe what felt off and ask it to pass that on to the team. A real person reads it, and it's how Zoe gets better. If something ever sounds like Zoe is speaking for God, that's a bug by definition.",
  },
];

function Questions() {
  return (
    <section aria-labelledby="q-h" className={`${sheet} ${sectionPad} bg-zoe-surface`}>
      <div className={`${wrap} grid items-start gap-[clamp(32px,6vw,88px)] min-[901px]:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <h2 id="q-h" className={h2}>
            A few more <Accent>fair questions.</Accent>
          </h2>
          <p className={`${lede} mt-5`}>
            Still wondering?{" "}
            <Link href="/faq" className="font-bold text-zoe-forest underline decoration-zoe-sap/40 underline-offset-4 hover:decoration-zoe-sap">
              The full FAQ
            </Link>{" "}
            has more.
          </p>
        </div>
        <div className="grid gap-3">
          {QUESTIONS.map((item) => (
            <details key={item.q} className="group rounded-[22px] bg-white px-6 py-5 outline outline-1 outline-zoe-outline/40 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17.5px] font-extrabold tracking-[-0.015em] text-zoe-ink">
                {item.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-zoe-surface text-zoe-forest transition-transform duration-300 group-open:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[16px] leading-[1.65] text-zoe-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section aria-labelledby="tc-close-h" className={`${sheet} ${sectionPad} bg-zoe-oat text-center`}>
      <div className={wrap}>
        <h2
          id="tc-close-h"
          className="mx-auto max-w-[14ch] text-[clamp(44px,7vw,96px)] font-extrabold leading-[0.95] tracking-[-0.052em] text-zoe-ink [text-wrap:balance]"
        >
          Keep your Bible open. <Accent>Let Zoe help you open it.</Accent>
        </h2>
        <p className="mx-auto mb-[30px] mt-[22px] max-w-[48ch] text-[clamp(17px,1.5vw,19px)] font-medium text-zoe-muted">
          Zoe is here to help you read the Bible, not replace reading it. Try it, and tell us the truth about how it does.
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2.5">
          <Link href="/#waitlist" className={btnJade}>
            Join the waitlist
          </Link>
          <Link href="/churches" className={btnGhost}>
            Zoe for churches
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HowZoeTeachesPage() {
  return (
    <div className="bg-zoe-oat font-sans text-zoe-ink [&_:focus-visible]:rounded-lg [&_:focus-visible]:outline [&_:focus-visible]:outline-[3px] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:outline-zoe-sap">
      <main id="top">
        <Hero />
        <HonestAnswer />
        <TheText />
        <TheTheology />
        <TheMorning />
        <TheLines />
        <KeepingHonest />
        <Questions />
        <Close />
      </main>
      <Footer />
    </div>
  );
}
