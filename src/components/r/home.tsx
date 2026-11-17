import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, BarChart3, Box, Clock, Layers, Play, Search } from "lucide-react";
import { serviceSlugs } from "@/lib/services";
import { cardImg, caseImgs, imgProps, insightImgs } from "@/lib/redesign";
import { whatsappHref } from "@/lib/whatsapp";
import { Reveal } from "./reveal";

function ArrowBtn() {
  return (
    <span className="r-arrow" aria-hidden>
      <ArrowRight size={16} className="rtl:-scale-x-100" />
    </span>
  );
}

export async function ServicesSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <section id="services" className="r-section" aria-labelledby="h-services">
      <div className="r-wrap">
        <div className="r-split-head">
          <h2 id="h-services" className="r-h2">
            {t("r.services.title")}
          </h2>
          <p className="r-split-sub">{t("r.services.sub")}</p>
        </div>
        <Reveal>
          <ul className="r-svc-grid">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/${locale}/services/${slug}`} className="r-svc-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" {...imgProps(cardImg[slug], "(max-width: 700px) 100vw, 20vw")} />
                  <span className="r-svc-shade" aria-hidden />
                  <span className="r-svc-body">
                    <span className="r-svc-title">{t(`services.${slug}.name`)}</span>
                    <span className="r-svc-line">{t(`r.services.lines.${slug}`)}</span>
                  </span>
                  <ArrowBtn />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const howIcons = [Search, Layers, Box, Play, BarChart3];

export async function HowSection() {
  const t = await getTranslations();
  const steps = t.raw("r.how.steps") as { n: string; t: string; d: string }[];
  return (
    <section className="r-how" aria-labelledby="h-how">
      <div className="r-wrap">
        <div className="r-split-head">
          <h2 id="h-how" className="r-h2">
            {t("r.how.title")}
          </h2>
          <p className="r-split-sub">{t("r.how.sub")}</p>
        </div>
        <Reveal>
          <ol className="r-steps">
            {steps.map((step, i) => {
              const Icon = howIcons[i] ?? Search;
              return (
                <li key={step.n} className="r-step">
                  <span className="r-step-icon">
                    <Icon size={22} strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3>
                    <span className="r-step-n">{step.n}</span>
                    <span className="r-step-t">{step.t}</span>
                  </h3>
                  <p>{step.d}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export async function CasesSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  const items = t.raw("r.cases.items") as { t: string }[];
  return (
    <section className="r-section" aria-labelledby="h-cases">
      <div className="r-wrap">
        <div className="r-split-head">
          <h2 id="h-cases" className="r-h2">
            {t("r.cases.title")}
          </h2>
          <Link href={`/${locale}/case-studies`} className="r-viewall">
            {t("r.cases.all")} <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>
        <Reveal>
          <ul className="r-case-grid">
            {items.map((item, i) => (
              <li key={item.t}>
                <Link href={`/${locale}/case-studies`} className="r-case-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" {...imgProps(caseImgs[i] ?? caseImgs[0], "(max-width: 700px) 100vw, 30vw", true)} />
                  <span className="r-case-shade" aria-hidden />
                  <span className="r-case-title">{item.t}</span>
                  <ArrowBtn />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export async function InsightsSection() {
  const locale = await getLocale();
  const t = await getTranslations();
  const items = t.raw("r.insights.items") as { tag: string; t: string; min: number }[];
  return (
    <section className="r-section r-insights" aria-labelledby="h-insights">
      <div className="r-wrap">
        <div className="r-split-head">
          <h2 id="h-insights" className="r-h2">
            {t("r.insights.title")}
          </h2>
          <Link href={`/${locale}/insights`} className="r-viewall">
            {t("r.insights.all")} <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>
        <Reveal>
          <ul className="r-ins-grid">
            {items.map((item, i) => (
              <li key={item.t}>
                <Link href={`/${locale}/insights`} className="r-ins-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" {...imgProps(insightImgs[i] ?? insightImgs[0], "160px", true)} />
                  <span className="r-ins-body">
                    <span className="r-ins-tag">{item.tag}</span>
                    <span className="r-ins-title">{item.t}</span>
                    <span className="r-ins-read"><Clock size={12} aria-hidden />{t("r.insights.read", { n: String(item.min) })}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export async function TalkBand() {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <section id="talk" className="r-talk-wrap" aria-labelledby="h-talk">
      <div className="r-wrap">
        <div className="r-talk">
          <div>
            <h2 id="h-talk" className="r-h2">
              {t("r.cta.title")}
            </h2>
            <p>{t("r.cta.sub")}</p>
          </div>
          <div className="r-talk-btns">
            <Link href={`/${locale}/contact`} className="r-btn r-btn-primary">
              {t("r.cta.talk")} <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden />
            </Link>
            <a href={whatsappHref(t("whatsapp.prefill"))} className="r-btn r-btn-glass" target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph />
              {t("r.cta.wa")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.24 8.23Zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}
