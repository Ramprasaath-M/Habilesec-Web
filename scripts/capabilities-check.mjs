import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const base=process.env.NAVBAR_TEST_URL||'http://localhost:3000';
const b=await chromium.launch();const page=await b.newPage();const errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await mkdir('.artifacts/capabilities',{recursive:true});const section=page.locator('#cybersecurity-capabilities');
try {
for(const width of [375,430,768,1024,1440,1920]){
 await page.setViewportSize({width,height:width<768?844:1000});await page.goto(base,{waitUntil:'networkidle'});await expect(section).toHaveCount(1);
 const previous=await section.evaluate(el=>el.previousElementSibling.id);
 assert.equal(previous,process.env.NAVBAR_TEST_URL?'about-habilesec':'company-statistics');
 await expect(section.locator('h2')).toHaveText('End-to-End Cybersecurity Expertise. Built Around Your Business.');
 await expect(section.locator('p').first()).toHaveText('OUR CYBERSECURITY CAPABILITIES');
 await expect(section.locator('p').last()).toHaveText('From security assessments and risk management to cloud security, compliance, threat monitoring, and incident response, HabileSec brings together cybersecurity capabilities to help organizations identify risks, strengthen defenses, and navigate evolving security challenges.');
 await section.scrollIntoViewIfNeeded();await expect(section).toHaveAttribute('data-seen','true');await page.waitForTimeout(1300);
 const image=section.locator('img');await image.scrollIntoViewIfNeeded();await expect(image).toHaveJSProperty('complete',true);assert.ok(await image.evaluate(el=>el.naturalWidth>0));
 await expect(section.locator('li')).toHaveCount(5);await expect(section.locator('li span')).toHaveText(['Assess','Comply','Secure','Monitor','Respond']);
 const layout=await section.evaluate(el=>{const cards=[...el.querySelectorAll('li')].map(x=>{let r=x.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}});const text=el.querySelector('h2').parentElement.getBoundingClientRect();const scene=el.querySelector('img').parentElement.parentElement.getBoundingClientRect();return{cards,text:{x:text.x,right:text.right,y:text.y,bottom:text.bottom},scene:{x:scene.x,right:scene.right,y:scene.y,bottom:scene.bottom}}});
 for(let i=0;i<5;i++){const card=layout.cards[i];assert.ok(card.x>=0&&card.right<=width+1);assert.ok(card.y>=layout.scene.y-1&&card.bottom<=layout.scene.bottom+1);for(let j=i+1;j<5;j++){const other=layout.cards[j];assert.ok(card.right<=other.x||other.right<=card.x||card.bottom<=other.y||other.bottom<=card.y)}}
 if(width>=768)assert.ok(layout.cards.every(c=>c.x>=layout.text.right));else assert.ok(layout.text.bottom<=layout.scene.y+1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if([375,1440].includes(width)) await section.screenshot({path:`.artifacts/capabilities/section-${width}.png`});
 console.log('PASS '+width+'px: exact copy, order, image, five separate non-overlapping boxes, no overflow');
}
await page.setViewportSize({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle'});await section.scrollIntoViewIfNeeded();await page.waitForTimeout(1400);
const float=section.locator('li > div').first();const first=await float.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(400);assert.notEqual(await float.evaluate(el=>getComputedStyle(el).transform),first);
await page.emulateMedia({reducedMotion:'reduce'});for(const el of await section.locator('li > div,svg[class*="_rings"]').all())await expect(el).toHaveCSS('animation-name','none');
await section.getByRole('link',{name:'Explore Our Capabilities'}).click();await expect(page).toHaveURL(base+'/what-we-do');assert.equal((await page.request.get(base+'/what-we-do')).status(),200);assert.deepEqual(errors,[]);console.log('PASS floating animation, reduced motion, CTA, no console/hydration errors');
}finally{await b.close()}
