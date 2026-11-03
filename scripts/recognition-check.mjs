import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const base = process.env.NAVBAR_TEST_URL || 'http://localhost:3000';
const production = process.argv.includes('--production');
const old = 'C:/Users/Habilesec/OneDrive/Desktop/Habilesec Ex/habilesec-site-new/public/credentials';
const assets = ['iso.jpg', 'cmmi.png', 'cipp-e.png', 'cisa.png', 'cism.png', 'cissp.png', 'pci-dss.png', 'ccpa.jpg', 'crisc.png', 'oscp.png', 'hipaa.png'];
const hash = blob => createHash('sha256').update(blob).digest('hex');
for (const name of assets) assert.equal(hash(await readFile(`public/images/recognitions/${name}`)), hash(await readFile(`${old}/${name}`)));
const expected = ['ISO', 'CMMI', 'CIPP/E', 'CISA', 'CISM', 'CISSP', 'PCI DSS', 'CCPA', 'CRISC', 'OSCP', 'HIPAA', 'DPIIT / Startup India'];
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
const section = page.getByRole('region', { name: 'Recognized. Connected. Trusted.' });
await mkdir('.artifacts/recognitions', { recursive: true });
try {
  for (const width of [375,430,768,1024,1440,1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await expect(section).toHaveCount(1);
    assert.equal(await section.evaluate(el => el.parentElement.querySelector('section') === el), true);
    const y = await section.evaluate(el => el.getBoundingClientRect().top + scrollY);
    await page.evaluate(y => window.scrollTo({ top: y + 2, behavior: 'instant' }), y);
    await expect(page.locator('header')).toHaveAttribute('inert', '');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if (production) {
      await expect(section.locator('img')).toHaveCount(0);
      await expect(section.locator('[data-recognition-preview]')).toHaveCount(0);
      console.log(`PASS production ${width}px: pending claims unpublished, first section and hero coverage intact`);
      continue;
    }
    const marquee = section.locator('[data-hover-pause]');
    await expect(marquee).toHaveAttribute('data-ready', 'true');
    const groups = marquee.locator('[class*="_group"]');
    await expect(groups).toHaveCount(2);
    await expect(groups.first().locator('figcaption > span')).toHaveText(expected);
    await expect(groups.last()).toHaveAttribute('aria-hidden', 'true');
    await expect(groups.last()).toHaveAttribute('inert', '');
    const region = marquee.getByRole('region');
    await expect(region).toHaveCSS('overflow-x', 'hidden');
    await expect(section.locator('button')).toHaveCount(0);
    await expect(section.locator('figcaption small')).toHaveCount(0);
    await expect(section.getByText(/Pending verification|Local preview/)).toHaveCount(0);
    const track = marquee.locator('[class*="_track"]');
    await page.mouse.move(2,800);
    const heading = await section.locator('h2').boundingBox();
    const position = () => track.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41);
    const sample = () => track.evaluate(el => ({ x: new DOMMatrix(getComputedStyle(el).transform).m41, time: performance.now() }));
    const first = await sample();
    await page.waitForTimeout(600);
    const second = await sample();
    const measuredSpeed = (first.x - second.x) / ((second.time - first.time) / 1000);
    assert.ok(measuredSpeed > 31 && measuredSpeed < 39, `35px/s: ${measuredSpeed}`);
    assert.deepEqual(await section.locator('h2').boundingBox(), heading);
    const widths = await groups.evaluateAll(els => els.map(el => el.getBoundingClientRect().width));
    assert.ok(Math.abs(widths[0] - widths[1]) < .1);
    const duration = await track.evaluate(el => parseFloat(getComputedStyle(el).animationDuration));
    assert.ok(Math.abs(widths[0] / duration - 35) < .1);
    const contiguous = await groups.evaluateAll(els => {
      const first = els[0].getBoundingClientRect();
      const copy = els[1].getBoundingClientRect();
      return Math.abs(first.right - copy.left) < 1;
    });
    assert.ok(contiguous);
    await region.hover({ force: true });
    await expect(track).toHaveCSS('animation-play-state', 'paused');
    const paused = await position();
    await page.waitForTimeout(150);
    assert.equal(await position(), paused);
    await page.mouse.move(2,800);
    await region.focus();
    await expect(track).toHaveCSS('animation-play-state', 'paused');
    await track.evaluate(el => { el.getAnimations()[0].currentTime = 10000; });
    const keyStart = await position();
    await page.keyboard.press('ArrowRight');
    assert.ok(Math.abs(keyStart - await position() - 240) < 1);
    await page.keyboard.press('Home');
    assert.ok(Math.abs(await position()) < .1);
    // At the end of one repeat, the copy aligns with the initial original.
    const start = (await groups.first().boundingBox()).x;
    await track.evaluate(el => { const a = el.getAnimations()[0]; a.currentTime = Number(a.effect.getTiming().duration) - 1; });
    assert.ok(Math.abs((await groups.last().boundingBox()).x - start) < .1);
    await page.mouse.click(2,20);
    await expect(track).toHaveCSS('animation-play-state', 'running');
    await page.screenshot({ path: `.artifacts/recognitions/marquee-${width}.png` });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(track).toHaveCSS('animation-name', 'none');
    await expect(groups.last()).toBeHidden();
    for (const image of await groups.first().locator('img').all()) {
      await image.evaluate(el => el.scrollIntoView({ block: 'nearest', behavior: 'instant' }));
      await expect(image).toHaveJSProperty('complete', true);
      assert.ok(await image.evaluate(el => el.naturalWidth > 0));
      const r = await image.boundingBox();
      assert.ok(r.x >= 0 && r.x + r.width <= width + 1);
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    console.log(`PASS ${width}px: 35px/s, fixed heading, seamless repeat, hover/focus pause, names-only captions, no controls, keyboard browsing, reduced motion`);
  }
  assert.deepEqual(errors, []);
  console.log('PASS: original assets, no console/hydration errors');
} finally { await browser.close(); }
