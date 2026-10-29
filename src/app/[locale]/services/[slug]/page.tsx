import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { isServiceSlug, serviceIcons, serviceSlugs, type ServiceSlug } from "@/lib/services";
import { ServiceStage } from "@/components/home/service-stage";
import { whatsappHref } from "@/lib/whatsapp";
import { buttonClasses, WhatsAppButton } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { CtaPanel } from "@/components/ui/cta-panel";
import { Steps } from "@/components/ui/steps";

type Example = { field: string; quote: string; answer: string };
type Step = { title: string; text: string };
type Faq = { q: string; a: string };

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t(`${slug}.name`),
    description: t(`${slug}.line`),
    alternates: alternatesFor(locale, `/services/${slug}`),
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isServiceSlug(slug)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const key = `servicePage.items.${slug as ServiceSlug}` as const;
  const Icon = serviceIcons[slug];
  const examples = t.raw(`${key}.examples`) as Example[];
  const steps = t.raw(`${key}.steps`) as Step[];
  const faq = t.raw(`${key}.faq`) as Faq[];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-site relative grid items-center gap-10 pt-30 pb-14 lg:grid-cols-2 lg:gap-16 lg:pt-40 lg:pb-20">
          <div>
            <p className="type-label inline-flex items-center gap-2 text-accent-700">
              <span className="grid size-8 place-items-center rounded-full bg-accent-50">
                <Icon aria-hidden className="size-4" />
              </span>
              <span dir="ltr">{t(`services.${slug}.name`)}</span>
            </p>
            <h1 className="type-h1 hero-in mt-5 text-ink">{t(`services.${slug}.line`)}</h1>
            <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "0.12s" }}>
              <a href={`/${locale}/contact`} className={buttonClasses({ size: "hero", block: true })}>
                {t("cta.letsTalk")}
              </a>
              <WhatsAppButton href={whatsappHref(t("whatsapp.prefill"))} size="hero" block>
                {t("cta.whatsapp")}
              </WhatsAppButton>
            </div>
          </div>
          <ServiceStage slug={slug} />
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-site max-w-none">
          <div className="mx-auto max-w-text">
            <h2 data-reveal className="type-label text-accent-700">
              {t("servicePage.problem")}
            </h2>
            <p data-reveal style={{ ["--i" as string]: 1 }} className="mt-4 text-xl text-ink lg:text-2xl">
              {t(`${key}.problem`)}
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-16">
          <h2 data-reveal className="type-h2 text-ink lg:col-span-5">
            {t("servicePage.build")}
          </h2>
          <p data-reveal style={{ ["--i" as string]: 1 }} className="text-lg text-muted lg:col-span-7">
            {t(`${key}.build`)}
          </p>
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-site">
          <ul className="grid gap-4 lg:grid-cols-2">
            {examples.map((ex, i) => (
              <li key={ex.field} data-reveal style={{ ["--i" as string]: i }} className="rounded-3xl border border-line bg-paper p-6 lg:p-8">
                <p className="type-label text-accent-700">{ex.field}</p>
                <blockquote className="mt-4 text-lg font-medium text-ink">“{ex.quote}”</blockquote>
                <p className="mt-4 text-[0.9375rem] text-muted">{ex.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="container-site">
          <Steps steps={steps} />
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-site">
          <div className="mx-auto max-w-narrow">
            <Accordion items={faq} defaultOpen={0} />
          </div>
        </div>
      </section>

      <CtaPanel heading={t(`${key}.ctaHeading`)} line={t(`${key}.ctaLine`)} />
    </>
  );
}
