// Shared class strings for the default home page sections.

/** Page gutter + max width used by every home section. */
export const wrap = "mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)]";

/** Stacked "paper sheet" that overlaps the section above it. */
export const sheet =
  "relative z-[6] -mt-10 rounded-t-[36px] shadow-[0_-14px_40px_rgba(45,50,49,0.07)]";

export const sectionPad = "py-[clamp(72px,10vw,128px)]";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold leading-none no-underline transition-[transform,filter,background-color] duration-200";

/** Signature Jade pill CTA. */
export const btnJade = `${btnBase} bg-zoe-sap px-[26px] py-4 text-[15px] text-white shadow-[0_10px_24px_rgba(29,194,134,0.22)] hover:-translate-y-px hover:brightness-105 active:scale-[0.97]`;

/** Quiet text button that sits next to a Jade CTA. */
export const btnQuiet = `${btnBase} group bg-transparent px-2.5 py-3.5 text-[15px] text-zoe-ink`;

/** Big editorial section heading (Journeys, Privacy, Waitlist). */
export const displayHeading =
  "text-[clamp(40px,6vw,76px)] font-extrabold leading-[0.95] tracking-[-0.048em] text-zoe-ink";

/** Supporting paragraph under a section heading. */
export const lede = "text-[clamp(17px,1.5vw,19px)] font-medium leading-[1.55] text-zoe-muted";

/** Newsreader italic accent inside a heading. */
export const headingAccent = "font-serif font-normal italic tracking-[-0.01em] text-zoe-sap";

/** iMessage-style bubbles used in the phone and inline chat demos. */
export const bubbleBase =
  "max-w-[80%] rounded-[19px] px-[13px] py-[9px] text-[15px] font-medium leading-[1.36] tracking-[-0.005em]";
export const bubbleZoe = `${bubbleBase} is-zoe self-start justify-self-start rounded-bl-[6px] bg-[#E9E9EB] text-[#111] origin-bottom-left`;
export const bubbleYou = `${bubbleBase} is-you self-end justify-self-end rounded-br-[6px] bg-[#007AFF] text-white origin-bottom-right`;
