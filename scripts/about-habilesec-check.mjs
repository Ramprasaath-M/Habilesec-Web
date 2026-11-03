import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, stat } from 'node:fs/promises';
import sharp from 'sharp';

const base = process.env.NAVBAR_TEST_URL || 'http://localhost:3000';
const images = ['about-consulting'];
for (const name of images) {
  const path = `public/images/about/${name}.webp`;
  assert.ok((await stat(path)).size > 10000);
  const metadata = await sharp(path).metadata();
  assert.equal(metadata.format, 'webp');
  assert.ok(metadata.width >= 1600);
}
await mkdir('.artifacts/about-habilesec', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
const section = page.locator('#about-habilesec');
const heading = 'Helping Businesses Navigate Security and Technology with Confidence.';
const description = 'HabileSec is a cybersecurity and technology services company helping organizations understand security risks, address compliance requirements, and strengthen their digital environments. Through cybersecurity expertise, cloud capabilities, and software engineering, we support businesses in making informed decisions and moving forward with confidence.';
try {
  for (const width of [320,375,430,768,1024,1440,1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await expect(section).toHaveCount(1);
    assert.equal(await section.evaluate(el => el.previousElementSibling.getAttribute('aria-labelledby')), 'recognition-title');
    await expect(section.locator('h2')).toHaveText(heading);
    await expect(section.locator('p').first()).toHaveText('ABOUT HABILESEC');
    await expect(section.locator('p').last()).toHaveText(description);
    await expect(section.locator('img')).toHaveCount(1);
    const initialHeight = await section.evaluate(el => el.offsetHeight);
    for (const [index, image] of (await section.locator('img').all()).entries()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      assert.ok(await image.evaluate(el => el.naturalWidth > 0));
      await expect(image).toHaveCSS('object-fit', 'cover');
      await expect(image).toHaveAttribute('loading', 'lazy');
      assert.ok((await image.getAttribute('src')).includes(encodeURIComponent(`/images/about/${images[index]}.webp`)));
    }
    assert.equal(await section.evaluate(el => el.offsetHeight), initialHeight);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const boxes = await section.locator('img').evaluateAll(els => els.map(el => { const r = el.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height }; }));
    assert.ok(Math.abs(boxes[0].width / boxes[0].height - (width >= 768 ? 1.25 : 4/3)) < .02);
    const copy = await section.locator('h2').boundingBox();
    const cta = await section.getByRole('link', { name: 'Explore HabileSec' }).boundingBox();
    if (width >= 768) assert.ok(copy.x + copy.width <= boxes[0].x);
    else assert.ok(cta.y + cta.height < boxes[0].y);
    await section.locator('h2').scrollIntoViewIfNeeded();
    for (const reveal of await section.locator('[data-kind]').all()) {
      await reveal.scrollIntoViewIfNeeded();
      await expect(reveal).toHaveCSS('opacity', '1');
    }
    if ([375,1440].includes(width)) await section.screenshot({ path: `.artifacts/about-habilesec/section-${width}.png` });
    console.log(`PASS ${width}px: exact copy, one loaded local WebP, stable ${width >= 768 ? 'two-column' : 'text-first stacked'} layout, reveals, no overflow`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: 'networkidle' });
  const image = section.locator('img').first();
  await image.scrollIntoViewIfNeeded();
  // Wait for the frame's entrance movement before positioning the pointer.
  await expect(image.locator('..')).toHaveCSS('opacity', '1');
  await expect(image.locator('..')).toHaveCSS('transform', 'none');
  await image.hover();
  await expect.poll(() => image.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a)).toBeGreaterThan(1.02);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(image).toHaveCSS('transform', 'none');
  assert.equal((await page.request.get(`${base}/images/about/about-consulting.webp`)).status(), 200);
  await section.getByRole('link', { name: 'Explore HabileSec' }).click();
  await expect(page).toHaveURL(`${base}/about`);
  const response = await page.request.get(`${base}/about`);
  assert.equal(response.status(), 200);
  assert.deepEqual(errors, []);
  console.log('PASS: hover zoom, reduced motion, /about navigation, no console/hydration errors');
} finally { await browser.close(); }
