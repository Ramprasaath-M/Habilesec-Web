import fs from 'node:fs';import assert from 'node:assert/strict';
const records=JSON.parse(fs.readFileSync('.artifacts/typography-audit/verified.json','utf8'));
assert.equal(new Set(records.map(r=>r.route)).size,44);assert.equal(records.length,176);
const issues=records.filter(r=>r.status!==200||r.h1!==1||r.overflow||r.errors?.length||r.error);assert.deepEqual(issues,[]);
const text=records.flatMap(r=>r.texts);assert.ok(text.every(t=>t.size>=12));assert.ok(text.every(t=>/dm\s?sans/i.test(t.font)));
const solid=text.filter(t=>!t.complex);assert.deepEqual(solid.filter(t=>t.contrast<t.threshold),[]);
const pixel=JSON.parse(fs.readFileSync('.artifacts/typography-audit/pixel-contrast.json','utf8'));assert.deepEqual(pixel.filter(t=>t.min<t.threshold),[]);
const base=JSON.parse(fs.readFileSync('.artifacts/typography-audit/baseline-source.json','utf8'));const changed=Object.entries(base).filter(([f,v])=>fs.readFileSync(f,'utf8')!==v).map(([f])=>f);const summary={routes:44,viewportChecks:176,widths:[375,768,1280,1440],textSamples:text.length,solidContrastSamples:solid.length,pixelContrastSamples:pixel.length,lowestPixelRatio:Math.min(...pixel.map(p=>p.min)),changedSourceFiles:changed};fs.writeFileSync('.artifacts/typography-audit/summary.json',JSON.stringify(summary,null,2));console.log(summary);
