import type { ReactNode } from "react";
import { headingAccent, lede, sectionPad, sheet, wrap } from "../home/styles";
import { BookIcon, InfoIcon, MicIcon, ShieldIcon } from "./icons";
import { churchHeading } from "./styles";

const CARDS: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <MicIcon size={22} />,
    title: "Your sermons",
    body: "Notes, outlines, or audio each week. Zoe carries the big idea and practice into people's days.",
  },
  {
    icon: <BookIcon size={22} />,
    title: "Your statement of faith",
    body: "Your theological guardrails and distinctives. On debated questions, Zoe points people back to your church.",
  },
  {
    icon: <ShieldIcon size={22} />,
    title: "Your boundaries",
    body: "What Zoe should and shouldn't say, and when it should always point someone to a real person on your team.",
  },
];

export default function ChurchShaped() {
  return (
    <section aria-labelledby="sh-h" className={`${sheet} ${sectionPad} bg-zoe-oat`}>
      <div className={wrap}>
        <h2 id="sh-h" className={`${churchHeading} max-w-[14ch]`}>
          Shaped by your teaching. <em className={headingAccent}>Never pretending to be you.</em>
        </h2>
        <p className={`${lede} mt-5 max-w-[52ch]`}>
          Zoe can learn from how your church talks about God and the life of faith, and stay inside the lines you draw.
        </p>

        <div className="mt-[clamp(40px,5vw,64px)] grid gap-4 min-[901px]:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-[26px] bg-white p-7 outline outline-1 outline-[rgba(187,202,193,0.4)]"
            >
              <span className="grid h-[46px] w-[46px] place-items-center rounded-[14px] bg-[#E4F6EE] text-zoe-sap">
                {card.icon}
              </span>
              <h3 className="mt-[18px] text-[21px] font-extrabold tracking-[-0.025em]">{card.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-zoe-muted">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-[22px] grid grid-cols-[auto_1fr] items-center gap-[18px] rounded-[26px] bg-zoe-ink px-7 py-6 text-white">
          <InfoIcon size={30} className="text-zoe-sap" />
          <p className="text-[17px] font-medium leading-[1.55] text-white/[0.86]">
            <b className="text-white">It&apos;s still AI, and we say so plainly.</b> It can make mistakes. It&apos;s trained
            on your teaching, but it isn&apos;t you, doesn&apos;t speak with your authority, and never replaces real
            pastoral care.
          </p>
        </div>
      </div>
    </section>
  );
}
