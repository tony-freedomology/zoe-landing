import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import FaqSchema from "../../../components/FaqSchema";
import StructuredData from "../../../components/StructuredData";
import { breadcrumbSchema } from "../../../lib/site";
import { CloseCta, FaqList, GuideHero, ShortAnswer, cardClass, h2Class, proseClass } from "../_components/GuideParts";

export const metadata: Metadata = {
  title: "Christian AI Tools: What's Actually Worth Using in 2026",
  description:
    "AI tools for Christians, Bible study, discipleship, and spiritual growth — what's genuinely useful, what's gimmicky, and what to avoid. Includes Zoe, YouVersion AI features, Bible chatbots, and more.",
  alternates: {
    canonical: "/guides/christian-ai-tools",
  },
};

const tools = [
  {
    name: "General AI assistants",
    examples: "ChatGPT, Claude, Gemini",
    body: "This is where most Christians start. They're genuinely good at explaining historical background, walking through what a Greek or Hebrew word can mean, summarizing what different traditions believe, or helping you outline a study.",
    goodFor: ["Background and context on a passage", "Explaining a concept in plain words", "Comparing how different traditions read a text"],
    watchFor: ["Confident answers that are sometimes wrong, including misquoted verses", "Not built around prayer, church, or follow-through", "No sense of your week unless you give it one"],
  },
  {
    name: "AI inside Bible apps",
    examples: "Features in popular Bible and study apps",
    body: "More Bible and study apps are adding AI features for things like explaining a verse or suggesting what to read next. They sit inside a tool you may already trust, which is a real plus.",
    goodFor: ["Quick help while you're already reading", "Staying inside one app you know"],
    watchFor: ["Features change quickly and vary by app", "Still depends on you opening the app"],
  },
  {
    name: "Bible Q&A and \"ask Jesus\" chat apps",
    examples: "Various",
    body: "Some apps answer Bible questions. Others go further and let you chat with a simulated Jesus, apostle, or saint. The first kind can be useful. The second kind is where we'd be most careful.",
    goodFor: ["Fast answers to factual Bible questions"],
    watchFor: ["Anything that speaks as God or claims to tell you what God is saying", "Tools designed to keep you chatting rather than point you to scripture and people"],
  },
  {
    name: "Zoe",
    examples: "zoe.live (ours)",
    body: "Zoe is AI that helps you walk with Jesus by text. It sends a morning anchor, a midday nudge, and an evening reflection, and you can text it any time. It remembers what you're reading and what you said mattered, reminds you to pray for the people you named, and checks back. We built it to point past itself: toward Jesus, scripture, prayer, your church, and real people.",
    goodFor: ["Carrying what you read into the rest of the day", "Remembering to pray for people and following up", "Churches that want Sunday's teaching to carry into the week"],
    watchFor: ["It's AI and can make mistakes", "It's in beta, with a waitlist", "It's not a study library. Use a Bible app for that"],
  },
];

const faqs = [
  {
    q: "What is the best AI tool for Christians in 2026?",
    a: "It depends on the job. For research (history, context, what a word can mean), general AI assistants like ChatGPT or Claude are strong, as long as you check what they tell you. For quick help while reading, look at the AI features in the Bible app you already use. For help carrying scripture and prayer into your actual day, Zoe texts you and follows up on what you said mattered.",
  },
  {
    q: "Can AI help me walk with Jesus?",
    a: "Honestly, that's the question we're testing. AI can't replace the Holy Spirit, scripture, prayer, or the church. But it may be able to help with the practical stuff: remembering, timing, finding the right passage, and asking a good question at the right moment. The tools worth using are the ones that point you toward Jesus and real people, not toward more time with the tool.",
  },
  {
    q: "Is it okay for Christians to use AI for Bible study?",
    a: "We think so, with discernment. AI is useful for background, context, and explaining ideas. Be careful with confident answers on disputed questions, check quotes against an actual Bible, and bring the big questions to people you trust.",
  },
  {
    q: "What should I avoid in a Christian AI tool?",
    a: "Be wary of anything that claims to speak for God, tells you what God is saying to you, pretends to be a person or a pastor, or seems designed to keep you talking to it. Good tools admit they're AI and send you back toward scripture, prayer, and real community.",
  },
  {
    q: "How is Zoe different from ChatGPT?",
    a: "ChatGPT waits for you to ask. Zoe texts you through the day (a morning anchor, a midday nudge, an evening reflection), remembers the thread of what you're reading and praying about, and follows up. It's built with theological and safety guardrails, and it's designed to point you toward Jesus and real people. It still can make mistakes.",
  },
  {
    q: "Does Zoe pray for me?",
    a: "No. Zoe can't pray. It can help you pray, suggest a prayer prompt, and remind you about the people you said you'd pray for. Then it asks how things are going.",
  },
  {
    q: "Should churches use AI for discipleship?",
    a: "People in your church are already asking AI about the Bible. The better question is which tools support pastors instead of replacing them, and which ones protect people's privacy. Zoe's church version is shaped by a church's teaching, and pastors see shared, aggregate patterns, never anyone's private messages.",
  },
];

