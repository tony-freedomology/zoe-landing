import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import type { JourneyContent } from "../../../lib/journeyContent";

export const metadata: Metadata = {
  title: "The Examen: 14 Days of Evening Reflection — Zoe",
  description:
    "Build a nightly habit of noticing God. Fourteen days to build the habit of paying attention at the end of each day.",
};

const days = [
  { "day": 1, "passage": "Psalm 139:23–24", "theme": "Search Me", "prompt": "Review your day. What's one moment you felt most alive today? What's one moment you felt most drained?" },
  { "day": 2, "passage": "Psalm 90:12", "theme": "Numbering Your Days", "prompt": "Walk through your day hour by hour. Where did you feel closest to God? Where did you feel furthest away?" },
  { "day": 3, "passage": "Lamentations 3:22–23", "theme": "New Every Morning", "prompt": "What's one thing today that you're grateful for that you almost missed? Thank God for it specifically." },
  { "day": 4, "passage": "Romans 12:1–2", "theme": "Renewed Minds", "prompt": "Where today did you conform to a pattern around you instead of following what you know is true?" },
  { "day": 5, "passage": "Philippians 4:8–9", "theme": "Think on These Things", "prompt": "Name something true, noble, right, pure, lovely, or admirable from your day. Let your mind rest there." },
  { "day": 6, "passage": "Micah 6:8", "theme": "What Does the Lord Require?", "prompt": "Did you act justly today? Love mercy? Walk humbly? Which one came easiest? Which was hardest?" },
  { "day": 7, "passage": "Matthew 11:28–30", "theme": "Come to Me", "prompt": "Where are you carrying weight that isn't yours to carry? Name it. Lay it down — just for tonight." },
  { "day": 8, "passage": "Colossians 3:15–17", "theme": "Let the Peace of Christ Rule", "prompt": "When did you feel peace today? When did you feel anxiety? What was different about those two moments?" },
  { "day": 9, "passage": "Proverbs 3:5–6", "theme": "Trust and Acknowledge", "prompt": "Where did you lean on your own understanding today? Where did you actually trust God?" },
  { "day": 10, "passage": "1 Thessalonians 5:16–18", "theme": "Rejoice, Pray, Give Thanks", "prompt": "Three things: one joy, one prayer, one thanks from today. Name them out loud." },
  { "day": 11, "passage": "James 1:17", "theme": "Every Good Gift", "prompt": "What good gift came from above today? Sometimes the best ones are the ones we didn't notice at the time." },
  { "day": 12, "passage": "Ephesians 5:15–16", "theme": "Making the Most of Time", "prompt": "How did you spend your time today? Where did time feel wasted? Where did it feel full?" },
  { "day": 13, "passage": "2 Corinthians 4:16–18", "theme": "Unseen and Eternal", "prompt": "What temporary thing consumed your attention today? What eternal thing did you almost overlook?" },
  { "day": 14, "passage": "Psalm 103:1–5", "theme": "Forget Not His Benefits", "prompt": "Review not just today, but the past two weeks. What has God been doing in you? What pattern do you see?" }
];

const journey: JourneyContent = {
  slug: "the-examen",
  title: "The Examen: 14 Days of Evening Reflection",
  duration: "14 Days",
  difficulty: "introductory",
  description:
    "The Examen is a five-hundred-year-old prayer practice from Ignatius of Loyola. It is simple: at the end of each day, look back and notice where God showed up, and where you missed it.",
  metaDescription:
    "Build a nightly habit of noticing God. Fourteen days to build the habit of paying attention at the end of each day.",
  heroAlt: "The Examen: 14 Days of Evening Reflection",
  ctaLabel: "The Examen",
  stats: [
    { label: "Duration", value: "14 Days" },
    { label: "Practice", value: "5-10 min/evening" },
    { label: "Style", value: "Guided reflection" },
  ],
  body: [
    "Ignatius of Loyola called the Examen the most important prayer practice a person could have. The idea is straightforward: before you go to sleep, review your day. Where did you feel most alive? Where did you feel most drained? Where was God present, even if you did not notice at the time?",
    "This 14-day journey walks you through the Examen step by step, adding depth each day. By the end, you will have a nightly practice that takes five minutes and changes how you see everything else. Each evening, Zoe walks you through the reflection and helps you notice patterns you might miss on your own.",
  ],
  days,
};

export default function TheExamenPage() {
  return <JourneyDetailPage journey={journey} />;
}
