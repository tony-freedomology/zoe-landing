import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import FaqSchema from "../../../components/FaqSchema";
import StructuredData from "../../../components/StructuredData";
import { breadcrumbSchema } from "../../../lib/site";
import { CloseCta, CompareTable, FaqList, GuideHero, ShortAnswer, cardClass, h2Class, proseClass } from "../_components/GuideParts";

export const metadata: Metadata = {
  title: "Best Discipleship Apps 2026",
  description:
    "The honest comparison of discipleship apps in 2026: YouVersion, Hallow, Zoe, and more. Which tools actually build lasting Bible habits — and why most people stop using them within 90 days.",
  alternates: {
    canonical: "/guides/best-discipleship-apps-2026",
  },
};

const tableRows = [
  ["Zoe", "AI that texts you through the day", "Carrying scripture and prayer into ordinary hours; follow-through", "No (SMS and iMessage)", "Free in beta; paid subscription from Oct 15, 2026"],
  ["YouVersion", "Bible app", "Reading, translations, reading plans, audio", "Yes", "Free"],
  ["Hallow", "Prayer and meditation app", "Guided audio prayer in the Catholic tradition", "Yes", "Subscription, some free content"],
  ["RightNow Media", "Video Bible study library", "Small group curriculum", "App or web", "Usually through a church subscription"],
  ["Lectio 365", "Daily prayer guide", "Short, structured morning and evening prayer", "Yes", "Free"],
];

const tools = [
  {
    name: "Zoe",
    url: "https://zoe.live",
    label: "zoe.live",
    body: "This is ours, so weigh this paragraph accordingly. Zoe is AI that helps you walk with Jesus by text. It sends a morning anchor (a passage and a question), a short midday nudge, and an evening reflection, and you can text it any time. The part people notice is memory: it remembers what you're reading and what you said mattered, reminds you to pray for the people you named, and checks back later.",
    goodFor: "People who read in the morning and lose the thread by lunch. Churches that want Sunday to carry into the week.",
    watchFor: "It's in beta with a waitlist. It's AI, so it can get things wrong. It isn't a Bible library. And if you're trying to spend less time on your phone, a texting tool might not be what you need.",
  },
  {
    name: "YouVersion (Bible App)",
    url: "https://bible.com",
    label: "bible.com",
    body: "The most widely used Bible app there is, and for good reason. Free, a huge range of translations, thousands of reading plans, audio Bibles, and ways to read along with friends.",
    goodFor: "Reading the Bible itself. Reading plans. Having every translation in your pocket.",
    watchFor: "Like any app, it mostly works when you remember to open it.",
  },
  {
    name: "Hallow",
    url: "https://hallow.com",
    label: "hallow.com",
    body: "A beautifully made prayer and meditation app built around Catholic tradition: guided audio prayer, the Rosary, sleep content, and seasonal challenges.",
    goodFor: "Guided audio prayer, especially for Catholics.",
    watchFor: "Most of the library sits behind a subscription. Protestant users may find some content less relevant.",
  },
  {
    name: "RightNow Media",
    url: "https://rightnowmedia.org",
    label: "rightnowmedia.org",
    body: "A large streaming library of video Bible studies, often described as a Netflix for Bible study. Most people get it through their church.",
    goodFor: "Small groups that want solid curriculum.",
    watchFor: "It's a library, not a daily rhythm on its own. It works best with a group around it.",
  },
  {
    name: "Lectio 365",
    url: "https://lectio365.app",
    label: "lectio365.app",
    body: "A free daily prayer guide from 24-7 Prayer. Short, thoughtful, rooted in scripture and contemplative practice.",
    goodFor: "People who want a few quiet, structured minutes of prayer each day.",
    watchFor: "You still have to open the app, but it's short enough that many people do.",
  },
];

const faqs = [
  {
    q: "What is the best discipleship app for Christians in 2026?",
    a: "It depends on what you need help with. For reading the Bible and following reading plans, YouVersion is still the standard. For guided audio prayer, Hallow (Catholic) or Lectio 365. For small group curriculum, RightNow Media. If your problem is less about content and more about remembering during the day, Zoe texts you a morning anchor, a midday nudge, and an evening reflection, and follows up on what you said mattered.",
  },
  {
    q: "Why do people stop using Bible apps?",
    a: "Usually not because the app is bad. Life gets loud, the phone is full of other things, and a habit that depends on remembering to open something tends to slip. That's why it helps to pick a tool that fits how your day actually goes, and to pair it with real people who ask how it's going.",
  },
  {
    q: "Is Zoe an app?",
    a: "No. Zoe lives in your text messages (SMS and iMessage). There's nothing to download and no login.",
  },
  {
    q: "What's the difference between a Bible app and a discipleship tool?",
    a: "A Bible app gives you the text, translations, and reading plans. A discipleship tool is more about practice: prayer, reflection, and actually doing something with what you read. Plenty of people use one of each.",
  },
  {
    q: "What discipleship tools work for churches?",
    a: "RightNow Media is widely used for small group curriculum. Planning Center handles church management. Zoe's church version helps people carry Sunday's teaching into the week by text, and pastors see shared, aggregate patterns, not anyone's private messages. Church pilots are starting now.",
  },
  {
    q: "How much does Zoe cost?",
    a: "Free during the beta, through October 14, 2026. Starting October 15, Zoe becomes a paid subscription. If you joined during the beta, you keep a founding price of $4.99/month.",
  },
];

