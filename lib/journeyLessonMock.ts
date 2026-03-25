import type { StaticImageData } from "next/image";
import forgivenessHeroPhotoImg from "../public/assets/illustrations/journey-lesson-forgiveness-hero-photo.jpg";
import forgivenessDetailPhotoImg from "../public/assets/illustrations/journey-lesson-forgiveness-detail-photo.jpg";

export type LessonComment = {
  id: string;
  name: string;
  location: string;
  text: string;
  postedAt: string;
};

export type JourneyLessonData = {
  journey: string;
  dayLabel: string;
  title: string;
  scripture: string;
  readTime: string;
  coverImage: StaticImageData;
  detailImage: StaticImageData;
  detailImageAlt: string;
  summary: string;
  body: string[];
  prompts: string[];
  prayer: string;
  comments: LessonComment[];
};

export const journeyLessonMock: JourneyLessonData = {
  journey: "14-Day Journey on Forgiveness",
  dayLabel: "Day 4",
  title: "Letting Go of the Weight",
  scripture: "Matthew 18:21-22",
  readTime: "3 min read",
  coverImage: forgivenessHeroPhotoImg,
  detailImage: forgivenessDetailPhotoImg,
  detailImageAlt: "Blue-hour stream through a quiet meadow",
  summary:
    "Forgiveness is not pretending the wound never happened. It is setting down what has been shaping your posture so healing can begin.",
  body: [
    "Resentment has a way of turning one moment of pain into a daily rhythm. We rehearse what happened. We rebuild the case. We carry the conversation long after the other person has left the room.",
    "Jesus does not ask you to call evil good. He invites you to stop letting the offense become your identity. Forgiveness is the release of your right to keep reliving the injury as the center of the story.",
    "Today is not about forcing resolution. It is about loosening your grip. Notice the weight you have been carrying and ask what would change if you no longer needed to keep proving you were wronged.",
  ],
  prompts: [
    "What memory still changes your posture the moment it comes to mind?",
    "Where do you feel the cost of carrying this hurt in your body, attention, or prayers?",
    "What would a first act of release look like today, even if reconciliation is still far away?",
  ],
  prayer:
    "Jesus, I do not know how to heal this by myself. Teach me to release what I keep replaying, and make room in me for peace without denial.",
  comments: [
    {
      id: "sarah-m",
      name: "Sarah M.",
      location: "Day 4, morning reflection",
      text:
        "I realized I have been carrying a conversation from two years ago like it happened yesterday. Naming that felt honest, and honestly a little freeing.",
      postedAt: "12 minutes ago",
    },
    {
      id: "david-k",
      name: "David K.",
      location: "After lunch break",
      text:
        "The line about not letting the offense become my identity hit me hard. I think I have been defining this season by what someone took from me.",
      postedAt: "34 minutes ago",
    },
    {
      id: "amina-r",
      name: "Amina R.",
      location: "Evening walk",
      text:
        "My first act of release is going to be praying for someone without rehearsing my side of the story first. Small step, but it feels real.",
      postedAt: "1 hour ago",
    },
  ],
};
