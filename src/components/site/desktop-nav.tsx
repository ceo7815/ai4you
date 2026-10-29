"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type NavItem = { href: string; label: string; ltr?: boolean };

function isCurrent(pathname: string, href: string) {
  if (pathname === href) return true;
  return href.endsWith("/blog") && pathname.startsWith(`${href}/`);
}

function AboutMenu({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const pathname = usePathname() ?? "";
  const current = items.some((item) => isCurrent(pathname, item.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        root.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-current={current ? "page" : undefined}
        onClick={() => setOpen((v) => !v)}
        className="nav-link nav-link-flat gap-1"
      >
        {label}
        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div id={id} hidden={!open} className="absolute end-0 top-full z-20 pt-2">
        <ul className="min-w-44 rounded-2xl border border-line bg-sand p-1.5 shadow-[0_24px_60px_-24px_rgb(0_0_0_/_0.7)]">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-ink hover:bg-sand aria-[current=page]:text-accent-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Service links sit in the bar. How we work, About and Blog sit under About. */
export function DesktopNav({
  items,
  aboutLabel,
  aboutItems,
  label,
}: {
  items: NavItem[];
  aboutLabel: string;
  aboutItems: NavItem[];
  label: string;
}) {
  const pathname = usePathname() ?? "";

  return (
    <nav aria-label={label} className="hidden min-w-0 flex-1 items-center justify-center min-[80rem]:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
          className="nav-link nav-link-flat"
        >
          {item.ltr ? <span dir="ltr">{item.label}</span> : item.label}
        </Link>
      ))}
      <AboutMenu label={aboutLabel} items={aboutItems} />
    </nav>
  );
}
