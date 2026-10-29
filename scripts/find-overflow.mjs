import { chromium } from "@playwright/test";

const width = Number(process.argv[2] ?? 360);
const path = process.argv[3] ?? "/en";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 800 } });
await page.goto("http://localhost:3417" + path, { waitUntil: "networkidle" });
const rows = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width < 2) continue;
    if (r.right > vw + 2 || r.left < -2) {
      out.push({
        t: el.tagName.toLowerCase(),
        c: String(el.className).slice(0, 90),
        l: Math.round(r.left),
        r: Math.round(r.right),
        w: Math.round(r.width),
      });
    }
  }
  return { vw, scroll: document.documentElement.scrollWidth, out: out.slice(0, 12) };
});
console.log(JSON.stringify(rows, null, 2));
await browser.close();
