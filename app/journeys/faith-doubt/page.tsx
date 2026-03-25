import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import faithDoubtImg from "../../../public/images/journeys/faith-doubt.jpg";

const journey = journeyContent["faith-doubt"];
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function FaithDoubtPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={faithDoubtImg} />;
}
