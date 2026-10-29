import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { isServiceSlug, serviceSlugs } from "@/lib/services";

type Props = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => serviceSlugs.map((category) => ({ locale, category })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceSlug(category)) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t(`${category}.name`), alternates: alternatesFor(locale as Locale, `/blog/category/${category}`) };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceSlug(category)) notFound();
  const t = await getTranslations();

  return (
    <section className="container-site pt-30 pb-20 lg:pt-40">
      <p className="type-label text-accent-700">
        <a href={`/${locale}/blog`}>{t("nav.blog")}</a>
      </p>
      <h1 dir="ltr" className="type-h1 mt-4 text-start text-ink rtl:text-end">
        {t(`services.${category}.name`)}
      </h1>
      <p className="mt-8 max-w-text text-lg text-muted">{t("blog.empty")}</p>
    </section>
  );
}
