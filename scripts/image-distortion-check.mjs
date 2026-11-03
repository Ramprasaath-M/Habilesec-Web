import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({args:['--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await mkdir('.artifacts/distortion',{recursive:true});
try{
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
const section=page.locator('#cybersecurity-capabilities'),canvas=section.locator('canvas');
await section.scrollIntoViewIfNeeded();await page.waitForTimeout(1600);
await page.addStyleTag({content:'#cybersecurity-capabilities *{animation-play-state:paused!important;transition:none!important}'});
await expect(canvas).toHaveAttribute('data-distortion',/ready|idle/);
const bounds=await section.boundingBox();const visual=await section.locator('img').evaluate(el=>{const r=el.parentElement.parentElement.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}});
await section.screenshot({path:'.artifacts/distortion/static.png'});
const point={x:visual.x+visual.width*.52,y:visual.y+visual.height*.55};
await page.mouse.move(point.x,point.y);
for(let i=0;i<8;i++){await page.mouse.move(point.x+i*3,point.y+i);await page.waitForTimeout(25)}
await expect(canvas).toHaveAttribute('data-distortion','active');
const first=await canvas.screenshot({path:'.artifacts/distortion/active.png'});
await page.mouse.move(point.x+70,point.y-30,{steps:8});
await expect(canvas).toHaveAttribute('data-distortion','active');
const second=await canvas.screenshot();assert.notDeepEqual(first,second);
await page.mouse.move(30,point.y);await page.waitForTimeout(750);
await expect(canvas).toHaveCSS('visibility','hidden');assert.deepEqual(await section.boundingBox(),bounds);
await section.screenshot({path:'.artifacts/distortion/recovered.png'});
await expect(section.locator('li')).toHaveCount(5);await expect(canvas).toHaveCSS('pointer-events','none');
await page.emulateMedia({reducedMotion:'reduce'});await expect(canvas).toHaveAttribute('data-distortion','disabled');
await page.mouse.move(point.x,point.y);await page.waitForTimeout(100);await expect(canvas).toHaveCSS('visibility','hidden');
const mobile=await browser.newPage({viewport:{width:375,height:844},hasTouch:true,isMobile:true});
await mobile.goto('http://localhost:3000',{waitUntil:'networkidle'});await mobile.locator('#cybersecurity-capabilities').scrollIntoViewIfNeeded();
await expect(mobile.locator('#cybersecurity-capabilities canvas')).toHaveAttribute('data-distortion','disabled');
assert.ok(await mobile.locator('#cybersecurity-capabilities img').evaluate(el=>el.complete&&el.naturalWidth>0));
assert.equal(await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await mobile.close();
const fallback=await browser.newPage();await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl')return null;return original.call(this,type,...args)}});
await fallback.goto('http://localhost:3000',{waitUntil:'networkidle'});await fallback.locator('#cybersecurity-capabilities').scrollIntoViewIfNeeded();
await expect(fallback.locator('#cybersecurity-capabilities canvas')).toHaveAttribute('data-distortion','unavailable');assert.ok(await fallback.locator('#cybersecurity-capabilities img').evaluate(el=>el.complete&&el.naturalWidth>0));await fallback.close();
assert.deepEqual(errors,[]);console.log('PASS actual changing WebGL pixels, pointer tracking/recovery, unchanged bounds/cards, reduced motion, touch, unavailable WebGL fallback, no page errors');
}finally{await browser.close()}
