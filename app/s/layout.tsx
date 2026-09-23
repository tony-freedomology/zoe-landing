import type { Metadata } from "next";

// /s and /s/* are short campaign variants of the homepage; point search
// engines at the homepage rather than indexing duplicates.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function ShortLayout({ children }: { children: React.ReactNode }) {
  return children;
}
