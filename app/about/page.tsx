import type { Metadata } from "next";
import { withSocial } from "../../lib/seo";

import AboutHero from "../../components/about/AboutHero";
import AboutLetter from "../../components/about/AboutLetter";
import { AboutBoundaries, AboutClose, AboutHelp } from "../../components/about/AboutSections";
import Footer from "../../components/Footer";

export const metadata: Metadata = withSocial({
  title: "About",
  description:
    "Hi, I'm Tony. Pastor and builder of Zoe — an experiment in whether phones can turn attention back to Jesus instead of away from Him.",
  alternates: {
    canonical: "/about",
  },
});

// About page, redesigned September 2026 from a prototype Tony approved:
// hero with portrait + copyable email, Tony's letter (verbatim), the three
// boundaries, ways to help, and the close.
export default function AboutPage() {
  return (
    <div className="bg-zoe-oat font-sans text-zoe-ink [&_:focus-visible]:rounded-lg [&_:focus-visible]:outline [&_:focus-visible]:outline-[3px] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:outline-zoe-sap [&_:is(h1,h2,h3)]:[text-wrap:balance]">
      <main id="top">
        <AboutHero />
        <AboutLetter />
        <AboutBoundaries />
        <AboutHelp />
        <AboutClose />
      </main>
      <Footer hideWhyZoe />
    </div>
  );
}
