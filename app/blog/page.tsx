import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";
import blogBg from "../../public/images/blog-bg.webp";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thinking on discipleship, technology, and what it looks like to walk with Jesus in the everyday. From the team at Zoe.",
};

const posts = [
  {
    slug: "the-daily-scripture-habit-that-finally-stuck-and-why-it-live",
    title: "Daily Scripture That Actually Sticks (And Why It Has Nothing to Do With Discipline)",
    description:
      "The daily decision is what kills scripture habits — not lack of faith. Here's how removing that choice builds the kind of consistent rhythm that actually lasts.",
    date: "March 2026",
    readTime: "4 min read",
    badge: "Discipleship",
    badgeColor: "text-zoe-jade-deep border-zoe-jade/20 bg-zoe-jade/10",
    image: "/blog/the-daily-scripture-habit-that-finally-stuck-and-why-it-live/hero.jpg",
  },
  {
    slug: "why-you-keep-quitting-your-bible-app",
    title: "Why You Keep Quitting Your Bible App (And What Actually Works)",
    description: "71% of apps are abandoned within 90 days. Bible apps are no different. The problem is friction — and the fix is simpler than you think.",
    date: "March 2026",
    readTime: "8 min read",
    badge: "Discipleship",
    badgeColor: "text-zoe-jade-deep border-zoe-jade/20 bg-zoe-jade/10",
    image: "/blog/why-you-keep-quitting-your-bible-app/hero.jpg",
  },
  {
    slug: "what-is-sms-discipleship",
    title: "What Is SMS Discipleship?",
    description: "SMS discipleship is daily spiritual growth that happens through text messages — no app, no login, no friction. Here's why it works when nothing else does.",
    date: "February 2026",
    readTime: "7 min read",
    badge: "Discipleship",
    badgeColor: "text-zoe-jade-deep border-zoe-jade/20 bg-zoe-jade/10",
  },
  {
    slug: "can-ai-help-you-walk-with-jesus",
    title: "Can AI Help You Walk With Jesus?",
    description: "AI can't love you or know God's will — but it can remember what you said on Tuesday and ask about it on Friday. Here's an honest look at what that's worth.",
    date: "February 2026",
    readTime: "8 min read",
    badge: "AI & Faith",
    badgeColor: "text-zoe-jade-deep border-zoe-jade/20 bg-zoe-jade/10",
  },
  {
    slug: "equip-the-kingdom-to-use-ai-well",
    title: "I'm a Former Worship Pastor Building an AI Discipleship Tool. Here's What I've Learned.",
    description: "Building something for the church means wrestling with hard questions — about trust, about replacement anxiety, and about what technology should actually do in a faith context.",
    date: "March 2026",
    readTime: "8 min read",
    badge: "Church & Technology",
    badgeColor: "text-amber-700 border-amber-200 bg-amber-50",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-slate-900">
      <section className="relative aspect-video w-full overflow-hidden bg-slate-100" style={{ marginTop: "72px" }}>
        <Image src={blogBg} alt="Blog Background" fill className="object-cover" priority />

        <div className="absolute inset-0 z-10 flex items-center md:w-2/3 lg:w-1/2">
          <div
            className="pointer-events-none h-[150%] w-full -ml-[20%] backdrop-blur-md"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-center md:w-2/3 lg:w-1/2">
          <div className="pointer-events-none h-[150%] w-full -ml-[20%] bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(0,0,0,0.5)_0%,_transparent_100%)]" />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            <h1 className="mb-2 text-5xl font-bold leading-[1.05] tracking-tighter-editorial text-white md:text-7xl lg:mb-4 lg:text-[80px]">
              Thinking on discipleship
            </h1>
            <p className="text-xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
              Tech, faith, and what it looks like to
              <br />
              walk with Jesus in the everyday
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-3xl border border-zoe-outline/35 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] md:p-10"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${post.badgeColor}`}>
                    {post.badge}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{post.date}</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs font-medium text-slate-400">{post.readTime}</span>
                </div>
                <h2 className="mb-4 text-2xl font-bold leading-snug tracking-tighter-editorial text-slate-900 transition-colors duration-200 group-hover:text-zoe-jade-deep md:text-3xl">
                  {post.title}
                </h2>
                <p className="mb-6 font-medium leading-relaxed text-slate-600">{post.description}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors duration-200 group-hover:text-zoe-jade-deep">
                  Read article <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
