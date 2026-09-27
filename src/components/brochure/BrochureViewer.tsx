"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { BackToHomeLink } from "@/components/BackToHome";
import { useBooking } from "@/components/BookingProvider";
import { BROCHURE_PAGES, BROCHURE_PDF } from "@/lib/brochure";
import FlipBook, { TURN_MS, type FlipBookHandle } from "./FlipBook";
import ViewerControls from "./ViewerControls";
import ThumbnailStrip from "./ThumbnailStrip";
import GridOverlay from "./GridOverlay";
import MobileControls from "./MobileControls";
import BrochureActions from "./BrochureActions";
import BrochureLoader from "./BrochureLoader";
import { useZoomGestures } from "./useZoomGestures";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, DownloadIcon } from "./icons";
import { pageLabel, visibleIndices, type Orientation } from "./pageMath";

const PAGES = BROCHURE_PAGES;
const TOTAL = PAGES.length;
const EASE = [0.16, 1, 0.3, 1] as const;
/** Matches the page-turn curve in flipMotion so the book glides with the sheet. */
const TURN_EASE = [0.45, 0.05, 0.2, 1] as const;
/** A spread narrower than this switches the book to single-page mode. */
const MIN_SPREAD_WIDTH = 640;
/**
 * A spread is only worth it while its pages stay nearly as large as a lone
 * page would be. Tall boxes (tablet portrait) fail this and read one page at a time.
 */
const SPREAD_MIN_RATIO = 0.75;
/** Pages decoded before the loader lifts. */
const PRELOAD_PAGES = 3;

type Size = { width: number; height: number };
type Book = Size & { single: boolean };
/** Mirrors the Tailwind md (768) and lg (1024) breakpoints. */
type Viewport = "mobile" | "tablet" | "desktop";

function viewportFor(width: number): Viewport {
  return width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
}

function fitBook(stage: Size, reserveX: number): Book {
  const availW = Math.max(0, stage.width - reserveX);
  const availH = Math.max(0, stage.height);
  const spreadW = Math.floor(Math.min(availW, availH * 2));
  const side = Math.floor(Math.min(stage.width, availH));
  if (spreadW >= MIN_SPREAD_WIDTH && spreadW / 2 >= side * SPREAD_MIN_RATIO) {
    return { width: spreadW, height: Math.floor(spreadW / 2), single: false };
  }
  return { width: side, height: side, single: true };
}

