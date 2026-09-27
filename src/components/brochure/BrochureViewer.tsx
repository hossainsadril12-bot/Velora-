"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { BackToHomeLink } from "@/components/BackToHome";
import { BROCHURE_PAGES, BROCHURE_PDF } from "@/lib/brochure";
import FlipBook, { TURN_MS, type FlipBookHandle } from "./FlipBook";
import ViewerControls from "./ViewerControls";
import ThumbnailStrip from "./ThumbnailStrip";
import GridOverlay from "./GridOverlay";
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon } from "./icons";
import { pageLabel, visibleIndices, type Orientation } from "./pageMath";

const PAGES = BROCHURE_PAGES;
const TOTAL = PAGES.length;
const ZOOM_STEPS = [1, 1.5, 2, 3];
const EASE = [0.16, 1, 0.3, 1] as const;
/** Matches the page-turn curve in flipMotion so the book glides with the sheet. */
const TURN_EASE = [0.45, 0.05, 0.2, 1] as const;
/** A spread narrower than this switches the book to single-page mode. */
const MIN_SPREAD_WIDTH = 640;

type Size = { width: number; height: number };

function fitBook(stage: Size, reserveX: number): Size {
  const availW = Math.max(0, stage.width - reserveX);
  const availH = Math.max(0, stage.height);
  const spreadW = Math.floor(Math.min(availW, availH * 2));
  if (spreadW >= MIN_SPREAD_WIDTH) return { width: spreadW, height: Math.floor(spreadW / 2) };
  const side = Math.floor(Math.min(stage.width, availH));
  return { width: side, height: side };
}

