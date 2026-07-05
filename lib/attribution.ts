const FIRST_TOUCH_KEY = "zoe_first_touch";
const LAST_TOUCH_KEY = "zoe_last_touch";
const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type AttributionParamKey = (typeof ATTRIBUTION_PARAM_KEYS)[number];
type AttributionParams = Partial<Record<AttributionParamKey, string>>;

type StoredAttribution = {
  params: AttributionParams;
  landingPath: string;
  capturedAt: string;
};

function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function hasParams(params: AttributionParams) {
  return ATTRIBUTION_PARAM_KEYS.some((key) => Boolean(params[key]));
}

function pickAttributionParams(search: string): AttributionParams {
  const searchParams = new URLSearchParams(search);
  return ATTRIBUTION_PARAM_KEYS.reduce<AttributionParams>((params, key) => {
    const value = searchParams.get(key)?.trim();
    if (value) {
      params[key] = value;
    }
    return params;
  }, {});
}

function isExpired(capturedAt: string) {
  const capturedAtMs = Date.parse(capturedAt);
  return !Number.isFinite(capturedAtMs) || Date.now() - capturedAtMs > ATTRIBUTION_TTL_MS;
}

function readStoredAttribution(key: string): StoredAttribution | null {
  const storage = getLocalStorage();
  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredAttribution>;
    if (!parsed.params || !parsed.capturedAt || isExpired(parsed.capturedAt) || !hasParams(parsed.params)) {
      storage.removeItem(key);
      return null;
    }

    return {
      params: parsed.params,
      landingPath: typeof parsed.landingPath === "string" ? parsed.landingPath : "",
      capturedAt: parsed.capturedAt,
    };
  } catch {
    try {
      storage.removeItem(key);
    } catch {}
    return null;
  }
}

function writeStoredAttribution(key: string, record: StoredAttribution) {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(key, JSON.stringify(record));
  } catch {}
}

export function captureFirstTouch() {
  if (typeof window === "undefined" || !getLocalStorage()) {
    return;
  }

  const params = pickAttributionParams(window.location.search);
  if (!hasParams(params)) {
    return;
  }

  const record: StoredAttribution = {
    params,
    landingPath: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    capturedAt: new Date().toISOString(),
  };

  if (!readStoredAttribution(FIRST_TOUCH_KEY)) {
    writeStoredAttribution(FIRST_TOUCH_KEY, record);
  }

  writeStoredAttribution(LAST_TOUCH_KEY, record);
}

export function getAttributionParams(): AttributionParams | null {
  const firstTouch = readStoredAttribution(FIRST_TOUCH_KEY);
  const lastTouch = readStoredAttribution(LAST_TOUCH_KEY);
  const merged = {
    ...(lastTouch?.params ?? {}),
    ...(firstTouch?.params ?? {}),
  };

  return hasParams(merged) ? merged : null;
}

export function buildAttributedSourceUrl(currentHref: string) {
  const attributionParams = getAttributionParams();
  if (!attributionParams) {
    return currentHref;
  }

  try {
    const url = new URL(currentHref, typeof window !== "undefined" ? window.location.origin : undefined);
    ATTRIBUTION_PARAM_KEYS.forEach((key) => {
      const value = attributionParams[key];
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch {
    return currentHref;
  }
}
