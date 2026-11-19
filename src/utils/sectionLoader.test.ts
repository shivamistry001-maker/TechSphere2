/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_FILTER_FETCH_MS,
  DEFAULT_INITIAL_FETCH_MS,
  getSkeletonDelayMs,
  isSkeletonPreviewEnabled,
  resolveSkeletonCount,
} from './sectionLoader.ts';

test('resolveSkeletonCount clamps expected counts within safe visual bounds', () => {
  assert.equal(resolveSkeletonCount(6, 3, 6), 6);
  assert.equal(resolveSkeletonCount(12, 3, 6), 6);
  assert.equal(resolveSkeletonCount(2, 3, 6), 2);
  assert.equal(resolveSkeletonCount(0, 4, 6), 4);
  assert.equal(resolveSkeletonCount(-2, 3, 6), 3);
  assert.equal(resolveSkeletonCount(Number.NaN, 3, 6), 3);
});

test('getSkeletonDelayMs honors reduced motion, cache warmth, and transition type', () => {
  assert.equal(
    getSkeletonDelayMs({ prefersReducedMotion: true, isFilterTransition: false }),
    0
  );
  assert.equal(
    getSkeletonDelayMs({ prefersReducedMotion: false, isCached: true }),
    0
  );
  assert.equal(
    getSkeletonDelayMs({ prefersReducedMotion: false, isFilterTransition: false }),
    DEFAULT_INITIAL_FETCH_MS
  );
  assert.equal(
    getSkeletonDelayMs({ prefersReducedMotion: false, isFilterTransition: true }),
    DEFAULT_FILTER_FETCH_MS
  );
  assert.equal(
    getSkeletonDelayMs({ prefersReducedMotion: false, customDelayMs: 180 }),
    180
  );
});

test('isSkeletonPreviewEnabled parses query string accurately', () => {
  assert.equal(isSkeletonPreviewEnabled('?skeletonPreview=1'), true);
  assert.equal(isSkeletonPreviewEnabled('?foo=bar&skeletonPreview=1'), true);
  assert.equal(isSkeletonPreviewEnabled('?skeletonPreview=0'), false);
  assert.equal(isSkeletonPreviewEnabled(''), false);
});
