import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import angerImg from "../../../public/images/journeys/anger.jpg";

const journey = journeyContent.anger;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function AngerPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={angerImg} />;
}
