"use client";

import { useId, useState } from "react";
import { Check, Minus } from "lucide-react";
import { Reveal } from "./reveal";

type Row = { without: string; with: string };

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
    <section className="r-section" aria-labelledby="h-ww">
      <div className="r-wrap">
        <Reveal className="r-head">
          <h2 id="h-ww" className="r-h2">
            {heading}
          </h2>
        </Reveal>

        <div role="tablist" aria-label={heading} className="r-seg">
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
                className="r-seg-btn"
                data-on={on ? "true" : "false"}
              >
                {key === "without" ? withoutLabel : withLabel}
              </button>
            );
          })}
        </div>

        <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-${side}`} className="r-ww-mobile">
          <ul className="r-ww-list">
            {rows.map((row) => (
              <li key={row.without} className="r-ww-row" data-side={side}>
                {side === "with" ? <Check aria-hidden size={20} /> : <Minus aria-hidden size={20} />}
                <span>{row[side]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="r-ww-desk">
          {(["without", "with"] as const).map((key) => (
            <div key={key}>
              <p className="r-ww-col-label">{key === "without" ? withoutLabel : withLabel}</p>
              <ul className="r-ww-list">
                {rows.map((row) => (
                  <li key={row.without} className="r-ww-row" data-side={key}>
                    {key === "with" ? <Check aria-hidden size={20} /> : <Minus aria-hidden size={20} />}
                    <span>{row[key]}</span>
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
