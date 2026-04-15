"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareMore, SendHorizonal } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import type { LessonComment } from "../lib/journeyLessonMock";

type Variant = "warm" | "field";

type JourneyLessonCommentsProps = {
  initialComments: LessonComment[];
  storageKey: string;
  variant: Variant;
};

type StoredComment = {
  id: string;
  name: string;
  location: string;
  text: string;
  postedAt: string;
  isLocal?: boolean;
};

const motionTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

function formatInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function JourneyLessonComments({
  initialComments,
  storageKey,
  variant,
}: JourneyLessonCommentsProps) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<StoredComment[]>(initialComments);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as StoredComment[];
      if (!Array.isArray(parsed)) return;
      setComments([...parsed, ...initialComments]);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, [initialComments, storageKey]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextText = draft.trim();
    if (nextText.length < 12) {
      setError("Write at least a sentence so the reflection has some shape.");
      return;
    }

    const localComment: StoredComment = {
      id: `${storageKey}-${Date.now()}`,
      name: "You",
      location: "Saved on this device",
      text: nextText,
      postedAt: "Just now",
      isLocal: true,
    };

    setDraft("");
    setError(null);

    startTransition(() => {
      setComments((current) => {
        const savedLocal = current.filter((comment) => comment.isLocal);
        const nextLocal = [localComment, ...savedLocal];
        window.localStorage.setItem(storageKey, JSON.stringify(nextLocal));
        return [localComment, ...current];
      });
    });
  }

  if (variant === "field") {
    return (
      <section className="space-y-6">
        <div className="relative rounded-[2rem] border border-[#e5e7eb] bg-white px-5 pb-6 pt-5 shadow-[0_18px_45px_rgba(15,31,26,0.08)]">
          <div className="absolute left-8 top-0 h-8 w-20 -translate-y-1/2 rotate-[-4deg] rounded-sm bg-[rgba(255,255,255,0.72)] shadow-[0_6px_18px_rgba(15,31,26,0.08)]" />
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(29,194,134,0.12)] text-[#1dc286]">
              <MessageSquareMore className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b7280]">
                Community Notes
              </p>
              <h2 className="mt-1 text-[1.65rem] font-medium tracking-[-0.05em] text-[#1f2937] font-sans">
                Add your field note
              </h2>
            </div>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="What is surfacing for you today?"
              className="min-h-[136px] w-full rounded-[1.5rem] border border-[#e5e7eb] bg-[#fafcfb] px-4 py-4 text-[15px] leading-7 text-[#1f2937] outline-none transition focus:border-[rgba(29,194,134,0.4)] focus:ring-4 focus:ring-[rgba(29,194,134,0.12)]"
            />
            {error ? (
              <p className="rounded-2xl border border-[rgba(217,119,6,0.18)] bg-[rgba(217,119,6,0.08)] px-4 py-3 text-sm text-[#946517]">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1dc286] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(29,194,134,0.18)] transition hover:bg-[#1ab36f]"
            >
              Post Reflection
              <SendHorizonal className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-[#6b7280]">
              Prototype only. Reflections persist locally in this browser.
            </p>
          </form>
        </div>

        <div className="space-y-5">
          <AnimatePresence initial={false}>
            {comments.map((comment, index) => (
              <motion.article
                key={comment.id}
                layout
                initial={{ opacity: 0, y: 18, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                exit={{ opacity: 0, y: -12 }}
                transition={motionTransition}
                className="relative rounded-[1.9rem] border border-[#e5e7eb] bg-white px-5 py-5 shadow-[0_14px_34px_rgba(15,31,26,0.07)]"
              >
                <div className="absolute right-6 top-0 h-7 w-16 -translate-y-1/2 rotate-[6deg] rounded-sm bg-[rgba(255,255,255,0.72)] shadow-[0_4px_14px_rgba(15,31,26,0.08)]" />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[1.35rem] bg-[rgba(29,194,134,0.12)] text-sm font-semibold text-[#1dc286]">
                    {formatInitials(comment.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-base font-semibold text-[#1f2937]">
                        {comment.name}
                      </p>
                      <span className="text-[11px] uppercase tracking-[0.24em] text-[#6b7280]">
                        {comment.postedAt}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#d97706]">
                      {comment.location}
                    </p>
                    <p className="mt-3 text-[15px] leading-7 text-[#374151]">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="rounded-[2rem] border border-white/70 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(28,36,51,0.08)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[1.2rem] bg-[rgba(29,194,134,0.1)] text-[#1dc286]">
            <MessageSquareMore className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1c2433]/42">
              Reflection and Comments
            </p>
            <h2 className="mt-1 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#1c2433] font-sans">
              What is this stirring in you?
            </h2>
          </div>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Share what stood out, what felt difficult, or what you want to carry into today."
            className="min-h-[136px] w-full rounded-[1.5rem] border border-[#1c2433]/10 bg-[#fbfaf7] px-4 py-4 text-[15px] leading-7 text-[#1c2433] outline-none transition focus:border-[#1dc286] focus:bg-white focus:ring-4 focus:ring-[rgba(29,194,134,0.1)]"
          />
          {error ? (
            <p className="rounded-[1.3rem] bg-[#f7ebed] px-4 py-3 text-sm text-[#8f3441]">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1dc286] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(29,194,134,0.24)] transition hover:bg-[#1ab36f]"
          >
            Post Reflection
            <SendHorizonal className="h-4 w-4" />
          </button>
          <p className="text-center text-xs text-[#1c2433]/48">
            Prototype only. Reflections persist locally in this browser.
          </p>
        </form>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.article
              key={comment.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={motionTransition}
              className="rounded-[1.8rem] border border-white/70 bg-white px-5 py-5 shadow-[0_16px_42px_rgba(28,36,51,0.06)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[1.15rem] bg-[#f5f4f0] text-sm font-semibold text-[#1c2433]">
                  {formatInitials(comment.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-base font-semibold text-[#1c2433]">
                      {comment.name}
                    </p>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#1c2433]/36">
                      {comment.postedAt}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[#1dc286]">
                    {comment.location}
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-[#1c2433]/76">
                    {comment.text}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
