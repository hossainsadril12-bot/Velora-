# Brochure Mobile Previous-Page Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-dev (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Previous / ArrowLeft / short backward jumps work in the brochure's single-page mode, and remove the phone's floating Book Appointment button.

**Architecture:** page-flip@2.0.7 drops programmatic backward turns in portrait mode because `flipPrev()` aims at a point that fails the `disableFlipByClick` corner check. `FlipBook` lifts that setting for the duration of its own programmatic turns via the live settings object. The Book Appointment button is deleted from `BrochureViewer`'s mobile controls; the ⋮ menu item stays.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, page-flip 2.0.7, Playwright.

Spec: `docs/spine/specs/2026-09-28-brochure-mobile-prev-design.md`

## Global Constraints

- Do not upgrade, patch or fork `page-flip`; keep version 2.0.7.
- Keep the curl animation and `flipMotion.ts` unchanged.
- Keep the "Book Appointment" menu item in `src/components/brochure/BrochureActions.tsx`.
- No desktop layout or behaviour change.
- Tests run against the dev server at `http://localhost:3000` (`reuseExistingServer: true`).
- Commit messages: Conventional Commits, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## File structure and seams

- `src/components/brochure/FlipBook.tsx` — seam: `FlipBookHandle` (`next()`, `prev()`, `goTo(index)`, `cancelTouch()`); unchanged signatures. New private helper `withProgrammaticFlip(book: PageFlip, turn: () => void): void`.
- `src/components/brochure/BrochureViewer.tsx` — mobile controls block loses the Book Appointment button.
- `tests/brochure.spec.ts` — new single-page describe blocks; updated phone test.

---

### Task 1: Previous works in single-page mode

**Files:**
- Modify: `src/components/brochure/FlipBook.tsx` (helper after `setMinWidth`, lines ~73-77; `useImperativeHandle` `prev` and `goTo`, lines ~101-119)
- Test: `tests/brochure.spec.ts` (append at end of file)

**Interfaces:**
- Consumes: nothing new.
- Produces: no public change; `FlipBookHandle` stays identical.

- [ ] **Step 1: Write the failing tests** — append to `tests/brochure.spec.ts`:

```ts
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
      await grid.getByRole("button", { name: "Go to page 2" }).tap();
      await expect(grid).toBeHidden();
      await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
    });
  });
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx playwright test tests/brochure.spec.ts -g "single page at"`
Expected: 9 tests FAIL — counter stays at `3 / 24` (e.g. `Expected: "2 / 24" Received: "3 / 24"`).

- [ ] **Step 3: Implement** — in `FlipBook.tsx`, add after `setMinWidth`:

```ts
/**
 * page-flip drops programmatic backward turns in portrait mode: flipPrev()
 * aims at x=10, but the portrait rect starts one page-width to the left, so
 * the point lands mid-book and fails the corner check that disableFlipByClick
 * adds. That check only exists to filter clicks, so lift it for our own turns.
 */
function withProgrammaticFlip(book: PageFlip, turn: () => void) {
  const settings = (book as unknown as { getSettings?(): { disableFlipByClick: boolean } }).getSettings?.();
  if (!settings) {
    turn();
    return;
  }
  const disabled = settings.disableFlipByClick;
  settings.disableFlipByClick = false;
  try {
    turn();
  } finally {
    settings.disableFlipByClick = disabled;
  }
}
```

and change the handle's `prev` and the animated branch of `goTo`:

```ts
    prev: () => {
      const book = flipRef.current;
      if (book) withProgrammaticFlip(book, () => book.flipPrev("bottom"));
    },
```

```ts
      if (Math.abs(index - current) <= 2 && !reducedMotion) withProgrammaticFlip(book, () => book.flip(index, "bottom"));
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx playwright test tests/brochure.spec.ts`
Expected: all tests PASS (new 9 plus existing).

- [ ] **Step 5: Commit**

```bash
git add src/components/brochure/FlipBook.tsx tests/brochure.spec.ts
git commit -m "fix(brochure): turn back a page in single-page mode"
```

### Task 2: Remove the phone Book Appointment button

**Files:**
- Modify: `src/components/brochure/BrochureViewer.tsx` (imports lines 6 and 16, `useBooking` line 61, button lines ~388-397)
- Test: `tests/brochure.spec.ts` (test "phone: floating bar navigates, download lives in the menu", line ~107)

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

- [ ] **Step 1: Update the test first** — replace the last assertion of "phone: floating bar navigates, download lives in the menu":

```ts
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Book Appointment" })).toHaveCount(0);
    await page.getByRole("button", { name: "More actions" }).click();
    await expect(menu.getByRole("menuitem", { name: "Book Appointment" })).toBeVisible();
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx playwright test tests/brochure.spec.ts -g "floating bar navigates"`
Expected: FAIL — `toHaveCount(0)` receives 1.

- [ ] **Step 3: Implement** — in `BrochureViewer.tsx` delete the `{!fullscreen && ( <button ... onClick={openBooking} ...> ... Book Appointment </button> )}` block above `<MobileControls`, delete `const { openBooking } = useBooking();`, delete `import { useBooking } from "@/components/BookingProvider";`, and drop `CalendarIcon` from the `./icons` import:

```ts
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon } from "./icons";
```

- [ ] **Step 4: Run tests and lint**

Run: `npx playwright test tests/brochure.spec.ts` — Expected: all PASS.
Run: `npx eslint src/components/brochure` — Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/brochure/BrochureViewer.tsx tests/brochure.spec.ts
git commit -m "fix(brochure): drop floating Book Appointment button on phones"
```
