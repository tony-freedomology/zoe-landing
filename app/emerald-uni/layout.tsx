import "./emerald-uni.css";

export const metadata = {
  title: "Zoe — Formation for the Thoughtful Life",
  description:
    "A discipleship companion rooted in Scripture, built for depth.",
  openGraph: {
    title: "Zoe — Formation for the Thoughtful Life",
    description:
      "A discipleship companion rooted in Scripture, built for depth.",
    type: "website",
    images: [
      {
        url: "/images/og-emerald.png",
        width: 1200,
        height: 630,
        alt: "Zoe by Freedomology",
      },
    ],
  },
};

export default function EmeraldUniLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
