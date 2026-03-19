import Image from "next/image";
import { Leaf, NotebookTabs } from "lucide-react";
import JourneyLessonComments from "./JourneyLessonComments";
import type { JourneyLessonData } from "../lib/journeyLessonMock";

type JourneyLessonPageProps = {
  lesson: JourneyLessonData;
  storageKey?: string;
};

export default function JourneyLessonPage({
  lesson,
  storageKey = "journey-lesson-preview",
}: JourneyLessonPageProps) {
  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-[#fafcfb] pb-24 pt-6 text-[#1f2937]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,194,146,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,194,146,0.08),transparent_28%)]" />

      <div className="relative mx-auto max-w-md px-4">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          <div className="rounded-full border border-[#e5e7eb] bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b7280] shadow-[0_10px_28px_rgba(15,31,26,0.06)] backdrop-blur">
            {lesson.scripture}
          </div>
          <div className="rounded-full bg-[#00c292] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_22px_rgba(0,194,146,0.18)]">
            {lesson.readTime}
          </div>
        </div>

        <header className="relative pb-6 pt-3">
          <div className="relative h-[18rem] overflow-hidden rounded-[2.5rem] shadow-[0_24px_70px_rgba(15,31,26,0.18)]">
            <Image
              src={lesson.coverImage}
              alt={lesson.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.10)_0%,rgba(15,23,42,0.05)_28%,rgba(250,252,251,0.10)_55%,rgba(250,252,251,0.94)_100%)]" />
          </div>

          <div className="relative z-10 -mt-7 px-5">
            <div className="rounded-[2.25rem] border border-white/80 bg-[rgba(255,255,255,0.86)] px-6 pb-7 pt-7 shadow-[0_26px_80px_rgba(15,31,26,0.12)] backdrop-blur-xl">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00c292]">
                {lesson.journey}
              </p>
              <h1 className="mt-3 text-center text-[2.6rem] font-medium leading-[0.94] tracking-[-0.07em] text-[#1f2937] [font-family:var(--font-serif)]">
                {lesson.dayLabel}: {lesson.title}
              </h1>
              <p className="mx-auto mt-4 max-w-[18rem] text-center text-base leading-7 text-[#374151]">
                {lesson.summary}
              </p>
            </div>
          </div>
        </header>

        <section className="relative mt-3">
          <div className="absolute -left-1 top-2 h-10 w-10 rounded-full bg-[rgba(0,194,146,0.16)] blur-[2px]" />
          <div className="relative rotate-[-1.4deg] rounded-[2rem] border border-[#e5e7eb] bg-[#fafcfb] px-5 pb-6 pt-6 shadow-[0_16px_38px_rgba(15,31,26,0.06)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1.2rem] bg-[rgba(0,194,146,0.12)] text-[#00c292]">
                <NotebookTabs className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6b7280]">
                  Lesson notes
                </p>
                <p className="mt-1 text-base font-semibold text-[#1f2937]">
                  {lesson.scripture} · {lesson.readTime}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-5 text-[1rem] leading-8 text-[#374151]">
              {lesson.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="relative mt-6 h-28 overflow-hidden rounded-[1.5rem] border border-white/70">
              <Image
                src={lesson.detailImage}
                alt={lesson.detailImageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.32))]" />
            </div>
          </div>
        </section>

        <section className="relative mt-6 pl-4 pt-3">
          <div className="absolute left-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#00c292] text-lg font-semibold text-white shadow-[0_12px_24px_rgba(0,194,146,0.18)]">
            ?
          </div>
          <div className="rotate-[1.4deg] rounded-[2rem] border border-[#e5e7eb] bg-white px-6 pb-6 pt-6 shadow-[0_16px_40px_rgba(15,31,26,0.07)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d97706]">
              Reflection prompts
            </p>
            <h2 className="mt-2 text-[1.9rem] font-medium tracking-[-0.05em] text-[#1f2937] [font-family:var(--font-serif)]">
              Questions for the walk home
            </h2>
            <ul className="mt-5 space-y-4">
              {lesson.prompts.map((prompt) => (
                <li
                  key={prompt}
                  className="rounded-[1.4rem] border border-[rgba(0,194,146,0.12)] bg-[#fafcfb] px-4 py-4 text-[15px] leading-7 text-[#374151]"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(0,194,146,0.12)] text-xs font-semibold text-[#00c292]">
                      +
                    </span>
                    <span>{prompt}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative mt-6 pr-3">
          <div className="rotate-[-1.2deg] rounded-[2rem] border border-[#e5e7eb] bg-[#0f1f1a] px-6 py-6 text-white shadow-[0_18px_42px_rgba(15,31,26,0.16)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[1.2rem] bg-[rgba(255,255,255,0.08)] text-[rgba(0,194,146,0.82)]">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d1d5db]">
                  Closing prayer
                </p>
                <p className="mt-1 text-base font-semibold text-white">
                  A quieter ending
                </p>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-[#d1d5db]">
              {lesson.prayer}
            </p>
          </div>
        </section>

        <div className="mt-8">
          <JourneyLessonComments
            initialComments={lesson.comments}
            storageKey={storageKey}
            variant="field"
          />
        </div>
      </div>
    </main>
  );
}
