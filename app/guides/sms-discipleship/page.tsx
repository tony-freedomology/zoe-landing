import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import FaqSchema from "../../../components/FaqSchema";
import StructuredData from "../../../components/StructuredData";
import { breadcrumbSchema } from "../../../lib/site";
import { CloseCta, CompareTable, FaqList, GuideHero, ShortAnswer, h2Class, proseClass } from "../_components/GuideParts";

export const metadata: Metadata = {
  title: "SMS Discipleship: Bible Study Without Downloading Another App",
  description:
    "SMS discipleship delivers daily scripture, original-language context, and guided reflection via text message — no download, no login, no friction. Here's how it works and why it builds habits that apps don't.",
  alternates: {
    canonical: "/guides/sms-discipleship",
  },
};

const comparison = [
  ["How you get to it", "It shows up in your texts", "You open the app"],
  ["Download", "None", "Required"],
  ["Who starts the conversation", "Either of you. It can text first and follow up", "Mostly you"],
  ["Best at", "Short moments through the day; follow-through", "Reading longer passages; plans, translations, audio"],
  ["Weak at", "Long reading, study tools, anything visual", "Reaching you in the middle of the day"],
  ["Phone time", "A few short texts", "Depends on you"],
];

const day = [
  {
    time: "Morning",
    title: "An anchor",
    body: "A short passage, a little context when it helps, and one question to carry into the day.",
  },
  {
    time: "Midday",
    title: "A nudge",
    body: "A short text that brings the morning back. \"Remember James 1:19 before that 2pm meeting.\"",
  },
  {
    time: "Evening",
    title: "A reflection",
    body: "Where did you notice God today? Where did you drift? Who do you need to talk to?",
  },
  {
    time: "Any time",
    title: "A conversation",
    body: "Reply, ask a question about the passage, or ask Zoe to remind you about something later.",
  },
];

const faqs = [
  {
    q: "What is SMS discipleship?",
    a: "It's spiritual practice that happens by text message instead of in an app: scripture, prayer prompts, reflection questions, and follow-up that show up in the messages app you already use. The idea is simple. Meet people where their attention already is, then point that attention toward Jesus.",
  },
  {
    q: "How is it different from a Bible app?",
    a: "A Bible app is a great place to read, and it waits for you to open it. A text can come to you in the middle of the day, when the morning's passage suddenly matters. Many people use both: an app for reading, texts for carrying it into the day.",
  },
  {
    q: "Is Zoe an app?",
    a: "No. Zoe works over SMS and iMessage. There's nothing to download and no login.",
  },
  {
    q: "What does Zoe send each day?",
    a: "A morning anchor (a passage, useful context when it helps, and a question), a short midday nudge, and an evening reflection. You can text it any time in between. You choose the timing, and you can ask for less, pause, or text STOP whenever you want.",
  },
  {
    q: "Can Zoe help me remember to pray for people?",
    a: "Yes. Tell Zoe who you're praying for and it will remind you to bring them back to God, then follow up to ask how things are going. Zoe doesn't pray for you. It helps you remember to pray.",
  },
  {
    q: "Can I choose what to read?",
    a: "Yes. Pick a pre-made Journey (James, anxiety, marriage, grief, rest, and more) or ask for your own, like reading Philippians over two weeks. Zoe sets the pace with you and brings the next part each morning.",
  },
  {
    q: "Can churches use SMS discipleship?",
    a: "Yes. Zoe's church version helps people carry Sunday's sermon into the rest of the week by text. It can be shaped by the church's teaching. Pastors see shared, aggregate patterns, not anyone's private messages. Church pilots are starting now.",
  },
  {
    q: "Isn't this just more time on my phone?",
    a: "It's a fair worry. The goal is a few short texts that turn your attention toward Jesus and the people around you, not more screen time. If it starts pulling you deeper into your phone, ask for less or pause it.",
  },
];

