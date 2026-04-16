import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Footer from "../../components/Footer";
import { journeyCatalog } from "../../lib/journeyCatalog";

export const metadata: Metadata = {
  title: "Journeys - Zoe",
  description:
    "Explore guided reading, prayer, and reflection journeys built to help you walk with Jesus in the places real life hits hardest.",
};

export default function JourneysHubPage() {
  return (
    <div className="min-h-screen text-zoe-ink bg-zoe-surface">
      <section className="bg-white py-32 px-6 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zoe-leaf/30 bg-zoe-leaf/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zoe-leaf mb-8">
            Guided Journeys
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight font-sans text-zoe-ink leading-[1.1] font-bold">Walk the path.</h1>
          <p className="mt-6 text-xl text-zoe-muted font-medium leading-relaxed max-w-2xl mx-auto">
            Daily rhythms of reading, prayer, and reflection delivered directly to your phone. Pick a journey and start building a practice that lasts.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journeyCatalog.map((journey) => (
              <Link
                href={`/journeys/${journey.slug}`}
                key={journey.slug}
                className="group flex h-full flex-col rounded-[32px] border border-zoe-outline/20 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] bg-zoe-surface">
                  <Image
                    src={journey.image}
                    alt={journey.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center rounded-full border border-[#E7DED0] bg-[#FCF9F4] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-zoe-ink shadow-[0_12px_28px_rgba(45,50,49,0.14)]">
                      {journey.duration}
                    </span>
                  </div>
                </div>
                <div className="flex flex-grow flex-col px-3 pb-3 pt-6">
                  <h2 className="text-2xl tracking-tight font-sans text-zoe-ink font-bold mb-3 group-hover:text-zoe-leaf transition-colors duration-200">
                    {journey.title}
                  </h2>
                  <p className="text-zoe-muted font-medium leading-relaxed text-sm flex-grow mb-6 line-clamp-4">
                    {journey.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-zoe-ink group-hover:text-zoe-leaf transition-colors duration-200 mt-auto">
                    View Details <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6 bg-zoe-ink">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl tracking-tight font-sans text-white font-bold leading-[1.1] mb-6">Your daily rhythm.</h2>
          <p className="text-lg text-zoe-outline font-medium leading-relaxed mb-10">Zoe is currently in early access. Join the waitlist to be among the first to walk through a guided journey with Daily scripture, reflection, and check-ins in your texts.</p>
          <Link href="/#waitlist" className="inline-flex items-center gap-2 rounded-full bg-white text-zoe-ink px-8 py-4 text-base font-bold shadow-lg hover:bg-slate-100 transition-all duration-200">
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
