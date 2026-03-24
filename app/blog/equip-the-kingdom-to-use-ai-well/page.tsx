import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "../../../components/Footer";

export const metadata: Metadata = {
  title: "I'm a Former Worship Pastor Building an AI Discipleship Tool. Here's What I've Learned.",
  description:
    "Building something for the church means wrestling with hard questions — about trust, about replacement anxiety, and about what technology should actually do in a faith context.",
};

export default function EquipKingdomPost() {
  return (
    <div className="min-h-screen text-slate-900">
      <section className="relative overflow-hidden bg-[#141008] py-32 px-6 pt-40">
        {/* Hero Background */}
        <Image
          src="/blog/equip-the-kingdom-to-use-ai-well/hero.jpg"
          alt="Former worship pastor building AI discipleship tool"
          fill
          className="object-cover opacity-25"
          priority
        />
        {/* Subtle blur over left/text area */}
        <div className="absolute inset-0 z-10 pointer-events-none backdrop-blur-[2px]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 30% 50%, black 0%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 60% 80% at 30% 50%, black 0%, transparent 100%)',
          }}
        />
        {/* Dimming radial gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,_rgba(0,0,0,0.55)_0%,_transparent_100%)]" />
        {/* Bottom fade to white article */}
        <div className="absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-b from-transparent to-[#141008]" />
        <div className="relative z-20 mx-auto max-w-3xl">
          <div className="mb-6">
            <Link href="/blog" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">&larr; Blog</Link>
          </div>
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">Church &amp; Technology</span>
            <span className="text-slate-400 text-xs font-medium">March 2026</span>
            <span className="text-slate-600 text-xs">&middot;</span>
            <span className="text-slate-400 text-xs font-medium">8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl tracking-tighter-editorial text-white leading-[1.1] font-bold mb-6">I&apos;m a Former Worship Pastor Building an AI Discipleship Tool. Here&apos;s What I&apos;ve Learned.</h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed">Building something for the church means wrestling with hard questions — about trust, about replacement anxiety, and about what technology should actually do in a faith context.</p>
            </div>
      </section>
