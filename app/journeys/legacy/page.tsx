import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import heroImg from "../../../public/images/journeys/legacy.jpg";

const journey = journeyContent.legacy;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function UlegacyPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={heroImg} />;
}
