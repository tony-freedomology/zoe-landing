import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, HeartHandshake, LockKeyhole, MessageCircle } from "lucide-react";
import Footer from "../../components/Footer";

const socialImage = "https://cdn.jsdelivr.net/gh/tony-freedomology/zoe-landing@master/public/images/zoe-og.png";

export const metadata: Metadata = {
  title: "Zoe for Churches — Help Sunday carry into the week",
  description:
    "Zoe helps people put Sunday’s teaching into practice during the week, while giving pastors a privacy-minded view of the themes that may need attention.",
  alternates: { canonical: "/churches" },
  openGraph: {
    title: "Zoe for Churches — Help Sunday carry into the week",
    description:
      "Help people carry Sunday’s teaching into ordinary life, with a privacy-minded brief for pastors.",
    url: "/churches",
    type: "website",
    images: [{ url: socialImage, width: 1731, height: 909, alt: "Zoe SMS rhythm with Jesus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoe for Churches — Help Sunday carry into the week",
    description:
      "Help people carry Sunday’s teaching into ordinary life, with a privacy-minded brief for pastors.",
    images: [socialImage],
  },
};

const dashboardUrl = process.env.NEXT_PUBLIC_CHURCH_DASHBOARD_URL ?? "https://church.zoe.live";

const rhythm = [
  {
    number: "01",
    day: "Sunday",
    title: "The pastor teaches",
    body: "Zoe learns the main ideas and practices the pastor wants people to carry into the week.",
  },
  {
    number: "02",
    day: "During the week",
    title: "People text naturally",
    body: "They ask questions, reflect, pray, and try small faithful practices in the same text thread they already use.",
  },
  {
    number: "03",
    day: "Along the way",
    title: "Zoe follows through",
    body: "Zoe remembers the conversation and gently returns to what each person said they wanted to do.",
  },
  {
    number: "04",
    day: "Before Sunday",
    title: "The pastor sees what matters",
    body: "Shared patterns, possible confusion, practices people are trying, and places where a personal follow-up may help.",
  },
];

const differences = [
  ["It carries context forward.", "The conversation does not restart every morning."],
  ["It turns teaching into practice.", "A sermon becomes something a person can return to during a real week."],
  ["It can point toward human care.", "When a conversation needs a real person, Zoe encourages that next step instead of trying to replace it."],
];

const privacy = [
  ["Private texts stay private by default.", "Church leaders do not get a searchable view of private conversations. A person can still choose to share something specific."],
  ["Pastors get themes, not transcripts.", "The brief is built around useful patterns rather than access to anyone’s private conversation."],
  ["Sharing is a choice.", "A private conversation is not automatically turned into a message for the church."],
];

function PhoneThread() {
  return (
    <div
      className="mx-auto w-full max-w-[354px] rounded-[3.15rem] bg-[#202423] p-[11px] shadow-[0_30px_75px_rgba(45,50,49,0.04)]"
      aria-label="Example text conversation with Zoe"
    >
      <div className="min-h-[668px] overflow-hidden rounded-[2.55rem] bg-[#f7f5f0]">
        <div className="flex items-center justify-between px-6 pb-2 pt-3.5 text-[11px] font-extrabold text-[#202423]" aria-hidden="true">
          <span>5:01</span>
          <span className="tracking-[0.12em]" aria-hidden="true">● ◒</span>
        </div>
        <div className="relative border-b border-zoe-outline/40 px-5 pb-3 text-center">
          <span className="absolute left-5 top-3 text-3xl leading-none text-zoe-forest" aria-hidden="true">‹</span>
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f5ed] text-sm font-extrabold text-zoe-forest" aria-hidden="true">
            Z
          </div>
          <p className="mt-1 text-xs font-extrabold text-zoe-ink">Zoe</p>
          <p className="mt-0.5 text-[9px] font-semibold text-zoe-muted">Text Message · SMS</p>
        </div>
        <div className="px-3.5 pb-7 pt-5 text-[12px] font-medium leading-[1.48] text-zoe-ink">
          <p className="mb-2 text-center text-[9px] font-bold text-[#888580]">Sunday · 11:42 AM</p>
          <div className="ml-auto w-fit max-w-[88%] rounded-[1.2rem] rounded-br-md bg-[#d9f4e8] px-3.5 py-2.5">
            Big meeting Tuesday at 2:30. I keep spiraling about it. Can you remind me at 2:23 with what we studied today?
          </div>
          <div className="mt-2 w-fit max-w-[88%] rounded-[1.2rem] rounded-bl-md bg-white px-3.5 py-2.5 shadow-[0_5px_14px_rgba(45,50,49,0.04)]">
            Absolutely. I’ll bring today’s Philippians 4 reminder back Tuesday at 2:23.
          </div>
          <p className="mb-2 mt-4 text-center text-[9px] font-bold text-[#888580]">Today · 2:23 PM</p>
          <div className="w-fit max-w-[92%] rounded-[1.2rem] rounded-bl-md bg-white px-3.5 py-2.5 shadow-[0_5px_14px_rgba(45,50,49,0.04)]">
            Hey—before you walk into that meeting, remember what you’ve been studying: your circumstances aren’t bigger than God, and you don’t walk into that room alone.
          </div>
          <p className="mb-2 mt-4 text-center text-[9px] font-bold text-[#888580]">4:58 PM</p>
          <div className="ml-auto w-fit max-w-[90%] rounded-[1.2rem] rounded-br-md bg-[#d9f4e8] px-3.5 py-2.5">
            I remembered that right before I opened the door. It changed how I walked in.
          </div>
          <div className="mt-2 w-fit max-w-[88%] rounded-[1.2rem] rounded-bl-md bg-white px-3.5 py-2.5 shadow-[0_5px_14px_rgba(45,50,49,0.04)]">
            That’s worth holding onto. What helped it feel real in the moment?
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChurchesPage() {
  return (
    <main className="overflow-x-hidden bg-zoe-oat text-zoe-ink">
      <section className="px-5 pb-24 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_0.85fr] lg:gap-20">
          <div>
            <h1 className="max-w-[11ch] text-[3.25rem] font-bold leading-[0.97] tracking-[-0.06em] sm:text-6xl lg:text-[5.35rem]">
              Sunday can keep helping on Tuesday.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-zoe-muted sm:text-xl">
              Zoe helps people put a sermon into practice during the week. It can also help a pastor notice what may need a little more care—without giving the dashboard access to anyone’s private text thread by default.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/churches/start"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-leaf px-7 py-4 text-sm font-bold text-white shadow-[0_18px_44px_rgba(45,50,49,0.04)] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Try a pilot at your church
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-sm font-bold leading-6 text-zoe-ink">
                No new app for members.
              </p>
            </div>
          </div>

          <div className="relative min-h-[500px] overflow-hidden rounded-[2.25rem] bg-[#16352f] shadow-[0_24px_70px_rgba(45,50,49,0.04)] lg:min-h-[610px]">
            <Image
              src="/assets/hero/beta-mountains.jpg"
              alt="Morning light across a mountain valley"
              fill
              priority
              className="object-cover opacity-85"
              sizes="(min-width: 1024px) 43vw, 100vw"
            />
            <div className="absolute inset-0 bg-[#122722]/20" />
            <div className="absolute bottom-7 left-6 right-6 rounded-[1.5rem] bg-[#122722]/85 p-5 text-white sm:bottom-9 sm:left-9 sm:right-9 sm:p-6">
              <p className="text-xs font-bold text-white/80">Sunday message · Philippians 4</p>
              <p className="mt-2 text-4xl font-bold leading-none tracking-[-0.05em] sm:text-5xl">Peace in the storm</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <h2 className="max-w-[17ch] text-4xl font-bold leading-[1.08] tracking-[-0.05em] sm:text-5xl">
            Pastors rarely get to see where a good sermon goes.
          </h2>
          <div className="max-w-2xl">
            <p className="text-lg font-medium leading-8 text-zoe-muted">
              Someone may try the prayer you suggested. Someone else may get stuck on one sentence. Another person may realize they need to talk with someone from church.
            </p>
            <p className="mt-5 text-base font-medium leading-8 text-zoe-muted">
              Most of that happens quietly. Zoe helps the good work continue, then brings back only what a pastor can responsibly use.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-[14ch] text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
            The sermon meets ordinary life.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rhythm.map((step, index) => (
              <article
                key={step.number}
                className={`min-h-[230px] rounded-[1.75rem] p-7 ${index % 2 ? "bg-[#e5f5ed]" : "bg-white"}`}
              >
                <p className="text-xs font-extrabold text-zoe-forest">{step.number} · {step.day}</p>
                <h3 className="mt-9 text-lg font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-[16ch] text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
            One clear thing to notice. One useful next step.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-zoe-muted">
            We are shaping the pastor experience as a brief, not a control room: see what matters, respond if needed, and get back to people.
          </p>
          <div className="mt-12 grid gap-4 rounded-[2.25rem] bg-[#efede7] p-3 shadow-[0_20px_55px_rgba(45,50,49,0.04)] lg:grid-cols-[1.15fr_0.7fr] lg:p-4">
            <article className="rounded-[1.55rem] bg-white p-7 sm:p-10">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#9d533b]">May need your attention</p>
              <h3 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                Some people are hearing anxiety as weak faith.
              </h3>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-zoe-muted">
                The weekly brief points to a theme worth clarifying: trust in God does not require pretending the body feels calm.
              </p>
              <p className="mt-8 text-sm font-extrabold text-zoe-forest">A shared pattern. No names. No private messages.</p>
            </article>
            <article className="rounded-[1.55rem] bg-[#e5f5ed] p-7 sm:p-10">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-zoe-forest">A simple response</p>
              <h3 className="mt-10 text-3xl font-bold leading-tight tracking-[-0.04em]">Clarify the teaching in your own words.</h3>
              <p className="mt-4 text-base font-medium leading-7 text-zoe-muted">A pilot can explore how your clarification shapes Zoe’s support that week—or simply helps you prepare the next message.</p>
              <p className="mt-7 border-l-[3px] border-zoe-leaf pl-4 text-sm font-extrabold text-zoe-forest">Built with pastors, not handed to them finished.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-28">
          <PhoneThread />
          <div>
            <h2 className="max-w-[14ch] text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
              Zoe remembers what the message was for.
            </h2>
            <p className="mt-6 text-lg font-medium leading-8 text-zoe-muted">
              A normal texting service can send the same message to a list. Zoe can help each person respond, remember what they said, and follow up at the right moment.
            </p>
            <div className="mt-8">
              {differences.map(([title, body]) => (
                <div key={title} className="grid grid-cols-[1.25rem_1fr] gap-4 py-3.5">
                  <Check className="mt-0.5 h-5 w-5 text-zoe-leaf" strokeWidth={3} />
                  <div>
                    <p className="font-bold">{title}</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-zoe-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <div>
            <h2 className="max-w-[14ch] text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
              Pastors see shared patterns, not private text threads.
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-zoe-muted">
              People need room to be honest. Pastors need information they can use without turning care into surveillance. Zoe keeps that line clear.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_55px_rgba(45,50,49,0.04)] sm:p-9">
            {privacy.map(([title, body]) => (
              <div key={title} className="flex gap-4 py-5 first:pt-1 last:pb-1">
                <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-zoe-forest" />
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-zoe-muted">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="rounded-[2rem] bg-[#f3e7dc] p-7 sm:p-10">
            <div className="flex items-center gap-3 text-[#915039]">
              <HeartHandshake className="h-5 w-5" />
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em]">A person asks for care</p>
            </div>
            <blockquote className="mt-6 text-2xl font-bold leading-snug tracking-[-0.03em]">
              “I’d like someone from church to call. Tuesday afternoon is best.”
            </blockquote>
            <p className="mt-5 text-sm font-medium leading-6 text-zoe-muted">
              This is the kind of clear, member-controlled handoff we want to shape with pilot churches. Private messages would not become part of the request.
            </p>
          </div>
          <div>
            <h2 className="max-w-[14ch] text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
              Sometimes the next step is a real person.
            </h2>
            <p className="mt-6 text-lg font-medium leading-8 text-zoe-muted">
              Zoe already encourages people toward trusted human support. In a church pilot, we want to make that handoff simpler: the member chooses what to share, the pastor receives a clear request, and a human closes the loop.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zoe-forest px-5 py-24 text-white sm:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <MessageCircle className="mx-auto h-9 w-9 text-zoe-leaf" />
          <h2 className="mx-auto mt-7 max-w-[15ch] text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-6xl">
            Help Sunday live in the rest of the week.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-white/75">
            Start with a small group. We’ll help your team shape the boundaries, invite people, and learn together.
          </p>
          <Link
            href="/churches/start"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-zoe-leaf px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Try a pilot at your church
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-5 text-sm font-semibold text-white/70">
            Already approved for a church pilot?{" "}
            <a className="font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white" href={`${dashboardUrl}/login`}>
              Church admin login
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
