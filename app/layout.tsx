import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import clsx from "clsx";
import Navbar from "../components/Navbar";
import AttributionCapture from "../components/AttributionCapture";
import MetaPixel from "../components/MetaPixel";
import { SITE_URL, toAbsoluteUrl } from "../lib/site";
import { DEFAULT_OG_IMAGE } from "../lib/seo";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap", adjustFontFallback: false });
const SITE_DESCRIPTION =
  "Zoe is AI that helps you walk with Jesus by text: scripture, prayer, and reflection woven through your morning, midday, and evening. No app to download.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zoe — AI that helps you walk with Jesus, by text",
    template: "%s | Zoe",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  // Pages supply their own canonical + og:url (see lib/seo.ts). These are
  // fallbacks for routes that do not define social metadata.
  openGraph: {
    title: "Zoe — AI that helps you walk with Jesus, by text",
    description: SITE_DESCRIPTION,
    siteName: "Zoe",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoe — AI that helps you walk with Jesus, by text",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zoe",
  url: SITE_URL,
  logo: toAbsoluteUrl("/images/brand/zoe-logo-512.png"),
  description:
    "Zoe is AI that helps you walk with Jesus. It lives in SMS and helps people turn their attention toward Jesus through scripture, prayer, reflection, and gentle follow-through: a simple rule of life, carried through the week by text.",
  sameAs: [],
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Tony Allen",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zoe",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "SMS (any phone)",
  description:
    "AI that helps you walk with Jesus by text. Zoe carries scripture, prayer, and reflection through your morning, midday, and evening by SMS. No download required.",
  url: SITE_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free during beta",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zoe",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: "Zoe",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={clsx(jakarta.variable, newsreader.variable, "font-sans tracking-tight-fine")}>
        <AttributionCapture />
        <MetaPixel />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
