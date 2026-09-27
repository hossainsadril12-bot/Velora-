import type { PageFlip } from "page-flip";

/**
 * page-flip plays every turn on a linear clock along a straight corner path,
 * which reads as mechanical. This swaps in an eased, arced path: the corner
 * lifts off the page, sweeps over the spine and lands softly, the way a hand
 * turns heavy stock.
 *
 * It hooks two internals of page-flip@2.0.7 (`flipController.animateFlippingTo`
 * and `render.startAnimation`). If a future version renames them, the patch
 * turns itself off and the library's own animation runs unchanged.
 */

type Point = { x: number; y: number };
type Frame = () => void;
type PageRect = { height: number; pageWidth: number };

type FlipInternals = {
  animateFlippingTo(start: Point, dest: Point, isTurned: boolean, needReset?: boolean): void;
  do(p: Point): void;
  getCalculation(): { getDirection(): number } | null;
  getState(): string;
};

type RenderInternals = {
  startAnimation(frames: Frame[], duration: number, onEnd: () => void): void;
  getRect(): PageRect;
};

export type TurnStart = { direction: "forward" | "back" };

export type FlipMotionOptions = {
  /** Duration of a full programmatic turn (arrow, key, thumbnail). */
  turnMs: number;
  onTurnStart?(turn: TurnStart): void;
};

/** Cubic-bezier easing, solved with Newton's method (same model as CSS). */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      const d = slopeX(t);
      if (Math.abs(err) < 1e-5 || Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sampleY(Math.min(Math.max(t, 0), 1));
  };
}

// Lift gently, travel with intent over the spine, then settle without a snap.
const easeTurn = bezier(0.45, 0.05, 0.2, 1);
// After a drag the page is already moving: continue, then ease into rest.
const easeRelease = bezier(0.22, 0.8, 0.3, 1);

const FRAMES_PER_SECOND = 120;

export function installFlipMotion(book: PageFlip, options: FlipMotionOptions): void {
  const internals = book as unknown as { getFlipController?(): unknown; getRender?(): unknown };
  const flip = internals.getFlipController?.() as FlipInternals | undefined;
  const render = internals.getRender?.() as RenderInternals | undefined;
  if (
    !flip ||
    !render ||
    typeof flip.animateFlippingTo !== "function" ||
    typeof flip.do !== "function" ||
    typeof flip.getState !== "function" ||
    typeof render.startAnimation !== "function" ||
    typeof render.getRect !== "function"
  ) {
    return;
  }

  let pending: { start: Point; dest: Point; isTurned: boolean } | null = null;

  const animateFlippingTo = flip.animateFlippingTo.bind(flip);
  flip.animateFlippingTo = (start, dest, isTurned, needReset = true) => {
    pending = { start, dest, isTurned };
    if (isTurned) {
      const direction = flip.getCalculation()?.getDirection() === 1 ? "back" : "forward";
      options.onTurnStart?.({ direction });
    }
    try {
      animateFlippingTo(start, dest, isTurned, needReset);
    } finally {
      pending = null;
    }
  };

  const startAnimation = render.startAnimation.bind(render);
  render.startAnimation = (frames, duration, onEnd) => {
    const move = pending;
    // Only restyle real turns and drag releases. Hover-corner curls (state
    // "fold_corner", or "read" as the curl drops back) must stay quick: the
    // pointer drives the corner directly between frames, and a slow animation
    // fights it, so the corner lags and flickers.
    if (!move || !(move.isTurned || flip.getState() === "user_fold")) {
      return startAnimation(frames, duration, onEnd);
    }

    const rect = render.getRect();
    // A button/key turn starts from the library's fixed corner point; anything
    // else is the page being let go after a drag.
    const programmatic =
      move.isTurned && Math.abs(move.start.x - (rect.pageWidth - rect.height / 10)) < 1;

    const ms = programmatic ? options.turnMs : Math.max(duration, 320) * 1.15;
    const ease = programmatic ? easeTurn : easeRelease;

    // Arc toward the vertical centre so the sheet bows up as it crosses.
    const lift = programmatic ? rect.height * 0.2 : rect.height * 0.06;
    const sign = move.start.y > rect.height / 2 ? -1 : 1;
    const control = {
      x: (move.start.x + move.dest.x) / 2,
      y: (move.start.y + move.dest.y) / 2 + sign * lift,
    };

    const count = Math.max(24, Math.round((ms / 1000) * FRAMES_PER_SECOND));
    const eased: Frame[] = [];
    for (let i = 1; i <= count; i++) {
      const t = ease(i / count);
      const u = 1 - t;
      const p = {
        x: u * u * move.start.x + 2 * u * t * control.x + t * t * move.dest.x,
        y: u * u * move.start.y + 2 * u * t * control.y + t * t * move.dest.y,
      };
      eased.push(() => flip.do(p));
    }
    startAnimation(eased, ms, onEnd);
  };
}
