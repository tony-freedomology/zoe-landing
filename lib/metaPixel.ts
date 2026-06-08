type Fbq = (
  command: "track",
  eventName: "Lead",
  parameters?: Record<string, unknown>,
  options?: { eventID?: string }
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

function fallbackEventId(): string {
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createMetaEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return fallbackEventId();
}

export function trackMetaLead(eventId: string, source: string): void {
  if (typeof window === "undefined" || !window.fbq) {
    return;
  }

  window.fbq(
    "track",
    "Lead",
    {
      content_name: source.startsWith("churches") ? "Zoe church pilot" : "Zoe waitlist",
      content_category: source,
    },
    { eventID: eventId }
  );
}
