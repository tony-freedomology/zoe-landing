import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../../components/Footer";
import { GuideHero } from "./_components/GuideParts";

export const metadata: Metadata = {
  title: "Guides",
  description: "In-depth guides on discipleship, SMS Bible study, Christian AI tools, and how to build a daily faith habit that actually sticks.",
  alternates: {
    canonical: "/guides",
  },
};

const guides = [
  {
    href: "/guides/best-discipleship-apps-2026",
    title: "Best Discipleship Apps 2026",
    desc: "An honest look at YouVersion, Hallow, RightNow Media, Lectio 365, and Zoe: what each is good at and how to pick.",
    readTime: "6 min read",
  },
  {
    href: "/guides/sms-discipleship",
    title: "What Is SMS Discipleship?",
    desc: "What it looks like when scripture, prayer, and follow-through show up in your texts, and when that's actually a good idea.",
    readTime: "5 min read",
  },
  {
    href: "/guides/christian-ai-tools",
    title: "Christian AI Tools: What's Actually Worth Using",
    desc: "Some AI is genuinely useful for faith. Some should make you nervous. Here's how to tell the difference.",
    readTime: "7 min read",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <GuideHero
        backHref={null}
        title="Guides"
        lead={
          <p>
            Plain, honest guides on Bible apps, texting-based discipleship, and what AI can and can&apos;t do for your
            faith.
          </p>
        }
      />

      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="group block rounded-[1.75rem] bg-white p-7 shadow-zoe-card ring-1 ring-zoe-outline/40 transition hover:-translate-y-0.5 sm:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-zoe-ink transition-colors group-hover:text-zoe-forest">
                    {g.title}
                  </h2>
                  <p className="mt-2 text-base font-medium leading-7 text-zoe-muted">{g.desc}</p>
                  <p className="mt-4 text-sm font-semibold text-zoe-muted">{g.readTime}</p>
                </div>
                <ArrowRight className="mt-1.5 h-5 w-5 shrink-0 text-zoe-muted transition-colors group-hover:text-zoe-forest" strokeWidth={2} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
