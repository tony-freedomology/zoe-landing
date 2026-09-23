"use client";

import { useRef, useState, type FormEvent } from "react";
import clsx from "clsx";
import { signupConfirmation, signupStatus, type SignupStatus } from "../../lib/signupAdmission";
import { isWaitlistEmailValid, isWaitlistNameValid, isWaitlistPhoneValid } from "../../lib/waitlistValidation";
import { createMetaEventId, trackMetaLead } from "../../lib/metaPixel";
import { buildAttributedSourceUrl } from "../../lib/attribution";
import { waitlistPricingLine } from "../../lib/pricingCopy";
import { usePhoneFormatter } from "../../app/hooks/usePhoneFormatter";
import { displayHeading, lede, sectionPad, sheet, wrap } from "./styles";

type PhonePlatform = "iphone" | "android";
type Field = "platform" | "name" | "phone" | "email" | "consent";

const FIELD_ORDER: Field[] = ["platform", "name", "phone", "email", "consent"];

const ERRORS: Record<Field, string> = {
  platform: "Pick iPhone or Android so Zoe texts you the right way.",
  name: "Add your first name.",
  phone: "Enter your full mobile number, like (216) 555-0142.",
  email: "That email doesn't look complete.",
  consent: "Check the box so Zoe is allowed to text you.",
};

const STEPS = [
  { title: "Save your spot", body: "Takes about 20 seconds." },
  { title: "Get a text when it opens", body: "We let people in a few at a time so we can listen well." },
  { title: "Tell Zoe where you are", body: "A few questions about your rhythm and when you want to hear from it." },
];

const labelClass = "mb-1.5 block p-0 text-[12.5px] font-bold text-zoe-muted";
const inputClass =
  "w-full rounded-2xl border-[1.5px] border-zoe-outline/70 bg-zoe-oat px-4 py-3.5 text-base font-medium leading-[1.2] text-zoe-ink transition-[border-color,box-shadow] duration-200 placeholder:text-[#9aa39f] focus:border-zoe-sap focus:shadow-[0_0_0_4px_rgba(29,194,134,0.15)] focus:outline-none aria-[invalid=true]:border-[#c2410c]";
const errorClass = "mt-1.5 text-[12.5px] font-semibold text-[#b4380b]";

