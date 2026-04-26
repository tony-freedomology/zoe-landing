import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Footer from "../../components/Footer";
import { blogPosts } from "../../lib/blogPosts";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Thinking on discipleship, technology, and what it looks like to walk with Jesus in the everyday. From the team at Zoe.",
};

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen overflow-x-hidden bg-zoe-oat text-zoe-ink">
      <main className="px-6 pb-24 pt-36">
        <section className="mx-auto max-w-7xl border-b border-zoe-outline/60 pb-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.46fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-sap md:tracking-[0.34em]">
                Journal · Field notes · Essays
              </p>
              <h1 className="mt-5 max-w-4xl text-[4.4rem] font-extrabold leading-[0.88] tracking-[-0.066em] text-zoe-ink [word-spacing:0.025em] md:text-[7.8rem] md:tracking-[-0.075em]">
                Thinking on discipleship.
              </h1>
              <p className="mt-7 max-w-2xl font-serif text-[1.55rem] italic leading-9 text-zoe-sap md:text-[2rem] md:leading-10">
                Tech, faith, and what it looks like to walk with Jesus in the everyday.
              </p>
            </div>

            <p className="max-w-sm text-sm font-semibold leading-7 text-zoe-muted lg:justify-self-end">
              Essays from the workbench: SMS discipleship, AI and faith, the habit gap between Sundays, and the product choices behind Zoe.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-zoe-surface p-7 shadow-[0_18px_50px_rgba(45,50,49,0.04)] md:p-9">
            <p className="font-serif text-[4.5rem] italic leading-none text-zoe-sap">{featured.number}</p>
            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.28em] text-zoe-sap">
              Featured · {featured.category}
            </p>
            <h2 className="mt-4 text-[2.6rem] font-extrabold leading-[0.92] tracking-[-0.065em] text-zoe-ink md:text-[4.2rem]">
              {featured.title}
            </h2>
          </div>

          <Link
            href={`/blog/${featured.slug}`}
            className="group flex min-h-[29rem] flex-col justify-between rounded-[2rem] bg-white p-7 shadow-[0_18px_50px_rgba(45,50,49,0.05)] ring-1 ring-zoe-outline/50 transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(45,50,49,0.08)] md:p-9"
          >
            <div>
              <div className="flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-muted">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <p className="mt-10 max-w-2xl text-[1.45rem] font-semibold leading-9 tracking-[-0.035em] text-zoe-ink md:text-[2rem] md:leading-10">
                {featured.description}
              </p>
            </div>
            <span className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-zoe-sap px-5 py-3 text-sm font-bold tracking-normal text-white transition group-hover:bg-zoe-forest [word-spacing:0.16em]">
              Read article
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </section>

        <section className="mx-auto max-w-7xl">
          <div className="grid gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-6 rounded-[2rem] bg-white px-6 py-7 shadow-[0_12px_36px_rgba(45,50,49,0.04)] ring-1 ring-zoe-outline/45 transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(45,50,49,0.07)] md:grid-cols-[7rem_1fr_auto] md:items-center md:px-8"
              >
                <p className="font-serif text-[3.25rem] italic leading-none text-zoe-sap">{post.number}</p>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zoe-sap">{post.category}</p>
                  <h2 className="mt-2 text-[1.75rem] font-extrabold leading-[0.98] tracking-[-0.052em] text-zoe-ink md:text-[2.65rem]">
                    {post.shortTitle}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-zoe-muted">{post.description}</p>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-zoe-muted transition group-hover:text-zoe-forest md:justify-self-end">
                  <span>{post.readTime}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
