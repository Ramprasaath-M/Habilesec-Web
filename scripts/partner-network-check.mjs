import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const base = process.env.NAVBAR_TEST_URL || 'http://localhost:3000';
const old = 'C:/Users/Habilesec/OneDrive/Desktop/Habilesec Ex/habilesec-site-new';
const logos = JSON.parse(await readFile('data/partner-network.json', 'utf8'));
const source = await readFile(old + '/src/lib/content.js', 'utf8');
const sourceList = source.split('export const PARTNERS = [')[1].split('];')[0];
const names = [...sourceList.matchAll(/name: "([^"]+)"/g)].map(match => match[1]);
assert.equal(logos.length, 11);
assert.deepEqual(logos.map(logo => logo.name), names);
const hash = data => createHash('sha256').update(data).digest('hex');
for (const logo of logos) assert.equal(hash(await readFile('public' + logo.src)), hash(await readFile(old + '/public' + logo.original)));
await mkdir('.artifacts/partner-network', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
const section = page.locator('#partner-client-network');
try {
  for (const width of [375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await expect(section).toHaveCount(1);
    assert.equal(await section.evaluate(el => el.previousElementSibling.id), 'customer-testimonials');
    await expect(section.locator('h2')).toHaveText('Our partner & client network');
    await expect(section.locator('header p').first()).toHaveText('// THE NETWORK');
    await expect(section.locator('header p').last()).toHaveText('A growing ecosystem of customers, technology partners and certification bodies.');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
    await section.locator('img').evaluateAll(els => els.forEach(el => { el.loading = 'eager'; }));
    for (const img of await section.locator('img').all()) {
      await expect(img).toHaveJSProperty('complete', true);
      assert.ok(await img.evaluate(el => el.naturalWidth > 0));
      await expect(img).toHaveCSS('object-fit', 'contain');
    }
    for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
      const row = section.locator(`[data-row="${rowIndex}"]`);
      const track = row.locator('[data-network-track]');
      const groups = track.locator('ul');
      await expect(groups).toHaveCount(3);
      assert.deepEqual(await groups.first().locator('img').evaluateAll(els => els.map(el => el.alt)), rowIndex === 0 ? names.slice(0, 6) : names.slice(6));
      for (const copy of [groups.nth(1), groups.nth(2)]) {
        await expect(copy).toHaveAttribute('aria-hidden', 'true');
        await expect(copy).toHaveAttribute('inert', '');
      }
      await expect(track).toHaveCSS('animation-duration', `${rowIndex === 0 ? 42 : 48}s`);
      await expect(track).toHaveCSS('animation-direction', rowIndex === 0 ? 'normal' : 'reverse');
      await expect(row).toHaveCSS('overflow-x', 'hidden');
      const boxes = await groups.first().locator('li').evaluateAll(els => els.map(el => ({ width:el.offsetWidth, height:el.offsetHeight })));
      assert.ok(boxes.every(box => box.width === (width < 768 ? 144 : 160) && box.height === (width < 768 ? 72 : 80)));
      const sample = () => track.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41);
      const before = await sample();
      await page.waitForTimeout(300);
      const after = await sample();
      assert.ok(rowIndex === 0 ? after < before : after > before);
      await groups.nth(rowIndex === 0 ? 0 : 1).locator('li').nth(1).hover({ force:true });
      await expect(track).toHaveCSS('animation-play-state', 'running');
      await row.focus();
      await expect(track).toHaveCSS('animation-play-state', 'paused');
      const contiguous = await groups.evaluateAll(els => {
        const rects = els.map(el => el.getBoundingClientRect());
        return Math.abs(rects[0].width-rects[1].width)<1 && Math.abs(rects[0].right-rects[1].left)<1 && Math.abs(rects[1].right-rects[2].left)<1;
      });
      assert.ok(contiguous);
      await page.keyboard.press('Home');
      const start = await groups.nth(rowIndex === 0 ? 0 : 1).evaluate(el => el.getBoundingClientRect().x);
      await track.evaluate(el => { const a=el.getAnimations()[0]; a.currentTime=Number(a.effect.getTiming().duration)-.01; });
      const end = await groups.nth(rowIndex === 0 ? 1 : 0).evaluate(el => el.getBoundingClientRect().x);
      assert.ok(Math.abs(start-end)<.1);
      await page.keyboard.press('ArrowRight');
      await page.evaluate(() => { if(document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
    }
    await expect(section.locator('button')).toHaveCount(0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if ([375,1440].includes(width)) await section.screenshot({ path:`.artifacts/partner-network/section-${width}.png` });
    console.log(`PASS ${width}px: all original logos/order, original box styling, 42s left / 48s right, seamless groups, hover flow, keyboard, no overflow`);
  }
  await page.evaluate(() => window.scrollBy({ top:40, behavior:'instant' }));
  await page.waitForTimeout(180);
  assert.ok(await section.locator('[data-network-track]').first().evaluate(el => el.getAnimations()[0].playbackRate > 1));
  await page.waitForTimeout(1300);
  assert.equal(await section.locator('[data-network-track]').first().evaluate(el => el.getAnimations()[0].playbackRate), 1);
  await page.emulateMedia({ reducedMotion:'reduce' });
  for (const track of await section.locator('[data-network-track]').all()) await expect(track).toHaveCSS('animation-name','none');
  for (const row of await section.locator('[data-row]').all()) {
    await expect(row.locator('ul').nth(1)).toBeHidden();
    await expect(row.locator('ul').nth(2)).toBeHidden();
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false);
  assert.deepEqual(errors, []);
  console.log('PASS original asset hashes, scroll-velocity easing, reduced motion and no console/hydration errors');
} finally { await browser.close(); }
