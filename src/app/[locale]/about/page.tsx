import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { serviceIcons, type ServiceSlug } from "@/lib/services";
import { CtaPanel } from "@/components/ui/cta-panel";
import { heroArt } from "@/lib/media";

type Item = { title: string; text: string };
type What = Item & { slug: ServiceSlug };
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("about"), alternates: alternatesFor(locale as Locale, "/about") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return null;
  const t = await getTranslations();
  const what = t.raw("about.what") as What[];
  const why = t.raw("about.why") as Item[];

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image src={heroArt} alt="" fill className="object-cover opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-paper/75" />
        </div>
        <div className="container-site relative pt-30 pb-6 lg:pt-40">
        <h1 data-reveal className="type-h1 text-ink">
          {t("about.heading")}
        </h1>
        <p data-reveal style={{ ["--i" as string]: 1 }} className="mt-6 max-w-text text-lg text-muted">
          {t("about.paragraph")}
        </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <h2 data-reveal className="type-h2 text-ink">
            {t("about.whatTitle")}
          </h2>
          <ul className="mt-10 grid gap-4 lg:grid-cols-2">
            {what.map((item, i) => {
              const Icon = serviceIcons[item.slug];
              return (
                <li key={item.slug} data-reveal style={{ ["--i" as string]: i }}>
                  <a href={`/${locale}/services/${item.slug}`} className="group flex h-full flex-col rounded-3xl border border-line p-6 transition-[translate,border-color] duration-200 hover:-translate-y-1 hover:border-accent-500 lg:p-8">
                    <span className="grid size-10 place-items-center rounded-full bg-accent-50 text-accent-700">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 text-muted">{item.text}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
                      {t("cta.details")}
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-site">
          <h2 data-reveal className="type-h2 text-ink">
            {t("about.whyTitle")}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((item, i) => (
              <li key={item.title} data-reveal style={{ ["--i" as string]: i }} className="rounded-3xl bg-paper p-6">
                <span aria-hidden className="mb-4 block size-2 rounded-full bg-accent-500" />
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel heading={t("about.ctaHeading")} line={t("about.ctaLine")} />
    </>
  );
}
