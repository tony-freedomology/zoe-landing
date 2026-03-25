import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import parentingImg from "../../../public/images/journeys/parenting.jpg";

const journey = journeyContent.parenting;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function ParentingPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={parentingImg} />;
}
