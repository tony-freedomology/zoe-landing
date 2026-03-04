"use client";

import { useEffect } from "react";
import Script from "next/script";
import HomePageContentJesusRed from "../../components/HomePageContentJesusRed";

export default function JesusRedPage() {
  useEffect(() => {
    // Add theme class + load serif font
    document.body.classList.add("theme-jesus-red");

    // Load Lora (serif) + Source Sans 3 via Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap";
    link.id = "jesus-red-fonts";
    document.head.appendChild(link);

    // Set CSS variable for serif once font loads
    document.documentElement.style.setProperty("--font-serif", '"Lora", Georgia, serif');
    document.documentElement.style.setProperty("--font-sans", '"Source Sans 3", system-ui, sans-serif');

    return () => {
      document.body.classList.remove("theme-jesus-red");
      document.getElementById("jesus-red-fonts")?.remove();
      document.documentElement.style.removeProperty("--font-serif");
      document.documentElement.style.removeProperty("--font-sans");
    };
  }, []);

  return (
    <>
      {/* 
        This inline script executes immediately when the HTML is parsed,
        long before React hydrates. This prevents the "Flash of Unstyled Content" (FOUC)
        where the default blue/green CSS shows before the useEffect fires.
      */}
      <Script
        id="theme-jesus-red-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `document.body.classList.add('theme-jesus-red');`,
        }}
      />
      <HomePageContentJesusRed />
    </>
  );
}
