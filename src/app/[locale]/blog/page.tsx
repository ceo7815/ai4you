import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("heading"), alternates: alternatesFor(locale as Locale, "/blog") };
}

/** 11: no articles until keyword research (spec 14, item 25). Categories link onward. */
export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return null;
  const t = await getTranslations();

  return (
    <section className="container-site pt-30 pb-20 lg:pt-40">
      <h1 data-reveal className="type-h1 text-ink">
        {t("blog.heading")}
      </h1>
      <ul className="mt-8 flex gap-2 overflow-x-auto scroll-row pb-2">
        {serviceSlugs.map((slug) => (
          <li key={slug} className="shrink-0">
            <a
              href={`/${locale}/blog/category/${slug}`}
              dir="ltr"
              className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium text-muted transition-colors hover:border-accent-500 hover:text-accent-700"
            >
              {t(`services.${slug}.name`)}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-16 max-w-text text-lg text-muted">{t("blog.empty")}</p>
    </section>
  );
}
