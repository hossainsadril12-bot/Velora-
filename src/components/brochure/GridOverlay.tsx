"use client";

import { useEffect, useRef } from "react";
import { lockScroll } from "@/lib/scroll";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "framer-motion";
import type { BrochurePage } from "@/lib/brochure";
import { CloseIcon } from "./icons";

type GridOverlayProps = {
  open: boolean;
  pages: BrochurePage[];
  activeIndices: number[];
  reducedMotion: boolean;
  /** "sheet" slides up from the bottom (phones); "full" covers the viewport. */
  variant?: "sheet" | "full";
  onSelect(index: number): void;
  onClose(): void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** A downward drag past this (px) or flick faster than this (px/s) closes the sheet. */
const SHEET_CLOSE_OFFSET = 100;
const SHEET_CLOSE_VELOCITY = 500;

export default function GridOverlay({
  open,
  pages,
  activeIndices,
  reducedMotion,
  variant = "full",
  onSelect,
  onClose,
}: GridOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return;
    lockScroll(true, "brochure-grid");
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('[aria-current="page"]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Trap focus inside the dialog.
      const items = panel.querySelectorAll<HTMLElement>("button");
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      lockScroll(false, "brochure-grid");
    };
  }, [open, onClose]);

  const d = reducedMotion ? 0 : 1;
  const sheet = variant === "sheet";

  const list = (
    <ol
      data-lenis-prevent
      className={`grid content-start overflow-y-auto overscroll-contain ${
        sheet
          ? "min-h-0 flex-1 grid-cols-3 gap-x-3 gap-y-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-1"
          : "flex-1 grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-x-5 gap-y-6 pb-4 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
      }`}
    >
      {pages.map((page, i) => {
        const active = activeIndices.includes(i);
        return (
          <motion.li
            key={page.n}
            initial={{ opacity: 0, y: 12 * d }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 * d, delay: Math.min(i * 0.02, 0.4) * d, ease: EASE }}
          >
            <button
              type="button"
              aria-label={`Go to page ${page.n}`}
              aria-current={active ? "page" : undefined}
              onClick={() => onSelect(i)}
              className="group flex w-full cursor-pointer flex-col items-center gap-2 focus-visible:outline-none"
            >
              <span
                className={`block aspect-square w-full overflow-hidden rounded-[3px] shadow-[0_2px_6px_rgb(0_0_0/0.08)] outline-[1.5px] outline-offset-[3px] outline-solid transition-[outline-color,box-shadow] duration-300 group-hover:shadow-[0_6px_14px_rgb(0_0_0/0.14)] ${
                  active ? "outline-dark-text" : "outline-transparent group-focus-visible:outline-dark-text/60"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized static WebP thumbs */}
                <img
                  src={page.thumb}
                  alt=""
                  width={240}
                  height={240}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </span>
              <span
                className={`font-sans text-[13px] tabular-nums ${active ? "font-bold text-dark-text" : "text-dark-text/70"}`}
              >
                {page.n}
              </span>
            </button>
          </motion.li>
        );
      })}
    </ol>
  );

  const closeButton = (
    <button
      type="button"
      aria-label="Close all pages"
      onClick={onClose}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-dark-text transition-colors duration-200 hover:bg-dark-text/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text"
    >
      <CloseIcon />
    </button>
  );

  const onSheetDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > SHEET_CLOSE_OFFSET || info.velocity.y > SHEET_CLOSE_VELOCITY) onClose();
  };

  return (
    <AnimatePresence>
      {open && sheet && (
        <motion.div key="sheet" className="fixed inset-0 z-[1100]">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-dark-text/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 * d }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="All pages"
            drag={reducedMotion ? false : "y"}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onSheetDragEnd}
            initial={{ y: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }}
            transition={{ duration: 0.45 * d, ease: EASE }}
            className="absolute inset-x-0 bottom-0 flex max-h-[82dvh] flex-col rounded-t-2xl bg-brochure-stage shadow-[0_-4px_8px_rgb(0_0_0/0.08)]"
          >
            <div
              className="shrink-0 cursor-grab touch-none px-4 pt-2 active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <span aria-hidden="true" className="mx-auto block h-1 w-10 rounded-full bg-dark-text/20" />
              <div className="flex items-center justify-between py-2">
                <h2 className="font-sans text-[17px] font-medium text-dark-text">All pages</h2>
                <div onPointerDown={(e) => e.stopPropagation()}>{closeButton}</div>
              </div>
            </div>
            {list}
          </motion.div>
        </motion.div>
      )}

      {open && !sheet && (
        <motion.div
          key="grid"
          className="fixed inset-0 z-[1100] flex flex-col bg-brochure-stage/[0.98] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 * d, ease: EASE }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="All pages"
            className="mx-auto flex h-full w-full max-w-[1320px] flex-col px-4 py-6 sm:px-10 sm:py-8"
          >
            <div className="flex items-center justify-between pb-6">
              <h2 className="font-sans text-lg font-medium text-dark-text">All pages</h2>
              {closeButton}
            </div>
            {list}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
