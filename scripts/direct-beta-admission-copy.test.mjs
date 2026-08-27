import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const primary = readFileSync(new URL("../components/HomePageContent.tsx", import.meta.url), "utf8");
const short = readFileSync(new URL("../components/HomePageContentShort.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/Footer.tsx", import.meta.url), "utf8");
const landingRoute = readFileSync(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8");
const backendClient = readFileSync(new URL("../lib/zoeMarketingWaitlist.ts", import.meta.url), "utf8");
const defaultShortSurface = short.slice(short.indexOf('if (variant === "default")'), short.lastIndexOf("\n  return ("));

test("default signup surfaces promise direct beta admission without waitlist copy", () => {
  for (const source of [primary, short]) {
    assert.match(source, /Join the beta/);
    assert.match(source, /Zoe will text you during daytime hours/);
  }

  assert.doesNotMatch(primary, /Join the waitlist|spots open up|You're on the list/);
  assert.doesNotMatch(defaultShortSurface, /Apply for the beta|Spots are limited|You're on the beta list/);
  assert.match(footer, />Join the beta</);
});

test("direct admission keeps the canonical consent-safe signup ingress", () => {
  for (const source of [primary, short]) {
    assert.match(source, /fetch\("\/api\/waitlist"/);
    assert.match(source, /timezone: Intl\.DateTimeFormat\(\)\.resolvedOptions\(\)\.timeZone/);
  }

  assert.match(primary, /I agree to receive recurring automated texts from Zoe/);
  assert.match(primary, /smsConsent: smsConsentAgreed/);
  assert.match(primary, /phonePlatform !== "" &&\s+smsConsentAgreed/);
  assert.match(short, /I agree to receive recurring texts from Zoe/);
  assert.match(backendClient, /data\.admissionStatus === "claimed" \? "claimed" : "follow_up_required"/);
  assert.match(landingRoute, /admissionStatus = contact\.admissionStatus/);
  assert.match(landingRoute, /typeTag === "individuals" && typeof body\.smsConsent !== "boolean"/);
  assert.match(landingRoute, /smsConsent: body\.smsConsent/);
  assert.doesNotMatch(landingRoute, /body\.smsConsent \?\?/);
  assert.match(primary, /status === "admitted" \? "You're in\." : "We got your details\."/);
  assert.match(short, /status === "admitted" \? "You're in\." : "We got your details\."/);
});
