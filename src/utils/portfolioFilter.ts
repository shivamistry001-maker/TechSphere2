/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem } from '../types.ts';

export const PORTFOLIO_CATEGORIES = [
  'All',
  'Web',
  'ERP',
  'Applications',
  'Automation',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/**
 * Pure, synchronous category filter for Portfolio items.
 * Returns the original array reference for 'All' to avoid unnecessary allocations.
 */
export function filterPortfolioItems(
  items: readonly PortfolioItem[],
  category: string
): readonly PortfolioItem[] {
  if (!category || category === 'All') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

/**
 * Computes the horizontal scrollLeft target that centers an active filter pill
 * inside a horizontally scrollable mobile filter container without affecting
 * document-level scroll position.
 */
export function computeCenteredPillScrollLeft(params: {
  containerWidth: number;
  containerScrollWidth: number;
  pillOffsetLeft: number;
  pillWidth: number;
}): number {
  const { containerWidth, containerScrollWidth, pillOffsetLeft, pillWidth } = params;
  if (
    !Number.isFinite(containerWidth) ||
    !Number.isFinite(containerScrollWidth) ||
    containerWidth <= 0 ||
    containerScrollWidth <= containerWidth
  ) {
    return 0;
  }
  const maxScroll = Math.max(0, containerScrollWidth - containerWidth);
  const ideal = pillOffsetLeft - (containerWidth - pillWidth) / 2;
  return Math.max(0, Math.min(maxScroll, Math.round(ideal)));
}
