/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Variants } from 'motion/react';

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export const SCROLL_SPRING_CONFIG = {
  stiffness: 115,
  damping: 26,
  mass: 0.25,
} as const;

/**
 * Returns subtle alternating vertical parallax ranges [startY, endY]
 * for multi-column card grids so scrolling feels fluid without misalignment.
 */
export function computeColumnParallax(
  index: number,
  columns: number = 3,
  amplitude: number = 14
): [number, number] {
  const safeCols = Math.max(1, Math.floor(columns));
  const col = ((index % safeCols) + safeCols) % safeCols;
  if (safeCols === 1) return [amplitude * 0.5, -amplitude * 0.5];
  if (safeCols === 2) {
    return col === 0 ? [amplitude, -amplitude] : [-amplitude * 0.6, amplitude * 0.6];
  }
  // 3+ columns: center column tracks slightly slower, outer columns create subtle depth
  const pattern = col % 3;
  if (pattern === 0) return [amplitude * 0.75, -amplitude * 0.75];
  if (pattern === 1) return [-amplitude * 0.45, amplitude * 0.45];
  return [amplitude, -amplitude];
}

export function shouldTriggerScrollReveal(
  progress: number,
  alreadyTriggered: boolean,
  threshold: number = 0.01
): boolean {
  if (alreadyTriggered) return true;
  if (!Number.isFinite(progress)) return false;
  return progress >= threshold;
}

export function isRectWithinScrollTrigger(
  top: number,
  bottom: number,
  viewportHeight: number,
  triggerRatio: number = 0.95
): boolean {
  if (!Number.isFinite(top) || !Number.isFinite(bottom) || !Number.isFinite(viewportHeight)) {
    return false;
  }
  if (viewportHeight <= 0) return false;
  return top <= viewportHeight * triggerRatio && bottom >= 0;
}

export const scrollSectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.36,
      ease: EASE_PREMIUM,
      staggerChildren: 0.09,
      delayChildren: 0.03,
    },
  },
};

export const scrollBlockItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: EASE_PREMIUM,
    },
  },
};

export const scrollCascadeGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: EASE_PREMIUM,
      staggerChildren: 0.065,
      delayChildren: 0.02,
    },
  },
};

export const scrollCardItemVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: EASE_PREMIUM,
    },
  },
};

export const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      delay: Math.min(index * 0.06, 0.36),
      ease: EASE_PREMIUM,
    },
  }),
};

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: EASE_PREMIUM,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: {
      duration: 0.14,
      ease: 'easeIn',
    },
  },
};

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.24, ease: EASE_PREMIUM },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 10,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
};

/**
 * Cubic ease-out curve for smooth numerical counter interpolation.
 */
export function easeOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 3);
}

/**
 * Computes counter value at normalized progress [0..1].
 */
export function interpolateCounter(target: number, progress: number): number {
  return Math.round(easeOutCubic(progress) * target);
}

/**
 * Dark mode monochrome palette constants (strictly Black + Grey + White).
 */
export const DARK_PALETTE = {
  bgMain: '#090909',
  bgSecondary: '#111111',
  bgCard: '#171717',
  bgElevated: '#1D1D1D',
  bgHover: '#252525',
  border: '#303030',
  textPrimary: '#F5F5F5',
  textSecondary: '#A3A3A3',
  textMuted: '#737373',
  accent: '#FFFFFF',
  accentSubtle: '#D4D4D4',
} as const;
