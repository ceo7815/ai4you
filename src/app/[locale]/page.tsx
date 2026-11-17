import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor, siteUrl } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { HeroVisual } from "@/components/r/hero-visual";
import { AccentText } from "@/components/r/accent";
import {
  ContactSection,
  ControlSection,
  ExperienceSection,
  FaqSection,
  HowSection,
  LastingSection,
  MidCta,
  OwnershipSection,
  ServicesSection,
  VideoBand,
  WithWithoutSection,
} from "@/components/r/sections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
    alternates: alternatesFor(locale as Locale, "/"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: `${siteUrl}/${locale}`,
      type: "website",
      images: ["/og.jpg"],
    },
    twitter: { card: "summary_large_image", title: t("homeTitle"), description: t("homeDescription"), images: ["/og.jpg"] },
  };
}

export default async function HomePage() {
  const t = await getTranslations();
  const labels = Object.fromEntries(serviceSlugs.map((s) => [s, t(`services.${s}.name`)]));
  const faq = t.raw("home.faq") as { q: string; a: string }[];

  return (
    <>
      <section data-hero className="r-hero" aria-labelledby="h-hero">
        <div className="r-wrap r-hero-grid">
          <div className="r-hero-copy">
            <h1 id="h-hero" className="r-h1">
              <AccentText value={t("home.hero.headline")} />
            </h1>
            <p className="r-hero-sub">{t("home.hero.subline")}</p>
            <div className="r-hero-btns">
              <a href="#contact-form" className="r-btn r-btn-primary">
                {t("cta.letsTalk")} <ArrowRight size={18} className="rtl:-scale-x-100" aria-hidden />
              </a>
              <a href="#services" className="r-btn r-btn-glass">
                {t("nav.services")}
              </a>
            </div>
          </div>
          <HeroVisual labels={labels} caption={t("nav.services")} />
        </div>
      </section>
      <VideoBand />
      <ServicesSection />
      <ExperienceSection />
      <WithWithoutSection />
      <MidCta />
      <HowSection />
      <ControlSection />
      <LastingSection />
      <OwnershipSection />
      <FaqSection />
      <ContactSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AI4YOU",
            url: siteUrl,
            description: t("meta.homeDescription"),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}
