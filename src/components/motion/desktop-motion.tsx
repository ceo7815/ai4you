"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DESKTOP = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

/**
 * 3.7 / 4.6: GSAP + ScrollTrigger scrub and Lenis run on desktop only, loaded on demand.
 * Phone and reduced motion never download them.
 */
export function DesktopMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia(DESKTOP).matches) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -88 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((line) => {
          const axis = line.dataset.axis === "y" ? "scaleY" : "scaleX";
          line.style.transition = "none";
          line.classList.add("is-in");
          gsap.fromTo(
            line,
            { [axis]: 0 },
            {
              [axis]: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line.closest("[data-scrub-root]") ?? line,
                start: "top 75%",
                end: "bottom 55%",
                scrub: 0.6,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            yPercent: Number(el.dataset.parallax ?? -10),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        const field = document.querySelector<HTMLElement>("[data-field]");
        if (field) {
          gsap.fromTo(
            field,
            { "--glow-y": "8%" },
            {
              "--glow-y": "82%",
              ease: "none",
              scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.45 },
            },
          );
        }

        const title = document.querySelector("[data-hero-title]");
        if (title) {
          gsap.to(title, {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.15,
            ease: "power3.out",
            onComplete: () => title.classList.add("is-lit"),
          });
        }
        gsap.from("[data-hero-aside] > li", {
          y: 22,
          autoAlpha: 0,
          stagger: 0.09,
          duration: 0.75,
          delay: 0.35,
          ease: "power3.out",
        });

        gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row) => {
          const stage = row.querySelector("[data-stage]");
          if (!stage) return;
          gsap.from(stage, {
            y: 72,
            scale: 0.94,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 90%", end: "center 55%", scrub: 0.65 },
          });
        });
      });

      cleanup = () => {
        mm.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    const id = window.requestIdleCallback?.(() => void start()) ?? window.setTimeout(() => void start(), 200);
    return () => {
      disposed = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
