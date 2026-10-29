"use client";

import { useId, useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

type Row = { without: string; with: string };

/** 6.6: phone toggle (default Without), two columns on desktop. Both sides stay in the DOM. */
export function WithWithout({
  heading,
  withoutLabel,
  withLabel,
  rows,
}: {
  heading: string;
  withoutLabel: string;
  withLabel: string;
  rows: Row[];
}) {
  const [side, setSide] = useState<"without" | "with">("without");
  const base = useId();

  return (
    <section className="section-y bg-paper">
      <div className="container-site">
        <h2 data-reveal className="type-h2 max-w-text text-ink">
          {heading}
        </h2>

        <div role="tablist" aria-label={heading} className="mt-8 grid h-12 w-full max-w-sm grid-cols-2 rounded-full border border-line-strong p-1 lg:hidden">
          {(["without", "with"] as const).map((key) => {
            const on = side === key;
            return (
              <button
                key={key}
                id={`${base}-${key}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${base}-panel`}
                onClick={() => setSide(key)}
                className={cn(
                  "knob relative z-10 rounded-full text-sm font-semibold",
                  on ? "bg-ink text-paper" : "text-muted",
                )}
              >
                {key === "without" ? withoutLabel : withLabel}
                {key === "with" && <span aria-hidden className="ms-2 inline-block size-1.5 rounded-full bg-accent-500 align-middle" />}
              </button>
            );
          })}
        </div>

        <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-${side}`} className="mt-6 lg:hidden">
          <ul key={side} className="grid gap-3">
            {rows.map((row) => (
              <li key={row.without} className="flex items-start gap-3 rounded-2xl border border-line bg-sand px-4 py-4 animate-fade-rise">
                {side === "with" ? (
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-700" />
                ) : (
                  <Minus aria-hidden className="mt-0.5 size-5 shrink-0 text-ink" />
                )}
                <span className={side === "with" ? "text-accent-700" : "text-muted"}>{row[side]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 hidden grid-cols-2 gap-10 lg:grid">
          {[
            { key: "without" as const, label: withoutLabel },
            { key: "with" as const, label: withLabel },
          ].map((col) => (
            <div key={col.key}>
              <p className="type-label mb-5 text-faint">{col.label}</p>
              <ul className="grid gap-4">
                {rows.map((row, i) => (
                  <li
                    key={row.without}
                    data-reveal
                    style={{ ["--i" as string]: i }}
                    className="flex min-h-20 items-start gap-3 border-t border-line pt-4"
                  >
                    {col.key === "with" ? (
                      <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-accent-500" />
                    ) : (
                      <Minus aria-hidden className="mt-1 size-4 shrink-0 text-ink" />
                    )}
                    <span className={col.key === "with" ? "text-lg text-accent-700" : "text-lg text-muted"}>{row[col.key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
