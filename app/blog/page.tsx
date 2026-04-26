import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import Footer from "../../components/Footer";
import { blogPosts } from "../../lib/blogPosts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "A monthly journal on shepherding, software, and the small ways grace shows up in the long week.",
};

const topics = ["All", "Pastoring", "Discipleship", "Product", "Theology", "Field notes"];

const authorBySlug: Record<string, { name: string; role: string; initials: string }> = {
  "why-you-keep-quitting-your-bible-app": { name: "Tony Allen", role: "Founder", initials: "T" },
  "what-is-sms-discipleship": { name: "Tony Allen", role: "Founder", initials: "T" },
  "can-ai-help-you-walk-with-jesus": { name: "Tony Allen", role: "Founder", initials: "T" },
  "equip-the-kingdom-to-use-ai-well": { name: "Tony Allen", role: "Founder", initials: "T" },
};

const displayTitleBySlug: Record<string, ReactNode> = {
  "why-you-keep-quitting-your-bible-app": (
    <>
      Why you keep quitting your Bible <em>app</em>.
    </>
  ),
  "what-is-sms-discipleship": (
    <>
      What is <em>SMS</em> discipleship?
    </>
  ),
  "can-ai-help-you-walk-with-jesus": (
    <>
      Can AI help you walk with <em>Jesus</em>?
    </>
  ),
  "equip-the-kingdom-to-use-ai-well": (
    <>
      Equip the kingdom to use AI <em>well</em>.
    </>
  ),
};

function shortReadTime(readTime: string) {
  return readTime.replace(" read", "");
}

function dateLabel(date: string) {
  return date.replace(" 2026", "");
}

function ArticleRow({ post }: { post: (typeof blogPosts)[number] }) {
  const author = authorBySlug[post.slug] ?? { name: "Tony Allen", role: "Zoe", initials: "T" };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-4 rounded-2xl border border-transparent bg-white px-5 py-6 shadow-[0_10px_34px_rgba(45,50,49,0.035)] transition duration-200 hover:translate-x-1 hover:border-zoe-sap/55 hover:bg-zoe-surface md:grid-cols-[4rem_7rem_1fr_13rem_5rem] md:items-center md:gap-8 md:px-6 md:py-7"
    >
      <div className="font-serif text-4xl italic leading-none tracking-[-0.02em] text-zoe-sap">
        {post.number}
      </div>
      <div className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-zoe-sap">
        {post.category}
      </div>
      <div>
        <h4 className="max-w-2xl text-[1.65rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-zoe-ink md:text-2xl [&_em]:font-serif [&_em]:font-medium [&_em]:italic [&_em]:text-zoe-sap">
          {displayTitleBySlug[post.slug] ?? post.shortTitle}
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
  const thisMonth = blogPosts.slice(1, 3);
  const earlier = blogPosts.slice(3);

  return (
    <div className="min-h-screen overflow-x-hidden bg-zoe-oat text-zoe-ink">
      <main className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <header className="mx-auto max-w-7xl pb-12 md:pb-16">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.34em] text-zoe-sap">
            The Zoe Journal · Issue 04
          </p>
          <h1 className="mt-7 max-w-[11ch] text-[4.65rem] font-extrabold leading-[0.84] tracking-[-0.07em] text-zoe-ink md:text-[9.4rem] md:tracking-[-0.08em]">
            Between the
            <br />
            <em className="font-serif font-medium italic text-zoe-sap">Sundays</em>.
          </h1>
          <div className="mt-8 flex flex-col gap-7 border-t border-zoe-outline/70 pt-7 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-base font-medium leading-7 tracking-normal text-zoe-muted md:text-lg md:leading-8">
              A monthly journal on shepherding, software, and the small ways grace shows up in the long week, written for pastors, members, and anyone curious how this works.
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
            className="group grid min-h-[34rem] overflow-hidden rounded-[1.5rem] bg-zoe-ink text-zoe-oat shadow-[0_24px_70px_rgba(45,50,49,0.11)] md:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden p-8 md:min-h-[34rem] md:p-10">
              <Image
                src="/images/blog-window-devotion.jpg"
                alt="Open window with books in morning light"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(27,63,53,0.56)_0%,rgba(27,63,53,0)_30%,rgba(27,63,53,0)_58%,rgba(27,63,53,0.78)_100%)]" />
              <p className="relative z-10 text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-oat">
                - Lead essay
              </p>
              <div className="relative z-10 w-fit rounded-2xl bg-zoe-forest/70 px-5 py-4 backdrop-blur-md">
                <p className="text-[2.65rem] font-extrabold leading-none tracking-[-0.045em] text-white md:text-[4rem]">
                  Issue <em className="font-serif font-medium italic text-zoe-sap">04</em>
                </p>
                <p className="mt-1 font-serif text-base italic tracking-normal text-white/80">April · MMXXVI</p>
              </div>
              <p className="relative z-10 text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">
                - A pastor&apos;s window, between Sundays.
              </p>
            </div>

            <div className="flex flex-col justify-between p-8 md:p-14">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-zoe-sap">
                  {featured.category} · {featured.readTime}
                </p>
                <h2 className="mt-6 max-w-[14ch] text-[3rem] font-extrabold leading-[0.98] tracking-[-0.06em] text-zoe-oat md:text-[4rem]">
                  Why you keep quitting your Bible <em className="font-serif font-medium italic text-zoe-sap">app</em>.
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
                </p>
                <span className="mt-6 inline-flex rounded-full bg-zoe-sap px-6 py-3 text-sm font-bold text-white transition group-hover:bg-[#17aa74]">
                  Read the essay →
                </span>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-2 px-1 pb-6 pt-16 md:flex-row md:items-baseline md:gap-6 md:px-6 md:pt-20">
            <h3 className="text-3xl font-extrabold leading-none tracking-[-0.04em]">
              <em className="mr-2 font-serif font-medium italic text-zoe-sap">This</em>{" "}
              month.
            </h3>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-zoe-muted/65 md:ml-auto">
              {thisMonth.length} entries · April 2026
            </p>
          </div>
          <div className="space-y-3">
            {thisMonth.map((post) => (
              <ArticleRow key={post.slug} post={post} />
            ))}
          </div>

          <div className="flex flex-col gap-2 px-1 pb-6 pt-16 md:flex-row md:items-baseline md:gap-6 md:px-6">
            <h3 className="text-3xl font-extrabold leading-none tracking-[-0.04em]">
              <em className="mr-2 font-serif font-medium italic text-zoe-sap">Earlier</em>{" "}
              writing.
            </h3>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-zoe-muted/65 md:ml-auto">
              From the archive
            </p>
          </div>
          <div className="space-y-3">
            {earlier.map((post) => (
              <ArticleRow key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
