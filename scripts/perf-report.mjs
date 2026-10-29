// Usage: node scripts/perf-report.mjs [baseUrl]
// Initial JS (gzip) per locale, then a summary of qa/lh-*.json if present.
import { gzipSync } from "node:zlib";
import { existsSync, readFileSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3417";

for (const path of ["/en", "/ar"]) {
  const html = await (await fetch(base + path)).text();
  // noModule polyfills are never fetched by modern browsers, so they are not part of the initial JS budget.
  const tags = [...html.matchAll(/<script[^>]*src="(\/_next\/static\/[^"]+?\.js)"[^>]*>/g)];
  const scripts = [...new Set(tags.filter((m) => !/noModule/i.test(m[0])).map((m) => m[1]))];
  let total = 0;
  for (const src of scripts) {
    const buf = Buffer.from(await (await fetch(base + src)).arrayBuffer());
    total += gzipSync(buf, { level: 9 }).length;
  }
  console.log(`${path}: ${scripts.length} scripts, ${(total / 1024).toFixed(1)}KB gzip`);
}

for (const locale of ["en", "ar"]) {
  const file = `qa/lh-${locale}.json`;
  if (!existsSync(file)) continue;
  const r = JSON.parse(readFileSync(file, "utf8"));
  const scores = Object.values(r.categories).map((c) => `${c.id}:${Math.round(c.score * 100)}`).join(" ");
  const a = r.audits;
  console.log(
    `${locale} ${scores} | LCP ${a["largest-contentful-paint"].displayValue} CLS ${a["cumulative-layout-shift"].displayValue} TBT ${a["total-blocking-time"].displayValue}`,
  );
  for (const audit of Object.values(a)) {
    if (audit.score !== null && audit.score < 0.9 && !["informative", "notApplicable", "manual"].includes(audit.scoreDisplayMode)) {
      console.log(`  - ${audit.id} (${audit.score})`);
    }
  }
}
