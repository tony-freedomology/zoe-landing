import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import type { JourneyContent } from "../../../lib/journeyContent";

export const metadata: Metadata = {
  title: "New Believer — 21-Day First Steps Journey",
  description:
    "A 21-day guided journey for new believers. Learn to pray, read Scripture, and build the habits that make faith stick — one text message at a time.",
};

const days = [
  { day: 1, theme: "You Are Known", passage: "Psalm 139:1–16", prompt: "How does it feel to know that God has known you fully — before you knew anything about him?" },
  { day: 2, theme: "What It Means to Follow", passage: "Matthew 4:18–22", prompt: "Jesus said 'follow me.' What do you think that actually looks like in your everyday life?" },
  { day: 3, theme: "Born Again", passage: "John 3:1–8", prompt: "What's something in your life that you notice has already started to change since you said yes to Jesus?" },
  { day: 4, theme: "Grace Is Real", passage: "Ephesians 2:1–10", prompt: "In your own words, what is grace? How is it different from earning something?" },
  { day: 5, theme: "Talking to God", passage: "Matthew 6:5–13", prompt: "What's one honest thing you want to say to God today that you haven't said out loud yet?" },
  { day: 6, theme: "Reading the Bible", passage: "Psalm 119:105–112", prompt: "What's your honest relationship with Scripture been so far — exciting, confusing, both?" },
  { day: 7, theme: "The Holy Spirit", passage: "John 14:15–17, 26", prompt: "Have you experienced a moment where you felt led by something other than your own instinct? What was that?" },
  { day: 8, theme: "Sin and Forgiveness", passage: "1 John 1:5–2:2", prompt: "Is there something you're still carrying guilt over, even after becoming a Christian?" },
  { day: 9, theme: "Temptation Is Normal", passage: "1 Corinthians 10:12–13", prompt: "What's a recurring temptation in your life, and what would it look like to take the 'way out' God provides?" },
  { day: 10, theme: "The Church", passage: "Acts 2:42–47", prompt: "What's your relationship with church been like so far? What feels welcoming? What feels confusing?" },
  { day: 11, theme: "Community", passage: "Hebrews 10:24–25", prompt: "Who in your life do you feel like you could be honest about your faith with?" },
  { day: 12, theme: "Faith and Doubt", passage: "Mark 9:24; John 20:24–29", prompt: "What's a doubt or question about faith you've been carrying but haven't felt safe to ask?" },
  { day: 13, theme: "Worship", passage: "Psalm 100", prompt: "What's one specific thing about God that you genuinely feel grateful for today?" },
  { day: 14, theme: "Serving Others", passage: "Mark 10:42–45", prompt: "Is there someone in your life right now who needs something you could give — time, help, attention?" },
  { day: 15, theme: "Identity in Christ", passage: "2 Corinthians 5:17; Galatians 2:20", prompt: "What's one part of your old identity that you're still holding onto — that God might be asking you to let go?" },
  { day: 16, theme: "Baptism", passage: "Romans 6:3–11", prompt: "If you've been baptized, what does that mean to you now? If you haven't, what's keeping you from it?" },
  { day: 17, theme: "The Bible as Story", passage: "Luke 24:27, 44–47", prompt: "How does knowing that Jesus is the center of the whole Bible change how you read it?" },
  { day: 18, theme: "Prayer That Waits", passage: "Psalm 27:13–14", prompt: "What are you waiting for from God right now? How are you doing at waiting?" },
  { day: 19, theme: "Generosity", passage: "2 Corinthians 9:6–8", prompt: "What does generosity look like in your life right now — with money, time, or attention?" },
  { day: 20, theme: "Sharing Your Faith", passage: "1 Peter 3:15–16", prompt: "Is there someone in your life who doesn't know Jesus yet who you'd want to share this with?" },
  { day: 21, theme: "The Long Walk", passage: "Philippians 1:6; Jude 24–25", prompt: "What's one thing you want to carry forward from these 21 days? What does the next step look like for you?" },
];

const journey: JourneyContent = {
  slug: "new-believer",
  title: "First Steps: A New Believer Journey",
  duration: "21 Days",
  difficulty: "introductory",
  description:
    "The first weeks after saying yes to Jesus are some of the most important and most vulnerable. This journey gives you a steady daily path for those first steps.",
  metaDescription:
    "A 21-day guided journey for new believers. Learn to pray, read Scripture, and build the habits that make faith stick, one text message at a time.",
  heroAlt: "First Steps: A New Believer Journey",
  ctaLabel: "First Steps",
  stats: [
    { label: "Duration", value: "21 Days" },
    { label: "Check-ins", value: "3 per day" },
    { label: "Topics", value: "21 foundations" },
  ],
  body: [
    "New faith is tender. There are a thousand questions, a lot of excitement, and also a lot of uncertainty. What does it even mean to follow Jesus in an ordinary week?",
    "This 21-day journey is built for exactly that season. Each day covers one foundational topic, from prayer to doubt to baptism to the long walk ahead. Zoe checks in three times a day with the passage, a reflection question, and space to actually think it through.",
    "No app. No homework. Just a text message that meets you where you are.",
  ],
  days,
};

export default function NewBelieverPage() {
  return <JourneyDetailPage journey={journey} />;
}
