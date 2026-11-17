import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { imgProps, insightImgs } from "@/lib/redesign";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "r.pages" });
  return { title: t("insightsTitle"), alternates: alternatesFor(locale as Locale, "/insights") };
}

export default async function InsightsPage() {
  const t = await getTranslations();
  const items = t.raw("r.insights.items") as { tag: string; t: string; min: number }[];
  return (
    <section className="r-section r-page">
      <div className="r-wrap">
        <h1 className="r-h2">{t("r.pages.insightsTitle")}</h1>
        <ul className="r-ins-grid r-page-grid">
          {items.map((item, i) => (
            <li key={item.t}>
              <article className="r-ins-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" {...imgProps(insightImgs[i] ?? insightImgs[0], "200px", true)} />
                <span className="r-ins-body">
                  <span className="r-ins-tag">{item.tag}</span>
                  <span className="r-ins-title">{item.t}</span>
                  <span className="r-ins-read"><Clock size={12} aria-hidden />{t("r.insights.read", { n: String(item.min) })}</span>
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
