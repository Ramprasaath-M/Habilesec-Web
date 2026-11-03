import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const base=process.env.NAVBAR_TEST_URL||'http://localhost:3000';
const browser=await chromium.launch();const page=await browser.newPage();page.setDefaultNavigationTimeout(60000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&['stylesheet','script','font'].includes(r.request().resourceType()))errors.push(`${r.status()} ${r.url()}`)});
const header=page.locator('header:has(nav[aria-label="Primary"])');
const marker=page.locator('[data-home-cover]');const hero=page.locator('section[aria-labelledby="home-title"]');
const scroll=async y=>{await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),Math.max(0,y));await page.waitForTimeout(60)};
const boundary=()=>marker.evaluate(el=>el.getBoundingClientRect().top+scrollY-innerHeight);
const hidden=async()=>{await expect(header).toHaveAttribute('data-covered','true');await expect(header).toHaveAttribute('inert','');await expect(header).toHaveAttribute('aria-hidden','true');};
const shown=async()=>{await expect(header).not.toHaveAttribute('data-covered');await expect(header).not.toHaveAttribute('inert');await expect(header).toHaveCSS('opacity','1');await expect.poll(async()=>Math.abs((await header.boundingBox()).y)).toBeLessThan(1)};
await mkdir('.artifacts/navbar-boundary',{recursive:true});
try{
for(const [width,height] of [[375,844],[375,500],[768,900],[1280,900],[1440,900]]){
 await page.setViewportSize({width,height});await page.goto(base,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);await scroll(0);await expect(header).toHaveCount(1);await shown();
 const entry=await boundary();const initial={header:await header.evaluate(el=>({height:el.offsetHeight,width:el.offsetWidth})),hero:await hero.evaluate(el=>el.offsetHeight),start:await marker.evaluate(el=>el.getBoundingClientRect().top+scrollY)};
 await page.screenshot({path:`.artifacts/navbar-boundary/initial-${width}-${height}.png`});
 if(entry>4){await scroll(entry/2);await shown()}
 // Focus an open menu to exercise cleanup at the new, early boundary.
 if(width<1200)await header.getByRole('button',{name:'Open navigation'}).click();
 const products=header.getByRole('button',{name:'Products',exact:true});await products.focus();await products.press('Enter');await expect(products).toHaveAttribute('aria-expanded','true');
 await scroll(entry+2);await hidden();
 assert.equal(await hero.evaluate(el=>el.offsetHeight),initial.hero);assert.equal(await marker.evaluate(el=>el.getBoundingClientRect().top+scrollY),initial.start);
 assert.ok(await marker.evaluate(el=>el.getBoundingClientRect().top>innerHeight-5),'Hides on entry, while almost all of the hero is still visible');
 assert.equal(await header.evaluate(el=>el.contains(document.activeElement)),false);assert.equal(await header.locator('button[aria-expanded="true"]').count(),0);assert.notEqual(await page.evaluate(()=>document.documentElement.style.overflow),'hidden');
 await expect(header).toHaveCSS('opacity','0');await expect(header).toHaveCSS('visibility','hidden');
 assert.ok(await header.evaluate(el=>Math.abs(new DOMMatrix(getComputedStyle(el).transform).m42+el.offsetHeight)<1));
 assert.equal(await header.evaluate(el=>el.contains(document.elementFromPoint(25,10))),false);
 await page.keyboard.press('Tab');assert.equal(await header.evaluate(el=>el.contains(document.activeElement)),false);
 await scroll(entry+100);await hidden();await scroll(entry+1500);await hidden();await scroll(entry+900);await hidden();
 // Keep the same state inside the one-pixel boundary band: no repeated resets.
 await scroll(entry+1);await hidden();await header.evaluate(el=>{window.__boundaryMutations=0;window.__boundaryObserver=new MutationObserver(ms=>window.__boundaryMutations+=ms.filter(m=>m.attributeName==='data-covered').length);window.__boundaryObserver.observe(el,{attributes:true,attributeFilter:['data-covered']})});
 for(const delta of [1.2,1.4,1.1,1.3,1.2])await scroll(entry+delta);await hidden();assert.equal(await page.evaluate(()=>window.__boundaryMutations),0);await page.evaluate(()=>window.__boundaryObserver.disconnect());
 await scroll(entry+2);await hidden();
 await scroll(Math.max(0,entry-2));await shown();
 await scroll(entry+100);await hidden();await page.reload({waitUntil:'load'});await hidden();
 // A smaller viewport brings the next section completely below the screen.
 await scroll(0);await page.setViewportSize({width,height:Math.min(500,height-3)});await shown();
 assert.deepEqual(await header.evaluate(el=>({height:el.offsetHeight,width:el.offsetWidth})),initial.header);
 assert.ok(Math.abs((await marker.evaluate(el=>el.getBoundingClientRect().top+scrollY))-(await hero.evaluate(el=>el.offsetHeight)))<1);
 await page.setViewportSize({width,height});await page.reload({waitUntil:'load'});await scroll(0);await shown();
 const stableEntry=await boundary();await scroll(stableEntry+60);await hidden();await expect(header).toHaveCSS('visibility','hidden');await page.screenshot({path:`.artifacts/navbar-boundary/entry-${width}-${height}.png`});
 console.log(`PASS ${width}x${height}: initial/hero-only, early entry, hidden lower/up-scroll, one-pixel hysteresis, focus/menu cleanup, reload/resize, geometry`);
}
// Reverse to a strictly offscreen boundary and test reduced motion explicitly.
await page.setViewportSize({width:1440,height:500});await page.goto(base,{waitUntil:'load'});const entry=await boundary();await scroll(entry+2);await hidden();await scroll(entry-2);await shown();await page.emulateMedia({reducedMotion:'reduce'});await scroll(entry+2);await hidden();assert.ok(await header.evaluate(el=>parseFloat(getComputedStyle(el).transitionDuration)<.001));await page.emulateMedia({reducedMotion:'no-preference'});
for(const width of [375,768,1440])for(const route of ['/about','/services','/products','/insights','/industries','/contact']){await page.setViewportSize({width,height:900});await page.goto(base+route,{waitUntil:'load'});await expect(header).toHaveCount(1);await scroll(1000);await expect(header).not.toHaveAttribute('data-covered');await expect(header).not.toHaveAttribute('inert');await expect.poll(async()=>Math.abs((await header.boundingBox()).y)).toBeLessThan(1)}
assert.deepEqual(errors,[]);console.log('PASS reverse boundary, reduced motion, 18 internal-page viewport checks, no page or CSS/script/font errors');
}finally{await browser.close()}
