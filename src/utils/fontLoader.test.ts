/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CRITICAL_FONT_DESCRIPTORS,
  FONT_FALLBACK_METRICS,
  areCriticalFontsReady,
  loadWebFontsWithBudget,
  resolveInitialFontStatus,
  type FontFaceSetLike,
} from './fontLoader';

test('FONT_FALLBACK_METRICS defines valid calibrated metric overrides for Plus Jakarta Sans and Outfit', () => {
  for (const config of Object.values(FONT_FALLBACK_METRICS)) {
    assert.ok(config.fallbackFamily.endsWith('Fallback'));
    assert.ok(config.sizeAdjust >= 90 && config.sizeAdjust <= 115);
    assert.ok(config.ascentOverride >= 75 && config.ascentOverride <= 115);
    assert.ok(config.descentOverride >= 15 && config.descentOverride <= 40);
    assert.equal(config.lineGapOverride, 0);
  }
  assert.ok(CRITICAL_FONT_DESCRIPTORS.some((d) => d.includes('"Plus Jakarta Sans"')));
  assert.ok(CRITICAL_FONT_DESCRIPTORS.some((d) => d.includes('"Outfit"')));
});

test('resolveInitialFontStatus prioritizes cached fonts and falls back cleanly without API support', () => {
  assert.equal(resolveInitialFontStatus({ isWarmCached: true, supportsFontLoadingApi: true }), 'loaded');
  assert.equal(resolveInitialFontStatus({ isWarmCached: false, supportsFontLoadingApi: true }), 'loading');
  assert.equal(resolveInitialFontStatus({ isWarmCached: false, supportsFontLoadingApi: false }), 'system');
});

test('areCriticalFontsReady verifies all required descriptors via FontFaceSet.check', () => {
  assert.equal(areCriticalFontsReady(null), false);
  assert.equal(
    areCriticalFontsReady({ check: () => true }),
    true
  );
  assert.equal(
    areCriticalFontsReady({ check: (desc) => desc.includes('Outfit') }),
    false
  );
});

test('loadWebFontsWithBudget returns loaded when fonts resolve within budget', async () => {
  const loadedDescriptors: string[] = [];
  const fastFonts: FontFaceSetLike = {
    check: () => false,
    load: async (descriptor) => {
      loadedDescriptors.push(descriptor);
      return [{ family: descriptor }];
    },
  };

  const status = await loadWebFontsWithBudget(fastFonts, { timeoutMs: 250 });
  assert.equal(status, 'loaded');
  assert.equal(loadedDescriptors.length, CRITICAL_FONT_DESCRIPTORS.length);
});

test('loadWebFontsWithBudget returns fallback on timeout and triggers background cache hook once fonts finish', async () => {
  let backgroundCached = false;
  let resolveSlow!: () => void;

  const slowFonts: FontFaceSetLike = {
    check: () => false,
    load: () =>
      new Promise<unknown[]>((resolve) => {
        resolveSlow = () => resolve([{ family: 'Plus Jakarta Sans' }]);
      }),
  };

  const status = await loadWebFontsWithBudget(slowFonts, {
    timeoutMs: 25,
    descriptors: ['400 1em "Plus Jakarta Sans"'],
    onBackgroundCache: () => {
      backgroundCached = true;
    },
  });

  assert.equal(status, 'fallback');
  assert.equal(backgroundCached, false);

  // Simulate fonts finishing in background for future visits
  resolveSlow();
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(backgroundCached, true);
});

test('loadWebFontsWithBudget falls back gracefully on network error or missing FontFaceSet', async () => {
  assert.equal(await loadWebFontsWithBudget(null), 'system');

  const failingFonts: FontFaceSetLike = {
    check: () => false,
    load: async () => {
      throw new Error('Network offline');
    },
  };
  assert.equal(await loadWebFontsWithBudget(failingFonts, { timeoutMs: 100 }), 'fallback');
});
