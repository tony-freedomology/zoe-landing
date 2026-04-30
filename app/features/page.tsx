import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, ShieldCheck, Users } from "lucide-react";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Zoe helps scripture, prayer, memory, and follow-through stay present in ordinary life through simple text messages.",
};

const features = [
  {
    eyebrow: "Daily rhythm",
    title: "Three small returns to attention.",
    body: "Morning, midday, and evening check-ins help the day stay connected to God without asking someone to open another app.",
    notes: ["Dawn intention", "Midday check-in", "Evening reflection"],
  },
  {
    eyebrow: "Memory",
    title: "What you said still matters later.",
    body: "Zoe can bring back a commitment, a prayer, a verse, or a question days later, because formation depends on continuity.",
    notes: ["Commitment follow-up", "Prayer memory", "Longer spiritual thread"],
  },
  {
    eyebrow: "Scripture",
    title: "More than a verse pasted into a chat.",
    body: "Passages are handled as real texts with context, questions, and a concrete next step instead of generic devotional language.",
    notes: ["Passage context", "Original-language care", "Application prompts"],
  },
  {
    eyebrow: "Churches",
    title: "Sunday keeps working on Tuesday.",
    body: "Church deployments can align Zoe with sermon content while keeping personal member conversations private by default.",
    notes: ["Sermon echo", "Aggregated insight", "Pastoral hand-raises"],
  },
];

const privacy = [
  "Private by default. Church leaders see cohort patterns, not personal threads.",
  "No public-model training on personal conversations.",
  "Export and delete rights stay available.",
  "Human handoff exists when the moment needs a real person.",
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="px-6 pb-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
            Features · built for the week
          </p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_28rem] lg:items-end">
            <h1 className="max-w-5xl text-[3.8rem] font-extrabold leading-[0.9] tracking-[-0.058em] text-zoe-ink [word-spacing:0.045em] md:text-[6.8rem] md:tracking-[-0.075em]">
              A discipleship tool with a low center of gravity.
            </h1>
            <p className="text-lg font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em] md:text-xl md:leading-9">
              Zoe is not trying to create a new spiritual destination. It lives in the thread people already check, and keeps returning them to scripture, prayer, and the thing they said they would do.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-[2rem] border border-zoe-outline/55 bg-zoe-outline/55 md:grid-cols-2">
          {features.map((feature, index) => (
            <article key={feature.title} className="bg-zoe-oat p-8 md:p-10">
              <p className="font-serif text-4xl italic leading-none text-zoe-sap">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-9 text-[11px] font-bold uppercase tracking-[0.3em] text-zoe-muted">
                {feature.eyebrow}
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-[0.95] tracking-[-0.06em] text-zoe-ink md:text-5xl">
                {feature.title}
              </h2>
              <p className="mt-5 max-w-xl font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
                {feature.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {feature.notes.map((note) => (
                  <span key={note} className="rounded-full border border-zoe-outline/50 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zoe-forest">
                    {note}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#173A2E] px-6 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">
              What it protects
            </p>
            <h2 className="mt-6 text-[3.2rem] font-extrabold leading-[0.92] tracking-[-0.066em] [word-spacing:0.025em] md:text-[5.4rem] md:tracking-[-0.075em]">
              Trust is a feature.
            </h2>
            <p className="mt-7 max-w-xl text-lg font-medium leading-8 tracking-normal text-white/70 [word-spacing:0.08em]">
              The product only works if people can be honest. So the system is designed around clarity, consent, privacy, and human handoff.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/12 bg-white/12 md:grid-cols-2">
            {privacy.map((item) => (
              <div key={item} className="bg-white/7 p-7">
                <ShieldCheck className="h-5 w-5 text-zoe-sap" />
                <p className="mt-5 text-xl font-bold leading-7 tracking-[-0.03em] text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            { icon: MessageCircle, title: "Text-first", body: "No app to install. No login to remember. Zoe meets people in SMS." },
            { icon: BookOpen, title: "Scripture-shaped", body: "The experience begins with the passage and moves toward practice." },
            { icon: Users, title: "Church-aware", body: "Built for both individual formation and congregation-level deployments." },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] bg-white p-8 shadow-[0_18px_60px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/45">
              <item.icon className="h-6 w-6 text-zoe-sap" />
              <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.04em] text-zoe-ink">{item.title}</h3>
              <p className="mt-3 font-medium leading-7 tracking-normal text-zoe-muted [word-spacing:0.08em]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zoe-outline/55 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-zoe-sap">Early access</p>
          <h2 className="mt-5 text-[3rem] font-extrabold leading-[0.95] tracking-[-0.066em] text-zoe-ink [word-spacing:0.025em] md:text-[5rem] md:tracking-[-0.07em]">
            See what it feels like.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-8 tracking-normal text-zoe-muted [word-spacing:0.08em]">
            Join the waitlist and try the text-first rhythm for yourself.
          </p>
          <Link
            href="/#waitlist"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-zoe-sap px-8 py-4 text-base font-bold text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:bg-zoe-forest"
          >
            Join the waitlist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
