import AboutZoeLifeWord from "../AboutZoeLifeWord";
import { sectionPad, sheet, wrap } from "../home/styles";

// Tony's letter. The words are his; do not edit them. Only the salutation and
// signature block were added in the September 2026 redesign.
const bioBeforeQuote = [
  "I bet you have questions. I do too.",
  "The big one I'm asking is how can (and should) technology be used to help experience the life of God more fully. Is technology ALWAYS a barrier? Does it have to be?",
  "For the last 15 years, I've been a pastor, and the thing I keep hearing is that people feel scattered. Like everything is competing for our attention. We're addicted to our phones, scrolling endlessly, looking for... what exactly?",
];

const bioAfterLifeParagraph = [
  "So I wondered: could we build a tool that met people where they already were? Not one more app or content stream, but something that reminds us of that invitation? Of where real life is to be found?",
];

const bioAfterQuote = [
  "It seems worth trying, so that's what we're doing.",
  "I'm still a pastor at my local church, and I have no desire to build something that pulls people further into technology and away from human connection. Zoe is an experiment in doing just the opposite.",
  "I'm glad you're here. I welcome your questions, thoughts, critiques, and suggestions. We are all one body, and we need to help our world turn its eyes to Christ.",
];

export default function AboutLetter() {
  return (
    <section id="letter" aria-label="A letter from Tony" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-surface`}>
      <div className={wrap}>
        <article className="relative mx-auto max-w-[720px] overflow-hidden rounded-[28px] bg-[#fffdf8] bg-[url('/assets/home/paper.webp')] bg-cover bg-center px-[clamp(22px,6vw,76px)] pb-[clamp(32px,6vw,64px)] pt-[clamp(28px,6vw,72px)] shadow-[0_30px_80px_rgba(45,50,49,0.08),inset_0_0_0_1px_rgba(187,202,193,0.34)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/home/botanical.webp"
            alt=""
            aria-hidden="true"
            width={700}
            height={700}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -bottom-[60px] -right-[70px] w-[300px] max-w-none rotate-[-8deg] opacity-[0.36]"
          />
          <p className="relative font-serif text-[clamp(28px,3vw,36px)] italic leading-[1.1] text-zoe-forest">Dear friend,</p>

          <div className="relative mt-[26px] grid gap-[22px] text-[clamp(17.5px,1.4vw,19.5px)] font-medium leading-[1.8] text-zoe-ink/[0.86]">
            {bioBeforeQuote.map((paragraph, i) => (
              <p
                key={paragraph}
                className={i === 0 ? "text-[clamp(20px,1.8vw,23px)] font-bold leading-[1.5] text-zoe-ink" : undefined}
              >
                {paragraph}
              </p>
            ))}
            <AboutZoeLifeWord />
            {bioAfterLifeParagraph.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <blockquote className="relative -mx-2 my-[18px] rounded-[22px] bg-white px-7 py-[26px] shadow-[0_14px_34px_rgba(45,50,49,0.07)]">
              <p className="text-[clamp(24px,2.6vw,32px)] font-extrabold leading-[1.22] tracking-[-0.03em] text-zoe-ink">
                Could our phones actually turn our attention back to Jesus?{" "}
                <span className="text-zoe-sap">Proactively?</span>
              </p>
            </blockquote>

            {bioAfterQuote.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="relative mt-9 flex items-center gap-[18px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/faq/tony-signature.svg" alt="Tony" width={130} height={60} loading="lazy" className="h-auto w-[130px]" />
            <p className="text-sm leading-[1.45] text-zoe-muted">
              <strong className="block text-[15px] text-zoe-ink">Tony Allen</strong>
              Pastor, and building Zoe
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
