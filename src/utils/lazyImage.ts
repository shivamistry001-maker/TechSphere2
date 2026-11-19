/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export const DEFAULT_LAZY_ROOT_MARGIN = '150px 0px';
export const DEFAULT_LAZY_THRESHOLD = 0.01;
export const MAX_LOADED_IMAGE_CACHE_SIZE = 200;

export type LazyImageStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface LazyImageObserverOptions {
  /** Margin around the viewport to begin preloading before the image enters view. */
  rootMargin?: string;
  /** Intersection ratio threshold (clamped to 0..1). */
  threshold?: number;
  /** Set true for critical/interactive images (e.g. above-the-fold hero or open lightbox). */
  eager?: boolean;
}

export interface NormalizedLazyImageOptions {
  rootMargin: string;
  threshold: number;
  eager: boolean;
}

/**
 * Normalizes and validates IntersectionObserver options for lazy image loading.
 */
export function normalizeLazyImageOptions(
  options: LazyImageObserverOptions = {}
): NormalizedLazyImageOptions {
  const rootMargin =
    typeof options.rootMargin === 'string' && options.rootMargin.trim().length > 0
      ? options.rootMargin.trim()
      : DEFAULT_LAZY_ROOT_MARGIN;

  const rawThreshold = options.threshold;
  const threshold =
    typeof rawThreshold === 'number' && Number.isFinite(rawThreshold)
      ? Math.max(0, Math.min(1, rawThreshold))
      : DEFAULT_LAZY_THRESHOLD;

  return {
    rootMargin,
    threshold,
    eager: Boolean(options.eager),
  };
}

/**
 * Builds a deterministic pool key so lazy images with matching viewport margins
 * and thresholds share a single IntersectionObserver instance.
 */
export function getObserverPoolKey(rootMargin: string, threshold: number): string {
  return `${rootMargin}|${threshold}`;
}

/**
 * Determines whether an image should bypass deferred observation and load immediately.
 */
export function shouldLoadImageImmediately(params: {
  eager: boolean;
  supportsIntersectionObserver: boolean;
  isCached: boolean;
}): boolean {
  return params.eager || !params.supportsIntersectionObserver || params.isCached;
}

/* -------------------------------------------------------------------------- */
/* Bounded In-Memory Loaded Image URL Cache                                   */
/* -------------------------------------------------------------------------- */
const loadedImageCache = new Set<string>();

export function markImageLoaded(src: string): void {
  if (!src) return;
  if (loadedImageCache.has(src)) {
    // Refresh insertion order for FIFO/LRU-style eviction
    loadedImageCache.delete(src);
  } else if (loadedImageCache.size >= MAX_LOADED_IMAGE_CACHE_SIZE) {
    const oldest = loadedImageCache.values().next().value;
    if (oldest !== undefined) {
      loadedImageCache.delete(oldest);
    }
  }
  loadedImageCache.add(src);
}

export function isImageLoadedCached(src: string): boolean {
  return Boolean(src) && loadedImageCache.has(src);
}

export function clearLoadedImageCache(): void {
  loadedImageCache.clear();
}

export function getLoadedImageCacheSize(): number {
  return loadedImageCache.size;
}

