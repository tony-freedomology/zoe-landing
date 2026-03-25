import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import heroImg from "../../../public/images/journeys/rest.jpg";

const journey = journeyContent.rest;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function UrestPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={heroImg} />;
}
