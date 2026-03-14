import Image from "next/image";
import type { Metadata } from "next";
import SubscribeExperience from "../../components/SubscribeExperience";
import ZoeSVG from "../../components/ZoeSVG";
import { normalizeSubscribeFlowMode } from "../../lib/subscribe";

export const metadata: Metadata = {
  title: "Continue with Zoe",
  description:
    "A calm, focused checkout to keep your Zoe thread going.",
};

type SubscribePageProps = {
  searchParams?: {
    phone?: string | string[];
    canceled?: string | string[];
    plan?: string | string[];
    mode?: string | string[];
  };
};

export default function SubscribePage({ searchParams }: SubscribePageProps) {
  const initialPhone = Array.isArray(searchParams?.phone)
    ? searchParams?.phone[0]
    : searchParams?.phone ?? "";
  const canceled = Array.isArray(searchParams?.canceled)
    ? searchParams?.canceled[0] === "1"
    : searchParams?.canceled === "1";
  const initialPlan = Array.isArray(searchParams?.plan)
    ? searchParams?.plan[0]
    : searchParams?.plan ?? "month";
  const initialMode = normalizeSubscribeFlowMode(
    Array.isArray(searchParams?.mode)
      ? searchParams?.mode[0]
      : searchParams?.mode
  );
  const heading = initialMode === "reactivate" ? "Welcome back." : "Keep walking.";
  const subheading =
    initialMode === "reactivate"
      ? "Pick up right where you left off."
      : "$7/month. Cancel anytime.";

  return (
    <main className="relative h-[100svh] overflow-hidden bg-[#f5f4f0] text-[#1c2433] sm:min-h-screen sm:h-auto">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[54svh] sm:h-[60vh]">
          <Image
            src="/images/generated/subscribe-hero-phone-off.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,16,20,0.34)_0%,rgba(12,16,20,0.08)_28%,rgba(245,244,240,0.2)_58%,#f5f4f0_100%)]" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/18 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,244,240,0)_0%,rgba(245,244,240,0)_52%,#f5f4f0_100%)]" />
        <div className="absolute bottom-[-10rem] left-[-5rem] h-[16rem] w-[16rem] rounded-full bg-[#e7ddd0] blur-[95px]" />
      </div>

      <section className="relative z-10 flex h-full flex-col overflow-hidden px-5 pb-0 pt-5 sm:min-h-screen sm:px-6">
        <div className="mx-auto flex h-full w-full max-w-md flex-1 flex-col">
          <div className="flex flex-[0_0_44svh] flex-col items-center text-center sm:min-h-[56vh] sm:flex-auto">
            <div className="w-full pt-2">
              <div className="mx-auto w-[8.8rem] max-w-[38vw] drop-shadow-[0_10px_18px_rgba(0,0,0,0.18)] sm:w-[9.5rem]">
                <ZoeSVG variant="default" color="#fff8ef" fast={true} />
              </div>
            </div>

            <div className="mt-auto max-w-xs pb-7 sm:max-w-sm sm:pb-14">
              <h1 className="text-balance text-[3.3rem] font-semibold leading-[0.9] tracking-[-0.07em] text-[#fff8ef] drop-shadow-[0_12px_30px_rgba(15,23,42,0.28)] [font-family:var(--font-serif)] sm:text-[4.4rem]">
                {heading}
              </h1>
              <p className="mx-auto mt-3 max-w-[18rem] text-sm font-medium leading-6 text-[#fff8ef]/86 drop-shadow-[0_8px_24px_rgba(15,23,42,0.22)] sm:mt-4 sm:text-[15px]">
                {subheading}
              </p>
            </div>
          </div>

          <div className="relative left-1/2 z-10 -mt-4 w-screen max-w-[32rem] -translate-x-1/2 sm:mt-0">
            <SubscribeExperience
              initialPhone={initialPhone}
              initialPlan={initialPlan}
              initialMode={initialMode}
              canceled={canceled}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
