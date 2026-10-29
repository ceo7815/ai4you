import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <section className="container-site section-y-lg pt-30 lg:pt-34">
      <h1 className="type-h2 text-ink">{t("notFound.title")}</h1>
      <p className="mt-4 text-muted">{t("notFound.body")}</p>
      <div className="mt-8">
        <ButtonLink href="/contact">{t("cta.letsTalk")}</ButtonLink>
      </div>
    </section>
  );
}
