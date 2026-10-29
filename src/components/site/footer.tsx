import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { serviceSlugs } from "@/lib/services";
import { whatsappHref } from "@/lib/whatsapp";
import { LangSwitch } from "./lang-switch";
import { Wordmark } from "./wordmark";

const linkCls = "inline-flex min-h-11 items-center text-[0.9375rem] text-muted transition-colors hover:text-ink";

/** 5 / 6.14: services · company · blog · contact · privacy · language · contact details [TBC] · licence [TBC] · © */
export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const p = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  return (
    <footer className="relative z-10 border-t border-line bg-transparent">
      <div className="container-site grid gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Link href={p("/")} className="inline-flex h-11 items-center" aria-label={t("meta.siteName")}>
            <Wordmark />
          </Link>
          <p className="mt-4 max-w-xs text-[0.9375rem] text-muted">{t("home.experience.heading")}</p>
        </div>

        <nav aria-label={t("nav.services")} className="lg:col-span-3">
          <p className="type-label text-faint">{t("nav.services")}</p>
          <ul className="mt-3">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={p(`/services/${slug}`)} className={linkCls} dir="ltr">
                  {t(`services.${slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("meta.siteName")} className="lg:col-span-2">
          <ul className="mt-0 lg:mt-7">
            <li>
              <Link href={p("/how-we-work")} className={linkCls}>
                {t("nav.howWeWork")}
              </Link>
            </li>
            <li>
              <Link href={p("/about")} className={linkCls}>
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link href={p("/blog")} className={linkCls}>
                {t("nav.blog")}
              </Link>
            </li>
            <li>
              <Link href={p("/contact")} className={linkCls}>
                {t("cta.letsTalk")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <ul className="lg:mt-7">
            <li>
              <a href={whatsappHref(t("whatsapp.prefill"))} target="_blank" rel="noopener" className={linkCls}>
                {t("cta.whatsapp")}
              </a>
            </li>
            <li className={linkCls}>{t("ui.phone")}</li>
            <li className={linkCls}>{t("ui.email")}</li>
            <li className={linkCls}>{t("ui.office")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span dir="ltr">{t("ui.rights")} {new Date().getFullYear()}</span>
            <span>{t("ui.licence")}</span>
            <Link href={p("/privacy")} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
              {t("ui.privacy")}
            </Link>
          </div>
          <LangSwitch locale={locale} labels={{ en: t("nav.languageEn"), ar: t("nav.languageAr") }} />
        </div>
      </div>
    </footer>
  );
}
