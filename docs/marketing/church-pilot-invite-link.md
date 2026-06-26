# Church Pilot Invite Link

Use this link for Tony's known church pilot group:

```text
https://zoe.live/church-pilot
```

The same flow also works with the explicit invite-code URL:

```text
https://zoe.live/s?invite=church-pilot
```

Both render the normal beta signup form with church-pilot copy. Submissions still require SMS consent and flow through the existing `/api/waitlist` route.

CRM/source behavior:

- landing source: `churches-pilot:church-pilot`
- backend source: `churches-waitlist`
- signup path: `churches`
- exact link context is preserved in `metadata.landingSource`

This keeps church people separate from ad leads without creating a bypass around consent, CRM capture, Resend sync, or the waitlist signup ledger.
