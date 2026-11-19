/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THEME_STORAGE_KEY,
  THEME_TRANSITION_TIMINGS,
  createThemeTransitionState,
  getNextTheme,
  getThemeProgressDurationMs,
  getThemeProgressTotalMs,
  resolveInitialTheme,
  shouldApplyThemeUpdate,
} from './theme.ts';

test('theme storage key preserves existing v2 key', () => {
  assert.equal(THEME_STORAGE_KEY, 'techsphere_theme_v2');
});

test('resolveInitialTheme validates saved values and applies fallback', () => {
  assert.equal(resolveInitialTheme('dark'), 'dark');
  assert.equal(resolveInitialTheme('light'), 'light');
  assert.equal(resolveInitialTheme(null), 'light');
  assert.equal(resolveInitialTheme(undefined), 'light');
  assert.equal(resolveInitialTheme('system'), 'light');
  assert.equal(resolveInitialTheme('invalid', 'dark'), 'dark');
});

test('getNextTheme toggles symmetrically and rapid even/odd clicks stay deterministic', () => {
  assert.equal(getNextTheme('light'), 'dark');
  assert.equal(getNextTheme('dark'), 'light');

  let state: 'light' | 'dark' = 'light';
  for (let i = 0; i < 6; i += 1) {
    state = getNextTheme(state);
  }
  assert.equal(state, 'light');

  state = getNextTheme(state);
  assert.equal(state, 'dark');
});

test('shouldApplyThemeUpdate skips duplicate theme writes', () => {
  assert.equal(shouldApplyThemeUpdate('dark', 'dark'), false);
  assert.equal(shouldApplyThemeUpdate('light', 'light'), false);
  assert.equal(shouldApplyThemeUpdate('dark', 'light'), true);
  assert.equal(shouldApplyThemeUpdate(null, 'dark'), true);
});

test('theme transition timings stay within optimal performance windows', () => {
  assert.ok(
    THEME_TRANSITION_TIMINGS.backgroundMs >= 350 &&
      THEME_TRANSITION_TIMINGS.backgroundMs <= 450
  );
  assert.ok(
    THEME_TRANSITION_TIMINGS.textAndBorderMs >= 250 &&
      THEME_TRANSITION_TIMINGS.textAndBorderMs <= 350
  );
  assert.ok(
    THEME_TRANSITION_TIMINGS.shadowAndOpacityMs >= 300 &&
      THEME_TRANSITION_TIMINGS.shadowAndOpacityMs <= 400
  );
  assert.equal(THEME_TRANSITION_TIMINGS.easing, 'cubic-bezier(0.22, 1, 0.36, 1)');
});

test('theme transition progress indicator timings match background transition and honor reduced motion', () => {
  assert.equal(getThemeProgressDurationMs(false), THEME_TRANSITION_TIMINGS.backgroundMs);
  assert.equal(
    getThemeProgressTotalMs(false),
    THEME_TRANSITION_TIMINGS.backgroundMs + THEME_TRANSITION_TIMINGS.progressFadeOutMs
  );
  assert.equal(getThemeProgressDurationMs(true), 0);
  assert.equal(getThemeProgressTotalMs(true), 0);
});

test('createThemeTransitionState increments runId cleanly for rapid toggles and disables on reduced motion', () => {
  const first = createThemeTransitionState(0, 'dark', false);
  assert.equal(first.active, true);
  assert.equal(first.runId, 1);
  assert.equal(first.targetTheme, 'dark');
  assert.equal(first.durationMs, THEME_TRANSITION_TIMINGS.backgroundMs);

  const second = createThemeTransitionState(first.runId, 'light', false);
  assert.equal(second.active, true);
  assert.equal(second.runId, 2);
  assert.equal(second.targetTheme, 'light');

  const reduced = createThemeTransitionState(second.runId, 'dark', true);
  assert.equal(reduced.active, false);
  assert.equal(reduced.runId, 3);
  assert.equal(reduced.totalMs, 0);
});
