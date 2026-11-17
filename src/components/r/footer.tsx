import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { serviceSlugs } from "@/lib/services";
import { Logo } from "./logo";
import { LangSwitch } from "./lang-switch";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations();
  const p = (path: string) => `/${locale}${path === "/" ? "" : path}`;
  const year = new Date().getFullYear();

  const links = [
    { href: p("/"), label: t("r.nav.home") },
    ...serviceSlugs.map((slug) => ({ href: p(`/services/${slug}`), label: t(`services.${slug}.name`) })),
    { href: p("/case-studies"), label: t("r.nav.caseStudies") },
    { href: p("/insights"), label: t("r.nav.insights") },
    { href: p("/about"), label: t("r.nav.about") },
  ];

  return (
    <footer className="r-footer">
      <div className="r-wrap r-footer-top">
        <Link href={p("/")} aria-label="AI4U" className="r-logo-link r-footer-logo">
          <Logo id="ft" />
        </Link>
        <nav aria-label="AI4U" className="r-footer-nav">
          <ul>
            {links.map((it) => (
              <li key={it.href}>
                <Link href={it.href}>{it.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="r-footer-side">
          <p className="r-footer-social" aria-label={t("r.footer.social")}>
            <span className="r-soc" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.05c.53-1 1.84-2.1 3.79-2.1 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24h-4z"/></svg>
            </span>
            <span className="r-soc" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
            </span>
            <span className="r-soc" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </span>
          </p>
          <LangSwitch locale={locale} langEn={t("nav.languageEn")} langAr={t("nav.languageAr")} className="r-lang r-footer-lang-wrap" />
        </div>
      </div>
      <div className="r-wrap r-footer-bar">
        <span dir="ltr">© {year} AI4U. {t("r.footer.rights")}</span>
        <span className="r-footer-links">
          <Link href={p("/privacy")}>{t("r.footer.privacy")}</Link>
          <span aria-hidden>|</span>
          <span>{t("r.footer.terms")}</span>
        </span>
      </div>
    </footer>
  );
}
