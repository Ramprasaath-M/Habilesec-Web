import {chromium, expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {readFile, mkdir} from 'node:fs/promises';
const base = process.env.NAVBAR_TEST_URL || 'http://localhost:3000';
const records = JSON.parse(await readFile('data/success-stories.json', 'utf8'));
const old = JSON.parse(await readFile('C:/Users/Habilesec/OneDrive/Desktop/Habilesec Ex/habilesec-site-new/backend/data/postgres-export.json', 'utf8'));
assert.equal(records.length, 5);
for (const story of records) {
  const source = old.success_stories.find(s => s.id === story.id);
  for (const key of ['title', 'company', 'industry', 'excerpt']) assert.equal(story[key], source[key]);
}
await mkdir('.artifacts/latest-insights', {recursive: true});
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const section = page.locator('#latest-insights');
const viewport = section.getByRole('region', {name: 'HabileSec success stories'});
const cards = section.locator('article');
const next = section.getByRole('button', {name: 'Next success story'});
const prev = section.getByRole('button', {name: 'Previous success story'});
const position = () => section.locator('.sr-only').textContent();
try {
  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({width, height: 1000});
    await page.goto(base, {waitUntil: 'networkidle'});
    await section.scrollIntoViewIfNeeded();
    await expect(cards).toHaveCount(5);
    const bounds = await viewport.boundingBox();
    const visible = bounds.width >= 960 ? 3 : bounds.width >= 600 ? 2 : 1;
    await expect.poll(() => cards.evaluateAll(els => els.filter(el => !el.inert).length)).toBe(visible);
    await expect(prev).toBeDisabled();
    await expect(next).toBeEnabled();
    const boxes = await cards.evaluateAll(els => els.map(el => {const r = el.getBoundingClientRect(); return {x:r.x, right:r.right, width:r.width, height:r.height}}));
    assert.equal(boxes.filter(r => r.x >= bounds.x - 1 && r.right <= bounds.x + bounds.width + 1).length, visible);
    // The clipped viewport must end at the final complete card, with no next-card preview.
    assert.ok(Math.abs(boxes[visible - 1].right - bounds.x - bounds.width) < 1);
    assert.ok(boxes[visible].x > bounds.x + bounds.width);
    assert.ok(boxes.every(r => r.height >= 330 && r.height <= 400));
    assert.ok(await cards.first().locator('[class*="_summary"]').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 15));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.equal(await section.locator('img').count(), 5);
    for (let i = 0; i < visible; i++) await expect.poll(() => cards.nth(i).locator('img').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    const step = boxes[1].x - boxes[0].x;
    await next.click();
    await expect.poll(async () => Math.abs(boxes[0].x - (await cards.first().boundingBox()).x - step)).toBeLessThan(1);
    await expect.poll(position).toBe(`Stories 2 to ${visible + 1} of 5`);
    await viewport.focus();
    await page.keyboard.press('End');
    await expect(next).toBeDisabled();
    await page.keyboard.press('Home');
    await expect(prev).toBeDisabled();
    await page.keyboard.press('ArrowRight');
    await expect.poll(position).toBe(`Stories 2 to ${visible + 1} of 5`);
    await expect.poll(async () => Math.abs((await cards.first().boundingBox()).x - (boxes[0].x - step))).toBeLessThan(1);
    const stationary = (await cards.first().boundingBox()).x;
    await page.waitForTimeout(700);
    assert.ok(Math.abs((await cards.first().boundingBox()).x - stationary) < 1);
    await page.keyboard.press('Home');
    await page.waitForTimeout(350);
    if (width < 600) {
      const box = await viewport.boundingBox();
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Input.dispatchTouchEvent', {type:'touchStart', touchPoints:[{x:width - 55, y:box.y + 80}]});
      await cdp.send('Input.dispatchTouchEvent', {type:'touchMove', touchPoints:[{x:60, y:box.y + 80}]});
      await cdp.send('Input.dispatchTouchEvent', {type:'touchEnd', touchPoints:[]});
      await expect.poll(position).toBe('Stories 2 to 2 of 5');
      await cdp.detach();
      await viewport.focus(); await page.keyboard.press('Home');
    }
    await page.waitForTimeout(350);
    await viewport.evaluate(el => el.blur());
    await page.mouse.move(0, 0);
    await section.screenshot({path:`.artifacts/latest-insights/carousel-${width}.png`});
    console.log(`PASS ${width}px: ${visible} complete cards, readable compact cards, no preview/overflow, loaded images, one-card navigation, keyboard, boundaries, no autoplay${width < 600 ? ', touch swipe' : ''}`);
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.ok(await section.locator('[class*="_track"]').evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) < .001));
  await page.setViewportSize({width:375, height:1000});
  for (let i = 0; i < records.length; i++) {
    await page.goto(base, {waitUntil:'networkidle'});
    await section.scrollIntoViewIfNeeded();
    await expect.poll(() => cards.evaluateAll(els => els.filter(el => !el.inert).length)).toBe(1);
    for (let j = 0; j < i; j++) await next.click();
    await expect.poll(() => cards.nth(i).locator('img').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    await cards.nth(i).getByRole('link', {name:`Read more: ${records[i].title}`}).click();
    await expect(page).toHaveURL(`${base}/our-work/${records[i].slug}`);
    await expect(page.getByRole('heading', {level:1})).toHaveText(records[i].title);
    await expect(page.getByText(records[i].excerpt, {exact:true})).toBeVisible();
    assert.equal((await page.request.get(`${base}/our-work/${records[i].slug}`)).status(), 200);
  }
  assert.equal((await page.request.get(`${base}/our-work/does-not-exist`)).status(), 404);
  // Exercise the shared missing-image fallback without changing source data.
  await page.route('**/_next/image?**', route => route.abort());
  await page.goto(base, {waitUntil:'networkidle'}); await section.scrollIntoViewIfNeeded();
  await expect(cards.first().getByText(records[0].company, {exact:true})).toBeVisible();
  assert.deepEqual(errors, []);
  console.log('PASS all five source-matched detail links and images, missing-image fallback, reduced motion, unknown-slug 404, no page/hydration errors');
} finally { await browser.close(); }
