import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeDirection, routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { DesktopMotion } from "@/components/motion/desktop-motion";

/** 3.10: preload only the heading face of the active locale. */
const headingFont: Record<Locale, string> = {
  en: "/fonts/geist-latin.woff2",
  ar: "/fonts/plex-arabic-arabic-600.woff2",
};

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${t("siteName")} · ${t("homeTitle")}`, template: `%s · ${t("siteName")}` },
    description: t("homeDescription"),
    applicationName: t("siteName"),
    // Logo / favicon is [TBC] (spec 14); an empty icon stops the browser requesting /favicon.ico.
    icons: { icon: "/icon.png", apple: "/icon.png" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050A14",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  preload(headingFont[locale], { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  const t = await getTranslations({ locale });

  return (
    <html lang={locale} dir={localeDirection[locale]} suppressHydrationWarning>
      <head>
        {/* Reveal styles only apply once JS is known to run; content stays visible without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div data-field className="field" aria-hidden />
        <a
          href="#main"
          className="fixed start-4 top-3 z-[60] -translate-y-20 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-transform focus-visible:translate-y-0"
        >
          {t("ui.skipToContent")}
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="relative z-10 outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat href={whatsappHref(t("whatsapp.prefill"))} label={t("whatsapp.floatLabel")} />
        <RevealObserver />
        <DesktopMotion />
      </body>
    </html>
  );
}
