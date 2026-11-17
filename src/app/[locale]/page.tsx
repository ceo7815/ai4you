import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor, siteUrl } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { HeroVisual } from "@/components/r/hero-visual";
import { CasesSection, HowSection, InsightsSection, ServicesSection, TalkBand } from "@/components/r/home";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "r.hero" });
  return {
    title: { absolute: `${t("title")} · AI4U` },
    description: t("sub"),
    alternates: alternatesFor(locale as Locale, "/"),
    openGraph: {
      title: t("title"),
      description: t("sub"),
      url: `${siteUrl}/${locale}`,
      type: "website",
      images: ["/og.jpg"],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("sub"), images: ["/og.jpg"] },
  };
}

export default async function HomePage() {
  const t = await getTranslations();
  const labels = Object.fromEntries(serviceSlugs.map((s) => [s, t(`services.${s}.name`)]));

  return (
    <>
      <section data-hero className="r-hero" aria-labelledby="h-hero">
        <HeroVisual labels={labels} caption={t("r.hero.tiles")} />
        <div className="r-wrap r-hero-grid">
          <div className="r-hero-copy">
            <h1 id="h-hero" className="r-h1">
              {t("r.hero.title")}
            </h1>
            <p className="r-hero-sub">{t("r.hero.sub")}</p>
            <div className="r-hero-btns">
              <a href="#talk" className="r-btn r-btn-primary">
                {t("r.hero.talk")} <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden />
              </a>
              <a href="#services" className="r-btn r-btn-glass">
                {t("r.hero.explore")}
              </a>
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />
      <HowSection />
      <CasesSection />
      <InsightsSection />
      <TalkBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AI4U",
            url: siteUrl,
            description: t("r.hero.sub"),
          }),
        }}
      />
    </>
  );
}
