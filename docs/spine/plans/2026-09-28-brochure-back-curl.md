# Brochure Back-Turn Curl Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-dev (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** In single-page mode, make a programmatic backward page turn play fully on the visible page, mirroring the forward curl.

**Architecture:** `flipMotion.ts` already re-times every programmatic turn along an eased arc. For backward turns in portrait orientation it will replace page-flip's hidden start point with the spine (`x = 1`), keeping destination, easing, duration and lift.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, page-flip 2.0.7, Playwright.

Spec: `docs/spine/specs/2026-09-28-brochure-back-curl-design.md`

## Global Constraints

- Do not upgrade, patch or fork `page-flip`; keep version 2.0.7.
- Forward turns, landscape/desktop spreads, finger drags/releases and hover corner curls must behave exactly as before.
- Do not change turn duration (`TURN_MS` 1100) or the easing curves.
- Tests run against the dev server at `http://localhost:3000` (`reuseExistingServer: true`); do not start or kill a server.
- Commit messages: Conventional Commits, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## File structure and seams

- `src/components/brochure/flipMotion.ts` — seam: `installFlipMotion(book, { turnMs, onTurnStart })`, unchanged signature. Internal change only, in the `render.startAnimation` override.
- `tests/brochure.spec.ts` — one new test inside the existing `for (const [width, height] of [...])` single-page describe loop (its `beforeEach` leaves the book on "3 / 24").

---

### Task 1: Backward portrait turn starts at the spine

> Superseded in fix round 1: the test probes a column at the left edge (threshold 250ms) instead of one corner point; see the spec's Tests section.

**Files:**
- Modify: `src/components/brochure/flipMotion.ts` (`RenderInternals` type ~lines 25-28; `render.startAnimation` override ~lines 102-142)
- Test: `tests/brochure.spec.ts` (inside the single-page describe loop, after its existing tests)

**Interfaces:**
- Consumes: page-flip internals already used by the file — `flip.getCalculation()?.getDirection()` (`1` = BACK) and the render object; adds optional `render.getOrientation?(): string` (returns `"portrait"` or `"landscape"`).
- Produces: nothing new.

- [ ] **Step 1: Write the failing test** — add inside the single-page describe loop:

```ts
    test("previous turn curls in from the visible left edge", async ({ page }) => {
      const ms = await page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            const box = document.querySelector(".brochure-book")!.getBoundingClientRect();
            const shown = () =>
              document
                .elementsFromPoint(box.left + 20, box.bottom - 20)
                .find((el) => el.classList.contains("stf__item"))
                ?.querySelector("img")?.dataset.src;
            const before = shown();
            const button = document.querySelector<HTMLButtonElement>('button[aria-label="Previous page"]')!;
            const t0 = performance.now();
            button.click();
            const tick = () => {
              const elapsed = performance.now() - t0;
              if (shown() !== before || elapsed > 1500) resolve(elapsed);
              else requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }),
      );
      expect(ms).toBeLessThan(300);
      await expect(page.getByTestId("page-counter")).toHaveText("2 / 24");
    });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx playwright test tests/brochure.spec.ts -g "curls in from the visible left edge"`
Expected: 3 FAIL — `expect(received).toBeLessThan(300)` with received around 500–560.

- [ ] **Step 3: Implement** — in `flipMotion.ts`, extend the render type:

```ts
type RenderInternals = {
  startAnimation(frames: Frame[], duration: number, onEnd: () => void): void;
  getRect(): PageRect;
  getOrientation?(): string;
};
```

In the `render.startAnimation` override, right after `const programmatic = ...;`, add:

```ts
    // A portrait book's left half lies off the visible page, and page-flip
    // mirrors backward turns around the spine, so a back turn would begin a
    // full page to the left of what the reader sees and only snap into view
    // halfway through. Start it at the spine so the whole turn is on screen:
    // the forward curl played in reverse.
    const fromSpine =
      programmatic &&
      flip.getCalculation()?.getDirection() === 1 &&
      render.getOrientation?.() === "portrait";
    const start = fromSpine ? { x: 1, y: move.start.y } : move.start;
```

Then use `start` instead of `move.start` in the arc `control` point and in the frame loop's `u * u * ...` terms (`sign` may keep `move.start.y`; the y is identical).

- [ ] **Step 4: Run tests**

Run: `npx playwright test tests/brochure.spec.ts` — Expected: all PASS (30 existing + 3 new = 33).
Run: `npx eslint src/components/brochure` — Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/brochure/flipMotion.ts tests/brochure.spec.ts
git commit -m "fix(brochure): curl back turns from the visible edge in single-page mode"
```
