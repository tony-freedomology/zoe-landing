"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "../../components/Footer";
import FaqSchema from "../../components/FaqSchema";
import MainFaqPanel from "../../components/MainFaqPanel";
import { mainFaqs } from "../../lib/mainFaqs";
import { headingAccent } from "../../components/home/styles";

const DEEPER_LINKS = [
  {
    href: "/how-zoe-teaches",
    title: "Who taught Zoe the Bible?",
    body: "Verified verses, the theology it holds, and the lines it won't cross.",
  },
  {
    href: "/philosophy",
    title: "Can AI help you walk with Jesus?",
    body: "What Zoe is, what it isn't, and why it keeps pointing past itself.",
  },
];

export default function FAQPage() {
  return (
    <>
    <FaqSchema faqs={mainFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="px-0 pb-20 pt-24 sm:px-6 sm:pt-28 lg:pb-28 lg:pt-36">
        <MainFaqPanel context="page" headingLevel="h1" />
      </section>

      <section aria-labelledby="deeper-h" className="px-5 pb-24 sm:px-6 lg:pb-32">
        <div className="mx-auto max-w-[1100px]">
          <h2 id="deeper-h" className="text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            The <span className={headingAccent}>bigger questions</span>.
          </h2>
          <p className="mt-3 max-w-[52ch] text-[17px] font-medium leading-[1.55] text-zoe-muted">
            Where Zoe&apos;s Bible knowledge comes from, and why we think AI can point you toward Jesus instead of away from Him.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {DEEPER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-6 rounded-[28px] bg-zoe-surface p-7 no-underline shadow-[0_10px_30px_rgba(45,50,49,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span>
                  <span className="block text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-zoe-ink">{item.title}</span>
                  <span className="mt-2 block text-[15px] font-medium leading-[1.5] text-zoe-muted">{item.body}</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-zoe-forest transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-zoe-ink">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl tracking-tight font-sans text-white font-bold leading-[1.1] mb-6">Ready to try it?</h2>
          <p className="text-lg text-zoe-outline font-medium leading-relaxed mb-10">Join the waitlist. No app, no login — just your phone and a daily text.</p>
          <Link href="/s" className="inline-flex items-center gap-2 rounded-full bg-white text-zoe-ink px-8 py-4 text-base font-bold shadow-lg hover:bg-slate-100 transition-all duration-200">
            Start with Zoe <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer hideWhyZoe />
    </div>
    </>
  );
}
