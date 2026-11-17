"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import type { Locale } from "@/i18n/routing";

type Item = { href: string; label: string };

const otherLocale: Record<Locale, Locale> = { en: "ar", ar: "en" };

export function SiteHeader({
  locale,
  items,
  talk,
  langEn,
  langAr,
  menu,
  close,
  contactHref,
  siteName,
}: {
  locale: string;
  items: Item[];
  talk: string;
  langEn: string;
  langAr: string;
  menu: string;
  close: string;
  contactHref: string;
  siteName: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname() ?? `/${locale}`;
  const home = pathname === `/${locale}` || pathname === `/${locale}/`;
  const talkHref = home ? "#talk" : contactHref;
  const langId = useId();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    if (open) setOpen(false);
    if (langOpen) setLangOpen(false);
  }

  useEffect(() => {
    if (!langOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const target = otherLocale[locale as Locale];
  const langHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${target}`) || `/${target}`;
  const rememberLang = () => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  };
  const currentLang = locale === "ar" ? langAr : langEn;

  const isActive = (href: string) => {
    if (href === `/${locale}` || href === `/${locale}/`) return home;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="r-header" data-scrolled={scrolled ? "true" : "false"}>
      <div className="r-wrap r-header-bar">
        <Link href={`/${locale}`} className="r-logo-link" aria-label={siteName} onClick={() => setOpen(false)}>
          <Logo id="hd" />
        </Link>

        <nav className="r-nav" aria-label={siteName}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="r-nav-link" aria-current={isActive(it.href) ? "page" : undefined}>
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="r-header-end">
          <div className="r-lang" ref={langRef} data-open={langOpen ? "true" : "false"}>
            <button
              type="button"
              className="r-lang-btn"
              aria-expanded={langOpen}
              aria-controls={langId}
              onClick={() => setLangOpen((v) => !v)}
            >
              <span lang={locale}>{currentLang}</span>
              <ChevronDown size={14} aria-hidden />
            </button>
            <div id={langId} className="r-lang-pop" hidden={!langOpen}>
              <a
                href={pathname}
                hrefLang={locale}
                lang={locale}
                aria-current="true"
                onClick={(e) => {
                  e.preventDefault();
                  setLangOpen(false);
                }}
              >
                {currentLang}
              </a>
              <a href={langHref} hrefLang={target} lang={target} onClick={rememberLang}>
                {target === "en" ? langEn : langAr}
              </a>
            </div>
          </div>
          <Link href={talkHref} className="r-pill">
            {talk}
            <ArrowRight aria-hidden size={16} className="rtl:-scale-x-100" />
          </Link>
          <button
            type="button"
            className="r-burger"
            aria-expanded={open}
            aria-controls="r-drawer"
            aria-label={open ? close : menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="r-drawer" className="r-drawer" data-open={open ? "true" : "false"} aria-hidden={!open}>
        <nav className="r-drawer-nav" aria-label={siteName}>
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              aria-current={isActive(it.href) ? "page" : undefined}
            >
              {it.label}
              <ArrowRight aria-hidden size={18} className="rtl:-scale-x-100" />
            </Link>
          ))}
        </nav>
        <a
          href={langHref}
          hrefLang={target}
          lang={target}
          className="r-drawer-lang"
          onClick={() => {
            rememberLang();
            setOpen(false);
          }}
          tabIndex={open ? 0 : -1}
        >
          {target === "en" ? langEn : langAr}
        </a>
        <Link href={talkHref} className="r-pill r-pill-lg" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
          {talk}
          <ArrowRight aria-hidden size={16} className="rtl:-scale-x-100" />
        </Link>
      </div>
    </header>
  );
}
