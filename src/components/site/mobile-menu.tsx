"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

type MenuService = { href: string; name: string; slug: string };

type Props = {
  openLabel: string;
  closeLabel: string;
  services: MenuService[];
  aboutLabel: string;
  links: { href: string; label: string }[];
  footer: ReactNode;
};

/** 3: full-screen drawer, 0.45s ease-out-fluid, focus trap, Esc, safe-area top. */
export function MobileMenu({ openLabel, closeLabel, services, aboutLabel, links, footer }: Props) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label={openLabel}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-sand"
      >
        <span aria-hidden className="flex w-5 flex-col gap-1.5">
          <span className="h-0.5 rounded-full bg-current" />
          <span className="h-0.5 w-3.5 rounded-full bg-current" />
        </span>
      </button>

      {mounted
        ? createPortal(
            <div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-label={openLabel}
              inert={!open}
              className={cn(
                "fixed inset-0 z-50 flex flex-col bg-paper pt-[env(safe-area-inset-top)] transition-[opacity,translate] duration-[450ms] ease-out-fluid",
                open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
              )}
            >
        <div className="flex h-16 items-center justify-end px-gutter">
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
            className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-sand"
          >
            <X aria-hidden className="size-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-gutter pb-6">
          <ul>
            {services.map((s, i) => (
              <li
                key={s.slug}
                className={cn("transition-[opacity,translate] duration-500 ease-out-soft", open ? "opacity-100" : "translate-y-2 opacity-0")}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
              >
                <Link href={s.href} className="group flex min-h-12 items-center justify-between gap-4 py-2">
                  <span dir="ltr" className="font-heading text-xl font-semibold text-ink">
                    {s.name}
                  </span>
                  <ArrowRight aria-hidden className="size-4 text-accent-700 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
            {links.map((l, i) => (
              <li
                key={l.href}
                className={cn("transition-[opacity,translate] duration-500 ease-out-soft", open ? "opacity-100" : "translate-y-2 opacity-0")}
                style={{ transitionDelay: open ? `${80 + (services.length + i) * 40}ms` : "0ms" }}
              >
                {i === 0 ? <p className="type-label pt-4 pb-1 text-faint">{aboutLabel}</p> : null}
                <Link href={l.href} className="group flex min-h-12 items-center justify-between gap-4 py-2">
                  <span className="font-heading text-xl font-semibold text-ink">{l.label}</span>
                  <ArrowRight aria-hidden className="size-4 text-accent-700 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line px-gutter pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">{footer}</div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
