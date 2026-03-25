import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import { journeyContent } from "../../../lib/journeyContent";
import friendshipImg from "../../../public/images/journeys/friendship.jpg";

const journey = journeyContent.friendship;
const days = journey.days;

export const metadata: Metadata = {
  title: `${journey.title} - Zoe`,
  description: journey.metaDescription,
};

export default function FriendshipPage() {
  return <JourneyDetailPage journey={{ ...journey, days }} heroImage={friendshipImg} />;
}
