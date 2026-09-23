import Link from "next/link";
import ZoeMark from "./ZoeMark";

type FooterProps = {
  hideWhyZoe?: boolean;
};

type FooterLink = { href: string; label: string };

const linkClass = "block py-1 font-medium no-underline transition-colors hover:text-zoe-ink";

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="mb-3 mt-1 text-[13px] font-bold text-zoe-ink">{title}</h2>
      <ul className="m-0 list-none p-0">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ hideWhyZoe = false }: FooterProps) {
  const read: FooterLink[] = [
    { href: "/blog", label: "Blog" },
    { href: "/guides", label: "Guides" },
    ...(hideWhyZoe ? [] : [{ href: "/why-zoe", label: "Why “Zoe”?" }]),
  ];

  return (
    <footer className="zoe-site-footer border-t border-zoe-outline/45 bg-zoe-oat pb-10 pt-14 text-sm text-zoe-muted">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)]">
        <div className="grid grid-cols-2 gap-8 min-[861px]:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 min-[861px]:col-span-1">
            <Link href="/" aria-label="Zoe home" className="inline-block leading-none">
              <ZoeMark className="h-8 w-auto text-zoe-sap" />
            </Link>
            <p className="mt-3 max-w-[30ch] text-[13.5px]">
              AI that helps you walk with Jesus. It lives in your texts. No app, no login.
            </p>
          </div>
          <div>
            <h2 className="mb-3 mt-1 text-[13px] font-bold text-zoe-ink">Product</h2>
            <ul className="m-0 list-none p-0">
              <li>
                <Link href="/#day" className={linkClass}>
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/journeys" className={linkClass}>
                  Journeys
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#waitlist" className={linkClass}>Join the waitlist</Link>
              </li>
            </ul>
          </div>
          <Column title="Read" links={read} />
          <Column
            title="Company"
            links={[
              { href: "/about", label: "About" },
              { href: "/churches", label: "For churches" },
              { href: "/brand-facts", label: "Brand facts" },
            ]}
          />
          <Column
            title="Legal"
            links={[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-zoe-outline/45 pt-[22px] text-[13px]">
          <span>&copy; {new Date().getFullYear()} Zoe. All rights reserved.</span>
          <span>Built in Cleveland, OH.</span>
        </div>
      </div>
    </footer>
  );
}
