import type { Metadata } from "next";
import JourneyLessonPage from "../../../components/JourneyLessonPage";
import { journeyLessonMock } from "../../../lib/journeyLessonMock";
import { NOINDEX_ROBOTS } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Journey Lesson Preview",
  description:
    "Canonical preview for the Zoe daily journey lesson experience.",
  robots: NOINDEX_ROBOTS,
};

export default function JourneyLessonPreviewPage() {
  return (
    <JourneyLessonPage
      lesson={journeyLessonMock}
      storageKey="journey-lesson-preview"
    />
  );
}
