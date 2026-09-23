import Link from "next/link";
import { btnJade, headingAccent, lede, sectionPad, sheet, wrap } from "../home/styles";
import { PILOT_HREF } from "./links";
import { churchHeading } from "./styles";

const STEPS: { title: string; body: string; time: string; iso?: string }[] = [
  { title: "A conversation with our team", body: "Your church, your goals, and whether Zoe fits.", time: "30 min", iso: "PT30M" },
  {
    title: "Set your guardrails",
    body: "Statement of faith, boundaries, and your care team's contacts.",
    time: "About an hour",
    iso: "PT1H",
  },
  {
    title: "Invite a small group",
    body: "10 to 30 people text Zoe to join. That's the whole setup for them.",
    time: "1 week",
    iso: "P7D",
  },
  {
    title: "Weekly check-ins",
    body: "What's working, what's awkward, and what's missing. We build it with you.",
    time: "Ongoing",
  },
];

const timeChip =
  "whitespace-nowrap rounded-full bg-[#E4F6EE] px-2.5 py-[5px] text-[12.5px] font-bold text-zoe-forest max-[520px]:col-start-2 max-[520px]:justify-self-start";

export default function ChurchPilot() {
  return (
    <section id="pilot" aria-labelledby="pi-h" className={`${sheet} ${sectionPad} bg-zoe-surface`}>
      <div className={`${wrap} grid items-start gap-[clamp(32px,6vw,88px)] min-[901px]:grid-cols-[0.9fr_1.1fr]`}>
        <div>
          <h2 id="pi-h" className={churchHeading}>
            Start small. <em className={headingAccent}>Learn together.</em>
          </h2>
          <p className={`${lede} mt-5 max-w-[52ch]`}>
            Pilots start with a small group, not your whole congregation. We&apos;ll set it up with you and keep checking
            in.
          </p>
          <div className="mt-[30px] flex flex-wrap items-center gap-x-[18px] gap-y-2.5">
            <Link href={PILOT_HREF} className={btnJade}>
              Start a pilot at your church
            </Link>
            <small className="text-sm font-semibold text-zoe-muted">No new app for your members.</small>
          </div>
        </div>

        <ol className="m-0 grid list-none gap-3 p-0">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[44px_1fr_auto] items-center gap-4 rounded-[22px] bg-white px-5 py-[18px] outline outline-1 outline-[rgba(187,202,193,0.4)] max-[520px]:grid-cols-[40px_1fr]"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-full bg-zoe-sap font-extrabold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <b className="block text-[17px] font-extrabold tracking-[-0.015em]">{step.title}</b>
                <span className="text-[14.5px] text-zoe-muted">{step.body}</span>
              </div>
              {step.iso ? (
                <time dateTime={step.iso} className={timeChip}>
                  {step.time}
                </time>
              ) : (
                <span className={timeChip}>{step.time}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
