import { getLocale, getTranslations } from "next-intl/server";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { buttonClasses, WhatsAppButton } from "@/components/ui/button";

/**
 * Mid / final CTA (6.7, 7.1 #7): centred, #f5f5f5, 28px corners inside the container on desktop.
 * "Let's talk" scrolls to #contact-form when the page has one, otherwise opens /contact.
 */
export async function CtaPanel({
  heading,
  line,
  toForm = false,
  size = "cta",
  className,
}: {
  heading: string;
  line: string;
  toForm?: boolean;
  size?: "cta" | "h2";
  className?: string;
}) {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className={cn("section-y", className)}>
      <div className="container-site">
        <div className="relative overflow-hidden rounded-panel bg-sand px-5 py-12 text-center sm:px-10 lg:px-16 lg:py-20">
          <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-narrow">
            <h2 data-reveal className={cn("mx-auto text-ink", size === "cta" ? "type-h2-cta" : "type-h2", "max-w-[22ch]")}>
              {heading}
            </h2>
            <p data-reveal style={{ ["--i" as string]: 1 }} className="mx-auto mt-5 max-w-text-sm text-lg text-muted">
              {line}
            </p>
            <div
              data-reveal
              style={{ ["--i" as string]: 2 }}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <a href={toForm ? "#contact-form" : `/${locale}/contact`} className={buttonClasses({ block: true })}>
                {t("cta.letsTalk")}
              </a>
              <WhatsAppButton href={whatsappHref(t("whatsapp.prefill"))} block>
                {t("cta.whatsapp")}
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
