import type { Metadata } from "next";
import BlogArticleShell from "../../../components/BlogArticleShell";

export const metadata: Metadata = {
  openGraph: {
    images: ["/images/blog/morning-scripture-tabletop.png"],
  },
  title: "What Should Zoe Do in the Morning?",
  description:
    "A question about mornings, Scripture, and what kind of help is actually helpful.",
};

export default function WhatShouldZoeDoInTheMorningPage() {
  return (
    <BlogArticleShell
      category="Product"
      date="May 2026"
      readTime="4 min read"
      title="What Should Zoe Do in the Morning?"
      deck="A question about mornings, Scripture, and what kind of help is actually helpful."
    >
      <p>Hey friends,</p>
      <p>
        Zoe continues to develop and improve, and your feedback has been extremely helpful in shaping that.
      </p>
      <p>
        Over this last week, my focus has been on getting the morning experience right. That is kind of the
        core foundation of interacting with Zoe as a tool.
      </p>
      <p>
        And the question is pretty simple: how can Zoe help someone engage with God and Scripture in the
        morning?
      </p>

      <h2>One Possible Morning</h2>
      <p>
        For example, Zoe can prepare a full written devotional-style note for you. It can take into account
        whatever book of the Bible or topic you want to study, give you some helpful surrounding context or
        insight, ask a few reflection questions, and connect it to your actual life.
      </p>
      <p>That is already pretty cool, to be honest.</p>
      <p>
        The danger with that approach, and this is something I want to be careful about, is that it could
        train people to rely on Zoe to suggest what a passage might mean, or what God might be saying to
        them.
      </p>

      <blockquote>Is that a problem?</blockquote>

      <p>
        It depends. If Zoe becomes a substitute for someone&apos;s own ongoing conversation with God, then yes,
        I think we have a problem.
      </p>
      <p>
        But also, people already bring a lot of voices into the way they read Scripture and discern what God
        may be saying: TV, social media, sermons, podcasts, random blog posts, group chats, you name it.
      </p>
      <p>
        So is getting Zoe&apos;s take, one that is grounded in Scripture, historical Christian orthodoxy, and
        serious sources, automatically worse than those other voices?
      </p>
      <p>I do not think the answer is obvious.</p>

      <h2>The Other Option</h2>
      <p>
        The other option is to have Zoe lead someone through an interaction with Scripture without offering
        as much of its own take.
      </p>
      <p>
        In that version, Zoe invites you to read a passage, then asks you to name what stood out. From
        there, Zoe can prompt you to discern: &quot;What do you think God is drawing your attention to here,
        and how might that be tested or lived today?&quot;
      </p>
      <p>
        Once you describe it, Zoe can help you remember and live it out, including follow-up nudges later in
        the day if that would actually help.
      </p>
      <p>
        It is more like the classic SOAP style of Bible study: Scripture, Observation, Application, Prayer.
        My guess is that more seasoned Christians may prefer this style, because Scripture leads and Zoe
        mostly helps you respond.
      </p>

      <p>I can see the need for both. I can also see the tradeoffs in both.</p>
      <p>I would love to get your take.</p>
      <p>What kind of morning experience would you prefer Zoe to walk you through?</p>
      <p>What would be helpful? What would not?</p>
      <p>Let me know. Your opinion matters here.</p>
      <p>Toward Him daily,</p>
      <p>Tony</p>
      <p>
        <em>
        P.S. Feel free to reach out directly:{" "}
        <a href="mailto:tony@zoe.live">tony@zoe.live</a>.
        </em>
      </p>
    </BlogArticleShell>
  );
}
