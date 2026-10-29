import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Section heading aligned to the line start (4.4), with an optional mono label above. */
export function SectionHeading({
  label,
  children,
  line,
  className,
  as: Tag = "h2",
}: {
  label?: string;
  children: ReactNode;
  line?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-text", className)}>
      {label && (
        <p data-reveal className="type-label mb-4 inline-flex items-center gap-2 text-accent-700">
          <span aria-hidden className="size-1.5 rounded-full bg-accent-500" />
          {label}
        </p>
      )}
      <Tag data-reveal style={{ ["--i" as string]: label ? 1 : 0 }} className="type-h2 text-ink">
        {children}
      </Tag>
      {line && (
        <p data-reveal style={{ ["--i" as string]: label ? 2 : 1 }} className="mt-5 max-w-text-sm text-lg text-muted">
          {line}
        </p>
      )}
    </div>
  );
}
