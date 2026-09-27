# Brochure flip-book viewer — design

Reference: `Asset/UI/Design brochure.png`
Source: `Asset/Eiman Estates - Velora_Brochure (Digital) v5.3.pdf` (58 MB, 13 PDF pages)

## Goal
A `/brochure` page that shows the Velora brochure as a realistic flip-book, laid out like the reference screenshot, with a single Download button for the PDF.

## Source structure
- PDF page 1 = front cover (504×504pt, single square page).
- PDF pages 2–12 = spreads (1008×504pt), each split into a left and right book page.
- PDF page 13 = back cover (504×504pt).
- Total: 24 book pages, all square. Page order maps 1:1, no reordering.

## Asset pipeline (build-time, one-off script)
- `scripts/build-brochure.mjs` (Node + poppler `pdftoppm` + `sharp`, both available locally).
- Renders each PDF page at high DPI, splits spreads into halves, writes:
  - `public/brochure/pages/page-01.webp` … `page-24.webp` — 1600×1600, WebP q≈82 (zoom-quality).
  - `public/brochure/thumbs/page-01.webp` … — 240×240, WebP.
- Copies the PDF to `public/brochure/velora-brochure.pdf` for download.
- Generated files are committed; the script is re-run only when the brochure changes.
- `src/lib/brochure.ts` exports the page list (src, thumb, alt, page number) — single source of truth.

## Layout (matches reference)
- Existing site `Header` (non-home routes already render the white bar: En ▾, Search, logo, Brochure, Book an Appointment, menu). Existing `Footer` stays below the viewer.
- Page background: light warm-grey stage (`velora-cream` family), fills viewport below the 100px header.
- Top row: "← Back to Brochures" (left, links to `/`) and a dark filled **Download Brochure** button with download icon (right). No dropdown.
- Centre: open book with soft drop shadow and gutter shading; round white 64px ← / → buttons at the stage edges, vertically centred.
- Book: square pages, so an open spread is 2:1. Covers show as a single page (closed book), centred.
- Control bar: "N / 24" counter (tabular figures), scrub slider (thumb + filled track), then icon buttons: zoom in, zoom out, fullscreen, grid view.
- Thumbnail strip: 24 square thumbnails with page numbers below, horizontally scrollable; current page (or spread pair) outlined; auto-scrolls to keep current visible.

## Behaviour
- **Page turn:** `page-flip` (StPageFlip, vanilla, HTML mode) — curl, shadow, corner drag. Exception to the "Framer Motion only" rule, scoped to this viewer. All other motion uses Framer Motion.
- **Post-flip settle:** on flip end the newly visible pages get a short opacity/blur settle (≈0.4s + 0.3s, ease-out-expo), thumbnail active state updates. Page content is a flat image, so text is not animated separately.
- **Thumbnails:** light cover-flow — active thumb lifts (translateY + scale ~1.06), immediate neighbours tilt slightly (rotateY ±8°). Strip layout stays flat like the reference.
- **Navigation:** arrows, ←/→ keys, Home/End, swipe (via page-flip), scrub slider, thumbnail click, grid overlay click.
- **Zoom:** 1× / 1.5× / 2× / 3× steps; when zoomed, page-flip gestures are disabled and the book pans by drag (pointer events) inside an overflow-hidden frame; zoom resets on page change.
- **Fullscreen:** Fullscreen API on the viewer root; fallback to a fixed full-window overlay where unsupported (iOS Safari). Esc exits.
- **Grid view:** overlay listing all 24 thumbnails in a grid; click jumps; Esc / close button dismisses; focus trapped and restored.
- **Download:** `<a href="/brochure/velora-brochure.pdf" download>`.
- **Responsive:** ≥1024px two-page spread; <1024px single-page portrait mode (page-flip `usePortrait`), smaller arrows, control bar wraps; thumbnails scroll horizontally.
- **Loading:** page images lazy-loaded (current ± 2 spreads eager); skeleton tint while loading; reserved aspect ratio (no CLS).
- **Accessibility:** all icon buttons have aria-labels + visible focus rings; live region announces "Page N of 24"; each page image has alt text; reduced-motion disables flip animation (instant turn) and thumb tilt.
- **Lenis:** viewer root gets `data-lenis-prevent` so wheel/drag don't fight smooth scroll.

## Out of scope
- QR code / phone / email hotspots on pages.
- Brochure listing page (Back goes to `/`).
- Functional language switch or search.
- Compressing the PDF (uses the 58 MB file until a lighter export is provided).
- Selectable/searchable page text.

## Verification
- `npm run lint` and `tsc --noEmit` clean for new files.
- Playwright test `tests/brochure.spec.ts`: page loads, counter shows "1 / 24", next arrow advances, thumbnail click jumps, grid opens/closes, download link points at the PDF.
- Manual browser check at 1440px and 375px against the reference.
