/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WebsiteDemoCategory, WebsiteDemoProject } from '../types.ts';

export function filterWebsiteDemos(
  demos: WebsiteDemoProject[],
  category: WebsiteDemoCategory
): WebsiteDemoProject[] {
  if (category === 'All') {
    return demos;
  }
  return demos.filter((demo) => demo.category === category);
}

export function clampGalleryIndex(index: number, total: number): number {
  if (!Number.isFinite(total) || total <= 0) {
    return 0;
  }
  const safeTotal = Math.floor(total);
  const normalized = ((Math.floor(index) % safeTotal) + safeTotal) % safeTotal;
  return normalized;
}

export function cycleGalleryIndex(
  currentIndex: number,
  total: number,
  direction: 'prev' | 'next'
): number {
  if (!Number.isFinite(total) || total <= 0) {
    return 0;
  }
  const delta = direction === 'next' ? 1 : -1;
  return clampGalleryIndex(currentIndex + delta, total);
}
