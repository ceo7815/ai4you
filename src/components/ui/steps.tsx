import { cn } from "@/lib/cn";

type Step = { title: string; text?: string };

const colsClass: Record<number, string> = {
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/**
 * Steps without timings ([Thomas]). Phone: vertical numbered list with a vertical line.
 * Desktop: one row with a horizontal line that fills turquoise on scroll (scrub).
 */
export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  const cols = steps.length;
  return (
    <div data-scrub-root className={cn("relative", className)}>
      {/* desktop line */}
      <div aria-hidden className="absolute inset-x-0 top-[1.0625rem] hidden h-px bg-line-strong lg:block">
        <div data-progress data-scrub data-axis="x" className="h-full w-full bg-accent-500" />
      </div>
      {/* phone line */}
      <div aria-hidden className="absolute start-[1.0625rem] top-2 bottom-2 w-px bg-line-strong lg:hidden">
        <div data-progress data-axis="y" className="h-full w-full bg-accent-500" />
      </div>

      <ol className={cn("relative grid gap-7 lg:gap-6", colsClass[cols] ?? "lg:grid-cols-6")}>
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            style={{ ["--i" as string]: i }}
            className="grid grid-cols-[2.25rem_1fr] gap-x-4 lg:grid-cols-1 lg:gap-y-5"
          >
            <span className="relative z-10 grid size-[2.125rem] place-items-center rounded-full border border-line-strong bg-paper font-mono text-xs font-medium text-ink">
              {String(i + 1).padStart(2, "0")}
              <span aria-hidden className="absolute -end-0.5 -top-0.5 size-2 rounded-full bg-accent-500 ring-2 ring-paper" />
            </span>
            <div className="pt-1 lg:pt-0">
              <h3 className="text-lg font-semibold text-ink lg:text-xl">{step.title}</h3>
              {step.text && <p className="mt-2 text-[0.9375rem] text-muted lg:text-base">{step.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
