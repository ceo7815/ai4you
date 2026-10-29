// Guards the AGENTS.md code rules that a linter does not know about:
// 1. no physical direction utilities (ml-, pr-, left-, text-right ...): logical properties only
// 2. no em dash in code or copy, in any language
// 3. no hex colours or Tailwind palette names outside the token file
// 4. no ellipsis truncation of content
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const scan = ["src", "messages"];
const tokenFile = join("src", "styles", "globals.css");

const physical =
  /(?<![\w-])(?:-?(?:ml|mr|pl|pr|left|right|rounded-[lr]|rounded-[tb][lr]|border-[lr]|scroll-m[lr]|scroll-p[lr])-[\w[.\]/%-]+|text-left|text-right|float-left|float-right|clear-left|clear-right)(?![\w-])/g;
const palette =
  /(?<![\w-])(?:bg|text|border|ring|outline|fill|stroke|from|to|via|decoration|shadow|divide|accent|caret)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(?:-\d{2,3})?(?![\w-])/g;
const hex = /#[0-9a-fA-F]{3,8}\b/g;
const truncate = /(?<![\w-])(?:truncate|text-ellipsis|line-clamp-\d)(?![\w-])/g;

/** Files allowed to carry raw hex: the token file, the styleguide reference table, and metadata. */
const hexAllowed = new Set([tokenFile, join("src", "app", "[locale]", "styleguide", "page.tsx"), join("src", "app", "[locale]", "layout.tsx")]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css|json|mdx?)$/.test(name)) out.push(p);
  }
  return out;
}

const problems = [];
for (const base of scan) {
  for (const file of walk(join(root, base))) {
    const rel = relative(root, file);
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      const at = `${rel}:${i + 1}`;
      if (line.includes("\u2014")) problems.push(`${at}  em dash`);
      if (!rel.endsWith(".json")) {
        for (const m of line.matchAll(physical)) {
          if (/^-?(?:left|right)-/.test(m[0]) && /rtl:|ltr:/.test(line)) continue;
          problems.push(`${at}  physical direction "${m[0]}"`);
        }
        for (const m of line.matchAll(palette)) problems.push(`${at}  non-token colour "${m[0]}"`);
        for (const m of line.matchAll(truncate)) problems.push(`${at}  truncation "${m[0]}"`);
        if (!hexAllowed.has(rel) && !line.trim().startsWith("//") && !line.trim().startsWith("*")) {
          for (const m of line.matchAll(hex)) problems.push(`${at}  raw hex "${m[0]}"`);
        }
      }
    });
  }
}

if (problems.length) {
  console.error(`check-rtl: ${problems.length} problem(s)\n` + problems.join("\n"));
  process.exit(1);
}
console.log("check-rtl: clean");