export default function BestDiscipleshipAppsPage() {
  return (
    <>
    <FaqSchema faqs={faqs} />
    <StructuredData
      id="breadcrumb-schema"
      data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "Best Discipleship Apps 2026", path: "/guides/best-discipleship-apps-2026" },
      ])}
    />
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <GuideHero
        title="Best Discipleship Apps 2026"
        lead={
          <p>
            An honest look at the tools Christians actually use: what each one is good at, where it falls short, and how to
            pick. One of them is ours. We&apos;ll say so when we get there.
          </p>
        }
        meta="Updated September 2026 · 6 min read"
      />

      <ShortAnswer>
        <p>
          <strong>For reading the Bible and reading plans:</strong> YouVersion. <strong>For guided audio prayer:</strong>{" "}
          Hallow (Catholic) or Lectio 365. <strong>For small group curriculum:</strong> RightNow Media.{" "}
          <strong>For carrying what you read into the rest of the day:</strong> Zoe, which texts you and follows up.
        </p>
        <p>The best tool is the one that fits how your day actually goes. And none of them replace a church and real friends.</p>
      </ShortAnswer>

      <article className="px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl space-y-16">
          <div className={proseClass}>
            <h2 className={h2Class}>Most of us don&apos;t need more content</h2>
            <p>
              There has never been more good Christian content. Great Bible apps, great prayer apps, great video studies.
              Most of them are free or close to it.
            </p>
            <p>
              And yet a lot of us still read something good at 7am and can&apos;t remember it by 2pm. The problem usually
              isn&apos;t the content. It&apos;s attention. It&apos;s the gap between what we read and the rest of the day.
            </p>
            <p>
              So when you compare these tools, it helps to ask two questions. What do I actually need help with? And will
              this fit into my real day, not the ideal one?
            </p>
          </div>

          <div>
            <h2 className={h2Class}>Side by side</h2>
            <div className="mt-8">
              <CompareTable
                columns={["Tool", "What it is", "Best for", "Download", "Cost"]}
                rows={tableRows}
                minWidth={760}
              />
            </div>
            <p className="mt-4 text-sm font-medium leading-6 text-zoe-muted">
              Pricing and features change. Check each tool&apos;s site for what&apos;s current.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>Tool by tool</h2>
            <div className="mt-8 space-y-4">
              {tools.map((tool, i) => (
                <div key={tool.name} className={i === 0 ? "rounded-[1.75rem] bg-zoe-surface p-7 sm:p-8" : cardClass}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-bold tracking-[-0.02em] text-zoe-ink">{tool.name}</h3>
                    <a
                      href={tool.url}
                      className="text-sm font-bold text-zoe-forest underline decoration-zoe-outline underline-offset-4 hover:text-zoe-ink"
                      {...(i === 0 ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {tool.label}
                    </a>
                  </div>
                  <p className="mt-3 text-base font-medium leading-7 text-zoe-muted">{tool.body}</p>
                  <dl className="mt-5 grid gap-4 border-t border-zoe-outline/40 pt-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-bold text-zoe-ink">Good for</dt>
                      <dd className="mt-1 font-medium leading-6 text-zoe-muted">{tool.goodFor}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-zoe-ink">Keep in mind</dt>
                      <dd className="mt-1 font-medium leading-6 text-zoe-muted">{tool.watchFor}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-zoe-surface p-7 sm:p-9">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-zoe-ink">How to choose</h2>
            <ul className="mt-5 space-y-3 text-base font-medium leading-7 text-zoe-muted">
              <li><strong className="text-zoe-ink">You want to read the Bible more:</strong> start with YouVersion. It&apos;s free and excellent.</li>
              <li><strong className="text-zoe-ink">You want help praying:</strong> Hallow if you&apos;re Catholic, Lectio 365 or Abide if you&apos;re not.</li>
              <li><strong className="text-zoe-ink">Your small group needs material:</strong> RightNow Media.</li>
              <li><strong className="text-zoe-ink">You read in the morning and lose it by lunch:</strong> try Zoe. It texts you and follows up.</li>
              <li><strong className="text-zoe-ink">Whatever you pick:</strong> tell a friend what you&apos;re doing. A person who asks how it&apos;s going beats any feature.</li>
            </ul>
          </div>
        </div>
      </article>

      <FaqList faqs={faqs} />

      <CloseCta
        title="Try the one that texts you back."
        body="Zoe helps what you read in the morning show up again during the day. It's in beta and inviting people in small groups."
      />

      <Footer />
    </div>
    </>
  );
}
