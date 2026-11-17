"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="r-faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="r-faq-btn"
              >
                <span>{item.q}</span>
                <span className="r-faq-icon" data-open={isOpen ? "true" : "false"} aria-hidden>
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} className="r-faq-panel" data-open={isOpen ? "true" : "false"}>
              <div className="r-faq-panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
