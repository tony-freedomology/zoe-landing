export function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatNorthAmericanLocal(localDigits: string) {
  const area = localDigits.slice(0, 3);
  const exchange = localDigits.slice(3, 6);
  const line = localDigits.slice(6, 10);

  if (!exchange) {
    return area;
  }

  if (!line) {
    return `(${area}) ${exchange}`;
  }

  return `(${area}) ${exchange}-${line}`;
}

export function formatWaitlistPhoneInput(value: string) {
  const digits = getPhoneDigits(value).slice(0, 15);

  if (!digits) {
    return "";
  }

  if (digits.startsWith("1") && digits.length <= 11) {
    const local = digits.slice(1);
    const formattedLocal = formatNorthAmericanLocal(local);
    return formattedLocal ? `+1 ${formattedLocal}` : "+1";
  }

  if (digits.length <= 10) {
    return formatNorthAmericanLocal(digits);
  }

  return `+${digits}`;
}

export function isWaitlistNameValid(value: string) {
  return value.trim().length > 0;
}

export function isWaitlistPhoneValid(value: string) {
  const digits = getPhoneDigits(value);
  return digits.length >= 8 && digits.length <= 15;
}

export function isWaitlistEmailValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
