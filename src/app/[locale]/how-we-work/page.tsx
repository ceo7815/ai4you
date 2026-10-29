import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/site";
import { CtaPanel } from "@/components/ui/cta-panel";
import { filmPoster } from "@/lib/media";

type Step = { title: string; text: string };
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("howWeWork"), alternates: alternatesFor(locale as Locale, "/how-we-work") };
}

export default async function HowWeWorkPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return null;
  const t = await getTranslations();
  const steps = t.raw("howWeWork.steps") as Step[];
  const values = t.raw("howWeWork.values") as Step[];

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image src={filmPoster} alt="" fill className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-paper/72" />
        </div>
        <div className="container-site relative pt-30 pb-8 lg:pt-40">
        <h1 data-reveal className="type-h1 text-ink">
          {t("howWeWork.heading")}
        </h1>
        <p data-reveal style={{ ["--i" as string]: 1 }} className="mt-6 max-w-text text-lg text-muted">
          {t("howWeWork.line")}
        </p>
        </div>
      </section>

      <section data-scrub-root className="section-y">
        <div className="container-site">
          <h2 data-reveal className="type-h2 mb-12 text-ink">
            {t("howWeWork.practiceTitle")}
          </h2>
          <div className="relative">
            <div aria-hidden className="absolute start-[1.0625rem] top-2 bottom-2 w-px bg-line-strong lg:start-1/2">
              <div data-progress data-scrub data-axis="y" className="h-full w-full bg-accent-500" />
            </div>
            <ol className="grid gap-6">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  data-reveal
                  style={{ ["--i" as string]: i }}
                  className="relative grid grid-cols-[2.25rem_1fr] gap-4 lg:grid-cols-2 lg:gap-16"
                >
                  <article className={i % 2 === 1 ? "col-start-2 rounded-3xl border border-line bg-paper p-6 lg:col-start-2" : "col-start-2 rounded-3xl border border-line bg-sand p-6 lg:col-start-1"}>
                    <p className="font-mono text-xs text-accent-700">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-3 text-muted">{step.text}</p>
                  </article>
                  <span aria-hidden className="absolute start-2 mt-6 size-5 rounded-full border-[3px] border-paper bg-accent-500 lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-site">
          <h2 data-reveal className="type-h2 text-ink">
            {t("howWeWork.valuesTitle")}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => (
              <li key={value.title} data-reveal style={{ ["--i" as string]: i }} className="rounded-3xl bg-paper p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-ink">{value.title}</h3>
                <p className="mt-3 text-muted">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel heading={t("howWeWork.ctaHeading")} line={t("howWeWork.ctaLine")} />
    </>
  );
}
