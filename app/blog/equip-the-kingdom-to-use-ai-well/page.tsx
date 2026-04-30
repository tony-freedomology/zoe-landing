import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleShell from "../../../components/BlogArticleShell";

export const metadata: Metadata = {
  title: "I'm a Former Worship Pastor Building an AI Discipleship Tool. Here's What I've Learned.",
  description:
    "Building something for the church means wrestling with hard questions about trust, replacement anxiety, and what technology should actually do in a faith context.",
};

const questions = [
  "Is it honest about what it is?",
  "Does it protect your people's privacy?",
  "Is it theologically grounded or theologically lazy?",
  "Does it send people toward community or away from it?",
  "Can ministry leaders see what it is doing?",
];

export default function EquipKingdomPost() {
  notFound();

  return (
    <BlogArticleShell
      category="Church & Technology"
      date="March 2026"
      readTime="8 min read"
      title="I'm a Former Worship Pastor Building an AI Discipleship Tool."
      deck="The question is not whether churches will meet AI. The question is whether we will shape it with real conviction."
    >
      <p>A year ago, if you told me I would be building an AI tool for churches, I would have been skeptical. I spent eleven years leading worship, standing in rooms full of people and watching the Spirit move in ways that had nothing to do with technology.</p>
      <p>My whole career was built on presence. Real, physical, in-the-room presence. And now I am building something that lives in a text message.</p>
      <p>So yes, I have had to wrestle with this. I think the wrestling is the point.</p>

      <blockquote>If you are building something for the church and you are not uncomfortable with hard questions, you are probably not asking the right ones.</blockquote>

      <h2>The Question Pastors Actually Ask</h2>
      <p>When I talk to pastors about Zoe, they do not ask first about the technology. The question is almost always some version of: are you trying to replace us?</p>
      <p>I get it. If you have given your life to pastoral ministry, the idea of an AI tool showing up in your space should make you pay attention.</p>
      <p>That is not what Zoe is. And the distinction matters.</p>

      <h2>What Replacement Anxiety Gets Right</h2>
      <p>There are real risks. People could treat a chatbot like a counselor. They could settle for generated answers to questions that deserve a real human sitting across from them. They could drift away from community because a screen feels easier.</p>
      <p>The answer to bad AI is not no AI. It is careful AI, built by people who understand what is at stake.</p>

      <h2>The Discipleship Gap Already Existed</h2>
      <p>Before AI entered the conversation, the church already had a follow-through problem. Sunday morning, something lands. A sermon cuts to the center of someone's chest. They write it down. By Wednesday, the note is buried.</p>
      <p>AI did not create that gap. Built carefully, it might help close it.</p>

      <h2>Five Questions Every Church Should Ask</h2>
      <ol>
        {questions.map((question) => (
          <li key={question}><strong>{question}</strong></li>
        ))}
      </ol>
      <p>If an AI tool in a faith context implies it is praying, feeling, or being guided by the Spirit, walk away. If it pulls people away from actual community, walk away. If it is not transparent enough for ministry leaders to evaluate, walk away.</p>

      <h2>Why the Church Needs to Be at the Table</h2>
      <p>Companies building AI for spiritual contexts are making decisions about defaults: what these tools say, how they frame faith, what they do with personal data, and how they handle crisis moments.</p>
      <p>If the church does not show up to shape these tools, the defaults will get set without us.</p>

      <h2>What I Am Actually Building</h2>
      <p>Zoe is an SMS discipleship tool for churches. Members receive daily scripture by text message with original-language context. Zoe asks what God is saying to them and what they are going to do about it. Then it remembers their answers.</p>
      <p>It does not try to be a counselor. It does not try to be a pastor. It points people to scripture, original languages, and community.</p>

      <h2>The Honest Version</h2>
      <p>I do not have all this figured out. Nobody does. The intersection of AI and faith is genuinely new territory, and anyone who claims to have it all mapped out is selling something.</p>
      <p>What I know is this: the church has always adopted new tools. Printing presses, radio, television, the internet. Some people engage wisely and shape how the tool gets used. Some people withdraw and spend years catching up.</p>
      <p>I would rather build something I would actually want my own church to use.</p>
    </BlogArticleShell>
  );
}
