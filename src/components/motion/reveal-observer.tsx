"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole page: adds `is-in` to every [data-reveal] / [data-progress] element
 * as it enters the viewport (4.6 fade-rise, progress lines on touch).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-progress]:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
