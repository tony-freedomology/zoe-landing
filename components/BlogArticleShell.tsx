import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "./Footer";
import StructuredData from "./StructuredData";
import CopyLinkButton from "./blog/CopyLinkButton";
import ReadingProgress from "./blog/ReadingProgress";
import { btnJade } from "./home/styles";
import { defaultTryIt, getBlogPost, isoMonth, relatedPosts, type BlogPost } from "../lib/blogPosts";
import { journeyCatalog } from "../lib/journeyCatalog";
import { getJourneyCardImagePath } from "../lib/journeyImages";
import { DEFAULT_OG_IMAGE } from "../lib/seo";
import { breadcrumbSchema, toAbsoluteUrl } from "../lib/site";

type BlogArticleShellProps = {
  /** Slug of the post in lib/blogPosts.ts; title, date, hero, and extras come from there. */
  slug: string;
  /** Header deck. Defaults to the post's description. */
  deck?: string;
  children: ReactNode;
};

const HEADSHOT = "/assets/founder/tony-headshot.webp";
const PROSE_ID = "post-prose";

function firstSentence(text: string) {
  const match = text.match(/^.+?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
}

function TryItCard({ post }: { post: BlogPost }) {
  const tryIt = post.tryIt ?? defaultTryIt;
  return (
    <div className="grid items-center gap-[clamp(20px,3vw,32px)] rounded-[28px] bg-zoe-surface p-[clamp(22px,3vw,32px)] min-[721px]:grid-cols-2">
      <div>
        <h3 className="text-[clamp(24px,2.4vw,30px)] font-extrabold leading-[1.1] tracking-[-0.035em] text-zoe-ink [text-wrap:balance]">
          {tryIt.headline}{" "}
          <em className="font-serif font-normal italic tracking-normal text-zoe-sap">{tryIt.headlineAccent}</em>
        </h3>
        <p className="mt-2.5 text-[15.5px] font-medium leading-[1.55] text-zoe-muted">{tryIt.body}</p>
        <Link href="/#waitlist" className={`${btnJade} mt-[18px] !px-6 !py-[15px]`}>
          Join the walk
        </Link>
      </div>
      <div className="grid gap-1.5" role="group" aria-label="Example text conversation with Zoe">
        {tryIt.time ? (
          <span className="justify-self-center text-[11px] font-bold text-[#8a8a8e]">{tryIt.time}</span>
        ) : null}
        {tryIt.messages.map((message, index) =>
          message.from === "zoe" ? (
            <p
              key={index}
              className="max-w-[88%] justify-self-start rounded-[19px] rounded-bl-[6px] bg-white px-[13px] py-[9px] text-[14.5px] font-medium leading-[1.36] text-[#111] shadow-[0_4px_12px_rgba(45,50,49,0.06)]"
            >
              <span className="sr-only">Zoe: </span>
              {message.text}
            </p>
          ) : (
            <p
              key={index}
              className="max-w-[88%] justify-self-end rounded-[19px] rounded-br-[6px] bg-[#007AFF] px-[13px] py-[9px] text-[14.5px] font-medium leading-[1.36] text-white"
            >
              <span className="sr-only">You: </span>
              {message.text}
            </p>
          ),
        )}
      </div>
    </div>
  );
}

function RelatedJourneyCard({ post }: { post: BlogPost }) {
  const journey = post.relatedJourney
    ? journeyCatalog.find((entry) => entry.slug === post.relatedJourney)
    : undefined;
  if (!journey) return null;
  const note = post.relatedJourneyNote ?? firstSentence(journey.description);

  return (
    <Link
      href={`/journeys/${journey.slug}`}
      className="group grid items-center gap-5 rounded-[26px] bg-white p-2.5 pb-4 no-underline outline outline-1 outline-zoe-outline/45 transition-transform duration-200 hover:-translate-y-0.5 min-[561px]:grid-cols-[220px_1fr] min-[561px]:p-3"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getJourneyCardImagePath(journey.image)}
        alt=""
        width={640}
        height={357}
        loading="lazy"
        decoding="async"
        className="block aspect-[1376/768] h-auto w-full rounded-[18px] bg-zoe-surface"
      />
      <div className="px-1.5 min-[561px]:px-0">
        <small className="text-[12.5px] font-extrabold text-zoe-forest">
          Related journey · {journey.duration.toLowerCase()}
        </small>
        <b className="mt-1 block text-[19px] font-extrabold leading-[1.2] tracking-[-0.02em] text-zoe-ink">
          {journey.title}
        </b>
        <span className="mt-1.5 block text-[14.5px] font-medium leading-[1.5] text-zoe-muted">{note}</span>
      </div>
    </Link>
  );
}

