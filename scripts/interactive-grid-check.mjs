import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
const errors=[];
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror',e=>errors.push(e.message));
await fs.mkdir('.artifacts/interactive-grid',{recursive:true});
try {
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
await page.waitForTimeout(800);
const grids=page.locator('[data-interactive-grid]');
assert.equal(await grids.count(),3);
for(let i=0;i<3;i++) {
 const grid=grids.nth(i), section=grid.locator('..');
 await section.scrollIntoViewIfNeeded();
 const bounds=await section.boundingBox();
 const x=30,y=Math.max(180,bounds.y+80);
 await page.mouse.move(x,y);await page.waitForTimeout(500);
 assert.equal(await grid.getAttribute('data-active'),'true');
 const a=await grid.evaluate(e=>({x:e.style.getPropertyValue('--mouse-x'),opacity:getComputedStyle(e.children[2]).opacity,mask:getComputedStyle(e.children[2]).maskImage,base:getComputedStyle(e.children[0]).backgroundImage}));
 assert.ok(Number(a.opacity)>.5);assert.ok(a.mask.includes('radial-gradient'));assert.ok(a.base.includes('linear-gradient'));
 await page.screenshot({path:`.artifacts/interactive-grid/section-${i}-hover.png`});
 await page.mouse.move(120,y+35);await page.waitForTimeout(50);
 assert.notEqual(await grid.evaluate(e=>e.style.getPropertyValue('--mouse-x')),a.x);
 if(i===1){const card=section.locator('article').first();await card.hover();assert.equal(await grid.getAttribute('data-active'),'true');}
 await section.dispatchEvent('pointerleave');await page.waitForTimeout(500);
 assert.equal(await grid.getAttribute('data-active'),'false');
 assert.equal(await grid.evaluate(e=>getComputedStyle(e.children[2]).opacity),'0');
 console.log(`PASS section ${i}: pointer follow, illuminated grid mask, fade`);
}
await page.emulateMedia({reducedMotion:'reduce'});
assert.equal(await grids.first().evaluate(e=>getComputedStyle(e.children[2]).display),'none');
for(const width of [375,768,1024,1440]){await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:`.artifacts/interactive-grid/layout-${width}.png`});}
const mobile=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});await mobile.goto('http://localhost:3000',{waitUntil:'networkidle'});await mobile.touchscreen.tap(30,180);assert.equal(await mobile.locator('[data-interactive-grid]').first().getAttribute('data-active'),'false');await mobile.close();
assert.deepEqual(errors,[]);console.log('PASS responsive widths, reduced motion, touch, no page errors');
}finally{await browser.close();}

