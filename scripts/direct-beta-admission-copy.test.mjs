import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const primary = readFileSync(new URL("../components/HomePageContent.tsx", import.meta.url), "utf8");
const homeWaitlist = readFileSync(new URL("../components/home/HomeWaitlist.tsx", import.meta.url), "utf8");
const short = readFileSync(new URL("../components/HomePageContentShort.tsx", import.meta.url), "utf8");
const footer = readFileSync(new URL("../components/Footer.tsx", import.meta.url), "utf8");
const landingRoute = readFileSync(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8");
const backendClient = readFileSync(new URL("../lib/zoeMarketingWaitlist.ts", import.meta.url), "utf8");
const defaultShortSurface = short.slice(short.indexOf('if (variant === "default")'), short.lastIndexOf("\n  return ("));
const currentAccessSurfaces = [
  "../app/about/page.tsx",
  "../app/blog/can-ai-help-you-walk-with-jesus/page.tsx",
  "../app/brand-facts/page.tsx",
  "../app/faq/page.tsx",
  "../app/guides/best-discipleship-apps-2026/page.tsx",
  "../app/guides/christian-ai-tools/page.tsx",
  "../app/guides/sms-discipleship/page.tsx",
  "../app/journeys/page.tsx",
  "../components/BlogArticleShell.tsx",
  "../components/HomePageContent.tsx",
  "../components/home/HomeWaitlist.tsx",
  "../components/HomePageContentShort.tsx",
  "../components/JourneyDetailPage.tsx",
].map((path) => readFileSync(new URL(path, import.meta.url), "utf8"));

test("signup surfaces describe the waitlist and share receipt-based confirmation copy", () => {
  for (const source of [primary, homeWaitlist, short]) {
    assert.match(source, /Join the waitlist/);
    assert.match(source, /signupConfirmation\(status\)\.body/);
    assert.doesNotMatch(source, /couldn't start automatically|start right away/);
  }
  assert.match(footer, />Join the waitlist</);
});

test("direct admission keeps the canonical consent-safe signup ingress", () => {
  for (const source of [primary, homeWaitlist, short]) {
    assert.match(source, /fetch\("\/api\/waitlist"/);
    assert.match(source, /timezone: Intl\.DateTimeFormat\(\)\.resolvedOptions\(\)\.timeZone/);
  }

  for (const source of [primary, homeWaitlist]) {
    assert.match(source, /I agree to receive recurring automated texts from Zoe/);
    assert.match(source, /smsConsent: smsConsentAgreed/);
    assert.match(source, /phonePlatform !== "" &&\s+smsConsentAgreed/);
  }
  assert.match(homeWaitlist, /href="\/privacy"/);
  assert.match(homeWaitlist, /href="\/terms"/);
  assert.match(homeWaitlist, /source: "individuals-waitlist"/);
  assert.match(short, /I agree to receive recurring texts from Zoe/);
  assert.match(backendClient, /data\.admissionStatus === "waitlisted"/);
  assert.match(landingRoute, /admissionStatus = contact\.admissionStatus/);
  assert.match(landingRoute, /typeTag === "individuals" && typeof body\.smsConsent !== "boolean"/);
  assert.match(landingRoute, /smsConsent: body\.smsConsent/);
  assert.doesNotMatch(landingRoute, /body\.smsConsent \?\?/);


});

test("current public access copy does not promise immediate admission", () => {
  for (const source of currentAccessSurfaces) {
    assert.doesNotMatch(source, /start right away|Join now and Zoe will text/i);
  }
});
