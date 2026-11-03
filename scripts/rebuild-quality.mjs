import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
const base = process.env.REBUILD_PREVIEW_URL || 'http://localhost:3100';
const out = path.join(process.cwd(), 'artifacts/rebuild-20261028');
const content = JSON.parse(await fs.readFile(new URL('../content/rebuild.json', import.meta.url), 'utf8'));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const report = { links: 0, assets: 0, redirects: [], errors: [], performance: {} };
try {
  const routes = ['/', '/about', '/contact', '/what-we-do', '/products', '/industries', '/our-work', '/insights', '/resources/faq', '/resources/testimonials', '/partners', '/privacy-policy', '/terms-conditions', '/anti-slavery', ...content.practices.map(p => '/services/' + p.slug), ...content.products.map(p => '/products/' + p.slug), ...content.industries.map(p => '/industries/' + p.slug), ...content.posts.map(p => '/insights/' + p.slug), ...content.stories.map(p => '/our-work/' + p.slug), ...content.categories.map(p => '/what-we-do/' + p.slug), ...content.capabilities.map(p => '/what-we-do/' + p.slug)];
  const links = new Set(), assets = new Set(['hero.webp','infrastructure.webp','workspace.webp','engineering.webp','DSC00445.webp','DSC00458.webp','habilesec-logo.png','social.png'].map(n=>'/rebuild/'+n));
  for (const route of routes) {
    const response = await page.request.get(base + route);
    const html = await response.text();
    for (const m of html.matchAll(new RegExp('href="(/[^"#?]*)', 'g'))) if (!m[1].startsWith('/_next')) links.add(m[1].replaceAll('&amp;', '&'));
    for (const m of html.matchAll(new RegExp('(?:src|href)="(/rebuild/[^"?]*)', 'g'))) assets.add(m[1]);
  }
  for (const link of links) { const r = await page.request.get(base + link); assert.equal(r.status(), 200, 'Broken link ' + link); report.links++; }
  for (const asset of assets) { const r = await page.request.get(base + asset); assert.equal(r.status(), 200, 'Missing asset ' + asset); report.assets++; }
  for (const [from, to] of [['/grcloop', '/services/grcloop'], ['/services', '/what-we-do'], ['/industries/banking-financial-services', '/industries/bfsi'], ['/our-work/ipcs-workfinity', '/our-work/ipcs-workfinity-soc-2-readiness']]) {
    const r = await page.request.get(base + from, { maxRedirects: 0 }); assert.equal(r.status(), 308); assert.equal(new URL(r.headers().location, base).pathname, to); report.redirects.push({ from, to, status: r.status() });
  }
  await page.goto(base + '/about');
  for (const image of await page.locator('.founder-image').all()) await image.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.querySelectorAll('.founder-image img')].every(i => i.complete && i.naturalWidth > 0));
  await page.screenshot({ path: path.join(out, 'about-desktop.png'), fullPage: true });
  await page.goto(base);
  await page.getByRole('button', { name: 'What we do', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.screenshot({ path: path.join(out, 'navigation-desktop.png') });
  await page.keyboard.press('Escape');
  await page.addInitScript(() => { window.__layoutShift = 0; new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__layoutShift += entry.value; }).observe({ type: 'layout-shift', buffered: true }); });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  report.performance = await page.evaluate(() => ({ navigationMs: Math.round(performance.getEntriesByType('navigation')[0].duration), fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime, cls: window.__layoutShift, resources: performance.getEntriesByType('resource').length, jsTransferredBytes: performance.getEntriesByType('resource').filter(r => r.name.includes('.js')).reduce((n, r) => n + r.transferSize, 0), note: 'One warm local desktop sample; not field Core Web Vitals or INP.' }));
  assert.equal(await page.evaluate(() => [...document.getAnimations()].filter(a => a.playState === 'running').length), 0, 'Reduced motion');
  report.reducedMotion = true;
  report.passed = true;
} catch (e) { report.passed = false; report.errors.push(e.stack); process.exitCode = 1; }
finally { await fs.mkdir(out, { recursive: true }); await fs.writeFile(path.join(out, 'quality-results.json'), JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2)); await browser.close(); }
