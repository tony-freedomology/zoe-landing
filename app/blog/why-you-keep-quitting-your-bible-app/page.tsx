import type { Metadata } from "next";
import FaqSchema from "../../../components/FaqSchema";
import BlogArticleShell from "../../../components/BlogArticleShell";

export const metadata: Metadata = {
  openGraph: {
    images: ["/blog/why-you-keep-quitting-your-bible-app/hero.jpg"],
  },
  title: "Why You Keep Quitting Your Bible App (And What Actually Works)",
  description:
    "71% of apps are abandoned within 90 days. Bible apps are no different. The problem is friction, and the fix is simpler than you think.",
};

const faqs = [
  {
    q: "Why do people stop using Bible apps?",
    a: "The same reason people stop using most apps: friction. You have to remember to open it, find where you left off, ignore notifications from other apps, and stay focused.",
  },
  {
    q: "What is the best alternative to a Bible app?",
    a: "SMS-based discipleship tools like Zoe deliver daily scripture directly to your text messages. No app to open, no login, no competing notifications.",
  },
  {
    q: "Does Zoe replace my Bible?",
    a: "No. Zoe works alongside your Bible, your church, and your community by helping you build a consistent scripture rhythm.",
  },
];

export default function WhyYouKeepQuittingPage() {
  return (
    <>
      <FaqSchema faqs={faqs} />
      <BlogArticleShell
        category="Discipleship"
        date="March 2026"
        readTime="8 min read"
        title="Why You Keep Quitting Your Bible App"
        deck="Most people do not need more guilt. They need less friction between intention and scripture."
      >
        <p>You have done this before. Probably more than once.</p>
        <p>You download a Bible app. Day one, you are in. You pick a reading plan. You read the passage. Day two, same thing. Day three, a text interrupts Psalm 23. Day four, you forget entirely.</p>
        <p>By day fourteen, the app is buried on your third home screen and mentally filed under things you should do but do not.</p>

        <blockquote>The desire was real. The delivery mechanism kept failing.</blockquote>

        <h2>The App Abandonment Problem</h2>
        <p>Industry data says 71% of mobile apps are abandoned within 90 days of download. Bible apps are not immune to this. They have to compete with every other app on your phone: Instagram, Gmail, Slack, iMessage, banking, school apps, and the rest of the noise.</p>
        <p>The conventional wisdom says you need more discipline. Wake up earlier. Use an app blocker. Try harder.</p>
        <p>But discipline is finite. By the time most people have space to sit with scripture, their willpower is thin. The app sits beside forty-seven other demands and loses.</p>

        <h2>The Friction Model</h2>
        <p>In product design, friction is the number of steps between wanting to do something and actually doing it. Every added step loses people.</p>
        <p>A typical Bible app asks you to remember, unlock, find the app, wait for it to load, find your plan, find your place, and read while ignoring everything else.</p>
        <p>With SMS, the path is shorter: your phone buzzes, and you read the text.</p>

        <h2>Why SMS Works</h2>
        <p>Text messages live in a channel you already check. You do not have to form a new habit. You do not have to remember to open anything. Scripture arrives in the same place as conversations with friends and family.</p>
        <p>There is a psychological difference too. A notification feels like a demand. A text feels like a conversation. One triggers guilt. The other can trigger curiosity.</p>

        <h2>What Zoe Does Differently</h2>
        <p>Zoe is an SMS discipleship tool. No app. No download. You pick a book of the Bible and a reading pace, and every day you get a passage with original-language context.</p>
        <p>Maybe the passage uses the word endurance and Zoe surfaces the Greek word <em>hypomone</em>, which does not mean "hang in there." It means remaining under the weight with purpose. That kind of depth changes how you read the verse, and it can take ninety seconds.</p>
        <p>Zoe uses AI in the background to surface context, remember commitments, and help you return to what you said. The AI is a research and memory tool, not your pastor or counselor.</p>

        <h2>For Pastors</h2>
        <p>If you lead a church, you already know the discipleship gap is real. You preach on Sunday and hope it sticks through the week. Sometimes it does. Often it does not.</p>
        <p>Zoe fills the space between Sundays. Daily, personal, zero friction.</p>

        <h2>Frequently Asked</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <p><strong>{item.q}</strong></p>
            <p>{item.a}</p>
          </div>
        ))}
      </BlogArticleShell>
    </>
  );
}
