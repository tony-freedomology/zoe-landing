import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/*
 * Shared building blocks for the guides and /brand-facts.
 * Oat canvas, Surface layering, Jakarta type, Jade pill CTA. No dark bands,
 * no uppercase pill badges, no gradients.
 */

export const proseClass =
  "space-y-6 text-[1.08rem] font-medium leading-8 text-zoe-muted [&_strong]:font-bold [&_strong]:text-zoe-ink";

export const h2Class =
  "text-[2rem] font-bold leading-[1.1] tracking-[-0.035em] text-zoe-ink sm:text-[2.4rem]";

export const cardClass =
  "rounded-[1.75rem] bg-white p-7 shadow-zoe-card ring-1 ring-zoe-outline/40 sm:p-8";

export function GuideHero({
  backHref = "/guides",
  backLabel = "Guides",
  meta,
  title,
  lead,
}: {
  backHref?: string | null;
  backLabel?: string;
  meta?: string;
  title: ReactNode;
  lead: ReactNode;
}) {
  return (
    <section className="px-5 pb-12 pt-28 sm:px-6 md:pb-16 md:pt-36">
      <div className="mx-auto max-w-3xl">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-bold text-zoe-forest transition-colors hover:text-zoe-ink"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {backLabel}
          </Link>
        ) : null}
        <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.045em] text-zoe-ink sm:text-[3.4rem] md:text-[3.9rem]">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl text-lg font-medium leading-8 text-zoe-muted sm:text-xl sm:leading-9">
          {lead}
        </div>
        {meta ? <p className="mt-6 text-sm font-semibold text-zoe-muted">{meta}</p> : null}
      </div>
    </section>
  );
}

export function ShortAnswer({ children }: { children: ReactNode }) {
  return (
    <section className="px-5 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-zoe-surface p-7 sm:p-9">
        <p className="text-base font-bold text-zoe-forest">The short answer</p>
        <div className="mt-3 space-y-4 text-base font-medium leading-7 text-zoe-muted sm:text-[1.05rem] sm:leading-8 [&_strong]:font-bold [&_strong]:text-zoe-ink">
          {children}
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs, title = "Common questions" }: { faqs: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="bg-zoe-surface px-5 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className={h2Class}>{title}</h2>
        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-[1.5rem] bg-white p-6 ring-1 ring-zoe-outline/35 sm:p-7">
              <h3 className="text-lg font-bold leading-snug tracking-[-0.01em] text-zoe-ink">{item.q}</h3>
              <p className="mt-2 text-base font-medium leading-7 text-zoe-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CloseCta({ title, body }: { title: string; body: string }) {
  return (
    <section className="px-5 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl rounded-[2.25rem] bg-zoe-surface px-6 py-14 text-center sm:px-12 sm:py-16">
        <h2 className="mx-auto max-w-[18ch] text-[2.2rem] font-bold leading-[1.05] tracking-[-0.045em] text-zoe-ink sm:text-[3rem]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg font-medium leading-8 text-zoe-muted">{body}</p>
        <Link
          href="/s"
          className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-zoe-leaf px-8 py-4 text-base font-bold text-white transition hover:brightness-105 active:scale-[0.98]"
        >
          Join the waitlist
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}

/** Simple two-or-more column table on white with a Surface header row. */
export function CompareTable({
  columns,
  rows,
  minWidth = 560,
}: {
  columns: string[];
  rows: string[][];
  minWidth?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-[1.75rem] bg-white shadow-zoe-card ring-1 ring-zoe-outline/40">
      <table className="w-full text-left text-sm" style={{ minWidth }}>
        <thead>
          <tr className="bg-zoe-surface">
            {columns.map((c, i) => (
              <th key={c || i} scope="col" className="px-5 py-4 font-bold text-zoe-ink">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zoe-outline/30">
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={i === 0 ? "px-5 py-4 font-bold text-zoe-ink" : "px-5 py-4 font-medium leading-6 text-zoe-muted"}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
