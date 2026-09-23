import { sectionPad, sheet, wrap } from "./styles";

export default function HomeThesis() {
  return (
    <section aria-labelledby="thesis-h" className={`${sheet} ${sectionPad} bg-zoe-oat`}>
      <div className={wrap}>
        <div className="grid items-start gap-[clamp(32px,5vw,72px)] min-[901px]:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2
              id="thesis-h"
              className="text-[clamp(44px,7.4vw,96px)] font-extrabold leading-[0.93] tracking-[-0.05em] text-zoe-ink"
            >
              AI that helps you walk with Jesus more consistently.
            </h2>
            <p className="mt-[26px] text-[clamp(18px,1.8vw,21px)] font-medium text-zoe-muted">
              Wait… can that be done? Should it? And how?
            </p>
            <div className="mt-[34px] flex items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/faq/tony-signature.svg"
                alt="Tony's signature"
                width={86}
                height={40}
                loading="lazy"
                className="h-auto w-[86px]"
              />
              <p className="text-[13.5px] leading-[1.4] text-zoe-muted">
                <strong className="block font-bold text-zoe-ink">Tony Allen</strong>
                Pastor, building Zoe in public
              </p>
            </div>
          </div>

          <article className="rounded-[28px] bg-white p-[clamp(26px,3.4vw,42px)] shadow-[0_18px_50px_rgba(45,50,49,0.05)] outline outline-1 outline-zoe-outline/45">
            <p className="font-serif text-[clamp(28px,3vw,36px)] italic leading-[1.1] text-zoe-sap">The tension</p>
            <hr className="my-[22px] h-px border-0 bg-zoe-outline/60" />
            <div className="grid gap-[18px] text-[17px] font-medium leading-[1.7] text-zoe-muted">
              <p>AI is here whether we like it or not, and the church needs to figure out what we&apos;re going to do about it.</p>
              <p>
                We think there are better and worse ways to bring AI into the spiritual life. That&apos;s why we&apos;re building in
                public, talking about it in public, and inviting you into the conversation (and the beta!).
              </p>
              <p>
                We&apos;re really not interested in AI that tries to replace pastors (we are pastors, so that would be silly), fill
                the role of the Holy Spirit, or offer fake spiritual certainty.
              </p>
              <p>
                But we are very interested in how AI could help people&apos;s attention turn to Christ more often. We already know AI
                can make a decent morning devotional. What we need is{" "}
                <span className="font-extrabold text-zoe-sap">day-long devotion.</span>
              </p>
              <p>
                <b className="font-extrabold text-zoe-ink">Can it help with that?</b>
              </p>
            </div>
            <p className="mt-6 font-serif text-[clamp(34px,3.6vw,46px)] italic leading-none text-zoe-sap">Meet Zoe.</p>
          </article>
        </div>

        <div className="mt-[clamp(64px,8vw,104px)] flex flex-col items-center gap-2.5 text-center">
          <h2 className="text-[clamp(26px,3vw,36px)] font-extrabold tracking-[-0.035em] text-zoe-ink">
            Here&apos;s one ordinary day with Zoe.
          </h2>
          <p className="font-medium text-zoe-muted">Keep scrolling. Watch the texts arrive.</p>
          <svg
            width="26"
            height="40"
            viewBox="0 0 26 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="home-bob text-zoe-sap"
          >
            <path d="M13 3c-1 10 1 20 0 32M4 26c3 4 6 7 9 10 3-3 6-6 9-10" />
          </svg>
        </div>
      </div>
    </section>
  );
}
