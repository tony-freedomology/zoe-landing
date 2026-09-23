// Destinations shared by the /churches sections.

/** Every "Start a pilot" CTA on /churches goes to the pilot intake form. */
export const PILOT_HREF = "/churches/start";

const dashboardUrl = process.env.NEXT_PUBLIC_CHURCH_DASHBOARD_URL ?? "https://church.zoe.live";

/** Church admin login for pilot churches (church dashboard). */
export const CHURCH_LOGIN_HREF = `${dashboardUrl}/login`;
