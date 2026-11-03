// Verifies the "Our Work With Customers" vertical testimonial wall:
// responsive column counts (static <768, 2 cols 768-1023, 3 cols >=1024),
// alternating scroll directions, pause-on-hover with true position retention
// (not a restart), resume, reduced-motion fallback, and that the repeated
// marquee content is inert/aria-hidden with exactly one accessible copy of
// each testimonial via a dedicated sr-only list.
import { chromium } from "@playwright/test";
import assert from "node:assert/strict";

const base = process.env.NAVBAR_TEST_URL || "http://localhost:3000";
const browser = await chromium.launch();

for (const [width, expectedColumns] of [[375, 0], [430, 0], [768, 2], [1024, 3], [1440, 3], [1920, 3]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const resp = await page.goto(base + "/", { waitUntil: "networkidle" });
  assert.equal(resp.status(), 200, `${width}px status`);
  await page.locator("#customer-testimonials").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  assert.equal(overflow, false, `${width}px should not overflow`);
  const columns = await page.locator("#customer-testimonials [data-testimonial-column]").count();
  assert.equal(columns, expectedColumns, `${width}px column count`);
  assert.deepEqual(errors, [], `${width}px page errors`);
  await page.close();
  console.log(`PASS ${width}px: ${expectedColumns || "static"} column(s), no overflow, no errors`);
}

// --- alternating directions, true pause/resume, a11y structure ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.locator("#customer-testimonials").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const tracks = page.locator("#customer-testimonials [class*='track']");
  const dirs = await tracks.evaluateAll((els) => els.map((el) => getComputedStyle(el).animationDirection));
  assert.deepEqual(dirs, ["normal", "reverse", "normal"], "columns alternate up/down/up");

  await page.hover("#customer-testimonials");
  await page.waitForTimeout(100);
  const paused = await tracks.evaluateAll((els) => els.map((el) => getComputedStyle(el).animationPlayState));
  assert.ok(paused.every((p) => p === "paused"), "all columns pause together on hover");

  const t1 = await tracks.first().evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(400);
  const t2 = await tracks.first().evaluate((el) => getComputedStyle(el).transform);
  assert.equal(t1, t2, "paused track does not keep moving (true pause, not a slow-down)");

  await page.mouse.move(10, 10);
  await page.waitForTimeout(100);
  const resumed = await tracks.evaluateAll((els) => els.map((el) => getComputedStyle(el).animationPlayState));
  assert.ok(resumed.every((p) => p === "running"), "all columns resume after the pointer leaves");

  const srListCount = await page.locator("#customer-testimonials .sr-only li").count();
  assert.equal(srListCount, 6, "exactly one accessible entry per unique testimonial");
  const trackInert = await tracks
    .first()
    .evaluate((el) => el.inert && el.getAttribute("aria-hidden") === "true");
  assert.ok(trackInert, "animated/repeated tracks are inert and aria-hidden");
  await page.close();
  console.log("PASS 1440px: alternating directions, true pause/resume, single accessible copy per testimonial");
}

// --- reduced motion: static, no animation, no inert tracks ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.locator("#customer-testimonials").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const trackCount = await page.locator("#customer-testimonials [class*='track']").count();
  assert.equal(trackCount, 0, "reduced motion shows the static list, no animated tracks");
  await page.close();
  console.log("PASS reduced motion: static fallback, no animation");
}

await browser.close();
console.log("All customer-testimonials checks passed.");
