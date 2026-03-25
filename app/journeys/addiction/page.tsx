import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import addictionImg from "../../../public/images/journeys/addiction.jpg";

const journey = journeyContent.addiction;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function AddictionPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={addictionImg} />;
}