export default function BrochureViewer() {
  const reducedMotion = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<FlipBookHandle>(null);
  const gridTriggerRef = useRef<HTMLButtonElement>(null);
  const settle = useAnimationControls();

  const [index, setIndex] = useState(0);
  // Where an in-flight turn will land, so the book re-centres during the turn.
  const [turnTarget, setTurnTarget] = useState<number | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState<Size>({ width: 0, height: 0 });
  const [isDesktop, setIsDesktop] = useState(true);
  const [zoomStep, setZoomStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);

  const indices = visibleIndices(index, TOTAL, orientation);
  const label = pageLabel(indices, TOTAL);
  const zoom = ZOOM_STEPS[zoomStep];
  const zoomed = zoom > 1;

  // Measure the stage so the book always fits both dimensions.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      setStage({ width: el.clientWidth, height: el.clientHeight });
      setIsDesktop(window.innerWidth >= 1024);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Desktop arrows sit beside the book; on small screens they overlay it.
  const book = fitBook(stage, isDesktop ? 2 * (56 + 24) : 0);
  const pageW = orientation === "landscape" ? book.width / 2 : book.width;

  // Centre the closed book: a cover occupies one half of the spread box.
  const shiftIndices = turnTarget === null ? indices : visibleIndices(turnTarget, TOTAL, orientation);
  const coverShift =
    orientation === "landscape" && shiftIndices.length === 1
      ? shiftIndices[0] === 0
        ? -pageW / 2
        : pageW / 2
      : 0;

  const handleFlip = useCallback((i: number) => {
    setIndex(i);
    setTurnTarget(null);
    setZoomStep(0);
  }, []);

  const handleTurnStart = useCallback(
    ({ direction }: { direction: "forward" | "back" }) => {
      const step = orientation === "landscape" ? 2 : 1;
      const target = index + (direction === "forward" ? step : -step);
      setTurnTarget(Math.min(Math.max(target, 0), TOTAL - 1));
    },
    [index, orientation],
  );

  // Long jumps (thumbnails, slider, grid) dip the book out and back in
  // rather than snapping to a new spread.
  const handleJump = useCallback(
    async (swap: () => void) => {
      await settle.start({ opacity: 0, scale: 0.985, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } });
      swap();
      await settle.start({ opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } });
    },
    [settle],
  );

  const goTo = useCallback((i: number) => bookRef.current?.goTo(Math.min(Math.max(i, 0), TOTAL - 1)), []);
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
          setZoomStep((s) => Math.min(s + 1, ZOOM_STEPS.length - 1));
          break;
        case "-":
          setZoomStep((s) => Math.max(s - 1, 0));
          break;
        case "Escape":
          if (fallbackFullscreen) setFallbackFullscreen(false);
          else if (zoomed) setZoomStep(0);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gridOpen, fallbackFullscreen, zoomed, next, prev, goTo]);

  const closeGrid = useCallback(() => {
    setGridOpen(false);
    gridTriggerRef.current?.focus();
  }, []);

  const fullscreen = isFullscreen || fallbackFullscreen;
  const atStart = indices[0] === 0;
  const atEnd = indices[indices.length - 1] === TOTAL - 1;
  const panLimitX = ((zoom - 1) * book.width) / 2;
  const panLimitY = ((zoom - 1) * book.height) / 2;

  const arrowClass =
    "absolute top-1/2 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-dark-text shadow-[0_4px_14px_rgb(0_0_0/0.10)] transition-[transform,box-shadow,opacity] duration-300 hover:scale-105 hover:shadow-[0_6px_20px_rgb(0_0_0/0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text active:scale-95 disabled:pointer-events-none disabled:opacity-0 size-11 lg:size-14";

  return (
    <section
      ref={rootRef}
      data-lenis-prevent
      data-ready={ready || undefined}
      aria-label="Velora brochure"
      className={`relative flex flex-col bg-brochure-stage ${
        fallbackFullscreen
          ? "fixed inset-0 z-[1100] h-dvh"
          : isFullscreen
            ? "h-dvh"
            : "h-dvh min-h-[620px] pt-[70px] lg:min-h-[700px] lg:pt-[100px]"
      }`}
    >
      <h1 className="sr-only">Velora Inani brochure</h1>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {indices.length > 1
          ? `Pages ${indices[0] + 1} and ${indices[1] + 1} of ${TOTAL}`
          : `Page ${indices[0] + 1} of ${TOTAL}`}
      </p>

      {/* Top row */}
      <div className="flex w-full items-center justify-between gap-4 px-6 pt-3 lg:px-10 lg:pt-2">
        {fullscreen ? (
          <span />
        ) : (
          <BackToHomeLink />
        )}
        <a
          href={BROCHURE_PDF}
          download="Velora-Inani-Brochure.pdf"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-tan px-4 font-sans text-[15px] font-medium text-white transition-[filter,transform] duration-300 hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan active:scale-[0.98]"
        >
          <DownloadIcon size={18} />
          <span className="whitespace-nowrap">
            Download<span className="max-sm:sr-only"> Brochure</span>
          </span>
        </a>
      </div>

      {/* Stage */}
      <div className="relative min-h-0 w-full flex-1 px-4 py-3 sm:px-6 lg:px-10 lg:py-3">
        <button
          type="button"
          aria-label="Previous page"
          onClick={prev}
          disabled={atStart || !ready}
          className={`${arrowClass} left-2 sm:left-4 lg:left-10`}
        >
          <ArrowLeftIcon size={isDesktop ? 24 : 20} />
        </button>

        <div ref={stageRef} className="flex h-full w-full items-center justify-center overflow-hidden">
          <motion.div
            drag={zoomed}
            dragConstraints={{ left: -panLimitX, right: panLimitX, top: -panLimitY, bottom: panLimitY }}
            dragElastic={0.08}
            dragMomentum={false}
            animate={zoomed ? { scale: zoom } : { scale: 1, x: 0, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
            className={zoomed ? "cursor-grab active:cursor-grabbing" : ""}
            style={{ touchAction: zoomed ? "none" : "pan-y" }}
          >
            <motion.div
              initial={false}
              animate={{ x: coverShift }}
              transition={{ duration: reducedMotion ? 0 : TURN_MS / 1000, ease: TURN_EASE }}
            >
              <motion.div
                animate={settle}
                initial={{ opacity: 0 }}
                // While zoomed, the drag layer owns the pointer; page-flip must not see it.
                style={{ pointerEvents: zoomed ? "none" : "auto" }}
              >
                {book.width > 0 && (
                  <FlipBook
                    ref={bookRef}
                    pages={PAGES}
                    width={book.width}
                    height={book.height}
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

        <button
          type="button"
          aria-label="Next page"
          onClick={next}
          disabled={atEnd || !ready}
          className={`${arrowClass} right-2 sm:right-4 lg:right-10`}
        >
          <ArrowRightIcon size={isDesktop ? 24 : 20} />
        </button>
      </div>

      {/* Controls + thumbnails */}
      <div className="w-full px-6 pb-3 lg:px-10 lg:pb-4">
        <ViewerControls
          index={index}
          total={TOTAL}
          label={label}
          onSeek={goTo}
          canZoomIn={zoomStep < ZOOM_STEPS.length - 1}
          canZoomOut={zoomStep > 0}
          onZoomIn={() => setZoomStep((s) => Math.min(s + 1, ZOOM_STEPS.length - 1))}
          onZoomOut={() => setZoomStep((s) => Math.max(s - 1, 0))}
          isFullscreen={fullscreen}
          onToggleFullscreen={toggleFullscreen}
          onOpenGrid={() => setGridOpen(true)}
          gridTriggerRef={gridTriggerRef}
        />
        <div className="mt-1">
          <ThumbnailStrip pages={PAGES} activeIndices={indices} reducedMotion={reducedMotion} onSelect={goTo} />
        </div>
      </div>

      <GridOverlay
        open={gridOpen}
        pages={PAGES}
        activeIndices={indices}
        reducedMotion={reducedMotion}
        onSelect={(i) => {
          setGridOpen(false);
          goTo(i);
        }}
        onClose={closeGrid}
      />
    </section>
  );
}
