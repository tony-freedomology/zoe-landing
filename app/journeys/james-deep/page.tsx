import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import type { JourneyContent } from "../../../lib/journeyContent";

export const metadata: Metadata = {
  title: "James: 10 Days Deep — Zoe",
  description:
    "An intensive single-book study. Faith in action. Wisdom from above.",
};

const days = [
  { "day": 1, "passage": "James 1:1–4", "theme": "Trials as Teachers", "prompt": "What challenge in your life right now might actually be producing something good in you?" },
  { "day": 2, "passage": "James 1:5–8", "theme": "Asking for Wisdom", "prompt": "Where do you most need wisdom today — and are you actually asking for it?" },
  { "day": 3, "passage": "James 1:12–18", "theme": "The Source of Temptation", "prompt": "What desire, if left unchecked, tends to lead you somewhere you don't want to go?" },
  { "day": 4, "passage": "James 1:19–27", "theme": "Hearing and Doing", "prompt": "Is there a truth you know but haven't acted on yet? What's stopping you?" },
  { "day": 5, "passage": "James 2:1–13", "theme": "No Favoritism", "prompt": "Who in your life do you treat as less important because of status, appearance, or wealth?" },
  { "day": 6, "passage": "James 2:14–26", "theme": "Faith and Works", "prompt": "What would someone know about your faith just from watching your actions this week?" },
  { "day": 7, "passage": "James 3:1–12", "theme": "Taming the Tongue", "prompt": "What's something you said recently that you wish you could take back?" },
  { "day": 8, "passage": "James 3:13–4:3", "theme": "Two Kinds of Wisdom", "prompt": "Is the wisdom guiding your decisions right now from God — or from somewhere else?" },
  { "day": 9, "passage": "James 4:4–17", "theme": "Humility Before God", "prompt": "Where are you striving for something God hasn't given you? What would it look like to submit that?" },
  { "day": 10, "passage": "James 5:7–20", "theme": "Patient Endurance", "prompt": "Who in your life needs someone to turn them back toward God right now?" }
];

const journey: JourneyContent = {
  slug: "james-deep",
  title: "James: 10 Days Deep",
  duration: "10 Days",
  difficulty: "intermediate",
  description:
    "James writes to a scattered church, people who claimed faith but lived differently from Monday to Saturday. His letter is less a theology lecture and more a direct conversation: you say you believe. Does your life show it?",
  metaDescription:
    "An intensive single-book study through James. Faith in action. Wisdom from above.",
  heroAlt: "James: 10 Days Deep",
  ctaLabel: "James",
  stats: [
    { label: "Duration", value: "10 Days" },
    { label: "Check-ins", value: "3 per day" },
    { label: "Passages", value: "10 readings" },
  ],
  body: [
    "This 10-day journey moves through the entire Book of James, one passage per day. Each morning, Zoe delivers the passage with historical context and a question to prime your reading.",
    "Then the conversation unfolds. Zoe engages with what stood out to you, asks follow-up questions that go deeper, and helps you land on one concrete thing to carry into your day. By day 10, you will have wrestled with every chapter of James and built a thread of personal reflection that connects across the whole book.",
  ],
  days,
};

export default function JamesDeepPage() {
  return <JourneyDetailPage journey={journey} />;
}
