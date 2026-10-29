"use client";

import { useEffect, useState, type ReactNode } from "react";

/** At the top the bar is flush. After a short scroll it lifts into a floating capsule. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="site-header pointer-events-none fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)]"
    >
      {children}
    </header>
  );
}
