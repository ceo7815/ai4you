"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * 3.5: one question open at a time, height animated 0.35s ease-out-soft.
 * Answers stay in the HTML when closed (SEO, FAQPage schema).
 */
export function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <li key={item.q} data-reveal style={{ ["--i" as string]: i }}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-start text-lg font-semibold text-ink lg:py-6 lg:text-xl"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-accent-700 transition-[rotate,border-color,background-color] duration-300 ease-out-soft group-hover:border-accent-500",
                    isOpen && "rotate-45 border-accent-500 bg-accent-50",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[350ms] ease-out-soft",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-text pb-6 text-muted">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
