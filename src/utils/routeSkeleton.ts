/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Variants } from 'motion/react';
import { PageId } from '../types.ts';
import { EASE_PREMIUM } from './motion.ts';

export type RouteSkeletonVariant = 'editorial' | 'catalog' | 'contact';

export interface RouteSkeletonCardSpec {
  readonly id: string;
  readonly badgeWidthClass: string;
  readonly titleLineClasses: readonly string[];
  readonly paragraphLineClasses: readonly string[];
  readonly metaChipWidthClasses: readonly string[];
  readonly footerActionWidthClass: string;
}

export interface RouteSkeletonContactRowSpec {
  readonly id: string;
  readonly labelWidthClass: string;
  readonly primaryValueWidthClass: string;
  readonly secondaryValueWidthClass: string;
}

export interface RouteSkeletonPreset {
  readonly variant: RouteSkeletonVariant;
  readonly eyebrowWidthClass: string;
  readonly headingLineClasses: readonly string[];
  readonly leadParagraphLineClasses: readonly string[];
  readonly actionButtonWidthClasses: readonly string[];
  readonly filterChipWidthClasses: readonly string[];
  readonly cards: readonly RouteSkeletonCardSpec[];
  readonly contactRows: readonly RouteSkeletonContactRowSpec[];
}

export const ROUTE_SKELETON_STAGGER_STEP_SEC = 0.055;
export const ROUTE_SKELETON_MAX_DELAY_SEC = 0.385;
export const ROUTE_SKELETON_ITEM_DURATION_SEC = 0.28;

const SHIMMER_DELAY_CLASSES = [
  'ts-shimmer-d0',
  'ts-shimmer-d1',
  'ts-shimmer-d2',
  'ts-shimmer-d3',
  'ts-shimmer-d4',
  'ts-shimmer-d5',
] as const;

/**
 * Resolves the route skeleton layout preset that best mirrors the target page's
 * visual hierarchy so lazy route transitions feel seamless and structured.
 */
export function resolveRouteSkeletonVariant(page?: PageId): RouteSkeletonVariant {
  switch (page) {
    case 'services':
    case 'industries':
    case 'portfolio':
    case 'demo-websites':
    case 'erp-showcase':
      return 'catalog';
    case 'contact':
    case 'request-consultation':
      return 'contact';
    case 'about':
    case 'erp-solutions':
    case 'erpnext':
    case 'odoo':
    case 'zoho':
    case 'it-solutions':
    case 'case-studies':
    case 'home':
    case 'not-found':
    default:
      return 'editorial';
  }
}

/**
 * Computes a deterministic, monotonic staggered entry delay (in seconds)
 * for skeleton sections and cards, collapsing immediately to 0s under reduced motion.
 */
export function computeSkeletonStaggerDelay(
  index: number,
  prefersReducedMotion: boolean = false
): number {
  if (prefersReducedMotion) return 0;
  if (!Number.isFinite(index) || index <= 0) return 0;
  const clampedIndex = Math.floor(index);
  return Math.min(
    Number((clampedIndex * ROUTE_SKELETON_STAGGER_STEP_SEC).toFixed(4)),
    ROUTE_SKELETON_MAX_DELAY_SEC
  );
}

/**
 * Resolves a CSS shimmer phase offset class so the highlight sweep cascades
 * smoothly across skeleton blocks without inline styles.
 */
export function getSkeletonShimmerDelayClass(
  index: number,
  prefersReducedMotion: boolean = false
): string {
  if (prefersReducedMotion || !Number.isFinite(index) || index <= 0) {
    return SHIMMER_DELAY_CLASSES[0];
  }
  const slot = Math.min(Math.floor(index), SHIMMER_DELAY_CLASSES.length - 1);
  return SHIMMER_DELAY_CLASSES[slot];
}

/**
 * Builds GPU-composited Framer Motion container variants for RouteLoadingFallback.
 */
export function createRouteSkeletonContainerVariants(
  prefersReducedMotion: boolean
): Variants {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: EASE_PREMIUM,
        staggerChildren: ROUTE_SKELETON_STAGGER_STEP_SEC,
        delayChildren: 0.02,
      },
    },
  };
}

/**
 * Builds GPU-composited staggered entry variants for individual skeleton groups and cards.
 */
export function createRouteSkeletonItemVariants(
  prefersReducedMotion: boolean
): Variants {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: 12 },
    visible: (index: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: ROUTE_SKELETON_ITEM_DURATION_SEC,
        delay: computeSkeletonStaggerDelay(index, false),
        ease: EASE_PREMIUM,
      },
    }),
  };
}

/**
 * Checks whether `?routeFallbackPreview=1` is present in the URL query string
 * for visual QA and automated browser verification without adding any debug UI.
 */
