import { getLocale, getTranslations } from "next-intl/server";
import { serviceSlugs } from "@/lib/services";
import { SiteHeader } from "./site-header";

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations();
  const p = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  return (
    <SiteHeader
      locale={locale}
      items={[
        { href: p("/"), label: t("r.nav.home") },
        ...serviceSlugs.map((slug) => ({ href: p(`/services/${slug}`), label: t(`services.${slug}.name`) })),
        { href: p("/case-studies"), label: t("r.nav.caseStudies") },
        { href: p("/insights"), label: t("r.nav.insights") },
        { href: p("/about"), label: t("r.nav.about") },
      ]}
      talk={t("r.nav.letsTalk")}
      langEn={t("nav.languageEn")}
      langAr={t("nav.languageAr")}
      menu={t("r.nav.menu")}
      close={t("r.nav.close")}
      contactHref={p("/contact")}
      siteName="AI4U"
    />
  );
}