export default function BrochureViewer() {
  const reducedMotion = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<FlipBookHandle>(null);
  const gridTriggerRef = useRef<HTMLButtonElement>(null);
  const settle = useAnimationControls();
  const { openBooking } = useBooking();

  const [index, setIndex] = useState(0);
  // Where an in-flight turn will land, so the book re-centres during the turn.
  const [turnTarget, setTurnTarget] = useState<number | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState<Size>({ width: 0, height: 0 });
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);

  const indices = visibleIndices(index, TOTAL, orientation);
  const label = pageLabel(indices, TOTAL);
  const isDesktop = viewport === "desktop";
  const isMobile = viewport === "mobile";

  // Measure the stage so the book always fits both dimensions.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      setStage({ width: el.clientWidth, height: el.clientHeight });
      setViewport(viewportFor(window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Desktop arrows sit beside the book; on small screens they overlay it.
  const book = fitBook(stage, isDesktop ? 2 * (56 + 24) : 0);
  const pageW = orientation === "landscape" ? book.width / 2 : book.width;

  const zoomState = useZoomGestures({
    surfaceRef: stageRef,
    size: book,
    reducedMotion,
    onPinchStart: () => bookRef.current?.cancelTouch(),
  });
  const { zoom, zoomIn, zoomOut } = zoomState;
  const resetZoom = zoomState.reset;
  const zoomed = zoom > 1;

  // Decode the opening pages up front so the book appears fully painted.
  useEffect(() => {
    let cancelled = false;
    PAGES.slice(0, PRELOAD_PAGES).forEach((page) => {
      const img = new Image();
      const done = () => {
        if (!cancelled) setPagesLoaded((n) => n + 1);
      };
      img.onload = done;
      img.onerror = done;
      img.src = page.src;
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const loadProgress = (Math.min(pagesLoaded, PRELOAD_PAGES) + (ready ? 1 : 0)) / (PRELOAD_PAGES + 1);
  const loaded = loadProgress >= 1;

  // Centre the closed book: a cover occupies one half of the spread box.
  const shiftIndices = turnTarget === null ? indices : visibleIndices(turnTarget, TOTAL, orientation);
  const coverShift =
    orientation === "landscape" && shiftIndices.length === 1
      ? shiftIndices[0] === 0
        ? -pageW / 2
        : pageW / 2
      : 0;

  const handleFlip = useCallback(
    (i: number) => {
      setIndex(i);
      setTurnTarget(null);
      resetZoom();
    },
    [resetZoom],
  );

  const handleTurnStart = useCallback(
    ({ direction }: { direction: "forward" | "back" }) => {
      const step = orientation === "landscape" ? 2 : 1;
      const target = index + (direction === "forward" ? step : -step);
      setTurnTarget(Math.min(Math.max(target, 0), TOTAL - 1));
    },
    [index, orientation],
  );

  // Long jumps (thumbnails, slider, grid) fade and slide the book towards the
  // direction of travel rather than snapping to a new spread.
  const jumpDir = useRef(1);
  const handleJump = useCallback(
    async (swap: () => void) => {
      const dir = jumpDir.current;
      await settle.start({ opacity: 0, x: -24 * dir, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } });
      swap();
      settle.set({ x: 24 * dir });
      await settle.start({ opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } });
    },
    [settle],
  );

  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  const goTo = useCallback((i: number) => {
    const target = Math.min(Math.max(i, 0), TOTAL - 1);
    jumpDir.current = target >= indexRef.current ? 1 : -1;
    bookRef.current?.goTo(target);
  }, []);

  // The slider reports a spread by its left page, so stepping it by one can
  // land on the right page of the spread already open, which page-flip treats
  // as "already here". Step past the open spread in the direction of travel.
  const orientationRef = useRef(orientation);
  useEffect(() => {
    orientationRef.current = orientation;
  }, [orientation]);
  const seek = useCallback(
    (i: number) => {
      const current = indexRef.current;
      const open = visibleIndices(current, TOTAL, orientationRef.current);
      if (i !== current && open.includes(i)) {
        goTo(i > current ? open[open.length - 1] + 1 : open[0] - 1);
      } else {
        goTo(i);
      }
    },
    [goTo],
  );
  const next = useCallback(() => bookRef.current?.next(), []);
  const prev = useCallback(() => bookRef.current?.prev(), []);

  // Fullscreen: native API, or a fixed overlay where it is unavailable (iOS Safari).
  const toggleFullscreen = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (fallbackFullscreen) {
      setFallbackFullscreen(false);
    } else if (root.requestFullscreen && document.fullscreenEnabled) {
      root.requestFullscreen().catch(() => setFallbackFullscreen(true));
    } else {
      setFallbackFullscreen(true);
    }
  }, [fallbackFullscreen]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Keyboard navigation (range input and grid handle their own keys).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gridOpen || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(TOTAL - 1);
          break;
        case "+":
        case "=":
          zoomIn();
          break;
        case "-":
          zoomOut();
          break;
        case "Escape":
          if (fallbackFullscreen) setFallbackFullscreen(false);
          else if (zoomed) resetZoom();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gridOpen, fallbackFullscreen, zoomed, next, prev, goTo, zoomIn, zoomOut, resetZoom]);

  const closeGrid = useCallback(() => {
    setGridOpen(false);
    gridTriggerRef.current?.focus();
  }, []);

  const fullscreen = isFullscreen || fallbackFullscreen;
  const atStart = indices[0] === 0;
  const atEnd = indices[indices.length - 1] === TOTAL - 1;
  const openGrid = useCallback(() => setGridOpen(true), []);

  const arrowClass =
    "absolute top-1/2 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-dark-text shadow-[0_4px_14px_rgb(0_0_0/0.10)] transition-[transform,box-shadow,opacity] duration-300 hover:scale-105 hover:shadow-[0_6px_20px_rgb(0_0_0/0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text active:scale-95 disabled:pointer-events-none disabled:opacity-0 size-11 lg:size-14";

  return (
    <section
      ref={rootRef}
      data-lenis-prevent
      data-ready={loaded || undefined}
      aria-label="Velora brochure"
      aria-busy={!loaded}
      className={`relative flex flex-col bg-brochure-stage ${
        fallbackFullscreen
          ? "fixed inset-0 z-[1100] h-dvh"
          : isFullscreen
            ? "h-dvh"
            : "h-dvh min-h-[560px] pt-[70px] md:min-h-[620px] lg:min-h-[700px] lg:pt-[100px]"
      }`}
    >
      <h1 className="sr-only">Velora Inani brochure</h1>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {indices.length > 1
          ? `Pages ${indices[0] + 1} and ${indices[1] + 1} of ${TOTAL}`
          : `Page ${indices[0] + 1} of ${TOTAL}`}
      </p>

      {/* Top row */}
      <div className="flex w-full items-center justify-between gap-4 px-6 pt-9 lg:px-10">
        {fullscreen ? <span /> : <BackToHomeLink />}
        {isMobile ? (
          <BrochureActions onOpenGrid={openGrid} />
        ) : (
          <a
            href={BROCHURE_PDF}
            download="Velora-Inani-Brochure.pdf"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-tan px-4 font-sans text-[15px] font-medium text-white transition-[filter,transform] duration-300 hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan active:scale-[0.98]"
          >
            <DownloadIcon size={18} />
            <span className="whitespace-nowrap">
              Download<span className="max-lg:sr-only"> Brochure</span>
            </span>
          </a>
        )}
      </div>

      {/* Stage */}
      <div className="relative min-h-0 w-full flex-1 px-4 py-3 sm:px-6 lg:px-10 lg:py-3">
        {!isMobile && (
          <button
            type="button"
            aria-label="Previous page"
            onClick={prev}
            disabled={atStart || !ready}
            className={`${arrowClass} left-4 lg:left-10`}
          >
            <ArrowLeftIcon size={isDesktop ? 24 : 20} />
          </button>
        )}

        <div
          ref={stageRef}
          className={`flex h-full w-full items-center justify-center overflow-hidden ${
            zoomed ? "cursor-grab active:cursor-grabbing" : ""
          }`}
          style={{ touchAction: "none" }}
        >
          <motion.div style={{ scale: zoomState.scale, x: zoomState.x, y: zoomState.y }}>
            <motion.div
              initial={false}
              animate={{ x: coverShift }}
              transition={{ duration: reducedMotion ? 0 : TURN_MS / 1000, ease: TURN_EASE }}
            >
              <motion.div
                animate={settle}
                initial={{ opacity: 0 }}
                // While zoomed, the pan gesture owns the pointer; page-flip must not see it.
                style={{ pointerEvents: zoomed ? "none" : "auto" }}
              >
                {book.width > 0 && (
                  <FlipBook
                    ref={bookRef}
                    pages={PAGES}
                    width={book.width}
                    height={book.height}
                    singlePage={book.single}
                    reducedMotion={reducedMotion}
                    onFlip={handleFlip}
                    onOrientation={setOrientation}
                    onTurnStart={handleTurnStart}
                    onJump={handleJump}
                    onReady={() => {
                      setReady(true);
                      settle.start({ opacity: 1, transition: { duration: reducedMotion ? 0 : 0.8, ease: EASE } });
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {!isMobile && (
          <button
            type="button"
            aria-label="Next page"
            onClick={next}
            disabled={atEnd || !ready}
            className={`${arrowClass} right-4 lg:right-10`}
          >
            <ArrowRightIcon size={isDesktop ? 24 : 20} />
          </button>
        )}
      </div>

      {/* Controls */}
      {isMobile ? (
        <div className="w-full px-4 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-sm flex-col items-center gap-2.5">
            {!fullscreen && (
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-tan px-6 font-sans text-[15px] font-medium text-white shadow-[0_4px_8px_rgb(0_0_0/0.08)] transition-[filter,transform] duration-300 [touch-action:manipulation] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text"
              >
                <CalendarIcon size={18} />
                Book Appointment
              </button>
            )}
            <MobileControls
              label={label}
              atStart={atStart || !ready}
              atEnd={atEnd || !ready}
              onPrev={prev}
              onNext={next}
              canZoomIn={zoomState.canZoomIn}
              canZoomOut={zoomState.canZoomOut}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              isFullscreen={fullscreen}
              onToggleFullscreen={toggleFullscreen}
              onOpenGrid={openGrid}
              gridTriggerRef={gridTriggerRef}
            />
          </div>
        </div>
      ) : (
        <div className="w-full px-6 pb-3 lg:px-10 lg:pb-4">
          <ViewerControls
            index={index}
            total={TOTAL}
            label={label}
            onSeek={seek}
            canZoomIn={zoomState.canZoomIn}
            canZoomOut={zoomState.canZoomOut}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            isFullscreen={fullscreen}
            onToggleFullscreen={toggleFullscreen}
            onOpenGrid={openGrid}
            gridTriggerRef={gridTriggerRef}
          />
          <div className="mt-1">
            <ThumbnailStrip pages={PAGES} activeIndices={indices} reducedMotion={reducedMotion} onSelect={goTo} />
          </div>
        </div>
      )}

      <BrochureLoader progress={loadProgress} done={loaded} reducedMotion={reducedMotion} />

      <GridOverlay
        open={gridOpen}
        pages={PAGES}
        activeIndices={indices}
        reducedMotion={reducedMotion}
        variant={isMobile ? "sheet" : "full"}
        onSelect={(i) => {
          closeGrid();
          goTo(i);
        }}
        onClose={closeGrid}
      />
    </section>
  );
}
