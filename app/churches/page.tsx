import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ChurchPilotSticky } from "../../components/ChurchPilotSticky";

const dashboardUrl = process.env.NEXT_PUBLIC_CHURCH_DASHBOARD_URL ?? "https://church.zoe.live";

const journey = [
  {
    label: "Ask",
    title: "Name the boundaries",
    body: "What should Zoe never do? Where should it defer to a pastor, parent, elder, counselor, or friend? We start there.",
  },
  {
    label: "Pilot",
    title: "Start small",
    body: "Invite a few trusted leaders, a ministry team, or one small group. Learn before you roll it out wider.",
  },
  {
    label: "Shape",
    title: "Shape the voice",
    body: "Your sermons, language, theology, and care boundaries shape the texts before members receive them.",
  },
];

const proof = [
  {
    icon: BookOpen,
    title: "Sunday keeps moving",
    body: "Turn sermon themes, scripture, and pastoral emphasis into simple texts across the week.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails first",
    body: "Set theology, tone, sensitive topics, and handoff rules before anyone receives a message.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Leaders see helpful patterns. Private conversations stay private.",
  },
  {
    icon: MessageCircle,
    title: "No app for members",
    body: "Members receive Zoe by SMS. No download, password, or new habit to explain after service.",
  },
];

const handoffSteps = [
  "Zoe is not an AI pastor, counselor, spiritual director, or replacement for real people.",
  "Church admins do not get private conversations, confessions, or hidden surveillance feeds.",
  "Zoe does not claim to speak for God or tell someone what God is saying to them.",
  "Sensitive moments should move toward pastors, parents, counselors, or trusted people.",
  "Your team reviews theology, tone, memory, and escalation rules before members are invited.",
];

export default function ChurchesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-zoe-oat text-zoe-ink">
      <section className="px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-zoe-surface px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-zoe-forest">
              <span className="h-2 w-2 rounded-full bg-zoe-leaf" />
              For pastors and church teams
            </div>
            <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tighter-editorial text-zoe-ink sm:text-6xl lg:text-8xl">
              Help Sunday carry into the week.
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-zoe-muted sm:text-xl">
              Zoe turns your church's teaching into simple SMS rhythms of scripture, prayer, reflection, and follow-through.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/churches/start"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-leaf px-7 py-4 text-sm font-bold text-white shadow-[0_18px_44px_rgba(45,50,49,0.08)] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Start a church pilot
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`${dashboardUrl}/login`}
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-zoe-ink shadow-[0_18px_44px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45 transition hover:-translate-y-0.5 hover:bg-zoe-surface"
              >
                Admin login
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] bg-zoe-surface p-5 shadow-zoe-card ring-1 ring-zoe-outline/50 sm:p-7">
            <div className="rounded-[1.5rem] bg-white p-5 shadow-[0_18px_50px_rgba(45,50,49,0.04)]">
              <div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zoe-forest">Pilot setup</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">Shape it before you send it.</h2>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                {["Teaching source", "Theology guardrails", "Tone review", "Pilot invites"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-zoe-surface px-4 py-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-zoe-forest">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-zoe-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="px-2 pt-5 font-serif text-lg italic leading-7 text-zoe-forest">
              &ldquo;Start with the questions. Then test it with people you trust.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <ChurchPilotSticky steps={journey} />

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">Why churches try it</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tighter-editorial sm:text-5xl">
              People need help on Monday.
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-zoe-muted">
              A sermon can land deeply on Sunday and feel far away by Tuesday. Zoe helps your church remember, pray, read, and take the next faithful step in ordinary life.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {proof.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-[2rem] bg-white p-6 shadow-zoe-card ring-1 ring-zoe-outline/30">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zoe-leaf/10 text-zoe-forest">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-zoe-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.25rem] bg-zoe-surface p-7 ring-1 ring-zoe-outline/30 sm:p-10 lg:grid-cols-[0.72fr_1.28fr] lg:p-14">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">Our posture</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tighter-editorial text-zoe-ink sm:text-5xl">
              Some caution makes sense.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-zoe-muted">
              There are ugly versions of church AI. We are deliberately building away from them.
            </p>
          </div>
          <div className="divide-y divide-zoe-outline/35 rounded-[1.75rem] bg-white px-6 shadow-[0_18px_50px_rgba(45,50,49,0.035)] ring-1 ring-zoe-outline/25">
            {handoffSteps.map((step, index) => (
              <div
                key={step}
                className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:items-start"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zoe-leaf/10 text-xs font-bold text-zoe-forest">
                  0{index + 1}
                </span>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-zoe-leaf" />
                  <p className="text-sm font-medium leading-7 text-zoe-muted">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="font-serif text-2xl italic text-zoe-forest">toward Him daily, as a church</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tighter-editorial sm:text-6xl">
              Try Zoe with a few people first.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-zoe-muted">
              We will help you set the boundaries, invite a small group, and learn from real feedback before anything gets broad.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/churches/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-leaf px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Start a church pilot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`${dashboardUrl}/login`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-zoe-ink ring-1 ring-zoe-outline/45 transition hover:-translate-y-0.5"
            >
              Already approved? Log in
              <Users className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
