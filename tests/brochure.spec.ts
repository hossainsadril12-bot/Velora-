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

  test("scrub slider arrow keys step through spreads", async ({ page }) => {
    const slider = page.getByRole("slider", { name: "Page" });
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("page-counter")).toHaveText("2–3 / 24");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByTestId("page-counter")).toHaveText("4–5 / 24");
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByTestId("page-counter")).toHaveText("2–3 / 24");
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

test.describe("brochure viewer — responsive", () => {
  const open = async (page: import("@playwright/test").Page, width: number, height: number) => {
    await page.setViewportSize({ width, height });
    await page.goto("/brochure");
    await expect(page.locator("section[data-ready]")).toBeVisible({ timeout: 20_000 });
  };

  test("phone: floating bar navigates, download lives in the menu", async ({ page }) => {
    await open(page, 375, 812);
    const bar = page.getByRole("toolbar", { name: "Brochure controls" });
    await expect(bar).toBeVisible();
    await bar.getByRole("button", { name: "Next page" }).click();
    await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
    await expect(page.locator("section[data-ready] > div a[download]")).toHaveCount(0);
    await page.getByRole("button", { name: "More actions" }).click();
    const menu = page.getByRole("menu", { name: "Brochure actions" });
    await expect(menu.getByRole("menuitem", { name: "Download PDF" })).toHaveAttribute(
      "href",
      "/brochure/velora-brochure.pdf",
    );
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Book Appointment" })).toBeVisible();
  });

  test("phone: thumbnails open as a bottom sheet", async ({ page }) => {
    await open(page, 375, 812);
    await page.getByRole("button", { name: "Show all pages" }).click();
    const sheet = page.getByRole("dialog", { name: "All pages" });
    await expect(sheet).toBeVisible();
    await sheet.getByRole("button", { name: "Go to page 7" }).click();
    await expect(sheet).toBeHidden();
    await expect(page.getByTestId("page-counter")).toHaveText("7 / 24");
  });

  test("phone: double-tap zooms in and out", async ({ page }) => {
    await open(page, 375, 812);
    const out = page.getByRole("button", { name: "Zoom out" });
    await expect(out).toBeDisabled();
    await page.locator(".brochure-book").dblclick();
    await expect(out).toBeEnabled();
    await page.locator(".brochure-book").dblclick({ force: true });
    await expect(out).toBeDisabled();
  });

  test("tablet portrait reads one page, landscape a spread", async ({ page }) => {
    await open(page, 768, 1024);
    await page.getByRole("button", { name: "Next page" }).click();
    await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
    await open(page, 1024, 768);
    await page.getByRole("button", { name: "Next page" }).click();
    await expect(page.getByTestId("page-counter")).toHaveText("2–3 / 24");
  });
});

test("hovering a page corner curls it at the library's quick pace", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/brochure");
  await expect(page.locator("section[data-ready]")).toBeVisible({ timeout: 20_000 });
  await page.keyboard.press("ArrowRight");
  await expect(page.getByTestId("page-counter")).toHaveText("2–3 / 24");
  await page.waitForTimeout(1500);

  const box = (await page.locator(".brochure-book").boundingBox())!;
  const corner = { x: box.x + box.width - 30, y: box.y + box.height - 30 };
  await page.mouse.move(corner.x - 300, corner.y - 300);
  await page.mouse.move(corner.x, corner.y);

  // Once the curl has settled, the folded page's clip-path stops changing.
  const clip = () =>
    page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>(".stf__item")].map((el) => el.style.clipPath).join("|"),
    );
  await page.waitForTimeout(150);
  const early = await clip();
  await page.waitForTimeout(400);
  expect(await clip()).toBe(early);
});

for (const [width, height] of [
  [436, 858],
  [375, 812],
  [768, 1024],
] as const) {
  test.describe(`brochure viewer — single page at ${width}x${height}`, () => {
    test.use({ viewport: { width, height }, hasTouch: true, isMobile: true });

    test.beforeEach(async ({ page }) => {
      await page.goto("/brochure");
      await expect(page.locator("section[data-ready]")).toBeVisible({ timeout: 20_000 });
      const counter = page.getByTestId("page-counter");
      await expect(counter).toHaveText("1 / 24");
      await page.getByRole("button", { name: "Next page" }).tap();
      await expect(counter).toHaveText("2 / 24");
      await page.getByRole("button", { name: "Next page" }).tap();
      await expect(counter).toHaveText("3 / 24");
    });

    test("previous button turns back one page", async ({ page }) => {
      await page.getByRole("button", { name: "Previous page" }).tap();
      await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
      await page.getByRole("button", { name: "Previous page" }).tap();
      await expect(page.getByTestId("page-counter")).toHaveText("1 / 24");
    });

    test("ArrowLeft turns back one page", async ({ page }) => {
      await page.keyboard.press("ArrowLeft");
      await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
    });

    test("grid jump back one page", async ({ page }) => {
      await page.getByRole("button", { name: "Show all pages" }).tap();
      const grid = page.getByRole("dialog", { name: "All pages" });
      await expect(grid).toBeVisible();
      await grid.getByRole("button", { name: "Go to page 2", exact: true }).tap();
      await expect(grid).toBeHidden();
      await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
    });
  });
}