export default function BlogArticleShell({ slug, deck, children }: BlogArticleShellProps) {
  const post = getBlogPost(slug);
  const path = `/blog/${post.slug}`;
  const headerDeck = deck ?? post.description;
  const published = isoMonth(post.date);
  const keepReading = relatedPosts(post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: headerDeck,
    ...(published ? { datePublished: published } : {}),
    author: {
      "@type": "Person",
      name: "Tony Allen",
      url: toAbsoluteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      name: "Zoe",
      url: toAbsoluteUrl("/"),
    },
    mainEntityOfPage: toAbsoluteUrl(path),
    image: toAbsoluteUrl(post.heroImage ?? DEFAULT_OG_IMAGE.url),
  };

  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <StructuredData id="article-schema" data={articleSchema} />
      <StructuredData
        id="breadcrumb-schema"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ])}
      />
      <ReadingProgress targetId={PROSE_ID} />

      <main className="mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)] pb-[clamp(72px,9vw,120px)]">
        <article>
          <header className="mx-auto max-w-[900px] pt-[calc(68px+clamp(36px,6vw,80px))]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-sm font-bold text-zoe-muted">
              <Link href="/blog" className="text-zoe-forest no-underline hover:underline">
                Journal
              </Link>
              <span aria-hidden="true">/</span>
              <span className="rounded-full bg-[#E4F6EE] px-[11px] py-[5px] text-[12.5px] text-zoe-forest">
                {post.category}
              </span>
            </nav>
            <h1 className="mt-[22px] text-[clamp(36px,5.6vw,72px)] font-extrabold leading-none tracking-[-0.045em] text-zoe-ink [text-wrap:balance]">
              {post.title}
            </h1>
            {headerDeck ? (
              <p className="mt-5 max-w-[46ch] text-[clamp(18px,1.8vw,22px)] font-medium leading-[1.5] text-zoe-muted">
                {headerDeck}
              </p>
            ) : null}
            <div className="mt-[30px] flex flex-wrap items-center justify-between gap-4 border-y border-zoe-outline/55 py-[18px]">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HEADSHOT}
                  alt=""
                  width={46}
                  height={46}
                  className="h-[46px] w-[46px] shrink-0 rounded-full object-cover shadow-[0_4px_12px_rgba(0,0,0,0.12)] outline outline-2 outline-white"
                />
                <div>
                  <b className="block text-[15px] font-bold text-zoe-ink">Tony Allen</b>
                  <span className="text-[13.5px] font-medium text-zoe-muted">
                    <span className="whitespace-nowrap">Pastor, building Zoe</span> ·{" "}
                    <span className="whitespace-nowrap">{post.date}</span> ·{" "}
                    <span className="whitespace-nowrap">{post.readTime}</span>
                  </span>
                </div>
              </div>
              <CopyLinkButton url={toAbsoluteUrl(path)} />
            </div>
          </header>

          {post.heroImage ? (
            <figure className="mx-auto mt-[clamp(28px,4vw,48px)] aspect-[16/9] max-w-[1040px] overflow-hidden rounded-[28px] bg-zoe-surface shadow-[0_26px_60px_rgba(45,50,49,0.10)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.heroImage}
                alt={post.heroAlt ?? ""}
                width={1600}
                height={900}
                fetchPriority="high"
                className="block h-full w-full object-cover"
              />
            </figure>
          ) : null}

          <div id={PROSE_ID} className="blog-prose">
            {children}
          </div>

          <section aria-label="About the author and next steps" className="mx-auto mt-[clamp(56px,7vw,88px)] grid max-w-[680px] gap-[18px]">
            <div className="grid grid-cols-[56px_1fr] items-start gap-4 min-[480px]:items-center rounded-[26px] bg-white px-5 py-5 outline outline-1 outline-zoe-outline/45 min-[480px]:grid-cols-[72px_1fr] min-[480px]:gap-[18px] min-[480px]:px-6 min-[480px]:py-[22px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HEADSHOT}
                alt="Tony Allen"
                width={72}
                height={72}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover min-[480px]:h-[72px] min-[480px]:w-[72px]"
              />
              <div>
                <b className="block text-[17px] font-bold tracking-[-0.01em] text-zoe-ink">Written by Tony Allen</b>
                <p className="mt-1 text-[15px] font-medium leading-[1.55] text-zoe-muted">
                  Pastor for 15 years, building Zoe in public. I read every reply.
                </p>
                <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold text-zoe-muted">
                  <Link href="/about" className="text-zoe-forest no-underline hover:underline">
                    More about me →
                  </Link>
                  <span>
                    Email: <code className="select-all font-sans font-extrabold text-zoe-ink">tony@zoe.live</code>
                  </span>
                </p>
              </div>
            </div>

            <TryItCard post={post} />
            <RelatedJourneyCard post={post} />
          </section>

          {keepReading.length > 0 ? (
            <section
              aria-labelledby="keep-reading"
              className="mx-auto mt-[clamp(64px,8vw,104px)] max-w-[1040px] border-t border-zoe-outline/55 pt-[clamp(40px,5vw,56px)]"
            >
              <h2 id="keep-reading" className="text-[clamp(28px,3vw,38px)] font-extrabold tracking-[-0.04em] text-zoe-ink">
                Keep reading
              </h2>
              <div className="mt-[22px] grid gap-3.5 min-[861px]:grid-cols-3">
                {keepReading.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/blog/${entry.slug}`}
                    className="grid content-start gap-2.5 rounded-[22px] bg-white p-[22px] no-underline outline outline-1 outline-zoe-outline/40 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <small className="text-[12.5px] font-bold text-zoe-muted">
                      {entry.date} · {entry.readTime}
                    </small>
                    <b className="text-[18.5px] font-extrabold leading-[1.25] tracking-[-0.02em] text-zoe-ink">
                      {entry.title}
                    </b>
                    <span className="text-[14.5px] font-medium leading-[1.5] text-zoe-muted">{entry.description}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>

      <Footer />
    </div>
  );
}
