import { test, expect } from "@playwright/test";
import * as path from "path";

const SCREENSHOT_DIR = path.join(__dirname, "screenshots");

// How long the full intro takes: ~4s lottie + ~1.5s fly + buffer
const INTRO_TOTAL_MS = 7_000;

test.describe("Intro animation flow", () => {
  test.beforeEach(async ({ page }) => {
    // Ensure screenshots dir exists
    const fs = await import("fs");
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  });

  test("overlay visible on page load", async ({ page }) => {
    await page.goto("/");

    // Overlay should be mounted immediately (z-[200] fixed div)
    const overlay = page.locator("div.fixed.z-\\[200\\]");
    await expect(overlay).toBeVisible({ timeout: 2_000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "01-overlay-visible.png") });
  });

  test("blur backdrop present during idle state", async ({ page }) => {
    await page.goto("/");

    // The blur div has inline style backdropFilter
    const blurLayer = page.locator("div.fixed.z-\\[200\\] > .absolute").first();
    await expect(blurLayer).toBeVisible({ timeout: 2_000 });

    const backdropFilter = await blurLayer.evaluate(
      (el) => (el as HTMLElement).style.backdropFilter
    );
    expect(backdropFilter).toContain("blur");

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "02-blur-backdrop.png") });
  });

  test("lottie SVG renders inside overlay", async ({ page }) => {
    await page.goto("/");

    // lottie-web injects an <svg> inside the container div
    const lottieSvg = page.locator("div.fixed.z-\\[200\\] svg").first();
    await expect(lottieSvg).toBeVisible({ timeout: 5_000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "03-lottie-svg.png") });
  });

  test("nav logo hidden during intro", async ({ page }) => {
    await page.goto("/");

    // Wait for overlay to appear (confirms intro is running)
    await expect(page.locator("div.fixed.z-\\[200\\]")).toBeVisible({ timeout: 2_000 });

    // Header logo motion.div should be opacity 0 (hidden variant)
    // It's gated: animate={introRunning ? "hidden" : "show"}
    // framer-motion sets opacity:0 on the element
    const headerLogo = page.locator("header svg").first();
    const opacity = await headerLogo.evaluate(
      (el) => parseFloat(getComputedStyle(el.closest("[style*='opacity']") ?? el).opacity ?? "1")
    );
    expect(opacity).toBeLessThanOrEqual(0.05);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "04-logo-hidden-during-intro.png") });
  });

  test("overlay disappears after intro completes", async ({ page }) => {
    await page.goto("/");

    // Wait up to INTRO_TOTAL_MS for the overlay to unmount
    // IntroOverlay returns null when introDone = true
    await expect(page.locator("div.fixed.z-\\[200\\]")).toHaveCount(0, {
      timeout: INTRO_TOTAL_MS,
    });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "05-overlay-gone.png") });
  });

  test("nav logo visible after intro completes", async ({ page }) => {
    await page.goto("/");

    // Wait for intro to finish
    await expect(page.locator("div.fixed.z-\\[200\\]")).toHaveCount(0, {
      timeout: INTRO_TOTAL_MS,
    });

    // Nav logo should now be visible (opacity > 0)
    const headerLogo = page.locator("header a svg").first();
    await expect(headerLogo).toBeVisible({ timeout: 2_000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "06-logo-visible-after-intro.png") });
  });

  test("hero text reveals after intro completes", async ({ page }) => {
    await page.goto("/");

    // Wait for intro to finish
    await expect(page.locator("div.fixed.z-\\[200\\]")).toHaveCount(0, {
      timeout: INTRO_TOTAL_MS,
    });

    // OWN / WHAT / MATTERS text should be visible
    await expect(page.getByText("OWN")).toBeVisible({ timeout: 3_000 });
    await expect(page.getByText("WHAT")).toBeVisible({ timeout: 3_000 });
    await expect(page.getByText("MATTERS")).toBeVisible({ timeout: 3_000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "07-hero-text-visible.png") });
  });

  test("scroll locked during intro, unlocked after", async ({ page }) => {
    await page.goto("/");

    // During intro: scrolling should not move the page
    await page.keyboard.press("End");
    const scrollDuringIntro = await page.evaluate(() => window.scrollY);
    expect(scrollDuringIntro).toBe(0);

    // Wait for intro to complete
    await expect(page.locator("div.fixed.z-\\[200\\]")).toHaveCount(0, {
      timeout: INTRO_TOTAL_MS,
    });

    // After intro: scroll should be possible
    await page.keyboard.press("End");
    await page.waitForTimeout(500);
    const scrollAfterIntro = await page.evaluate(() => window.scrollY);
    expect(scrollAfterIntro).toBeGreaterThan(0);
  });

  test("client nav back skips intro (introDone persists)", async ({ page }) => {
    await page.goto("/");

    // Complete the intro
    await expect(page.locator("div.fixed.z-\\[200\\]")).toHaveCount(0, {
      timeout: INTRO_TOTAL_MS,
    });

    // Navigate away then back via client navigation
    await page.click("a[href='/about']");
    await page.waitForURL("**/about");
    await page.goBack();
    await page.waitForURL("/");

    // Overlay must NOT appear on return navigation
    await page.waitForTimeout(500);
    await expect(page.locator("div.fixed.z-\\[200\\]")).toHaveCount(0, {
      timeout: 1_000,
    });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "08-no-replay-on-nav-back.png") });
  });

  test("hero video playing behind overlay", async ({ page }) => {
    await page.goto("/");

    // Video element should exist and be in playing state before intro ends
    const videoPlaying = await page.evaluate(() => {
      const videos = Array.from(document.querySelectorAll("video"));
      return videos.some((v) => !v.paused && v.readyState >= 2);
    });
    expect(videoPlaying).toBe(true);
  });
});
