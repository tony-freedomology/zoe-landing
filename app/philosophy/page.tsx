import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";
import ZoeLifeTerm from "../../components/ZoeLifeTerm";
import { headingAccent } from "../../components/home/styles";
import { withSocial } from "../../lib/seo";

export const metadata: Metadata = withSocial({
  title: "Our Philosophy",
  description:
    "How Zoe thinks about AI, Scripture, the Holy Spirit, and real relationships. Zoe should point beyond itself, toward Jesus and the people in your life.",
  alternates: {
    canonical: "/philosophy",
  },
});

// The short version, near the top for skimmers. The sections below make the
// case; the day-to-day rules live on /how-zoe-teaches, so this page links there
// instead of repeating them.
const whatZoeIs = [
  "an AI tool for Christian reflection and daily discipleship",
  "a guide for engaging Scripture more thoughtfully",
  "a place to put words around what you are experiencing",
  "a source of questions, practices, and prayers you can make your own",
  "something built by real people who are responsible for the choices behind it",
];

const whatZoeIsnt = [
  "God, the Holy Spirit, or a conscious being",
  "a pastor, a church, or a spiritual authority",
  "a prophet, or a voice that speaks for God",
  "a therapist, doctor, or emergency service",
  "a replacement for prayer, Scripture, or the people who know and love you",
];

