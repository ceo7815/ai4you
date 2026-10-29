import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Check, ShieldCheck, Volume2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import en from "@messages/en.json";
import ar from "@messages/ar.json";
import { whatsappHref } from "@/lib/whatsapp";
import { Button, ButtonLink, WhatsAppButton } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/cn";

/*
 * Internal design-system reference (stage 1). noindex, not in the sitemap.
 * Section labels below are developer chrome, kept in English in both locales so
 * no Arabic is invented; every specimen uses approved EN/AR copy from the spec.
 */

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const neutrals = [
  ["ink", "#0b0c0e", "Headlines, dark band"],
  ["ink-soft", "#2e2e30", "Secondary dark text"],
  ["muted", "#5c5f66", "Body and descriptions"],
  ["faint", "#9a9ca1", "Labels, faint text"],
  ["paper", "#ffffff", "Main background, cards"],
  ["sand", "#f5f5f5", "Alternating sections"],
  ["sand-2", "#ebebeb", "Soft borders"],
  ["line", "#0a0a0a1a", "Dividers (10% black)"],
  ["line-strong", "#0a0a0a2e", "Strong lines (18%)"],
] as const;

const brand = [
  ["brand-50", "#edf3fa", "Tag backgrounds"],
  ["brand-100", "#d3e2f2", ""],
  ["brand-200", "#a7c5e5", "Illustrations"],
  ["brand-300", "#6e9ed0", "Illustrations, charts"],
  ["brand-400", "#3a72b4", ""],
  ["brand-500", "#0d4a8f", "Primary button, its focus ring"],
  ["brand-600", "#0a3c75", "Primary button hover"],
  ["brand-700", "#082e5a", ""],
  ["brand-800", "#062240", "Dark blue backgrounds"],
  ["brand-900", "#04162b", ""],
] as const;

const accent = [
  ["accent-50", "#eef9fa", "Icon circle (up to 40px)"],
  ["accent-100", "#d5f0f3", "Marker behind one word"],
  ["accent-200", "#abe1e8", "Thin illustration lines"],
  ["accent-300", "#6bcbd6", "Glow and lines on dark"],
  ["accent-500", "#2cb5c5", "Dots, rings, icons, flow lines, focus, secondary border"],
  ["accent-600", "#259aa7", "Decorative hover"],
  ["accent-700", "#1f7f8a", "All turquoise text on light"],
  ["accent-800", "#1a6d76", "Turquoise text/link/border hover"],
  ["accent-900", "#0d363b", "Subtle border inside dark band"],
] as const;

const single = [
  ["whatsapp", "#25d366", "Floating WhatsApp button only"],
  ["whatsapp-dark", "#075e54", "WhatsApp mock-ups only"],
  ["gold", "#ffd776", "Rare highlight, avoid unless needed"],
] as const;

const contrast = [
  ["White on #2CB5C5", "2.46:1", "Forbidden", "bg-accent-500 text-paper"],
  ["#2CB5C5 on white", "2.46:1", "Decorative graphics only", "bg-paper text-accent-500"],
  ["#2CB5C5 on #0b0c0e", "7.94:1", "AAA. Text allowed in dark band", "bg-ink text-accent-500"],
  ["#1f7f8a on white", "4.71:1", "AA text and links", "bg-paper text-accent-700"],
  ["#1a6d76 on white", "6.01:1", "AA (hover)", "bg-paper text-accent-800"],
] as const;

const scale = [
  ["xs", 12],
  ["sm", 14],
  ["base", 16],
  ["lg", 18],
  ["xl", 20],
  ["2xl", 24],
  ["3xl", 30],
  ["4xl", 36],
  ["5xl", 48],
  ["6xl", 60],
  ["7xl", 72],
] as const;

const spacing = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 32] as const;

const containers = [
  ["site", "1280px", "Max container"],
  ["wide", "940px", "Intermediate"],
  ["narrow", "860px", "Intermediate, FAQ"],
  ["text", "768px", "Text max"],
  ["article", "720px", "Article column"],
  ["text-sm", "576px", "Text min"],
] as const;

