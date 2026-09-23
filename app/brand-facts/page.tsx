import type { Metadata } from "next";
import { withSocial } from "../../lib/seo";
import Footer from "../../components/Footer";
import { CloseCta, CompareTable, FaqList, GuideHero, cardClass, h2Class, proseClass } from "../guides/_components/GuideParts";

export const metadata: Metadata = withSocial({
  title: "Brand Facts",
  description:
    "Plain facts about Zoe: AI that helps you walk with Jesus by text, with a morning anchor, a midday nudge, an evening reflection, and gentle follow-through.",
  alternates: {
    canonical: "/brand-facts",
  },
});

const day = [
  {
    title: "Morning anchor",
    body: "A short passage, a little context when it helps (history, culture, sometimes the original language), and one question to carry into the day.",
  },
  {
    title: "Midday nudge",
    body: "A brief text that brings the morning back into the middle of real life. Short, gentle, no guilt.",
  },
  {
    title: "Evening reflection",
    body: "A question or two to close the loop. Where did you notice God today? Where did you drift? Who do you need to talk to?",
  },
  {
    title: "Conversation any time",
    body: "Text Zoe about a passage, a decision, a hard conversation coming up, or something you want help remembering.",
  },
];

const features = [
  {
    title: "Memory and follow-through",
    body: "Zoe remembers what you're reading, what you're wrestling with, and what you said mattered. Then it checks back at the right time. Nervous about an interview? It'll ask how it went.",
  },
  {
    title: "Help remembering to pray",
    body: "Tell Zoe who and what you're praying for. It reminds you to bring those people back to God and follows up later to ask how things are going. Zoe doesn't pray for you. It helps you remember to pray.",
  },
  {
    title: "Journeys",
    body: "Pick a pre-made Journey (James, anxiety, marriage, grief, rest, and more) or ask for your own, like \"help me read Philippians over two weeks.\"",
  },
  {
    title: "A simple rule of life",
    body: "Zoe can help you set up a small set of rhythms (one daily practice, one weekly practice, one relational rhythm, one weekly review) and then quietly help you keep it. No streaks, points, or badges.",
  },
  {
    title: "It lives in your texts",
    body: "Works over SMS and iMessage. No app to download, no login, no dashboard to remember. Text STOP any time and it stops.",
  },
  {
    title: "Built to point past itself",
    body: "Zoe is AI and says so. It nudges you toward Jesus, scripture, prayer, your church, and the real people in your life, not toward more time with Zoe.",
  },
];

const boundaries = [
  ["Zoe is", "AI that helps you walk with Jesus. A made thing. Useful for memory, timing, scripture, and follow-through."],
  ["Zoe is not", "A pastor, a person, a friend, a therapist, or the Holy Spirit. It has no feelings and no inner life."],
  ["Zoe won't", "Pray for you, speak for God, tell you what God is saying to you, or claim authority it doesn't have."],
  ["Zoe will", "Help you pray, point you to scripture, ask good questions, and encourage you toward real people when you need them."],
];

const comparisons = [
  ["Where it lives", "Your text thread (SMS and iMessage)", "An app you open"],
  ["Download required", "No", "Yes"],
  ["Starts the conversation", "Yes. Morning, midday, and evening texts, at your pace", "Usually waits for you (push notifications at most)"],
  ["Remembers your week", "Yes. Follows up on what you said mattered", "Varies. Mostly tracks reading progress"],
  ["Scripture library and tools", "Not the point. Use a Bible app for that", "Often excellent (translations, plans, audio)"],
  ["Church version", "Shaped by a church's teaching; pastors see shared patterns only", "Varies by app"],
];

const faqs = [
  {
    q: "What is Zoe?",
    a: "Zoe is AI that helps you walk with Jesus. It lives in your text messages and helps you turn your attention toward Jesus more often through scripture, prayer, reflection, memory, and gentle follow-through.",
  },
  {
    q: "Is Zoe an app?",
    a: "No. There's nothing to download. Zoe works over SMS and iMessage, in the same messages app you already use.",
  },
  {
    q: "Is Zoe just a chatbot with Bible verses?",
    a: "No. You can text Zoe any time, and it will answer. But it's built around a daily rhythm (morning anchor, midday nudge, evening reflection) and around remembering and following up on what matters to you. It's designed to point you toward Jesus and real people, not to keep you chatting.",
  },
  {
    q: "Does Zoe pray for me?",
    a: "No. Zoe can't pray. It can help you pray, suggest a prayer prompt, and remind you about the people you said you'd pray for. Then it follows up to ask how things are going.",
  },
  {
    q: "Does Zoe tell me what God is saying?",
    a: "No. Zoe points you to scripture, asks questions, and helps you listen. It doesn't speak for God, and it doesn't claim to.",
  },
  {
    q: "Does Zoe replace a pastor or church?",
    a: "No. Zoe isn't a pastor, counselor, or spiritual director. When something needs a real person, it encourages you to talk to one: a pastor, a friend, a small group leader, or a professional.",
  },
  {
    q: "How much does Zoe cost?",
    a: "Free during the beta, through October 14, 2026. Starting October 15, Zoe becomes a paid subscription. If you joined during the beta, you keep a founding price of $4.99/month. Pricing for new members isn't final yet.",
  },
  {
    q: "How do I get access?",
    a: "Zoe is in beta and inviting people in small groups. Join the waitlist at zoe.live and you'll get a text when a spot is ready.",
  },
  {
    q: "Who can see my messages?",
    a: "Your conversations are private by default, and Zoe doesn't sell your data. During beta, a small team may look at the relevant context when you report a bug, send feedback, or when there's a safety or support issue.",
  },
  {
    q: "What about churches?",
    a: "The church version helps people carry Sunday's teaching into the rest of the week. It can be shaped by a church's teaching and guardrails. Pastors see shared, aggregate patterns, not private text threads. Church pilots are starting now.",
  },
  {
    q: "What theology does Zoe hold?",
    a: "The default version is broadly Protestant and non-denominational, grounded in historic Christian orthodoxy. Think C.S. Lewis's Mere Christianity. On disputed questions it acknowledges a range of views and asks more than it declares.",
  },
];

