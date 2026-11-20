/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  REFRACTION_SHEEN_CSS_VAR,
  computeRefractionSheenOpacity,
  installGlassRefractionListener,
} from './glassRefraction.ts';

test('computeRefractionSheenOpacity peaks at top-right corner and smoothly decreases toward bottom-left', () => {
  const rect = { left: 100, top: 200, width: 400, height: 200 };

  const topRight = computeRefractionSheenOpacity(500, 200, rect);
  const center = computeRefractionSheenOpacity(300, 300, rect);
  const bottomLeft = computeRefractionSheenOpacity(100, 400, rect);

  assert.equal(topRight, 1);
  assert.equal(bottomLeft, 0.16);
  assert.ok(topRight > center && center > bottomLeft, 'Opacity should decrease monotonically away from top-right');
});

test('computeRefractionSheenOpacity clamps out-of-bounds pointers and guards degenerate rects', () => {
  const rect = { left: 0, top: 0, width: 300, height: 150 };

  assert.equal(computeRefractionSheenOpacity(999, -50, rect), 1);
  assert.equal(computeRefractionSheenOpacity(-200, 800, rect), 0.16);
  assert.equal(computeRefractionSheenOpacity(50, 50, { left: 0, top: 0, width: 0, height: 100 }), 0.16);
  assert.equal(computeRefractionSheenOpacity(Number.NaN, 50, rect), 0.16);
});

test('installGlassRefractionListener updates CSS var on pointermove, ignores touch/reduced-motion, and resets cleanly', () => {
  const listeners = new Map<string, Set<(event: unknown) => void>>();
  const styles = new Map<string, string>();

  const mockCard = {
    closest: (selector: string) => (selector === '.ts-glass-card' ? mockCard : null),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 200, height: 100 }),
    style: {
      setProperty: (k: string, v: string) => styles.set(k, v),
      removeProperty: (k: string) => {
        styles.delete(k);
        return '';
      },
    },
  };

  const mockOutside = {
    closest: () => null,
  };

  const mockDoc = {
    addEventListener: (type: string, fn: (event: unknown) => void) => {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(fn);
    },
    removeEventListener: (type: string, fn: (event: unknown) => void) => {
      listeners.get(type)?.delete(fn);
    },
  } as unknown as Document;

  const emit = (type: string, event: unknown) => {
    listeners.get(type)?.forEach((fn) => fn(event));
  };

  let reducedMotion = false;
  const dispose = installGlassRefractionListener({
    targetDocument: mockDoc,
    prefersReducedMotion: () => reducedMotion,
  });

  // Move pointer near bottom-left of card
  emit('pointermove', { pointerType: 'mouse', target: mockCard, clientX: 10, clientY: 95 });
  const farValue = Number(styles.get(REFRACTION_SHEEN_CSS_VAR));
  assert.ok(farValue >= 0.16 && farValue < 0.35, `Expected low opacity near bottom-left, got ${farValue}`);

  // Move pointer to top-right corner of card
  emit('pointermove', { pointerType: 'mouse', target: mockCard, clientX: 200, clientY: 0 });
  const nearValue = Number(styles.get(REFRACTION_SHEEN_CSS_VAR));
  assert.equal(nearValue, 1);

  // Moving outside card resets inline CSS var back to CSS resting token
  emit('pointermove', { pointerType: 'mouse', target: mockOutside, clientX: 400, clientY: 400 });
  assert.equal(styles.has(REFRACTION_SHEEN_CSS_VAR), false);

  // Touch events should never apply dynamic hover refraction
  emit('pointermove', { pointerType: 'touch', target: mockCard, clientX: 200, clientY: 0 });
  assert.equal(styles.has(REFRACTION_SHEEN_CSS_VAR), false);

  // Reduced motion disables dynamic pointer tracking
  reducedMotion = true;
  emit('pointermove', { pointerType: 'mouse', target: mockCard, clientX: 200, clientY: 0 });
  assert.equal(styles.has(REFRACTION_SHEEN_CSS_VAR), false);

  // Disposing removes all listeners cleanly
  reducedMotion = false;
  emit('pointermove', { pointerType: 'mouse', target: mockCard, clientX: 200, clientY: 0 });
  assert.equal(styles.get(REFRACTION_SHEEN_CSS_VAR), '1');
  dispose();
  assert.equal(styles.has(REFRACTION_SHEEN_CSS_VAR), false);
  assert.equal(listeners.get('pointermove')?.size ?? 0, 0);
});
