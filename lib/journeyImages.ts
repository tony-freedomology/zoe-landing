export const journeyImagePaths = {
  "james-deep": "/images/journeys/james-deep.jpg",
  still: "/images/journeys/still-prayer.jpg",
  "the-examen": "/images/journeys/examen-reflection.jpg",
  rooted: "/images/journeys/rooted-psalms.jpg",
  "way-of-jesus": "/images/journeys/way-of-jesus.jpg",
  "new-believer": "/images/journeys/new-believer.jpg",
  leadership: "/images/journeys/leadership.jpg",
  love: "/images/journeys/love.jpg",
  money: "/images/journeys/money.jpg",
  health: "/images/journeys/health.jpg",
  "fear-anxiety": "/images/journeys/fear-anxiety.jpg",
  marriage: "/images/journeys/marriage.jpg",
  parenting: "/images/journeys/parenting.jpg",
  purpose: "/images/journeys/purpose.jpg",
  identity: "/images/journeys/identity.jpg",
  forgiveness: "/images/journeys/forgiveness.jpg",
  prayer: "/images/journeys/prayer.jpg",
  "faith-doubt": "/images/journeys/faith-doubt.jpg",
  "work-ambition": "/images/journeys/work-ambition.jpg",
  grief: "/images/journeys/grief.jpg",
  friendship: "/images/journeys/friendship.jpg",
  anger: "/images/journeys/anger.jpg",
  wisdom: "/images/journeys/wisdom.jpg",
  addiction: "/images/journeys/addiction.jpg",
  gratitude: "/images/journeys/gratitude.jpg",
  patience: "/images/journeys/patience.jpg",
  courage: "/images/journeys/courage.jpg",
  generosity: "/images/journeys/generosity.jpg",
  rest: "/images/journeys/rest.jpg",
  suffering: "/images/journeys/suffering.jpg",
  legacy: "/images/journeys/legacy.jpg",
} as const;

export type JourneyImageSlug = keyof typeof journeyImagePaths;

export function getJourneyImagePath(slug: JourneyImageSlug): string {
  return journeyImagePaths[slug];
}
