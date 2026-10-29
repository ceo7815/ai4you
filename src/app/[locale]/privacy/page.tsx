import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("heading"),
    robots: { index: false, follow: false },
    alternates: alternatesFor(locale as Locale, "/privacy"),
  };
}

/** 12: EN and AR copy wait on Thomas's decisions and legal review (spec 14, items 11 to 22). */
export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  return (
    <article className="container-site max-w-article pt-30 pb-20 lg:pt-40">
      <h1 className="type-h1 text-ink">{t("heading")}</h1>
      <p className="mt-6 text-lg text-muted">{t("body")}</p>
    </article>
  );
}
