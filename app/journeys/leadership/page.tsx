import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import leadershipImg from "../../../public/images/journeys/leadership.jpg";

const journey = journeyContent.leadership;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function LeadershipPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={leadershipImg} />;
}
