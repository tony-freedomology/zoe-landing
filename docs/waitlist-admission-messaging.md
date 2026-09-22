# Controlled beta invitations — September 22, 2026

Public signup collects a place on the waitlist while Zoe invites small groups. Form, FAQ and current signup CTAs must not promise immediate access.

The backend owns the outcome. The landing proxy preserves `claimed`, `waitlisted`, and `follow_up_required`; all home-page forms render the shared `lib/signupAdmission.ts` copy. A claim means setup is queued, not completed. A wait means the signup is saved and an invitation will follow when a spot is ready. Unknown/older follow-up outcomes use neutral saved-signup wording, never pretend admission and never invent a technical failure. HTTP errors retain the existing retry/error behavior.

Consent capture, attribution and the canonical `/api/marketing/waitlist` ingress are unchanged. Church inquiries retain their own flow. The backend paired repair updates confirmation SMS/email and requires a recorded invite before the founder get-started reminder. It does not restart the retired nurture drip or expand admission.

Deploy this backward-compatible consumer before the backend produces `waitlisted`. Verify actual deployed revisions. Use mocked signup replies for browser acceptance; do not create live contacts to preview copy.
