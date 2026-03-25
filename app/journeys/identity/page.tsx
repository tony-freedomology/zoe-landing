import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import identityImg from "../../../public/images/journeys/identity.jpg";

const journey = journeyContent.identity;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function IdentityPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={identityImg} />;
}