export function isRouteFallbackPreviewEnabled(search?: string): boolean {
  const query =
    typeof search === 'string'
      ? search
      : typeof window !== 'undefined'
      ? window.location.search
      : '';
  if (!query) return false;
  const params = new URLSearchParams(query);
  return params.get('routeFallbackPreview') === '1';
}

/**
 * Realistic, non-uniform text block and card presets mirroring TechSphere's
 * real editorial, catalog, and consultation layouts using Tailwind width tokens.
 */
export const ROUTE_SKELETON_PRESETS: Record<RouteSkeletonVariant, RouteSkeletonPreset> = {
  editorial: {
    variant: 'editorial',
    eyebrowWidthClass: 'w-36',
    headingLineClasses: ['w-[84%] sm:w-[27rem]', 'w-[58%] sm:w-[17rem]'],
    leadParagraphLineClasses: ['w-full', 'w-[92%]', 'w-[68%]'],
    actionButtonWidthClasses: ['w-44', 'w-36'],
    filterChipWidthClasses: [],
    cards: [
      {
        id: 'editorial-card-1',
        badgeWidthClass: 'w-20',
        titleLineClasses: ['w-[84%]'],
        paragraphLineClasses: ['w-full', 'w-[91%]', 'w-[66%]'],
        metaChipWidthClasses: ['w-16', 'w-20'],
        footerActionWidthClass: 'w-28',
      },
      {
        id: 'editorial-card-2',
        badgeWidthClass: 'w-24',
        titleLineClasses: ['w-[92%]', 'w-[48%]'],
        paragraphLineClasses: ['w-[97%]', 'w-[85%]', 'w-[58%]'],
        metaChipWidthClasses: ['w-20', 'w-14', 'w-16'],
        footerActionWidthClass: 'w-32',
      },
      {
        id: 'editorial-card-3',
        badgeWidthClass: 'w-18',
        titleLineClasses: ['w-[76%]'],
        paragraphLineClasses: ['w-full', 'w-[88%]', 'w-[73%]'],
        metaChipWidthClasses: ['w-20', 'w-16'],
        footerActionWidthClass: 'w-24',
      },
    ],
    contactRows: [],
  },
  catalog: {
    variant: 'catalog',
    eyebrowWidthClass: 'w-40',
    headingLineClasses: ['w-[80%] sm:w-[25rem]', 'w-[52%] sm:w-[15rem]'],
    leadParagraphLineClasses: ['w-[98%]', 'w-[89%]', 'w-[61%]'],
    actionButtonWidthClasses: ['w-40'],
    filterChipWidthClasses: ['w-24', 'w-32', 'w-28', 'w-20'],
    cards: [
      {
        id: 'catalog-card-1',
        badgeWidthClass: 'w-20',
        titleLineClasses: ['w-[86%]'],
        paragraphLineClasses: ['w-full', 'w-[92%]', 'w-[64%]'],
        metaChipWidthClasses: ['w-16', 'w-20', 'w-14'],
        footerActionWidthClass: 'w-32',
      },
      {
        id: 'catalog-card-2',
        badgeWidthClass: 'w-24',
        titleLineClasses: ['w-[74%]'],
        paragraphLineClasses: ['w-[95%]', 'w-[87%]', 'w-[71%]'],
        metaChipWidthClasses: ['w-18', 'w-16'],
        footerActionWidthClass: 'w-28',
      },
      {
        id: 'catalog-card-3',
        badgeWidthClass: 'w-16',
        titleLineClasses: ['w-[90%]', 'w-[44%]'],
        paragraphLineClasses: ['w-full', 'w-[84%]', 'w-[55%]'],
        metaChipWidthClasses: ['w-14', 'w-22', 'w-16'],
        footerActionWidthClass: 'w-32',
      },
    ],
    contactRows: [],
  },
  contact: {
    variant: 'contact',
    eyebrowWidthClass: 'w-36',
    headingLineClasses: ['w-[78%] sm:w-[24rem]', 'w-[50%] sm:w-[16rem]'],
    leadParagraphLineClasses: ['w-[96%]', 'w-[86%]', 'w-[58%]'],
    actionButtonWidthClasses: [],
    filterChipWidthClasses: [],
    cards: [],
    contactRows: [
      {
        id: 'contact-row-1',
        labelWidthClass: 'w-20',
        primaryValueWidthClass: 'w-[76%]',
        secondaryValueWidthClass: 'w-[52%]',
      },
      {
        id: 'contact-row-2',
        labelWidthClass: 'w-24',
        primaryValueWidthClass: 'w-[86%]',
        secondaryValueWidthClass: 'w-[61%]',
      },
      {
        id: 'contact-row-3',
        labelWidthClass: 'w-18',
        primaryValueWidthClass: 'w-[68%]',
        secondaryValueWidthClass: 'w-[47%]',
      },
    ],
  },
};
