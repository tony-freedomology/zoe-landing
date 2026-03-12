"use client";

import { FormEvent, startTransition, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  ArrowRight,
  CircleAlert,
  LoaderCircle,
  LockKeyhole,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  formatRecurringPrice,
  formatUsPhoneDisplay,
  formatUsPhoneInput,
  normalizeUsPhoneInput,
} from "../lib/subscribe";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const appearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#00c292",
    colorBackground: "#ffffff",
    colorText: "#172033",
    colorDanger: "#9f2d2d",
    colorSuccess: "#00c292",
    borderRadius: "16px",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid rgba(215, 194, 159, 0.45)",
      boxShadow: "0 10px 30px rgba(19, 29, 45, 0.05)",
    },
    ".Tab": {
      border: "1px solid rgba(215, 194, 159, 0.45)",
      boxShadow: "none",
    },
    ".Tab--selected": {
      borderColor: "#00c292",
      color: "#0f7a73",
    },
    ".Label": {
      color: "#334155",
    },
    ".Block": {
      backgroundColor: "#ffffff",
      boxShadow: "0 18px 40px rgba(19, 29, 45, 0.05)",
    },
  },
};

type SubscribeSession = {
  clientSecret: string;
  customerId: string;
  subscriptionId: string;
  phone: string;
  trialDays: number;
  price: {
    amountCents: number | null;
    currency: string;
    interval: string;
  };
};

type SubscribeExperienceProps = {
  initialPhone?: string;
  canceled?: boolean;
};

const revealTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function SubscribeExperience({
  initialPhone = "",
  canceled = false,
}: SubscribeExperienceProps) {
  const initialNormalizedPhone = normalizeUsPhoneInput(initialPhone);
  const [phoneInput, setPhoneInput] = useState(() => formatUsPhoneInput(initialPhone));
  const [session, setSession] = useState<SubscribeSession | null>(null);
  const [error, setError] = useState<string | null>(
    canceled
      ? "Checkout was canceled. Your thread is still there when you're ready."
      : null
  );
  const [isPreparing, setIsPreparing] = useState(false);
  const autoStartedRef = useRef(false);

  const configError = stripePromise
    ? null
    : "Stripe isn't configured on this site yet. Add the publishable key and reload.";
  const normalizedInputPhone = normalizeUsPhoneInput(phoneInput);
  const displayPhone = formatUsPhoneDisplay(
    session?.phone ?? normalizedInputPhone ?? initialNormalizedPhone
  );
  const planLabel = formatRecurringPrice(session?.price);
  const priceNote = planLabel ?? "Billed monthly after your free week";
  const hasSmsLinkedPhone = !!initialNormalizedPhone;

  useEffect(() => {
    if (!hasSmsLinkedPhone || canceled || autoStartedRef.current) return;
    if (session || isPreparing || configError || !initialNormalizedPhone) return;

    autoStartedRef.current = true;
    void prepareCheckout(initialNormalizedPhone);
  }, [
    canceled,
    configError,
    hasSmsLinkedPhone,
    initialNormalizedPhone,
    isPreparing,
    session,
  ]);

  async function prepareCheckout(phone: string) {
    setIsPreparing(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const payload = (await response.json()) as Partial<SubscribeSession> & {
        error?: string;
      };

      if (!response.ok || !payload.clientSecret || !payload.phone) {
        throw new Error(payload.error ?? "Unable to start checkout right now.");
      }

      window.history.replaceState(
        {},
        "",
        `/subscribe?phone=${encodeURIComponent(payload.phone)}`
      );

      startTransition(() => {
        setSession(payload as SubscribeSession);
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start checkout right now."
      );
    } finally {
      setIsPreparing(false);
    }
  }

  async function handlePrepareCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (configError) {
      setError(configError);
      return;
    }

    if (!normalizedInputPhone) {
      setError("Enter the same US phone number you text with Zoe.");
      return;
    }

    await prepareCheckout(normalizedInputPhone);
  }

  function resetPhoneFlow() {
    setSession(null);
    setError(null);
    autoStartedRef.current = true;
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#d7c29f]/40 bg-[#fffdf9]/90 p-5 shadow-[0_28px_90px_rgba(48,36,16,0.13)] backdrop-blur-xl sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,194,146,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(0,139,163,0.10),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,250,243,0.95))]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7c29f]/35 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0f7a73]">
            <span className="h-2 w-2 rounded-full bg-brand-jade animate-pulse" />
            Secure your thread
          </div>
          <div className="rounded-full border border-white/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Stripe
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[#e8dcc7]/70 bg-white/75 px-4 py-4 shadow-[0_14px_40px_rgba(25,33,44,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                Monthly
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {priceNote}
              </p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Same thread
            </p>
          </div>
        </div>

        {!session ? (
          <form className="mt-5 space-y-4" onSubmit={handlePrepareCheckout}>
            <label className="block">
              <span className="mb-3 block text-center text-sm font-semibold text-slate-700">
                Confirm your mobile number
              </span>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(555) 555-5555"
                value={phoneInput}
                onChange={(event) => setPhoneInput(formatUsPhoneInput(event.target.value))}
                className="w-full rounded-[1.6rem] border border-[#d7c29f]/45 bg-white/92 px-4 py-4 text-center text-2xl font-semibold tracking-[-0.04em] text-slate-900 shadow-[0_18px_50px_rgba(25,33,44,0.05)] outline-none transition focus:border-brand-jade focus:ring-4 focus:ring-brand-jade/10 sm:text-3xl [font-family:var(--font-serif)]"
              />
            </label>

            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1.5 text-xs font-medium text-slate-500">
                <Sparkles className="h-3.5 w-3.5 text-brand-jade" />
                {hasSmsLinkedPhone
                  ? "We pulled this from your Zoe link"
                  : "Use the number you've been texting Zoe from"}
              </span>
            </div>

            {error ? (
              <div className="flex items-start gap-3 rounded-[1.4rem] border border-rose-200 bg-rose-50/95 px-4 py-3 text-sm text-rose-800">
                <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isPreparing}
              className={clsx(
                "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white transition-transform duration-200",
                isPreparing
                  ? "cursor-wait bg-slate-500"
                  : "bg-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.14)] hover:scale-[1.01] hover:bg-slate-800 active:scale-[0.99]"
              )}
            >
              {isPreparing ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Locating thread...
                </>
              ) : (
                <>
                  {hasSmsLinkedPhone ? "Continue with this number" : "Find my thread"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="mt-5 rounded-[1.6rem] border border-[#e8dcc7]/70 bg-white/78 px-4 py-4 shadow-[0_18px_50px_rgba(25,33,44,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                  Same Zoe thread
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {displayPhone}
                </p>
              </div>
              <button
                type="button"
                onClick={resetPhoneFlow}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <RefreshCcw className="h-4 w-4" />
                Edit
              </button>
            </div>

            <AnimatePresence initial={false}>
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={revealTransition}
                className="mt-5"
              >
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: session.clientSecret,
                    appearance,
                  }}
                >
                  <EmbeddedPaymentForm
                    phone={session.phone}
                    priceLabel={planLabel}
                  />
                </Elements>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5">
            <LockKeyhole className="h-3.5 w-3.5 text-brand-jade" />
            Encrypted
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-cyan" />
            Cancel anytime
          </span>
        </div>
      </div>
    </div>
  );
}

function EmbeddedPaymentForm({
  phone,
  priceLabel,
}: {
  phone: string;
  priceLabel: string | null;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is still loading. Give it a moment and try again.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const returnUrl = new URL("/thanks", window.location.origin);
    returnUrl.searchParams.set("phone", phone);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl.toString(),
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "Unable to confirm payment.");
      setIsSubmitting(false);
      return;
    }

    window.location.assign(returnUrl.toString());
  }

  return (
    <motion.form
      className="space-y-5"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={revealTransition}
    >
      <PaymentElement options={{ layout: "tabs" }} />

      {error ? (
        <div className="flex items-start gap-3 rounded-[1.4rem] border border-rose-200 bg-rose-50/95 px-4 py-3 text-sm text-rose-800">
          <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className={clsx(
          "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold text-white transition-transform duration-200",
          !stripe || !elements || isSubmitting
            ? "cursor-not-allowed bg-slate-500"
            : "bg-brand-jade shadow-[0_10px_30px_rgba(0,194,146,0.28)] hover:scale-[1.01] hover:bg-[#00a87d] active:scale-[0.99]"
        )}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Confirming payment...
          </>
        ) : (
          <>
            Keep my thread going
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm font-medium text-slate-500">
        {priceLabel ?? "Your monthly Zoe plan"}.
      </p>
    </motion.form>
  );
}
