import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { parseLead } from "./lib/lead";

const handleI18n = createMiddleware(routing);

/** Dev stand-in. On Cloudflare Pages the same path is functions/api/contact.js. */
async function handleContact(request: NextRequest) {
  try {
    const { state, lead } = parseLead(await request.formData());
    if (lead) console.info("[contact] lead", JSON.stringify({ ...lead, timestamp: new Date().toISOString() }));
    return NextResponse.json(state);
  } catch {
    return NextResponse.json({ status: "error", fields: {}, server: true });
  }
}

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/contact") {
    if (request.method !== "POST") return NextResponse.json({ status: "error", fields: {}, server: true }, { status: 405 });
    return handleContact(request);
  }
  return handleI18n(request);
}

export const config = {
  matcher: ["/api/contact", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
