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
  PencilLine,
} from "lucide-react";
import {
  formatUsPhoneDisplay,
  formatUsPhoneInput,
  normalizeIndividualBillingPlan,
  normalizeSubscribeFlowMode,
  normalizeUsPhoneInput,
  type IndividualBillingPlan,
  type SubscribeFlowMode,
} from "../lib/subscribe";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const appearance = {
  variables: {
    colorPrimary: "#00c292",
    colorBackground: "#ffffff",
    colorText: "#1c2433",
    colorTextPlaceholder: "#8d94a5",
    colorDanger: "#b64855",
    colorSuccess: "#00c292",
    borderRadius: "12px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid rgba(28, 36, 51, 0.12)",
      boxShadow: "none",
      padding: "16px",
      fontSize: "16px",
      backgroundColor: "#ffffff",
    },
    ".Input:focus": {
      border: "1px solid #00c292",
      boxShadow: "0 0 0 4px rgba(0, 194, 146, 0.10)",
    },
    ".Tab": {
      border: "1px solid rgba(28, 36, 51, 0.10)",
      boxShadow: "none",
      backgroundColor: "#f8f7f3",
    },
    ".Tab--selected": {
      borderColor: "#00c292",
      color: "#1c2433",
      backgroundColor: "#ffffff",
    },
    ".Label": {
      color: "#1c2433",
      fontWeight: "500",
      marginBottom: "8px",
    },
    ".Block": {
      backgroundColor: "#ffffff",
      boxShadow: "none",
    },
    ".Error": {
      color: "#b64855",
    },
  },
};

type SubscribeSession = {
  clientSecret: string;
  customerId: string;
  subscriptionId: string;
  phone: string;
  plan: IndividualBillingPlan;
  trialDays: number;
  price: {
    amountCents: number | null;
    currency: string;
    interval: string;
  };
};

type SubscribeExperienceProps = {
  initialPhone?: string;
  initialPlan?: string;
  initialMode?: string;
  canceled?: boolean;
};

const PLAN_OPTIONS: Array<{
  id: IndividualBillingPlan;
  label: string;
  price: string;
  cadence: string;
  badge?: string;
}> = [
  { id: "month", label: "Monthly", price: "$7", cadence: "/month" },
  { id: "year", label: "Annual", price: "$70", cadence: "/year", badge: "Save 17%" },
];

const revealTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export default function SubscribeExperience({
  initialPhone = "",
  initialPlan = "month",
  initialMode = "subscribe",
  canceled = false,
}: SubscribeExperienceProps) {
  const initialNormalizedPhone = normalizeUsPhoneInput(initialPhone);
  const initialBillingPlan = normalizeIndividualBillingPlan(initialPlan);
  const flowMode = normalizeSubscribeFlowMode(initialMode);
  const [phoneInput, setPhoneInput] = useState(() => formatUsPhoneInput(initialPhone));
  const [selectedPlan, setSelectedPlan] = useState<IndividualBillingPlan>(initialBillingPlan);
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
  const hasSmsLinkedPhone = !!initialNormalizedPhone;
  const activePlan = session?.plan ?? selectedPlan;
  const numberEyebrow = session
    ? "Same thread"
    : flowMode === "reactivate"
      ? "Welcome back"
      : "Confirm your number";
  const numberHelper = session
    ? displayPhone
    : hasSmsLinkedPhone
      ? flowMode === "reactivate"
        ? "We found your Zoe number."
        : "From your Zoe text."
      : flowMode === "reactivate"
        ? "Use the same number you used with Zoe before."
        : "Use the number you text Zoe from.";
  const reassuranceCopy =
    flowMode === "reactivate"
      ? "Cancel anytime via text. Your same thread will keep going."
      : "Cancel anytime via text. Secure and encrypted.";

  useEffect(() => {
    if (!hasSmsLinkedPhone || canceled || autoStartedRef.current) return;
    if (session || isPreparing || configError || !initialNormalizedPhone) return;

    autoStartedRef.current = true;
    void prepareCheckout(initialNormalizedPhone, selectedPlan);
  }, [
    canceled,
    configError,
    hasSmsLinkedPhone,
    initialNormalizedPhone,
    isPreparing,
    selectedPlan,
    session,
  ]);

  async function prepareCheckout(phone: string, plan: IndividualBillingPlan) {
    setIsPreparing(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, plan }),
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
        `/subscribe?phone=${encodeURIComponent(payload.phone)}&plan=${encodeURIComponent(plan)}&mode=${encodeURIComponent(flowMode)}`
      );

      startTransition(() => {
        setSelectedPlan((payload.plan as IndividualBillingPlan | undefined) ?? plan);
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

    await prepareCheckout(normalizedInputPhone, selectedPlan);
  }

  function resetPhoneFlow() {
    setSession(null);
    setError(null);
    autoStartedRef.current = true;
  }

  function handlePlanChange(plan: IndividualBillingPlan) {
    if (isPreparing) return;
    if (plan === activePlan && (!session || session.plan === plan)) return;

    setSelectedPlan(plan);

    if (session?.phone) {
      void prepareCheckout(session.phone, plan);
    }
  }

  return (
    <motion.section
      layout
      transition={revealTransition}
      className="relative overflow-hidden rounded-t-[2rem] bg-white px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 shadow-[0_-28px_80px_rgba(28,36,51,0.11)] sm:mb-8 sm:rounded-[2rem] sm:border sm:border-white/70 sm:px-6 sm:pb-6 sm:pt-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,249,245,1))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,194,146,0.22),transparent)]" />

      <motion.div layout transition={revealTransition} className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1c2433]/36">
              {numberEyebrow}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={session ? "session-phone" : "phone-help"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={revealTransition}
                className="mt-2 text-sm font-medium leading-6 text-[#1c2433]/64"
              >
                {numberHelper}
              </motion.p>
            </AnimatePresence>
          </div>

          {session ? (
            <button
              type="button"
              onClick={resetPhoneFlow}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-[#1c2433]/54 transition hover:bg-[#f5f4f0] hover:text-[#1c2433]"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </button>
          ) : null}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {!session ? (
            <motion.form
              key="phone"
              layout
              className="mt-6 space-y-4"
              onSubmit={handlePrepareCheckout}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={revealTransition}
            >
              <PlanToggle
                selectedPlan={activePlan}
                isPreparing={isPreparing}
                onSelect={handlePlanChange}
              />

              <label className="block">
                <span className="sr-only">Phone number</span>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  value={phoneInput}
                  onChange={(event) => setPhoneInput(formatUsPhoneInput(event.target.value))}
                  className="w-full rounded-[1.4rem] border border-[#1c2433]/10 bg-[#fbfaf7] px-4 py-4 text-center text-[1.85rem] font-semibold tracking-[-0.055em] text-[#1c2433] outline-none transition focus:border-brand-jade focus:bg-white focus:ring-4 focus:ring-brand-jade/10 [font-family:var(--font-sans)] sm:text-[2.1rem]"
                />
              </label>

              {error ? (
                <div className="flex items-start gap-3 rounded-[1.2rem] bg-[#f7ebed] px-4 py-3 text-sm text-[#8f3441]">
                  <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isPreparing}
                className={clsx(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-base font-semibold text-white transition",
                  isPreparing
                    ? "cursor-wait bg-[#627070]"
                    : "bg-brand-jade shadow-[0_16px_34px_rgba(0,194,146,0.26)] hover:bg-[#00ae84] active:scale-[0.995]"
                )}
              >
                {isPreparing ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Just a second
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="payment"
              layout
              className="mt-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={revealTransition}
            >
              <PlanToggle
                selectedPlan={activePlan}
                isPreparing={isPreparing}
                onSelect={handlePlanChange}
              />

              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: session.clientSecret,
                  appearance,
                }}
              >
                <EmbeddedPaymentForm phone={session.phone} mode={flowMode} />
              </Elements>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 text-center text-xs font-medium text-[#1c2433]/42">
          {reassuranceCopy}
        </p>
      </motion.div>
    </motion.section>
  );
}

function EmbeddedPaymentForm({
  phone,
  mode,
}: {
  phone: string;
  mode: SubscribeFlowMode;
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
    returnUrl.searchParams.set("mode", mode);

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
      className="mt-4 space-y-5"
      onSubmit={handleSubmit}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={revealTransition}
    >
      <PaymentElement options={{ layout: "tabs" }} />

      {error ? (
        <div className="flex items-start gap-3 rounded-[1.2rem] bg-[#f7ebed] px-4 py-3 text-sm text-[#8f3441]">
          <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className={clsx(
          "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-base font-semibold text-white transition",
          !stripe || !elements || isSubmitting
            ? "cursor-not-allowed bg-[#627070]"
            : "bg-brand-jade shadow-[0_16px_34px_rgba(0,194,146,0.26)] hover:bg-[#00ae84] active:scale-[0.995]"
        )}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Confirming payment...
          </>
        ) : (
          <>
            Keep walking
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.form>
  );
}

function PlanToggle({
  selectedPlan,
  isPreparing,
  onSelect,
}: {
  selectedPlan: IndividualBillingPlan;
  isPreparing: boolean;
  onSelect: (plan: IndividualBillingPlan) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {PLAN_OPTIONS.map((option) => {
        const selected = option.id === selectedPlan;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            disabled={isPreparing}
            className={clsx(
              "relative rounded-[1.2rem] border px-4 py-3 text-left transition",
              selected
                ? "border-brand-jade bg-brand-jade/5 shadow-[0_8px_24px_rgba(0,194,146,0.08)]"
                : "border-[#1c2433]/10 bg-white/80 hover:border-[#1c2433]/18 hover:bg-[#fbfaf7]",
              isPreparing && "cursor-wait opacity-70"
            )}
          >
            {option.badge ? (
              <span className="absolute right-3 top-3 rounded-full bg-brand-jade px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                {option.badge}
              </span>
            ) : null}

            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c2433]/42">
              {option.label}
            </p>
            <div className="mt-2 flex items-end gap-1 text-[#1c2433]">
              <span className="text-[1.65rem] font-semibold tracking-[-0.05em]">
                {option.price}
              </span>
              <span className="pb-1 text-sm font-medium text-[#1c2433]/56">
                {option.cadence}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
