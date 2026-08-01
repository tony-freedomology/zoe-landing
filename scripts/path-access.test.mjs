import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const detailSource = await readFile(new URL("../components/JourneyDetailPage.tsx", import.meta.url), "utf8");
const homeSource = await readFile(new URL("../components/HomePageContent.tsx", import.meta.url), "utf8");
const apiSource = await readFile(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8");
const persistenceSource = await readFile(new URL("../lib/zoeMarketingWaitlist.ts", import.meta.url), "utf8");

test("Path detail pages do not promise an immediate start before access exists", () => {
  assert.doesNotMatch(detailSource, />\s*Start this journey\s*</);
  assert.match(detailSource, /Save this Path for early access/);
  assert.match(detailSource, /does not start the Path today/);
  assert.match(detailSource, /\?path=\$\{encodeURIComponent\(journey\.slug\)\}#waitlist/);
});

test("existing beta users get a direct route to the real Path library", () => {
  assert.match(detailSource, /https:\/\/app\.zoe\.live\/library/);
  assert.match(detailSource, /Already have beta access\? Open your Path library\./);
});

test("waitlist handoff keeps and confirms the requested Path", () => {
  assert.match(homeSource, /new URLSearchParams\(window\.location\.search\)\.get\("path"\)/);
  assert.match(homeSource, /requestedPath: requestedPath\?\.slug/);
  assert.match(homeSource, /you don't need to sign up again/);
  assert.match(apiSource, /requestedPath: body\.requestedPath/);
  assert.match(persistenceSource, /requestedPath: input\.requestedPath/);
});
