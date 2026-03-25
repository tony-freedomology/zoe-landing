import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import patienceImg from "../../../public/images/journeys/patience.jpg";

const journey = journeyContent.patience;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function PatiencePage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={patienceImg} />;
}
