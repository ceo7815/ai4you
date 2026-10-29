"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const other: Record<Locale, Locale> = { en: "ar", ar: "en" };

/** Spec 2: EN / عربي, goes to the same page in the other language and stores NEXT_LOCALE. */
export function LangSwitch({
  locale,
  labels,
  className,
  dark = false,
}: {
  locale: Locale;
  labels: { en: string; ar: string };
  className?: string;
  dark?: boolean;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const target = other[locale];
  const href = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${target}`) || `/${target}`;

  const remember = () => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 font-display text-xl font-medium tracking-[-0.012em] ar:tracking-normal", className)}>
      {(["en", "ar"] as const).map((l, i) => (
        <span key={l} className="inline-flex items-center gap-1">
          {i === 1 && (
            <span aria-hidden className={dark ? "text-paper/40" : "text-faint"}>
              /
            </span>
          )}
          {l === locale ? (
            <span
              lang={l}
              aria-current="true"
              className={cn("inline-flex h-11 items-center px-1", dark ? "text-paper" : "text-ink")}
            >
              {labels[l]}
            </span>
          ) : (
            <a
              href={href}
              hrefLang={l}
              lang={l}
              onClick={remember}
              className={cn(
                "inline-flex h-11 items-center px-1 transition-colors",
                dark ? "text-paper/60 hover:text-paper" : "text-muted hover:text-ink",
              )}
            >
              {labels[l]}
            </a>
          )}
        </span>
      ))}
    </span>
  );
}
