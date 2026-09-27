import { test, expect } from "@playwright/test";

test.describe("brochure viewer", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/brochure");
    await expect(page.locator("section[data-ready]")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("page-counter")).toHaveText("1 / 24");
  });

  test("next arrow advances to the first spread", async ({ page }) => {
    await page.getByRole("button", { name: "Next page" }).click();
    await expect(page.getByTestId("page-counter")).toHaveText("2–3 / 24");
  });

  test("arrow keys navigate", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("page-counter")).toHaveText("2–3 / 24");
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByTestId("page-counter")).toHaveText("1 / 24");
  });

  test("thumbnail click jumps", async ({ page }) => {
    await page.getByRole("navigation", { name: "Brochure pages" }).getByRole("button", { name: "Go to page 10" }).click();
    await expect(page.getByTestId("page-counter")).toHaveText("10–11 / 24");
  });

  test("scrub slider seeks", async ({ page }) => {
    const slider = page.getByRole("slider", { name: "Page" });
    await slider.focus();
    await page.keyboard.press("End");
    await expect(page.getByTestId("page-counter")).toHaveText("24 / 24");
  });

  test("grid overlay opens, jumps, closes", async ({ page }) => {
    await page.getByRole("button", { name: "Show all pages" }).click();
    const dialog = page.getByRole("dialog", { name: "All pages" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Go to page 16" }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByTestId("page-counter")).toHaveText("16–17 / 24");
  });

  test("grid overlay closes on Escape", async ({ page }) => {
    await page.getByRole("button", { name: "Show all pages" }).click();
    const dialog = page.getByRole("dialog", { name: "All pages" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("zoom in enables zoom out", async ({ page }) => {
    const out = page.getByRole("button", { name: "Zoom out" });
    await expect(out).toBeDisabled();
    await page.getByRole("button", { name: "Zoom in" }).click();
    await expect(out).toBeEnabled();
    await out.click();
    await expect(out).toBeDisabled();
  });

  test("download link points at the pdf", async ({ page }) => {
    const link = page.getByRole("link", { name: "Download Brochure" });
    await expect(link).toHaveAttribute("href", "/brochure/velora-brochure.pdf");
    await expect(link).toHaveAttribute("download", /.+/);
  });

  test("single-page mode on phones", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.getByRole("button", { name: "Next page" }).click();
    await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
  });
});
