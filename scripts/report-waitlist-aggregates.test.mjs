#!/usr/bin/env node

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const scriptPath = new URL("./report-waitlist-aggregates.mjs", import.meta.url).pathname;

async function runReport(args, env = {}) {
  return execFileAsync(process.execPath, [scriptPath, ...args], {
    env: {
      PATH: process.env.PATH,
      ...env,
    },
  });
}

async function withFixture(contacts, fn) {
  const dir = await mkdtemp(join(tmpdir(), "zoe-waitlist-report-"));
  const fixturePath = join(dir, "contacts.json");

  try {
    await writeFile(fixturePath, JSON.stringify(contacts), "utf8");
    return await fn(fixturePath);
  } finally {
    await rm(dir, { force: true, recursive: true });
  }
}

async function withFakeResendServer(fn) {
  const detailContacts = new Map(
    fakeContacts.map((contact) => [
      contact.id,
      {
        ...contact,
        email: `${contact.id}@example.test`,
      },
    ])
  );

  const server = createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");

    if (request.url.startsWith("/segments/segment_1/contacts")) {
      response.end(
        JSON.stringify({
          data: Array.from(detailContacts.values()).map(({ id, email, created_at }) => ({
            id,
            email,
            created_at,
          })),
          has_more: false,
        })
      );
      return;
    }

    if (request.url.startsWith("/contacts/")) {
      const id = decodeURIComponent(request.url.split("/contacts/")[1]);
      const contact = detailContacts.get(id);
      if (!contact) {
        response.statusCode = 404;
        response.end(JSON.stringify({ message: "Not found" }));
        return;
      }

      response.end(JSON.stringify(contact));
      return;
    }

    response.statusCode = 404;
    response.end(JSON.stringify({ message: "Not found" }));
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  try {
    return await fn(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

const fakeContacts = [
  {
    id: "contact_1",
    created_at: "2026-06-11T14:00:00Z",
    properties: {
      source: "beta-signup",
      phone_platform: "iphone",
      signup_event_id: "evt_1",
      joined_at: "2026-06-11T14:00:00Z",
    },
  },
  {
    id: "contact_2",
    created_at: "2026-06-11T15:00:00Z",
    properties: {
      source: "beta-signup",
      phone_platform: "android",
      signup_event_id: "evt_2",
      joined_at: "2026-06-11T15:00:00Z",
    },
  },
  {
    id: "contact_3",
    created_at: "2026-06-11T16:00:00Z",
    properties: {
      source: "beta-signup",
      phone_platform: "android",
      signup_event_id: "evt_2",
      joined_at: "2026-06-11T16:00:00Z",
    },
  },
  {
    id: "contact_4",
    created_at: "2026-06-11T17:00:00Z",
    properties: {
      source: "churches-start",
      phone_platform: "",
      signup_event_id: "evt_3",
      joined_at: "2026-06-11T17:00:00Z",
    },
  },
  {
    id: "contact_5",
    created_at: "2026-06-12T17:00:00Z",
    properties: {
      source: "beta-signup",
      phone_platform: "iphone",
      signup_event_id: "evt_4",
      joined_at: "2026-06-12T17:00:00Z",
    },
  },
];

await withFixture(fakeContacts, async (fixturePath) => {
  const { stdout } = await runReport([
    "--fixture",
    fixturePath,
    "--from",
    "2026-06-11T00:00:00Z",
    "--to",
    "2026-06-12T00:00:00Z",
  ]);
  const report = JSON.parse(stdout);

  assert.equal(report.resend.confirmedContacts, 3);
  assert.equal(report.resend.uniqueSignupEventIds, 2);
  assert.deepEqual(report.resend.bySource, { "beta-signup": 3 });
  assert.deepEqual(report.resend.byPhonePlatform, {
    iphone: 1,
    android: 2,
    unknown: 0,
  });
  assert.equal(report.privacy.piiIncluded, false);
  assert.ok(!stdout.includes("@"));
});

await withFixture(fakeContacts, async (fixturePath) => {
  const { stdout } = await runReport([
    "--fixture",
    fixturePath,
    "--source",
    "all",
    "--from",
    "2026-06-11T00:00:00Z",
    "--to",
    "2026-06-12T00:00:00Z",
  ]);
  const report = JSON.parse(stdout);

  assert.equal(report.resend.confirmedContacts, 4);
  assert.equal(report.resend.uniqueSignupEventIds, 3);
  assert.deepEqual(report.resend.bySource, {
    "beta-signup": 3,
    "churches-start": 1,
  });
  assert.deepEqual(report.resend.byPhonePlatform, {
    iphone: 1,
    android: 2,
    unknown: 1,
  });
});

await withFakeResendServer(async (baseUrl) => {
  const { stdout } = await runReport(
    [
      "--from",
      "2026-06-11T00:00:00Z",
      "--to",
      "2026-06-12T00:00:00Z",
    ],
    {
      RESEND_API_KEY: "test_key",
      RESEND_WAITLIST_SEGMENT_ID: "segment_1",
      RESEND_BASE_URL: baseUrl,
    }
  );
  const report = JSON.parse(stdout);

  assert.equal(report.hydration.listed, 5);
  assert.equal(report.hydration.hydrated, 5);
  assert.equal(report.resend.confirmedContacts, 3);
  assert.equal(report.resend.uniqueSignupEventIds, 2);
  assert.deepEqual(report.resend.bySource, { "beta-signup": 3 });
  assert.ok(!stdout.includes("@"));
});

try {
  await runReport([
    "--from",
    "2026-06-11T00:00:00Z",
    "--to",
    "2026-06-12T00:00:00Z",
  ]);
  assert.fail("Expected missing RESEND_API_KEY to fail");
} catch (error) {
  assert.equal(error.code, 1);
  assert.match(error.stderr, /RESEND_API_KEY is required/);
}

console.log("waitlist aggregate report tests passed");
