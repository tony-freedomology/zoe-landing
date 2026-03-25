import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import loveImg from "../../../public/images/journeys/love.jpg";

const journey = journeyContent.love;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function LovePage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={loveImg} />;
}
