import { cn } from "@/lib/cn";

/** Supplied lockup. Transparent PNG, English in both directions, so it is not mirrored. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/logo.png?v=supplied"
      alt=""
      width={628}
      height={194}
      className={cn("h-8 w-auto lg:h-11", className)}
    />
  );
}
