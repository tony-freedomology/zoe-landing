import Link from "next/link";
import { journeyCatalog, type JourneySummary } from "../../lib/journeyCatalog";
import { bubbleYou, bubbleZoe, displayHeading, headingAccent, lede, sectionPad, sheet, wrap } from "./styles";

// Journeys shown on the home page, in display order. Each has a 640w thumbnail
// in public/assets/home/journeys/<slug>.webp at the art's native 1376:768 ratio,
// so the full cover is always visible (never cropped).
const HOME_JOURNEY_SLUGS = [
  "wisdom",
  "fear-anxiety",
  "marriage",
  "money",
  "grief",
  "prayer",
  "parenting",
  "james-deep",
  "forgiveness",
  "identity",
  "rest",
  "work-ambition",
  "still",
  "friendship",
];

function homeJourneys(): JourneySummary[] {
  // The catalog can contain duplicate slugs; keep the first of each.
  const bySlug = new Map<string, JourneySummary>();
  for (const j of journeyCatalog) if (!bySlug.has(j.slug)) bySlug.set(j.slug, j);
  return HOME_JOURNEY_SLUGS.map((slug) => bySlug.get(slug)).filter((j): j is JourneySummary => Boolean(j));
}

function JourneyCard({ journey, clone = false }: { journey: JourneySummary; clone?: boolean }) {
  return (
    <Link
      href={`/journeys/${journey.slug}`}
      className="w-[300px] flex-none rounded-[22px] bg-white px-2.5 pb-4 pt-2.5 no-underline shadow-[0_10px_28px_rgba(45,50,49,0.05)] outline outline-1 outline-zoe-outline/40 transition-transform duration-300 hover:-translate-y-1"
      {...(clone ? { "aria-hidden": true, tabIndex: -1 } : {})}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/home/journeys/${journey.slug}.webp`}
        alt=""
        width={640}
        height={357}
        loading="lazy"
        decoding="async"
        className="aspect-[1376/768] w-full rounded-[14px] bg-zoe-surface object-cover"
      />
      <h3 className="mx-1.5 mb-[3px] mt-3 text-[15px] font-extrabold leading-[1.28] tracking-[-0.01em] text-zoe-ink">
        {journey.title}
      </h3>
      <span className="mx-1.5 text-[12.5px] font-semibold text-zoe-muted">{journey.duration.toLowerCase()}</span>
    </Link>
  );
}

export default function JourneysSection() {
  const journeys = homeJourneys();
  const rows = [journeys.filter((_, i) => i % 2 === 0), journeys.filter((_, i) => i % 2 === 1)];

  return (
    <section id="journeys" aria-labelledby="j-h" className={`${sheet} ${sectionPad} bg-zoe-surface`}>
      <div className="mx-auto max-w-[820px] px-[clamp(16px,4vw,40px)] text-center">
        <h2 id="j-h" className={displayHeading}>
          Daily journeys for your <em className={headingAccent}>actual life</em>
        </h2>
        <p className={`${lede} mx-auto mt-5 max-w-[56ch]`}>
          Pick a path on fear, money, marriage, grief, or prayer. Or ask Zoe to build one around whatever you&apos;re walking
          through.
        </p>
      </div>

      <div className="home-marquee mt-[clamp(40px,5vw,64px)] grid gap-4">
        {rows.map((row, r) => (
          <div key={r} className="home-marquee-row overflow-hidden py-1">
            <ul className={`home-marquee-track m-0 flex w-max list-none gap-4 p-0${r === 1 ? " is-reverse" : ""}`}>
              {row.map((j) => (
                <li key={j.slug} className="flex">
                  <JourneyCard journey={j} />
                </li>
              ))}
              {row.map((j) => (
                <li key={`${j.slug}-clone`} className="flex" aria-hidden="true">
                  <JourneyCard journey={j} clone />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={wrap}>
        <div
          className="mx-auto mt-[clamp(40px,5vw,60px)] grid max-w-[520px] gap-1.5"
          role="group"
          aria-label="Example of asking for a custom journey"
        >
          <div className={`${bubbleYou}`}>can we do 2 weeks on anxiety? mornings only, keep it short</div>
          <div className={`${bubbleZoe}`}>
            Yes. 14 days at 7am, about 5 minutes each. We&apos;ll start tomorrow with Psalm 46.
          </div>
          <p className="mt-3 text-center text-sm font-semibold text-zoe-muted">Or just text Zoe what you need.</p>
        </div>
      </div>
    </section>
  );
}
