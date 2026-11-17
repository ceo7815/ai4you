import { cn } from "@/lib/cn";

/** Blue A mark matching the reference wordmark, plus the AI4U logotype. */
export function LogoMark({ className, id = "lm" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={`${id}-a`} x1="8" y1="44" x2="36" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--r-blue-deep)" />
          <stop offset="1" stopColor="var(--r-blue)" />
        </linearGradient>
      </defs>
      <path
        d="M24 5.5 42.8 43h-8.6L24 18.2 13.8 43H5.2L24 5.5Z"
        fill={`url(#${id}-a)`}
      />
    </svg>
  );
}

export function Logo({ className, markClassName, id }: { className?: string; markClassName?: string; id?: string }) {
  return (
    <span className={cn("r-logo", className)} dir="ltr">
      <LogoMark id={id} className={cn("r-logo-mark", markClassName)} />
      <span className="r-logo-word">
        AI<span>4</span>U
      </span>
    </span>
  );
}
