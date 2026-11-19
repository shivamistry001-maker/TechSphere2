/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export const DEFAULT_INITIAL_FETCH_MS = 260;
export const DEFAULT_FILTER_FETCH_MS = 160;

/**
 * Resolves how many skeleton placeholders should render for a given section/filter.
 */
export function resolveSkeletonCount(
  expectedCount: number,
  fallbackCount: number = 3,
  maxCount: number = 6
): number {
  if (!Number.isFinite(expectedCount) || expectedCount <= 0) {
    return Math.min(Math.max(1, fallbackCount), maxCount);
  }
  return Math.min(Math.max(1, Math.round(expectedCount)), maxCount);
}

/**
 * Computes the perceived-performance skeleton window in milliseconds.
 * Immediately returns 0ms when reduced motion is preferred or already warm-cached.
 */
export function getSkeletonDelayMs(options: {
  prefersReducedMotion: boolean;
  isFilterTransition?: boolean;
  isCached?: boolean;
  customDelayMs?: number;
}): number {
  if (options.prefersReducedMotion || options.isCached) {
    return 0;
  }
  if (typeof options.customDelayMs === 'number' && options.customDelayMs >= 0) {
    return options.customDelayMs;
  }
  return options.isFilterTransition ? DEFAULT_FILTER_FETCH_MS : DEFAULT_INITIAL_FETCH_MS;
}

/**
 * Checks whether the optional `?skeletonPreview=1` query param is active
 * (useful for design review and automated verification without adding debug UI).
 */
export function isSkeletonPreviewEnabled(search?: string): boolean {
  const query =
    typeof search === 'string'
      ? search
      : typeof window !== 'undefined'
      ? window.location.search
      : '';
  if (!query) return false;
  const params = new URLSearchParams(query);
  return params.get('skeletonPreview') === '1';
}

const hydratedKeys = new Set<string>();

/**
 * Lightweight async data-fetching lifecycle hook for Service & Portfolio sections.
 * Supports external `externalLoading` override, brief shimmer during initial fetch
 * or filter transitions, cancellation on unmount, and reduced-motion compliance.
 */
export function useSectionDataLoader<T>(
  data: T,
  cacheKey: string,
  options: {
    externalLoading?: boolean;
    prefersReducedMotion?: boolean;
    isFilterTransition?: boolean;
    delayMs?: number;
  } = {}
): { items: T; isLoading: boolean } {
  const previewForced = isSkeletonPreviewEnabled();
  const isCached = hydratedKeys.has(cacheKey);
  const delayMs = getSkeletonDelayMs({
    prefersReducedMotion: Boolean(options.prefersReducedMotion),
    isFilterTransition: options.isFilterTransition,
    isCached: previewForced ? false : isCached,
    customDelayMs: options.delayMs,
  });

  const [internalLoading, setInternalLoading] = useState<boolean>(
    () => previewForced || delayMs > 0
  );

  useEffect(() => {
    if (previewForced) {
      setInternalLoading(true);
      return;
    }

    if (options.externalLoading) {
      setInternalLoading(true);
      return;
    }

    if (delayMs <= 0) {
      hydratedKeys.add(cacheKey);
      setInternalLoading(false);
      return;
    }

    let cancelled = false;
    setInternalLoading(true);

    const timerId = window.setTimeout(() => {
      if (!cancelled) {
        hydratedKeys.add(cacheKey);
        setInternalLoading(false);
      }
    }, delayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [cacheKey, delayMs, options.externalLoading, previewForced]);

  return {
    items: data,
    isLoading: Boolean(options.externalLoading) || internalLoading,
  };
}
