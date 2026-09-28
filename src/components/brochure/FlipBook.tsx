"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { PageFlip } from "page-flip";
import type { BrochurePage } from "@/lib/brochure";
import type { Orientation } from "./pageMath";
import { installFlipMotion, type TurnStart } from "./flipMotion";

export type FlipBookHandle = {
  next(): void;
  prev(): void;
  goTo(index: number): void;
  /** Drop a touch page-flip has started tracking (a pinch took over). */
  cancelTouch(): void;
};

export type FlipBookProps = {
  pages: BrochurePage[];
  /** Book box in px, decided by the viewer (2:1 for a spread, 1:1 for portrait). */
  width: number;
  height: number;
  reducedMotion: boolean;
  /** Force one page at a time even when the box is wide enough for a spread. */
  singlePage?: boolean;
  onFlip(index: number): void;
  onOrientation?(orientation: Orientation): void;
  onReady?(): void;
  /** Fires as an animated turn begins (not when it lands). */
  onTurnStart?(turn: TurnStart): void;
  /** Long jumps skip the curl; the viewer hides the swap behind a fade. */
  onJump?(swap: () => void): void;
};

const PRELOAD_RADIUS = 4;
/** Below twice this box width page-flip shows one page (matches MIN_SPREAD_WIDTH). */
const SPREAD_MIN_PAGE = 320;
/** Large enough that page-flip always chooses portrait. */
const FORCE_PORTRAIT = 100_000;

/**
 * page-flip's render loop re-arms itself with requestAnimationFrame forever and
 * destroy() never cancels it, so every unmounted book would keep drawing into
 * detached nodes and stay in memory. We capture the loop callback while the
 * book starts, then refuse to schedule it again once the book is gone.
 */
const stoppedLoops = new WeakSet<FrameRequestCallback>();
let rafFilterInstalled = false;

function captureFrameLoops(start: () => void): FrameRequestCallback[] {
  const captured: FrameRequestCallback[] = [];
  const raf = window.requestAnimationFrame;
  window.requestAnimationFrame = (cb) => {
    captured.push(cb);
    return raf.call(window, cb);
  };
  try {
    start();
  } finally {
    window.requestAnimationFrame = raf;
  }
  return captured;
}

function stopFrameLoops(loops: FrameRequestCallback[]) {
  if (!loops.length) return;
  loops.forEach((cb) => stoppedLoops.add(cb));
  if (rafFilterInstalled) return;
  rafFilterInstalled = true;
  const raf = window.requestAnimationFrame;
  window.requestAnimationFrame = (cb) => (stoppedLoops.has(cb) ? 0 : raf.call(window, cb));
}

/** page-flip re-reads its live settings object on every layout pass (untyped in its d.ts). */
function setMinWidth(book: PageFlip, px: number) {
  const settings = (book as unknown as { getSettings?(): { minWidth: number } }).getSettings?.();
  if (settings) settings.minWidth = px;
}

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

/**
 * page-flip's own UI (Previous button, arrow keys, thumbnail jumps, and the
 * swipe gesture it detects on touchend) all end up calling the flip
 * controller's flipPrev directly, not PageFlip.flipPrev. Wrapping it once,
 * right after the controller exists, routes every one of those callers
 * through withProgrammaticFlip instead of only the ones this file calls
 * itself — swipes included. This is not a motion effect, so install it for
 * reduced motion too.
 */
function installFlipPrevGuard(book: PageFlip) {
  const controller = (
    book as unknown as { getFlipController?(): { flipPrev?: (corner?: string) => void } }
  ).getFlipController?.();
  if (!controller || typeof controller.flipPrev !== "function") return;
  const flipPrev = controller.flipPrev.bind(controller);
  controller.flipPrev = (corner) => withProgrammaticFlip(book, () => flipPrev(corner));
}

/** One full page turn, arrow or key press. */
export const TURN_MS = 1100;

/**
 * Wraps the vanilla `page-flip` library. Page nodes are created imperatively
 * because page-flip re-parents (and in portrait mode clones) them, which React
 * must never see.
 */
