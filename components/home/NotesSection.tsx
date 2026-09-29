import { Caveat } from "next/font/google";
import { BETA_NOTES, MIN_PUBLIC_NOTES } from "../../lib/betaNotes";
import { headingAccent, lede, sectionPad, sheet, wrap } from "./styles";

// Handwriting face for the notes only. Not preloaded so it never competes with
// the hero; the notes sit far below the fold.
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", preload: false });

const PAPERS = ["#FCEFA9", "#D9F1E3", "#F8DDD2", "#DCEAF3", "#FCEFA9", "#EFE2F4", "#D9F1E3", "#F8DDD2", "#FCEFA9"];
const TILTS = [-2.2, 1.6, -0.9, 2.3, -1.5, 1.1, -2.6, 0.8, -1.2];

// Real words from beta members, shared with their permission (see
// lib/betaNotes.ts). Hidden until there are enough notes to make a wall.
export default function NotesSection() {
  const notes = BETA_NOTES;
  if (notes.length < MIN_PUBLIC_NOTES) return null;

  return (
    <section
      id="notes"
      aria-labelledby="notes-h"
      className={`${sheet} ${sectionPad} ${hand.variable} overflow-hidden bg-[#F1ECE3]`}
    >
      <div className={wrap}>
        <div className="max-w-[720px]">
          <h2
            id="notes-h"
            className="text-[clamp(40px,5.6vw,72px)] font-extrabold leading-[0.96] tracking-[-0.048em] text-zoe-ink"
          >
            Notes from <em className={headingAccent}>the beta</em>.
          </h2>
          <p className={`${lede} mt-5 max-w-[46ch]`}>
            A few things people have told us since they started walking with Zoe this summer. Their words, shared with
            their permission.
          </p>
        </div>

        <ul
          className="-mx-[clamp(16px,4vw,40px)] mt-[clamp(36px,5vw,64px)] flex snap-x snap-mandatory list-none gap-5 overflow-x-auto px-[clamp(16px,4vw,40px)] pb-8 pt-4 [scrollbar-width:none] min-[640px]:mx-0 min-[640px]:block min-[640px]:columns-2 min-[640px]:gap-8 min-[640px]:overflow-visible min-[640px]:px-2 min-[640px]:pb-0 min-[1000px]:columns-3 [&::-webkit-scrollbar]:hidden"
          aria-label="Notes from beta members"
        >
          {notes.map((n, i) => (
            <li
              key={n.id}
              className="w-[78vw] max-w-[340px] shrink-0 snap-center pb-2 pt-5 min-[640px]:mb-8 min-[640px]:w-auto min-[640px]:max-w-none min-[640px]:break-inside-avoid"
            >
              <figure
                style={{ backgroundColor: PAPERS[i % PAPERS.length], "--tilt": `${TILTS[i % TILTS.length]}deg` } as React.CSSProperties}
                className="relative m-0 rounded-[3px] rounded-br-[14px] px-[26px] pb-6 pt-8 shadow-[0_1px_2px_rgba(45,50,49,0.08),0_16px_22px_-14px_rgba(45,50,49,0.38)] [transform:rotate(var(--tilt))] motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:[transform:rotate(0deg)_translateY(-4px)]"
              >
                {i % 3 === 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 h-[26px] w-[92px] -translate-x-1/2 rotate-[-3deg] bg-[#E6DDC8] shadow-[0_1px_2px_rgba(45,50,49,0.12)]"
                  />
                )}
                <blockquote className="m-0 font-[family-name:var(--font-hand)] text-[clamp(23px,2.2vw,27px)] font-medium leading-[1.18] text-[#2d3231]">
                  &ldquo;{n.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-[family-name:var(--font-hand)] text-[22px] font-bold text-zoe-forest">
                  ~ {n.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
