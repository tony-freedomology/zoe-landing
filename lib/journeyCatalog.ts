import type { StaticImageData } from "next/image";
import jamesDeepImg from "../public/images/journeys/james-deep.jpg";
import stillPrayerImg from "../public/images/journeys/still-prayer.jpg";
import examenReflectionImg from "../public/images/journeys/examen-reflection.jpg";
import rootedPsalmsImg from "../public/images/journeys/rooted-psalms.jpg";
import wayOfJesusImg from "../public/images/journeys/way-of-jesus.jpg";
import leadershipImg from "../public/images/journeys/leadership.jpg";
import loveImg from "../public/images/journeys/love.jpg";
import moneyImg from "../public/images/journeys/money.jpg";
import healthImg from "../public/images/journeys/health.jpg";
import fearAnxietyImg from "../public/images/journeys/fear-anxiety.jpg";
import marriageImg from "../public/images/journeys/marriage.jpg";
import parentingImg from "../public/images/journeys/parenting.jpg";
import purposeImg from "../public/images/journeys/purpose.jpg";
import identityImg from "../public/images/journeys/identity.jpg";
import forgivenessImg from "../public/images/journeys/forgiveness.jpg";
import prayerImg from "../public/images/journeys/prayer.jpg";
import faithDoubtImg from "../public/images/journeys/faith-doubt.jpg";
import workAmbitionImg from "../public/images/journeys/work-ambition.jpg";
import griefImg from "../public/images/journeys/grief.jpg";
import friendshipImg from "../public/images/journeys/friendship.jpg";
import angerImg from "../public/images/journeys/anger.jpg";
import wisdomImg from "../public/images/journeys/wisdom.jpg";
import addictionImg from "../public/images/journeys/addiction.jpg";
import gratitudeImg from "../public/images/journeys/gratitude.jpg";
import patienceImg from "../public/images/journeys/patience.jpg";
import { journeyContent } from "./journeyContent";

export type JourneySummary = {
  slug: string;
  title: string;
  duration: string;
  difficulty: "introductory" | "intermediate" | "deep";
  image: StaticImageData;
  description: string;
};

