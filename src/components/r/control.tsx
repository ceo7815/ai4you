"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useReducedMotion() {
  return useSyncExternalStore(subscribeReduced, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
}

export function ControlSwitches({ labels }: { labels: string[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [on, setOn] = useState(0);
  const shown = reduce ? labels.length : on;

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timers = labels.map((_, i) => window.setTimeout(() => setOn(i + 1), 200 + i * 120));
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [labels, reduce]);

  return (
    <ul ref={ref} className="r-switches">
      {labels.map((label, i) => {
        const active = i < shown;
        return (
          <li key={label} data-on={active ? "true" : "false"}>
            <span>{label}</span>
            <span className="r-switch" aria-hidden>
              <span className="r-switch-knob" />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
