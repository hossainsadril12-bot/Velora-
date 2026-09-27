# Brochure Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-dev (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/brochure`, a flip-book viewer for the Velora brochure laid out like `Asset/UI/Design brochure.png`.

**Architecture:** A one-off Node script turns the PDF into 24 square WebP pages + thumbnails under `public/brochure/`. `src/lib/brochure.ts` is the page manifest. A client `BrochureViewer` owns viewer state (current page, zoom, fullscreen, grid) and composes a `FlipBook` (wraps the vanilla `page-flip` library behind an imperative handle), a `ViewerControls` bar, a `ThumbnailStrip` and a `GridOverlay`.

**Tech Stack:** Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind v4 tokens from `globals.css`, Framer Motion, `page-flip@2.0.7`, poppler `pdftoppm` + `sharp` (build script only), Playwright.

## Global Constraints

- Spec: `docs/spine/specs/2026-09-27-brochure-viewer-design.md` — every requirement there applies.
- 24 book pages; page 1 and 24 are single covers (`showCover: true`); all pages square.
- Colours only via Tailwind tokens (`bg-velora-cream`, `text-dark-text`, …) — no raw hex in components.
- Page flip uses `page-flip`; every other animation uses Framer Motion. Easing `[0.16, 1, 0.3, 1]`.
- Reduced motion: flip becomes instant (`flippingTime` ≈ 1), no thumbnail tilt, no settle blur.
- Viewer root carries `data-lenis-prevent`.
- Icon buttons ≥44×44px hit area, `aria-label`, visible `focus-visible` ring.
- Download = plain link to `/brochure/velora-brochure.pdf` with `download`; no dropdown.
- Header and Footer come from the root layout — the route must not render them again.

---

## File structure and seams

| File | Responsibility | Seam |
|---|---|---|
| `scripts/build-brochure.mjs` | PDF → WebP pages/thumbs + copy PDF | CLI: `node scripts/build-brochure.mjs [pdfPath]` |
| `src/lib/brochure.ts` | Page manifest | `BROCHURE_PAGES: BrochurePage[]`, `BROCHURE_PDF: string`, `type BrochurePage = { n: number; src: string; thumb: string; alt: string }` |
| `src/types/page-flip.d.ts` | Types for untyped lib | `declare module "page-flip"` (PageFlip class subset) |
| `src/components/brochure/FlipBook.tsx` | page-flip lifecycle | `forwardRef<FlipBookHandle, FlipBookProps>`; `FlipBookHandle = { next(): void; prev(): void; goTo(index: number): void }`; `FlipBookProps = { pages: BrochurePage[]; onFlip(index: number): void; onOrientation?(o: "portrait" \| "landscape"): void; reducedMotion: boolean }` |
| `src/components/brochure/ViewerControls.tsx` | counter, scrub, zoom, fullscreen, grid buttons | props `{ index; total; label; onSeek(i); zoom; onZoomIn(); onZoomOut(); canZoomIn; canZoomOut; isFullscreen; onToggleFullscreen(); onOpenGrid() }` |
| `src/components/brochure/ThumbnailStrip.tsx` | thumbnails + cover-flow | props `{ pages; activeIndices: number[]; onSelect(i) ; reducedMotion }` |
| `src/components/brochure/GridOverlay.tsx` | all-pages grid dialog | props `{ open; pages; activeIndices; onSelect(i); onClose() }` |
| `src/components/brochure/BrochureViewer.tsx` | state + layout + keyboard + zoom/pan + fullscreen | default export, no props |
| `src/components/brochure/icons.tsx` | stroke icons (1.5px, 24px box) | named exports |
| `src/app/brochure/page.tsx`, `layout.tsx` | route + metadata | — |
| `tests/brochure.spec.ts` | Playwright e2e | — |

Index convention: `index` is 0-based page index as reported by page-flip (`getCurrentPageIndex`). `visibleIndices(index, orientation)` returns `[0]` for the front cover, `[23]` for the back cover, `[i, i+1]` for landscape spreads (i odd), `[index]` in portrait. Label: `"1 / 24"`, `"2–3 / 24"`.

---

### Task 1: Asset pipeline + manifest

