"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const otherLocale: Record<Locale, Locale> = { en: "ar", ar: "en" };

export function LangSwitch({
  locale,
  langEn,
  langAr,
  className = "r-lang",
}: {
  locale: string;
  langEn: string;
  langAr: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? `/${locale}`;
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const target = otherLocale[locale as Locale];
  const langHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${target}`) || `/${target}`;
  const currentLang = locale === "ar" ? langAr : langEn;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const rememberLang = () => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className={className} ref={ref} data-open={open ? "true" : "false"}>
      <button
        type="button"
        className="r-lang-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span lang={locale}>{currentLang}</span>
        <ChevronDown size={14} aria-hidden />
      </button>
      <div id={id} className="r-lang-pop" hidden={!open}>
        <a
          href={pathname}
          hrefLang={locale}
          lang={locale}
          aria-current="true"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          {currentLang}
        </a>
        <a href={langHref} hrefLang={target} lang={target} onClick={rememberLang}>
          {target === "en" ? langEn : langAr}
        </a>
      </div>
    </div>
  );
}
