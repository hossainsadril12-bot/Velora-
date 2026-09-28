# Brochure: backward page turn curls like the forward turn in single-page mode

Date: 2026-09-28 · Branch: `fix/brochure-back-curl` · Status: approved

## Problem

In single-page (portrait) mode — phones and tablet portrait — Next shows a smooth corner curl that
starts at the visible page's right edge. Previous shows nothing for roughly the first half of the
1100ms turn, then a flat page snaps in from the left. Measured at 436×858: the previous page first
covers the visible page's bottom-left corner about 540ms into the turn.

## Root cause

page-flip@2.0.7 lays out a portrait book as a double-width rect whose left half is off the visible
page. A programmatic turn (`Flip.flip()`) always animates the corner from page coordinate
`x = pageWidth - height/10` to `x = -pageWidth`. Going forward that path starts on the visible page.
Going back, page coordinates are mirrored around the spine (the visible page's left edge), so the path
starts one page-width to the left of the visible page, inside the hidden half. `flipMotion.ts`'s eased
curve (`easeTurn`, slow start) spends its gentle opening in that hidden region, so the part the reader
sees is the fast middle: a flat snap instead of a curl.

## Design

In `src/components/brochure/flipMotion.ts`, when restyling a turn, detect a programmatic **backward**
turn in **portrait** orientation (flip calculation direction BACK, render orientation `"portrait"`) and
start its path at the spine (`x = 1` in page coordinates — just at the visible page's left edge) instead
of the library's hidden start point. Destination, easing, duration, arc lift and corner (y) are
unchanged. The whole turn is then on the visible page: the previous page appears folded at the left
edge and uncurls across it, landing on the corner — Next played in reverse.

Unchanged: forward turns, landscape/desktop spreads, finger drags and releases, hover corner curls,
reduced motion (flipMotion is not installed there).

## Tests

New Playwright test in the existing single-page describe loop (436×858, 375×812, 768×1024):
from page 3, trigger Previous and measure (in-page, with `requestAnimationFrame`) how long until the
topmost `.stf__item` under a point 20px inside the book's bottom-left corner shows a different page than
before. Expect under 300ms. Pre-fix this is ~540ms, so the test fails before the fix. Existing
`tests/brochure.spec.ts` must stay green.

## Out of scope

Forward animation, landscape/desktop, turn speed or easing curves, page-flip upgrade or patch.
