import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import {
  formatUsPhoneDisplay,
  normalizeSubscribeFlowMode,
} from "../../lib/subscribe";
import { NOINDEX_ROBOTS } from "../../lib/seo";

export const metadata: Metadata = {
  title: "You're Set",
  description:
    "Your Zoe subscription is active. Keep the conversation going in the same text thread you already use.",
  robots: NOINDEX_ROBOTS,
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
  const headline =
    mode === "reactivate"
      ? "You're back. Pick up right where you left off."
      : "You're set. Your rhythm keeps going.";
  const summary = displayPhone
    ? mode === "reactivate"
      ? `Your subscription is active again for ${displayPhone}.`
      : `Your subscription is now tied to ${displayPhone}.`
    : "Your subscription is active.";

  return (
    <main className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="px-5 pb-24 pt-28 sm:px-6 md:px-8 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2.25rem] bg-white p-7 shadow-zoe-card ring-1 ring-zoe-outline/40 sm:p-10 md:p-12">
            <h1 className="max-w-[14ch] text-[2.75rem] font-bold leading-[1] tracking-[-0.05em] text-zoe-ink sm:text-[3.5rem] md:text-[4.25rem]">
              {headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-zoe-muted">
              {summary} Keep replying in your existing Zoe text thread, and your texts will keep coming at the rhythm
              you&apos;ve set.
            </p>

            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              <li className="rounded-[1.5rem] bg-zoe-surface p-6">
                <p className="text-sm font-bold text-zoe-forest">1</p>
                <h2 className="mt-2 text-lg font-bold leading-snug text-zoe-ink">Keep texting in the same thread</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">
                  No new inbox, no password, no app. Just pick up where you left off.
                </p>
              </li>
              <li className="rounded-[1.5rem] bg-zoe-surface p-6">
                <p className="text-sm font-bold text-zoe-forest">2</p>
                <h2 className="mt-2 text-lg font-bold leading-snug text-zoe-ink">
                  Text <span className="rounded-md bg-zoe-ink px-2 py-0.5 text-white">START</span> if you had stopped messages
                </h2>
                <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">
                  If you texted STOP at some point, START turns messages back on with your carrier.
                </p>
              </li>
              <li className="rounded-[1.5rem] bg-zoe-surface p-6">
                <p className="text-sm font-bold text-zoe-forest">3</p>
                <h2 className="mt-2 text-lg font-bold leading-snug text-zoe-ink">Give it a minute</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-zoe-muted">
                  Activation is usually quick. If you text right after paying and nothing happens, wait a minute and try again.
                </p>
              </li>
            </ol>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-zoe-leaf px-7 py-4 text-base font-bold text-white transition hover:brightness-105"
              >
                Back to zoe.live
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-bold text-zoe-ink ring-1 ring-zoe-outline/50 transition hover:bg-zoe-surface"
              >
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
