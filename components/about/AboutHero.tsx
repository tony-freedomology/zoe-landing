import Image from "next/image";
import { btnJade, wrap } from "../home/styles";
import { btnGhost } from "./styles";
import CopyEmail from "./CopyEmail";

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-h1"
      className="bg-zoe-oat pb-[clamp(96px,11vw,140px)] pt-[calc(68px+clamp(32px,6vw,80px))]"
    >
      <div
        className={`${wrap} grid items-center gap-[clamp(32px,5vw,72px)] min-[901px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]`}
      >
        <div className="text-center min-[901px]:text-left">
          <h1
            id="about-h1"
            className="text-[clamp(56px,8.4vw,120px)] font-extrabold leading-[0.9] tracking-[-0.06em] text-zoe-ink"
          >
            Hi, I&apos;m <span className="text-zoe-sap">Tony.</span>
          </h1>
          <p className="mx-auto mt-[22px] max-w-[36ch] text-[clamp(18px,1.7vw,21px)] font-medium leading-[1.55] text-zoe-muted min-[901px]:mx-0">
            I&apos;m building Zoe carefully, in public, because I want to know whether technology can help us turn toward Jesus more often in ordinary life.
          </p>
          <div className="mt-[30px] flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5 min-[901px]:justify-start">
            <a href="#letter" className={btnJade}>
              Read my letter
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a href="#help" className={btnGhost}>
              Ways to help
            </a>
          </div>
          <CopyEmail className="mt-[18px] justify-center min-[901px]:justify-start" />
        </div>

        <figure className="relative order-first mx-auto w-full max-w-[560px] min-[901px]:order-none min-[901px]:max-w-none">
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[32px] bg-[#d9d9d6] shadow-[0_30px_70px_rgba(30,40,35,0.16)]">
            <Image
              src="/assets/founder/tony-founder.webp"
              alt="Tony Allen, pastor and founder of Zoe, smiling outdoors"
              fill
              priority
              sizes="(max-width: 900px) min(560px, 92vw), 540px"
              className="object-cover object-[52%_35%]"
            />
          </div>
          <figcaption className="absolute bottom-[18px] left-[18px] flex items-center gap-2 rounded-full bg-zoe-oat px-4 py-[9px] text-[13px] font-bold text-zoe-ink shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-zoe-sap" />
            Pastor for 15 years · building Zoe
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