<article className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed text-lg space-y-6">
            <p>A year ago, if you told me I&apos;d be building an AI tool for churches, I would&apos;ve been skeptical. I spent eleven years leading worship — standing in front of rooms full of people, watching the Spirit move in ways that had nothing to do with technology. My whole career was built on presence. Real, physical, in-the-room presence.</p>
            <p>And now I&apos;m building something that lives in a text message.</p>
            <p>So yeah. I&apos;ve had to wrestle with this. And I think the wrestling is the point — because if you&apos;re building something for the church and you&apos;re NOT uncomfortable with hard questions, you&apos;re probably not asking the right ones.</p>
            <p>Here&apos;s what I&apos;ve figured out so far.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">The Question Pastors Actually Ask Me</h2>
            <p>When I talk to pastors about Zoe, they don&apos;t ask about the technology. They don&apos;t care about the AI model or the architecture. The question is almost always some version of:</p>
            <p className="italic text-slate-600">&quot;Are you trying to replace us?&quot;</p>
            <p>And I get it. If you&apos;ve given your life to pastoral ministry — if you&apos;ve sat with people through grief, through doubt, through the 2am phone calls — the idea of an AI tool showing up in your space feels threatening. It should feel threatening, honestly. Because there ARE companies building AI that positions itself as a spiritual companion. As a replacement for the very thing you do.</p>
            <p>That&apos;s not what I&apos;m doing. And I think the distinction matters.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">What Replacement Anxiety Gets Right</h2>
            <p>Pastors who worry about AI replacing human discipleship are picking up on something real. There are genuine risks:</p>
            <p>People could start treating a chatbot like a counselor. They could settle for AI-generated answers to questions that deserve a real human sitting across from them. They could drift away from community because a screen feels easier.</p>
            <p>These aren&apos;t hypothetical concerns. A Barna survey found that 30% of Americans think spiritual advice from AI is as trustworthy as advice from a pastor. Among younger adults, it&apos;s closer to 40%. That should make anyone in ministry pay attention.</p>
            <p>But the solution to bad AI isn&apos;t no AI. It&apos;s good AI, built by people who actually understand what&apos;s at stake.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">The Discipleship Gap That Already Existed</h2>
            <p>Before AI entered the conversation, the church already had a follow-through problem.</p>
            <p>I watched it for over a decade. Sunday morning, something lands. A verse connects. A sermon cuts to the center of someone&apos;s chest. They write it down. They feel that clarity — <em>God is saying something to me right now.</em></p>
            <p>By Wednesday, the note is buried. By the following Sunday, they can barely remember what the message was about.</p>
            <p>This isn&apos;t because people don&apos;t care. It&apos;s because life is loud, willpower is finite, and there was never a good tool for the space between Sundays. Devotional books require you to remember to open them. Bible apps compete with every other app on your phone for attention. Reading plans depend on daily discipline that most people can&apos;t sustain.</p>
            <p>The gap between Sunday&apos;s intention and Monday&apos;s follow-through has been there all along. AI didn&apos;t create it. But AI — built carefully — might actually help close it.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">Five Questions Every Church Should Ask Before Using Any AI Tool</h2>
            <p>If your church is evaluating AI tools — for discipleship, for pastoral care, for anything — here&apos;s what I&apos;d ask:</p>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 space-y-8 not-prose">
              {[
                { number: "1", title: "Is it honest about what it is?", body: "If an AI tool in a faith context ever implies it\u2019s praying, feeling, or being guided by the Spirit, walk away. Zoe will never claim to pray for someone. It\u2019s a tool. A well-built one, I hope. But a tool." },
                { number: "2", title: "Does it protect your people\u2019s privacy?", body: "Spiritual conversations are some of the most vulnerable things a person shares. When someone texts about their doubts, their marriage, their faith crisis \u2014 that data deserves the highest protection. No selling behavioral data. No third-party access. No using someone\u2019s spiritual vulnerability to train a model for someone else\u2019s product." },
                { number: "3", title: "Is it theologically grounded \u2014 or theologically lazy?", body: "There\u2019s a difference between AI that helps someone engage Scripture with real depth and AI that just gives you the \u201CChristian answer\u201D without any substance behind it. Who did the theological work? Is it accountable to pastoral authority? Or was it just trained on whatever\u2019s on the internet?" },
                { number: "4", title: "Does it send people toward community or away from it?", body: "This is probably the most important question. Good AI in a faith context isn\u2019t trying to be the pastor, the community, or the Holy Spirit. It\u2019s trying to help people stay engaged between Sundays, follow through on commitments, and surface the right questions \u2014 so that when they do sit across from a real human being, they\u2019re ready. AI that creates dependence on itself is a bad tool." },
                { number: "5", title: "Can you see what it\u2019s doing?", body: "Ministry leaders need visibility into how an AI tool is serving their congregation \u2014 at an aggregate level \u2014 without compromising individual privacy. If you can\u2019t see whether it\u2019s reinforcing your teaching, whether it\u2019s doctrinally consistent, whether it\u2019s producing fruit in people\u2019s lives \u2014 it\u2019s not ministry tech. It\u2019s just tech." },
              ].map((item) => (
                <div key={item.number} className="flex gap-5 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">{item.number}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">Why the Church Needs to Be at This Table</h2>
            <p>There&apos;s a window right now. The companies building AI tools for spiritual contexts are making decisions about defaults — what these tools say, how they frame faith, what they do with personal data, how they handle crisis moments.</p>
            <p>Most of those companies are staffed by engineers and product managers. Good people, usually. But very few of them have a theology of personhood. Very few of them have sat with someone through a crisis of faith. Very few of them know why it matters that AI never claims to pray.</p>
            <p>If the church doesn&apos;t show up to shape these tools, the defaults will get set without us. And then we&apos;ll spend the next decade reacting to products that were built without any of the convictions we&apos;d want baked in.</p>
            <p>I&apos;d rather build the thing than complain about someone else&apos;s version of it.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">What I&apos;m Actually Building</h2>
            <p><a href="https://zoe.live" className="text-brand-cyan hover:underline" target="_blank" rel="noopener noreferrer">Zoe</a> is an SMS discipleship tool for churches. Here&apos;s what that means in practice:</p>
            <p>Your congregation members receive daily scripture via text message — no app, no download, no login. They pick a book of the Bible and a reading pace. Each morning, they get their passage enriched with original-language context (Greek and Hebrew word studies that used to require a seminary library). Zoe asks what God is saying to them and what they&apos;re going to do about it. And it remembers their answers.</p>
            <p>For pastors, that means daily touchpoints with your congregation between Sundays. For members, it means a consistent scripture rhythm that requires zero effort to maintain.</p>
            <p>It doesn&apos;t try to be a counselor. It doesn&apos;t try to be a pastor. It points people to Scripture, to the original languages, and to their community. Every time.</p>
            <hr className="border-slate-200 my-10" />
            <h2 className="text-3xl tracking-tighter-editorial text-slate-900 font-bold mt-10 mb-4">The Honest Version</h2>
            <p>I don&apos;t have all this figured out. Nobody does — the intersection of AI and faith is genuinely new territory, and anyone who claims to have it all mapped out is selling something.</p>
            <p>What I do know is this: the church has always adopted new tools — printing presses, radio, television, the internet — and the pattern is always the same. Some people engage wisely and shape how the tool gets used. Some people withdraw and then spend years catching up.</p>
            <p>I&apos;d rather be in the first group. And I&apos;d rather build something I&apos;d actually want my own church to use.</p>
            <p>If that resonates, check out <a href="https://zoe.live" className="text-brand-cyan hover:underline font-bold" target="_blank" rel="noopener noreferrer">zoe.live</a>. We&apos;re in beta, it&apos;s free, and I&apos;d genuinely love feedback from pastors and church leaders who are thinking about this stuff.</p>
          </div>

          <div className="mt-12 bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center">
            <p className="text-lg font-bold text-slate-900 mb-3">Built for your church.</p>
            <p className="text-slate-600 font-medium leading-relaxed mb-6">Zoe is an SMS discipleship tool that&apos;s transparent, privacy-first, and designed to work alongside pastoral leadership — not replace it.</p>
            <Link href="/#waitlist" className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-8 py-4 text-base font-bold shadow-lg hover:bg-slate-700 transition-all duration-200">
              Join the Zoe Waitlist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