/* -------------------------------------------------------------------------- */
/* Shared Pooled IntersectionObserver Manager                                 */
/* -------------------------------------------------------------------------- */
export interface ObserverLike {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

export interface ObserverEntryLike {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio?: number;
}

export type ObserverConstructorLike = new (
  callback: (entries: ObserverEntryLike[]) => void,
  options?: { rootMargin?: string; threshold?: number | number[] }
) => ObserverLike;

interface PoolBucket {
  observer: ObserverLike;
  callbacks: Map<Element, () => void>;
}

export interface LazyObserverPool {
  observe(
    element: Element,
    onIntersect: () => void,
    options?: Pick<LazyImageObserverOptions, 'rootMargin' | 'threshold'>
  ): () => void;
  getActiveObserverCount(): number;
  getObservedElementCount(): number;
  disconnectAll(): void;
}

/**
 * Creates a pooled IntersectionObserver registry so dozens of lazy images on a page
 * reuse one shared observer per (rootMargin, threshold) combination instead of
 * allocating a separate observer per image.
 */
export function createLazyObserverPool(
  ObserverCtor?: ObserverConstructorLike
): LazyObserverPool {
  const buckets = new Map<string, PoolBucket>();

  const resolveCtor = (): ObserverConstructorLike | null => {
    if (ObserverCtor) return ObserverCtor;
    if (typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function') {
      return window.IntersectionObserver as unknown as ObserverConstructorLike;
    }
    return null;
  };

  const cleanupBucketIfEmpty = (key: string, bucket: PoolBucket) => {
    if (bucket.callbacks.size === 0) {
      bucket.observer.disconnect();
      buckets.delete(key);
    }
  };

  const observe: LazyObserverPool['observe'] = (element, onIntersect, rawOptions) => {
    const Ctor = resolveCtor();
    if (!Ctor) {
      onIntersect();
      return () => {};
    }

    const { rootMargin, threshold } = normalizeLazyImageOptions(rawOptions);
    const key = getObserverPoolKey(rootMargin, threshold);

    let bucket = buckets.get(key);
    if (!bucket) {
      const callbacks = new Map<Element, () => void>();
      const observer = new Ctor(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting && (entry.intersectionRatio ?? 0) <= 0) {
              continue;
            }
            const target = entry.target;
            const cb = callbacks.get(target);
            if (cb) {
              callbacks.delete(target);
              observer.unobserve(target);
              cb();
            }
          }
          const current = buckets.get(key);
          if (current) {
            cleanupBucketIfEmpty(key, current);
          }
        },
        { rootMargin, threshold }
      );
      bucket = { observer, callbacks };
      buckets.set(key, bucket);
    }

    bucket.callbacks.set(element, onIntersect);
    bucket.observer.observe(element);

    let disposed = false;
    return () => {
      if (disposed) return;
      disposed = true;
      const current = buckets.get(key);
      if (!current) return;
      if (current.callbacks.delete(element)) {
        current.observer.unobserve(element);
      }
      cleanupBucketIfEmpty(key, current);
    };
  };

  return {
    observe,
    getActiveObserverCount: () => buckets.size,
    getObservedElementCount: () => {
      let count = 0;
      for (const bucket of buckets.values()) {
        count += bucket.callbacks.size;
      }
      return count;
    },
    disconnectAll: () => {
      for (const bucket of buckets.values()) {
        bucket.callbacks.clear();
        bucket.observer.disconnect();
      }
      buckets.clear();
    },
  };
}

const defaultLazyObserverPool = createLazyObserverPool();

/**
 * Observes a DOM element using the shared global IntersectionObserver pool.
 * Returns an unsubscribe cleanup function.
 */
export function observeLazyElement(
  element: Element,
  onIntersect: () => void,
  options?: Pick<LazyImageObserverOptions, 'rootMargin' | 'threshold'>
): () => void {
  return defaultLazyObserverPool.observe(element, onIntersect, options);
}

/* -------------------------------------------------------------------------- */
/* React Hook: useLazyImage                                                   */
/* -------------------------------------------------------------------------- */
export interface UseLazyImageResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imgRef: React.RefObject<HTMLImageElement | null>;
  shouldLoad: boolean;
  status: LazyImageStatus;
  handleLoad: () => void;
  handleError: () => void;
}

/**
 * React hook powering Intersection Observer-based lazy image loading.
 * Defers attaching image network requests until the container enters the configured
 * viewport margin, caches loaded URLs in memory, and supports eager mode for critical media.
 */
export function useLazyImage(
  src: string,
  options: LazyImageObserverOptions = {}
): UseLazyImageResult {
  const { rootMargin, threshold, eager } = normalizeLazyImageOptions(options);
  const supportsIO =
    typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function';

  const initiallyCached = isImageLoadedCached(src);
  const loadImmediately = shouldLoadImageImmediately({
    eager,
    supportsIntersectionObserver: supportsIO,
    isCached: initiallyCached,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [hasIntersected, setHasIntersected] = useState<boolean>(loadImmediately);
  const [status, setStatus] = useState<LazyImageStatus>(() => {
    if (initiallyCached) return 'loaded';
    return loadImmediately ? 'loading' : 'idle';
  });

  const shouldLoad = loadImmediately || hasIntersected;

  // Observe container element via the shared IntersectionObserver pool until visible
  useEffect(() => {
    if (shouldLoad) return;

    const container = containerRef.current;
    if (!container) return;

    return observeLazyElement(
      container,
      () => {
        setHasIntersected(true);
        setStatus((prev) => (prev === 'idle' ? 'loading' : prev));
      },
      { rootMargin, threshold }
    );
  }, [shouldLoad, rootMargin, threshold]);

  // Synchronize status when `src` changes (e.g., gallery slide switching) or image is already complete
  useEffect(() => {
    if (!shouldLoad) {
      setStatus('idle');
      return;
    }

    if (isImageLoadedCached(src)) {
      setStatus('loaded');
      return;
    }

    const imgEl = imgRef.current;
    if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
      markImageLoaded(src);
      setStatus('loaded');
      return;
    }

    setStatus('loading');
  }, [src, shouldLoad]);

  const handleLoad = useCallback(() => {
    markImageLoaded(src);
    setStatus('loaded');
  }, [src]);

  const handleError = useCallback(() => {
    setStatus('error');
  }, []);

  return {
    containerRef,
    imgRef,
    shouldLoad,
    status,
    handleLoad,
    handleError,
  };
}
