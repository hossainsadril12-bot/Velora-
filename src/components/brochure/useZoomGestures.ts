"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { animate, useMotionValue, type MotionValue } from "framer-motion";

/** Zoom levels the buttons and keyboard step through. Pinch can land anywhere between. */
export const ZOOM_STEPS = [1, 1.5, 2, 3];
const MIN_ZOOM = ZOOM_STEPS[0];
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1];
/** Pinching slightly below 1 gives a soft rubber-band before it settles back. */
const PINCH_FLOOR = 0.9;
/** A pinch released this close to 1 snaps back to the unzoomed book. */
const SNAP_BACK_BELOW = 1.05;
const DOUBLE_TAP_ZOOM = 2;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_RADIUS = 30;
const TAP_MAX_MS = 250;
const TAP_SLOP = 10;
const EASE = [0.16, 1, 0.3, 1] as const;

type Point = { x: number; y: number };
type Size = { width: number; height: number };

export type ZoomGestures = {
  /** Settled zoom level (updates when a gesture or step completes). */
  zoom: number;
  scale: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  canZoomIn: boolean;
  canZoomOut: boolean;
  zoomIn(): void;
  zoomOut(): void;
  reset(): void;
};

type Options = {
  /** Element centred on the zoom layer; gestures are read from it. */
  surfaceRef: RefObject<HTMLElement | null>;
  /** Unscaled size of the zoomed content, for pan limits. */
  size: Size;
  reducedMotion: boolean;
  /** A second finger landed: the page-turn gesture must let go. */
  onPinchStart?(): void;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const mid = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/**
 * Pinch-to-zoom, double-tap zoom and drag-to-pan for the brochure.
 *
 * The zoom layer is transformed as `translate(x, y) scale(scale)` around its
 * centre, so a content point `c` sits on screen at `pan + scale * c`. Keeping
 * the point under the fingers fixed while scaling is what makes a pinch feel
 * anchored rather than drifting towards the middle.
 */
export function useZoomGestures({ surfaceRef, size, reducedMotion, onPinchStart }: Options): ZoomGestures {
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const sizeRef = useRef(size);
  const reducedRef = useRef(reducedMotion);
  const pinchStartRef = useRef(onPinchStart);
  useLayoutEffect(() => {
    sizeRef.current = size;
    reducedRef.current = reducedMotion;
    pinchStartRef.current = onPinchStart;
  });

  const clampPan = useCallback((z: number, p: Point): Point => {
    const { width, height } = sizeRef.current;
    const limX = Math.max(0, ((z - 1) * width) / 2);
    const limY = Math.max(0, ((z - 1) * height) / 2);
    return { x: clamp(p.x, -limX, limX), y: clamp(p.y, -limY, limY) };
  }, []);

  const apply = useCallback(
    (z: number, pan: Point, animated: boolean) => {
      if (animated && !reducedRef.current) {
        const t = { duration: 0.45, ease: EASE };
        animate(scale, z, t);
        animate(x, pan.x, t);
        animate(y, pan.y, t);
      } else {
        scale.set(z);
        x.set(pan.x);
        y.set(pan.y);
      }
    },
    [scale, x, y],
  );

  /** Zoom to `target`, keeping `focal` (relative to the surface centre) in place. */
  const zoomTo = useCallback(
    (target: number, focal: Point = { x: 0, y: 0 }, animated = true) => {
      const z = clamp(target, MIN_ZOOM, MAX_ZOOM);
      const from = scale.get();
      const pan = { x: x.get(), y: y.get() };
      const next = clampPan(z, {
        x: focal.x - ((focal.x - pan.x) * z) / from,
        y: focal.y - ((focal.y - pan.y) * z) / from,
      });
      zoomRef.current = z;
      setZoom(z);
      apply(z, next, animated);
    },
    [apply, clampPan, scale, x, y],
  );

  const zoomIn = useCallback(() => {
    const next = ZOOM_STEPS.find((s) => s > zoomRef.current + 0.01) ?? MAX_ZOOM;
    zoomTo(next);
  }, [zoomTo]);

  const zoomOut = useCallback(() => {
    const prev = [...ZOOM_STEPS].reverse().find((s) => s < zoomRef.current - 0.01) ?? MIN_ZOOM;
    zoomTo(prev);
  }, [zoomTo]);

  const reset = useCallback(() => {
    if (zoomRef.current !== 1 || x.get() !== 0 || y.get() !== 0) zoomTo(1);
  }, [zoomTo, x, y]);

  // Keep the pan inside the new bounds when the book is resized.
  useEffect(() => {
    const pan = clampPan(zoomRef.current, { x: x.get(), y: y.get() });
    x.set(pan.x);
    y.set(pan.y);
  }, [size.width, size.height, clampPan, x, y]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const pointers = new Map<number, Point>();
    let pinch: { d0: number; z0: number; mid0: Point; pan0: Point } | null = null;
    let panGesture: { start: Point; pan0: Point; id: number } | null = null;
    let tap: { id: number; start: Point; time: number; moved: boolean } | null = null;
    let lastTap: { at: Point; time: number } | null = null;
    // While two fingers are down, page-flip must not see the touches.
    let touchLock = false;

    const toFocal = (p: Point): Point => {
      const r = surface.getBoundingClientRect();
      return { x: p.x - (r.left + r.width / 2), y: p.y - (r.top + r.height / 2) };
    };

    const beginPan = (id: number, p: Point) => {
      panGesture = zoomRef.current > 1 ? { id, start: p, pan0: { x: x.get(), y: y.get() } } : null;
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const p = { x: e.clientX, y: e.clientY };
      pointers.set(e.pointerId, p);

      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { d0: dist(a, b) || 1, z0: scale.get(), mid0: toFocal(mid(a, b)), pan0: { x: x.get(), y: y.get() } };
        panGesture = null;
        tap = null;
        pinchStartRef.current?.();
        return;
      }
      if (pointers.size === 1) {
        beginPan(e.pointerId, p);
        tap = e.pointerType === "touch" ? { id: e.pointerId, start: p, time: e.timeStamp, moved: false } : null;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      const p = { x: e.clientX, y: e.clientY };
      pointers.set(e.pointerId, p);
      if (tap && tap.id === e.pointerId && dist(p, tap.start) > TAP_SLOP) tap.moved = true;

      if (pinch && pointers.size >= 2) {
        const [a, b] = [...pointers.values()];
        const z = clamp((pinch.z0 * dist(a, b)) / pinch.d0, PINCH_FLOOR, MAX_ZOOM);
        const m = toFocal(mid(a, b));
        const raw = {
          x: m.x - ((pinch.mid0.x - pinch.pan0.x) * z) / pinch.z0,
          y: m.y - ((pinch.mid0.y - pinch.pan0.y) * z) / pinch.z0,
        };
        const pan = z >= 1 ? clampPan(z, raw) : { x: 0, y: 0 };
        zoomRef.current = z;
        apply(z, pan, false);
        return;
      }

      if (panGesture && panGesture.id === e.pointerId) {
        e.preventDefault();
        apply(
          scale.get(),
          clampPan(scale.get(), {
            x: panGesture.pan0.x + p.x - panGesture.start.x,
            y: panGesture.pan0.y + p.y - panGesture.start.y,
          }),
          false,
        );
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      const p = pointers.get(e.pointerId)!;
      pointers.delete(e.pointerId);

      if (pinch) {
        if (pointers.size < 2) {
          pinch = null;
          const settled = zoomRef.current < SNAP_BACK_BELOW ? 1 : zoomRef.current;
          zoomTo(settled, { x: 0, y: 0 }, true);
          // A finger still down carries on as a pan.
          const [rest] = [...pointers.entries()];
          if (rest) beginPan(rest[0], rest[1]);
        }
        return;
      }

      if (panGesture?.id === e.pointerId) panGesture = null;

      if (e.type === "pointerup" && tap && tap.id === e.pointerId && !tap.moved && e.timeStamp - tap.time < TAP_MAX_MS) {
        if (lastTap && e.timeStamp - lastTap.time < DOUBLE_TAP_MS && dist(p, lastTap.at) < DOUBLE_TAP_RADIUS) {
          lastTap = null;
          if (zoomRef.current > 1) zoomTo(1);
          else zoomTo(DOUBLE_TAP_ZOOM, toFocal(p));
        } else {
          lastTap = { at: p, time: e.timeStamp };
        }
      }
      tap = null;
    };

    const onDoubleClick = (e: MouseEvent) => {
      // Touch double-taps are handled above; this is the mouse equivalent.
      if ((e as PointerEvent).pointerType === "touch") return;
      if (zoomRef.current > 1) zoomTo(1);
      else zoomTo(DOUBLE_TAP_ZOOM, toFocal({ x: e.clientX, y: e.clientY }));
    };

    // page-flip reads raw touch events: hide the second finger from it, and
    // swallow the rest of the gesture so a pinch never turns a page.
    const onTouchStartCapture = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        touchLock = true;
        e.stopPropagation();
      }
    };
    const onTouchMoveCapture = (e: TouchEvent) => {
      if (touchLock) e.stopPropagation();
    };
    const onTouchEndCapture = (e: TouchEvent) => {
      if (!touchLock) return;
      e.stopPropagation();
      if (e.touches.length === 0) touchLock = false;
    };

    surface.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    surface.addEventListener("dblclick", onDoubleClick);
    surface.addEventListener("touchstart", onTouchStartCapture, { capture: true });
    window.addEventListener("touchmove", onTouchMoveCapture, { capture: true });
    window.addEventListener("touchend", onTouchEndCapture, { capture: true });
    window.addEventListener("touchcancel", onTouchEndCapture, { capture: true });
    return () => {
      surface.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      surface.removeEventListener("dblclick", onDoubleClick);
      surface.removeEventListener("touchstart", onTouchStartCapture, { capture: true });
      window.removeEventListener("touchmove", onTouchMoveCapture, { capture: true });
      window.removeEventListener("touchend", onTouchEndCapture, { capture: true });
      window.removeEventListener("touchcancel", onTouchEndCapture, { capture: true });
    };
  }, [surfaceRef, apply, clampPan, zoomTo, scale, x, y]);

  return {
    zoom,
    scale,
    x,
    y,
    canZoomIn: zoom < MAX_ZOOM - 0.01,
    canZoomOut: zoom > MIN_ZOOM + 0.01,
    zoomIn,
    zoomOut,
    reset,
  };
}