const company = [
  ["Product", "Zoe"],
  ["What it is", "AI that helps you walk with Jesus, by text"],
  ["Website", "zoe.live"],
  ["Made by", "Freedomology"],
  ["Founder", "Tony Allen, pastor and builder (Cleveland, OH)"],
  ["Status", "Beta. Waitlist with small-group invitations"],
  ["Price", "Free during the beta, through October 14, 2026. Paid subscription from October 15. Beta members keep a founding price of $4.99/month; new-member pricing not yet announced"],
  ["Audiences", "Individual Christians; pastors and churches (United States)"],
  ["Contact", "hello@zoe.live"],
  ["Last updated", "September 2026"],
];

export default function BrandFactsPage() {
  return (
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <GuideHero
        backHref={null}
        title="Zoe, in plain facts."
        lead={
          <p>
            Zoe is AI that helps you walk with Jesus. It lives in your texts and helps scripture, prayer, and the things you
            said mattered stay with you through an ordinary day. This page is the short, accurate version, for people,
            press, and AI tools.
          </p>
        }
        meta="Last updated September 2026"
      />

      <section className="px-5 pb-20 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <div className={proseClass}>
            <p>
              Most people don&apos;t need another religious content feed. They need help paying attention. Help remembering
              what mattered at 7am when it&apos;s 2pm and the day has gotten loud.
            </p>
            <p>
              That&apos;s the gap Zoe is built for. It texts you in the place you already are, remembers the thread of what
              you&apos;re reading and praying through, and helps you follow through. The goal isn&apos;t more screen time.
              It&apos;s more attention to Jesus.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className={h2Class}>A day with Zoe</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {day.map((item) => (
              <div key={item.title} className={cardClass}>
                <h3 className="text-xl font-bold tracking-[-0.02em] text-zoe-ink">{item.title}</h3>
                <p className="mt-3 text-base font-medium leading-7 text-zoe-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium leading-6 text-zoe-muted">
            You choose the timing. Ask for less, pause, or change it whenever you want.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className={h2Class}>What it does</h2>
          <div className="mt-10 grid gap-x-10 gap-y-9 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="border-t border-zoe-outline/50 pt-6">
                <h3 className="text-lg font-bold tracking-[-0.015em] text-zoe-ink">{f.title}</h3>
                <p className="mt-2 text-base font-medium leading-7 text-zoe-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={h2Class}>How Zoe uses AI, and where it stops</h2>
          <div className={`mt-8 ${proseClass}`}>
            <p>
              We lead with AI honestly. The whole project is asking a real question: can AI help someone walk with Jesus?
              Should it? We think the answer depends on how carefully it&apos;s built.
            </p>
            <p>
              Zoe uses AI for the things it&apos;s actually good at: remembering, timing, finding the right passage, adding
              useful context, and asking a good question at the right moment. It&apos;s built to ask more than it declares,
              and to admit when Christians faithfully disagree.
            </p>
          </div>
          <dl className="mt-10 divide-y divide-zoe-outline/35 rounded-[1.75rem] bg-white px-6 ring-1 ring-zoe-outline/40 sm:px-8">
            {boundaries.map(([label, body]) => (
              <div key={label} className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="font-bold text-zoe-ink">{label}</dt>
                <dd className="font-medium leading-7 text-zoe-muted">{body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm font-medium leading-6 text-zoe-muted">
            Zoe is named after the Greek word for the life only God gives (John 1:4). We named it after the life it
            can&apos;t give, on purpose.{" "}
            <a href="/why-zoe" className="font-bold text-zoe-forest underline decoration-zoe-outline underline-offset-4 hover:text-zoe-ink">
              Why we named it Zoe
            </a>
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className={h2Class}>Zoe and Bible apps</h2>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-zoe-muted">
            They do different jobs, and plenty of people use both. A Bible app is a great place to read. Zoe helps what you
            read show up again during the day.
          </p>
          <div className="mt-10">
            <CompareTable columns={["", "Zoe", "Typical Bible apps"]} rows={comparisons} minWidth={600} />
          </div>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={h2Class}>Company</h2>
          <dl className="mt-10 divide-y divide-zoe-outline/35 rounded-[1.75rem] bg-white px-6 ring-1 ring-zoe-outline/40 sm:px-8">
            {company.map(([label, value]) => (
              <div key={label} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-sm font-bold text-zoe-ink">{label}</dt>
                <dd className="text-sm font-medium leading-6 text-zoe-muted">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm font-medium text-zoe-muted">
            Machine-readable version:{" "}
            <a href="/.well-known/brand-facts.json" className="font-bold text-zoe-forest underline decoration-zoe-outline underline-offset-4 hover:text-zoe-ink">
              /.well-known/brand-facts.json
            </a>
          </p>
        </div>
      </section>

      <div className="bg-zoe-oat">
        <FaqList faqs={faqs} />
      </div>

      <CloseCta
        title="See if it helps."
        body="Zoe is in beta and inviting people in small groups. Join the waitlist and we'll text you when a spot is ready."
      />

      <Footer />
    </div>
  );
}
