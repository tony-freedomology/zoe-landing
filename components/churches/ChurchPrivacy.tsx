import { headingAccent, lede, sectionPad, sheet, wrap } from "../home/styles";
import { CheckIcon, CrossIcon, EyeIcon, LockIcon } from "./icons";
import { cardOutline, churchHeading } from "./styles";

const SEE = [
  ["Themes across your church", "What's resonating and what might need clarifying."],
  ["Participation, in aggregate", "How many people are in the rhythm and trying the practice."],
  ["Requests people choose to send", "“I'd like a call.” With only what they decided to share."],
];

const NEVER_SEE = [
  ["Anyone's text thread", "No transcripts, no search, no “view as member.”"],
  ["Prayer lists and confessions", "What someone brings to God stays between them and God."],
  ["Individual “growth scores”", "Zoe doesn't rank, grade, or flag your people."],
];

const listItem = "grid grid-cols-[22px_1fr] gap-3 text-base font-medium leading-[1.5] text-zoe-muted";

export default function ChurchPrivacy() {
  return (
    <section id="privacy" aria-labelledby="pv-h" className={`${sheet} ${sectionPad} bg-zoe-surface`}>
      <div className={wrap}>
        <h2 id="pv-h" className={`${churchHeading} max-w-[15ch]`}>
          Shared patterns, <em className={headingAccent}>not private threads.</em>
        </h2>
        <p className={`${lede} mt-5 max-w-[52ch]`}>
          People need room to be honest. You need information you can actually use. Zoe keeps that line bright, so care
          never turns into surveillance.
        </p>

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-[18px] min-[821px]:grid-cols-2">
          <div className={`rounded-[28px] bg-white p-[clamp(24px,3vw,36px)] ${cardOutline}`}>
            <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-[-0.03em]">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-zoe-sap text-white">
                <EyeIcon size={20} />
              </span>
              What you see
            </h3>
            <ul className="mt-5 grid list-none gap-3.5 p-0">
              {SEE.map(([title, body]) => (
                <li key={title} className={listItem}>
                  <CheckIcon size={18} className="mt-[3px] text-zoe-sap" />
                  <div>
                    <b className="block font-bold text-zoe-ink">{title}</b>
                    {body}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-[#EEF0EC] p-[clamp(24px,3vw,36px)]">
            <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-[-0.03em]">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-zoe-ink text-white">
                <LockIcon size={20} />
              </span>
              What you never see
            </h3>
            <ul className="mt-5 grid list-none gap-3.5 p-0">
              {NEVER_SEE.map(([title, body]) => (
                <li key={title} className={listItem}>
                  <CrossIcon size={18} className="mt-[3px] text-zoe-ink" />
                  <div>
                    <b className="block font-bold text-zoe-ink">{title}</b>
                    {body}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-[22px] text-center text-[15px] font-semibold text-zoe-muted">
          Members can take their history with them or delete it anytime. Sharing is always their choice.
        </p>
      </div>
    </section>
  );
}
