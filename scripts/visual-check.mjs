import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const base = process.env.PREVIEW_URL || "http://localhost:3001";
const interactionsOnly = process.argv.includes("--interactions-only");
const browser = await chromium.launch();
await mkdir(".artifacts", { recursive: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const routes = [
  "/",
  "/services",
  "/services/grcloop",
  "/services/forgeloop",
  "/services/hexn6",
  "/products",
  "/products/certanika-lite",
  "/industries",
  ...[
    "government",
    "bfsi",
    "technology",
    "manufacturing",
    "healthcare",
    "retail",
  ].map((s) => "/industries/" + s),
  "/insights",
  "/insights/continuous-assurance",
  "/insights/secure-product-engineering",
  "/insights/incident-response-evidence",
  "/insights/privacy-governance",
  "/insights/ai-governance",
  "/our-work",
  "/about",
  "/contact",
];
async function dimensions() {
  return page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: [...document.querySelectorAll("main *, header *, footer *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return (
          r.width &&
          (r.right > innerWidth + 2 || r.left < -2) &&
          getComputedStyle(el).position !== "absolute"
        );
      })
      .slice(0, 8)
      .map((el) => ({
        tag: el.tagName,
        class: el.className,
        text: el.textContent?.slice(0, 60),
      })),
  }));
}
async function revealAll() {
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((scroll) => window.scrollTo(0, scroll), y);
    await page.waitForTimeout(30);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
}
try {
  for (const width of interactionsOnly ? [] : [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    const response = await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    await revealAll();
    const size = await dimensions();
    assert.ok(
      size.scrollWidth <= size.width + 1,
      JSON.stringify({ width, ...size }),
    );
    if ([390, 1440].includes(width))
      await page.screenshot({
        path: ".artifacts/home-" + width + ".png",
        fullPage: true,
      });
    console.log("Homepage layout OK: " + width + "px");
  }
  for (const width of interactionsOnly ? [] : [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200, route);
      await revealAll();
      const size = await dimensions();
      assert.ok(
        size.scrollWidth <= size.width + 1,
        JSON.stringify({ route, width, ...size }),
      );
      await page.waitForFunction(() =>
        [...document.querySelectorAll("main img")]
          .filter((img) => img.checkVisibility())
          .every((img) => img.complete && img.naturalWidth > 0),
      );
      const images = await page
        .locator("main img")
        .evaluateAll((imgs) =>
          imgs
            .filter(
              (img) =>
                img.checkVisibility() &&
                (!img.complete || img.naturalWidth === 0),
            )
            .map((img) => img.src),
        );
      assert.deepEqual(images, [], route + " image failures");
      assert.equal(await page.locator("main h1").count(), 1, route + " h1");
      if (
        width === 1440 &&
        [
          "/about",
          "/services/grcloop",
          "/products/certanika-lite",
          "/contact",
        ].includes(route)
      )
        await page.screenshot({
          path: ".artifacts/" + route.slice(1).replaceAll("/", "-") + ".png",
          fullPage: true,
        });
    }
    console.log(routes.length + " routes OK at " + width + "px");
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page.getByRole("button", { name: "What we do", exact: true }).click();
  assert.equal(await page.locator(".mega-menu").isVisible(), true);
  await page.screenshot({ path: ".artifacts/mega-menu.png" });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Search HabileSec" }).click();
  await page.getByRole("searchbox").fill("forensics");
  await page.locator(".search-result").first().waitFor();
  assert.ok((await page.locator(".search-result").count()) >= 1);
  await page.keyboard.press("Escape");
  await page.locator("#industry-tab-2").click();
  await expect(page.locator("#industry-tab-2")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#industry-tab-3")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.goto(base + "/insights");
  await page.getByRole("button", { name: "Privacy", exact: true }).click();
  await expect(page.locator(".insight-article")).toHaveCount(1);
  await page.goto(base + "/contact");
  await page.getByLabel("Name", { exact: false }).fill("Preview Tester");
  await page.getByLabel("Business email").fill("tester@example.com");
  await page
    .getByLabel("Your message")
    .fill("A test enquiry to check the prepared email.");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveAttribute("href", /^mailto:enquiry@habilesec.com/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator(".mobile-menu")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: ".artifacts/mobile-menu.png" });
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Industries", exact: true })
    .click();
  await expect(page).toHaveURL(base + "/industries");
  await page.locator(".mobile-industries summary").nth(2).click();
  assert.ok(
    (await page
      .locator(".mobile-industries details")
      .nth(2)
      .getAttribute("open")) !== null,
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: ".artifacts/hero-desktop.png" });
  await page.locator(".film").scrollIntoViewIfNeeded();
  await page.waitForTimeout(3500);
  const scene = await page
    .locator(".film-progress span.active")
    .evaluate((el) => [...el.parentElement.children].indexOf(el));
  assert.notEqual(scene, 0, "Film should advance when visible");
  await page.getByRole("button", { name: "Pause visual sequence" }).click();
  await page.waitForTimeout(3200);
  const pausedScene = await page
    .locator(".film-progress span.active")
    .evaluate((el) => [...el.parentElement.children].indexOf(el));
  assert.equal(pausedScene, scene, "Film should remain paused");
  assert.deepEqual(errors, []);
  console.log(
    "Search, menus, keyboard sector selection, filters, contact, mobile accordions and film controls OK.",
  );
} finally {
  await browser.close();
}
