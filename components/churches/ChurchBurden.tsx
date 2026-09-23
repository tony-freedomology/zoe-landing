import { headingAccent, sectionPad, sheet, wrap } from "../home/styles";
import { churchHeading } from "./styles";

// Illustration only (no numbers): how Sunday's momentum usually fades across the week.
const FADE = [
  { day: "Sun", opacity: 1, width: "80%" },
  { day: "Mon", opacity: 0.7, width: "66%" },
  { day: "Tue", opacity: 0.45, width: "48%" },
  { day: "Wed", opacity: 0.28, width: "32%" },
  { day: "Thu", opacity: 0.18, width: "22%" },
  { day: "Fri", opacity: 0.12, width: "14%" },
  { day: "Sat", opacity: 0.08, width: "10%" },
];

export default function ChurchBurden() {
  return (
    <section aria-labelledby="burden-h" className={`${sheet} ${sectionPad} bg-zoe-surface`}>
      <div className={`${wrap} grid items-start gap-[clamp(32px,6vw,96px)] min-[901px]:grid-cols-2`}>
        <div>
          <h2 id="burden-h" className={churchHeading}>
            Pastors rarely get to see where a good sermon <em className={headingAccent}>goes.</em>
          </h2>
          <figure
            className="mx-0 mb-4 mt-10 grid max-w-[520px] grid-cols-7 gap-2"
            aria-label="How a sermon usually fades across the week"
          >
            {FADE.map((d) => (
              <div
                key={d.day}
                className="rounded-[14px] bg-white px-1.5 py-3 text-center outline outline-1 outline-[rgba(187,202,193,0.45)]"
              >
                <b className="block text-[12.5px]">{d.day}</b>
                <i
                  className="mx-auto mt-2.5 block h-1.5 rounded-md bg-zoe-sap"
                  style={{ opacity: d.opacity, width: d.width }}
                />
              </div>
            ))}
            <figcaption className="col-span-full mt-1.5 text-[13px] font-semibold text-zoe-muted">
              Most Sunday inspiration is gone by Tuesday. Not because people don&apos;t care. Life is loud.
            </figcaption>
          </figure>
        </div>

        <div className="grid gap-[18px] text-lg font-medium leading-[1.7] text-zoe-muted [&_b]:text-zoe-ink">
          <p>
            Someone tries the prayer you suggested. Someone else gets stuck on one sentence. Another realizes they need to
            talk with someone from church.
          </p>
          <p>
            Most of that happens quietly, and you can&apos;t personally follow up with everyone.{" "}
            <b>
              Zoe helps the good work keep going during the week, then brings back only what you can responsibly use.
            </b>
          </p>
          <p>It doesn&apos;t replace your preaching, your small groups, or your care team. It gives them a Tuesday.</p>
          <div className="mt-2.5 flex items-center gap-3.5 border-t border-[rgba(187,202,193,0.55)] pt-[22px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/faq/tony-signature.svg"
              alt="Tony's signature"
              width={84}
              height={40}
              loading="lazy"
              className="h-10 w-[84px] flex-none"
            />
            <p className="text-[13.5px] leading-[1.4]">
              <strong className="block text-zoe-ink">Built by a pastor.</strong>
              Tony Allen started Zoe because he got tired of watching faith stay in the pew on Sundays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
