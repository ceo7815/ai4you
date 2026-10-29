// Builds messages/ar.json from the transcribed parts in messages/ar-parts/*.json (base.json first).
// Every key in en.json must exist in ar.json; anything not transcribed becomes a visible
// "[يُستكمل: ...]" placeholder (AGENTS.md 3.4), never a translation.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "messages");
const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (isObj(value) && isObj(target[key])) deepMerge(target[key], value);
    else target[key] = value;
  }
  return target;
}

const partsDir = join(dir, "ar-parts");
const files = readdirSync(partsDir).filter((f) => f.endsWith(".json")).sort((a, b) => (a === "base.json" ? -1 : b === "base.json" ? 1 : a.localeCompare(b)));
const ar = files.reduce((acc, f) => deepMerge(acc, read(join(partsDir, f))), {});
const en = read(join(dir, "en.json"));

const missing = [];
function fill(enNode, arNode, path) {
  if (Array.isArray(enNode)) {
    return enNode.map((item, i) => fill(item, Array.isArray(arNode) ? arNode[i] : undefined, `${path}[${i}]`));
  }
  if (isObj(enNode)) {
    return Object.fromEntries(Object.entries(enNode).map(([k, v]) => [k, fill(v, isObj(arNode) ? arNode[k] : undefined, path ? `${path}.${k}` : k)]));
  }
  if (typeof arNode === "string" && arNode.length > 0) return arNode;
  missing.push(path);
  const tbc = /^\[TBC: (.*)\]$/.exec(enNode);
  return `[يُستكمل: ${tbc ? tbc[1] : path}]`;
}

writeFileSync(join(dir, "ar.json"), JSON.stringify(fill(en, ar, ""), null, 2) + "\n");
console.log(`ar.json written from ${files.length} part(s); ${missing.length} placeholder(s).`);
if (process.argv.includes("--list")) for (const m of missing) console.log("  -", m);
