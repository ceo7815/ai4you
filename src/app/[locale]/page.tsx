import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BadgeCheck, KeyRound, LifeBuoy, Users } from "lucide-react";
import { hasLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { heroArt } from "@/lib/media";
import { whatsappHref } from "@/lib/whatsapp";
import { buttonClasses, WhatsAppButton } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { CtaPanel } from "@/components/ui/cta-panel";
import { Steps } from "@/components/ui/steps";
import { ContactForm, type FormCopy } from "@/components/forms/contact-form";
import { ServiceStage } from "@/components/home/service-stage";
import { WithWithout } from "@/components/home/with-without";
import { ControlPanel } from "@/components/home/control-panel";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return { alternates: alternatesFor(locale, "/") };
}

const lastingIcons = [Users, KeyRound, BadgeCheck, LifeBuoy];

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const accent = (chunks: ReactNode) => <span className="accent-underline hero-glint">{chunks}</span>;

  const rows = t.raw("home.withWithout.rows") as { without: string; with: string }[];
  const faq = t.raw("home.faq") as { q: string; a: string }[];
  const steps = (t.raw("home.process.steps") as string[]).map((title) => ({ title }));
  const toggles = t.raw("home.control.toggles") as string[];
  const lasting = t.raw("home.lasting.items") as string[];
  const after = t.raw("contact.after") as { title: string; text: string }[];

  const form: FormCopy = {
    name: t("form.name"),
    phone: t("form.phone"),
    prefix: t("form.phonePrefix"),
    business: t("form.business"),
    interest: t("form.interest"),
    notSure: t("form.notSure"),
    note: t("form.note"),
    send: t("cta.send"),
    sending: t("form.sending"),
    errorRequired: t("form.errorRequired"),
    errorPhone: t("form.errorPhone"),
    errorServer: t("form.errorServer"),
    options: [
      ...serviceSlugs.map((slug) => ({ value: slug, label: t(`services.${slug}.name`) })),
      { value: "not-sure", label: t("form.notSure") },
    ],
    successTitle: t("contact.afterTitle"),
    success: after,
  };

  return (
    <>
      <section data-hero className="relative isolate overflow-hidden pt-24 lg:flex lg:min-h-svh lg:flex-col lg:pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <Image src={heroArt} alt="" fill priority className="hero-still object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-paper/50" />
          <div className="hero-aurora" />
        </div>
        <div className="container-site relative grid flex-1 items-end gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-x-16 lg:pb-16">
          <div>
            <h1 data-hero-title className="type-h1 hero-in relative text-ink lg:[max-inline-size:16em]">
              {t.rich("home.hero.headline", { accent })}
              <span className="hero-beam" aria-hidden />
            </h1>
            <p className="hero-in mt-5 max-w-text-sm text-lg text-muted" style={{ ["--d" as string]: "0.08s" }}>
              {t("home.hero.subline")}
            </p>
            <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "0.16s" }}>
              <a href="#contact-form" className={buttonClasses({ size: "hero", block: true })}>
                {t("cta.letsTalk")}
              </a>
              <WhatsAppButton href={whatsappHref(t("whatsapp.prefill"))} size="hero" block>
                {t("cta.whatsapp")}
              </WhatsAppButton>
            </div>
          </div>
          <ul data-hero-aside className="hero-rail">
            {serviceSlugs.map((slug, index) => (
              <li key={slug} className="relative" style={{ ["--i" as string]: index }}>
                <span className="hero-node" aria-hidden />
                <a
                  href={`/${locale}/services/${slug}`}
                  className={`group grid gap-1 border-b border-line py-4${index === 0 ? " border-t" : ""}`}
                >
                  <span dir="ltr" className="inline-flex items-center gap-2 text-start text-lg font-semibold text-ink rtl:text-end">
                    {t(`services.${slug}.name`)}
                    <ArrowRight aria-hidden className="size-4 text-faint transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                  </span>
                  <span className="text-sm text-muted">{t(`services.${slug}.line`)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex min-h-[52vh] items-center py-16 lg:py-28">
        <div className="container-site">
          <h2 data-reveal className="type-h2-cta max-w-[16ch] text-ink">
            {t("home.experience.heading")}
          </h2>
          <p data-reveal style={{ ["--i" as string]: 1 }} className="mt-6 max-w-text text-lg text-muted">
            {t("home.experience.line")}
          </p>
        </div>
      </section>

      <section className="pb-8 lg:pb-16">
        <div className="container-site">
          <div className="lg:border-x lg:border-line">
            <h2 data-reveal className="type-h2-cta border-b border-line pb-6 text-ink lg:px-8 lg:pb-10">
              {t("home.services.heading")}
            </h2>
            {serviceSlugs
              .filter((slug) => slug !== "conversational-ai")
              .map((slug, i) => (
              <article
                key={slug}
                data-reveal
                style={{ ["--i" as string]: i }}
                data-row
                className="border-b border-line"
              >
                <a
                  href={`/${locale}/services/${slug}`}
                  className="group grid items-center gap-6 py-8 outline-none focus-visible:ring-2 focus-visible:ring-accent-500 lg:grid-cols-2 lg:gap-0 lg:py-0"
                >
                  <div data-stage className={i % 2 === 1 ? "lg:order-2" : undefined}>
                    <ServiceStage slug={slug} />
                  </div>
                  <div className="flex flex-col justify-center lg:px-12 lg:py-16">
                    <h3 className="text-start font-heading text-3xl font-medium tracking-tight text-ink lg:text-4xl">
                      <span dir="ltr">{t(`services.${slug}.name`)}</span>
                    </h3>
                    <p className="mt-4 max-w-md text-lg text-muted">{t(`services.${slug}.line`)}</p>
                    <span className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-accent-700">
                      {t("cta.details")}
                      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WithWithout
        heading={t("home.withWithout.heading")}
        withoutLabel={t("home.withWithout.without")}
        withLabel={t("home.withWithout.with")}
        rows={rows}
      />

      <CtaPanel heading={t("home.midCta.heading")} line={t("home.midCta.line")} toForm />

      <section className="section-y">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 data-reveal className="type-h2 max-w-text text-ink">
              {t("home.process.heading")}
            </h2>
            <a href={`/${locale}/how-we-work`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-700">
              {t("cta.seeAllSteps")}
              <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </a>
          </div>
          <Steps steps={steps} className="mt-12" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 data-reveal className="type-h2 text-ink">
              {t("home.control.heading")}
            </h2>
            <p data-reveal style={{ ["--i" as string]: 1 }} className="mt-5 max-w-text-sm text-lg text-muted">
              {t("home.control.line")}
            </p>
          </div>
          <div className="lg:col-span-6">
            <ControlPanel labels={toggles} />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <h2 data-reveal className="type-h2 max-w-text text-ink">
            {t("home.lasting.heading")}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lasting.map((item, i) => {
              const Icon = lastingIcons[i] ?? Users;
              return (
                <li key={item} data-reveal style={{ ["--i" as string]: i }} className="rounded-3xl border border-line p-6">
                  <span className="grid size-10 place-items-center rounded-full bg-accent-50 text-accent-700">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <p className="mt-5 text-lg font-semibold text-ink">{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <h2 data-reveal className="type-h1 max-w-[16ch] text-ink">
            {t.rich("home.ownership.heading", { accent })}
          </h2>
          <p data-reveal style={{ ["--i" as string]: 1 }} className="mt-6 max-w-text text-lg text-muted">
            {t("home.ownership.line")}
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <div className="mx-auto max-w-narrow">
            <Accordion items={faq} />
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
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 data-reveal className="type-h2-cta max-w-text text-ink">
              {t("home.finalCta.heading")}
            </h2>
            <div className="mt-8">
              <ContactForm copy={form} locale={locale} />
            </div>
          </div>
          <aside className="lg:col-span-5 lg:pt-16">
            <div className="rounded-3xl border border-line bg-sand p-6 lg:p-8">
              <WhatsAppButton href={whatsappHref(t("whatsapp.prefill"))} block>
                {t("cta.whatsapp")}
              </WhatsAppButton>
              <ul className="mt-6 grid gap-2 text-sm text-muted">
                <li>{t("ui.phone")}</li>
                <li>{t("ui.email")}</li>
                <li>{t("ui.office")}</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
