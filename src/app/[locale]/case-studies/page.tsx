import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { caseImgs, imgProps } from "@/lib/redesign";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "r.pages" });
  return { title: t("casesTitle"), alternates: alternatesFor(locale as Locale, "/case-studies") };
}

export default async function CaseStudiesPage() {
  const t = await getTranslations();
  const items = t.raw("r.cases.items") as { t: string }[];
  return (
    <section className="r-section r-page">
      <div className="r-wrap">
        <h1 className="r-h2">{t("r.pages.casesTitle")}</h1>
        <ul className="r-case-grid r-page-grid">
          {items.map((item, i) => (
            <li key={item.t}>
              <article className="r-case-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" {...imgProps(caseImgs[i] ?? caseImgs[0], "(max-width: 700px) 100vw, 30vw", true)} />
                <span className="r-case-shade" aria-hidden />
                <span className="r-case-title">{item.t}</span>
                <span className="r-arrow" aria-hidden>
                  <ArrowRight size={16} className="rtl:-scale-x-100" />
                </span>
              </article>
            </li>
          ))}
        </ul>
        <p className="r-page-back">
          <Link href="./">{t("r.nav.home")}</Link>
        </p>
      </div>
    </section>
  );
}
