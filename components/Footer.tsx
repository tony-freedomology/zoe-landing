import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zoe-outline/40 bg-zoe-oat px-6 py-14 text-sm text-zoe-muted">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-xl font-semibold tracking-tight text-zoe-ink">
              Zoe
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-[#6c7a73]">
              A quiet tool that lives in your texts. No app. No login. Just a clearer way to stay attentive through the week.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-[#6c7a73]">Product</p>
              <Link href="/features" className="font-medium transition-colors hover:text-zoe-ink">Features</Link>
              <Link href="/faq" className="font-medium transition-colors hover:text-zoe-ink">FAQ</Link>
              <Link href="/#waitlist" className="font-medium transition-colors hover:text-zoe-ink">Join the waitlist</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-[#6c7a73]">Journeys</p>
              <Link href="/journeys/james-deep" className="font-medium transition-colors hover:text-zoe-ink">James: 10 Days Deep</Link>
              <Link href="/journeys/new-believer" className="font-medium transition-colors hover:text-zoe-ink">New Believer</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-[#6c7a73]">Company</p>
              <Link href="/about" className="font-medium transition-colors hover:text-zoe-ink">About</Link>
              <Link href="/churches" className="font-medium transition-colors hover:text-zoe-ink">For Churches</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-[#6c7a73]">Legal</p>
              <Link href="/privacy" className="font-medium transition-colors hover:text-zoe-ink">Privacy</Link>
              <Link href="/terms" className="font-medium transition-colors hover:text-zoe-ink">Terms</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zoe-outline/40 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="font-medium text-[#6c7a73]">
            &copy; {new Date().getFullYear()} Zoe. All rights reserved.
          </div>
          <div className="text-[#6c7a73]">
            Built in Cleveland, OH.
          </div>
        </div>
      </div>
    </footer>
  );
}
