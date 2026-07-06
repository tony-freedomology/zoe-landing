import type { Metadata } from "next";
import Image from "next/image";
import BlogArticleShell from "../../../components/BlogArticleShell";

export const metadata: Metadata = {
  openGraph: {
    images: ["/images/blog/same-tree/the-scene-wide.jpg"],
  },
  title: "The Same Tree, Every Morning",
  description:
    "Why Zoe's mornings now open in one place, and what that place is for.",
  alternates: {
    canonical: "/blog/the-same-tree-every-morning",
  },
};

function LightFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[1.25rem] border border-zoe-outline/60 bg-zoe-surface">
        <Image src={src} alt={alt} width={608} height={1080} className="h-auto w-full" />
      </div>
      <figcaption className="mt-2 text-center text-sm font-medium text-zoe-muted">{caption}</figcaption>
    </figure>
  );
}

export default function TheSameTreeEveryMorningPage() {
  return (
    <BlogArticleShell
      category="Product"
      date="July 2026"
      readTime="4 min read"
      title="The Same Tree, Every Morning"
      deck="Why Zoe's mornings now open in one place, and what that place is for."
      path="/blog/the-same-tree-every-morning"
      heroImage={{
        src: "/images/blog/same-tree/the-scene-wide.jpg",
        alt: "A dirt path on a grassy hillside leading to a single tree, mountains and a river valley behind it",
      }}
    >
      <p>Hey friends,</p>
      <p>
        We shipped something small this week that I care about a lot. When you open your morning study in
        Zoe now, you arrive somewhere.
      </p>
      <p>
        A dirt path on a hillside. One tree. Grasses moving a little in the wind, clouds rolling slowly
        behind it. If you show up at 7am, it&apos;s dawn there. If you show up at lunch, it&apos;s full
        daylight. If your morning got eaten and you finally sit down at 9pm, the same hill is waiting for
        you under stars.
      </p>
      <p>
        I want to show you the thinking behind it, because honestly the thinking is the feature.
      </p>

      <h2>Night and day are names we gave to our own turning</h2>
      <p>
        The idea started on a completely different page. Our church dashboard has this scene on its login
        screen, and depending on the time of day, a different video plays. Same hill, same tree, different
        light. I kept noticing how it made me feel to come back to it.
      </p>
      <p>
        Here&apos;s the thing about night and day. The sun doesn&apos;t actually go anywhere. What we call
        morning and evening are names we gave to our own turning. Underneath those names there&apos;s
        something more like an eternal present moment, where God is always available and always the same.
        Sometimes we&apos;re in shadow and sometimes we&apos;re not. Sometimes we&apos;re busy and sometimes
        we have space.
      </p>
      <p>
        But every time we return, we return to the same God.
      </p>
      <p>
        So the morning study opens on a place now instead of a picture. If you had a chaotic morning and
        you&apos;re late, the tree didn&apos;t move. The path is where you left it. That&apos;s the feeling
        I want in your body before you read a single verse.
      </p>

      <h2>You can&apos;t break a place</h2>
      <p>
        Most habit apps keep score on you. Streaks, badges, a little flame that dies if you miss a day. And
        I get why, it works, for a while. But the math underneath a streak is shame math. Miss three days
        and the app greets you with what you lost.
      </p>
      <p>
        A place doesn&apos;t keep score. Show up after five days away and the path is just... there. Nothing
        to rebuild, nothing to apologize to. Which is a lot closer to how Scripture actually talks.
        &quot;Come to me, all who labor&quot; doesn&apos;t have an expiration date on it.
      </p>
      <p>
        So Zoe&apos;s mornings don&apos;t open with a streak counter. They open with a door.
      </p>

      <h2>One place, four lights</h2>
      <p>
        Here&apos;s the scene the way your phone will actually meet it, at four different hours of the same
        day.
      </p>
      <div className="my-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <LightFigure src="/images/blog/same-tree/light-morning.jpg" alt="The hillside scene at dawn, soft rose light" caption="Morning" />
        <LightFigure src="/images/blog/same-tree/light-daylight.jpg" alt="The hillside scene at midday, blue sky and clouds" caption="Daylight" />
        <LightFigure src="/images/blog/same-tree/light-evening.jpg" alt="The hillside scene at golden hour" caption="Evening" />
        <LightFigure src="/images/blog/same-tree/light-night.jpg" alt="The hillside scene at night under stars" caption="Night" />
      </div>
      <p>
        The night one took the most care. Your greeting sits at the top of the screen in dark text, and a
        midnight sky doesn&apos;t give dark text much to stand on. So there&apos;s a soft wash of warm paper
        light behind the words, tuned separately for each time of day, strong enough to read by and thin
        enough that night still feels like night. We tested every one of them on a real phone screen and
        adjusted until it felt right.
      </p>

      <h2>And then it gets out of the way</h2>
      <p>
        This is the part I&apos;m most stubborn about. One tap after the greeting, you&apos;re in the
        Scripture. And the scene is gone.
      </p>
      <div className="my-8 grid grid-cols-2 gap-4">
        <LightFigure
          src="/images/blog/same-tree/ui-greeting.jpg"
          alt="Zoe's morning greeting screen with the daylight scene behind it"
          caption="The welcome"
        />
        <LightFigure
          src="/images/blog/same-tree/ui-scripture.jpg"
          alt="Zoe's Scripture screen: Psalm 37 in dark text on a plain warm paper background"
          caption="The Word, on paper"
        />
      </div>
      <p>
        Plain warm paper, dark text, Psalm 37 with nothing moving behind it. We actually had beautiful
        artwork behind every screen for about a day, and reading Scripture over it was harder. That settled
        it. If a background makes the Word harder to read, the background loses. The imagery&apos;s job is
        to welcome you, and then to step aside.
      </p>

      <p>
        If you&apos;re in the beta, open your morning tomorrow and tell me what it feels like to arrive.
        I read everything you send.
      </p>
      <p>Toward Him daily,</p>
      <p>Tony</p>
    </BlogArticleShell>
  );
}
