import type { ReactNode } from "react";

/** Soft Jade aside paragraph inside a post, e.g. Tony's "(btw, …)" notes. */
export default function BlogAside({ children }: { children: ReactNode }) {
  return <p className="blog-aside">{children}</p>;
}
