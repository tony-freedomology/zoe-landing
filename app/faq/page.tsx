"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "../../components/Footer";
import FaqSchema from "../../components/FaqSchema";
import MainFaqPanel from "../../components/MainFaqPanel";
import { mainFaqs } from "../../lib/mainFaqs";

export default function FAQPage() {
  return (
    <>
    <FaqSchema faqs={mainFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />
    <div className="min-h-screen bg-zoe-oat text-zoe-ink">
      <section className="px-0 pb-20 pt-24 sm:px-6 sm:pt-28 lg:pb-28 lg:pt-36">
        <MainFaqPanel context="page" headingLevel="h1" />
      </section>

      <section className="py-24 px-6 bg-zoe-ink">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl tracking-tight font-sans text-white font-bold leading-[1.1] mb-6">Ready to try it?</h2>
          <p className="text-lg text-zoe-outline font-medium leading-relaxed mb-10">Join the waitlist. No app, no login — just your phone and a daily text.</p>
          <Link href="/#waitlist" className="inline-flex items-center gap-2 rounded-full bg-white text-zoe-ink px-8 py-4 text-base font-bold shadow-lg hover:bg-slate-100 transition-all duration-200">
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