const radii = [
  ["xl", "12px", "Card min, form field"],
  ["2xl", "16px", "Card"],
  ["card", "20px", "Service card, phone"],
  ["3xl", "24px", "Card max, video phone"],
  ["panel", "28px", "Video desktop, mid CTA"],
  ["full", "9999px", "Buttons"],
] as const;

const shadows = [
  ["button", "inset 0 1px 0 0 rgba(255,255,255,.15)", "Primary button", "bg-brand-500"],
  ["card-hover", "0 12px 32px -12px rgba(11,12,14,.18)", "Card hover", "bg-paper"],
  ["float", "0 8px 24px rgba(0,0,0,.18)", "Floating WhatsApp", "bg-paper"],
] as const;

const easings = [
  ["out-soft", "cubic-bezier(.22,1,.36,1)", "Main entrance curve", "ease-out-soft"],
  ["out-quart", "cubic-bezier(.165,.84,.44,1)", "", "ease-out-quart"],
  ["out-quad", "cubic-bezier(.25,.46,.45,.94)", "", "ease-out-quad"],
  ["out-fluid", "cubic-bezier(.32,.72,0,1)", "Drawers and menus", "ease-out-fluid"],
  ["loop", "cubic-bezier(.65,0,.35,1)", "Loops", "ease-loop"],
  ["loop-soft", "cubic-bezier(.45,0,.25,1)", "Loops", "ease-loop-soft"],
  ["knob", "cubic-bezier(.34,1.4,.64,1)", "Toggle knob overshoot", "ease-knob"],
  ["standard", "cubic-bezier(.4,0,.2,1)", "Default transition 150ms", "ease-standard"],
] as const;

