import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { serviceCategories, serviceHref } from "../data/service-categories.ts";

const base = process.env.PREVIEW_URL || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", error => errors.push(error.message));
await mkdir(".artifacts", { recursive: true });
const expected = serviceCategories.flatMap(category => category.services.map(service => ({
  name: service.name, href: serviceHref(category, service),
})));
try {
  for (const width of [320, 375, 430, 768, 1024, 1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base);
    await expect(page.locator("main #introduction .intro-grid")).toHaveCount(1);
    await expect(page.locator("main #services-directory-title")).toHaveCount(0);
    if (width >= 1024) {
      await page.getByRole("button", { name: "What we do", exact: true }).click();
    } else {
      await page.getByRole("button", { name: "Open menu", exact: true }).click();
      await page.locator("#mobile-navigation summary").filter({ hasText: "What we do" }).click();
    }
    const directory = page.locator('[aria-labelledby="services-directory-title"]:visible');
    await expect(directory.locator('[role="group"]')).toHaveCount(2);
    await expect(directory.locator("h4")).toHaveCount(5);
    assert.deepEqual(await directory.locator("ul a").evaluateAll(items => items.map(item => ({
      name: item.textContent, href: item.getAttribute("href"),
    }))), expected);
    const overflow = await directory.evaluate(el => [...el.querySelectorAll("*")].filter(child => {
      const r = child.getBoundingClientRect();
      return r.left < -1 || r.right > innerWidth + 1 || child.scrollWidth > child.clientWidth + 1;
    }).map(child => child.textContent.slice(0, 60)));
    assert.deepEqual(overflow, [], `${width}px overflow`);
    await page.screenshot({ path: `.artifacts/services-menu-${width}.png`, style: "nextjs-portal { visibility: hidden !important; }" });
    console.log(`Navbar directory and restored homepage OK: ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  const trigger = page.getByRole("button", { name: "What we do", exact: true });
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#services-menu h4 a").first()).toBeFocused();
  await page.keyboard.press("Tab");
  const first = page.locator("#services-menu ul a").first();
  await expect(first).toBeFocused();
  assert.equal(await first.evaluate(el => getComputedStyle(el).outlineStyle), "solid");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await first.click();
  await expect(page).toHaveURL(base + expected[0].href);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.goto(base);
  await page.getByRole("button", { name: "Products", exact: true }).click();
  await expect(page.locator("#products-menu")).toBeVisible();
  await expect(page.locator("#products-menu")).toContainText("Certanika Lite");
  await page.keyboard.press("Escape");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await trigger.click();
  await first.hover();
  await expect(first).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(first).toHaveCSS("transform", "matrix(1, 0, 0, 1, 4, 0)");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(first).toHaveCSS("transform", "none");
  for (const route of new Set(expected.map(link => link.href.split("#")[0]))) {
    const response = await page.request.get(base + route);
    assert.equal(response.status(), 200);
    const html = await response.text();
    for (const link of expected.filter(item => item.href.startsWith(route + "#"))) {
      assert.ok(html.includes(`id="${link.href.split("#")[1]}"`), link.href);
    }
  }
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto(base);
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.locator("#mobile-navigation summary").filter({ hasText: "What we do" }).click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Digital Forensics", exact: true }).click();
  await expect(page).toHaveURL(base + "/what-we-do/incident-response#digital-forensics");
  await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  assert.deepEqual(errors, []);
  console.log("All 33 services, keyboard opening/Escape, desktop/mobile navigation, hover, reduced motion and Products menu OK.");
} finally {
  await browser.close();
}
