import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
const base=process.env.GRID_TEST_URL||'http://localhost:3000';
const browser=await chromium.launch({args:['--enable-unsafe-swiftshader']});const errors=[];
const watch=p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text())});};
const pixels=async canvas=>Buffer.from((await canvas.evaluate(el=>el.toDataURL('image/png'))).split(',')[1],'base64');
const raw=async canvas=>sharp(await pixels(canvas)).raw().toBuffer({resolveWithObject:true});
await mkdir('.artifacts/hero-grid',{recursive:true});
try{
const page=await browser.newPage({viewport:{width:1440,height:1000}});watch(page);
await page.addInitScript(()=>{const original=CanvasRenderingContext2D.prototype.stroke;CanvasRenderingContext2D.prototype.stroke=function(...args){if(this.canvas.closest('[data-hero-grid]'))this.canvas.__gridPaints=(this.canvas.__gridPaints||0)+1;return original.apply(this,args)}});
await page.goto(base,{waitUntil:'networkidle'});const grid=page.locator('[data-hero-grid]'),canvas=grid.locator('canvas'),globe=page.locator('[data-global-globe]');
await expect(grid).toHaveAttribute('data-ready','true');await expect(globe).toHaveAttribute('data-ready','true',{timeout:30000});await page.waitForTimeout(1500);
await expect(grid).toHaveAttribute('aria-hidden','true');await expect(canvas).toHaveCSS('pointer-events','none');assert.equal(await canvas.getAttribute('tabindex'),null);
const layout=await page.locator('#home-title').boundingBox(),globeBox=await globe.boundingBox();
const baseline=await raw(canvas),count=await canvas.evaluate(el=>el.__gridPaints);await page.waitForTimeout(200);assert.equal(await canvas.evaluate(el=>el.__gridPaints),count);
for(let i=0;i<16;i++){await page.mouse.move(300+i*5,300+i*2);await page.waitForTimeout(20)}
await expect(grid).toHaveAttribute('data-grid-state','active');const active=await raw(canvas);
let changed=0,outside=0;for(let y=0;y<baseline.info.height;y++)for(let x=0;x<baseline.info.width;x++){const i=(y*baseline.info.width+x)*4;if(Math.abs(active.data[i+3]-baseline.data[i+3])>2){changed++;if(x<80||x>620||y<80||y>580)outside++}}
assert.ok(changed>500,`Expected real locally bent grid pixels, got ${changed}`);assert.equal(outside,0);
assert.deepEqual(await page.locator('#home-title').boundingBox(),layout);assert.deepEqual(await globe.boundingBox(),globeBox);
const rotation=await globe.getAttribute('data-rotation');await page.waitForTimeout(100);assert.notEqual(await globe.getAttribute('data-rotation'),rotation);
await page.waitForTimeout(1000);await expect(grid).toHaveAttribute('data-grid-state','idle');assert.deepEqual((await raw(canvas)).data,baseline.data);
const settled=await canvas.evaluate(el=>el.__gridPaints);await page.waitForTimeout(200);assert.equal(await canvas.evaluate(el=>el.__gridPaints),settled);
for(let i=0;i<10;i++){await page.mouse.move(330+i*3,310+i);await page.waitForTimeout(20)}await page.mouse.move(30,20);await page.waitForTimeout(800);await expect(grid).toHaveAttribute('data-grid-state','idle');assert.deepEqual((await raw(canvas)).data,baseline.data);
await page.mouse.move(350,350);await expect(grid).toHaveAttribute('data-grid-state','active');await page.evaluate(()=>scrollTo({top:1600,behavior:'instant'}));await page.waitForTimeout(150);await expect(grid).toHaveAttribute('data-grid-state','paused');const hidden=await canvas.evaluate(el=>el.__gridPaints);await page.evaluate(()=>scrollTo({top:1700,behavior:'instant'}));await page.waitForTimeout(200);assert.equal(await canvas.evaluate(el=>el.__gridPaints),hidden);
await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(250);await page.mouse.move(340,345);await expect(grid).toHaveAttribute('data-grid-state','active');
await page.emulateMedia({reducedMotion:'reduce'});await expect(grid).toHaveAttribute('data-grid-state','static');await page.mouse.move(400,350);const reduced=await canvas.evaluate(el=>el.__gridPaints);await page.waitForTimeout(200);assert.equal(await canvas.evaluate(el=>el.__gridPaints),reduced);
for(const width of [375,768,1024,1440,1920]){await page.setViewportSize({width,height:width<768?844:1000});await expect(canvas).toHaveJSProperty('width',width);await page.waitForTimeout(150);const h=await grid.boundingBox();const scene=await globe.boundingBox();assert.equal(h.width,width);assert.ok(h.height>=620);assert.ok(scene.width>0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(await grid.evaluate(el=>getComputedStyle(el).getPropertyValue('--grid-spacing').trim()),width<768?'44px':'52px');if([375,1440].includes(width))await page.screenshot({path:`.artifacts/hero-grid/${width}-${process.env.GRID_TEST_URL?'prod':'dev'}.png`});console.log('PASS '+width+'px: static mesh dimensions, spacing, globe/content, no overflow')}
await page.getByRole('link',{name:'Explore Our Services',exact:true}).click();await expect(page).toHaveURL(base+'/what-we-do',{timeout:30000});await page.goto(base);await page.getByRole('link',{name:'Talk to an Expert',exact:true}).click();await expect(page).toHaveURL(base+'/contact',{timeout:30000});await page.close();
const mobile=await browser.newPage({viewport:{width:375,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:3});watch(mobile);await mobile.goto(base,{waitUntil:'networkidle'});const mobileGrid=mobile.locator('[data-hero-grid]');await expect(mobileGrid).toHaveAttribute('data-grid-state','static');await expect(mobileGrid.locator('canvas')).toHaveJSProperty('width',750);await mobile.touchscreen.tap(200,180);await expect(mobileGrid).toHaveAttribute('data-grid-state','static');await mobile.close();
const fallback=await browser.newPage();watch(fallback);await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='2d'?null:original.call(this,type,...args)}});await fallback.goto(base,{waitUntil:'networkidle'});assert.notEqual(await fallback.locator('[data-hero-grid]').evaluate(el=>getComputedStyle(el).backgroundImage),'none');await fallback.close();
assert.deepEqual(errors,[]);console.log(`PASS ${changed} localized changed pixels, untouched distant lines, exact static recovery, sleeping idle/offscreen RAF, stationary settling, reduced motion, touch, DPR cap, CSS fallback, globe continuity, CTAs, no console/hydration errors`);
}finally{await browser.close()}
