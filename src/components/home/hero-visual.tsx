/** Desktop hero field (6.2, 5/12): flow lines in accent-200 with a turquoise pulse. No fake product UI, no numbers. */
export function HeroVisual() {
  return (
    <div aria-hidden className="relative hidden h-[28rem] lg:block">
      <div className="motion-loop absolute inset-0 animate-float-soft">
        <svg viewBox="0 0 520 460" className="h-full w-full" fill="none">
          <circle cx="250" cy="230" r="168" stroke="var(--color-line-strong)" strokeDasharray="2 8" />
          <circle cx="250" cy="230" r="112" stroke="var(--color-accent-200)" />
          <circle cx="250" cy="230" r="56" stroke="var(--color-accent-300)" />
          <path id="flow" d="M96 300C150 120 360 90 430 210" stroke="var(--color-accent-200)" strokeWidth="1.5" />
          <path d="M120 150C210 210 300 150 400 250" stroke="var(--color-brand-200)" strokeWidth="1.5" />
          <circle cx="250" cy="230" r="7" fill="var(--color-accent-500)" />
          <circle cx="250" cy="118" r="5" fill="var(--color-brand-500)" />
          <circle cx="362" cy="230" r="5" fill="var(--color-brand-400)" />
          <circle cx="138" cy="230" r="5" fill="var(--color-accent-700)" />
          <circle r="4.5" fill="var(--color-accent-500)">
            <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
              <mpath href="#flow" />
            </animateMotion>
          </circle>
        </svg>
      </div>
    </div>
  );
}
