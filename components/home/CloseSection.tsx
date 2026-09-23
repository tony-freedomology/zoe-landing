import { closePricingLine } from "../../lib/pricingCopy";
import { btnJade, sectionPad, sheet, wrap } from "./styles";

export default function CloseSection() {
  return (
    <section aria-labelledby="close-h" className={`${sheet} ${sectionPad} bg-zoe-surface text-center`}>
      <div className={wrap}>
        <h2
          id="close-h"
          className="font-serif text-[clamp(56px,10vw,132px)] font-bold italic leading-[0.95] tracking-[-0.02em] text-zoe-sap"
        >
          Toward Him daily.
        </h2>
        <p className="mx-auto mb-[30px] mt-[22px] max-w-[40ch] text-[clamp(17px,1.5vw,19px)] font-medium text-zoe-muted">
          {closePricingLine}
        </p>
        <a href="#waitlist" className={btnJade}>
          Join the walk
        </a>
      </div>
    </section>
  );
}
