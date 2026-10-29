// Measures how many lines a heading takes at each scale step, per locale and width,
// using the real fonts. Used to pick the single step-down required by spec 2 (":lang" rule).
// Usage: node scripts/measure-headings.mjs [baseUrl]
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3417";
const cases = {
  en: {
    h1: "AI built for your business, working for you",
    h2: "Years of experience. Hundreds of solutions. Every field.",
    cta: "Sound like your business?",
  },
  ar: {
    h1: "ذكاء اصطناعي مبني لأعمالك ويعمل من أجلك",
    h2: "سنوات من الخبرة. مئات الحلول. في كل مجال.",
    cta: "هل يبدو هذا مثل شركتك؟",
  },
};
const sizes = { h1: [40, 36, 30, 28, 26, 24], h2: [28, 24, 22, 20], cta: [35.2, 30] };
const roles = { h1: "type-h1", h2: "type-h2", cta: "type-h2-cta" };

const browser = await chromium.launch();
for (const [locale, texts] of Object.entries(cases)) {
  for (const width of [360, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const rows = await page.evaluate(
      ({ texts, sizes, roles }) => {
        const host = document.createElement("div");
        host.className = "container-site";
        document.body.append(host);
        const out = [];
        for (const [role, text] of Object.entries(texts)) {
          for (const px of sizes[role]) {
            const el = document.createElement("p");
            el.className = roles[role];
            el.style.fontSize = `${px}px`;
            el.textContent = text;
            host.append(el);
            const lh = parseFloat(getComputedStyle(el).lineHeight);
            out.push(`${role} ${px}px: ${Math.round(el.getBoundingClientRect().height / lh)} lines`);
            el.remove();
          }
        }
        host.remove();
        return out;
      },
      { texts, sizes, roles },
    );
    console.log(`${locale} @${width}: ${rows.join(" | ")}`);
    await page.close();
  }
}
await browser.close();
