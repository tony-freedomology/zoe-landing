import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle, ShieldCheck, UserRound } from "lucide-react";

import Footer from "../../components/Footer";
import {
  buildTextStartHref,
  ZOE_CONTACT_CARD_HREF,
  ZOE_TEXT_SUPPORT_LINE,
} from "./text-start";

export const metadata: Metadata = {
  title: "Zoe Beta Welcome",
  description: "A short welcome for Zoe beta testers before starting the text experience.",
};

type BetaWelcomePageProps = {
  searchParams?: {
    survey?: string;
  };
};

export default function BetaWelcomePage({ searchParams }: BetaWelcomePageProps) {
  const surveyUrl = normalizeExternalUrl(searchParams?.survey);
  const textZoeHref = buildTextStartHref();

  return (
    <main className="min-h-screen bg-zoe-oat pb-[calc(6rem+env(safe-area-inset-bottom))] text-zoe-ink lg:pb-0">
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/images/text/zoe-text-path-bg.png')] bg-cover bg-center"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-zoe-oat/72" />

        <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-start gap-8 px-5 pb-16 pt-20 md:px-8 md:pt-28 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.72fr)] lg:items-center lg:px-10">
          <aside className="rounded-[2rem] bg-zoe-surface p-4 shadow-zoe-card md:p-5 lg:order-2">
            <div className="overflow-hidden rounded-[1.6rem] bg-zoe-ink">
              <video
                className="aspect-video h-full w-full bg-zoe-ink object-cover"
                controls
                playsInline
                preload="metadata"
                poster="/videos/beta/zoe-beta-welcome-poster.jpg"
              >
                <source src="/videos/beta/zoe-beta-welcome.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="px-1 pb-1 pt-5">
              <div className="rounded-full bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-zoe-forest shadow-[inset_0_0_0_1px_rgba(187,202,193,0.55)]">
                From Tony
              </div>
              <p className="mt-5 text-[clamp(2.15rem,4vw,3.5rem)] font-black leading-[0.92] tracking-[-0.055em] text-zoe-ink">
                Watch this first.
              </p>
              <p className="mt-4 text-base font-semibold leading-7 text-zoe-muted">
                A short hello, what we are testing, and how to help us learn without making this weird.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <InfoRow icon={<MessageCircle className="h-5 w-5" />} title="Zoe lives in your texts" body="No app to manage. This page opens the right thread with a message ready to send." />
              <InfoRow icon={<ShieldCheck className="h-5 w-5" />} title="July is free" body="This beta is for learning what actually helps before we make bigger product decisions." />
              <a
                href={ZOE_CONTACT_CARD_HREF}
                className="flex min-h-14 items-center justify-between gap-3 rounded-[1.5rem] bg-white px-4 py-3 text-sm font-extrabold text-zoe-ink shadow-[0_16px_40px_rgba(45,50,49,0.035)] transition hover:bg-zoe-oat active:scale-[0.99]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF7F1] text-zoe-forest">
                    <UserRound className="h-5 w-5" aria-hidden="true" />
                  </span>
                  Save Zoe as a contact
                </span>
                <ArrowRight className="h-5 w-5 text-zoe-muted" aria-hidden="true" />
              </a>
            </div>
          </aside>

          <div className="relative max-w-4xl overflow-hidden rounded-[2.35rem] bg-[#F7EEDF] p-7 shadow-[0_24px_70px_rgba(45,50,49,0.12)] ring-1 ring-white/70 md:p-10 lg:order-1 xl:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[url('/images/beta/beta-welcome-journey-card.jpg')] bg-cover bg-center"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[#FCF9F4]/20" />

            <div className="relative max-w-3xl">
              <h1 className="max-w-4xl text-[clamp(3.35rem,10.5vw,8.4rem)] font-black leading-[0.88] tracking-[-0.055em] text-zoe-ink">
                Welcome to Zoe.
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-bold leading-8 text-[#565B58] md:mt-8 md:text-2xl md:leading-9">
                Thanks for helping us test something early. Use Zoe like a normal part of your actual life, then tell us where it helps, where it feels off, and what you wish it did.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={textZoeHref}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-zoe-sap px-7 text-base font-extrabold text-white shadow-[0_18px_40px_rgba(29,194,134,0.22)] transition hover:brightness-105 active:scale-95"
                >
                  Text Zoe
                  <ArrowRight className="h-5 w-5" />
                </a>
                {surveyUrl ? (
                  <a
                    href={surveyUrl}
                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-base font-extrabold text-zoe-ink shadow-[inset_0_0_0_1px_rgba(187,202,193,0.55)] transition hover:bg-zoe-surface active:scale-95"
                  >
                    Take the 2-minute intro survey
                  </a>
                ) : null}
              </div>
              <p className="mt-4 max-w-lg rounded-2xl bg-[#FCF9F4]/90 px-4 py-3 text-sm font-bold leading-6 text-[#565B58] shadow-[0_12px_30px_rgba(45,50,49,0.05)]">
                {ZOE_TEXT_SUPPORT_LINE}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-zoe-surface px-5 py-20 md:px-8">
        <div className={`mx-auto grid max-w-7xl gap-5 ${surveyUrl ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          <Step title="1. Watch the welcome" body="You will hear what Zoe is, what it is not, and what kind of feedback is most useful." />
          {surveyUrl ? (
            <Step title="2. Take the intro survey" body="Two minutes before you start gives us something concrete to compare against later." />
          ) : null}
          <Step title={surveyUrl ? "3. Text Zoe naturally" : "2. Text Zoe naturally"} body="Use it in ordinary life. Scripture, prayer, reflection, reminders, confusion, feedback, all of it." />
        </div>
      </section>

      <div className="beta-welcome-sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-zoe-outline/45 bg-zoe-oat/94 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_50px_rgba(45,50,49,0.10)] backdrop-blur lg:hidden">
        <a
          href={textZoeHref}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-zoe-sap px-7 text-base font-extrabold text-white shadow-[0_18px_40px_rgba(29,194,134,0.22)] transition active:scale-[0.98]"
        >
          Text Zoe
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>

      <Footer />
    </main>
  );
}

function InfoRow({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-[1.5rem] bg-white p-4 shadow-[0_16px_40px_rgba(45,50,49,0.035)]">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF7F1] text-zoe-forest">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-extrabold text-zoe-ink">{title}</h2>
        <p className="mt-1 text-sm font-medium leading-6 text-zoe-muted">{body}</p>
      </div>
    </div>
  );
}

function Step({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[2rem] bg-zoe-oat p-7">
      <h2 className="text-xl font-black tracking-[-0.04em] text-zoe-ink">{title}</h2>
      <p className="mt-4 text-base font-medium leading-7 text-zoe-muted">{body}</p>
    </div>
  );
}

function normalizeExternalUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const allowedSurveyHosts = new Set(["zoe.live", "api.zoe.live", "localhost", "127.0.0.1"]);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!allowedSurveyHosts.has(url.hostname)) return null;
    if (!url.pathname.startsWith("/api/marketing/beta-survey")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