const FlipBook = forwardRef<FlipBookHandle, FlipBookProps>(function FlipBook(
  { pages, width, height, reducedMotion, singlePage = false, onFlip, onOrientation, onReady, onTurnStart, onJump },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const loaded = useRef(new Set<number>());
  const singleRef = useRef(singlePage);

  // Keep latest callbacks without re-initialising the book.
  const callbacks = useRef({ onFlip, onOrientation, onReady, onTurnStart, onJump });
  useEffect(() => {
    callbacks.current = { onFlip, onOrientation, onReady, onTurnStart, onJump };
  });

  useImperativeHandle(ref, () => ({
    next: () => flipRef.current?.flipNext("bottom"),
    prev: () => flipRef.current?.flipPrev("bottom"),
    goTo: (index: number) => {
      const book = flipRef.current;
      if (!book) return;
      const current = book.getCurrentPageIndex();
      if (index === current) return;
      // Neighbouring pages get the curl; long jumps turn instantly.
      if (Math.abs(index - current) <= 2 && !reducedMotion) book.flip(index, "bottom");
      else {
        const swap = () => {
          book.turnToPage(index);
          callbacks.current.onFlip(index);
        };
        if (reducedMotion || !callbacks.current.onJump) swap();
        else callbacks.current.onJump(swap);
      }
    },
    cancelTouch: () => {
      // page-flip keeps the pending touch in private fields. Clearing them
      // stops the delayed drag start and the swipe check on touchend; if the
      // drag had already begun (finger held > 250ms), drop the fold as well,
      // because the pinch swallows the touchend that would normally end it.
      const book = flipRef.current as unknown as {
        getUI?(): { touchPoint?: unknown };
        getFlipController?(): { stopMove?(): void };
        isUserTouch?: boolean;
      } | null;
      if (!book) return;
      const ui = book.getUI?.();
      if (ui && "touchPoint" in ui) ui.touchPoint = null;
      if (book.isUserTouch) {
        book.isUserTouch = false;
        book.getFlipController?.()?.stopMove?.();
      }
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let frameLoops: FrameRequestCallback[] = [];
    const loadedSet = loaded.current;

    // page-flip removes the element it is given on destroy(), so hand it a
    // host we own rather than the React node.
    const host = document.createElement("div");
    host.className = "brochure-book";
    container.appendChild(host);

    const nodes = pages.map((page, i) => {
      const el = document.createElement("div");
      el.className = "brochure-page";
      el.dataset.side = i === 0 || i === pages.length - 1 ? "cover" : i % 2 === 1 ? "left" : "right";
      el.dataset.density = el.dataset.side === "cover" ? "hard" : "soft";
      const img = document.createElement("img");
      img.alt = page.alt;
      img.decoding = "async";
      img.draggable = false;
      img.dataset.src = page.src;
      el.appendChild(img);
      host.appendChild(el);
      return el;
    });

    const load = (center: number) => {
      for (let i = center - PRELOAD_RADIUS; i <= center + PRELOAD_RADIUS; i++) {
        if (i < 0 || i >= pages.length || loadedSet.has(i)) continue;
        loadedSet.add(i);
        // Portrait mode clones pages, so update every copy of this page.
        document
          .querySelectorAll<HTMLImageElement>(`.brochure-page img[data-src="${pages[i].src}"]`)
          .forEach((img) => {
            img.src = pages[i].src;
          });
      }
    };

    import("page-flip").then(({ PageFlip }) => {
      if (disposed) return;
      const book = new PageFlip(host, {
        width: 800,
        height: 800,
        size: "stretch",
        // Portrait (single page) below a 640px box — matches MIN_SPREAD_WIDTH in the viewer.
        minWidth: SPREAD_MIN_PAGE,
        maxWidth: 2000,
        minHeight: 160,
        maxHeight: 2000,
        showCover: true,
        usePortrait: true,
        autoSize: true,
        drawShadow: true,
        maxShadowOpacity: 0.5,
        flippingTime: reducedMotion ? 1 : TURN_MS,
        mobileScrollSupport: false,
        swipeDistance: 30,
        disableFlipByClick: true,
      });
      flipRef.current = book;

      book.on("flip", (e) => {
        load(e.data);
        callbacks.current.onFlip(e.data);
      });
      book.on("changeOrientation", (e) => callbacks.current.onOrientation?.(e.data));
      book.on("init", (e) => {
        load(e.data.page);
        callbacks.current.onOrientation?.(e.data.mode);
        callbacks.current.onReady?.();
      });

      frameLoops = captureFrameLoops(() => book.loadFromHTML(nodes));
      // Orientation is decided from minWidth on every layout pass. Set it only
      // after loading: the UI copies minWidth into the host's CSS once, there.
      if (singleRef.current) {
        setMinWidth(book, FORCE_PORTRAIT);
        book.update();
      }
      // The render and flip controller only exist once pages are loaded.
      installFlipPrevGuard(book);
      if (!reducedMotion) {
        installFlipMotion(book, {
          turnMs: TURN_MS,
          onTurnStart: (turn) => callbacks.current.onTurnStart?.(turn),
        });
      }
      load(0);
    });

    return () => {
      disposed = true;
      stopFrameLoops(frameLoops);
      flipRef.current?.destroy();
      flipRef.current = null;
      loadedSet.clear();
      host.remove();
    };
  }, [pages, reducedMotion]);

  // The library only listens to window resize; re-measure when our box changes.
  useEffect(() => {
    singleRef.current = singlePage;
    const book = flipRef.current;
    if (!book) return;
    setMinWidth(book, singlePage ? FORCE_PORTRAIT : SPREAD_MIN_PAGE);
    book.update();
  }, [width, height, singlePage]);

  return <div ref={containerRef} className="relative" style={{ width, height }} />;
});

export default FlipBook;
