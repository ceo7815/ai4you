/** `/` follows NEXT_LOCALE, then Accept-Language. Arabic only when the header starts with ar. */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname !== "/") return context.next();

  const cookie = context.request.headers.get("cookie") ?? "";
  const saved = cookie.match(/(?:^|;\s*)NEXT_LOCALE=(en|ar)(?:\s*;|$)/);
  const accept = context.request.headers.get("accept-language") ?? "";
  const locale = saved?.[1] ?? (/^ar\b/i.test(accept.trim()) ? "ar" : "en");

  return Response.redirect(new URL(`/${locale}`, url), 302);
}
