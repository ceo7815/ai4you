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
      servicesLabel={t("nav.services")}
      services={serviceSlugs.map((slug) => ({ href: p(`/services/${slug}`), label: t(`services.${slug}.name`) }))}
      links={[
        { href: p("/how-we-work"), label: t("nav.howWeWork") },
        { href: p("/about"), label: t("nav.about") },
        { href: p("/blog"), label: t("nav.blog") },
      ]}
      talk={t("cta.letsTalk")}
      langEn={t("nav.languageEn")}
      langAr={t("nav.languageAr")}
      menu={locale === "ar" ? "القائمة" : "Menu"}
      close={locale === "ar" ? "إغلاق" : "Close"}
      contactHref={p("/contact")}
      siteName={t("meta.siteName")}
    />
  );
}
