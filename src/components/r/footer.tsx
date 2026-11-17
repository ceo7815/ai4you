import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { serviceSlugs } from "@/lib/services";
import { Logo } from "./logo";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations();
  const p = (path: string) => `/${locale}${path === "/" ? "" : path}`;
  const other = locale === "en" ? "ar" : "en";
  const year = new Date().getFullYear();

  return (
    <footer className="r-footer">
      <div className="r-wrap r-footer-grid">
        <div>
          <Link href={p("/")} aria-label={t("meta.siteName")} className="r-logo-link">
            <Logo id="ft" />
          </Link>
          <p className="r-footer-tag">{t("home.hero.subline")}</p>
        </div>
        <nav aria-label={t("nav.services")}>
          <h2 className="r-footer-h">{t("nav.services")}</h2>
          <ul>
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={p(`/services/${slug}`)}>{t(`services.${slug}.name`)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={locale === "ar" ? "الشركة" : "Company"}>
          <h2 className="r-footer-h">{locale === "ar" ? "الشركة" : "Company"}</h2>
          <ul>
            <li>
              <Link href={p("/how-we-work")}>{t("nav.howWeWork")}</Link>
            </li>
            <li>
              <Link href={p("/about")}>{t("nav.about")}</Link>
            </li>
            <li>
              <Link href={p("/blog")}>{t("nav.blog")}</Link>
            </li>
            <li>
              <Link href={p("/contact")}>{t("cta.letsTalk")}</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="r-wrap r-footer-bar">
        <span dir="ltr">© {year} AI4YOU</span>
        <span className="r-footer-links">
          <Link href={`/${other}`} hrefLang={other}>
            {other === "en" ? t("nav.languageEn") : t("nav.languageAr")}
          </Link>
          <Link href={p("/privacy")}>{locale === "ar" ? "الخصوصية" : "Privacy"}</Link>
        </span>
      </div>
    </footer>
  );
}
