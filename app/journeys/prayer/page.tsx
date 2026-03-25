import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import prayerImg from "../../../public/images/journeys/prayer.jpg";

const journey = journeyContent.prayer;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function PrayerPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={prayerImg} />;
}
