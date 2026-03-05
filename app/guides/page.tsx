import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Guides",
  description: "In-depth guides on discipleship, SMS Bible study, Christian AI tools, and how to build a daily faith habit that actually sticks.",
};

const guides = [
  {
    href: "/guides/best-discipleship-apps-2026",
    tag: "Discipleship",
    tagColor: "text-brand-jade border-brand-jade/20 bg-brand-jade/5",
    title: "Best Discipleship Apps 2026",
    desc: "The honest comparison: which tools actually help Christians grow, and why most people stop using them within 90 days.",
    readTime: "6 min read",
  },
  {
    href: "/guides/sms-discipleship",
    tag: "SMS & Habits",
    tagColor: "text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5",
    title: "What Is SMS Discipleship?",
    desc: "Bible study without downloading another app. How text-message-based discipleship works and why it outperforms every other format for daily habit formation.",
    readTime: "5 min read",
  },
  {
    href: "/guides/christian-ai-tools",
    tag: "AI & Faith",
    tagColor: "text-amber-700 border-amber-200 bg-amber-50",
    title: "Christian AI Tools: What's Actually Worth Using",
    desc: "AI is everywhere. Some of it is genuinely useful for spiritual growth. Most of it isn't. Here's how to tell the difference.",
    readTime: "7 min read",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen text-slate-900">
      <section className="bg-slate-900 py-32 px-6 pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-jade/30 bg-brand-jade/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-jade mb-8">
            Guides
          </div>
          <h1 className="text-5xl md:text-6xl tracking-tighter-editorial text-white leading-[1.1] font-bold">
            Resources for serious disciples.
          </h1>
          <p className="mt-6 text-xl text-slate-300 font-medium leading-relaxed">
            Practical guides on discipleship tools, daily Bible habits, and the honest truth about AI and faith.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#F8FBFA]">
        <div className="mx-auto max-w-4xl space-y-6">
          {guides.map((g) => (
            <Link key={g.href} href={g.href} className="group block bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 items-center mb-3">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${g.tagColor}`}>{g.tag}</span>
                    <span className="text-slate-400 text-xs font-medium">{g.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-brand-jade transition-colors">{g.title}</h2>
                  <p className="text-slate-600 font-medium leading-relaxed">{g.desc}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-brand-jade transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
