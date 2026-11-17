import { cn } from "@/lib/cn";

/** AI4U logo: blue chevron "A" mark with a glass highlight, and the wordmark. */
export function LogoMark({ className, id = "lm" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={`${id}-a`} x1="6" y1="44" x2="42" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--r-blue-deep)" />
          <stop offset="0.55" stopColor="var(--r-blue)" />
          <stop offset="1" stopColor="var(--r-blue-3)" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="24" y1="4" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--r-white)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--r-white)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M24 4 44 42h-9.2L24 20.6 13.2 42H4L24 4Z" fill={`url(#${id}-a)`} />
      <path d="M24 4 44 42h-9.2L24 20.6V4Z" fill={`url(#${id}-b)`} />
      <path d="M17.5 33.5h13l3 6.2h-19l3-6.2Z" fill="var(--r-blue)" opacity="0.92" />
    </svg>
  );
}

export function Logo({ className, markClassName, id }: { className?: string; markClassName?: string; id?: string }) {
  return (
    <span className={cn("r-logo", className)} dir="ltr">
      <LogoMark id={id} className={cn("r-logo-mark", markClassName)} />
      <span className="r-logo-word">
        AI<span>4</span>YOU
      </span>
    </span>
  );
}
