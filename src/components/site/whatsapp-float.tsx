"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/cn";

/**
 * 3.9: #25D366 circle, white icon, float shadow. Appears after 40% of the hero has scrolled
 * (fade + scale from 0.9, 0.3s), hides while the final form is on screen. Bottom end corner.
 */
export function WhatsAppFloat({ href, label }: { href: string; label: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const threshold = () => (hero ? hero.offsetTop + hero.offsetHeight * 0.4 : window.innerHeight * 0.4);
    const onScroll = () => setPastHero(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("contact-form");
    const io = form
      ? new IntersectionObserver(([entry]) => setFormVisible(Boolean(entry?.isIntersecting)), { threshold: 0.15 })
      : null;
    if (form) io?.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const shown = pastHero && !formVisible;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={cn(
        "fixed end-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-paper shadow-float",
        "transition-[opacity,scale] duration-300 ease-out-soft lg:end-6 lg:bottom-6 lg:size-15",
        shown ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0",
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
