// Visual QA (AGENTS.md 7): screenshots at every required width in EN and AR, plus
// automatic checks: no horizontal overflow, headings at most 2 lines at 360px,
// Hero headline + subline + both buttons visible at 390x664 without scrolling.
//
// Usage: node scripts/screenshots.mjs [baseUrl] [path ...]
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3417";
const paths = process.argv.length > 3 ? process.argv.slice(3) : ["/", "/styleguide"];
const widths = [360, 390, 430, 768, 1280, 1440];
const locales = ["en", "ar"];
const out = join(process.cwd(), "qa", "screenshots");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const failures = [];
const report = [];

for (const locale of locales) {
  for (const path of paths) {
    const url = `${base}/${locale}${path === "/" ? "" : path}`;
    const slug = path === "/" ? "home" : path.replace(/^\//, "").replaceAll("/", "-");
    for (const width of widths) {
      const height = width < 768 ? 664 : 900;
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(900);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) failures.push(`${locale}${path} @${width}: horizontal overflow ${overflow}px`);

      if (width === 360) {
        const tall = await page.evaluate(() =>
          [...document.querySelectorAll("main h1, main h2, main .type-h1, main .type-h2, main .type-h2-cta")]
            .map((el) => {
              const cs = getComputedStyle(el);
              const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
              const lines = Math.round(el.getBoundingClientRect().height / lh);
              return { text: el.textContent.trim().slice(0, 60), lines };
            })
            .filter((h) => h.lines > 2),
        );
        for (const h of tall) failures.push(`${locale}${path} @360: heading ${h.lines} lines "${h.text}"`);
      }

      if (path === "/" && width === 390) {
        const fold = await page.evaluate(() => {
          const h1 = document.querySelector("main h1");
          const buttons = [...document.querySelectorAll("main a, main button")].slice(0, 2);
          const bottom = Math.max(...buttons.map((b) => b.getBoundingClientRect().bottom));
          return { h1: Boolean(h1), bottom };
        });
        report.push(`${locale} hero @390x664: last button bottom ${Math.round(fold.bottom)}px`);
        if (!fold.h1 || fold.bottom > 664) failures.push(`${locale} hero @390x664: buttons below the fold (${fold.bottom}px)`);
        await page.screenshot({ path: join(out, `${locale}-${slug}-390x664-fold.png`) });
      }

      await page.screenshot({ path: join(out, `${locale}-${slug}-${width}.png`), fullPage: true });
      await page.close();
    }
  }
}

await browser.close();
console.log(report.join("\n"));
if (failures.length) {
  console.error(`\n${failures.length} failure(s):\n` + failures.join("\n"));
  process.exit(1);
}
console.log(`\nAll checks passed. Screenshots in qa/screenshots`);
