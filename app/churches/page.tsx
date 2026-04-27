import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const dashboardUrl = process.env.NEXT_PUBLIC_CHURCH_DASHBOARD_URL ?? "https://church.zoe.live";

const journey = [
  {
    label: "Ask",
    title: "Start with the real questions",
    body: "What should AI never do in a church? What could it help with? What needs a pastor, elder, parent, or friend instead? We want those questions on the table first.",
  },
  {
    label: "Pilot",
    title: "Try it with a small group",
    body: "Zoe is meant to be tested carefully before a broad rollout. Start with trusted leaders, a ministry team, or a small cohort who can give honest pastoral feedback.",
  },
  {
    label: "Shape",
    title: "Make it sound like your church",
    body: "Your theology, teaching sources, language, and care boundaries should shape the experience before members receive a single text.",
  },
];

const proof = [
  {
    icon: BookOpen,
    title: "Sunday carries into the week",
    body: "Members often leave encouraged and then step back into Monday without much support. Zoe helps turn sermon themes, scripture, and pastoral emphasis into a simple daily rhythm.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails come first",
    body: "Before launch, churches define theological posture, sensitive boundaries, and moments when Zoe should defer to real people. Caution is not a footnote here.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Zoe is not a surveillance layer. Leaders need enough signal to shepherd wisely without turning private spiritual formation into a dashboard feed.",
  },
  {
    icon: MessageCircle,
    title: "No app for members",
    body: "Members receive Zoe by text. No download, no password, no new tech platform to explain after service.",
  },
];

const handoffSteps = [
  "Zoe should strengthen discipleship between Sundays, not outsource pastoral presence.",
  "A church should be able to inspect theology, tone, and care boundaries before inviting members.",
  "AI should be honest about what it is, where it is limited, and when a human should step in.",
  "The first rollout should be small enough for your team to learn from real feedback.",
  "We are building this with our own local churches in view, so trust has to be earned slowly.",
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
              AI for churches should feel thoughtful before it feels powerful.
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-zoe-muted sm:text-xl">
              Zoe helps pastors extend scripture, prayer, and gentle follow-through into the week through SMS. We are building it for churches that are curious about AI, but rightly careful about where it belongs.
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
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zoe-forest">Dashboard handoff</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">Start small. Test carefully.</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zoe-leaf/10 text-zoe-forest">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-8 space-y-3">
                {["Pastoral boundaries", "Theology guardrails", "Tone review", "Pilot invites"].map((item, index) => (
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
              &ldquo;We are not asking churches to trust AI blindly. We are building a way to examine it, shape it, and start with wisdom.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">A thoughtful path in</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tighter-editorial sm:text-5xl">
              You do not need to decide everything before asking better questions.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {journey.map((step) => (
              <article key={step.label} className="rounded-[2rem] bg-white p-7 shadow-zoe-card">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zoe-leaf">{step.label}</span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-zoe-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">Why churches try it</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tighter-editorial sm:text-5xl">
              The hope is not more tech. The hope is more faithful follow-through.
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-zoe-muted">
              Pastors already know the gap: people receive truth on Sunday, then carry it into busy homes, workweeks, grief, temptation, and ordinary distraction. Zoe is for those ordinary hours, when a short text can help someone remember, pray, read, or take the next faithful step.
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
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] bg-zoe-ink p-7 text-white sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-leaf">Our posture</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tighter-editorial sm:text-5xl">
              We get the hesitation because we share it.
            </h2>
          </div>
          <div className="space-y-3">
            {handoffSteps.map((step) => (
              <div key={step} className="flex gap-3 rounded-3xl bg-white/8 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-zoe-leaf" />
                <p className="text-sm font-medium leading-7 text-white/78">{step}</p>
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
              Explore it with us. Start with a pilot when your team is ready.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-zoe-muted">
              We publish essays now, and we are preparing a podcast, because the church needs a deeper conversation about AI than a feature list can give. The pilot is for churches ready to move from conversation to careful practice.
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
