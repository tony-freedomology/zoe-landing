#!/usr/bin/env node

const RESEND_BASE_URL = process.env.RESEND_BASE_URL || "https://api.resend.com";
const DEFAULT_SOURCE = "beta-signup";
const DEFAULT_LIMIT = 100;

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args[key] = value;
    i += 1;
  }

  return args;
}

function readOptions() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = args.segment || process.env.RESEND_WAITLIST_SEGMENT_ID;
  const source = args.source || DEFAULT_SOURCE;
  const from = args.from ? new Date(args.from) : startOfToday();
  const to = args.to ? new Date(args.to) : new Date();
  const includeAllSources = args.source === "all";

  if (!apiKey && !args.fixture) {
    throw new Error("RESEND_API_KEY is required");
  }

  if (!segmentId && !args.fixture) {
    throw new Error("RESEND_WAITLIST_SEGMENT_ID or --segment is required");
  }

  if (Number.isNaN(from.getTime())) {
    throw new Error("--from must be a valid date/time");
  }

  if (Number.isNaN(to.getTime())) {
    throw new Error("--to must be a valid date/time");
  }

  if (from >= to) {
    throw new Error("--from must be before --to");
  }

  return {
    apiKey,
    segmentId,
    source,
    includeAllSources,
    from,
    to,
    limit: Number(args.limit || DEFAULT_LIMIT),
    fixture: args.fixture,
  };
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

async function resendGet(path, apiKey, query = {}) {
  const url = new URL(path, RESEND_BASE_URL);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "User-Agent": "zoe-ads-aggregate-metrics/1.0",
    },
  });

  const raw = await response.text();
  let data = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = { message: raw };
    }
  }

  if (!response.ok) {
    const message = data?.message || response.statusText || "Unknown Resend error";
    const error = new Error(`Resend request failed (${response.status}): ${message}`);
    error.status = response.status;
    error.path = path;
    throw error;
  }

  return data;
}

function getContactProperties(contact) {
  return contact?.properties || contact?.custom_properties || {};
}

function hasContactProperties(contact) {
  const properties = getContactProperties(contact);
  return Object.keys(properties).length > 0;
}

function getJoinedAt(contact) {
  const properties = getContactProperties(contact);
  return (
    properties.joined_at ||
    properties.joinedAt ||
    contact.created_at ||
    contact.createdAt ||
    null
  );
}

function getSource(contact) {
  const properties = getContactProperties(contact);
  return properties.source || contact.source || "unknown";
}

function getPhonePlatform(contact) {
  const properties = getContactProperties(contact);
  const value = String(properties.phone_platform || properties.phonePlatform || "").toLowerCase();
  if (value === "iphone" || value === "android") return value;
  return "unknown";
}

function getSignupEventId(contact) {
  const properties = getContactProperties(contact);
  return properties.signup_event_id || properties.signupEventId || null;
}

function normalizeListResponse(data) {
  if (Array.isArray(data)) return { contacts: data, hasMore: false, cursor: null };
  if (Array.isArray(data?.data)) {
    return {
      contacts: data.data,
      hasMore: Boolean(data.has_more || data.hasMore),
      cursor: data.next || data.next_cursor || data.nextCursor || lastId(data.data),
    };
  }
  if (Array.isArray(data?.contacts)) {
    return {
      contacts: data.contacts,
      hasMore: Boolean(data.has_more || data.hasMore),
      cursor: data.next || data.next_cursor || data.nextCursor || lastId(data.contacts),
    };
  }

  return { contacts: [], hasMore: false, cursor: null };
}

function lastId(items) {
  const last = items[items.length - 1];
  return last?.id || null;
}

async function listSegmentContacts(options) {
  const contacts = [];
  let after = null;
  let page = 0;
  const maxPages = 100;

  while (page < maxPages) {
    page += 1;
    const data = await resendGet(
      `/segments/${encodeURIComponent(options.segmentId)}/contacts`,
      options.apiKey,
      { limit: options.limit, after }
    );
    const normalized = normalizeListResponse(data);
    contacts.push(...normalized.contacts);

    if (!normalized.hasMore || !normalized.cursor || normalized.cursor === after) {
      break;
    }

    after = normalized.cursor;
  }

  return contacts;
}

