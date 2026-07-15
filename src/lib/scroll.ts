/**
 * Smooth scroll utility with custom duration and easing.
 * Uses Lenis if available, otherwise falls back to a custom requestAnimationFrame loop.
 */

/** Cubic ease-in-out easing function */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Set of owners currently requesting a scroll lock. Scroll is locked while any
 * owner holds a lock and released only when the last one lets go.
 *
 * Why owner-scoped instead of a single boolean: multiple components lock scroll
 * independently (the intro in HeroSection, the nav menu in Header, the booking
 * modal). A shared boolean is last-writer-wins, so a component mounting with its
 * own lock closed (e.g. BookingModal calling lockScroll(false) on mount) would
 * clobber an unrelated active lock like the intro's. Ref-counting by owner keeps
 * each owner's intent isolated.
 */
const lockOwners = new Set<string>();

/** Whether scroll is currently meant to be locked (survives Lenis mount timing). */
export function isScrollLocked(): boolean {
  return lockOwners.size > 0;
}

/**
 * Lock or unlock page scroll for a named owner. MUST be used instead of toggling
 * `document.body.style.overflow` directly.
 *
 * Scroll is driven by Lenis (see SmoothScroll.tsx). Setting body
 * `overflow:hidden` does NOT stop Lenis, and worse, it makes Lenis cache a
 * scroll-height of ~0. When overflow is later restored, Lenis keeps that stale
 * height and goes on preventing wheel/touch — leaving the whole page frozen
 * until the next resize. So we stop/start Lenis alongside the overflow flag and
 * force a dimension recalc on unlock.
 *
 * @param owner distinct key per lock source ("intro", "menu", "booking", ...).
 *   Each source must pass the same key to lock and unlock so releases don't
 *   affect other owners.
 */
export function lockScroll(locked: boolean, owner: string = "default"): void {
  if (typeof document === "undefined") return;

  if (locked) lockOwners.add(owner);
  else lockOwners.delete(owner);

  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;

  if (lockOwners.size > 0) {
    document.body.style.overflow = "hidden";
    lenis?.stop();
  } else {
    document.body.style.overflow = "";
    lenis?.start();
    lenis?.resize();
  }
}

/**
 * Smoothly scrolls the page to a target Y position.
 */
export function smoothScrollTo(targetY: number, duration = 2200): void {
  // If Lenis is available globally, use its scrollTo
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(targetY, { duration: duration / 1000, easing: easeInOutCubic });
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Smoothly scrolls to a DOM element by its ID.
 * Waits until:
 *   1. The element exists in the DOM
 *   2. document.body.style.overflow is not "hidden" (intro animation unlocked)
 *
 * Retries every 150ms for up to maxWaitMs milliseconds.
 */
export function smoothScrollToId(
  id: string,
  duration = 2200,
  headerOffset = 80,
  maxWaitMs = 8000
): void {
  const startWait = Date.now();

  function attempt() {
    const el = document.getElementById(id);
    const isLocked = document.body.style.overflow === 'hidden';

    if (el && !isLocked) {
      if (typeof window !== "undefined" && window.__lenis) {
         requestAnimationFrame(() => {
           window.__lenis?.resize();
           window.__lenis?.scrollTo(el, { duration: duration / 1000, offset: -headerOffset, easing: easeInOutCubic });
         });
         return;
      }

      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - headerOffset;
      smoothScrollTo(Math.max(0, targetY), duration);
      return;
    }

    if (Date.now() - startWait < maxWaitMs) {
      setTimeout(attempt, 150);
    }
  }

  attempt();
}
