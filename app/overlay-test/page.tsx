"use client";
import { useState } from "react";
import Image from "next/image";

const overlays = [
  { name: "Navy (current)", className: "from-slate-900/70 via-slate-900/50 to-slate-900/90" },
  { name: "Forest Green", className: "from-[#283b33]/80 via-[#283b33]/50 to-[#283b33]/90" },
  { name: "Warm Ink", className: "from-[#0b0c12]/70 via-[#0b0c12]/40 to-[#0b0c12]/80" },
  { name: "Warm Brown", className: "from-[#1a1410]/80 via-[#1a1410]/50 to-[#1a1410]/90" },
  { name: "Gold Dark", className: "from-[#141008]/80 via-[#141008]/40 to-[#141008]/85" },
];

export default function OverlayTest() {
  const [idx, setIdx] = useState(0);
  const current = overlays[idx];

  return (
    <div className="min-h-screen bg-[#0b0c12]">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-md rounded-2xl p-3 border border-white/10">
        <button
          onClick={() => setIdx((idx - 1 + overlays.length) % overlays.length)}
          className="w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center hover:bg-white/20"
        >
          &larr;
        </button>
        <span className="text-white text-sm font-semibold min-w-[140px] text-center">
          {current.name}
        </span>
        <button
          onClick={() => setIdx((idx + 1) % overlays.length)}
          className="w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center hover:bg-white/20"
        >
          &rarr;
        </button>
      </div>

      {[
        { img: "/images/about-hero.jpg", title: "About Zoe", sub: "The story behind Zoe" },
        { img: "/images/features-hero.jpg", title: "Features", sub: "What Zoe does differently" },
        { img: "/images/blog-hero.jpg", title: "Blog", sub: "Exploring faith and technology" },
      ].map((hero, i) => (
        <section key={i} className="relative overflow-hidden py-32 px-6 pt-40 mb-8">
          <Image src={hero.img} alt="" fill className="object-cover opacity-40" priority />
          <div className={`absolute inset-0 bg-gradient-to-b ${current.className} transition-all duration-500`} />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-jade mb-4">
              {hero.sub}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {hero.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We built something we wish existed. Daily discipleship that actually fits inside a real life.
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
