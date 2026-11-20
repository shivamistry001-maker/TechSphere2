/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DESKTOP_MAX_DEPTH_OFFSET_PX,
  GLASS_DEPTH_ACTIVE_ATTR,
  GLASS_DEPTH_CSS_VAR,
  MOBILE_MAX_DEPTH_OFFSET_PX,
  computeGlassScrollDepthOffset,
  installGlassScrollDepthListener,
  isCardNearViewport,
  resolveMaxDepthOffsetPx,
} from './glassScrollDepth.ts';

test('computeGlassScrollDepthOffset returns 0 at viewport center and symmetric depth offsets toward edges', () => {
  const viewportHeight = 1000;

  // Centered card: top 400 + height 200 => center 500 === viewportCenter 500
  const centered = computeGlassScrollDepthOffset({ top: 400, height: 200 }, viewportHeight);
  assert.equal(centered, 0);

  // Near bottom of viewport => positive offset (rises upward into focus)
  const lower = computeGlassScrollDepthOffset({ top: 820, height: 200 }, viewportHeight);
  assert.ok(lower > 0 && lower <= DESKTOP_MAX_DEPTH_OFFSET_PX, `Expected positive offset, got ${lower}`);

  // Near top of viewport => negative offset (drifts upward with depth)
  const upper = computeGlassScrollDepthOffset({ top: -20, height: 200 }, viewportHeight);
  assert.ok(upper < 0 && upper >= -DESKTOP_MAX_DEPTH_OFFSET_PX, `Expected negative offset, got ${upper}`);
  assert.equal(lower, -upper, 'Symmetric distances from viewport center should yield opposite offsets');
});

test('computeGlassScrollDepthOffset subtracts previousOffsetPx to prevent layout feedback drift', () => {
  const viewportHeight = 900;
  const firstPass = computeGlassScrollDepthOffset({ top: 650, height: 200 }, viewportHeight, {
    previousOffsetPx: 0,
  });
  assert.ok(firstPass > 0);

  // Subsequent frame reports rect.top shifted by firstPass; subtracting it yields identical offset
  const secondPass = computeGlassScrollDepthOffset(
    { top: 650 + firstPass, height: 200 },
    viewportHeight,
    { previousOffsetPx: firstPass }
  );
  assert.equal(secondPass, firstPass);
});

test('resolveMaxDepthOffsetPx scales gently for mobile vs desktop and guards degenerate inputs', () => {
  assert.equal(resolveMaxDepthOffsetPx(390), MOBILE_MAX_DEPTH_OFFSET_PX);
  assert.equal(resolveMaxDepthOffsetPx(1440), DESKTOP_MAX_DEPTH_OFFSET_PX);
  assert.equal(computeGlassScrollDepthOffset({ top: 100, height: 0 }, 900), 0);
  assert.equal(computeGlassScrollDepthOffset({ top: Number.NaN, height: 200 }, 900), 0);
  assert.equal(isCardNearViewport({ top: 2500, height: 200 }, 900), false);
  assert.equal(isCardNearViewport({ top: 400, height: 200 }, 900), true);
});

test('installGlassScrollDepthListener updates --ts-glass-depth-y on scroll, honors reduced motion, and cleans up', () => {
  const winListeners = new Map<string, Set<() => void>>();
  let cardTop = 760;
  const styles = new Map<string, string>();
  const attrs = new Map<string, string>();

  const mockCard = {
    getBoundingClientRect: () => ({
      top: cardTop + (Number.parseFloat(styles.get(GLASS_DEPTH_CSS_VAR) || '0') || 0),
      height: 200,
    }),
    style: {
      setProperty: (k: string, v: string) => styles.set(k, v),
      removeProperty: (k: string) => {
        styles.delete(k);
        return '';
      },
    },
    setAttribute: (k: string, v: string) => attrs.set(k, v),
    removeAttribute: (k: string) => attrs.delete(k),
  } as unknown as HTMLElement;

  const mockDoc = {
    body: null,
    querySelectorAll: () => [mockCard],
  } as unknown as Document;

  const mockWin = {
    innerHeight: 900,
    innerWidth: 1440,
    addEventListener: (type: string, fn: () => void) => {
      if (!winListeners.has(type)) winListeners.set(type, new Set());
      winListeners.get(type)!.add(fn);
    },
    removeEventListener: (type: string, fn: () => void) => {
      winListeners.get(type)?.delete(fn);
    },
  } as unknown as Window;

  let reducedMotion = false;
  const dispose = installGlassScrollDepthListener({
    targetDocument: mockDoc,
    targetWindow: mockWin,
    prefersReducedMotion: () => reducedMotion,
    scheduleFrame: (cb) => {
      cb();
      return 1;
    },
    cancelFrame: () => {},
  });

  // Initial pass near bottom of viewport -> positive depth offset + active attribute
  const bottomOffset = Number.parseFloat(styles.get(GLASS_DEPTH_CSS_VAR) || 'NaN');
  assert.ok(bottomOffset > 2, `Expected positive offset near bottom, got ${bottomOffset}`);
  assert.equal(attrs.get(GLASS_DEPTH_ACTIVE_ATTR), 'true');

  // Scroll card into viewport center -> offset approaches 0px
  cardTop = 350;
  winListeners.get('scroll')?.forEach((fn) => fn());
  assert.equal(styles.get(GLASS_DEPTH_CSS_VAR), '0px');

  // Scroll card toward top of viewport -> negative depth offset
  cardTop = -40;
  winListeners.get('scroll')?.forEach((fn) => fn());
  const topOffset = Number.parseFloat(styles.get(GLASS_DEPTH_CSS_VAR) || 'NaN');
  assert.ok(topOffset < -2, `Expected negative offset near top, got ${topOffset}`);

  // Reduced motion clears offsets cleanly
  reducedMotion = true;
  winListeners.get('scroll')?.forEach((fn) => fn());
  assert.equal(styles.has(GLASS_DEPTH_CSS_VAR), false);
  assert.equal(attrs.has(GLASS_DEPTH_ACTIVE_ATTR), false);

  // Dispose removes all window listeners
  dispose();
  assert.equal(winListeners.get('scroll')?.size ?? 0, 0);
  assert.equal(winListeners.get('resize')?.size ?? 0, 0);
});
