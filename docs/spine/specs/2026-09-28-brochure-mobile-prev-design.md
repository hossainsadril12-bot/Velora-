# Brochure: Previous page in single-page mode, remove phone Book Appointment button

Date: 2026-09-28 · Branch: `fix/brochure-mobile-prev` · Status: approved (approach A)

## Problem

On phones (436×858, 375×812) and tablet portrait (768×1024) the brochure shows one page at a time.
In that mode the Previous button, the ArrowLeft key and short backward jumps (grid/slider, 1–2 pages)
do nothing. Next works. Spread mode (1024×768 and wider) is unaffected.

## Root cause

page-flip@2.0.7 lays out a portrait book with `rect.left = -pageWidth` (the single page sits in the
right half of a double-width rect). `flipController.flipPrev()` aims at global `x = 10`, which converts
to book `x = pageWidth + 10`. `flip()` then calls `isPointOnCorners()`, which only accepts points within
`sqrt(pageWidth² + height²) / 5` of the rect's left or right edge. The point is in the middle, so
because we configure `disableFlipByClick: true`, `flip()` returns early and no turn starts.
`flipToPage()` backwards goes through the same `flipPrev()`, so short backward `goTo` jumps fail too.

## Design (approach A)

In `FlipBook.tsx`, run every backward animated turn (`prev()` and the animated branch of `goTo()`)
through a helper that temporarily sets the live settings object's `disableFlipByClick` to `false`,
performs the flip, and restores the previous value in a `finally`. The corner check is only a guard
for clicks, so skipping it for our own programmatic turns is safe; direction detection
(`getDirectionByPoint`) already resolves the point to BACK. The curl animation and flipMotion easing
are unchanged. The helper reads settings the same way `setMinWidth` already does.

Separately, remove the floating tan "Book Appointment" button above `MobileControls` in
`BrochureViewer.tsx` (and the now-unused `useBooking` / `CalendarIcon` imports there). The
"Book Appointment" item in the phone ⋮ menu (`BrochureActions`) stays.

## Tests

- New Playwright tests (touch-enabled context) at 436×858, 375×812 and 768×1024:
  Next twice then Previous returns one page; ArrowLeft goes back; grid jump back one page works.
- Update the existing phone test that asserts the Book Appointment button is visible: assert it is
  gone from the page and still present in the ⋮ menu.
- Full `tests/brochure.spec.ts` and `npm run lint` (brochure files) must pass.

## Out of scope

Other open brochure follow-ups (corner tap turns page, fast slider snap-back, iOS fullscreen scroll
lock), desktop changes, upgrading or patching page-flip.
