import { routing, type Locale } from "@/i18n/routing";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Canonical and hreflang alternates for a locale-agnostic path such as "/" or "/about". */
export function alternatesFor(locale: Locale, path: string) {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${siteUrl}/${l}${suffix}`;
  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${suffix}`;
  return {
    canonical: `${siteUrl}/${locale}${suffix}`,
    languages,
  };
}
