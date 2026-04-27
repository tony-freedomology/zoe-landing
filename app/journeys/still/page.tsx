import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import type { JourneyContent } from "../../../lib/journeyContent";

export const metadata: Metadata = {
  title: "Still: 21 Days of Contemplative Prayer — Zoe",
  description:
    "Learn to be present with God in silence. Twenty-one days of building a contemplative prayer practice.",
};

const days = [
  { "day": 1, "passage": "Psalm 46:10", "theme": "Be Still", "prompt": "Sit in silence for 2 minutes. Don't try to think about anything. Just breathe and be present." },
  { "day": 2, "passage": "1 Kings 19:11–13", "theme": "The Still Small Voice", "prompt": "3 minutes of silence. When thoughts come, let them pass like clouds. You're listening, not performing." },
  { "day": 3, "passage": "Psalm 131:1–3", "theme": "A Calmed Soul", "prompt": "3 minutes of silence. Picture yourself as a child resting in a parent's arms. No agenda." },
  { "day": 4, "passage": "Matthew 6:6", "theme": "The Inner Room", "prompt": "Find your quiet place. 4 minutes of silence. Notice what you feel when the noise stops." },
  { "day": 5, "passage": "Psalm 62:1–2", "theme": "My Soul Waits", "prompt": "5 minutes of silence. Choose one word — peace, Jesus, love — and return to it when you get distracted." },
  { "day": 6, "passage": "Psalm 23:1–3", "theme": "Still Waters", "prompt": "Read the passage slowly, three times. 5 minutes of sitting with whatever phrase stays with you." },
  { "day": 7, "passage": "Exodus 14:14", "theme": "The Lord Will Fight For You", "prompt": "5 minutes. Breathe in 'The Lord will fight for me.' Breathe out whatever you're holding onto." },
  { "day": 8, "passage": "Lamentations 3:25–26", "theme": "Waiting Quietly", "prompt": "6 minutes of centering prayer. Choose a sacred word. When thoughts pull you away, gently return to it." },
  { "day": 9, "passage": "Isaiah 30:15", "theme": "In Quietness and Trust", "prompt": "6 minutes. Let go of the need to hear anything specific. Trust is being present without needing a result." },
  { "day": 10, "passage": "Psalm 27:4", "theme": "One Thing", "prompt": "7 minutes. What is the 'one thing' you want from God? Sit with that question in silence." },
  { "day": 11, "passage": "Mark 1:35", "theme": "A Solitary Place", "prompt": "7 minutes. Jesus got up before dawn to pray alone. What does your solitary place look like?" },
  { "day": 12, "passage": "Psalm 139:1–4", "theme": "Known Completely", "prompt": "8 minutes of being known. You don't need to explain yourself to God. Just sit in the truth that you are fully seen." },
  { "day": 13, "passage": "John 15:4–5", "theme": "Abide", "prompt": "8 minutes. Breathe in 'abide in me.' Breathe out 'I abide in you.' Let the rhythm carry you." },
  { "day": 14, "passage": "Psalm 16:11", "theme": "Fullness of Joy", "prompt": "9 minutes. You're halfway through. Notice how silence feels different now than on day 1." },
  { "day": 15, "passage": "Romans 8:26–27", "theme": "The Spirit Intercedes", "prompt": "9 minutes. You don't need to find the words. The Spirit prays when you can't." },
  { "day": 16, "passage": "Psalm 63:1–4", "theme": "My Soul Thirsts", "prompt": "10 minutes. What are you thirsty for? Name it, then sit with God in that longing." },
  { "day": 17, "passage": "Luke 10:38–42", "theme": "The Better Part", "prompt": "10 minutes. Mary chose to sit at Jesus' feet. Today, you're choosing the same thing." },
  { "day": 18, "passage": "Psalm 42:1–2", "theme": "As the Deer", "prompt": "12 minutes. Let your soul pant for God. No performance. Just honest desire." },
  { "day": 19, "passage": "Habakkuk 2:20", "theme": "Let All the Earth Be Silent", "prompt": "12 minutes. The Lord is in his holy temple. Let all the earth — including the noise in your head — be silent." },
  { "day": 20, "passage": "Psalm 37:7", "theme": "Be Still Before the Lord", "prompt": "15 minutes. You've built something here. This isn't just an exercise anymore — it's a relationship." },
  { "day": 21, "passage": "Psalm 84:1–4", "theme": "Better Is One Day", "prompt": "15 minutes. This is your last guided day, but the practice is yours now. What has shifted in you?" }
];

const journey: JourneyContent = {
  slug: "still",
  title: "Still: 21 Days of Contemplative Prayer",
  duration: "21 Days",
  difficulty: "introductory",
  description:
    "Most of us talk at God. This journey teaches you to sit with God. Twenty-one days of building a contemplative prayer practice, starting with just two minutes of silence.",
  metaDescription:
    "Learn to be present with God in silence. Twenty-one days of building a contemplative prayer practice.",
  heroAlt: "Still: 21 Days of Contemplative Prayer",
  ctaLabel: "Still",
  stats: [
    { label: "Duration", value: "21 Days" },
    { label: "Practice", value: "2-15 min/day" },
    { label: "Passages", value: "21 readings" },
  ],
  body: [
    "We live in a world that is always talking. Notifications, opinions, noise. And most of our prayer life follows the same pattern: we talk, God listens, we move on. But the deepest spiritual traditions across two thousand years of Christianity point to something different: being still enough to listen.",
    "This journey starts simple. Day one, you will sit in silence for two minutes. That is it. By day 21, you will have built a sustainable contemplative prayer practice. Along the way, Zoe introduces you to centering prayer, lectio divina, breath prayer, and the prayer of examen, each one paired with a short scripture passage and a guided reflection.",
  ],
  days,
};

export default function StillPage() {
  return <JourneyDetailPage journey={journey} />;
}
