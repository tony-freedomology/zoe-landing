import type { Metadata } from "next";
import { withSocial } from "../../lib/seo";
import Image from "next/image";
import Link from "next/link";

import Footer from "../../components/Footer";
import { headingAccent } from "../../components/home/styles";
import { blogPosts } from "../../lib/blogPosts";

export const metadata: Metadata = withSocial({
  title: "Blog",
  description:
    "Notes from Zoe on shepherding, software, AI and faith, and the small ways grace shows up in the long week, for pastors, members, and the curious.",
  alternates: {
    canonical: "/blog",
  },
});

const topics = ["All", "Product", "Discipleship", "AI & Faith", "Field notes"];

const authorBySlug: Record<string, { name: string; role: string; initials: string }> = {
  "can-god-speak-through-ai": { name: "Tony Allen", role: "Founder", initials: "T" },
  "ai-can-sort-your-thoughts": { name: "Tony Allen", role: "Founder", initials: "T" },
  "can-ai-help-you-walk-with-jesus": { name: "Tony Allen", role: "Founder", initials: "T" },
  "what-should-zoe-do-in-the-morning": { name: "Tony Allen", role: "Founder", initials: "T" },
  "rhythm-instead-of-another-devotional-feed": { name: "Tony Allen", role: "Founder", initials: "T" },
};

/**
 * Index display titles in sentence case. No heading accent here: the h1's Jade
 * stroke is the page's one mark, the featured card is dark (a Mint band under
 * Oat text loses contrast), and a highlight on every row would mean nothing.
 */
const displayTitleBySlug: Record<string, string> = {
  "can-god-speak-through-ai": "Can God speak through AI?",
  "ai-can-sort-your-thoughts": "AI can sort your thoughts, but it can't receive your prayers.",
  "can-ai-help-you-walk-with-jesus": "Can AI help you walk with Jesus?",
  "what-should-zoe-do-in-the-morning": "What should Zoe do in the morning?",
  "rhythm-instead-of-another-devotional-feed": "Why Zoe starts with rhythm.",
};

function shortReadTime(readTime: string) {
  return readTime.replace(" read", "");
}

function dateLabel(date: string) {
  return date.replace(" 2026", "");
}

function displayTitle(post: (typeof blogPosts)[number]) {
  return displayTitleBySlug[post.slug] ?? post.shortTitle;
}

function ArticleRow({ post }: { post: (typeof blogPosts)[number] }) {
  const author = authorBySlug[post.slug] ?? { name: "Tony Allen", role: "Zoe", initials: "T" };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-4 rounded-2xl border border-transparent bg-white px-5 py-6 shadow-[0_10px_34px_rgba(45,50,49,0.035)] transition duration-200 hover:translate-x-1 hover:border-zoe-sap/55 hover:bg-zoe-surface md:grid-cols-[4rem_1fr_13rem_5rem] md:items-center md:gap-8 md:px-6 md:py-7"
    >
      <div className="text-4xl font-extrabold tabular-nums leading-none tracking-[-0.045em] text-zoe-sap">
        {post.number}
      </div>
      <div>
        <h4 className="max-w-2xl text-[1.65rem] font-extrabold leading-[1.08] tracking-[-0.032em] text-zoe-ink md:text-2xl">
          {displayTitle(post)}
        </h4>
        <p className="mt-2 max-w-3xl text-sm font-medium leading-6 tracking-normal text-zoe-muted">
          {post.description}
        </p>
      </div>
      <div className="flex items-center gap-3 text-sm tracking-normal text-zoe-muted">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zoe-sap text-xs font-extrabold text-white">
          {author.initials}
        </span>
        <span>
          <strong className="block font-bold leading-tight text-zoe-ink">{author.name}</strong>
          <small className="text-xs text-zoe-muted/75">{author.role}</small>
        </span>
      </div>
      <div className="text-left text-xs font-medium tracking-normal text-zoe-muted/75 md:text-right">
        <span className="block text-sm font-bold text-zoe-ink">{shortReadTime(post.readTime)}</span>
        {dateLabel(post.date)}
      </div>
    </Link>
  );
}

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const remaining = blogPosts.slice(1);

  return (
    <div className="min-h-screen overflow-x-hidden bg-zoe-oat text-zoe-ink">
      <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <header className="mx-auto max-w-7xl pb-12 md:pb-16">
          <h1 className="max-w-[11ch] text-[4.65rem] font-extrabold leading-[0.84] tracking-[-0.045em] text-zoe-ink md:text-[9.4rem] md:tracking-[-0.052em]">
            Between the
            <br />
            <em className={headingAccent}>Sundays</em>.
          </h1>
          <div className="mt-10 flex flex-col gap-7 border-t border-zoe-outline/70 pt-7 md:mt-12 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-base font-medium leading-7 tracking-normal text-zoe-muted md:text-lg md:leading-8">
              Notes on shepherding, software, and the small ways grace shows up in the long week, written for pastors, members, and anyone curious how this works.
            </p>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className={
                    topic === "All"
                      ? "rounded-full border border-zoe-ink bg-zoe-ink px-4 py-2 text-xs font-bold text-white"
                      : "rounded-full border border-zoe-outline bg-transparent px-4 py-2 text-xs font-bold text-zoe-muted"
                  }
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-7xl">
          <Link
            href={`/blog/${featured.slug}`}
            className={`group grid overflow-hidden rounded-[1.5rem] bg-zoe-ink text-zoe-oat shadow-[0_24px_70px_rgba(45,50,49,0.11)] ${
              featured.heroImage ? "min-h-[34rem] md:grid-cols-[0.9fr_1.1fr]" : ""
            }`}
          >
            {featured.heroImage ? (
              <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden p-8 md:min-h-[34rem] md:p-10">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroAlt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover object-[77%_50%]"
                />
              </div>
            ) : null}

            <div className="flex flex-col justify-between p-8 md:p-14">
              <div>
                <h2 className="max-w-[14ch] text-[3rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-zoe-oat md:text-[4rem]">
                  {displayTitle(featured)}
                </h2>
                <p className="mt-7 max-w-xl text-base font-medium leading-7 tracking-normal text-zoe-oat/72 md:text-lg md:leading-8">
                  {featured.description}
                </p>
              </div>
              <div className="mt-10">
                <p className="text-sm font-medium text-zoe-oat/55">
                  <strong className="font-bold text-zoe-oat">Tony Allen</strong>
                  <span className="px-3 text-zoe-oat/30">·</span>
                  {featured.date}
                  <span className="px-3 text-zoe-oat/30">·</span>
                  {featured.readTime}
                </p>
                <span className="mt-6 inline-flex rounded-full bg-zoe-sap px-6 py-3 text-sm font-bold text-white transition group-hover:bg-[#17aa74]">
                  Read the article →
                </span>
              </div>
            </div>
          </Link>

          {remaining.length > 0 ? (
            <>
              <div className="flex flex-col gap-2 px-1 pb-6 pt-16 md:flex-row md:items-baseline md:gap-6 md:px-6 md:pt-20">
                <h3 className="text-3xl font-extrabold leading-none tracking-[-0.04em]">
                  More writing.
                </h3>
              </div>
              <div className="space-y-3">
                {remaining.map((post) => (
                  <ArticleRow key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}
