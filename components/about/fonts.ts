import { Newsreader } from "next/font/google";

// The layout only loads Newsreader's upright style, so `italic` there is
// browser-synthesized. The About page's accents use the real italic cut (with
// the optical-size axis) to match the approved prototype.
const newsreaderItalic = Newsreader({
  subsets: ["latin"],
  style: "italic",
  axes: ["opsz"],
  display: "swap",
  adjustFontFallback: false,
});

/** Real Newsreader Italic for the rare trust-bearing accents on /about. */
export const serifItalic = newsreaderItalic.className;
