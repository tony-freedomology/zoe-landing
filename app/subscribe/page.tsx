import type { Metadata } from "next";
import Footer from "../../components/Footer";
import SubscribeExperience from "../../components/SubscribeExperience";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Keep the same Zoe thread, memory, and rhythm going with a calm, simple subscribe flow.",
};

type SubscribePageProps = {
  searchParams?: {
    phone?: string | string[];
    canceled?: string | string[];
  };
};

export default function SubscribePage({ searchParams }: SubscribePageProps) {
  const initialPhone = Array.isArray(searchParams?.phone)
    ? searchParams?.phone[0]
    : searchParams?.phone ?? "";
  const canceled = Array.isArray(searchParams?.canceled)
    ? searchParams?.canceled[0] === "1"
    : searchParams?.canceled === "1";

  return (
    <main className="overflow-hidden bg-[#f6efe4] text-slate-900">
      <section className="relative px-6 pb-20 pt-28 md:px-8 md:pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3e8d8_0%,#f8f4ec_42%,#f6efe4_100%)]" />
          <div className="absolute left-[-6rem] top-[-4rem] h-[20rem] w-[20rem] rounded-full bg-brand-jade/10 blur-[120px]" />
          <div className="absolute right-[-7rem] top-[7rem] h-[18rem] w-[18rem] rounded-full bg-brand-cyan/10 blur-[120px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(15,122,115,0.35),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-brand-jade">
              Continue Your Rhythm
            </p>
            <h1 className="mt-5 text-[3.2rem] font-bold leading-[0.9] tracking-[-0.065em] text-slate-900 md:text-[5rem] [font-family:var(--font-serif)]">
              Let's keep the conversation going.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-8 text-slate-600 md:text-lg">
              Your free week is wrapping up. Confirm your number and keep the same Zoe thread going.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {["same thread", "same number", "cancel anytime"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <SubscribeExperience initialPhone={initialPhone} canceled={canceled} />
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/75 bg-white/65 p-4 shadow-[0_18px_50px_rgba(25,33,44,0.05)] backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cyan">
              Same Thread
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex justify-start">
                <div className="max-w-[17rem] rounded-[18px] rounded-tl-[8px] bg-[#fffdfa] px-4 py-3 text-slate-800 shadow-[0_16px_30px_rgba(25,33,44,0.05)]">
                  <p className="text-sm leading-6">
                    good morning. what are you carrying into today?
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    zoe - 7:02 am
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[15rem] rounded-[18px] rounded-tr-[8px] bg-[#1b8f7d] px-4 py-3 text-white shadow-[0_18px_30px_rgba(27,143,125,0.18)]">
                  <p className="text-sm leading-6">
                    no reset. just keep going.
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-white/65">
                    you - now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
