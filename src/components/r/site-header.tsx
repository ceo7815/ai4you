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
  servicesLabel,
  services,
  links,
  talk,
  langEn,
  langAr,
  menu,
  close,
  contactHref,
  siteName,
}: {
  locale: string;
  servicesLabel: string;
  services: Item[];
  links: Item[];
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
  const [svcOpen, setSvcOpen] = useState(false);
  const pathname = usePathname() ?? `/${locale}`;
  const home = pathname === `/${locale}` || pathname === `/${locale}/`;
  const talkHref = home ? "#contact-form" : contactHref;
  const svcId = useId();
  const svcRef = useRef<HTMLDivElement>(null);

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
    if (svcOpen) setSvcOpen(false);
  }

  useEffect(() => {
    if (!svcOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!svcRef.current?.contains(e.target as Node)) setSvcOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSvcOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [svcOpen]);

  const target = otherLocale[locale as Locale];
  const langHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${target}`) || `/${target}`;
  const rememberLang = () => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <header className="r-header" data-scrolled={scrolled ? "true" : "false"}>
      <div className="r-header-bar">
        <Link href={`/${locale}`} className="r-logo-link" aria-label={siteName} onClick={() => setOpen(false)}>
          <Logo id="hd" />
        </Link>

        <nav className="r-nav" aria-label={siteName}>
          <div className="r-dd" ref={svcRef} data-open={svcOpen ? "true" : "false"}>
            <button
              type="button"
              className="r-nav-link r-dd-btn"
              aria-expanded={svcOpen}
              aria-controls={svcId}
              onClick={() => setSvcOpen((v) => !v)}
            >
              {servicesLabel}
              <ChevronDown size={14} aria-hidden />
            </button>
            <div id={svcId} className="r-dd-pop" hidden={!svcOpen}>
              {services.map((it) => (
                <Link key={it.href} href={it.href} onClick={() => setSvcOpen(false)}>
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
          {links.map((it) => (
            <Link key={it.href} href={it.href} className="r-nav-link">
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="r-header-end">
          <span className="r-lang-switch" lang="">
            {locale === "en" ? (
              <span lang="en" aria-current="true">
                {langEn}
              </span>
            ) : (
              <a href={langHref} hrefLang="en" lang="en" onClick={rememberLang}>
                {langEn}
              </a>
            )}
            <span aria-hidden className="r-lang-slash">
              /
            </span>
            {locale === "ar" ? (
              <span lang="ar" aria-current="true">
                {langAr}
              </span>
            ) : (
              <a href={langHref} hrefLang="ar" lang="ar" onClick={rememberLang}>
                {langAr}
              </a>
            )}
          </span>
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
          <p className="r-drawer-label">{servicesLabel}</p>
          {services.map((it) => (
            <Link key={it.href} href={it.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {it.label}
              <ArrowRight aria-hidden size={18} className="rtl:-scale-x-100" />
            </Link>
          ))}
          {links.map((it) => (
            <Link key={it.href} href={it.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {it.label}
              <ArrowRight aria-hidden size={18} className="rtl:-scale-x-100" />
            </Link>
          ))}
        </nav>
        <a href={langHref} hrefLang={target} lang={target} className="r-drawer-lang" onClick={() => { rememberLang(); setOpen(false); }} tabIndex={open ? 0 : -1}>
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
