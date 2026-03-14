import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import {
  formatUsPhoneDisplay,
  normalizeSubscribeFlowMode,
} from "../../lib/subscribe";

export const metadata: Metadata = {
  title: "You're Set",
  description:
    "Your Zoe subscription is active. Keep the conversation going in the same text thread you already use.",
};

type ThanksPageProps = {
  searchParams?: {
    phone?: string | string[];
    mode?: string | string[];
  };
};

export default function ThanksPage({ searchParams }: ThanksPageProps) {
  const rawPhone = Array.isArray(searchParams?.phone)
    ? searchParams?.phone[0]
    : searchParams?.phone;
  const mode = normalizeSubscribeFlowMode(
    Array.isArray(searchParams?.mode)
      ? searchParams?.mode[0]
      : searchParams?.mode
  );
  const displayPhone = formatUsPhoneDisplay(rawPhone);
  const eyebrow = mode === "reactivate" ? "Welcome Back" : "Subscription Active";
  const headline =
    mode === "reactivate"
      ? "You're back in. Zoe can keep walking with you."
      : "You're set. Zoe can keep walking with you.";
  const summary = displayPhone
    ? mode === "reactivate"
      ? `Your subscription is active again for ${displayPhone}.`
      : `Your subscription is now tied to ${displayPhone}.`
    : "Your subscription is active.";

  return (
    <main className="min-h-screen bg-[#f6f1e7] text-slate-900">
      <section className="relative overflow-hidden px-6 pb-24 pt-28 md:px-8 md:pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8f3ea_0%,#f6f1e7_48%,#f1e7d6_100%)]" />
          <div className="absolute left-[10%] top-[5%] h-[18rem] w-[18rem] rounded-full bg-brand-jade/10 blur-[110px]" />
          <div className="absolute right-[8%] top-[18%] h-[18rem] w-[18rem] rounded-full bg-gold-300/18 blur-[110px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="rounded-[2.4rem] border border-white/70 bg-white/75 p-8 shadow-[0_30px_90px_rgba(28,32,40,0.08)] backdrop-blur md:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-brand-jade">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-[11ch] text-[3.2rem] font-bold leading-[0.92] tracking-[-0.06em] text-slate-900 md:text-[5rem] [font-family:var(--font-serif)]">
              {headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
              {summary} Keep replying in your existing Zoe text thread and the conversation will continue at your normal rhythm.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  01
                </p>
                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  Keep texting in the same thread
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  No new inbox, no new password, no app install. Just pick up where you left off.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  02
                </p>
                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  Text <span className="rounded bg-slate-900 px-2 py-1 text-white">START</span> if you had stopped messages
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  That reopens the carrier-level SMS thread if you had previously muted it with STOP.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-slate-200 bg-white/85 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  03
                </p>
                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  Give the webhook a moment
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                  Activation is usually fast, but if you text immediately after paying, give it a minute and try again.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-base font-bold text-white transition hover:bg-slate-800"
              >
                Back to Zoe.live
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                See what continues
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
