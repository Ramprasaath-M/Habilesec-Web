import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,stat} from 'node:fs/promises';
const base=process.env.GLOBE_TEST_URL||'http://localhost:3000';
const browser=await chromium.launch({args:['--enable-unsafe-swiftshader']});
await mkdir('.artifacts/globe',{recursive:true});
const errors=[];const watch=page=>{page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});};
try{
for(const path of ['public/images/hero/globe/earth-day.webp','public/images/hero/globe/earth-night.webp','public/images/hero/globe/earth-connected-blue.webp'])assert.ok((await stat(path)).size>0);
const page=await browser.newPage({viewport:{width:1440,height:1000}});watch(page);
const missing=[];page.on('response',r=>{if(r.url().includes('/images/hero/')&&r.status()>=400)missing.push(r.url())});
for(const width of [375,768,1024,1440,1920]){
await page.setViewportSize({width,height:width<768?844:1000});await page.goto(base,{waitUntil:'networkidle'});
const globe=page.locator('[data-global-globe]');const heading=page.locator('#home-title');const before=await heading.boundingBox();
await expect(globe).toHaveAttribute('data-ready','true',{timeout:30000});await page.waitForTimeout(950);
const after=await heading.boundingBox();for(const key of Object.keys(before))assert.ok(Math.abs(after[key]-before[key])<.5);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
await expect(heading).toHaveText('Understand Risks.Take the Right Action.');
await expect(page.getByRole('link',{name:'Explore Our Services',exact:true})).toHaveAttribute('href','/what-we-do');
await expect(page.getByRole('link',{name:'Talk to an Expert',exact:true})).toHaveAttribute('href','/contact');
await expect(globe.locator('canvas')).toHaveCount(1);await expect(globe.locator('img')).toHaveAttribute('src',/earth-connected-blue/);await expect(globe).toHaveAttribute('aria-hidden','true');await expect(globe.locator('canvas')).toHaveCSS('pointer-events','none');
const rotation=await globe.getAttribute('data-rotation');await page.waitForTimeout(150);assert.notEqual(await globe.getAttribute('data-rotation'),rotation);
if([375,768,1440].includes(width))await page.screenshot({path:`.artifacts/globe/${width}-${process.env.GLOBE_TEST_URL?'prod':'dev'}.png`});
console.log(`PASS ${width}px: live globe, exact heading/CTA routes, fixed layout, no overflow`);
}
const globe=page.locator('[data-global-globe]');
await page.evaluate(()=>window.scrollTo(0,1500));await page.waitForTimeout(200);const paused=await globe.getAttribute('data-rotation');await page.waitForTimeout(250);assert.equal(await globe.getAttribute('data-rotation'),paused);
await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(250);assert.notEqual(await globe.getAttribute('data-rotation'),paused);
// Exercise actual browser context loss and restoration.
await globe.locator('canvas').evaluate(canvas=>{const gl=canvas.getContext('webgl2');window.__globeRestore=gl.getExtension('WEBGL_lose_context');window.__globeRestore.loseContext()});
await expect(globe).toHaveAttribute('data-ready','false');await expect(globe.locator('img')).toHaveCSS('opacity','1');
await page.evaluate(()=>window.__globeRestore.restoreContext());await expect(globe).toHaveAttribute('data-ready','true',{timeout:15000});
await page.emulateMedia({reducedMotion:'reduce'});await expect(globe.locator('canvas')).toHaveCount(0);await expect(globe.locator('img')).toHaveCSS('opacity','1');
await page.emulateMedia({reducedMotion:'no-preference'});await expect(globe).toHaveAttribute('data-ready','true');await expect(globe.locator('canvas')).toHaveCount(1);
await page.getByRole('link',{name:'Explore Our Services',exact:true}).click();await expect(page).toHaveURL(base+'/what-we-do',{timeout:30000});
await page.goto(base);await page.getByRole('link',{name:'Talk to an Expert',exact:true}).click();await expect(page).toHaveURL(base+'/contact',{timeout:30000});
await page.close();
for(const mode of ['reduced','webgl','texture','touch']){
const p=await browser.newPage({viewport:{width:375,height:844},hasTouch:mode==='touch',isMobile:mode==='touch',reducedMotion:mode==='reduced'?'reduce':'no-preference'});if(mode!=='texture')watch(p);
if(mode==='webgl')await p.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl2'?null:original.call(this,type,...args)}});
if(mode==='texture')await p.route('**/images/hero/globe/earth-day.webp',r=>r.abort());
await p.goto(base,{waitUntil:'networkidle'});const g=p.locator('[data-global-globe]');
if(mode==='touch')await expect(g).toHaveAttribute('data-ready','true');else{await p.waitForTimeout(500);assert.notEqual(await g.getAttribute('data-ready'),'true');await expect(g.locator('img')).toHaveCSS('opacity','1');}
assert.ok(await g.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0));await expect(p.locator('#home-title')).toBeVisible();await p.close();console.log('PASS '+mode+' fallback/behavior');
}
assert.deepEqual(missing,[]);assert.deepEqual(errors,[]);console.log('PASS viewport pause/resume, context recovery, motion preference changes, actual CTA navigation, assets, no console/hydration errors');
}finally{await browser.close()}


