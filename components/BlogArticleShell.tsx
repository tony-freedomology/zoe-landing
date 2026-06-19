import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Footer from "./Footer";
import StructuredData from "./StructuredData";
import { breadcrumbSchema, toAbsoluteUrl } from "../lib/site";

type BlogArticleShellProps = {
  category: string;
  date: string;
  readTime: string;
  title: string;
  deck: string;
  path: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  children: ReactNode;
};

export default function BlogArticleShell({
  category,
  date,
  readTime,
  title,
  deck,
  path,
  heroImage,
  children,
}: BlogArticleShellProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: deck,
    author: {
      "@type": "Person",
      name: "Tony Allen",
    },
    publisher: {
      "@type": "Organization",
      name: "Zoe",
      url: toAbsoluteUrl("/"),
    },
    mainEntityOfPage: toAbsoluteUrl(path),
    image: heroImage ? toAbsoluteUrl(heroImage.src) : undefined,
  };

  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <StructuredData id="article-schema" data={articleSchema} />
      <StructuredData
        id="breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: title, path },
        ])}
      />
      <main className="px-6 pb-24 pt-36">
        <article className="mx-auto max-w-6xl">
          <Link href="/blog" className="mb-16 inline-flex text-sm font-semibold text-zoe-muted transition hover:text-zoe-forest">
            Back to blog
          </Link>

          <header className="border-b border-zoe-outline/60 pb-12">
            <h1 className="max-w-[19ch] text-[3.75rem] font-extrabold leading-[0.91] tracking-[-0.042em] text-zoe-ink md:text-[4.6rem] md:tracking-[-0.048em] lg:text-[5rem]">
              {title}
            </h1>
            {deck ? (
              <p className="mt-7 font-serif text-[1.55rem] italic leading-9 text-zoe-sap md:text-[1.9rem] md:leading-10">
                {deck}
              </p>
            ) : null}
            <p className="mt-8 text-sm font-semibold text-zoe-muted">Tony Allen · Founder · {date} · {category} · {readTime}</p>
          </header>

          {heroImage ? (
            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-[720px] overflow-hidden rounded-[2rem] bg-zoe-surface shadow-[0_22px_60px_rgba(45,50,49,0.06)]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 768px) 720px, calc(100vw - 48px)"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="blog-editorial-prose mx-auto mt-12 max-w-[720px]">
            {children}
          </div>

          <aside className="mx-auto mt-16 max-w-[720px] rounded-[2rem] bg-zoe-surface px-7 py-8 text-center shadow-[0_18px_50px_rgba(45,50,49,0.05)] md:px-10">
            <h2 className="text-3xl font-extrabold leading-[0.98] tracking-[-0.035em] text-zoe-ink md:text-4xl">
              Scripture in the place you already check.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base font-medium leading-7 text-zoe-muted">
              Join the Zoe waitlist and start with a rhythm that fits inside your actual day.
            </p>
            <Link
              href="/#waitlist"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-zoe-sap px-7 py-4 text-sm font-bold text-white shadow-[0_18px_36px_rgba(29,194,134,0.18)] transition hover:-translate-y-0.5 hover:bg-zoe-forest"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
}
