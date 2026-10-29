import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { whatsappHref } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/ui/button";
import { ContactForm, type FormCopy } from "@/components/forms/contact-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale });
  return { title: t("contact.heading"), description: t("contact.paragraph"), alternates: alternatesFor(locale as Locale, "/contact") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return null;
  const t = await getTranslations();
  const after = t.raw("contact.after") as { title: string; text: string }[];
  const form: FormCopy = {
    name: t("form.fullName"),
    phone: t("form.phone"),
    prefix: t("form.phonePrefix"),
    business: t("form.business"),
    interest: t("form.interest"),
    notSure: t("form.notSure"),
    message: t("form.message"),
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
    <section className="container-site pt-30 pb-16 lg:pt-40 lg:pb-24">
      <h1 data-reveal className="type-h1 max-w-text text-ink">
        {t("contact.heading")}
      </h1>
      <p data-reveal style={{ ["--i" as string]: 1 }} className="mt-6 max-w-text text-lg text-muted">
        {t("contact.paragraph")}
      </p>
      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm copy={form} locale={locale} withMessage />
        </div>
        <aside className="lg:col-span-5">
          <h2 className="type-h2 text-ink">{t("contact.afterTitle")}</h2>
          <ol className="mt-6 grid gap-5">
            {after.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sm text-accent-700">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-3xl bg-sand p-6">
            <p className="font-semibold text-ink">{t("contact.talkTitle")}</p>
            <WhatsAppButton href={whatsappHref(t("whatsapp.prefill"))} block className="mt-4">
              {t("cta.whatsapp")}
            </WhatsAppButton>
            <ul className="mt-5 grid gap-2 text-sm text-muted">
              <li>
                {t("contact.phoneLabel")}: {t("ui.phone")}
              </li>
              <li>
                {t("contact.emailLabel")}: {t("ui.email")}
              </li>
              <li>
                {t("contact.officeLabel")}: {t("ui.office")}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
