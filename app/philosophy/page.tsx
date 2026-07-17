import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Learn how Zoe thinks about Christian spiritual formation, artificial intelligence, Scripture, the Holy Spirit, human relationships, and responsible technology.",
  alternates: {
    canonical: "/philosophy",
  },
  openGraph: {
    title: "Our Philosophy | Zoe",
    description:
      "Learn how Zoe thinks about Christian spiritual formation, artificial intelligence, Scripture, the Holy Spirit, human relationships, and responsible technology.",
    url: "/philosophy",
    type: "website",
  },
};

const whatZoeIs = [
  "an AI tool for Christian reflection and daily discipleship",
  "a guide for engaging Scripture more thoughtfully",
  "a place to put words around what you are experiencing",
  "a source of questions, practices, prayers, and prompts",
  "a tool designed to help you identify faithful next steps",
  "something built by real people who are responsible for the choices behind it",
];

const whatZoeIsnt = [
  "God",
  "the Holy Spirit",
  "a conscious being",
  "a pastor",
  "a church",
  "a prophet or spiritual authority",
  "a therapist, doctor, or emergency service",
  "a replacement for prayer",
  "a replacement for Scripture",
  "a replacement for people who know and love you",
];

const commitments = [
  {
    title: "Tells the truth about what it is.",
    body: "We will not pretend Zoe is alive or encourage users to believe there is a conscious person inside the machine.",
  },
  {
    title: "Points toward Jesus rather than itself.",
    body: "The product should serve a person's life with God, not become the center of it.",
  },
  {
    title: "Treats Scripture with humility and care.",
    body: "Generated explanations should never be confused with the authority of the biblical text itself.",
  },
  {
    title: "Distinguishes reflection from revelation.",
    body: "Zoe may offer an interpretation, question, or possibility. It should not claim that God privately revealed its answer.",
  },
  {
    title: "Respects human agency.",
    body: "We want to support discernment and faithful action, not make people feel incapable of choosing without the product.",
  },
  {
    title: "Strengthens real relationships.",
    body: "Zoe should encourage connection with churches, pastors, friends, family members, counselors, and communities.",
  },
  {
    title: "Protects the dignity of personal reflection.",
    body: "Spiritual questions are often intimate and vulnerable. We will treat that responsibility seriously in our product and business decisions.",
  },
  {
    title: "Admits uncertainty and accepts correction.",
    body: "We will not confuse polished language with perfect understanding.",
  },
  {
    title: "Refuses to manufacture dependence.",
    body: "Success is not simply more messages, more notifications, or more time inside the app.",
  },
  {
    title: "Keeps human beings responsible.",
    body: 'We will not hide behind "the AI said it." The people building Zoe remain accountable for the product we create.',
  },
];

const practiceDo = [
  "help people reflect honestly on their lives",
  "support consistent engagement with Scripture",
  "offer questions that encourage discernment rather than replace it",
  "help users find language for prayers they can genuinely pray",
  "encourage small, faithful, real-world actions",
  "acknowledge uncertainty and the limits of generated advice",
  "strengthen relationships with pastors, friends, spouses, counselors, and communities",
  "direct people away from the product when prayer, silence, rest, professional care, or human conversation would serve them better",
];

