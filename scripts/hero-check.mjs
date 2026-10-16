import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

await mkdir('.artifacts', {recursive:true});
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
const hero = page.locator('section[aria-labelledby="home-hero-title"]');
const cards = hero.locator('article > a');
try {
  const viewports = [
    {width:1366,height:768}, {width:1440,height:900},
    {width:1536,height:864}, {width:1920,height:1080},
    ...[320,375,390,430,768,1024].map(width=>({width,height:width < 768 ? 844 : 1000})),
  ];
  for (const {width,height} of process.argv.includes('--interactions-only') ? [] : viewports) {
    await page.setViewportSize({width,height});
    await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
    await expect(hero.locator('article').last()).toHaveCSS('opacity','1');
    await expect(cards).toHaveCount(3);
    await expect(hero.locator('img')).toHaveJSProperty('complete',true);
    assert.ok(await hero.locator('img').evaluate(img=>img.naturalWidth>0));
    const layout = await hero.evaluate(el => {
      const scene = el.querySelector('[class*="__stage"]').getBoundingClientRect();
      const cardRects = [...el.querySelectorAll('article > a')].map(card => card.getBoundingClientRect());
      const cta = el.querySelector('[class*="__cta"]').getBoundingClientRect();
      const intro = document.querySelector('#introduction').getBoundingClientRect();
      const nav = document.querySelector('.site-header').getBoundingClientRect();
      const clipped = [...el.querySelectorAll('h1, h2, p, article > a')].filter(child=>{
        const r = child.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth + 1 || child.scrollWidth > child.clientWidth + 1;
      }).map(child=>child.textContent);
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        navOverlap: scene.top < nav.bottom - 1,
        textCollision: cta.bottom + 20 >= cardRects[0].top,
        nextCollision: Math.max(...cardRects.map(r=>r.bottom)) > intro.top,
        clipped,
        widths:cardRects.map(r=>Math.round(r.width)),
        heights:cardRects.map(r=>Math.round(r.height)),
        headlineSize:parseFloat(getComputedStyle(el.querySelector('h1')).fontSize),
        contained:cardRects.every(r=>r.top>=scene.top && r.bottom<=scene.bottom),
        bottomSpace:scene.bottom-Math.max(...cardRects.map(r=>r.bottom)),
        row:cardRects.every(r=>Math.abs(r.top-cardRects[0].top)<1),
      };
    });
    for (const key of ['overflow','navOverlap','textCollision','nextCollision']) assert.equal(layout[key],false,JSON.stringify({width,...layout}));
    assert.deepEqual(layout.clipped,[],JSON.stringify({width,...layout}));
    assert.equal(layout.contained,true,JSON.stringify({width,height,...layout}));
    if (width >= 1024) {
      assert.equal(layout.row,true);
      assert.ok(layout.bottomSpace >= 32 && layout.bottomSpace <= 56, JSON.stringify({width,...layout}));
      assert.ok(Math.max(...layout.heights)-Math.min(...layout.heights)<2);
    }
    if (width >= 1440) {
      assert.ok(layout.widths[0] >= 350 && layout.heights[0] >= 330 && layout.heights[0] <= 380);
      assert.ok(layout.headlineSize >= 72);
    }
    assert.equal(await hero.locator('svg').count(),5);
    assert.deepEqual(await hero.locator('[class*="__visual"]').allTextContents(),['','','']);
    await expect(hero.locator('h2')).toHaveText(['SECURE','COMPLIANT','TRUSTED']);
    console.log(JSON.stringify({width,height,...layout}));
    if ([375,768,1024,1366,1440,1536,1920].includes(width)) {
      await page.getByRole('button',{name:'Pause hero motion'}).click();
      await page.evaluate(()=>window.scrollTo(0,0));
      await hero.screenshot({path:`.artifacts/integrated-hero-${width}.png`});
    }
  }
  assert.deepEqual(errors,[]);
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
  await expect(hero.locator('article').last()).toHaveCSS('opacity','1');
  const first = cards.first();
  await first.hover();
  await page.waitForTimeout(1250);
  const hover = await first.evaluate(el=>({ transform:getComputedStyle(el).transform, arrow:getComputedStyle(el.querySelector('span:last-child svg')).transform, visual:getComputedStyle(el.querySelector('div')).transform }));
  const hoverMatrix=hover.transform.match(/matrix\((.+)\)/)[1].split(',').map(Number);
  assert.ok(Math.abs(hoverMatrix[0]-1.008)<.001 && Math.abs(hoverMatrix[5]+8)<.1);
  assert.equal(hover.arrow,'matrix(1, 0, 0, 1, 6, 0)');
  assert.equal(hover.visual,'none');
  await expect(cards.nth(1)).toHaveCSS('opacity','0.82');
  await expect(cards.nth(2)).toHaveCSS('opacity','0.82');
  const aligned = await first.locator('[class*="__identityLines"] span').evaluateAll(lines=>lines.every(line=>Math.abs(new DOMMatrix(getComputedStyle(line).transform).m41)<.1));
  assert.equal(aligned,true);
  await page.mouse.move(20,200);
  await expect(cards.nth(1)).toHaveCSS('opacity','1');
  await expect(cards.nth(2)).toHaveCSS('opacity','1');
  await first.focus();
  assert.equal(await first.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');
  await page.keyboard.press('Tab');
  await expect(cards.nth(1)).toBeFocused();
  await page.getByRole('button',{name:'Pause hero motion'}).click();
  const paused = await hero.locator('[class*="__media"]').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).animationPlayState==='paused'||getComputedStyle(el).animationName==='none'));
  assert.equal(paused,true);
  await page.mouse.move(20,200);
  await page.getByRole('button',{name:'Resume hero motion'}).click();
  await page.mouse.move(1250,260);
  await page.waitForTimeout(600);
  const pointer = await hero.locator('[class*="__mediaPointer"]').evaluate(el=>getComputedStyle(el).transform);
  assert.notEqual(pointer,'none');
  const pointerNumbers=pointer.match(/matrix\((.+)\)/)[1].split(',').map(Number);
  assert.ok(Math.abs(pointerNumbers[4]) <= 4 && Math.abs(pointerNumbers[5]) <= 3);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.getByRole('button',{name:'Pause hero motion'})).toBeHidden();
  await first.hover();
  assert.equal(await first.evaluate(el=>getComputedStyle(el).transform),'none');
  assert.equal(await hero.locator('[class*="__mediaPointer"]').evaluate(el=>getComputedStyle(el).transform),'none');
  assert.ok(await hero.locator('[class*="__identity"] span').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).animationName==='none')));
  assert.deepEqual(errors,[]);
  console.log('Contained cards, hover emphasis/reset, geometry alignment, arrow, keyboard focus, pause, pointer bounds, reduced motion and console passed.');
} finally { await browser.close(); }
