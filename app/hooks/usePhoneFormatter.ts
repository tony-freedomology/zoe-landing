import { useState, useCallback } from 'react';
import { formatWaitlistPhoneInput } from "../../lib/waitlistValidation";

export function usePhoneFormatter(initialValue: string = '') {
  const [phone, setPhoneRaw] = useState(formatWaitlistPhoneInput(initialValue));

  const setPhone = useCallback((value: string) => {
    setPhoneRaw(formatWaitlistPhoneInput(value));
  }, []);

  return [phone, setPhone] as const;
}
