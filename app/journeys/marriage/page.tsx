import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import marriageImg from "../../../public/images/journeys/marriage.jpg";

const journey = journeyContent.marriage;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function MarriagePage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={marriageImg} />;
}
