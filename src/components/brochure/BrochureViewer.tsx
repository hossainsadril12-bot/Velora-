"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import { BROCHURE_PAGES, BROCHURE_PDF } from "@/lib/brochure";
import FlipBook, { type FlipBookHandle } from "./FlipBook";
import ViewerControls from "./ViewerControls";
import ThumbnailStrip from "./ThumbnailStrip";
import GridOverlay from "./GridOverlay";
import { ArrowLeftIcon, ArrowRightIcon, DownloadIcon } from "./icons";
import { pageLabel, visibleIndices, type Orientation } from "./pageMath";

const PAGES = BROCHURE_PAGES;
const TOTAL = PAGES.length;
const ZOOM_STEPS = [1, 1.5, 2, 3];
const EASE = [0.16, 1, 0.3, 1] as const;
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
  const book = fitBook(stage, isDesktop ? 2 * (64 + 40) : 0);
  const pageW = orientation === "landscape" ? book.width / 2 : book.width;

  // Centre the closed book: a cover occupies one half of the spread box.
  const coverShift =
    orientation === "landscape" && indices.length === 1
      ? indices[0] === 0
        ? -pageW / 2
        : pageW / 2
      : 0;

  const handleFlip = useCallback(
    (i: number) => {
      setIndex(i);
      setZoomStep(0);
      if (!reducedMotion) {
        settle.start({
          opacity: [0.9, 1],
          filter: ["blur(1.2px)", "blur(0px)"],
          transition: { duration: 0.55, ease: EASE },
        });
      }
    },
    [reducedMotion, settle],
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
    "absolute top-1/2 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-dark-text shadow-[0_4px_14px_rgb(0_0_0/0.10)] transition-[transform,box-shadow,opacity] duration-300 hover:scale-105 hover:shadow-[0_6px_20px_rgb(0_0_0/0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text active:scale-95 disabled:pointer-events-none disabled:opacity-0 size-11 lg:size-16";

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
            : "h-dvh min-h-[680px] pt-[70px] lg:min-h-[760px] lg:pt-[100px]"
      }`}
    >
      <h1 className="sr-only">Velora Inani brochure</h1>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {indices.length > 1
          ? `Pages ${indices[0] + 1} and ${indices[1] + 1} of ${TOTAL}`
          : `Page ${indices[0] + 1} of ${TOTAL}`}
      </p>

      {/* Top row */}
      <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between gap-4 px-4 pt-4 sm:px-8 lg:px-[60px] lg:pt-5">
        {fullscreen ? (
          <span />
        ) : (
          <TransitionLink
            href="/"
            direction="backward"
            className="group inline-flex min-h-11 items-center gap-2 font-sans text-[15px] text-dark-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-text"
          >
            <ArrowLeftIcon size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="relative whitespace-nowrap">
              <span className="sm:hidden">Back</span>
              <span className="hidden sm:inline">Back to Home</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </span>
          </TransitionLink>
        )}
        <a
          href={BROCHURE_PDF}
          download="Velora-Inani-Brochure.pdf"
          className="inline-flex h-12 items-center gap-3 rounded-lg bg-tan px-5 font-sans text-[15px] font-medium text-white transition-[filter,transform] duration-300 hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan active:scale-[0.98] sm:h-[50px] sm:px-6"
        >
          <DownloadIcon size={20} />
          <span className="whitespace-nowrap">
            Download<span className="max-sm:sr-only"> Brochure</span>
          </span>
        </a>
      </div>

      {/* Stage */}
      <div className="relative mx-auto min-h-0 w-full max-w-[1520px] flex-1 px-4 py-4 sm:px-8 lg:px-[60px] lg:py-5">
        <button
          type="button"
          aria-label="Previous page"
          onClick={prev}
          disabled={atStart || !ready}
          className={`${arrowClass} left-2 sm:left-4 lg:left-[60px]`}
        >
          <ArrowLeftIcon size={isDesktop ? 26 : 20} />
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
              transition={{ duration: reducedMotion ? 0 : 0.7, ease: EASE }}
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
          className={`${arrowClass} right-2 sm:right-4 lg:right-[60px]`}
        >
          <ArrowRightIcon size={isDesktop ? 26 : 20} />
        </button>
      </div>

      {/* Controls + thumbnails */}
      <div className="mx-auto w-full max-w-[1520px] px-4 pb-4 sm:px-8 lg:px-[60px] lg:pb-6">
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
        <div className="mt-2 pr-14 sm:pr-20 lg:mt-3">
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