export default function HomeWaitlist() {
  const [status, setStatus] = useState<SignupStatus>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");
  const [email, setEmail] = useState("");
  const [phonePlatform, setPhonePlatform] = useState<PhonePlatform | "">("");
  const [smsConsentAgreed, setSmsConsentAgreed] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const refs = {
    platform: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    consent: useRef<HTMLInputElement>(null),
  };

  const valid: Record<Field, boolean> = {
    platform: phonePlatform !== "",
    name: isWaitlistNameValid(name),
    phone: isWaitlistPhoneValid(phone),
    email: isWaitlistEmailValid(email),
    consent: smsConsentAgreed,
  };
  const waitlistFormValid =
    isWaitlistNameValid(name) &&
    isWaitlistPhoneValid(phone) &&
    isWaitlistEmailValid(email) &&
    phonePlatform !== "" &&
    smsConsentAgreed;

  const errorFor = (field: Field) => (showErrors && !valid[field] ? ERRORS[field] : null);

  const handleWaitlistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    setSubmitError(null);

    if (!waitlistFormValid) {
      // The button always works; name exactly what's missing and move focus there.
      setShowErrors(true);
      const firstInvalid = FIELD_ORDER.find((field) => !valid[field]);
      if (firstInvalid) refs[firstInvalid].current?.focus();
      return;
    }

    setStatus("submitting");

    const eventId = createMetaEventId();
    const payload = {
      name,
      phone,
      email,
      phonePlatform,
      smsConsent: smsConsentAgreed,
      source: "individuals-waitlist",
      eventId,
      eventSourceUrl: buildAttributedSourceUrl(window.location.href),
      submittedAt: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    const attempt = async () => {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        throw new Error(data?.details || data?.error || "Unable to submit waitlist request");
      }
      return data;
    };

    try {
      const result = await attempt();
      trackMetaLead(eventId, payload.source);
      setStatus(signupStatus(result.admissionStatus));
    } catch {
      try {
        await new Promise((r) => setTimeout(r, 1000));
        const result = await attempt();
        trackMetaLead(eventId, payload.source);
        setStatus(signupStatus(result.admissionStatus));
      } catch (retryError) {
        console.warn("Waitlist submission failed after retry:", retryError);
        setStatus("idle");
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  const done = status === "admitted" || status === "waitlisted" || status === "follow_up_required";

  return (
    <section id="waitlist" aria-labelledby="w-h" className={`${sheet} ${sectionPad} scroll-mt-4 bg-zoe-oat`}>
      <div className={`${wrap} grid items-start gap-[clamp(36px,6vw,88px)] min-[901px]:grid-cols-[1fr_minmax(0,460px)]`}>
        <div>
          <h2 id="w-h" className={displayHeading}>
            Try Zoe with us.
          </h2>
          <p className={`${lede} mt-5 max-w-[44ch]`}>
            We&apos;re inviting people in small groups while we improve Zoe. Join the waitlist and we&apos;ll text you when your
            spot is ready.
          </p>
          <ol className="m-0 mt-9 grid max-w-[440px] list-none gap-[18px] p-0">
            {STEPS.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[36px_1fr] items-start gap-3.5">
                <span
                  className="grid h-9 w-9 place-items-center rounded-full bg-zoe-sap text-sm font-extrabold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <b className="mt-1.5 block text-[16.5px] font-extrabold text-zoe-ink">{step.title}</b>
                  <span className="text-[15px] text-zoe-muted">{step.body}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className={`${lede} mt-5 inline-flex items-center gap-2.5`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {waitlistPricingLine}
          </p>
        </div>

        <div className="rounded-[30px] bg-white p-[clamp(22px,3vw,32px)] shadow-[0_24px_60px_rgba(45,50,49,0.07)] outline outline-1 outline-zoe-outline/45">
          {done ? (
            <div className="px-2 py-7 text-center" role="status">
              <div className="mx-auto mb-[18px] grid h-16 w-16 place-items-center rounded-full bg-zoe-sap text-white">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-[26px] font-extrabold tracking-[-0.03em] text-zoe-ink">{signupConfirmation(status).title}</h3>
              <p className="mt-2.5 font-medium text-zoe-muted">{signupConfirmation(status).body}</p>
            </div>
          ) : (
            <form className="grid gap-3.5" onSubmit={handleWaitlistSubmit} noValidate>
              <input type="hidden" name="source" value="individuals-waitlist" />
              <fieldset className="m-0 grid grid-cols-2 gap-2 border-0 p-0" aria-describedby={errorFor("platform") ? "e-platform" : undefined}>
                <legend className={labelClass}>Your phone</legend>
                {(["iphone", "android"] as const).map((platform, i) => (
                  <label key={platform} className="relative">
                    <input
                      ref={i === 0 ? refs.platform : undefined}
                      type="radio"
                      name="phonePlatform"
                      value={platform}
                      checked={phonePlatform === platform}
                      onChange={() => setPhonePlatform(platform)}
                      className="peer absolute inset-0 cursor-pointer opacity-0"
                    />
                    <span className="flex items-center justify-center gap-2 rounded-2xl border-[1.5px] border-zoe-outline/70 bg-zoe-oat p-[13px] text-[14.5px] font-bold text-zoe-ink transition-all duration-200 peer-checked:border-zoe-sap peer-checked:bg-zoe-sap peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-zoe-sap">
                      {platform === "iphone" ? "iPhone" : "Android"}
                    </span>
                  </label>
                ))}
              </fieldset>
              {errorFor("platform") ? (
                <p id="e-platform" className={`${errorClass} -mt-1.5`}>
                  {errorFor("platform")}
                </p>
              ) : null}

              <div className="grid">
                <label className={labelClass} htmlFor="wl-name">
                  First name
                </label>
                <input
                  ref={refs.name}
                  id="wl-name"
                  type="text"
                  name="name"
                  autoComplete="given-name"
                  placeholder="Tony"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={Boolean(errorFor("name"))}
                  aria-describedby={errorFor("name") ? "e-name" : undefined}
                  className={inputClass}
                />
                {errorFor("name") ? (
                  <p id="e-name" className={errorClass}>
                    {errorFor("name")}
                  </p>
                ) : null}
              </div>

              <div className="grid">
                <label className={labelClass} htmlFor="wl-phone">
                  Mobile number
                </label>
                <input
                  ref={refs.phone}
                  id="wl-phone"
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(216) 555-0142"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  aria-invalid={Boolean(errorFor("phone"))}
                  aria-describedby={errorFor("phone") ? "e-phone" : undefined}
                  className={inputClass}
                />
                {errorFor("phone") ? (
                  <p id="e-phone" className={errorClass}>
                    {errorFor("phone")}
                  </p>
                ) : null}
              </div>

              <div className="grid">
                <label className={labelClass} htmlFor="wl-email">
                  Email
                </label>
                <input
                  ref={refs.email}
                  id="wl-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errorFor("email"))}
                  aria-describedby={errorFor("email") ? "e-email" : undefined}
                  className={inputClass}
                />
                {errorFor("email") ? (
                  <p id="e-email" className={errorClass}>
                    {errorFor("email")}
                  </p>
                ) : null}
              </div>

              <label className="grid grid-cols-[20px_1fr] items-start gap-2.5 rounded-2xl bg-zoe-oat px-3.5 py-3 text-[12.5px] leading-[1.5] text-zoe-muted">
                <input
                  ref={refs.consent}
                  type="checkbox"
                  checked={smsConsentAgreed}
                  onChange={(event) => setSmsConsentAgreed(event.target.checked)}
                  aria-invalid={Boolean(errorFor("consent"))}
                  aria-describedby={errorFor("consent") ? "e-consent" : undefined}
                  className="mt-px h-[18px] w-[18px] accent-zoe-forest"
                />
                <span>
                  I agree to receive recurring automated texts from Zoe. Message frequency varies. Message and data rates may
                  apply. Reply STOP to opt out or HELP for help.{" "}
                  <a href="/privacy" className="text-zoe-ink underline">
                    Privacy Policy
                  </a>
                  {" · "}
                  <a href="/terms" className="text-zoe-ink underline">
                    Terms of Service
                  </a>
                </span>
              </label>
              {errorFor("consent") ? (
                <p id="e-consent" className={`${errorClass} -mt-1.5`}>
                  {errorFor("consent")}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                aria-busy={status === "submitting"}
                className={clsx(
                  "mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zoe-sap p-[17px] text-base font-bold leading-none text-white shadow-[0_10px_24px_rgba(29,194,134,0.22)] transition-[transform,filter] duration-200 hover:-translate-y-px hover:brightness-105 active:scale-[0.97]",
                  status === "submitting" && "cursor-wait opacity-80"
                )}
              >
                {status === "submitting" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                    Saving your spot…
                  </>
                ) : (
                  "Save my spot"
                )}
              </button>
              {submitError ? (
                <p className="text-center text-[13px] font-semibold text-[#b4380b]" role="alert">
                  {submitError}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