/** Accent phrase: jade stroke inside the h1, mint marker everywhere else. */
function Accent({ children }: { children: ReactNode }) {
  return <em className={headingAccent}>{children}</em>;
}

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-12 rounded-[1.5rem] bg-white px-7 py-7 shadow-[0_14px_34px_rgba(45,50,49,0.07)] md:my-16">
      <p className="max-w-[32ch] text-[1.45rem] font-extrabold leading-[1.22] tracking-[-0.03em] text-zoe-ink md:text-[1.85rem]">
        {children}
      </p>
    </blockquote>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="max-w-[20ch] text-[2rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-zoe-ink sm:text-[2.45rem] md:text-[2.75rem]">
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mt-8 space-y-6 text-[1.08rem] font-medium leading-[1.85] text-zoe-ink/85 sm:text-[1.12rem] sm:leading-[1.88] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionShell({
  children,
  tone = "oat",
}: {
  children: ReactNode;
  tone?: "oat" | "surface";
}) {
  return (
    <section
      className={
        tone === "surface"
          ? "bg-zoe-surface px-5 py-16 sm:px-6 md:py-24"
          : "bg-zoe-oat px-5 py-16 sm:px-6 md:py-24"
      }
    >
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

function CheckList({ items, tone }: { items: string[]; tone: "is" | "isnt" }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3.5 rounded-2xl bg-white px-4 py-3.5 text-[1.02rem] font-semibold leading-6 text-zoe-ink ring-1 ring-zoe-outline/40"
        >
          <span
            aria-hidden="true"
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-extrabold text-white ${
              tone === "is" ? "bg-zoe-sap text-[0.8rem]" : "bg-zoe-ink text-[0.95rem]"
            }`}
          >
            {tone === "is" ? "✓" : "×"}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <main>
        <section className="px-5 pb-10 pt-28 sm:px-6 md:pb-14 md:pt-36">
          <div className="mx-auto max-w-3xl">
            <p className="flex items-center gap-2.5 text-sm font-bold text-zoe-muted">
              <Link href="/about" className="text-zoe-forest hover:underline">About</Link>
              <span aria-hidden="true">/</span>
              <span className="rounded-full bg-[#E4F6EE] px-3 py-1 text-[0.8rem] text-zoe-forest">Our Philosophy</span>
            </p>
            <h1 className="mt-5 max-w-[16ch] text-[3rem] font-extrabold leading-[0.94] tracking-[-0.05em] text-zoe-ink sm:text-[3.75rem] md:text-[4.4rem]">
              Zoe should point <Accent>beyond itself.</Accent>
            </h1>
            <Body className="mt-8">
              <p>
                We are building an AI tool for Christian spiritual formation. That sentence carries a responsibility we do
                not take lightly.
              </p>
              <p>
                AI can sound intimate, confident, and wise. It can respond in seconds, remember details, and produce language
                that feels deeply personal. But appearing personal is not the same as being a person. Sounding wise is not the
                same as possessing wisdom. And generating spiritual language is not the same as knowing God.
              </p>
              <p>
                You deserve clarity about the technology you invite into meaningful parts of your life: what it is, what it
                isn&apos;t, what it may help with, and where it should never be trusted to take the place of God or another
                human being. This page is our attempt to say those things plainly.
              </p>
              <p>
                We will keep learning, and we will make mistakes. But these are the convictions guiding what we build today.
              </p>
            </Body>
          </div>
        </section>

        <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <SectionHeading>The short version</SectionHeading>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#E4F6EE] p-5 sm:p-6">
                <h3 className="text-xl font-extrabold tracking-[-0.02em] text-zoe-ink">What Zoe is</h3>
                <CheckList items={whatZoeIs} tone="is" />
              </div>
              <div className="rounded-[1.5rem] bg-[#EEF0EC] p-5 sm:p-6">
                <h3 className="text-xl font-extrabold tracking-[-0.02em] text-zoe-ink">What Zoe is not</h3>
                <CheckList items={whatZoeIsnt} tone="isnt" />
              </div>
            </div>
          </div>
        </section>

        <SectionShell>
          <SectionHeading>Why Zoe exists</SectionHeading>
          <Body>
            <p>
              Most Christians don&apos;t suffer from a lack of information. We have more sermons, books, podcasts, and Bible
              studies than any generation before us.
            </p>
            <p>The harder problem is living what we already know.</p>
            <p>
              We forget. We get distracted. We struggle to connect truth with the actual decisions, fears, habits, and
              relationships of an ordinary Tuesday. We know we should pray but don&apos;t know where to begin. We want to read
              Scripture but struggle to stay consistent.
            </p>
            <p>
              Zoe exists to help in those moments: to help someone slow down, reflect honestly, engage Scripture, find words
              for prayer, and take a faithful next step.
            </p>
            <p>
              It is not an automated relationship with God. It is a tool meant to support the practices through which we
              become more attentive to Him.
            </p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>
            The machine is not a person. <Accent>God may still use it.</Accent>
          </SectionHeading>
          <Body>
            <p>We hold two convictions together, and both matter.</p>
            <p>
              <b className="font-extrabold text-zoe-ink">The first: AI is a tool, not a person.</b> Zoe is not conscious. It
              has no soul, inner life, feelings, or spiritual experiences. It does not wonder how you&apos;re doing after you
              leave. It does not love you, and it does not pray for you.
            </p>
            <p>
              It can produce language that sounds caring because it learned the patterns of caring human language. That can
              be useful. It becomes misleading when the appearance of care is mistaken for relationship, so we will not blur
              that line or manufacture intimacy with an imagined person.
            </p>
            <p>
              <b className="font-extrabold text-zoe-ink">The second: God is not limited by the tools He may choose to use.</b>{" "}
              Christians have always believed God uses ordinary things to turn our attention toward Him: a sermon, a song, a
              friend&apos;s encouragement, a moment of silence.
            </p>
            <p>
              A piano can carry a prayer without praying. A phone can deliver &ldquo;I love you&rdquo; without loving
              anyone. In the same way, God may use something Zoe surfaces to remind, challenge, comfort, or redirect someone.
            </p>
            <p>
              That doesn&apos;t make Zoe spiritual, and it doesn&apos;t make its words revelation. It means God&apos;s work in
              a human life isn&apos;t limited by the medium something arrived through. The work belongs to Him. Never to the
              software.
            </p>
          </Body>
          <PullQuote>
            We can be grateful for an instrument without mistaking it for the One toward whom it points.
          </PullQuote>
        </SectionShell>

        <SectionShell>
          <SectionHeading>
            The Holy Spirit <Accent>cannot be automated</Accent>
          </SectionHeading>
          <Body>
            <p>
              The Holy Spirit is not a feature. He is not an algorithm, a tone of voice, or an emotional experience software
              can reproduce on demand.
            </p>
            <p>
              AI cannot convict, comfort, or transform a human heart the way God can. It cannot manufacture communion with
              God or create spiritual life.
            </p>
            <p>
              Zoe may surface a passage, offer a question, or help someone put a prayer into words. But whatever living work
              happens in that person belongs to God.
            </p>
            <p>
              We are not building a digital Holy Spirit. We are building a tool we hope helps people pay attention to the real
              One.
            </p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>
            Jesus is <Accent>the destination</Accent>
          </SectionHeading>
          <Body>
            <p>
              Zoe (the app) is not the center of the Christian life. Jesus, and the <ZoeLifeTerm>zōē</ZoeLifeTerm> life He
              offers, is.
            </p>
            <p>
              Our goal isn&apos;t to get people to spend as much time as possible talking to AI. It&apos;s to help them become
              more attentive to Christ in the lives they&apos;re already living.
            </p>
            <p>
              Sometimes that means helping someone remember a passage, or asking a question that leads to more honesty.
              Sometimes it means encouraging them to put the phone down, call a friend, ask forgiveness, go to church, or take
              one small step of obedience.
            </p>
          </Body>
          <PullQuote>
            If Zoe becomes the destination instead of <Accent>the signpost,</Accent> we have failed.
          </PullQuote>
        </SectionShell>

        <SectionShell>
          <SectionHeading>
            Scripture has authority. <Accent>Zoe doesn&apos;t.</Accent>
          </SectionHeading>
          <Body>
            <p>Generated language and Scripture do not belong in the same category.</p>
            <p>
              Zoe can quote Scripture, ask questions about it, and help someone consider how it applies to their life. Zoe can
              also misunderstand it: flatten a distinction, miss context, or offer an interpretation that needs correcting.
              Its fluency should never be confused with infallibility.
            </p>
            <p>
              Scripture remains the standard every spiritual claim is tested by. Zoe doesn&apos;t add to it, stand above it,
              or receive private revelation that completes it.
            </p>
            <p>
              That&apos;s also why Zoe does not speak for God. It doesn&apos;t hear His voice, receive prophecies, or know His
              will for your career, marriage, or future. It should never tell you God is commanding a decision, or borrow His
              authority to make generated advice feel weightier.
            </p>
            <p>
              A response can be timely and genuinely useful without being revelation. Every word Zoe writes is something to
              consider, not something to obey. Important decisions deserve prayer, Scripture, time, and conversation with
              people who actually know your life.
            </p>
            <p>
              If people stop opening their Bibles because talking to Zoe feels easier, something has gone wrong.
            </p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>Discipleship is embodied and communal</SectionHeading>
          <Body>
            <p>
              Following Jesus has never been a solitary information project. We are formed through worship, friendship,
              family, service, confession, shared meals, disagreement, patience, and life together. No chatbot can reproduce
              that.
            </p>
            <p>
              Zoe is not your pastor or your church. It cannot sit beside you in grief, notice the change in your face, share
              your history, or show up at your door.
            </p>
            <p>Sometimes the most responsible thing Zoe can say is:</p>
          </Body>
          <div className="mt-8 space-y-3 border-y border-zoe-outline/50 py-8">
            {[
              "Talk to someone who knows you.",
              "Bring this to your pastor.",
              "Tell your spouse what you just told me.",
              "You should not carry this alone.",
            ].map((line) => (
              <p key={line} className="text-[1.12rem] font-semibold leading-8 text-zoe-ink sm:text-[1.2rem]">
                &ldquo;{line}&rdquo;
              </p>
            ))}
          </div>
          <Body>
            <p>Healthy technology should strengthen real relationships, not compete with them.</p>
          </Body>
        </SectionShell>

        <SectionShell>
          <SectionHeading>
            Built to give your attention <Accent>back</Accent>
          </SectionHeading>
          <Body>
            <p>
              Every product trains our attention, and most are designed to keep you inside them as long as possible. We want
              to build differently.
            </p>
            <p>
              Not every quiet moment needs a notification. Not every hard emotion needs an instant generated response. We
              don&apos;t want Zoe to become the first and only place someone turns whenever they feel uncertain, lonely, or
              spiritually dry.
            </p>
            <p>
              Sometimes growth requires silence, and wisdom requires waiting. Sometimes the faithful next step is closing the
              screen and becoming present to God, your work, or the person across the table.
            </p>
            <p>
              A good guide helps you walk more faithfully on your own. It doesn&apos;t convince you that you can&apos;t walk
              without it. So Zoe shouldn&apos;t make your decisions, become the keeper of your conscience, or train you to
              distrust your own ability to pray, think, and choose.
            </p>
            <p>If Zoe serves you well, you should end up more grounded, more connected, and less dependent on the tool.</p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>Truthfulness matters more than impressiveness</SectionHeading>
          <Body>
            <p>
              AI is powerful. It is also fallible, and capable of sounding certain when it&apos;s wrong. Zoe will sometimes
              misunderstand a question, miss context, or say something that needs correcting.
            </p>
            <p>
              We&apos;d rather say &ldquo;we may be wrong&rdquo; than create an illusion of certainty. We&apos;d rather make
              Zoe feel a little less magical than make it less honest. And we&apos;d rather lose some engagement than
              manufacture intimacy, spiritual authority, or dependence.
            </p>
            <p>
              Spiritual questions are intimate and vulnerable, and we treat that trust as a real responsibility, in the product
              and in our business decisions.
            </p>
            <p>
              And we won&apos;t hide behind &ldquo;the AI said it.&rdquo; The people building Zoe stay accountable for what we
              make.
            </p>
          </Body>
        </SectionShell>

        <section className="bg-zoe-ink px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-normal text-zoe-sap">A quiet measure of success</p>
            <h2 className="mt-5 max-w-[18ch] text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-[2.9rem] md:text-[3.2rem]">
              We do not want Zoe to become your most important relationship.
            </h2>
            <div className="mt-10 space-y-5 text-[1.08rem] font-medium leading-[1.85] text-white/75 sm:text-[1.12rem]">
              <p>
                We hope it helps you bring more honesty into prayer, more attention to Scripture, more courage into a hard
                conversation, and more patience into your home.
              </p>
              <p>
                Maybe Zoe will help you find the words you needed. Maybe it will ask a question you carry with you all day. And
                maybe it will help you put down your phone and take one faithful step.
              </p>
              <p>If that happens, Zoe has done its job.</p>
              <p className="font-semibold text-white">Not because the software changed you.</p>
              <p className="font-semibold text-white">
                Because God is at work, and the tool knew how to get out of the way.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="max-w-[18ch] text-[2rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-zoe-ink sm:text-[2.5rem]">
              See what this looks like <Accent>in practice</Accent>
            </h2>
            <p className="mt-6 max-w-2xl text-[1.08rem] font-medium leading-8 text-zoe-muted sm:text-[1.12rem]">
              These convictions aren&apos;t meant to sit on a page while the product does something else. See how they turn
              into the actual rules Zoe runs on: where its verses come from, what it believes, and the lines it
              won&apos;t cross.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/how-zoe-teaches"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_32px_rgba(29,194,134,0.22)] transition hover:bg-[#19b078] active:scale-[0.98]"
              >
                How Zoe handles the Bible
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/can-god-speak-through-ai"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-zoe-ink ring-1 ring-zoe-outline/60 transition hover:-translate-y-0.5"
              >
                Read &ldquo;Can God Speak Through AI?&rdquo;
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#waitlist" className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-bold text-zoe-forest hover:underline">
                Meet Zoe
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