function withAccent(text: string) {
  const match = /^(.*)<accent>(.*)<\/accent>(.*)$/.exec(text);
  if (!match) return text;
  return (
    <>
      {match[1]}
      <span className="accent-underline">{match[2]}</span>
      {match[3]}
    </>
  );
}

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-12 lg:py-20">
      <div lang="en" className="mb-8 max-w-text">
        <h2 id={`${id}-title`} className="type-h2 text-ink">
          {title}
        </h2>
        {note ? <p className="type-caption mt-3 text-muted">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Swatches({ items }: { items: ReadonlyArray<readonly [string, string, string]> }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map(([name, hex, use]) => (
        <li key={name} className="overflow-hidden rounded-2xl border border-line bg-paper">
          <div className="h-20 border-b border-line" style={{ backgroundColor: `var(--color-${name})` }} />
          <div lang="en" className="p-3">
            <p className="type-label text-ink">{name}</p>
            <p className="type-label text-faint" dir="ltr">
              {hex}
            </p>
            {use ? <p className="mt-1 text-xs leading-snug text-muted">{use}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Specimen({ lang, dir, label }: { lang: "en" | "ar"; dir: "ltr" | "rtl"; label: string }) {
  const m = lang === "en" ? en : ar;
  return (
    <div lang={lang} dir={dir} className="border-t border-line pt-6 sm:rounded-3xl sm:border sm:p-8">
      {/* No inner padding on phone so line counts match the real site width. */}
      <p lang="en" className="type-label mb-6 text-faint">
        {label}
      </p>
      <p className="type-label mb-2 text-faint" lang="en">
        H1
      </p>
      <p className="type-h1 text-ink">{withAccent(m.home.hero.headline)}</p>
      <p className="type-label mb-2 mt-10 text-faint" lang="en">
        H2
      </p>
      <p className="type-h2 text-ink">{m.home.experience.heading}</p>
      <p className="type-label mb-2 mt-10 text-faint" lang="en">
        H2 CTA
      </p>
      <p className="type-h2-cta text-ink">{m.home.midCta.heading}</p>
      <p className="type-label mb-2 mt-10 text-faint" lang="en">
        Body
      </p>
      <p className="type-body max-w-text-sm text-muted">{m.home.experience.line}</p>
      <p className="type-label mb-2 mt-10 text-faint" lang="en">
        Caption
      </p>
      <p className="type-caption text-muted">{m.home.midCta.line}</p>
      <p className="type-label mb-2 mt-10 text-faint" lang="en">
        Label / digits
      </p>
      <p className="type-label text-ink">
        {m.cta.details} · <span dir="ltr">0123456789</span>
      </p>
    </div>
  );
}

export default async function StyleguidePage() {
  const t = await getTranslations();
  const wa = whatsappHref(t("whatsapp.prefill"));

  return (
    <div className="container-site pb-24 pt-16 lg:pt-24">
      <header lang="en" className="mb-12 max-w-text">
        <p className="type-label text-faint">AI4YOU · design system · spec section 4</p>
        <h1 className="type-h1 mt-4 text-ink">Styleguide</h1>
        <p className="type-body mt-4 text-muted">
          Every value here is the exact token from the spec. Nothing outside this page may be used in the site.
        </p>
      </header>

      <Section id="colors" title="Colour" note="4.1 neutrals, brand and single-use colours.">
        <div className="space-y-8">
          <Swatches items={neutrals} />
          <Swatches items={brand} />
          <Swatches items={single} />
        </div>
      </Section>

      <Section
        id="accent"
        title="Turquoise"
        note="4.2 Thomas's decision: touches only. Never a filled button, a card or section background, body text, or white text on turquoise."
      >
        <Swatches items={accent} />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
          <table lang="en" className="w-full min-w-[36rem] text-start text-sm">
            <thead className="bg-sand text-ink">
              <tr>
                <th className="p-3 text-start font-semibold">Pair</th>
                <th className="p-3 text-start font-semibold">Ratio</th>
                <th className="p-3 text-start font-semibold">Use</th>
                <th className="p-3 text-start font-semibold">Sample</th>
              </tr>
            </thead>
            <tbody>
              {contrast.map(([pair, ratio, use, cls]) => (
                <tr key={pair} className="border-t border-line">
                  <td className="p-3 text-ink">{pair}</td>
                  <td className="p-3 font-mono text-ink" dir="ltr">
                    {ratio}
                  </td>
                  <td className="p-3 text-muted">{use}</td>
                  <td className="p-2">
                    <span className={cn("inline-block rounded-xl px-3 py-1.5 font-semibold", cls)}>Aa</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-2xl border border-line p-5">
            <span className="relative flex size-2">
              <span className="motion-loop absolute inline-flex size-full animate-ping rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-500" />
            </span>
            <p lang="en" className="type-caption mt-4 text-muted">
              Status dot 8px with ping
            </p>
          </li>
          <li className="rounded-2xl border border-line p-5">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent-50 text-accent-700">
              <ShieldCheck className="size-5" strokeWidth={1.75} aria-hidden />
            </span>
            <p lang="en" className="type-caption mt-4 text-muted">
              Line icon #1f7f8a on #eef9fa circle
            </p>
          </li>
          <li className="rounded-2xl border border-line p-5">
            <svg viewBox="0 0 160 24" className="h-6 w-full" aria-hidden>
              <line x1="0" y1="12" x2="160" y2="12" stroke="var(--color-accent-200)" strokeWidth="1.5" />
              <circle cx="96" cy="12" r="4" fill="var(--color-accent-500)" />
            </svg>
            <p lang="en" className="type-caption mt-4 text-muted">
              Flow line #abe1e8 with pulse #2CB5C5
            </p>
          </li>
          <li className="rounded-2xl border border-line p-5">
            <p className="text-xl font-semibold text-ink">
              <span className="accent-marker">{t("nav.blog")}</span>
            </p>
            <p lang="en" className="type-caption mt-4 text-muted">
              Marker #d5f0f3 behind one word, word stays ink
            </p>
          </li>
        </ul>
      </Section>

      <Section
        id="type"
        title="Typography"
        note="4.3. EN: Geist 500 (H1), Schibsted Grotesk (H2), Inter (body), Geist Mono (labels). AR: IBM Plex Sans Arabic 400/500/600, letter-spacing always 0, taller line-height, no italics."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Specimen lang="en" dir="ltr" label="English" />
          <Specimen lang="ar" dir="rtl" label="Arabic" />
        </div>

        <h3 lang="en" className="mt-12 text-xl font-semibold text-ink">
          Scale
        </h3>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {scale.map(([name, px]) => (
            <li key={name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
              <span lang="en" className="type-label shrink-0 text-faint sm:w-24" dir="ltr">
                {name} · {px}
              </span>
              <span className="min-w-0 text-ink" style={{ fontSize: `var(--text-${name})` }}>
                AI4YOU <span lang="ar">ذكاء</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="layout" title="Spacing and layout" note="4.4. Unit 4px. Gutters 20 / 32 / 40px. Sections 48 to 56px on phone, 80 to 128px on desktop.">
        <ul className="space-y-2">
          {spacing.map((n) => (
            <li key={n} className="flex items-center gap-4">
              <span lang="en" className="type-label w-20 shrink-0 text-faint" dir="ltr">
                {n} · {n * 4}px
              </span>
              <span className="h-3 rounded-full bg-brand-200" style={{ inlineSize: `calc(var(--spacing) * ${n})` }} />
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {containers.map(([name, px, use]) => (
            <li key={name} lang="en" className="rounded-2xl border border-line p-4">
              <p className="type-label text-ink">max-w-{name}</p>
              <p className="type-label text-faint" dir="ltr">
                {px}
              </p>
              <p className="mt-1 text-xs text-muted">{use}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="radius" title="Radius and shadow" note="4.4. No heavy shadows.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {radii.map(([name, px, use]) => (
            <li key={name} lang="en">
              <div className="h-24 border border-line-strong bg-sand" style={{ borderRadius: `var(--radius-${name})` }} />
              <p className="type-label mt-2 text-ink">rounded-{name}</p>
              <p className="type-label text-faint" dir="ltr">
                {px}
              </p>
              <p className="text-xs text-muted">{use}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {shadows.map(([name, value, use, bg]) => (
            <li key={name} lang="en">
              <div className={cn("h-24 rounded-3xl border border-line", bg)} style={{ boxShadow: `var(--shadow-${name})` }} />
              <p className="type-label mt-3 text-ink">shadow-{name}</p>
              <p className="text-xs text-muted" dir="ltr">
                {value}
              </p>
              <p className="text-xs text-muted">{use}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="motion" title="Motion" note="4.6. Hover or focus a row to run the curve over 800ms.">
        <ul className="divide-y divide-line border-y border-line">
          {easings.map(([name, value, use, cls]) => (
            <li key={name}>
              <div tabIndex={0} className="group grid items-center gap-3 py-4 outline-offset-4 sm:grid-cols-[14rem_1fr]">
                <div lang="en">
                  <p className="type-label text-ink">ease-{name}</p>
                  <p className="type-label text-faint" dir="ltr">
                    {value}
                  </p>
                  {use ? <p className="text-xs text-muted">{use}</p> : null}
                </div>
                <div className="@container relative h-6 rounded-full bg-sand">
                  <span
                    className={cn(
                      "absolute inset-y-1 start-1 size-4 rounded-full bg-brand-500 transition-transform duration-800",
                      cls,
                      "group-hover:translate-x-[calc(100cqw-1.5rem)] group-focus-visible:translate-x-[calc(100cqw-1.5rem)]",
                      "rtl:group-hover:-translate-x-[calc(100cqw-1.5rem)] rtl:group-focus-visible:-translate-x-[calc(100cqw-1.5rem)]",
                    )}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-2xl border border-line p-5">
            <p className="animate-fade-rise text-lg font-semibold text-ink">{t("home.midCta.heading")}</p>
            <p lang="en" className="type-caption mt-4 text-muted" dir="ltr">
              fade-rise · 0.6s / 24px (phone 0.45s / 16px)
            </p>
          </li>
          <li className="rounded-2xl border border-line p-5">
            <p className="text-lg font-semibold text-ink">
              <span className="accent-underline">{t("nav.blog")}</span>
            </p>
            <p lang="en" className="type-caption mt-4 text-muted" dir="ltr">
              underline-draw · 0.8s, from line start
            </p>
          </li>
          <li className="rounded-2xl border border-line p-5">
            <div className="motion-loop size-10 animate-float-soft rounded-full border-[1.5px] border-accent-500" />
            <p lang="en" className="type-caption mt-4 text-muted" dir="ltr">
              float-soft · 7s ±10px (desktop hero only)
            </p>
          </li>
          <li className="rounded-2xl border border-line p-5">
            <div className="motion-loop h-3 animate-skeleton rounded-full bg-[linear-gradient(90deg,var(--color-sand)_25%,var(--color-sand-2)_50%,var(--color-sand)_75%)] bg-size-[200%_100%]" />
            <p lang="en" className="type-caption mt-4 text-muted" dir="ltr">
              skeleton · 2s linear (blog cards)
            </p>
          </li>
        </ul>

        <div className="mask-fade-x mt-6 overflow-hidden rounded-2xl border border-line py-5">
          <ul className="motion-loop flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]" aria-hidden>
            {Array.from({ length: 16 }, (_, i) => (
              <li key={i} className="h-7 w-28 shrink-0 rounded-xl bg-sand-2" />
            ))}
          </ul>
          <p lang="en" className="type-caption px-5 pt-4 text-muted">
            marquee · 42s, reverses in Arabic. Slots are neutral: no brand logo is shown until Thomas supplies and approves them.
          </p>
        </div>
      </Section>

      <Section id="buttons" title="Buttons" note="4.5. Primary #0d4a8f, lifts 2px on hover. Secondary: 1.5px turquoise border, transparent, never fills. Tab through them to see focus rings.">
        <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/contact" size="hero" block>
            {t("cta.letsTalk")}
          </ButtonLink>
          <WhatsAppButton href={wa} size="hero" block>
            {t("cta.whatsapp")}
          </WhatsAppButton>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/contact">{t("cta.letsTalk")}</ButtonLink>
          <ButtonLink href="/contact" size="sm">
            {t("cta.letsTalk")}
          </ButtonLink>
          <Button disabled>{t("cta.send")}</Button>
        </div>
        <p lang="en" className="type-caption mt-4 text-muted">
          Sizes: hero 52px · default 52px (48px full width on phone) · header 36px · disabled.
        </p>

        <div className="surface-dark relative mt-10 overflow-hidden rounded-panel bg-ink p-6 lg:p-10">
          <div className="motion-loop bg-ent-glow absolute -inset-[10%] max-lg:animate-none lg:animate-ent-glow" aria-hidden />
          <div className="relative">
            <p className="flex items-center gap-2 type-label text-accent-500">
              <span className="relative flex size-2">
                <span className="motion-loop absolute inline-flex size-full animate-ping rounded-full bg-accent-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-500" />
              </span>
              #2CB5C5 on #0b0c0e · 7.94:1
            </p>
            <p className="type-h2 mt-4 max-w-text-sm text-paper">{t("home.experience.heading")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" block>
                {t("cta.letsTalk")}
              </ButtonLink>
              <WhatsAppButton href={wa} dark block>
                {t("cta.whatsapp")}
              </WhatsAppButton>
            </div>
            <p lang="en" className="type-caption mt-6 text-faint">
              Dark band: the single #0b0c0e section (video), entGlow 18s on desktop, static on phone.
            </p>
          </div>
        </div>
      </Section>

      <Section id="rtl" title="Direction" note="Directional icons mirror in Arabic. WhatsApp and phone never mirror. Phone numbers are always dir=ltr.">
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="flex items-center gap-3 rounded-2xl border border-line p-5 text-accent-700">
            <span className="font-semibold">{t("cta.details")}</span>
            <ArrowRight className="size-5 rtl:-scale-x-100" strokeWidth={1.75} aria-hidden />
          </li>
          <li className="flex items-center gap-3 rounded-2xl border border-line p-5 text-ink">
            <WhatsAppIcon className="size-6 text-whatsapp" />
            <Volume2 className="size-5 text-accent-700" strokeWidth={1.75} aria-label={t("video.soundOn")} />
            <Check className="size-5 text-accent-700" strokeWidth={2} aria-hidden />
          </li>
          <li className="flex items-center gap-3 rounded-2xl border border-line p-5 text-ink">
            <span className="tel font-mono" dir="ltr">
              +971
            </span>
            <span lang="en" className="text-xs text-muted">
              dir=ltr in both locales
            </span>
          </li>
        </ul>
      </Section>
    </div>
  );
}
