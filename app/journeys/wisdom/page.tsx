import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import wisdomImg from "../../../public/images/journeys/wisdom.jpg";

const journey = journeyContent.wisdom;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function WisdomPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={wisdomImg} />;
}