**Files:** Create `scripts/build-brochure.mjs`, `src/lib/brochure.ts`, generated `public/brochure/**`. Test: `tests/brochure-assets.spec.ts`.

**Interfaces — Produces:** `BROCHURE_PAGES`, `BROCHURE_PDF`, `BrochurePage` (see seam table).

- [ ] **Step 1: Failing test** `tests/brochure-assets.spec.ts`
```ts
import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(__dirname, "..", "public", "brochure");

test("24 square WebP pages + thumbs + pdf exist", async () => {
  for (let n = 1; n <= 24; n++) {
    const id = String(n).padStart(2, "0");
    const page = await sharp(path.join(root, "pages", `page-${id}.webp`)).metadata();
    expect(page.width).toBe(1600);
    expect(page.height).toBe(1600);
    const thumb = await sharp(path.join(root, "thumbs", `page-${id}.webp`)).metadata();
    expect(thumb.width).toBe(240);
  }
  expect(fs.existsSync(path.join(root, "velora-brochure.pdf"))).toBe(true);
});
```
- [ ] **Step 2:** `npx playwright test tests/brochure-assets.spec.ts` → FAIL (files missing).
- [ ] **Step 3:** Write script: `pdftoppm -r 300 -png <pdf> <tmp>/p` (poppler on PATH or `POPPLER_BIN` env), then with sharp: PDF page 1 → book page 1; PDF pages 2–12 → extract left/right halves → pages 2..23; PDF page 13 → page 24. Resize each to 1600×1600 (`fit: "cover"`), `.webp({ quality: 82 })`; thumbs 240×240 `.webp({ quality: 70 })`. Copy PDF. Write `src/lib/brochure.ts` with 24 entries and bilingual-aware alt text ("Velora brochure — page N").
- [ ] **Step 4:** Run script, re-run test → PASS.
- [ ] **Step 5:** Commit `feat(brochure): add page asset pipeline and manifest`.

### Task 2: FlipBook + route skeleton

**Files:** Create `src/types/page-flip.d.ts`, `src/components/brochure/FlipBook.tsx`, `src/components/brochure/BrochureViewer.tsx` (minimal: book, arrows, counter), `src/app/brochure/page.tsx`, `src/app/brochure/layout.tsx`. Modify `package.json` (add `page-flip@2.0.7`). Test: `tests/brochure.spec.ts`.

**Interfaces — Consumes:** `BROCHURE_PAGES`. **Produces:** `FlipBookHandle`, `FlipBookProps`, `visibleIndices`, `pageLabel` (exported from `BrochureViewer.tsx` helpers file `src/components/brochure/pageMath.ts`: `visibleIndices(index: number, total: number, orientation: "portrait" | "landscape"): number[]`, `pageLabel(indices: number[], total: number): string`).

- [ ] **Step 1: Failing test**
```ts
import { test, expect } from "@playwright/test";

test.describe("brochure viewer", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/brochure");
    await expect(page.getByTestId("page-counter")).toHaveText("1 / 24", { timeout: 20_000 });
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
});
```
- [ ] **Step 2:** Run → FAIL (404).
- [ ] **Step 3:** Implement. FlipBook: dynamic `import("page-flip")` in `useEffect`, `new PageFlip(el, { width: 800, height: 800, size: "stretch", minWidth: 240, maxWidth: 1000, minHeight: 240, maxHeight: 1000, showCover: true, usePortrait: true, maxShadowOpacity: 0.35, flippingTime: reducedMotion ? 1 : 900, mobileScrollSupport: false, autoSize: true })`, `loadFromHtml(children)`; subscribe `flip`, `changeOrientation`; `destroy()` on unmount (guard against StrictMode double-mount). Page elements: `<div className="page" data-density="hard|soft">` containing `<img>` (plain img: page-flip clones nodes in portrait mode, `next/image` wrappers break that) with `loading` eager for first 4, lazy otherwise, `decoding="async"`, `draggable={false}`. Pages hidden until init to avoid FOUC. Viewer: arrows call handle, counter uses `pageLabel`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat(brochure): flip-book viewer route`.

### Task 3: Control bar, scrub, thumbnails

**Files:** Create `ViewerControls.tsx`, `ThumbnailStrip.tsx`, `icons.tsx`; modify `BrochureViewer.tsx`. Test: extend `tests/brochure.spec.ts`.

- [ ] **Step 1: Failing tests**
```ts
  test("thumbnail click jumps", async ({ page }) => {
    await page.getByRole("button", { name: "Go to page 10" }).click();
    await expect(page.getByTestId("page-counter")).toHaveText("10–11 / 24");
  });

  test("scrub slider seeks", async ({ page }) => {
    const slider = page.getByRole("slider", { name: "Page" });
    await slider.focus();
    await page.keyboard.press("End");
    await expect(page.getByTestId("page-counter")).toHaveText("24 / 24");
  });
