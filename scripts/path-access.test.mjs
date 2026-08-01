import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const detailSource = await readFile(new URL("../components/JourneyDetailPage.tsx", import.meta.url), "utf8");
const homeSource = await readFile(new URL("../components/HomePageContent.tsx", import.meta.url), "utf8");
const apiSource = await readFile(new URL("../app/api/waitlist/route.ts", import.meta.url), "utf8");
const persistenceSource = await readFile(new URL("../lib/zoeMarketingWaitlist.ts", import.meta.url), "utf8");

test("Path detail pages do not promise an immediate start before access exists", () => {
  assert.doesNotMatch(detailSource, />\s*Start this journey\s*</);
  assert.doesNotMatch(detailSource, /Save this Path for early access/);
  assert.match(detailSource, /These Path pages are previews/);
  assert.match(detailSource, /Paths start inside Zoe after you get access/);
  assert.match(detailSource, /href="\/#waitlist"/);
  assert.match(detailSource, />\s*Join the waitlist\s*</);
});

test("existing beta users get a direct route to the real Path library", () => {
  assert.match(detailSource, /https:\/\/app\.zoe\.live\/library/);
  assert.match(detailSource, /Already have beta access\? Open your Path library\./);
});

test("waitlist handoff stays generic and does not reserve a Path", () => {
  assert.doesNotMatch(detailSource, /\?path=/);
  assert.doesNotMatch(homeSource, /requestedPath/);
  assert.doesNotMatch(homeSource, /We saved/);
  assert.doesNotMatch(apiSource, /requestedPath/);
  assert.doesNotMatch(persistenceSource, /requestedPath/);
});