export default function ChristianAiToolsPage() {
  return (
    <>
    <FaqSchema faqs={faqs} />
    <StructuredData
      id="breadcrumb-schema"
      data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: "Christian AI Tools", path: "/guides/christian-ai-tools" },
      ])}
    />
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <GuideHero
        title={<>Christian AI Tools: What&apos;s Actually Worth Using in 2026</>}
        lead={
          <p>
            AI is everywhere, and everyone has an opinion about it. Here&apos;s an honest look at what&apos;s actually useful,
            what to be careful with, and how to tell the difference. We build one of these tools, so read our part with
            that in mind.
          </p>
        }
        meta="Updated September 2026 · 7 min read"
      />

      <ShortAnswer>
        <p>
          <strong>For research and context:</strong> general AI assistants like ChatGPT or Claude. Check what they tell you.{" "}
          <strong>For help while reading:</strong> AI features in the Bible app you already use.{" "}
          <strong>For carrying scripture and prayer into your day:</strong> Zoe, which texts you and follows up.
        </p>
        <p>
          <strong>The rule of thumb:</strong> good tools point past themselves, toward Jesus, scripture, prayer, and real
          people. Be wary of anything that speaks for God.
        </p>
      </ShortAnswer>

      <article className="px-5 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl space-y-16">
          <div className={proseClass}>
            <h2 className={h2Class}>The honest framing</h2>
            <p>
              People are already using AI with their Bibles. Not because a pastor told them to. Because they had a question
              at 11pm and ChatGPT was right there.
            </p>
            <p>
              So the question isn&apos;t really whether Christians will use AI. It&apos;s which tools are worth using, and
              what guardrails they need. Some tools are careful and honest about what they are. Others will confidently
              tell you anything, or even pretend to be Jesus.
            </p>
            <p>That gap matters a lot.</p>
          </div>

          <div>
            <h2 className={h2Class}>The kinds of tools out there</h2>
            <div className="mt-8 space-y-4">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className={tool.name === "Zoe" ? "rounded-[1.75rem] bg-zoe-surface p-7 sm:p-8" : cardClass}
                >
                  <h3 className="text-xl font-bold tracking-[-0.02em] text-zoe-ink">{tool.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-zoe-muted">{tool.examples}</p>
                  <p className="mt-4 text-base font-medium leading-7 text-zoe-muted">{tool.body}</p>
                  <div className="mt-5 grid gap-5 border-t border-zoe-outline/40 pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-bold text-zoe-ink">Good for</p>
                      <ul className="mt-2 space-y-1.5">
                        {tool.goodFor.map((g) => (
                          <li key={g} className="flex gap-2 text-sm font-medium leading-6 text-zoe-muted">
                            <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-zoe-leaf" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zoe-ink">Keep in mind</p>
                      <ul className="mt-2 space-y-1.5">
                        {tool.watchFor.map((a) => (
                          <li key={a} className="flex gap-2 text-sm font-medium leading-6 text-zoe-muted">
                            <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-zoe-outline" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={proseClass}>
            <h2 className={h2Class}>The principle that matters most</h2>
            <p>
              The best Christian AI tools are built around one idea: <strong>AI should point away from itself.</strong>
            </p>
            <p>
              A tool that generates &quot;prophetic words,&quot; speaks as Jesus, or tries to become your main spiritual
              relationship has a theology problem. The Holy Spirit isn&apos;t software. Pastoral care needs a person.
            </p>
            <p>
              What AI can do well is the practical, humble stuff. Remember what you said mattered. Bring a passage back at the
              right moment. Remind you to pray for your friend before her surgery, then ask how it went. Explain the history
              behind a text. None of that requires pretending to be something it isn&apos;t.
            </p>
            <p>
              That&apos;s how we try to build Zoe. It&apos;s named after the Greek word for the life only God gives, on
              purpose, because it can&apos;t give that life. Its job is to point you toward the One who does.
            </p>
          </div>
        </div>
      </article>

      <FaqList faqs={faqs} />

      <CloseCta
        title="AI that points past itself."
        body="Zoe texts you a morning anchor, a midday nudge, and an evening reflection, and helps you follow through. It's in beta and inviting people in small groups."
      />

      <Footer />
    </div>
    </>
  );
}