export const journeyCatalog: JourneySummary[] = [
  {
    slug: "james-deep",
    title: "James: 10 Days Deep",
    duration: "10 Days",
    difficulty: "intermediate",
    image: jamesDeepImg,
    description:
      "James writes to a scattered church, people who claimed faith but lived differently from Monday to Saturday. His letter is less a theology lecture and more a direct conversation: you say you believe. Does your life show it?",
  },
  {
    slug: "still",
    title: "Still: 21 Days of Contemplative Prayer",
    duration: "21 Days",
    difficulty: "introductory",
    image: stillPrayerImg,
    description:
      "Most of us talk at God. This journey teaches you to sit with God. Twenty-one days of building a contemplative prayer practice, starting with just two minutes of silence and gradually deepening into a rhythm that changes how you experience God's presence.",
  },
  {
    slug: "the-examen",
    title: "The Examen: 14 Days of Evening Reflection",
    duration: "14 Days",
    difficulty: "introductory",
    image: examenReflectionImg,
    description:
      "The Examen is a five-hundred-year-old prayer practice from Ignatius of Loyola. It is simple: at the end of each day, look back and notice where God showed up, and where you missed it. Fourteen days to build the habit of paying attention.",
  },
  {
    slug: "rooted",
    title: "Rooted: 30 Days in the Psalms",
    duration: "30 Days",
    difficulty: "introductory",
    image: rootedPsalmsImg,
    description:
      "The Psalms are the prayer book of the Bible, raw, honest, and deeply human. This thirty-day journey pairs one psalm per day with a contemplative reading practice. Some days you will sit in praise. Others, you will wrestle with doubt. That is the point.",
  },
  {
    slug: "way-of-jesus",
    title: "The Way of Jesus: 40 Days Through the Gospels",
    duration: "40 Days",
    difficulty: "deep",
    image: wayOfJesusImg,
    description:
      "Forty days walking through the life and teachings of Jesus, from his first sermon to his last words. Each day pairs a Gospel passage with an application challenge. Because understanding what Jesus said without doing what he said is the whole problem.",
  },
  {
    slug: journeyContent.leadership.slug,
    title: journeyContent.leadership.title,
    duration: journeyContent.leadership.duration,
    difficulty: journeyContent.leadership.difficulty,
    image: leadershipImg,
    description: journeyContent.leadership.description,
  },
  {
    slug: journeyContent.love.slug,
    title: journeyContent.love.title,
    duration: journeyContent.love.duration,
    difficulty: journeyContent.love.difficulty,
    image: loveImg,
    description: journeyContent.love.description,
  },
  {
    slug: journeyContent.money.slug,
    title: journeyContent.money.title,
    duration: journeyContent.money.duration,
    difficulty: journeyContent.money.difficulty,
    image: moneyImg,
    description: journeyContent.money.description,
  },
  {
    slug: journeyContent.health.slug,
    title: journeyContent.health.title,
    duration: journeyContent.health.duration,
    difficulty: journeyContent.health.difficulty,
    image: healthImg,
    description: journeyContent.health.description,
  },
  {
    slug: journeyContent["fear-anxiety"].slug,
    title: journeyContent["fear-anxiety"].title,
    duration: journeyContent["fear-anxiety"].duration,
    difficulty: journeyContent["fear-anxiety"].difficulty,
    image: fearAnxietyImg,
    description: journeyContent["fear-anxiety"].description,
  },
  {
    slug: journeyContent.marriage.slug,
    title: journeyContent.marriage.title,
    duration: journeyContent.marriage.duration,
    difficulty: journeyContent.marriage.difficulty,
    image: marriageImg,
    description: journeyContent.marriage.description,
  },
  {
    slug: journeyContent.parenting.slug,
    title: journeyContent.parenting.title,
    duration: journeyContent.parenting.duration,
    difficulty: journeyContent.parenting.difficulty,
    image: parentingImg,
    description: journeyContent.parenting.description,
  },
  {
    slug: journeyContent.purpose.slug,
    title: journeyContent.purpose.title,
    duration: journeyContent.purpose.duration,
    difficulty: journeyContent.purpose.difficulty,
    image: purposeImg,
    description: journeyContent.purpose.description,
  },
  {
    slug: journeyContent.identity.slug,
    title: journeyContent.identity.title,
    duration: journeyContent.identity.duration,
    difficulty: journeyContent.identity.difficulty,
    image: identityImg,
    description: journeyContent.identity.description,
  },
  {
    slug: journeyContent.forgiveness.slug,
    title: journeyContent.forgiveness.title,
    duration: journeyContent.forgiveness.duration,
    difficulty: journeyContent.forgiveness.difficulty,
    image: forgivenessImg,
    description: journeyContent.forgiveness.description,
  },
  {
    slug: journeyContent.prayer.slug,
    title: journeyContent.prayer.title,
    duration: journeyContent.prayer.duration,
    difficulty: journeyContent.prayer.difficulty,
    image: prayerImg,
    description: journeyContent.prayer.description,
  },
  {
    slug: journeyContent["faith-doubt"].slug,
    title: journeyContent["faith-doubt"].title,
    duration: journeyContent["faith-doubt"].duration,
    difficulty: journeyContent["faith-doubt"].difficulty,
    image: faithDoubtImg,
    description: journeyContent["faith-doubt"].description,
  },
  {
    slug: journeyContent["work-ambition"].slug,
    title: journeyContent["work-ambition"].title,
    duration: journeyContent["work-ambition"].duration,
    difficulty: journeyContent["work-ambition"].difficulty,
    image: workAmbitionImg,
    description: journeyContent["work-ambition"].description,
  },
  {
    slug: journeyContent.grief.slug,
    title: journeyContent.grief.title,
    duration: journeyContent.grief.duration,
    difficulty: journeyContent.grief.difficulty,
    image: griefImg,
    description: journeyContent.grief.description,
  },
  {
    slug: journeyContent.friendship.slug,
    title: journeyContent.friendship.title,
    duration: journeyContent.friendship.duration,
    difficulty: journeyContent.friendship.difficulty,
    image: friendshipImg,
    description: journeyContent.friendship.description,
  },
  {
    slug: journeyContent.anger.slug,
    title: journeyContent.anger.title,
    duration: journeyContent.anger.duration,
    difficulty: journeyContent.anger.difficulty,
    image: angerImg,
    description: journeyContent.anger.description,
  },
  {
    slug: journeyContent.wisdom.slug,
    title: journeyContent.wisdom.title,
    duration: journeyContent.wisdom.duration,
    difficulty: journeyContent.wisdom.difficulty,
    image: wisdomImg,
    description: journeyContent.wisdom.description,
  },
  {
    slug: journeyContent.addiction.slug,
    title: journeyContent.addiction.title,
    duration: journeyContent.addiction.duration,
    difficulty: journeyContent.addiction.difficulty,
    image: addictionImg,
    description: journeyContent.addiction.description,
  },
  {
    slug: journeyContent.gratitude.slug,
    title: journeyContent.gratitude.title,
    duration: journeyContent.gratitude.duration,
    difficulty: journeyContent.gratitude.difficulty,
    image: gratitudeImg,
    description: journeyContent.gratitude.description,
  },
  {
    slug: journeyContent.patience.slug,
    title: journeyContent.patience.title,
    duration: journeyContent.patience.duration,
    difficulty: journeyContent.patience.difficulty,
    image: patienceImg,
    description: journeyContent.patience.description,
  },
];