async function listContactsFallback(options) {
  const contacts = [];
  let after = null;
  let page = 0;
  const maxPages = 100;

  while (page < maxPages) {
    page += 1;
    const data = await resendGet("/contacts", options.apiKey, {
      limit: options.limit,
      after,
      segment_id: options.segmentId,
    });
    const normalized = normalizeListResponse(data);
    contacts.push(...normalized.contacts);

    if (!normalized.hasMore || !normalized.cursor || normalized.cursor === after) {
      break;
    }

    after = normalized.cursor;
  }

  return contacts;
}

async function listWaitlistContacts(options) {
  try {
    return await listSegmentContacts(options);
  } catch (error) {
    if (error.status !== 404 && error.status !== 405) {
      throw error;
    }

    return listContactsFallback(options);
  }
}

async function hydrateContact(contact, options) {
  if (hasContactProperties(contact)) {
    return contact;
  }

  const lookup = contact?.id || contact?.email;
  if (!lookup) {
    throw new Error("Resend contact detail hydration failed: one listed contact had no id");
  }

  return resendGet(`/contacts/${encodeURIComponent(lookup)}`, options.apiKey);
}

async function hydrateContacts(contacts, options) {
  const hydrated = [];
  let alreadyDetailed = 0;

  for (const contact of contacts) {
    if (hasContactProperties(contact)) {
      alreadyDetailed += 1;
    }

    hydrated.push(await hydrateContact(contact, options));
  }

  return {
    contacts: hydrated,
    stats: {
      listed: contacts.length,
      hydrated: contacts.length - alreadyDetailed,
      alreadyDetailed,
    },
  };
}

function inWindow(contact, from, to) {
  const joinedAt = getJoinedAt(contact);
  if (!joinedAt) return false;
  const joined = new Date(joinedAt);
  if (Number.isNaN(joined.getTime())) return false;
  return joined >= from && joined < to;
}

function emptyCountMap() {
  return Object.create(null);
}

function increment(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function summarizeContacts(contacts, options) {
  const bySource = emptyCountMap();
  const byPhonePlatform = {
    iphone: 0,
    android: 0,
    unknown: 0,
  };
  const eventIds = new Set();

  let confirmedContacts = 0;

  for (const contact of contacts) {
    if (!inWindow(contact, options.from, options.to)) continue;

    const source = getSource(contact);
    if (!options.includeAllSources && source !== options.source) continue;

    confirmedContacts += 1;
    increment(bySource, source);
    byPhonePlatform[getPhonePlatform(contact)] += 1;

    const eventId = getSignupEventId(contact);
    if (eventId) eventIds.add(eventId);
  }

  return {
    confirmedContacts,
    uniqueSignupEventIds: eventIds.size,
    confirmationEmailsSent: null,
    duplicatesOrUpdates: null,
    bySource,
    byPhonePlatform,
  };
}

function buildReport(options, contacts, hydrationStats = null) {
  const resend = summarizeContacts(contacts, options);

  return {
    window: {
      from: options.from.toISOString(),
      to: options.to.toISOString(),
    },
    filters: {
      source: options.includeAllSources ? "all" : options.source,
      segment: options.segmentId,
    },
    hydration: hydrationStats,
    resend,
    meta: {
      websiteLeads: null,
    },
    delta: {
      metaMinusConfirmed: null,
      status: "meta_unavailable",
    },
    privacy: {
      piiIncluded: false,
      note: "This report intentionally includes aggregate counts only.",
    },
  };
}

async function main() {
  const options = readOptions();
  const listedContacts = options.fixture
    ? JSON.parse(await import("node:fs/promises").then((fs) => fs.readFile(options.fixture, "utf8")))
    : await listWaitlistContacts(options);
  const { contacts, stats } = options.fixture
    ? { contacts: listedContacts, stats: { listed: listedContacts.length, hydrated: 0, alreadyDetailed: listedContacts.length } }
    : await hydrateContacts(listedContacts, options);
  const report = buildReport(options, contacts, stats);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
