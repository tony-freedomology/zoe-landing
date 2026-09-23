import ZoeMark from "../ZoeMark";
import { bubbleYou, bubbleZoe, headingAccent, lede, sectionPad, sheet, wrap } from "./styles";

const REMINDERS = [
  { when: "Thu 4:00 PM", text: "Today's the day for your mom's results. Want to take a minute and pray for her?", indent: "" },
  { when: "Fri 8:30 AM", text: "How did your mom's results come back? 💛", indent: "min-[481px]:ml-2.5" },
  {
    when: "Sun 7:15 PM",
    text: "You mentioned Marcus a couple weeks ago. Still want to keep him on your prayer list?",
    indent: "min-[481px]:ml-5",
  },
];

// Zoe helps people remember to pray and follows up. It never prays for them or
// claims to (brand brief).
export default function PrayerSection() {
  return (
    <section id="prayer" aria-labelledby="pr-h" className={`${sheet} ${sectionPad} bg-zoe-oat`}>
      <div className={`${wrap} grid items-center gap-[clamp(36px,6vw,88px)] min-[901px]:grid-cols-[0.95fr_1.05fr]`}>
        <div>
          <h2
            id="pr-h"
            className="text-[clamp(40px,5.6vw,72px)] font-extrabold leading-[0.96] tracking-[-0.048em] text-zoe-ink"
          >
            Remember the people you&apos;re <em className={headingAccent}>praying for</em>.
          </h2>
          <p className={`${lede} mt-5 max-w-[44ch]`}>
            Tell Zoe who&apos;s on your heart. It helps you remember to pray for them at the right moment, then asks how things
            turned out.
          </p>
          <p className="mt-[26px] text-[15px] font-semibold text-zoe-ink">
            Just text something like{" "}
            <span className="mt-1.5 block w-fit rounded-[18px] rounded-br-[6px] bg-[#007AFF] px-3.5 py-2 font-medium text-white">
              &ldquo;remind me to pray for my mom thursday&rdquo;
            </span>
          </p>
        </div>

        <div className="grid gap-[22px] rounded-[32px] bg-zoe-surface p-[clamp(18px,3vw,32px)] outline outline-1 outline-zoe-outline/40">
          <div className="grid gap-1.5" role="group" aria-label="Example: asking Zoe to remember a prayer request">
            <div className={bubbleYou}>can you remind me to pray for my mom thursday? her biopsy results come back</div>
            <div className={bubbleZoe}>Of course. That&apos;s a heavy one to carry 💛 I&apos;ll check in Thursday afternoon.</div>
          </div>
          <ol className="m-0 grid list-none gap-2.5 p-0" aria-label="Reminders Zoe sends later">
            {REMINDERS.map((r) => (
              <li
                key={r.when}
                className={`grid grid-cols-[38px_1fr] items-start gap-3 rounded-[20px] bg-white px-[15px] py-[13px] shadow-[0_10px_26px_rgba(45,50,49,0.08)] ${r.indent}`}
              >
                <span className="grid h-[38px] w-[38px] place-items-center rounded-[10px] bg-zoe-sap">
                  <ZoeMark className="h-3.5 w-auto text-white" />
                </span>
                <p className="text-[14.5px] leading-[1.4] text-[#222]">
                  <b className="mb-0.5 flex justify-between gap-2.5 text-[13.5px]">
                    Zoe <time className="font-medium tabular-nums text-[#8a8f8c]">{r.when}</time>
                  </b>
                  {r.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
