/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ROUTE_SKELETON_MAX_DELAY_SEC,
  ROUTE_SKELETON_PRESETS,
  ROUTE_SKELETON_STAGGER_STEP_SEC,
  computeSkeletonStaggerDelay,
  createRouteSkeletonContainerVariants,
  createRouteSkeletonItemVariants,
  getSkeletonShimmerDelayClass,
  isRouteFallbackPreviewEnabled,
  resolveRouteSkeletonVariant,
} from './routeSkeleton.ts';

test('resolveRouteSkeletonVariant maps secondary pages to matching structural layouts', () => {
  assert.equal(resolveRouteSkeletonVariant('about'), 'editorial');
  assert.equal(resolveRouteSkeletonVariant('erp-solutions'), 'editorial');
  assert.equal(resolveRouteSkeletonVariant('erpnext'), 'editorial');
  assert.equal(resolveRouteSkeletonVariant('case-studies'), 'editorial');

  assert.equal(resolveRouteSkeletonVariant('services'), 'catalog');
  assert.equal(resolveRouteSkeletonVariant('industries'), 'catalog');
  assert.equal(resolveRouteSkeletonVariant('portfolio'), 'catalog');
  assert.equal(resolveRouteSkeletonVariant('demo-websites'), 'catalog');
  assert.equal(resolveRouteSkeletonVariant('erp-showcase'), 'catalog');

  assert.equal(resolveRouteSkeletonVariant('contact'), 'contact');
  assert.equal(resolveRouteSkeletonVariant('request-consultation'), 'contact');

  assert.equal(resolveRouteSkeletonVariant(undefined), 'editorial');
});

test('computeSkeletonStaggerDelay and shimmer classes cascade monotonically and collapse under reduced motion', () => {
  assert.equal(computeSkeletonStaggerDelay(0, false), 0);
  assert.equal(computeSkeletonStaggerDelay(1, false), ROUTE_SKELETON_STAGGER_STEP_SEC);
  assert.equal(
    computeSkeletonStaggerDelay(2, false),
    Number((2 * ROUTE_SKELETON_STAGGER_STEP_SEC).toFixed(4))
  );
  assert.ok(computeSkeletonStaggerDelay(3, false) > computeSkeletonStaggerDelay(2, false));
  assert.equal(computeSkeletonStaggerDelay(20, false), ROUTE_SKELETON_MAX_DELAY_SEC);

  assert.equal(getSkeletonShimmerDelayClass(0, false), 'ts-shimmer-d0');
  assert.equal(getSkeletonShimmerDelayClass(2, false), 'ts-shimmer-d2');
  assert.equal(getSkeletonShimmerDelayClass(12, false), 'ts-shimmer-d5');

  // Reduced motion collapses all stagger and shimmer delays immediately
  assert.equal(computeSkeletonStaggerDelay(4, true), 0);
  assert.equal(getSkeletonShimmerDelayClass(4, true), 'ts-shimmer-d0');
  assert.equal(computeSkeletonStaggerDelay(-3, false), 0);
  assert.equal(computeSkeletonStaggerDelay(Number.NaN, false), 0);
});

test('ROUTE_SKELETON_PRESETS provide varied realistic text block proportions instead of identical bars', () => {
  for (const variant of ['editorial', 'catalog', 'contact'] as const) {
    const preset = ROUTE_SKELETON_PRESETS[variant];
    // Heading lines vary naturally (e.g., longer top line, shorter second line)
    assert.ok(preset.headingLineClasses.length >= 2);
    assert.notEqual(preset.headingLineClasses[0], preset.headingLineClasses[1]);

    // Lead paragraph has 3 distinct natural line widths ending shorter
    assert.equal(preset.leadParagraphLineClasses.length, 3);
    assert.equal(new Set(preset.leadParagraphLineClasses).size, 3);

    if (preset.cards.length > 0) {
      assert.equal(preset.cards.length, 3);
      // Cards have distinct paragraph rhythms and badge widths rather than carbon copies
      const badgeSet = new Set(preset.cards.map((c) => c.badgeWidthClass));
      assert.equal(badgeSet.size, 3);
      const paragraphSignatures = new Set(
        preset.cards.map((c) => c.paragraphLineClasses.join(','))
      );
      assert.equal(paragraphSignatures.size, 3);
      for (const card of preset.cards) {
        assert.equal(card.paragraphLineClasses.length, 3);
        assert.equal(new Set(card.paragraphLineClasses).size, 3);
      }
    }

    if (variant === 'contact') {
      assert.equal(preset.contactRows.length, 3);
      const rowSignatures = new Set(preset.contactRows.map((r) => r.primaryValueWidthClass));
      assert.equal(rowSignatures.size, 3);
    }
  }
});

test('route skeleton animation variants honor prefers-reduced-motion cleanly', () => {
  const reducedContainer = createRouteSkeletonContainerVariants(true);
  assert.deepEqual(reducedContainer.hidden, { opacity: 1 });
  assert.deepEqual(reducedContainer.visible, { opacity: 1 });

  const reducedItem = createRouteSkeletonItemVariants(true);
  assert.deepEqual(reducedItem.hidden, { opacity: 1, y: 0 });
  assert.deepEqual(reducedItem.visible, { opacity: 1, y: 0 });

  const animatedItem = createRouteSkeletonItemVariants(false);
  assert.deepEqual(animatedItem.hidden, { opacity: 0, y: 12 });
  assert.equal(typeof animatedItem.visible, 'function');
});

test('isRouteFallbackPreviewEnabled parses query param cleanly', () => {
  assert.equal(isRouteFallbackPreviewEnabled('?routeFallbackPreview=1'), true);
  assert.equal(isRouteFallbackPreviewEnabled('?tab=erp&routeFallbackPreview=1'), true);
  assert.equal(isRouteFallbackPreviewEnabled('?routeFallbackPreview=0'), false);
  assert.equal(isRouteFallbackPreviewEnabled(''), false);
});
