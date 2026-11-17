/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId, ShowcaseSectionId, WebsiteDemoCategory, WebsiteDemoProject } from '../types.ts';

export const SHOWCASE_NAV_TARGETS: Readonly<
  Record<
    'demoWebsites' | 'erpShowcase',
    { label: string; page: PageId; path: string; sectionId?: ShowcaseSectionId }
  >
> = {
  demoWebsites: {
    label: 'Demo Websites',
    page: 'demo-websites',
    path: '/demo-websites',
  },
  erpShowcase: {
    label: 'ERP Showcase',
    page: 'erp-showcase',
    path: '/erp-showcase',
  },
};

export function isShowcaseNavActive(
  currentPage: PageId,
  targetPage: PageId
): boolean {
  return currentPage === targetPage;
}

export function filterWebsiteDemos(
  demos: WebsiteDemoProject[],
  category: WebsiteDemoCategory
): WebsiteDemoProject[] {
  if (category === 'All Projects' || category === 'All') {
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
