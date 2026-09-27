"use client";

import type { ReactNode } from "react";
import { CollapseIcon, ExpandIcon, GridIcon, ZoomInIcon, ZoomOutIcon } from "./icons";

type ViewerControlsProps = {
  index: number;
  total: number;
  label: string;
  onSeek(index: number): void;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onZoomIn(): void;
  onZoomOut(): void;
  isFullscreen: boolean;
  onToggleFullscreen(): void;
  onOpenGrid(): void;
  gridTriggerRef?: React.Ref<HTMLButtonElement>;
};

function ToolButton({
  label,
  onClick,
  disabled,
  children,
  buttonRef,
  pressed,
}: {
  label: string;
  onClick(): void;
  disabled?: boolean;
  children: ReactNode;
  buttonRef?: React.Ref<HTMLButtonElement>;
  pressed?: boolean;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-dark-text transition-[background-color,opacity] duration-200 hover:bg-dark-text/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-text disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

export default function ViewerControls({
  index,
  total,
  label,
  onSeek,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  isFullscreen,
  onToggleFullscreen,
  onOpenGrid,
  gridTriggerRef,
}: ViewerControlsProps) {
  const progress = total > 1 ? (index / (total - 1)) * 100 : 0;

  return (
    <div className="flex flex-wrap items-center gap-x-4 sm:flex-nowrap sm:gap-x-6">
      <span
        data-testid="page-counter"
        className="min-w-[4.5rem] font-sans text-[14px] tabular-nums text-dark-text"
      >
        {label}
      </span>

      <input
        type="range"
        aria-label="Page"
        aria-valuetext={label}
        min={0}
        max={total - 1}
        step={1}
        value={index}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="brochure-range order-last w-full min-w-0 sm:order-none sm:w-auto sm:flex-1"
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
      />

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:ml-0 sm:gap-3">
        <ToolButton label="Zoom in" onClick={onZoomIn} disabled={!canZoomIn}>
          <ZoomInIcon />
        </ToolButton>
        <ToolButton label="Zoom out" onClick={onZoomOut} disabled={!canZoomOut}>
          <ZoomOutIcon />
        </ToolButton>
        <ToolButton
          label={isFullscreen ? "Exit full screen" : "Full screen"}
          onClick={onToggleFullscreen}
          pressed={isFullscreen}
        >
          {isFullscreen ? <CollapseIcon /> : <ExpandIcon />}
        </ToolButton>
        <ToolButton label="Show all pages" onClick={onOpenGrid} buttonRef={gridTriggerRef}>
          <GridIcon />
        </ToolButton>
      </div>
    </div>
  );
}
