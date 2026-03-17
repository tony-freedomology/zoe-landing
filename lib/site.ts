export const SITE_URL = "https://zoe.live";

export function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