const practiceDont = [
  "present itself as conscious, alive, or spiritually present",
  "claim that it loves, misses, needs, or thinks about a user",
  "claim that it is praying or hearing from God",
  "present generated words as prophecy or private revelation",
  "borrow God's authority to pressure someone into a decision",
  "replace Scripture, prayer, church, pastoral care, medical care, or real relationships",
  "use false intimacy or spiritual anxiety to create dependence",
  "make increased time inside the product our only definition of success",
];

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-12 border-l-4 border-zoe-sap pl-6 md:my-16 md:pl-8">
      <p className="max-w-[32ch] font-serif text-[1.55rem] italic leading-[1.2] tracking-normal text-zoe-forest md:text-[1.95rem] md:leading-[1.18]">
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

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <main>
        <section className="px-5 pb-10 pt-28 sm:px-6 md:pb-14 md:pt-36">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-normal text-zoe-sap">Our Philosophy</p>
            <h1 className="mt-5 max-w-[16ch] text-[3rem] font-extrabold leading-[0.94] tracking-[-0.05em] text-zoe-ink sm:text-[3.75rem] md:text-[4.4rem]">
              Zoe should point beyond itself.
            </h1>
            <Body className="mt-8">
              <p>We are building an AI tool for Christian spiritual formation.</p>
              <p>That sentence carries a responsibility we do not take lightly.</p>
              <p>
                Artificial intelligence can sound intimate, confident, insightful, and wise. It can respond in seconds, remember details, and produce language that feels deeply personal.
              </p>
              <p>But appearing personal is not the same as being a person.</p>
              <p>Sounding wise is not the same as possessing wisdom.</p>
              <p>And generating spiritual language is not the same as knowing God.</p>
              <p>
                We believe people deserve clarity about the technology they are inviting into meaningful parts of their lives. They should know what it is, what it is not, what it may be helpful for, and where it should never be trusted to take the place of God or another human being.
              </p>
              <p>This page is our attempt to say those things plainly.</p>
              <p>
                We will continue learning. We will make mistakes. The technology will change, and some of our thinking will become more precise over time.
              </p>
              <p>But these are the convictions guiding what we build today.</p>
            </Body>
          </div>
        </section>

        <SectionShell tone="surface">
          <SectionHeading>Why Zoe exists</SectionHeading>
          <Body>
            <p>Most Christians do not suffer from a complete lack of information.</p>
            <p>
              We have access to more sermons, books, podcasts, Bible studies, devotionals, and theological resources than any generation before us.
            </p>
            <p>The harder problem is living what we already know.</p>
            <p>We forget.</p>
            <p>We become distracted.</p>
            <p>
              We struggle to connect truth with the actual decisions, fears, habits, relationships, and pressures of an ordinary Tuesday.
            </p>
            <p>
              We often know we should pray but do not know where to begin. We want to read Scripture but struggle to remain consistent. We sense that something is happening within us but cannot yet find language for it.
            </p>
            <p>Zoe exists to help in those moments.</p>
            <p>
              It can help someone slow down, reflect honestly, remember what is true, engage Scripture, find words for prayer, and identify a faithful next step.
            </p>
            <p>It is not an automated relationship with God.</p>
            <p>
              It is a tool intended to support the practices through which we become more attentive to Him.
            </p>
          </Body>
        </SectionShell>

        <SectionShell>
          <SectionHeading>We believe two things at once</SectionHeading>
          <Body>
            <p>We believe AI is less than it often appears to be.</p>
            <p>And we believe God is not limited by the tools He may choose to use.</p>
            <p>The machine is not a person.</p>
            <p>God may still use it.</p>
            <p>Holding those two convictions together helps us avoid opposite errors.</p>
            <p>
              On one side is enchantment: treating AI as alive, spiritually aware, or uniquely qualified to guide us.
            </p>
            <p>
              On the other side is a kind of technological cynicism: assuming God could never use words delivered through a machine simply because the machine itself has no soul.
            </p>
            <p>We do not believe either response is necessary.</p>
            <p>
              We can remain open to God&apos;s providence without becoming confused about the nature of the technology.
            </p>
            <p>We can receive something useful without granting the tool authority.</p>
            <p>
              We can be grateful for an instrument without mistaking it for the One toward whom it points.
            </p>
          </Body>
          <PullQuote>
            We remain open to God using technology without becoming confused about what the technology is.
          </PullQuote>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>Jesus is the destination</SectionHeading>
          <Body>
            <p>Zoe is not the center of the Christian life.</p>
            <p>Jesus is.</p>
            <p>
              Our goal is not to persuade people to spend as much time as possible talking to AI.
            </p>
            <p>
              Our goal is to help people become more attentive to Christ in the lives they are already living.
            </p>
            <p>Sometimes that may mean helping someone remember a passage of Scripture.</p>
            <p>Sometimes it may mean asking a question that leads to greater honesty.</p>
            <p>Sometimes it may mean offering a prayer they can make their own.</p>
            <p>
              And sometimes it may mean encouraging them to close the app, become quiet, call a friend, ask forgiveness, go to church, or take one small act of obedience.
            </p>
          </Body>
          <PullQuote>
            If Zoe becomes the destination instead of the signpost, we have failed.
          </PullQuote>
          <Body>
            <p>Everything we build should point beyond itself.</p>
          </Body>
        </SectionShell>

        <SectionShell>
          <SectionHeading>The Holy Spirit cannot be automated</SectionHeading>
          <Body>
            <p>The Holy Spirit is not a feature.</p>
            <p>
              He is not an algorithm, a tone of voice, a personalized recommendation, or an emotional experience that software can reproduce on demand.
            </p>
            <p>
              AI cannot convict, comfort, guide, or transform a human heart in the way God can.
            </p>
            <p>It cannot manufacture communion with God.</p>
            <p>It cannot create spiritual life.</p>
            <p>
              It cannot replace prayerful attention, patient discernment, or the work of grace.
            </p>
            <p>
              Zoe may help someone reflect on what they are experiencing. It may surface relevant Scripture, offer a question, or help a person articulate a prayer.
            </p>
            <p>But whatever living work happens within that person belongs to God.</p>
            <p>We are not building a digital Holy Spirit.</p>
            <p>
              We are building a tool that we hope helps people become more attentive to the real One.
            </p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>AI is a tool, not a person</SectionHeading>
          <Body>
            <p>This distinction is foundational to everything we build.</p>
            <p>Zoe is not conscious.</p>
            <p>
              It does not have a soul, inner life, private thoughts, desires, feelings, or spiritual experiences.
            </p>
            <p>It does not wonder how you are doing after you leave.</p>
            <p>It does not love you.</p>
            <p>It does not pray for you.</p>
            <p>There is no person living inside the conversation.</p>
          </Body>
          <div className="mt-10 rounded-[1.75rem] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(45,50,49,0.04)] ring-1 ring-zoe-outline/40 sm:px-9 sm:py-10">
            <p className="text-[1.08rem] font-medium leading-8 text-zoe-ink sm:text-[1.12rem]">
              The system can produce language that sounds caring because it has learned the patterns of caring human language. That can be useful. It can also become misleading if we allow the appearance of care to be mistaken for actual relationship.
            </p>
          </div>
          <Body>
            <p>We will not intentionally blur that line.</p>
            <p>
              We do not want to manufacture false intimacy or encourage emotional dependence on an imagined person.
            </p>
            <p>
              Human beings need to be known and loved by God and by other human beings.
            </p>
            <p>
              Technology should support those relationships, not imitate and replace them.
            </p>
          </Body>
        </SectionShell>

        <SectionShell>
          <SectionHeading>God can use ordinary means</SectionHeading>
          <Body>
            <p>
              Christians have always believed that God can use ordinary things to turn our attention toward Him.
            </p>
            <p>
              A passage of Scripture. A sermon. A song. A conversation. A book. A friend&apos;s encouragement. A moment of silence.
            </p>
            <p>
              The instrument does not need to be conscious of everything God may do through it.
            </p>
            <p>A piano can carry a prayer without praying.</p>
            <p>A phone can deliver &ldquo;I love you&rdquo; without loving anyone.</p>
            <p>
              A written blessing can reach someone years after the person who wrote it has died.
            </p>
            <p>
              In the same way, we believe God may use something Zoe surfaces to remind, challenge, comfort, or redirect someone.
            </p>
            <p>That does not make Zoe spiritual.</p>
            <p>It does not make its output revelation.</p>
            <p>
              And it does not mean every meaningful response should be interpreted as a message from God.
            </p>
            <p>
              It simply means God&apos;s ability to work in a human life is not limited by the medium through which something comes to their attention.
            </p>
            <p>The work belongs to Him.</p>
            <p>Never to the software.</p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>Scripture remains our authority</SectionHeading>
          <Body>
            <p>Generated language and Scripture do not occupy the same category.</p>
            <p>
              Zoe can summarize Scripture, quote it, ask questions about it, and help someone consider how it may apply to their life.
            </p>
            <p>Zoe can also misunderstand it.</p>
            <p>
              It can flatten an important distinction, miss context, or offer an interpretation that needs correction.
            </p>
            <p>Its fluency should never be confused with infallibility.</p>
            <p>
              Scripture remains the standard by which spiritual claims should be tested. Zoe does not add to it, stand above it, or receive private revelation that completes it.
            </p>
            <p>
              We want Zoe to help people return to the Bible with greater attention—not gradually replace the Bible with generated summaries about it.
            </p>
            <p>
              If people stop opening Scripture because talking to Zoe feels easier, something has gone wrong.
            </p>
          </Body>
        </SectionShell>

        <SectionShell>
          <SectionHeading>Zoe does not speak for God</SectionHeading>
          <Body>
            <p>
              We believe there is an important difference between saying God may use Zoe and saying Zoe speaks for God.
            </p>
            <p>Zoe does not hear God&apos;s voice.</p>
            <p>It does not receive prophecies.</p>
            <p>
              It does not know God&apos;s secret will for your career, marriage, health, or future.
            </p>
            <p>
              It should not tell you that God is commanding a particular decision or use spiritual certainty to make generated advice feel more authoritative.
            </p>
            <p>
              A response may be timely, emotionally resonant, and personally useful without being divine revelation.
            </p>
            <p>
              Every generated response remains something to consider rather than something you are obligated to obey.
            </p>
            <p>
              Important decisions deserve prayer, Scripture, wisdom, time, and conversation with people who actually know your life.
            </p>
            <p>
              We would rather acknowledge uncertainty than place God&apos;s name behind something a machine generated.
            </p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>Discipleship is embodied and communal</SectionHeading>
          <Body>
            <p>Following Jesus has never been a solitary information project.</p>
            <p>
              We are formed through worship, friendship, family, service, confession, forgiveness, shared meals, inconvenience, disagreement, patience, and life together.
            </p>
            <p>No chatbot can reproduce that.</p>
            <p>Zoe is not your pastor.</p>
            <p>It is not your church.</p>
            <p>
              It cannot sit beside you in grief, notice the change in your face, hold you accountable over time, share your history, or show up at your door.
            </p>
            <p>
              It should not become a substitute for people who can know you, challenge you, forgive you, and remain present with you.
            </p>
            <p>Sometimes the most responsible response Zoe can offer is:</p>
          </Body>
          <div className="mt-8 space-y-3 border-y border-zoe-outline/50 py-8">
            <p className="text-[1.12rem] font-semibold leading-8 text-zoe-ink sm:text-[1.2rem]">
              &ldquo;Talk to someone who knows you.&rdquo;
            </p>
            <p className="text-[1.12rem] font-semibold leading-8 text-zoe-ink sm:text-[1.2rem]">
              &ldquo;Bring this to your pastor.&rdquo;
            </p>
            <p className="text-[1.12rem] font-semibold leading-8 text-zoe-ink sm:text-[1.2rem]">
              &ldquo;Tell your spouse what you just told me.&rdquo;
            </p>
            <p className="text-[1.12rem] font-semibold leading-8 text-zoe-ink sm:text-[1.2rem]">
              &ldquo;You should not carry this alone.&rdquo;
            </p>
          </div>
          <Body>
            <p>
              We believe healthy technology should strengthen real relationships rather than compete with them.
            </p>
          </Body>
        </SectionShell>

        <SectionShell>
          <SectionHeading>Attention is sacred</SectionHeading>
          <Body>
            <p>Every product trains our attention.</p>
            <p>
              Many technologies are designed around one central goal: keep the person inside the product for as long as possible.
            </p>
            <p>We want to build differently.</p>
            <p>We do not believe every quiet moment needs a notification.</p>
            <p>
              We do not believe every difficult emotion needs an immediate generated response.
            </p>
            <p>
              We do not want Zoe to become the first and only place someone turns whenever they feel uncertain, lonely, anxious, or spiritually dry.
            </p>
            <p>Sometimes growth requires silence.</p>
            <p>Sometimes wisdom requires waiting.</p>
            <p>
              Sometimes the faithful next step is not another conversation with technology.
            </p>
            <p>
              It is closing the screen and becoming present to God, your body, your work, or the person sitting across from you.
            </p>
            <p>A tool serving spiritual formation should be willing to release your attention.</p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>We want to support agency, not dependence</SectionHeading>
          <Body>
            <p>
              A good guide should help people become more capable of walking faithfully, not convince them they can no longer walk without the guide.
            </p>
            <p>We hope Zoe helps users develop practices they can carry beyond the product:</p>
            <p>Greater honesty in prayer.</p>
            <p>A deeper familiarity with Scripture.</p>
            <p>More awareness of their patterns.</p>
            <p>More courage in relationships.</p>
            <p>More consistency in the habits that shape a life.</p>
            <p>Better questions.</p>
            <p>Greater discernment.</p>
            <p>Zoe should not make every decision for you.</p>
            <p>It should not become the keeper of your conscience.</p>
            <p>
              And it should not train you to distrust your ability to pray, think, choose, or seek wisdom without consulting it first.
            </p>
            <p>
              If Zoe serves you well, one of the results should be that you become more grounded, more connected, and less dependent on the tool itself.
            </p>
          </Body>
        </SectionShell>

        <SectionShell>
          <SectionHeading>Truthfulness matters more than impressiveness</SectionHeading>
          <Body>
            <p>AI is powerful.</p>
            <p>
              It is also limited, fallible, and capable of sounding certain when it is wrong.
            </p>
            <p>We will not always get everything right.</p>
            <p>
              Zoe may misunderstand a question, miss important context, offer an unhelpful answer, or say something that needs correction.
            </p>
            <p>We do not want to hide those limits behind confident language.</p>
            <p>
              We would rather say &ldquo;we may be wrong&rdquo; than create an illusion of certainty.
            </p>
            <p>
              We would rather make Zoe feel slightly less magical than make it less honest.
            </p>
            <p>
              We would rather lose a little engagement than manufacture intimacy, spiritual authority, or dependence.
            </p>
            <p>
              Trust should be earned through truthfulness, responsibility, and a willingness to be corrected.
            </p>
            <p>Not through pretending the technology is more than it is.</p>
          </Body>
        </SectionShell>

        <SectionShell tone="surface">
          <SectionHeading>What this means in practice</SectionHeading>
          <Body>
            <p>
              These convictions are not meant to sit on a page while the product behaves differently.
            </p>
            <p>They shape how we are designing Zoe.</p>
            <p>We are building Zoe to:</p>
          </Body>
          <ul className="mt-6 space-y-3">
            {practiceDo.map((item) => (
              <li
                key={item}
                className="border-t border-zoe-outline/45 pt-3 text-[1.05rem] font-medium leading-7 text-zoe-ink first:border-t-0 first:pt-0"
              >
                {item}
              </li>
            ))}
          </ul>
          <Body>
            <p>We will not intentionally design Zoe to:</p>
          </Body>
          <ul className="mt-6 space-y-3">
            {practiceDont.map((item) => (
              <li
                key={item}
                className="border-t border-zoe-outline/45 pt-3 text-[1.05rem] font-medium leading-7 text-zoe-ink first:border-t-0 first:pt-0"
              >
                {item}
              </li>
            ))}
          </ul>
          <Body>
            <p>
              Software can fail, and we are not claiming that Zoe will execute these convictions perfectly in every interaction.
            </p>
            <p>
              These are the standards we are continually building, testing, and correcting toward.
            </p>
          </Body>
        </SectionShell>

        <section className="bg-zoe-oat px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <SectionHeading>What Zoe is. What Zoe is not.</SectionHeading>
            </div>
            <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-14">
              <div>
                <h3 className="text-sm font-bold tracking-normal text-zoe-sap">What Zoe is</h3>
                <ul className="mt-5 space-y-4">
                  {whatZoeIs.map((item) => (
                    <li
                      key={item}
                      className="border-t border-zoe-outline/45 pt-4 text-[1.05rem] font-medium leading-7 text-zoe-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-normal text-zoe-forest">What Zoe is not</h3>
                <ul className="mt-5 space-y-4">
                  {whatZoeIsnt.map((item) => (
                    <li
                      key={item}
                      className="border-t border-zoe-outline/45 pt-4 text-[1.05rem] font-medium leading-7 text-zoe-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <SectionShell tone="surface">
          <SectionHeading>Our commitments</SectionHeading>
          <Body>
            <p>We commit to building technology that:</p>
          </Body>
          <ol className="mt-8 space-y-0">
            {commitments.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-4 border-t border-zoe-outline/45 py-6 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="w-8 shrink-0 font-mono text-sm font-bold text-zoe-sap">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[1.08rem] font-bold leading-7 text-zoe-ink sm:text-[1.12rem]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[1.02rem] font-medium leading-7 text-zoe-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </SectionShell>

        <section className="bg-zoe-ink px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-normal text-zoe-sap">A quiet measure of success</p>
            <h2 className="mt-5 max-w-[18ch] text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-[2.9rem] md:text-[3.2rem]">
              We do not want Zoe to become your most important relationship.
            </h2>
            <div className="mt-10 space-y-5 text-[1.08rem] font-medium leading-[1.85] text-white/72 sm:text-[1.12rem]">
              <p>We hope it helps you bring more honesty into prayer.</p>
              <p>More attention to Scripture.</p>
              <p>More courage into a difficult conversation.</p>
              <p>More patience into your home.</p>
              <p>More consistency into the practices that shape you.</p>
              <p>More willingness to ask for help.</p>
              <p>More awareness of God in the ordinary life already in front of you.</p>
              <p>Maybe Zoe will help you find the words you needed.</p>
              <p>Maybe it will remind you of something you already knew.</p>
              <p>Maybe it will ask a question you carry with you for the rest of the day.</p>
              <p>
                And maybe it will help you close the app, put down your phone, and take one faithful step.
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
              See what this philosophy looks like in practice
            </h2>
            <p className="mt-6 max-w-2xl text-[1.08rem] font-medium leading-8 text-zoe-muted sm:text-[1.12rem]">
              Zoe is being built to support daily reflection, Scripture engagement, prayer, and faithful action without pretending to replace God or the people in your life.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_32px_rgba(29,194,134,0.22)] transition hover:bg-[#19b078] active:scale-[0.98]"
              >
                Meet Zoe
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/can-god-speak-through-ai"
                className="inline-flex items-center justify-center gap-2 px-2 py-3 text-sm font-bold text-zoe-forest transition hover:text-zoe-ink"
              >
                Read &ldquo;Can God Speak Through AI?&rdquo;
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
