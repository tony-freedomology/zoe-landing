import Link from "next/link";
import { mainFaqs } from "../../lib/mainFaqs";
import { homeCostFaqAnswer } from "../../lib/pricingCopy";
import { sectionPad, sheet, wrap } from "./styles";

// The seven questions people ask first. Answers come verbatim from lib/mainFaqs.ts
// (shared with /faq), except the cost answer, which carries the homepage pricing
// update from lib/pricingCopy.ts.
const HOME_FAQ_QUESTIONS = [
  "Who (or what) is Zoe?",
  "Are you trying to replace the Holy Spirit?",
  "Is Zoe conscious?",
  "What kind of messages will I get?",
  "Do humans at Zoe read my messages?",
  "How much does Zoe cost?",
  "Can my church use Zoe?",
];

const ANSWER_OVERRIDES: Record<string, string> = {
  "How much does Zoe cost?": homeCostFaqAnswer,
};

const homeFaqs = HOME_FAQ_QUESTIONS.map((question) => {
  const faq = mainFaqs.find((f) => f.question === question);
  if (!faq) throw new Error(`Home FAQ question missing from lib/mainFaqs.ts: ${question}`);
  return { ...faq, answer: ANSWER_OVERRIDES[question] ?? faq.answer };
});

export default function HomeFaq() {
  return (
    <section id="faq" aria-labelledby="faq-h" className={`${sheet} ${sectionPad} home-faq bg-zoe-oat`}>
      <div className={wrap}>
        <div className="grid gap-[18px] rounded-[36px] bg-white/70 p-3.5 shadow-[0_28px_90px_rgba(45,50,49,0.07)] outline outline-1 outline-zoe-outline/35 min-[901px]:grid-cols-[0.78fr_1.22fr]">
          <aside className="relative overflow-hidden rounded-[26px] bg-[#fffdf8] bg-[url('/assets/home/paper.webp')] bg-cover bg-center p-[clamp(28px,4vw,44px)] shadow-[inset_0_0_0_1px_rgba(187,202,193,0.34)] min-h-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/home/botanical.webp"
              alt=""
              width={700}
              height={700}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -bottom-[70px] -right-[90px] w-[340px] max-w-none rotate-[-8deg] opacity-[0.42]"
            />
            <h2
              id="faq-h"
              className="relative max-w-[10ch] text-[clamp(38px,4.4vw,60px)] font-extrabold leading-[0.96] tracking-[-0.055em] text-zoe-ink"
            >
              Good questions are welcome here<span className="text-zoe-sap">.</span>
            </h2>
            <div className="relative mt-[26px] grid max-w-[34ch] gap-3.5 font-semibold text-zoe-ink/80">
              <p>You&apos;ve got questions. We get it. We&apos;d be worried if you didn&apos;t have any.</p>
              <p>
                Zoe is still early. You won&apos;t get perfection. You should get care, restraint, and a team that takes beta
                feedback seriously.
              </p>
              <p>Thanks for being here.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/faq/tony-signature.svg"
              alt="Tony"
              width={96}
              height={44}
              loading="lazy"
              className="relative mt-[22px] h-auto w-24"
            />
            <small className="relative block text-xs font-semibold tracking-[0.06em] text-zoe-ink/55">building Zoe</small>
          </aside>

          <div className="grid content-start gap-2.5 rounded-[26px] bg-[#fffefa] p-[clamp(12px,2vw,24px)] shadow-[inset_0_0_0_1px_rgba(187,202,193,0.26)]">
            {homeFaqs.map((faq, i) => (
              <details
                key={faq.question}
                open={i === 0}
                className="rounded-2xl bg-white shadow-[0_8px_24px_rgba(45,50,49,0.06)] outline outline-1 outline-zoe-outline/35"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[10px_1fr_20px] items-center gap-3.5 px-5 py-[17px] text-[16.5px] font-extrabold tracking-[-0.01em] text-zoe-ink before:h-2.5 before:w-2.5 before:rounded-full before:bg-zoe-sap before:content-['']">
                  {faq.question}
                </summary>
                <div className="grid max-w-[64ch] gap-3 pb-5 pl-11 pr-[22px] font-medium leading-[1.7] text-zoe-ink/80">
                  {faq.answer.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 px-2 pb-1 pt-3.5">
              <div className="flex items-center gap-3 text-[13.5px] font-bold leading-[1.35] text-zoe-ink">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none text-zoe-sap">
                  <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p>
                  You&apos;re in control.
                  <span className="block font-semibold text-zoe-muted">Text STOP anytime. No hard feelings.</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-[13.5px] font-bold leading-[1.35] text-zoe-ink">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none text-zoe-sap">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
                </svg>
                <p>
                  Feedback gets read.
                  <span className="block font-semibold text-zoe-muted">I read beta feedback.</span>
                </p>
              </div>
              <Link href="/faq" className="text-sm font-extrabold text-zoe-forest no-underline hover:underline">
                See all {mainFaqs.length} questions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
