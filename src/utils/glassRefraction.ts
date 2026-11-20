/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GLASS_CARD_SELECTOR = '.ts-glass-card';
export const REFRACTION_SHEEN_CSS_VAR = '--ts-refraction-sheen-opacity';

export interface RefractionRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface RefractionSheenConfig {
  minOpacity?: number;
  maxOpacity?: number;
  falloffPower?: number;
}

const DEFAULT_MIN_OPACITY = 0.16;
const DEFAULT_MAX_OPACITY = 1;
const DEFAULT_FALLOFF_POWER = 1.65;
const WRITE_EPSILON = 0.012;

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Computes the dynamic opacity for the top-right corner refraction-sheen pseudo-element
 * based on pointer proximity to the card's top-right corner (1, 0).
 *
 * Returns a rounded value in [minOpacity, maxOpacity]:
 * - Approaches `maxOpacity` as the pointer nears the top-right bevel.
 * - Smoothly eases down toward `minOpacity` as the pointer moves toward the bottom-left corner.
 */
export function computeRefractionSheenOpacity(
  pointerX: number,
  pointerY: number,
  rect: RefractionRect,
  config: RefractionSheenConfig = {}
): number {
  const minOpacity = config.minOpacity ?? DEFAULT_MIN_OPACITY;
  const maxOpacity = config.maxOpacity ?? DEFAULT_MAX_OPACITY;
  const falloffPower = config.falloffPower ?? DEFAULT_FALLOFF_POWER;

  if (
    !Number.isFinite(pointerX) ||
    !Number.isFinite(pointerY) ||
    rect.width <= 0 ||
    rect.height <= 0
  ) {
    return Number(minOpacity.toFixed(3));
  }

  const nx = clamp((pointerX - rect.left) / rect.width, 0, 1);
  const ny = clamp((pointerY - rect.top) / rect.height, 0, 1);

  // Distance from top-right corner (1, 0), normalized by unit square diagonal sqrt(2)
  const normalizedDistance = Math.hypot(1 - nx, ny) / Math.SQRT2;
  const proximity = Math.pow(clamp(1 - normalizedDistance, 0, 1), falloffPower);
  const opacity = minOpacity + (maxOpacity - minOpacity) * proximity;

  return Number(clamp(opacity, minOpacity, maxOpacity).toFixed(3));
}

export interface GlassRefractionListenerOptions {
  targetDocument?: Document | null;
  prefersReducedMotion?: () => boolean;
}

function defaultPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Installs a single delegated pointer-move listener for all `.ts-glass-card` elements.
 * Dynamically updates `--ts-refraction-sheen-opacity` on the hovered card with zero
 * React re-renders, ignoring touch pointers and honoring `prefers-reduced-motion`.
 */
export function installGlassRefractionListener(
  options: GlassRefractionListenerOptions = {}
): () => void {
  const doc = options.targetDocument ?? (typeof document !== 'undefined' ? document : null);
  if (!doc) return () => {};

  const checkReducedMotion = options.prefersReducedMotion ?? defaultPrefersReducedMotion;

  let activeCard: HTMLElement | null = null;
  let lastOpacity: number | null = null;

  const resetActiveCard = () => {
    if (activeCard) {
      activeCard.style.removeProperty(REFRACTION_SHEEN_CSS_VAR);
      activeCard = null;
      lastOpacity = null;
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || checkReducedMotion()) {
      resetActiveCard();
      return;
    }

    const rawTarget = event.target as { closest?: (selector: string) => Element | null } | null;
    const card =
      rawTarget && typeof rawTarget.closest === 'function'
        ? (rawTarget.closest(GLASS_CARD_SELECTOR) as HTMLElement | null)
        : null;

    if (!card) {
      resetActiveCard();
      return;
    }

    if (activeCard && activeCard !== card) {
      activeCard.style.removeProperty(REFRACTION_SHEEN_CSS_VAR);
      lastOpacity = null;
    }

    activeCard = card;
    const rect = card.getBoundingClientRect();
    const nextOpacity = computeRefractionSheenOpacity(event.clientX, event.clientY, rect);

    if (lastOpacity === null || Math.abs(nextOpacity - lastOpacity) >= WRITE_EPSILON) {
      card.style.setProperty(REFRACTION_SHEEN_CSS_VAR, String(nextOpacity));
      lastOpacity = nextOpacity;
    }
  };

  const onPointerLeaveWindow = () => {
    resetActiveCard();
  };

  doc.addEventListener('pointermove', onPointerMove as EventListener, { passive: true });
  doc.addEventListener('pointerleave', onPointerLeaveWindow as EventListener, { passive: true });
  doc.addEventListener('pointercancel', onPointerLeaveWindow as EventListener, { passive: true });

  return () => {
    doc.removeEventListener('pointermove', onPointerMove as EventListener);
    doc.removeEventListener('pointerleave', onPointerLeaveWindow as EventListener);
    doc.removeEventListener('pointercancel', onPointerLeaveWindow as EventListener);
    resetActiveCard();
  };
}
