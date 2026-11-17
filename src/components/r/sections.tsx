import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Headset, LifeBuoy, ShieldCheck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { serviceSlugs } from "@/lib/services";
import { whatsappHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ContactForm, type FormCopy } from "@/components/forms/contact-form";
import { cardImg, imgProps } from "@/lib/redesign";
import { AccentText } from "./accent";
import { ControlSwitches } from "./control";
import { FaqList } from "./faq";
import { Reveal } from "./reveal";
import { WithWithout } from "./with-without";

export async function ServicesSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <section className="r-section" id="services" aria-labelledby="h-services">
      <div className="r-wrap">
        <Reveal className="r-head">
          <h2 id="h-services" className="r-h2">
            {t("home.services.heading")}
          </h2>
        </Reveal>
        <ul className="r-svc-grid">
          {serviceSlugs.map((slug, i) => (
            <Reveal as="li" key={slug} delay={i * 70}>
              <Link href={`/${locale}/services/${slug}`} className="r-svc-card">
                <img
                  {...imgProps(cardImg[slug], "(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 92vw")}
                  alt=""
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="r-svc-shade" aria-hidden />
                <span className="r-svc-body">
                  <span className="r-svc-title">{t(`services.${slug}.name`)}</span>
                  <span className="r-svc-line">{t(`services.${slug}.line`)}</span>
                </span>
                <span className="r-arrow" aria-hidden>
                  <ArrowRight size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function VideoBand() {
  const t = await getTranslations();
  return (
    <section className="r-video-band" aria-labelledby="h-video">
      <div className="r-wrap">
        <Reveal className="r-video-frame">
          <div className="r-video-poster" aria-hidden />
          <p id="h-video" className="r-video-label">
            <span className="r-ping" aria-hidden />
            {t("video.label")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export async function ExperienceSection() {
  const t = await getTranslations();
  return (
    <section className="r-section r-section-tint" aria-labelledby="h-exp">
      <div className="r-wrap r-exp">
        <Reveal>
          <h2 id="h-exp" className="r-h2 r-exp-h">
            {t("home.experience.heading")}
          </h2>
          <p className="r-lead r-exp-lead">{t("home.experience.line")}</p>
        </Reveal>
      </div>
    </section>
  );
}

export async function WithWithoutSection() {
  const t = await getTranslations();
  return (
    <WithWithout
      heading={t("home.withWithout.heading")}
      withoutLabel={t("home.withWithout.without")}
      withLabel={t("home.withWithout.with")}
      rows={t.raw("home.withWithout.rows") as { without: string; with: string }[]}
    />
  );
}

export async function MidCta() {
  const t = await getTranslations();
  return (
    <section className="r-section r-mid-cta-section" aria-labelledby="h-mid">
      <div className="r-wrap">
        <Reveal className="r-mid-cta">
          <h2 id="h-mid" className="r-h2">
            {t("home.midCta.heading")}
          </h2>
          <p className="r-lead">{t("home.midCta.line")}</p>
          <a href="#contact-form" className="r-btn r-btn-primary">
            {t("cta.letsTalk")} <ArrowRight size={18} className="rtl:-scale-x-100" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export async function HowSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  const steps = t.raw("howWeWork.steps") as { title: string; text: string }[];
  return (
    <section className="r-section" id="how" aria-labelledby="h-how">
      <div className="r-wrap">
        <Reveal className="r-head r-head-row">
          <div>
            <h2 id="h-how" className="r-h2">
              {t("home.process.heading")}
            </h2>
          </div>
          <Link href={`/${locale}/how-we-work`} className="r-link">
            {t("cta.seeAllSteps")} <ArrowRight size={18} className="rtl:-scale-x-100" aria-hidden />
          </Link>
        </Reveal>
        <ol className="r-steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70} className="r-step-wrap">
              <div className="r-step">
                <span className="r-step-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              {i < steps.length - 1 && <span className="r-step-dots" aria-hidden />}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export async function ControlSection() {
  const t = await getTranslations();
  const labels = t.raw("home.control.toggles") as string[];
  return (
    <section className="r-section r-section-tint" aria-labelledby="h-control">
      <div className="r-wrap r-split">
        <Reveal>
          <h2 id="h-control" className="r-h2">
            {t("home.control.heading")}
          </h2>
          <p className="r-lead">{t("home.control.line")}</p>
        </Reveal>
        <Reveal delay={120}>
          <ControlSwitches labels={labels} />
        </Reveal>
      </div>
    </section>
  );
}

const lastingIcons = [GraduationCap, ShieldCheck, Check, Headset] as const;

export async function LastingSection() {
  const t = await getTranslations();
  const items = t.raw("home.lasting.items") as string[];
  return (
    <section className="r-section" aria-labelledby="h-lasting">
      <div className="r-wrap">
        <Reveal className="r-head">
          <h2 id="h-lasting" className="r-h2">
            {t("home.lasting.heading")}
          </h2>
        </Reveal>
        <ul className="r-lasting">
          {items.map((item, i) => {
            const Icon = lastingIcons[i] ?? LifeBuoy;
            return (
              <Reveal as="li" key={item} delay={i * 70}>
                <div className="r-lasting-card">
                  <span className="r-lasting-icon">
                    <Icon size={22} strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3>{item}</h3>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export async function OwnershipSection() {
  const t = await getTranslations();
  return (
    <section className="r-section r-own-section" aria-labelledby="h-own">
      <div className="r-wrap">
        <Reveal className="r-own">
          <h2 id="h-own" className="r-h1 r-h1-sm">
            <AccentText value={t("home.ownership.heading")} />
          </h2>
          <p className="r-lead r-own-lead">{t("home.ownership.line")}</p>
        </Reveal>
      </div>
    </section>
  );
}

export async function FaqSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  const items = t.raw("home.faq") as { q: string; a: string }[];
  return (
    <section className="r-section r-section-tint" aria-labelledby="h-faq">
      <div className="r-wrap r-faq-wrap">
        <Reveal className="r-head">
          <h2 id="h-faq" className="r-h2">
            {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
          </h2>
        </Reveal>
        <Reveal>
          <FaqList items={items} />
        </Reveal>
      </div>
    </section>
  );
}

export async function ContactSection() {
  const locale = await getLocale();
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
    <section className="r-section" id="contact" aria-labelledby="h-contact">
      <div className="r-wrap">
        <Reveal className="r-head">
          <h2 id="h-contact" className="r-h2">
            {t("home.finalCta.heading")}
          </h2>
        </Reveal>
        <div className="r-contact-grid">
          <Reveal className="r-form-card">
            <ContactForm copy={form} locale={locale} withMessage />
          </Reveal>
          <Reveal delay={100} className="r-contact-side">
            <h3 className="r-side-h">{t("contact.talkTitle")}</h3>
            <a href={whatsappHref(t("whatsapp.prefill"))} target="_blank" rel="noopener" className="r-btn r-btn-glass r-btn-wide">
              <WhatsAppIcon width={18} height={18} /> {t("cta.whatsapp")}
            </a>
            <h3 className="r-side-h r-side-h-2">{t("contact.afterTitle")}</h3>
            <ol className="r-after">
              {after.map((step, i) => (
                <li key={step.title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{step.title}</p>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
