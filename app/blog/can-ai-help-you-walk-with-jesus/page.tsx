import type { Metadata } from "next";
import BlogArticleShell from "../../../components/BlogArticleShell";

export const metadata: Metadata = {
  title: "Can AI Help You Walk With Jesus?",
  description:
    "AI can't love you or know God's will, but it can remember what you said on Tuesday and ask about it on Friday. Here's an honest look at what that's worth.",
};

export default function AiWalkWithJesusPost() {
  return (
    <BlogArticleShell
      category="AI & Faith"
      date="February 2026"
      readTime="8 min read"
      title="Can AI Help You Walk With Jesus?"
      deck="A careful answer for people who want useful tools without confusing them for God."
    >
      <p>I spent eleven years as a worship pastor. My whole world was presence: rooms full of people, songs, prayer, and moments where something real happens between them and God.</p>
      <p>You cannot automate that. I would not want to.</p>
      <p>So when I started building an AI discipleship tool, I had to sit with a lot of discomfort before I sat with any excitement. I think the discomfort was doing its job.</p>

      <blockquote>AI cannot love you. It can remember what you said last Tuesday.</blockquote>

      <h2>The Discomfort Is Doing Its Job</h2>
      <p>If you feel uneasy about AI and faith, that is not ignorance. That is discernment working. The questions underneath the discomfort are the right ones.</p>
      <p><em>Can a machine understand spiritual things?</em></p>
      <p><em>Am I outsourcing something that should be between me and God?</em></p>
      <p><em>Is this another distraction dressed up in spiritual clothing?</em></p>

      <h2>Can a Machine Understand Spiritual Things?</h2>
      <p>No. Zoe does not know God. Zoe does not pray. Zoe does not have the mind of Christ. When it asks, "What is God saying to you today?", it is not interpreting the answer spiritually. It is helping you return to it later.</p>
      <p>The understanding happens in you, through the Spirit, through the Word, and through the people around you.</p>

      <h2>What AI Can Do</h2>
      <ul>
        <li>Remember what you said last Tuesday.</li>
        <li>Ask the same question again on Friday.</li>
        <li>Notice patterns across reflections over weeks and months.</li>
        <li>Give you a nudge at 6 a.m. without judgment or exhaustion.</li>
        <li>Surface scripture or a reflection prompt when you ask for one.</li>
      </ul>

      <h2>What AI Cannot Do</h2>
      <ul>
        <li>Love you.</li>
        <li>Know God's specific will for your specific life.</li>
        <li>Replace the presence of people who know you.</li>
        <li>Convict you the way the Holy Spirit convicts.</li>
        <li>Replace your pastor, your small group, your spouse, or your community.</li>
      </ul>

      <h2>Why I Built This Anyway</h2>
      <p>I keep thinking about a specific kind of Sunday. A pastor says something that cuts right to the center of your chest. You write it down. You mean to do something with it.</p>
      <p>Then Monday happens. By Wednesday, the note is buried. This is not a character flaw. This is what it is like to be human in a world that is constantly loud.</p>
      <p>Zoe is meant to close the loop between Sunday's intention and Monday's follow-through. Not by doing the spiritual work for you, but by remembering that you said you were going to do something and gently asking if you did.</p>

      <h2>The Line Worth Drawing</h2>
      <p>There are AI tools that present themselves as spiritual companions, replacements for pastoral counsel, or something like the Holy Spirit's presence. That framing is dangerous because it misrepresents what AI is.</p>
      <p>Zoe is not trying to be your spiritual director. It is a concordance that texts you back. A journal that asks follow-up questions. A nudge that says: you told me Tuesday you were going to do something. Did you do it?</p>
    </BlogArticleShell>
  );
}
