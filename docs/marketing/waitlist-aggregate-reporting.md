# Waitlist Aggregate Reporting

Use this helper when preparing Zoe ads CMO briefs to compare Meta-reported website leads with confirmed beta waitlist contacts.

## Command

```bash
npm run report:waitlist -- --from 2026-06-11T00:00:00-04:00 --to 2026-06-12T00:00:00-04:00
```

Optional flags:

```bash
--source beta-signup
--source all
--segment <resend-segment-id>
--limit 100
```

Environment:

```bash
RESEND_API_KEY=...
RESEND_WAITLIST_SEGMENT_ID=...
```

The output intentionally contains aggregate counts only. It should not print names, emails, or phone numbers.

## Output

The report includes:

- reporting window;
- source and segment filters;
- Resend list/detail hydration counts;
- confirmed Resend contacts;
- unique signup event IDs;
- counts by source;
- counts by phone platform;
- Meta placeholder fields for joining with Ads Manager results;
- privacy flag confirming that PII is excluded.

## Fixture Mode

Fixture mode is for local verification without live Resend access:

```bash
node scripts/report-waitlist-aggregates.mjs \
  --fixture /tmp/waitlist-fixture.json \
  --from 2026-06-11T00:00:00-04:00 \
  --to 2026-06-12T00:00:00-04:00
```

Fixture files should be arrays of fake contact objects shaped like Resend contacts. Never put real contacts in fixtures.

## Tests

Run the fixture-based CLI tests:

```bash
npm run test:waitlist-report
```

The tests use fake contacts only. They verify date/source filtering, event ID dedupe, phone-platform buckets, aggregate-only output, and the missing-env failure path.

They also run against a local fake Resend server to verify that live-mode reporting hydrates contact detail records before reading custom properties. This matters because Resend list endpoints return only basic contact fields.

## CMO Brief Use

Use this value as `Confirmed beta signups` in the daily CMO brief:

```json
resend.confirmedContacts
```

Use this value as the best dedupe-aware count when available:

```json
resend.uniqueSignupEventIds
```

If Meta leads and confirmed contacts disagree materially, report both and investigate before making campaign decisions from Meta alone.
