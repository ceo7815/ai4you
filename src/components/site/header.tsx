import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { serviceSlugs } from "@/lib/services";
import { whatsappHref } from "@/lib/whatsapp";
import { buttonClasses, WhatsAppButton } from "@/components/ui/button";
import { DesktopNav } from "./desktop-nav";
import { HeaderShell } from "./header-shell";
import { LangSwitch } from "./lang-switch";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

/** 6.1 / 3: 64px phone (logo, small Let's talk, menu), 72px desktop (logo, links, switch, Let's talk). */
export async function Header() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const p = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  const services = serviceSlugs.map((slug) => ({
    slug,
    href: p(`/services/${slug}`),
    name: t(`services.${slug}.name`),
  }));
  const aboutItems = [
    { href: p("/how-we-work"), label: t("nav.howWeWork") },
    { href: p("/about"), label: t("nav.about") },
    { href: p("/blog"), label: t("nav.blog") },
  ];
  const navItems = services.map((service) => ({ href: service.href, label: service.name, ltr: true }));
  const langLabels = { en: t("nav.languageEn"), ar: t("nav.languageAr") };

  return (
    <HeaderShell>
      <div className="site-header-bar pointer-events-auto relative flex h-16 w-full items-center justify-between gap-3 px-4 lg:h-18 lg:gap-6 lg:px-8">
        <Link href={p("/")} className="-mx-1 inline-flex h-11 shrink-0 items-center px-1" aria-label={t("meta.siteName")}>
          <Wordmark />
        </Link>

        <DesktopNav items={navItems} aboutLabel={t("nav.aboutUs")} aboutItems={aboutItems} label={t("meta.siteName")} />

        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          <LangSwitch locale={locale} labels={langLabels} className="hidden min-[80rem]:inline-flex" />
            <Link
              href={p("/contact")}
              className={buttonClasses({
                size: "sm",
                className: "header-cta h-12 px-6 font-display tracking-[-0.012em] shadow-[0_0_28px_-6px_rgb(10_108_255_/_0.9)] ar:tracking-normal",
              })}
            >
              {t("cta.letsTalk")}
            </Link>
            <div className="min-[80rem]:hidden">
              <MobileMenu
                openLabel={t("ui.openMenu")}
                closeLabel={t("ui.closeMenu")}
                services={services}
                aboutLabel={t("nav.aboutUs")}
                links={aboutItems}
                footer={
                <div className="flex flex-col gap-3">
                  <WhatsAppButton href={whatsappHref(t("whatsapp.prefill"))} block>
                    {t("cta.whatsapp")}
                  </WhatsAppButton>
                  <LangSwitch locale={locale} labels={langLabels} className="self-center" />
                </div>
              }
            />
            </div>
        </div>
      </div>
    </HeaderShell>
  );
}
