import type { Metadata } from "next";
import JourneyLessonPage from "../../../components/JourneyLessonPage";
import { journeyLessonMock } from "../../../lib/journeyLessonMock";

export const metadata: Metadata = {
  title: "Journey Lesson Preview — Zoe",
  description:
    "Canonical preview for the Zoe daily journey lesson experience.",
};

export default function JourneyLessonPreviewPage() {
  return (
    <JourneyLessonPage
      lesson={journeyLessonMock}
      storageKey="journey-lesson-preview"
    />
  );
}
