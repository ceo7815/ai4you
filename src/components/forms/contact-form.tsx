"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { ContactState } from "@/lib/lead";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/button";

const PREFIXES = ["+971", "+966", "+973", "+974", "+965", "+968", "+44", "+1"];

export type FormCopy = {
  name: string;
  phone: string;
  prefix: string;
  business: string;
  interest: string;
  notSure: string;
  message?: string;
  note: string;
  send: string;
  sending: string;
  errorRequired: string;
  errorPhone: string;
  errorServer: string;
  options: { value: string; label: string }[];
  successTitle: string;
  success: { title: string; text: string }[];
};

const initial: ContactState = { status: "idle" };

const field =
  "h-14 w-full rounded-xl border border-line-strong bg-sand-2 px-4 text-ink transition-colors placeholder:text-faint focus:border-accent-500 lg:h-13";

export function ContactForm({ copy, locale, withMessage = false }: { copy: FormCopy; locale: string; withMessage?: boolean }) {
  const [state, setState] = useState<ContactState>(initial);
  const [pending, setPending] = useState(false);
  const pathname = usePathname() ?? "/";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", body: new FormData(event.currentTarget) });
      const data = (await response.json()) as ContactState;
      setState(data.status ? data : { status: "error", fields: {}, server: true });
    } catch {
      setState({ status: "error", fields: {}, server: true });
    } finally {
      setPending(false);
    }
  }
  const err = state.status === "error" ? state.fields : {};

  if (state.status === "success") {
    return (
      <ol className="grid gap-6">
        {copy.success.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-4">
            <span className="grid size-9 place-items-center rounded-full bg-accent-50 font-mono text-xs font-medium text-accent-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-[0.9375rem] text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <form id="contact-form" onSubmit={onSubmit} noValidate className="grid gap-5">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-px w-px overflow-hidden opacity-0"
        style={{ insetInlineStart: "-9999px" }}
      />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="page" value={pathname} />

      <Field label={copy.name} error={err.name && copy.errorRequired} id="lead-name">
        <input id="lead-name" name="name" autoComplete="name" required className={field} aria-invalid={Boolean(err.name)} />
      </Field>

      <Field label={copy.phone} error={err.phone === "phone" ? copy.errorPhone : err.phone ? copy.errorRequired : undefined} id="lead-phone">
        <div dir="ltr" className="flex gap-2">
          <select name="prefix" aria-label={copy.prefix} defaultValue="+971" className={cn(field, "w-28 shrink-0")}>
            {PREFIXES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} aria-invalid={Boolean(err.phone)} />
        </div>
      </Field>

      <Field label={copy.business} error={err.business && copy.errorRequired} id="lead-business">
        <input id="lead-business" name="business" autoComplete="organization" required className={field} aria-invalid={Boolean(err.business)} />
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">{copy.interest}</legend>
        <div className="flex flex-wrap gap-2">
          {copy.options.map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input type="radio" name="interest" value={opt.value} className="peer sr-only" required />
              <span
                dir="ltr"
                className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium text-muted transition-colors peer-checked:border-accent-700 peer-checked:text-accent-700 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500 hover:border-accent-500"
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
        {err.interest && <p className="mt-2 text-sm text-brand-700">{copy.errorRequired}</p>}
      </fieldset>

      {withMessage && copy.message && (
        <Field label={copy.message} id="lead-message">
          <textarea id="lead-message" name="message" rows={4} className={cn(field, "h-auto py-3")} />
        </Field>
      )}

      {state.status === "error" && state.server && <p className="text-sm text-brand-700">{copy.errorServer}</p>}

      <button type="submit" disabled={pending} className={buttonClasses({ block: true })}>
        {pending ? copy.sending : copy.send}
      </button>
      <p className="text-sm text-faint">{copy.note}</p>
    </form>
  );
}

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-brand-700">
          {error}
        </p>
      )}
    </div>
  );
}
