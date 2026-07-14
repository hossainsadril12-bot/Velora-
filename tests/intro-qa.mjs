import { chromium } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

const OUT = "D:/Velora Website/tests/screenshots";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(e.message));

await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

// 1 — immediate: overlay should be up
await page.screenshot({ path: path.join(OUT, "01-immediate.png") });
console.log("📸 01-immediate.png");

const overlay = page.locator("div.fixed.z-\\[200\\]");
const overlayVisible = await overlay.isVisible();
console.log(`${overlayVisible ? "✅" : "❌"} Overlay visible on load`);

// 2 — 2s in: Lottie SVG should have rendered
await page.waitForTimeout(2000);
const lottieSvg = page.locator("div.fixed.z-\\[200\\] svg").first();
const lottieVisible = await lottieSvg.isVisible().catch(() => false);
console.log(`${lottieVisible ? "✅" : "❌"} Lottie SVG rendered (2s)`);
await page.screenshot({ path: path.join(OUT, "02-lottie-playing.png") });
console.log("📸 02-lottie-playing.png");

// Blur values on overlay div
const blurLayer = page.locator("div.fixed.z-\\[200\\] .absolute").first();
const backdropFilter = await blurLayer.evaluate((el) => el.style.backdropFilter);
const bgColor = await blurLayer.evaluate((el) => el.style.backgroundColor);
console.log(`🔍 backdropFilter: "${backdropFilter}"`);
console.log(`🔍 backgroundColor: "${bgColor}"`);

// 3 — ~5s in: flying or near end
await page.waitForTimeout(3000);
await page.screenshot({ path: path.join(OUT, "03-flying.png") });
console.log("📸 03-flying.png");

// 4 — wait for overlay to detach (introDone)
try {
  await overlay.waitFor({ state: "detached", timeout: 8000 });
  console.log("✅ Overlay unmounted (introDone = true)");
} catch {
  console.log("❌ Overlay still present after 8s");
}
await page.screenshot({ path: path.join(OUT, "04-after-intro.png") });
console.log("📸 04-after-intro.png");

// Nav logo check
const navLogo = page.locator("header a svg").first();
const navLogoVisible = await navLogo.isVisible().catch(() => false);
console.log(`${navLogoVisible ? "✅" : "❌"} Nav Lottie logo visible after intro`);

// Hero text
const ownVisible = await page.locator("h1").filter({ hasText: "OWN" }).isVisible().catch(() => false);
const whatVisible = await page.locator("h1").filter({ hasText: "WHAT" }).isVisible().catch(() => false);
const mattersVisible = await page.locator("h1").filter({ hasText: "MATTERS" }).isVisible().catch(() => false);
console.log(`${ownVisible && whatVisible && mattersVisible ? "✅" : "❌"} Hero text visible (OWN:${ownVisible} WHAT:${whatVisible} MATTERS:${mattersVisible})`);

// Scroll test
await page.keyboard.press("PageDown");
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(OUT, "05-scrolled.png") });
console.log("📸 05-scrolled.png");

// Errors
if (errors.length) {
  console.log(`\n⚠️  Console errors (${errors.length}):`);
  errors.forEach((e) => console.log("   ", e));
} else {
  console.log("✅ Zero console/page errors");
}

await browser.close();
