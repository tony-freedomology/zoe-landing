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
    colorPrimary: "#1dc286",
    colorBackground: "#ffffff",
    colorText: "#2d3231",
    colorTextPlaceholder: "#8d94a5",
    colorDanger: "#b64855",
    colorSuccess: "#1dc286",
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
      border: "1px solid #1dc286",
      boxShadow: "0 0 0 4px rgba(0, 194, 146, 0.10)",
    },
    ".Tab": {
      border: "1px solid rgba(28, 36, 51, 0.10)",
      boxShadow: "none",
      backgroundColor: "#f8f7f3",
    },
    ".Tab--selected": {
      borderColor: "#1dc286",
      color: "#2d3231",
      backgroundColor: "#ffffff",
    },
    ".Label": {
      color: "#2d3231",
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
  { id: "month", label: "Monthly", price: "$10", cadence: "/month" },
  { id: "year", label: "Annual", price: "$99", cadence: "/year", badge: "Save $21" },
];

const BETA_PLAN_OPTIONS: typeof PLAN_OPTIONS = [
  { id: "beta", label: "Beta", price: "$7", cadence: "/month", badge: "30% off for life" },
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
  const isBetaRate = initialBillingPlan === "beta";
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
    isBetaRate
      ? "Your beta-tester thank-you discount stays with this subscription. Cancel anytime via text."
      : flowMode === "reactivate"
      ? "Cancel anytime via text. Your same thread will keep going."
      : "Cancel anytime via text. Secure and encrypted.";
  const planOptions = isBetaRate ? BETA_PLAN_OPTIONS : PLAN_OPTIONS;

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

      const resolvedPlan = payload.plan ?? plan;
      if (plan === "beta" && resolvedPlan !== "beta") {
        throw new Error("This beta discount link is not available yet. Please try again shortly or text Zoe for help.");
      }
      if (plan === "year" && resolvedPlan !== "year") {
        throw new Error("Annual checkout is not available yet. Please try again shortly or choose monthly.");
      }

      window.history.replaceState(
        {},
        "",
        `/subscribe?phone=${encodeURIComponent(payload.phone)}&plan=${encodeURIComponent(plan)}&mode=${encodeURIComponent(flowMode)}`
      );

      startTransition(() => {
        setSelectedPlan(resolvedPlan);
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
      className="relative overflow-hidden rounded-t-[2rem] bg-white px-5 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-4 shadow-[0_-24px_70px_rgba(28,28,25,0.10)] sm:mb-8 sm:rounded-[2rem] sm:border sm:border-white/70 sm:px-6 sm:pb-6 sm:pt-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,249,245,1))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(29,194,134,0.22),transparent)]" />

      <motion.div layout transition={revealTransition} className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2d3231]/36">
              {numberEyebrow}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={session ? "session-phone" : "phone-help"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={revealTransition}
                className="mt-2 text-sm font-medium leading-6 text-[#2d3231]/64"
              >
                {numberHelper}
              </motion.p>
            </AnimatePresence>
          </div>

          {session ? (
            <button
              type="button"
              onClick={resetPhoneFlow}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-[#2d3231]/54 transition hover:bg-[#f5f4f0] hover:text-[#2d3231]"
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
              className="mt-4 space-y-3"
              onSubmit={handlePrepareCheckout}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={revealTransition}
            >
              <PlanToggle
                options={planOptions}
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
                  className="w-full rounded-[1.35rem] border border-[#2d3231]/10 bg-[#fbfaf7] px-4 py-3.5 text-center text-[1.72rem] font-semibold tracking-[-0.055em] text-[#2d3231] outline-none transition focus:border-zoe-leaf focus:bg-white focus:ring-4 focus:ring-zoe-leaf/10 [font-family:var(--font-sans)] sm:rounded-[1.4rem] sm:px-4 sm:py-4 sm:text-[2.1rem]"
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
                  "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold text-white transition sm:py-4",
                  isPreparing
                    ? "cursor-wait bg-[#627070]"
                    : "bg-zoe-leaf shadow-[0_16px_34px_rgba(29,194,134,0.26)] hover:bg-[#1dc286] active:scale-[0.995]"
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
              className="mt-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={revealTransition}
            >
              <PlanToggle
                options={planOptions}
                selectedPlan={activePlan}
                isPreparing={isPreparing}
                onSelect={handlePlanChange}
              />

              <Elements
                key={session.clientSecret}
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

        <p className="mt-4 text-center text-[11px] font-medium text-[#2d3231]/42 sm:mt-5 sm:text-xs">
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
      className="mt-3 space-y-4 sm:mt-4 sm:space-y-5"
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
          "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold text-white transition sm:py-4",
          !stripe || !elements || isSubmitting
            ? "cursor-not-allowed bg-[#627070]"
            : "bg-zoe-leaf shadow-[0_16px_34px_rgba(29,194,134,0.26)] hover:bg-[#1dc286] active:scale-[0.995]"
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
  options,
  selectedPlan,
  isPreparing,
  onSelect,
}: {
  options: typeof PLAN_OPTIONS;
  selectedPlan: IndividualBillingPlan;
  isPreparing: boolean;
  onSelect: (plan: IndividualBillingPlan) => void;
}) {
  return (
    <div className={clsx("grid gap-2", options.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
      {options.map((option) => {
        const selected = option.id === selectedPlan;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            disabled={isPreparing}
            className={clsx(
              "relative rounded-[1.15rem] border px-4 py-2.5 text-left transition sm:rounded-[1.2rem] sm:py-3",
              selected
                ? "border-zoe-leaf bg-zoe-leaf/5 shadow-[0_8px_24px_rgba(29,194,134,0.08)]"
                : "border-[#2d3231]/10 bg-white/80 hover:border-[#2d3231]/18 hover:bg-[#fbfaf7]",
              isPreparing && "cursor-wait opacity-70"
            )}
          >
            {option.badge ? (
              <span className="absolute right-2.5 top-2.5 rounded-full bg-zoe-leaf px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:right-3 sm:top-3">
                {option.badge}
              </span>
            ) : null}

            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2d3231]/42">
              {option.label}
            </p>
            <div className="mt-1.5 flex items-end gap-1 text-[#2d3231] sm:mt-2">
              <span className="text-[1.52rem] font-semibold tracking-[-0.05em] sm:text-[1.65rem]">
                {option.price}
              </span>
              <span className="pb-0.5 text-[13px] font-medium text-[#2d3231]/56 sm:pb-1 sm:text-sm">
                {option.cadence}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
