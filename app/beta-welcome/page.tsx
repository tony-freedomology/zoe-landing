import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Zoe Beta Welcome",
  description: "A short welcome for Zoe July beta testers before starting the text experience.",
};

type BetaWelcomePageProps = {
  searchParams?: {
    survey?: string;
  };
};

export default function BetaWelcomePage({ searchParams }: BetaWelcomePageProps) {
  const surveyUrl = normalizeExternalUrl(searchParams?.survey);

  return (
    <main className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-28 md:px-8 lg:px-10">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.72fr)]">
          <div className="max-w-4xl">
            <p className="mb-8 max-w-lg text-sm font-extrabold uppercase tracking-[0.18em] text-zoe-forest">
              Zoe July beta
            </p>
            <h1 className="max-w-4xl text-[clamp(4.25rem,11vw,10rem)] font-black leading-[0.86] tracking-[-0.07em] text-zoe-ink">
              Welcome to Zoe.
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-semibold leading-8 text-zoe-muted md:text-2xl md:leading-9">
              Thanks for helping us test something early. Use Zoe like a normal part of your actual life, then tell us where it helps, where it feels off, and what you wish it did.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://app.zoe.live/text"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-zoe-sap px-7 text-base font-extrabold text-white shadow-[0_18px_40px_rgba(29,194,134,0.22)] transition hover:brightness-105 active:scale-95"
              >
                Start texting Zoe
                <ArrowRight className="h-5 w-5" />
              </a>
              {surveyUrl ? (
                <a
                  href={surveyUrl}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-base font-extrabold text-zoe-ink shadow-[inset_0_0_0_1px_rgba(187,202,193,0.55)] transition hover:bg-zoe-surface active:scale-95"
                >
                  Take the 2-minute baseline
                </a>
              ) : null}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-zoe-surface p-4 shadow-zoe-card md:p-5">
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
              <InfoRow icon={<MessageCircle className="h-5 w-5" />} title="Zoe lives in your texts" body="No app to manage. The start page opens the right channel for your phone." />
              <InfoRow icon={<ShieldCheck className="h-5 w-5" />} title="July is free" body="This beta is for learning what actually helps before we make bigger product decisions." />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-zoe-surface px-5 py-20 md:px-8">
        <div className={`mx-auto grid max-w-7xl gap-5 ${surveyUrl ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          <Step title="1. Watch the welcome" body="You will hear what Zoe is, what it is not, and what kind of feedback is most useful." />
          {surveyUrl ? (
            <Step title="2. Take the baseline" body="Two minutes before you start gives us something concrete to compare against later." />
          ) : null}
          <Step title={surveyUrl ? "3. Text Zoe naturally" : "2. Text Zoe naturally"} body="Use it in ordinary life. Scripture, prayer, reflection, reminders, confusion, feedback, all of it." />
        </div>
      </section>

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
