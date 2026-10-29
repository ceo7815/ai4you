"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** 6.9 [recommendation]: a settings panel whose switches turn on, one after another, on entry. */
export function ControlPanel({ labels }: { labels: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [on, setOn] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timers = labels.map((_, i) => window.setTimeout(() => setOn(i + 1), 200 + i * 120));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [labels]);

  return (
    <ul ref={ref} className="rounded-3xl border-[1.5px] border-accent-200 bg-paper p-2 shadow-card-hover">
      {labels.map((label, i) => {
        const active = i < on;
        return (
          <li key={label} className="flex min-h-14 items-center justify-between gap-4 rounded-2xl px-4">
            <span className={cn("text-[0.9375rem] font-medium", active ? "text-ink" : "text-muted")}>{label}</span>
            <span
              aria-hidden
              className={cn("relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300", active ? "bg-brand-500" : "bg-sand-2")}
            >
              <span className={cn("knob absolute top-1 size-5 rounded-full bg-paper shadow-button", active ? "translate-x-6 rtl:-translate-x-6" : "translate-x-1 rtl:-translate-x-1")} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
