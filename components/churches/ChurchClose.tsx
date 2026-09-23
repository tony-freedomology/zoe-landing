import Link from "next/link";
import { btnJade, sectionPad, sheet, wrap } from "../home/styles";
import { CHURCH_LOGIN_HREF, PILOT_HREF } from "./links";

export default function ChurchClose() {
  return (
    <section aria-labelledby="cl-h" className={`${sheet} ${sectionPad} bg-zoe-surface text-center`}>
      <div className={wrap}>
        <h2
          id="cl-h"
          className="mx-auto max-w-[14ch] font-serif text-[clamp(48px,8.4vw,112px)] font-semibold italic leading-[0.98] tracking-[-0.02em] text-zoe-sap"
        >
          Help Sunday live in the rest of the week.
        </h2>
        <p className="mx-auto mb-[30px] mt-[22px] max-w-[44ch] text-[clamp(17px,1.5vw,19px)] font-medium text-zoe-muted">
          Start with a small group. We&apos;ll help your team shape the boundaries, invite people, and learn together.
        </p>
        <Link href={PILOT_HREF} className={btnJade}>
          Start a pilot at your church
        </Link>
        <span className="mt-[22px] block text-sm font-semibold text-zoe-muted">
          Already in a pilot?{" "}
          <a href={CHURCH_LOGIN_HREF} className="font-extrabold text-zoe-forest underline">
            Church admin login
          </a>
        </span>
      </div>
    </section>
  );
}
