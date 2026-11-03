// Regenerates data/world-map-dots.ts from the project's own verified
// world-map.svg (public/images/home/trust-indicators/world-map.svg), so the
// footer's dotted map matches the homepage trust-strip map exactly. Run with:
//   node scripts/extract-world-map-dots.mjs
import { readFileSync, writeFileSync } from "node:fs";

const svgPath = "public/images/home/trust-indicators/world-map.svg";
const svg = readFileSync(svgPath, "utf8");
const re = /<circle cx="([\d.]+)" cy="([\d.]+)" r="[\d.]+"\/>/g;
const pts = [];
let m;
while ((m = re.exec(svg))) pts.push(`${m[1]},${m[2]}`);
const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
const flat = pts.join(",");

const out = `// World map dot coordinates, extracted from the project's own verified
// world-map.svg (public/images/home/trust-indicators/world-map.svg) — the
// same accurate silhouette already used on the homepage trust section, so
// the footer's map matches it exactly. Flat [x, y, x, y, ...] pairs in the
// source SVG's own coordinate space (viewBox="${viewBox}").
// Regenerate with: node scripts/extract-world-map-dots.mjs
export const WORLD_MAP_VIEWBOX = { x: 0, y: 40, width: 720, height: 270 } as const;
export const worldMapDots: readonly number[] = [${flat}];
`;
writeFileSync("data/world-map-dots.ts", out);
console.log("wrote data/world-map-dots.ts", pts.length, "points");
