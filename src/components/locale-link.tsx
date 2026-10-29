import type { ComponentProps } from "react";
import NextLink from "next/link";
import { getLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

/**
 * Server-only internal link with the locale prefix resolved on the server.
 * Avoids next-intl's client Link, which needs NextIntlClientProvider (and its message formatter) in the bundle.
 */
export async function LocaleLink({ href, ...props }: Props) {
  const locale = await getLocale();
  return <NextLink href={getPathname({ href, locale })} {...props} />;
}
