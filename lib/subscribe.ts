type PublicPrice = {
  amountCents: number | null;
  currency: string;
  interval: string;
};

export type IndividualBillingPlan = "month" | "year";
export type SubscribeFlowMode = "subscribe" | "reactivate";

export function normalizeIndividualBillingPlan(
  value: string | undefined | null
): IndividualBillingPlan {
  return value === "year" ? "year" : "month";
}

export function normalizeSubscribeFlowMode(
  value: string | undefined | null
): SubscribeFlowMode {
  return value === "reactivate" ? "reactivate" : "subscribe";
}

export function normalizeUsPhoneInput(value: string | undefined | null): string | null {
  if (!value) return null;

  const digits = value.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

export function formatUsPhoneInput(value: string): string {
  const rawDigits = value.replace(/\D/g, '').slice(0, 11);
  const digits =
    rawDigits.length > 10 && rawDigits.startsWith('1')
      ? rawDigits.slice(1)
      : rawDigits.slice(0, 10);

  if (!digits) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function formatUsPhoneDisplay(value: string | undefined | null): string {
  const normalized = normalizeUsPhoneInput(value);
  if (!normalized) return value ?? '';
  const digits = normalized.slice(2);
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

export function formatRecurringPrice(price: PublicPrice | null | undefined): string | null {
  if (!price || price.amountCents === null) return null;

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency.toUpperCase()
  }).format(price.amountCents / 100);

  return `${formatted}/${price.interval}`;
}

export function getZoeApiBaseUrl(): string {
  return (process.env.ZOE_API_BASE_URL ?? 'https://api.zoe.live').replace(/\/+$/, '');
}
