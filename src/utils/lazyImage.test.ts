/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_LAZY_ROOT_MARGIN,
  DEFAULT_LAZY_THRESHOLD,
  MAX_LOADED_IMAGE_CACHE_SIZE,
  clearLoadedImageCache,
  createLazyObserverPool,
  getLoadedImageCacheSize,
  getObserverPoolKey,
  isImageLoadedCached,
  markImageLoaded,
  normalizeLazyImageOptions,
  shouldLoadImageImmediately,
  type ObserverConstructorLike,
  type ObserverEntryLike,
  type ObserverLike,
} from './lazyImage';

test('normalizeLazyImageOptions applies safe defaults and clamps threshold bounds', () => {
  assert.deepEqual(normalizeLazyImageOptions(), {
    rootMargin: DEFAULT_LAZY_ROOT_MARGIN,
    threshold: DEFAULT_LAZY_THRESHOLD,
    eager: false,
  });

  assert.deepEqual(
    normalizeLazyImageOptions({ rootMargin: '  240px 0px  ', threshold: 1.5, eager: true }),
    {
      rootMargin: '240px 0px',
      threshold: 1,
      eager: true,
    }
  );

  assert.deepEqual(
    normalizeLazyImageOptions({ rootMargin: '   ', threshold: -0.4 }),
    {
      rootMargin: DEFAULT_LAZY_ROOT_MARGIN,
      threshold: 0,
      eager: false,
    }
  );

  assert.equal(normalizeLazyImageOptions({ threshold: Number.NaN }).threshold, DEFAULT_LAZY_THRESHOLD);
});

test('shouldLoadImageImmediately respects eager flag, IntersectionObserver support, and cache', () => {
  assert.equal(
    shouldLoadImageImmediately({ eager: false, supportsIntersectionObserver: true, isCached: false }),
    false
  );
  assert.equal(
    shouldLoadImageImmediately({ eager: true, supportsIntersectionObserver: true, isCached: false }),
    true
  );
  assert.equal(
    shouldLoadImageImmediately({ eager: false, supportsIntersectionObserver: false, isCached: false }),
    true
  );
  assert.equal(
    shouldLoadImageImmediately({ eager: false, supportsIntersectionObserver: true, isCached: true }),
    true
  );
});

test('loadedImageCache tracks loaded URLs and enforces maximum cache size', () => {
  clearLoadedImageCache();
  assert.equal(getLoadedImageCacheSize(), 0);
  assert.equal(isImageLoadedCached('/assets/demos/cafe-restaurant.png'), false);

  markImageLoaded('/assets/demos/cafe-restaurant.png');
  assert.equal(isImageLoadedCached('/assets/demos/cafe-restaurant.png'), true);
  assert.equal(getLoadedImageCacheSize(), 1);

  for (let i = 0; i < MAX_LOADED_IMAGE_CACHE_SIZE + 10; i += 1) {
    markImageLoaded(`/assets/test-img-${i}.png`);
  }
  assert.equal(getLoadedImageCacheSize(), MAX_LOADED_IMAGE_CACHE_SIZE);
  assert.equal(isImageLoadedCached('/assets/demos/cafe-restaurant.png'), false);
  assert.equal(isImageLoadedCached(`/assets/test-img-${MAX_LOADED_IMAGE_CACHE_SIZE + 9}.png`), true);

  clearLoadedImageCache();
});

test('createLazyObserverPool shares observers per config, fires once on intersect, and disconnects when empty', () => {
  interface MockInstance {
    callback: (entries: ObserverEntryLike[]) => void;
    options?: { rootMargin?: string; threshold?: number | number[] };
    observed: Set<Element>;
    disconnected: boolean;
  }

  const instances: MockInstance[] = [];

  class FakeIntersectionObserver implements ObserverLike {
    private readonly record: MockInstance;

    constructor(
      callback: (entries: ObserverEntryLike[]) => void,
      options?: { rootMargin?: string; threshold?: number | number[] }
    ) {
      this.record = {
        callback,
        options,
        observed: new Set<Element>(),
        disconnected: false,
      };
      instances.push(this.record);
    }

    observe(target: Element) {
      this.record.observed.add(target);
    }

    unobserve(target: Element) {
      this.record.observed.delete(target);
    }

    disconnect() {
      this.record.disconnected = true;
      this.record.observed.clear();
    }
  }

  const pool = createLazyObserverPool(FakeIntersectionObserver as unknown as ObserverConstructorLike);
  const elA = { id: 'a' } as unknown as Element;
  const elB = { id: 'b' } as unknown as Element;
  const elC = { id: 'c' } as unknown as Element;

  let hitsA = 0;
  let hitsB = 0;
  let hitsC = 0;

  // Two elements with identical options share 1 observer
  const unsubA = pool.observe(elA, () => { hitsA += 1; }, { rootMargin: '150px 0px', threshold: 0.01 });
  const unsubB = pool.observe(elB, () => { hitsB += 1; }, { rootMargin: '150px 0px', threshold: 0.01 });
  assert.equal(pool.getActiveObserverCount(), 1);
  assert.equal(pool.getObservedElementCount(), 2);
  assert.equal(instances.length, 1);

  // Element with distinct options gets its own observer bucket
  const unsubC = pool.observe(elC, () => { hitsC += 1; }, { rootMargin: '300px 0px', threshold: 0.1 });
  assert.equal(pool.getActiveObserverCount(), 2);
  assert.equal(getObserverPoolKey('150px 0px', 0.01) !== getObserverPoolKey('300px 0px', 0.1), true);

  // Non-intersecting entry should not fire callback
  instances[0].callback([{ target: elA, isIntersecting: false, intersectionRatio: 0 }]);
  assert.equal(hitsA, 0);

  // Intersecting elA fires once and auto-unobserves elA
  instances[0].callback([{ target: elA, isIntersecting: true, intersectionRatio: 0.25 }]);
  assert.equal(hitsA, 1);
  assert.equal(instances[0].observed.has(elA), false);
  assert.equal(instances[0].disconnected, false);
  assert.equal(pool.getObservedElementCount(), 2);

  // Duplicate intersection callback does not re-fire
  instances[0].callback([{ target: elA, isIntersecting: true, intersectionRatio: 1 }]);
  assert.equal(hitsA, 1);

  // Unsubscribing elB empties bucket 0 and disconnects its observer cleanly
  unsubA();
  unsubB();
  assert.equal(hitsB, 0);
  assert.equal(instances[0].disconnected, true);
  assert.equal(pool.getActiveObserverCount(), 1);

  // Intersecting elC empties bucket 1 and disconnects it cleanly
  instances[1].callback([{ target: elC, isIntersecting: true, intersectionRatio: 0.5 }]);
  assert.equal(hitsC, 1);
  assert.equal(instances[1].disconnected, true);
  assert.equal(pool.getActiveObserverCount(), 0);
  unsubC();
});
