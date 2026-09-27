"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { PageFlip } from "page-flip";
import type { BrochurePage } from "@/lib/brochure";
import type { Orientation } from "./pageMath";

export type FlipBookHandle = {
  next(): void;
  prev(): void;
  goTo(index: number): void;
};

export type FlipBookProps = {
  pages: BrochurePage[];
  /** Book box in px, decided by the viewer (2:1 for a spread, 1:1 for portrait). */
  width: number;
  height: number;
  reducedMotion: boolean;
  onFlip(index: number): void;
  onOrientation?(orientation: Orientation): void;
  onReady?(): void;
};

const PRELOAD_RADIUS = 4;

/**
 * Wraps the vanilla `page-flip` library. Page nodes are created imperatively
 * because page-flip re-parents (and in portrait mode clones) them, which React
 * must never see.
 */
const FlipBook = forwardRef<FlipBookHandle, FlipBookProps>(function FlipBook(
  { pages, width, height, reducedMotion, onFlip, onOrientation, onReady },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);
  const loaded = useRef(new Set<number>());

  // Keep latest callbacks without re-initialising the book.
  const callbacks = useRef({ onFlip, onOrientation, onReady });
  useEffect(() => {
    callbacks.current = { onFlip, onOrientation, onReady };
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
        book.turnToPage(index);
        callbacks.current.onFlip(index);
      }
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
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
        minWidth: 320,
        maxWidth: 2000,
        minHeight: 160,
        maxHeight: 2000,
        showCover: true,
        usePortrait: true,
        autoSize: true,
        drawShadow: true,
        maxShadowOpacity: 0.35,
        flippingTime: reducedMotion ? 1 : 900,
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

      book.loadFromHTML(nodes);
      load(0);
    });

    return () => {
      disposed = true;
      flipRef.current?.destroy();
      flipRef.current = null;
      loadedSet.clear();
      host.remove();
    };
  }, [pages, reducedMotion]);

  // The library only listens to window resize; re-measure when our box changes.
  useEffect(() => {
    flipRef.current?.update();
  }, [width, height]);

  return <div ref={containerRef} className="relative" style={{ width, height }} />;
});

export default FlipBook;
