/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GLASS_DEPTH_CARD_SELECTOR = '.ts-glass-card';
export const GLASS_DEPTH_CSS_VAR = '--ts-glass-depth-y';
export const GLASS_DEPTH_ACTIVE_ATTR = 'data-glass-depth-active';

export interface ScrollDepthRect {
  top: number;
  height: number;
}

export interface ScrollDepthConfig {
  /** Maximum vertical offset in pixels (desktop default: 10px, mobile default: 6px). */
  maxOffsetPx?: number;
  /** Previously applied offset on this element so rect measurement never feedback-drifts. */
  previousOffsetPx?: number;
}

export const DESKTOP_MAX_DEPTH_OFFSET_PX = 10;
export const MOBILE_MAX_DEPTH_OFFSET_PX = 6;
const WRITE_EPSILON_PX = 0.15;

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Selects a restrained depth-of-field amplitude scaled to viewport width.
 */
export function resolveMaxDepthOffsetPx(viewportWidth: number): number {
  if (!Number.isFinite(viewportWidth) || viewportWidth < 768) {
    return MOBILE_MAX_DEPTH_OFFSET_PX;
  }
  return DESKTOP_MAX_DEPTH_OFFSET_PX;
}

/**
 * Computes a small, smooth vertical depth-of-field offset (in px) for a `.ts-glass-card`
 * relative to the viewport center:
 * - Below viewport center -> subtle positive Y offset (gently rises into focus).
 * - At viewport center -> 0px (crisp focal plane).
 * - Above viewport center -> subtle negative Y offset (gently recedes upward).
 *
 * Subtracts `previousOffsetPx` from `rect.top` so repeated scroll measurements never
 * feed the applied transform back into the position calculation.
 */
export function computeGlassScrollDepthOffset(
  rect: ScrollDepthRect,
  viewportHeight: number,
  config: ScrollDepthConfig = {}
): number {
  const maxOffsetPx = config.maxOffsetPx ?? DESKTOP_MAX_DEPTH_OFFSET_PX;
  const previousOffsetPx = config.previousOffsetPx ?? 0;

  if (
    !Number.isFinite(rect.top) ||
    !Number.isFinite(rect.height) ||
    !Number.isFinite(viewportHeight) ||
    viewportHeight <= 0 ||
    rect.height <= 0 ||
    maxOffsetPx <= 0
  ) {
    return 0;
  }

  const baseTop = rect.top - previousOffsetPx;
  const baseCenterY = baseTop + rect.height / 2;
  const viewportCenterY = viewportHeight / 2;
  const travelSpan = viewportHeight * 0.65;

  const normalized = clamp((baseCenterY - viewportCenterY) / travelSpan, -1, 1);
  // Subtle cubic-blended curve keeps the focal center serene while giving crisp edge depth
  const eased = normalized * (0.75 + 0.25 * normalized * normalized);
  const offsetPx = eased * maxOffsetPx;

  const rounded = Number(offsetPx.toFixed(2));
  return Object.is(rounded, -0) ? 0 : rounded;
}

/**
 * Returns true if the card's un-shifted vertical bounds intersect the viewport (with margin).
 */
export function isCardNearViewport(
  rect: ScrollDepthRect,
  viewportHeight: number,
  previousOffsetPx: number = 0,
  marginPx: number = 140
): boolean {
  if (viewportHeight <= 0 || rect.height <= 0) return false;
  const baseTop = rect.top - previousOffsetPx;
  const baseBottom = baseTop + rect.height;
  return baseBottom >= -marginPx && baseTop <= viewportHeight + marginPx;
}

export interface GlassScrollDepthListenerOptions {
  targetDocument?: Document | null;
  targetWindow?: Window | null;
  prefersReducedMotion?: () => boolean;
  scheduleFrame?: (cb: () => void) => number;
  cancelFrame?: (id: number) => void;
}

function defaultPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Installs a single rAF-coalesced, two-phase (read-then-write) scroll listener that applies
 * a GPU-accelerated vertical depth-of-field offset via `--ts-glass-depth-y` to all
 * `.ts-glass-card` elements near the viewport.
 *
 * - Zero React re-renders and zero layout thrashing (batched DOM reads before writes).
 * - Composes safely with Framer Motion hover/floating transforms via CSS `translate`.
 * - Respects `prefers-reduced-motion: reduce` and resets cleanly on disposal.
 */
