import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { LocaleLink } from "@/components/locale-link";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export type ButtonVariant = "primary" | "secondary" | "secondary-dark";
/** sm = header (36). default = 52, 48 on phone when full width (4.5). hero = 52 everywhere (3, Hero). */
export type ButtonSize = "sm" | "default" | "hero";

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width on phone, intrinsic from sm up. */
  block?: boolean;
};

const base =
  "group/btn relative inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
  "transition-[translate,background-color,border-color,color] duration-200 ease-out-soft " +
  "hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-500 text-snow shadow-button hover:bg-brand-600 " +
    "focus-visible:outline-brand-500 focus-visible:shadow-button",
  secondary:
    "border-[1.5px] border-accent-500 bg-transparent text-accent-700 hover:border-accent-800 hover:text-accent-800",
  "secondary-dark": "border-[1.5px] border-accent-500 bg-transparent text-accent-500",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  default: "h-12 px-6 text-base sm:h-13",
  hero: "h-13 px-6 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "default",
  block = false,
  className,
}: StyleProps & { className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], block && "w-full sm:w-auto", className);
}

function Label({ children, variant }: { children: ReactNode; variant: ButtonVariant }) {
  const underline = variant !== "primary";
  return (
    <span
      className={cn(
        underline && "decoration-1 underline-offset-4 group-hover/btn:underline",
      )}
    >
      {children}
    </span>
  );
}

type InternalProps = StyleProps & Omit<ComponentProps<typeof LocaleLink>, "className"> & { className?: string };

export function ButtonLink({ variant = "primary", size, block, className, children, ...props }: InternalProps) {
  return (
    <LocaleLink className={cn(buttonClasses({ variant, size, block }), className)} {...props}>
      <Label variant={variant}>{children}</Label>
    </LocaleLink>
  );
}

type ExternalProps = StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; icon?: ReactNode };

export function ButtonExternal({ variant = "primary", size, block, className, children, icon, ...props }: ExternalProps) {
  return (
    <a
      target="_blank"
      rel="noopener"
      className={cn(buttonClasses({ variant, size, block }), className)}
      {...props}
    >
      {icon}
      <Label variant={variant}>{children}</Label>
    </a>
  );
}

type NativeProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", size, block, className, children, type = "button", ...props }: NativeProps) {
  return (
    <button type={type} className={cn(buttonClasses({ variant, size, block }), className)} {...props}>
      <Label variant={variant}>{children}</Label>
    </button>
  );
}

/** The secondary CTA: transparent, turquoise outline, never filled (4.2). */
export function WhatsAppButton({
  href,
  children,
  dark = false,
  size,
  block,
  className,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}) {
  return (
    <ButtonExternal
      href={href}
      variant={dark ? "secondary-dark" : "secondary"}
      size={size}
      block={block}
      className={className}
      icon={<WhatsAppIcon className="size-4.5" />}
    >
      {children}
    </ButtonExternal>
  );
}
