import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import forgivenessImg from "../../../public/images/journeys/forgiveness.jpg";

const journey = journeyContent.forgiveness;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function ForgivenessPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={forgivenessImg} />;
}
