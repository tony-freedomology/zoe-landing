"use client";

import { useEffect } from "react";
import Home from "../page";

export default function EmeraldUniPage() {
  useEffect(() => {
    document.body.classList.add("theme-emerald-uni");

    // Load Cormorant Garamond (elegant thin serif) + DM Sans (clean modern sans)
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    link.id = "emerald-uni-fonts";
    document.head.appendChild(link);

    document.documentElement.style.setProperty(
      "--font-serif",
      '"Cormorant Garamond", "Georgia", serif'
    );
    document.documentElement.style.setProperty(
      "--font-sans",
      '"DM Sans", system-ui, sans-serif'
    );

    return () => {
      document.body.classList.remove("theme-emerald-uni");
      document.getElementById("emerald-uni-fonts")?.remove();
      document.documentElement.style.removeProperty("--font-serif");
      document.documentElement.style.removeProperty("--font-sans");
    };
  }, []);

  return <Home />;
}
