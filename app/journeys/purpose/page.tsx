import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import purposeImg from "../../../public/images/journeys/purpose.jpg";

const journey = journeyContent.purpose;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function PurposePage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={purposeImg} />;
}
