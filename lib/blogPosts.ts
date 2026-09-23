export type BlogMessage = {
  from: "user" | "zoe";
  text: string;
};

/** Per-post "Try it with Zoe" card shown after the article. */
export type BlogTryIt = {
  /** Plain lead-in, e.g. "Try it with Zoe:". */
  headline: string;
  /** Serif-accent phrase that follows the headline. */
  headlineAccent: string;
  body: string;
  /** Optional timestamp shown above the exchange, e.g. "Tuesday 9:14 PM". */
  time?: string;
  messages: BlogMessage[];
};

export type BlogPost = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  /** Display date, e.g. "June 2026". */
  date: string;
  readTime: string;
  category: string;
  number: string;
  /** Optional 16:9 hero. Posts without one render a text-only header. */
  heroImage?: string;
  heroAlt?: string;
  tryIt?: BlogTryIt;
  /** Slug from lib/journeyCatalog.ts. */
  relatedJourney?: string;
  /** Optional one-line reason for the related journey (defaults to the journey's first sentence). */
  relatedJourneyNote?: string;
};

export const defaultTryIt: BlogTryIt = {
  headline: "Try it with Zoe:",
  headlineAccent: "a simple rhythm by text.",
  body: "Zoe texts you a passage in the morning, a nudge when the day gets loud, and one question before sleep.",
  messages: [
    { from: "zoe", text: "Morning ☀️ What's one thing you want to bring to God today?" },
    { from: "user", text: "the meeting at 10" },
    { from: "zoe", text: "Bring it. I'll check in after 🙂" },
  ],
};

