import "./jesus-red.css";

export const metadata = {
  title: "Zoe — Walk with Jesus",
  description:
    "Practical formation for real men, real families, real churches.",
  icons: {
    icon: [
      { url: "/jesus-red/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/jesus-red/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/jesus-red/apple-touch-icon.png",
  },
  openGraph: {
    title: "Zoe — Walk with Jesus",
    description: "Practical formation for real men, real families, real churches.",
    type: "website",
    images: [
      {
        url: "/images/og-jesus-red.png",
        width: 1200,
        height: 630,
        alt: "Zoe — Jesus Red",
      },
    ],
  },
};

export default function JesusRedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
