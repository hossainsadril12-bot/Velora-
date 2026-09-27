"use client";

import type { ReactNode } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CollapseIcon,
  ExpandIcon,
  GridIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "./icons";

type MobileControlsProps = {
  label: string;
  atStart: boolean;
  atEnd: boolean;
  onPrev(): void;
  onNext(): void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn(): void;
  onZoomOut(): void;
  isFullscreen: boolean;
  onToggleFullscreen(): void;
  onOpenGrid(): void;
  gridTriggerRef?: React.Ref<HTMLButtonElement>;
};

function BarButton({
  label,
  onClick,
  disabled,
  pressed,
  buttonRef,
  children,
}: {
  label: string;
  onClick(): void;
  disabled?: boolean;
  pressed?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  children: ReactNode;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full text-dark-text transition-[background-color,opacity,transform] duration-200 [touch-action:manipulation] active:scale-95 active:bg-dark-text/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text disabled:cursor-not-allowed disabled:opacity-30 disabled:active:scale-100 disabled:active:bg-transparent"
    >
      {children}
    </button>
  );
}

/** Phone controls: a floating bar with page navigation above the view tools. */
export default function MobileControls({
  label,
  atStart,
  atEnd,
  onPrev,
  onNext,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  isFullscreen,
  onToggleFullscreen,
  onOpenGrid,
  gridTriggerRef,
}: MobileControlsProps) {
  return (
    <div
      role="toolbar"
      aria-label="Brochure controls"
      className="w-full rounded-2xl bg-white/65 px-2 py-1 shadow-[0_4px_8px_rgb(0_0_0/0.06)] backdrop-blur-md"
    >
      <div className="flex items-center justify-between">
        <BarButton label="Previous page" onClick={onPrev} disabled={atStart}>
          <ArrowLeftIcon size={20} />
        </BarButton>
        <p className="font-sans text-[15px] tabular-nums text-dark-text">
          <span className="text-dark-text/65">Page </span>
          <span data-testid="page-counter">{label}</span>
        </p>
        <BarButton label="Next page" onClick={onNext} disabled={atEnd}>
          <ArrowRightIcon size={20} />
        </BarButton>
      </div>
      <div className="flex items-center justify-around border-t border-dark-text/[0.08]">
        <BarButton label="Zoom out" onClick={onZoomOut} disabled={!canZoomOut}>
          <ZoomOutIcon size={20} />
        </BarButton>
        <BarButton
          label={isFullscreen ? "Exit full screen" : "Full screen"}
          onClick={onToggleFullscreen}
          pressed={isFullscreen}
        >
          {isFullscreen ? <CollapseIcon size={20} /> : <ExpandIcon size={20} />}
        </BarButton>
        <BarButton label="Zoom in" onClick={onZoomIn} disabled={!canZoomIn}>
          <ZoomInIcon size={20} />
        </BarButton>
        <BarButton label="Show all pages" onClick={onOpenGrid} buttonRef={gridTriggerRef}>
          <GridIcon size={20} />
        </BarButton>
      </div>
    </div>
  );
}
