import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import moneyImg from "../../../public/images/journeys/money.jpg";

const journey = journeyContent.money;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function MoneyPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={moneyImg} />;
}
