import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import fearAnxietyImg from "../../../public/images/journeys/fear-anxiety.jpg";

const journey = journeyContent["fear-anxiety"];
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function FearAnxietyPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={fearAnxietyImg} />;
}