export default function SmsDiscipleshipGuidePage() {
  return (
    <>
    <FaqSchema faqs={faqs} />
    <StructuredData
      id="breadcrumb-schema"
      data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "SMS Discipleship", path: "/guides/sms-discipleship" },
      ])}
    />
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <GuideHero
        title="SMS Discipleship: Bible Study Without Downloading Another App"
        lead={
          <p>
            What it looks like to let scripture, prayer, and follow-through show up in your text messages, and when
            that&apos;s actually a good idea.
          </p>
        }
        meta="Updated September 2026 · 5 min read"
      />

      <ShortAnswer>
        <p>
          <strong>SMS discipleship</strong> means scripture, prayer, and reflection that come to you by text, in the
          messages app you already check all day. No download.
        </p>
        <p>
          <strong>Zoe</strong> is AI that does this: a morning anchor, a midday nudge, an evening reflection, and
          conversation any time. It remembers what you&apos;re reading and praying about, and follows up.
        </p>
      </ShortAnswer>

      <article className="px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl space-y-16">
          <div className={proseClass}>
            <h2 className={h2Class}>The problem it&apos;s trying to solve</h2>
            <p>
              You read something good in the morning. By 2pm the day has gotten loud, and it&apos;s gone. Sunday&apos;s
              sermon was great. By Tuesday you can&apos;t quite remember the point.
            </p>
            <p>
              That&apos;s not a willpower problem. It&apos;s an attention problem. Most tools are built for the quiet moment
              when you sit down to read. Very few help in the middle of the day, when what you read actually matters.
            </p>
            <p>
              Texting is where a lot of our attention already goes. SMS discipleship tries to use that on purpose: a short
              text at the right moment that turns you back toward Jesus.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>What a day looks like with Zoe</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2">
              {day.map((item) => (
                <li key={item.time} className="rounded-[1.75rem] bg-white p-7 shadow-zoe-card ring-1 ring-zoe-outline/40">
                  <p className="text-sm font-bold text-zoe-forest">{item.time}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-zoe-ink">{item.title}</h3>
                  <p className="mt-2 text-base font-medium leading-7 text-zoe-muted">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className={proseClass}>
            <h2 className={h2Class}>Where the texts actually help</h2>
            <p>
              The part that surprises people isn&apos;t the morning text. It&apos;s the follow-through. Zoe remembers what
              you said mattered and brings it back at the right time.
            </p>
            <p>
              Say you mention you&apos;re nervous about a job interview. Zoe checks in afterward to ask how it went. Tell it
              you&apos;re praying for your sister, and it will remind you to keep bringing her to God, and later ask how
              she&apos;s doing. Want to read Philippians over two weeks? It sets the pace with you and brings the next part
              each morning.
            </p>
            <p>
              You can also build a simple rule of life: one daily practice, one weekly practice, one relational rhythm, and a
              weekly review. Zoe helps you keep it quietly. No streaks, no badges, no guilt.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>Texts vs. Bible apps</h2>
            <p className="mt-4 text-lg font-medium leading-8 text-zoe-muted">
              They&apos;re good at different things, and plenty of people use both.
            </p>
            <div className="mt-8">
              <CompareTable columns={["", "By text (Zoe)", "Bible apps"]} rows={comparison} minWidth={580} />
            </div>
          </div>

          <div className={proseClass}>
            <h2 className={h2Class}>For pastors</h2>
            <p>
              Sunday matters, but most formation happens Monday through Saturday. And no pastor can personally follow up with
              everyone.
            </p>
            <p>
              Zoe&apos;s church version helps your people carry Sunday&apos;s sermon into the week by text. It can be shaped
              by your teaching and guardrails. You see shared patterns, like where people are getting stuck or which
              practices they&apos;re trying, not anyone&apos;s private thread. Zoe supports your work. It doesn&apos;t
              replace you.
            </p>
            <p>
              <a href="/churches" className="font-bold text-zoe-forest underline decoration-zoe-outline underline-offset-4 hover:text-zoe-ink">
                See how Zoe works for churches
              </a>
            </p>
          </div>
        </div>
      </article>

      <FaqList faqs={faqs} />

      <CloseCta
        title="Scripture that shows up at 2pm."
        body="Zoe texts you a morning anchor, a midday nudge, and an evening reflection. It's in beta and inviting people in small groups."
      />

      <Footer />
    </div>
    </>
  );
}
