import Link from "next/link";
import ZoeMark from "../ZoeMark";
import { btnJade, btnQuiet, wrap } from "../home/styles";
import { ArrowDownIcon, CheckIcon } from "./icons";
import { PILOT_HREF } from "./links";

const PROOF = ["No app for members", "Patterns, not private threads", "Built by pastors"];

// Split hero: copy on the left, the hills art in a framed window on the right with
// the Sunday bulletin (what the pastor gives Zoe) and a Tuesday text (what members
// get) layered on it. Stacks and centres below 900px.
export default function ChurchHero() {
  return (
    <section
      id="hero"
      aria-labelledby="churches-h1"
      className="relative bg-zoe-oat pb-[clamp(88px,10vw,128px)] pt-[calc(68px+clamp(36px,7vw,88px))]"
    >
      <div className={`${wrap} grid items-center gap-[clamp(36px,5vw,72px)] min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]`}>
        <div className="max-[900px]:text-center">
          <h1
            id="churches-h1"
            className="text-[clamp(44px,5.6vw,78px)] font-extrabold leading-[0.94] tracking-[-0.052em] text-zoe-ink"
          >
            Take Sunday into <span className="text-zoe-sap">Monday through Saturday.</span>
          </h1>
          <p className="mt-6 max-w-[40ch] text-[clamp(17px,1.5vw,20px)] font-medium leading-[1.55] text-zoe-muted max-[900px]:mx-auto">
            Zoe helps your people carry this week&apos;s sermon into ordinary life by text. You get a clear picture of
            what&apos;s landing, and nobody&apos;s private thread.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-[18px] gap-y-2 max-[900px]:justify-center">
            <Link href={PILOT_HREF} className={btnJade}>
              Start a pilot at your church
            </Link>
            <a href="#week" className={btnQuiet}>
              See one sermon&apos;s week
              <ArrowDownIcon className="transition-transform duration-[250ms] group-hover:translate-y-[3px]" />
            </a>
          </div>
          <p className="mt-7 flex flex-wrap gap-x-[22px] gap-y-2.5 text-sm font-bold text-zoe-ink max-[900px]:justify-center">
            {PROOF.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckIcon className="text-zoe-sap" />
                {item}
              </span>
            ))}
          </p>
        </div>

        <div
          className="relative pb-16 max-[900px]:mx-auto max-[900px]:w-full max-[900px]:max-w-[560px] max-[900px]:pb-0"
          aria-hidden="true"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] bg-[#DCEBE6] shadow-[0_30px_70px_rgba(30,50,40,0.14)] max-[900px]:aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/home/hills.webp"
              alt=""
              width={2400}
              height={1018}
              decoding="async"
              {...{ fetchpriority: "high" }}
              className="absolute inset-x-0 bottom-0 h-[118%] w-full max-w-none object-cover object-[62%_100%] max-[900px]:object-[56%_100%]"
            />
          </div>

          <div className="absolute right-[22px] top-[22px] z-[2] grid max-w-[250px] grid-cols-[34px_1fr] items-start gap-2.5 rounded-[20px] bg-white px-3.5 py-3 shadow-[0_16px_36px_rgba(20,40,30,0.14)] max-[900px]:right-3 max-[900px]:top-3 max-[900px]:max-w-[min(240px,70%)] max-[420px]:hidden">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-zoe-sap">
              <ZoeMark className="h-[13px] w-auto text-white" />
            </span>
            <p className="text-[13.5px] leading-[1.38] text-[#222]">
              <b className="flex justify-between gap-2 text-[12.5px]">
                Zoe <span className="font-medium text-[#8a8f8c]">Tue 7:00 AM</span>
              </b>
              Morning ☀️ What&apos;s one worry you want to bring to God today?
            </p>
          </div>

          <div className="absolute -left-7 bottom-0 z-[2] w-[min(290px,72%)] -rotate-[2.5deg] rounded-[22px] bg-white px-5 pb-5 pt-[18px] shadow-[0_24px_50px_rgba(20,40,30,0.16)] max-[900px]:relative max-[900px]:bottom-auto max-[900px]:left-auto max-[900px]:mx-3.5 max-[900px]:-mt-12 max-[900px]:w-auto max-[900px]:-rotate-[1.5deg]">
            <small className="block text-[11.5px] font-bold text-zoe-muted">This Sunday at Grace Church</small>
            <p className="mt-1 text-[22px] font-extrabold leading-[1.1] tracking-[-0.03em] text-zoe-ink">Peace in the storm</p>
            <p className="mt-[3px] font-serif text-base italic text-zoe-forest">Philippians 4:4–9</p>
            <hr className="my-3 border-0 border-t-[1.5px] border-dashed border-[rgba(187,202,193,0.9)]" />
            <div className="grid gap-1.5 text-[13.5px] leading-[1.45] text-zoe-muted [&_b]:text-zoe-ink">
              <p>
                <b>Big idea:</b> Anxiety isn&apos;t a lack of faith. It&apos;s something to bring to God.
              </p>
              <p>
                <b>This week:</b> Each morning, name one worry in prayer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
