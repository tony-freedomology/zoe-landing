import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import healthImg from "../../../public/images/journeys/health.jpg";

const journey = journeyContent.health;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function HealthPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={healthImg} />;
}