```
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Slider = native `<input type="range" aria-label="Page">` styled (thin 1px track, filled part dark, 14px round thumb), `onChange` → `goTo`. Thumbnails: buttons `aria-label="Go to page N"`, `aria-current` on active, number under each; active outline 1.5px dark + lift (`y: -6, scale: 1.06`), neighbours `rotateY: ±8` via Framer Motion; strip `overflow-x-auto`, active scrolled into view (`scrollIntoView({ inline: "center", block: "nearest" })`, `behavior` auto under reduced motion). Live region `aria-live="polite"` announcing "Page N of 24".
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat(brochure): controls and thumbnail strip`.

### Task 4: Zoom/pan, fullscreen, grid overlay

**Files:** Create `GridOverlay.tsx`; modify `BrochureViewer.tsx`, `ViewerControls.tsx`. Test: extend spec.

- [ ] **Step 1: Failing tests**
```ts
  test("grid overlay opens, jumps, closes", async ({ page }) => {
    await page.getByRole("button", { name: "Show all pages" }).click();
    const dialog = page.getByRole("dialog", { name: "All pages" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Go to page 16" }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByTestId("page-counter")).toHaveText("16–17 / 24");
  });

  test("zoom in enables zoom out", async ({ page }) => {
    const out = page.getByRole("button", { name: "Zoom out" });
    await expect(out).toBeDisabled();
    await page.getByRole("button", { name: "Zoom in" }).click();
    await expect(out).toBeEnabled();
  });
```
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Zoom steps `[1, 1.5, 2, 3]`; book wrapper `motion.div` animates `scale`, `x`, `y`; when zoom > 1 render a transparent pan layer above the book (`cursor-grab`, pointer events → pan, clamped to `(scale-1)/2 × size`) so page-flip receives no gestures; reset on page change. Fullscreen: `root.requestFullscreen()`, listen `fullscreenchange`; if unsupported, toggle a CSS fixed-overlay class. Grid: Framer `AnimatePresence` dialog (`role="dialog" aria-modal aria-label="All pages"`), backdrop 50% dark-green scrim, `repeat(auto-fill, minmax(120px, 1fr))` grid, Esc closes, focus moves to first item and returns to trigger.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit `feat(brochure): zoom, fullscreen and grid view`.

### Task 5: Top row, download, settle motion, responsive polish

**Files:** Modify `BrochureViewer.tsx`; test extend.

- [ ] **Step 1: Failing test**
```ts
  test("download link points at the pdf", async ({ page }) => {
    const link = page.getByRole("link", { name: "Download Brochure" });
    await expect(link).toHaveAttribute("href", "/brochure/velora-brochure.pdf");
    await expect(link).toHaveAttribute("download", /.*/);
  });
```
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement top row (Back link with arrow → `/` via `TransitionLink`; dark `bg-dark-text text-white` download button, 8px radius, icon + label). Settle: on flip end animate the book frame `opacity 0.92→1, filter blur(2px)→0` over 0.4s + 0.3s, skipped under reduced motion. Responsive: stage height `calc(100dvh - 100px - controls)`, arrows 48px under 1024px, controls wrap; verify 1440 and 375 visually against reference.
- [ ] **Step 4:** Run full `npx playwright test tests/brochure*.spec.ts` + `npm run lint` + `npx tsc --noEmit` → clean.
- [ ] **Step 5:** Commit `feat(brochure): top bar, download and motion polish`.
