# Meta Tracking Setup

Zoe uses Meta Pixel plus the Conversions API for waitlist and pilot-request leads.

## Required Meta Assets

Meta assets configured on June 8, 2026:

- Business portfolio: `Tony Robert Allen` (`307645840354063`)
- Ad account: `Zoe` (`2353049658562247`)
- Pixel / Dataset: `Tony Robert Allen's Pixel` (`338259380940184`)

A Meta Developer app is not required for Conversions API lead tracking.

Set these environment variables in the deployed site:

```bash
NEXT_PUBLIC_META_PIXEL_ID=
META_PIXEL_ID=
META_CONVERSIONS_API_ACCESS_TOKEN=
```

Use the same Pixel ID for `NEXT_PUBLIC_META_PIXEL_ID` and `META_PIXEL_ID`.
The current production Pixel ID is `338259380940184`.

For Events Manager testing, optionally set:

```bash
META_CONVERSIONS_API_TEST_EVENT_CODE=
```

Remove the test event code before production campaign traffic.

## Deployment Status

The Zoe landing site is served by Railway. Production variables were set on June 8, 2026 for the `zoe-landing` service in the `Zoe` project `production` environment.

Current production Railway variables:

```bash
NEXT_PUBLIC_META_PIXEL_ID=338259380940184
META_PIXEL_ID=338259380940184
META_CONVERSIONS_API_ACCESS_TOKEN=<set in Railway>
```

Do not set `META_CONVERSIONS_API_TEST_EVENT_CODE` for live ad traffic.

## Conversion Behavior

The browser Pixel loads globally and sends `PageView`.

After `/api/waitlist` successfully saves a contact to GoHighLevel, Zoe sends a server-side `Lead` event to Meta CAPI. The successful client form submit also sends a browser `Lead` event with the same `eventID`, so Meta can deduplicate the browser and server events.

Meta CAPI failures are logged but do not block the user signup.

## Event Sources

Current lead sources include:

- `individuals-waitlist`
- `beta-signup`
- `short-landing-*`
- `churches-pilot:*`

Individual sources use `content_name: Zoe waitlist`. Church pilot sources use `content_name: Zoe church pilot`.

## Supervised Ads Manager Workflow

Until Marketing API access is available, use Chrome or Computer Use for Ads Manager only as a supervised operator:

- Tony must approve campaign objective, audience, budget, creative, and publish action.
- Codex can draft campaign structure, fill forms, and QA settings.
- Codex should pause before any action that starts spend, changes payment settings, or publishes a campaign.

When Tony's Meta account password/app access is fixed, Marketing API access can be revisited for read-only reporting first, then tightly scoped campaign management.

## Current Draft Campaign

A draft Meta Leads campaign exists in Ads Manager and has not been published.

- Campaign: `Zoe Waitlist Creative Test - $20/day`
- Campaign ID: `120245337854360133`
- Ad set: `US Broad - Website Lead - 4 Creative Test`
- Ad set ID: `120245337854370133`
- Starter ad ID: `120245337854350133`
- Objective: Leads
- Conversion location: Website
- Conversion event: `Lead`
- Budget: `$20/day` campaign budget
- Audience: broad United States with Advantage+ audience enabled
- Placements: Advantage+ placements enabled
- Bid strategy: highest volume

Before publishing, create or duplicate ads so there are four creatives under the ad set. Keep the campaign budget at `$20/day`; Meta will distribute spend dynamically across the four ads.

## Creative Handoff

For each of the four creatives, collect:

- Primary asset: image or video file
- Primary text
- Headline
- Optional description
- Destination URL
- CTA, usually `Sign Up` or `Learn More`

Codex can then use supervised Ads Manager control to add the four ads, review tracking, and pause for Tony's explicit approval before publishing.