/** Newest first. The first post is featured on /blog. */
export const blogPosts: BlogPost[] = [
  {
    slug: "can-god-speak-through-ai",
    title: "Can God Speak Through AI?",
    shortTitle: "Can God Speak Through AI?",
    description:
      "AI is not alive, spiritual, or a substitute for the Holy Spirit. But can God still use it?",
    date: "September 2026",
    readTime: "11 min read",
    category: "AI & Faith",
    number: "05",
    tryIt: {
      headline: "Try it with Zoe:",
      headlineAccent: "test everything.",
      body: "Zoe will tell you plainly what it is, and point you back to Scripture and wise people.",
      time: "Thursday 10:31 PM",
      messages: [
        { from: "user", text: "zoe… did God tell you to tell me that?" },
        { from: "zoe", text: "No. I can't hear from God, and I'd never want to borrow His voice." },
        {
          from: "zoe",
          text: "But if something here rang true, it's worth testing: does it line up with Scripture? Would a wise friend who knows you agree? 🙂",
        },
      ],
    },
    relatedJourney: "prayer",
  },
  {
    slug: "ai-can-sort-your-thoughts",
    title: "AI Can Sort Your Thoughts, but it Can’t Receive Your Prayers",
    shortTitle: "AI Can Sort Your Thoughts",
    description:
      "A look at what happens when our instinct for prayer gets hijacked.",
    date: "June 2026",
    readTime: "7 min read",
    category: "AI & Faith",
    number: "04",
    heroImage: "/images/blog-ai-prayer-reflex.webp",
    heroAlt:
      "A warm desk with a Bible, journal, candle, coffee, and laptop, suggesting the difference between reflection and prayer.",
    tryIt: {
      headline: "Try it with Zoe:",
      headlineAccent: "sort it, then pray it.",
      body: "Zoe can help you name what you're carrying. Then it points you back to the One who can actually receive it.",
      time: "Tuesday 9:14 PM",
      messages: [
        { from: "user", text: "my head is a mess tonight. work stuff, my mom, money" },
        { from: "zoe", text: "That's a lot at once 💛 Want to name them one line each?" },
        { from: "user", text: "ok. the deadline. mom's appointment. the car" },
        {
          from: "zoe",
          text: "Good. Now try bringing that same list to God, one line at a time. No perfect words needed 🙏",
        },
      ],
    },
    relatedJourney: "still",
    relatedJourneyNote: "Tony mentions it in the post: less talking at God, more turning to gaze at Him.",
  },
  {
    slug: "can-ai-help-you-walk-with-jesus",
    title: "Can AI Help You Walk With Jesus?",
    shortTitle: "Can AI Help You Walk With Jesus?",
    description:
      "A plainspoken note on building Zoe carefully, honestly, and in public.",
    date: "May 2026",
    readTime: "4 min read",
    category: "AI & Faith",
    number: "03",
    heroImage: "/images/blog/ai-help-walk-with-jesus.webp",
    heroAlt: "A phone, open Bible, notebook, and meeting calendar on a warm morning desk",
    tryIt: {
      headline: "Try it with Zoe:",
      headlineAccent: "try it honestly.",
      body: "Zoe is upfront about what it is, and about what it can't do.",
      time: "Sunday 8:40 PM",
      messages: [
        { from: "user", text: "honestly not sure how i feel about an AI in my faith life" },
        { from: "zoe", text: "That's fair 🙂 I'm AI. I can't replace prayer, church, or the people who know you." },
        {
          from: "zoe",
          text: "What I can do is help you remember to turn toward Jesus during the day. Want to try a simple morning rhythm this week?",
        },
      ],
    },
    relatedJourney: "way-of-jesus",
  },
  {
    slug: "rhythm-instead-of-another-devotional-feed",
    title: "Why Zoe Starts With Rhythm Instead of Another Devotional Feed",
    shortTitle: "Zoe Starts With Rhythm",
    description:
      "The interesting question is whether AI can help us pay attention to Jesus when the day gets loud.",
    date: "May 2026",
    readTime: "7 min read",
    category: "Product",
    number: "02",
    heroImage: "/images/blog/window-devotion-wide.webp",
    heroAlt: "A steaming mug beside an open journal and a phone on a wooden desk below a window",
    tryIt: {
      headline: "Try it with Zoe:",
      headlineAccent: "start smaller.",
      body: "A rhythm you'll actually keep beats a plan you'll quit by Thursday.",
      time: "Monday 7:02 AM",
      messages: [
        { from: "user", text: "i keep starting devotionals and quitting by day 4" },
        { from: "zoe", text: "Most of us do 😅 Want to start smaller?" },
        {
          from: "zoe",
          text: "One passage at 7am and one question before bed. That's the whole plan. We can add more later.",
        },
      ],
    },
    relatedJourney: "the-examen",
  },
  {
    slug: "what-should-zoe-do-in-the-morning",
    title: "What Should Zoe Do in the Morning?",
    shortTitle: "What Should Zoe Do in the Morning?",
    description:
      "A question about mornings, Scripture, and what kind of help is actually helpful.",
    date: "May 2026",
    readTime: "4 min read",
    category: "Product",
    number: "01",
    heroImage: "/images/blog/morning-scripture-tabletop.webp",
    heroAlt: "Coffee, journal, Bible, and phone on a wooden table in morning light",
    tryIt: {
      headline: "Try it with Zoe:",
      headlineAccent: "begin with Jesus.",
      body: "One passage and one honest question, before the email and the noise.",
      time: "7:00 AM",
      messages: [
        {
          from: "zoe",
          text: "Morning ☀️ \"In the morning, LORD, you hear my voice; in the morning I lay my requests before you and wait expectantly.\" Psalm 5:3 (NIV)",
        },
        { from: "zoe", text: "What's one thing you want to bring to God before the day starts?" },
        { from: "user", text: "the meeting at 10" },
        { from: "zoe", text: "Bring it to Him first. I'll check in after 🙂" },
      ],
    },
    relatedJourney: "rooted",
  },
];

export function getBlogPost(slug: string): BlogPost {
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) throw new Error(`Unknown blog post: ${slug}`);
  return post;
}

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** "June 2026" -> "2026-06" (ISO 8601 year-month) for Article JSON-LD. */
export function isoMonth(date: string): string | undefined {
  const match = date.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return undefined;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  return month < 0 ? undefined : `${match[2]}-${String(month + 1).padStart(2, "0")}`;
}

/** Three other posts: same category first, then newest. */
export function relatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getBlogPost(slug);
  const others = blogPosts.filter((post) => post.slug !== slug);
  const same = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...same, ...rest].slice(0, count);
}
