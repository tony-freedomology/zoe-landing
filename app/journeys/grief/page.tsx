import type { Metadata } from "next";
import JourneyDetailPage from "../../../components/JourneyDetailPage";
import JourneyJsonLd from "../../../components/JourneyJsonLd";
import { journeyMetadata } from "../../../lib/journeyMetadata";
import { journeyContent } from "../../../lib/journeyContent";

const journey = journeyContent.grief;
const days = journey.days;

export const metadata: Metadata = journeyMetadata(journey);

export default function GriefPage() {
  return (
    <>
      <JourneyJsonLd journey={journey} />
      <JourneyDetailPage journey={{ ...journey, days }} />
    </>
  );
}
