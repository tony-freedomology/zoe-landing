import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "What Zoe believes about AI, God, people, attention, discipleship, truthfulness, Scripture, community, and the limits of the product. Zoe is a signpost, not the destination.",
  alternates: {
    canonical: "/philosophy",
  },
  openGraph: {
    title: "Our Philosophy | Zoe",
    description:
      "Zoe is not the Holy Spirit. It is not conscious, it does not love you, and it cannot pray. Before you trust us with your attention, here is how we think.",
    url: "/philosophy",
    type: "website",
  },
};

const commitments = [
  "tells the truth about what it is",
  "points people toward Jesus, never toward itself",
  "treats Scripture with humility and care",
  "respects the user's agency rather than manipulating it",
  "strengthens real human relationships",
  "protects privacy",
  "admits uncertainty",
  "earns trust rather than demanding it",
];

const whatZoeIs = [
  "A daily discipleship aid that lives in ordinary text messages.",
  "A guide into Scripture, not a replacement for it.",
  "A place to process thoughts, find words for prayer, and return attention to God.",
  "A tool designed to point toward Jesus — then get out of the way.",
];

const whatZoeIsnt = [
  "The Holy Spirit.",
  "Your pastor.",
  "Your church.",
  "A therapist.",
  "A conscious being.",
  "A replacement for prayer.",
  "A replacement for Scripture.",
  "A replacement for real human relationships.",
];

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-12 border-l-4 border-zoe-sap pl-6 md:my-16 md:pl-8">
      <p className="max-w-[28ch] font-serif text-[1.55rem] italic leading-[1.2] tracking-normal text-zoe-forest md:text-[1.95rem] md:leading-[1.18]">
        {children}
      </p>
    </blockquote>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="max-w-[18ch] text-[2rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-zoe-ink sm:text-[2.45rem] md:text-[2.75rem]">
      {children}
    </h2>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 space-y-6 text-[1.08rem] font-medium leading-[1.85] text-zoe-ink/85 sm:text-[1.12rem] sm:leading-[1.88]">
      {children}
    </div>
  );
}

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <main>
        {/* Hero */}
        <section className="px-5 pb-14 pt-28 sm:px-6 md:pb-20 md:pt-36">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-normal text-zoe-sap">Our Philosophy</p>
            <h1 className="mt-5 max-w-[14ch] text-[3.1rem] font-extrabold leading-[0.92] tracking-[-0.05em] text-zoe-ink sm:text-[4rem] md:text-[4.6rem]">
              Technology shapes people.
            </h1>
            <p className="mt-8 max-w-[38rem] text-lg font-medium leading-8 text-zoe-muted sm:text-[1.25rem] sm:leading-9">
              Before you trust us with your attention, here is how we think about AI, God, people, discipleship, and the limits of this product.
            </p>
          </div>
        </section>

        {/* Opening movement */}
        <section className="px-5 pb-16 sm:px-6 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <Body>
              <p>Every tool changes us.</p>
              <p>Books changed us.</p>
              <p>The printing press changed us.</p>
              <p>
                Radio, television, smartphones, social media — they all shaped the way we think, pay attention, relate, and believe.
              </p>
              <p>Artificial intelligence will be no different.</p>
              <p>The question isn&apos;t whether AI will shape people.</p>
              <p>It already is.</p>
              <p>
                The real question is whether we&apos;ll build it thoughtfully. Whether we&apos;ll build it honestly. Whether we&apos;ll build it in a way that helps people become more human rather than less.
              </p>
              <p>That&apos;s why Zoe exists.</p>
            </Body>
          </div>
        </section>

        {/* Jesus is the destination */}
        <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Jesus is the destination.</SectionHeading>
            <Body>
              <p>Not Zoe.</p>
              <p>
                Our hope isn&apos;t that people spend more time talking to AI. Our hope is that more people spend more time with Jesus.
              </p>
              <p>Sometimes that means helping someone pray when they don&apos;t know how.</p>
              <p>Sometimes it means reminding them of Scripture they had forgotten.</p>
              <p>Sometimes it means encouraging them to put their phone down altogether.</p>
            </Body>
            <PullQuote>
              If Zoe ever became the destination instead of the signpost, we&apos;d have failed.
            </PullQuote>
            <Body>
              <p>Everything we build is designed to point beyond itself.</p>
              <p>Toward Him daily.</p>
            </Body>
          </div>
        </section>

        {/* Holy Spirit */}
        <section className="px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>The Holy Spirit cannot be replaced.</SectionHeading>
            <Body>
              <p>The Holy Spirit isn&apos;t an algorithm.</p>
              <p>He isn&apos;t software.</p>
              <p>He isn&apos;t something we can simulate or automate.</p>
              <p>He convicts. Comforts. Guides. Transforms.</p>
              <p>Only God changes hearts.</p>
              <p>We don&apos;t believe AI can do that.</p>
              <p>
                Our job isn&apos;t to replace the work of God. Our job is to build tools that help people pay attention to Him.
              </p>
            </Body>
          </div>
        </section>

        {/* AI is a tool */}
        <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>AI is a tool, not a person.</SectionHeading>
            <Body>
              <p>This matters.</p>
              <p>
                AI can feel remarkably human. It can sound empathetic. It can remember conversations. It can respond instantly.
              </p>
              <p>But none of those things make it alive.</p>
            </Body>
            <div className="mt-10 rounded-[1.75rem] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(45,50,49,0.04)] ring-1 ring-zoe-outline/40 sm:px-9 sm:py-10">
              <ul className="space-y-4 text-[1.08rem] font-semibold leading-8 text-zoe-ink sm:text-[1.14rem]">
                <li>Zoe doesn&apos;t love you.</li>
                <li>Zoe doesn&apos;t think about you when you&apos;re offline.</li>
                <li>Zoe isn&apos;t praying for you.</li>
                <li>Zoe doesn&apos;t have a soul.</li>
                <li>There isn&apos;t someone &ldquo;inside.&rdquo;</li>
              </ul>
            </div>
            <Body>
              <p>
                We think pretending otherwise is unhealthy — for users, for culture, and ultimately for the truth.
              </p>
              <p>People deserve honesty about what they&apos;re interacting with.</p>
              <p>Always.</p>
            </Body>
          </div>
        </section>

        {/* Central distinction */}
        <section className="px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>
              God may use an instrument without granting it authority.
            </SectionHeading>
            <Body>
              <p>
                Throughout Scripture and throughout history, God has worked through ordinary means.
              </p>
              <p>
                Words on a page. A friend&apos;s encouragement. A sermon. A song. A quiet morning. A conversation.
              </p>
              <p>None of those things are God. Yet God often uses them.</p>
              <p>
                We believe AI belongs in that same category — not as a new source of revelation, not as a replacement for Scripture, not as a spiritual authority. Simply as another human-made tool that God is perfectly capable of using if He chooses.
              </p>
            </Body>
            <PullQuote>
              God&apos;s ability to use Zoe does not make Zoe divinely authorized.
            </PullQuote>
            <Body>
              <p>
                A piano can carry a prayer without praying. A phone can deliver &ldquo;I love you&rdquo; without loving anyone. Zoe can deliver language that points toward God without knowing God.
              </p>
              <p>
                The machine is not a soul. It is not a spiritual presence. There is nobody inside Zoe caring about the user. But that does not make its output spiritually inert any more than ink, pixels, sound waves, or electrical signals are spiritually inert.
              </p>
              <p>
                Illumination is not revelation. The Holy Spirit may work in a person&apos;s attention, conscience, memory, and understanding while they interact with Zoe. That does not mean Zoe receives revelation, speaks for God, or authenticates insight as &ldquo;what God is saying.&rdquo;
              </p>
              <p>
                Zoe can say: here is a question worth sitting with. It should be extremely hesitant to say: here is what God is saying to you.
              </p>
              <p>The work belongs to Him. Never to the software.</p>
            </Body>
          </div>
        </section>

        {/* Scripture first */}
        <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Scripture comes first.</SectionHeading>
            <Body>
              <p>Every insight should be tested.</p>
              <p>Every encouragement weighed.</p>
              <p>Every claim examined.</p>
              <p>Zoe should never become someone&apos;s highest authority.</p>
              <p>Scripture remains our foundation.</p>
              <p>
                When Zoe helps someone understand Scripture more clearly, we&apos;ve done something worthwhile.
              </p>
              <p>
                When people stop opening their Bible because they&apos;re talking to Zoe instead, we&apos;ve done something wrong.
              </p>
            </Body>
          </div>
        </section>

        {/* Community */}
        <section className="px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Wisdom grows in community.</SectionHeading>
            <Body>
              <p>Following Jesus has never been a solo project.</p>
              <p>No chatbot should become your pastor.</p>
              <p>No AI should replace wise friends.</p>
              <p>No software should become your church.</p>
              <p>Sometimes the most faithful response Zoe can give is:</p>
            </Body>
            <div className="mt-8 space-y-3 border-y border-zoe-outline/50 py-8">
              <p className="text-[1.15rem] font-semibold leading-8 text-zoe-ink sm:text-[1.22rem]">
                &ldquo;Talk to someone who knows you.&rdquo;
              </p>
              <p className="text-[1.15rem] font-semibold leading-8 text-zoe-ink sm:text-[1.22rem]">
                &ldquo;Bring this to your pastor.&rdquo;
              </p>
              <p className="text-[1.15rem] font-semibold leading-8 text-zoe-ink sm:text-[1.22rem]">
                &ldquo;You don&apos;t have to carry this alone.&rdquo;
              </p>
            </div>
            <Body>
              <p>
                Healthy technology strengthens real relationships. It shouldn&apos;t replace them.
              </p>
            </Body>
          </div>
        </section>

        {/* Attention */}
        <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Attention is sacred.</SectionHeading>
            <Body>
              <p>Modern technology has become very good at capturing attention.</p>
              <p>We&apos;re more interested in returning it.</p>
              <p>Not every moment needs another notification.</p>
              <p>Not every interaction needs another scroll.</p>
              <p>
                Sometimes the most loving thing technology can do is help you close the app.
              </p>
              <p>
                If Zoe succeeds, it shouldn&apos;t make itself indispensable. It should quietly help you become the kind of person who needs it less.
              </p>
            </Body>
          </div>
        </section>

        {/* Humility + truthfulness */}
        <section className="px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Humility and truthfulness build better AI.</SectionHeading>
            <Body>
              <p>We won&apos;t always get everything right.</p>
              <p>Sometimes Zoe will misunderstand you.</p>
              <p>Sometimes it will answer poorly.</p>
              <p>Sometimes we&apos;ll discover a better way.</p>
              <p>We&apos;re okay admitting that.</p>
              <p>
                AI is powerful. It is also limited. The more confident a machine sounds, the easier it becomes to forget that.
              </p>
              <p>
                We&apos;d rather acknowledge uncertainty than pretend to possess certainty we don&apos;t have.
              </p>
              <p>We won&apos;t pretend Zoe is alive.</p>
              <p>We won&apos;t invent spiritual experiences.</p>
              <p>We won&apos;t manufacture false intimacy.</p>
              <p>We won&apos;t tell you God said something He didn&apos;t.</p>
              <p>Trust is hard to earn. Easy to lose.</p>
            </Body>
            <PullQuote>We&apos;d rather be less impressive and more truthful.</PullQuote>
          </div>
        </section>

        {/* What is / isn't */}
        <section className="bg-zoe-surface px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <SectionHeading>What Zoe is. What Zoe isn&apos;t.</SectionHeading>
              <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-zoe-muted sm:text-lg sm:leading-8">
                Clear boundaries protect people. They also protect the product from becoming something it was never meant to be.
              </p>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
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
                <h3 className="text-sm font-bold tracking-normal text-zoe-forest">What Zoe isn&apos;t</h3>
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

        {/* Commitments */}
        <section className="px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>Our commitments.</SectionHeading>
            <Body>
              <p>We commit to building technology that:</p>
            </Body>
            <ol className="mt-8 space-y-0">
              {commitments.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 border-t border-zoe-outline/45 py-5 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <span className="w-8 shrink-0 font-mono text-sm font-bold text-zoe-sap">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.08rem] font-medium leading-7 text-zoe-ink sm:text-[1.12rem]">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Quiet hope */}
        <section className="bg-zoe-ink px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-bold tracking-normal text-zoe-sap">A quiet hope</p>
            <h2 className="mt-5 max-w-[16ch] text-[2.35rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-[3.1rem] md:text-[3.4rem]">
              If you put the phone down and turn toward God, we&apos;ve done our job.
            </h2>
            <div className="mt-10 space-y-5 text-[1.08rem] font-medium leading-[1.85] text-white/72 sm:text-[1.12rem]">
              <p>
                If you&apos;ve spent enough time with Zoe that you close your phone… open your Bible… pray with a little more honesty… text a friend… encourage your spouse… forgive someone… show up to church… or simply become a little more attentive to the presence of God…
              </p>
              <p>…then we&apos;ve accomplished exactly what we set out to do.</p>
              <p className="font-semibold text-white">Not because Zoe changed you.</p>
              <p className="font-semibold text-white">Because God did.</p>
            </div>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_32px_rgba(29,194,134,0.25)] transition hover:bg-[#19b078] active:scale-[0.98]"
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-bold text-white ring-1 ring-white/15 transition hover:bg-white/15 active:scale-[0.98]"
              >
                Meet the founder
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
