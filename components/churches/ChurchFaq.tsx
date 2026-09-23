import { lede, sectionPad, sheet, wrap } from "../home/styles";

// Questions pastors ask first. `home-faq` reuses the homepage disclosure markers (globals.css).
export const CHURCH_FAQS = [
  {
    q: "Can I read my members' messages?",
    a: "No. Leaders don't get a searchable view of private conversations. You see shared patterns and any request a person chooses to send you.",
  },
  {
    q: "Does Zoe speak for me?",
    a: "No. Zoe can be shaped by your sermons and your church's theology, but it's AI and it says so. It never claims your authority or pretends to be you.",
  },
  {
    q: "What theology does Zoe hold?",
    a: "By default, broadly orthodox, C.S. Lewis-style “mere Christianity.” For your church, you set the statement of faith and guardrails. On debated questions, Zoe asks more than it teaches and points people back to you.",
  },
  {
    q: "Is this going to replace small groups?",
    a: "We hope it does the opposite. Zoe is built to point people toward real people: your small groups, your care team, and you. If attention lands on Zoe instead of Jesus and your church, we've failed.",
  },
  {
    q: "How much work is it for our staff?",
    a: "Sharing your sermon notes each week, plus reading a short Saturday brief. We handle setup with you during the pilot.",
  },
  {
    q: "What happens in a crisis?",
    a: "Zoe isn't a crisis service. When a conversation points to abuse, self-harm, or severe distress, it routes toward immediate human help and appropriate resources.",
  },
];

export default function ChurchFaq() {
  return (
    <section id="faq" aria-labelledby="fq-h" className={`${sheet} ${sectionPad} home-faq bg-zoe-oat`}>
      <div className={`${wrap} grid items-start gap-[clamp(28px,5vw,72px)] min-[901px]:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <h2
            id="fq-h"
            className="text-[clamp(36px,4.6vw,58px)] font-extrabold leading-[0.96] tracking-[-0.048em] text-zoe-ink"
          >
            Questions pastors ask us.
          </h2>
          <p className={`${lede} mt-5 max-w-[52ch]`}>If yours isn&apos;t here, ask us directly. We&apos;re pastors too.</p>
        </div>
        <div className="grid gap-2.5">
          {CHURCH_FAQS.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className="rounded-2xl bg-white shadow-[0_8px_24px_rgba(45,50,49,0.06)] outline outline-1 outline-zoe-outline/35"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[10px_1fr_20px] items-center gap-3.5 px-5 py-[17px] text-[16.5px] font-extrabold text-zoe-ink before:h-2.5 before:w-2.5 before:rounded-full before:bg-zoe-sap before:content-['']">
                {faq.q}
              </summary>
              <div className="grid max-w-[64ch] gap-3 pb-5 pl-11 pr-[22px] font-medium leading-[1.7] text-zoe-ink/80">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