export function installGlassScrollDepthListener(
  options: GlassScrollDepthListenerOptions = {}
): () => void {
  const doc = options.targetDocument ?? (typeof document !== 'undefined' ? document : null);
  const win = options.targetWindow ?? (typeof window !== 'undefined' ? window : null);
  if (!doc || !win) return () => {};

  const checkReducedMotion = options.prefersReducedMotion ?? defaultPrefersReducedMotion;
  const schedule =
    options.scheduleFrame ??
    ((cb: () => void) => win.requestAnimationFrame(cb));
  const cancel =
    options.cancelFrame ??
    ((id: number) => win.cancelAnimationFrame(id));

  const appliedOffsets = new WeakMap<HTMLElement, number>();
  const trackedCards = new Set<HTMLElement>();
  let frameId: number | null = null;
  let scheduled = false;
  let disposed = false;

  const resetCard = (card: HTMLElement) => {
    card.style.removeProperty(GLASS_DEPTH_CSS_VAR);
    card.removeAttribute(GLASS_DEPTH_ACTIVE_ATTR);
    appliedOffsets.delete(card);
    trackedCards.delete(card);
  };

  const resetAllCards = () => {
    trackedCards.forEach((card) => {
      card.style.removeProperty(GLASS_DEPTH_CSS_VAR);
      card.removeAttribute(GLASS_DEPTH_ACTIVE_ATTR);
      appliedOffsets.delete(card);
    });
    trackedCards.clear();
  };

  const updatePositions = () => {
    scheduled = false;
    frameId = null;
    if (disposed) return;

    if (checkReducedMotion()) {
      resetAllCards();
      return;
    }

    const viewportHeight = win.innerHeight;
    const viewportWidth = win.innerWidth;
    if (viewportHeight <= 0) return;

    const maxOffsetPx = resolveMaxDepthOffsetPx(viewportWidth);
    const cards = Array.from(doc.querySelectorAll<HTMLElement>(GLASS_DEPTH_CARD_SELECTOR));

    // Phase 1: Batched geometry reads (zero interleaved writes -> zero layout thrashing)
    const measurements: Array<{
      card: HTMLElement;
      near: boolean;
      prevOffset: number;
      nextOffset: number;
    }> = [];

    for (const card of cards) {
      const prevOffset = appliedOffsets.get(card) ?? 0;
      const rect = card.getBoundingClientRect();
      const near = isCardNearViewport(rect, viewportHeight, prevOffset);
      const nextOffset = near
        ? computeGlassScrollDepthOffset(rect, viewportHeight, {
            maxOffsetPx,
            previousOffsetPx: prevOffset,
          })
        : 0;
      measurements.push({ card, near, prevOffset, nextOffset });
    }

    // Phase 2: Batched style & attribute writes
    for (const { card, near, prevOffset, nextOffset } of measurements) {
      if (!near) {
        if (trackedCards.has(card)) {
          resetCard(card);
        }
        continue;
      }

      if (!trackedCards.has(card)) {
        card.setAttribute(GLASS_DEPTH_ACTIVE_ATTR, 'true');
        trackedCards.add(card);
      }

      if (!appliedOffsets.has(card) || Math.abs(nextOffset - prevOffset) >= WRITE_EPSILON_PX) {
        card.style.setProperty(GLASS_DEPTH_CSS_VAR, `${nextOffset}px`);
        appliedOffsets.set(card, nextOffset);
      }
    }
  };

  const requestUpdate = () => {
    if (disposed || scheduled) return;
    scheduled = true;
    const id = schedule(updatePositions);
    if (scheduled) {
      frameId = id;
    }
  };

  // Re-evaluate automatically when lazy-loaded routes or filter tabs mount new .ts-glass-card nodes
  let observer: MutationObserver | null = null;
  if (typeof MutationObserver !== 'undefined' && doc.body) {
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          requestUpdate();
          break;
        }
      }
    });
    observer.observe(doc.body, { childList: true, subtree: true });
  }

  win.addEventListener('scroll', requestUpdate, { passive: true });
  win.addEventListener('resize', requestUpdate, { passive: true });

  // Initial pass so cards in the initial viewport start on the correct depth plane
  requestUpdate();

  return () => {
    disposed = true;
    if (frameId !== null) {
      cancel(frameId);
      frameId = null;
    }
    win.removeEventListener('scroll', requestUpdate);
    win.removeEventListener('resize', requestUpdate);
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    resetAllCards();
  };
}
