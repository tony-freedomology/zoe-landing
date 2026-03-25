import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import heroImg from "../../../public/images/journeys/generosity.jpg";

const journey = journeyContent.generosity;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function UgenerosityPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={heroImg} />;
}
