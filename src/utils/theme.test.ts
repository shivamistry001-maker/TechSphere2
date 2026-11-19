/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THEME_STORAGE_KEY,
  THEME_TRANSITION_ACTIVE_VALUE,
  THEME_TRANSITION_ATTR,
  THEME_TRANSITION_TIMINGS,
  applyThemeToDocument,
  clearThemeTransitionState,
  createThemeTransitionState,
  getNextTheme,
  getThemeCssVariables,
  getThemeProgressDurationMs,
  getThemeProgressTotalMs,
  resolveInitialTheme,
  scheduleThemeTransitionCleanup,
  shouldApplyThemeUpdate,
} from './theme.ts';

function createMockRootElement() {
  const attrs = new Map<string, string>();
  const classes = new Set<string>();
  const listeners = new Map<string, Set<(event: unknown) => void>>();
  const mock = {
    attrs,
    classes,
    style: { colorScheme: '' },
    getAttribute: (name: string) => attrs.get(name) ?? null,
    setAttribute: (name: string, value: string) => {
      attrs.set(name, value);
    },
    hasAttribute: (name: string) => attrs.has(name),
    removeAttribute: (name: string) => {
      attrs.delete(name);
    },
    addEventListener: (type: string, fn: (event: unknown) => void) => {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(fn);
    },
    removeEventListener: (type: string, fn: (event: unknown) => void) => {
      listeners.get(type)?.delete(fn);
    },
    dispatch: (type: string, event: Record<string, unknown>) => {
      for (const fn of [...(listeners.get(type) ?? [])]) {
        fn(event);
      }
    },
    listenerCount: (type: string) => listeners.get(type)?.size ?? 0,
    classList: {
      contains: (cls: string) => classes.has(cls),
      toggle: (cls: string, force?: boolean) => {
        if (force === undefined) {
          if (classes.has(cls)) {
            classes.delete(cls);
            return false;
          }
          classes.add(cls);
          return true;
        }
        if (force) {
          classes.add(cls);
        } else {
          classes.delete(cls);
        }
        return force;
      },
    },
  };
  return mock;
}

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

test('getThemeCssVariables returns 0ms when idle and active durations when animating', () => {
  const idle = getThemeCssVariables(false);
  assert.equal(idle['--ts-theme-dur-bg'], '0ms');
  assert.equal(idle['--ts-theme-dur-text'], '0ms');
  assert.equal(idle['--ts-theme-dur-shadow'], '0ms');

  const active = getThemeCssVariables(true);
  assert.equal(active['--ts-theme-dur-bg'], `${THEME_TRANSITION_TIMINGS.backgroundMs}ms`);
  assert.equal(active['--ts-theme-dur-text'], `${THEME_TRANSITION_TIMINGS.textAndBorderMs}ms`);
  assert.equal(active['--ts-theme-dur-shadow'], `${THEME_TRANSITION_TIMINGS.shadowAndOpacityMs}ms`);
  assert.equal(active['--ts-theme-ease'], THEME_TRANSITION_TIMINGS.easing);
});

test('applyThemeToDocument and clearThemeTransitionState synchronize root attributes cleanly', () => {
  const root = createMockRootElement();

  // Initial sync without animation (no transition flag set)
  assert.equal(applyThemeToDocument('light', root as unknown as HTMLElement), true);
  assert.equal(root.getAttribute('data-theme'), 'light');
  assert.equal(root.classList.contains('light'), true);
  assert.equal(root.hasAttribute(THEME_TRANSITION_ATTR), false);

  // Duplicate write skipped cleanly
  assert.equal(applyThemeToDocument('light', root as unknown as HTMLElement), false);

  // User toggle activates CSS-variable transitions synchronously in the same write batch
  assert.equal(
    applyThemeToDocument('dark', root as unknown as HTMLElement, { animate: true }),
    true
  );
  assert.equal(root.getAttribute('data-theme'), 'dark');
  assert.equal(root.classList.contains('dark'), true);
  assert.equal(root.classList.contains('light'), false);
  assert.equal(root.getAttribute(THEME_TRANSITION_ATTR), THEME_TRANSITION_ACTIVE_VALUE);
  assert.equal(root.style.colorScheme, 'dark');

  // Cleanup clears active attribute idempotently
  assert.equal(clearThemeTransitionState(root as unknown as HTMLElement), true);
  assert.equal(root.hasAttribute(THEME_TRANSITION_ATTR), false);
  assert.equal(clearThemeTransitionState(root as unknown as HTMLElement), false);

  // Reduced-motion toggle keeps transition attribute cleared
  assert.equal(
    applyThemeToDocument('light', root as unknown as HTMLElement, { animate: false }),
    true
  );
  assert.equal(root.hasAttribute(THEME_TRANSITION_ATTR), false);
});

test('scheduleThemeTransitionCleanup waits for root background-color transitionend and supports cancellation', async () => {
  const root = createMockRootElement();
  applyThemeToDocument('dark', root as unknown as HTMLElement, { animate: true });
  assert.equal(root.getAttribute(THEME_TRANSITION_ATTR), THEME_TRANSITION_ACTIVE_VALUE);

  const cancel = scheduleThemeTransitionCleanup(root as unknown as HTMLElement, 500);
  assert.equal(root.listenerCount('transitionend'), 1);

  // Bubbled child transitionend or non-background-color events must be ignored
  root.dispatch('transitionend', { target: {}, propertyName: 'background-color' });
  root.dispatch('transitionend', { target: root, propertyName: 'color' });
  assert.equal(root.getAttribute(THEME_TRANSITION_ATTR), THEME_TRANSITION_ACTIVE_VALUE);

  // Root background-color transitionend clears the attribute and detaches listener
  root.dispatch('transitionend', { target: root, propertyName: 'background-color' });
  assert.equal(root.hasAttribute(THEME_TRANSITION_ATTR), false);
  assert.equal(root.listenerCount('transitionend'), 0);
  cancel();

  // Rapid-toggle disposer cancels previous cleanup before fallback fires
  applyThemeToDocument('light', root as unknown as HTMLElement, { animate: true });
  const cancelRapid = scheduleThemeTransitionCleanup(root as unknown as HTMLElement, 30);
  cancelRapid();
  assert.equal(root.listenerCount('transitionend'), 0);
  await new Promise((resolve) => setTimeout(resolve, 45));
  assert.equal(root.getAttribute(THEME_TRANSITION_ATTR), THEME_TRANSITION_ACTIVE_VALUE);

  // Fallback timer clears attribute if transitionend never fires (e.g. backgrounded tab)
  scheduleThemeTransitionCleanup(root as unknown as HTMLElement, 25);
  await new Promise((resolve) => setTimeout(resolve, 45));
  assert.equal(root.hasAttribute(THEME_TRANSITION_ATTR), false);
});

test('App.tsx eliminates requestAnimationFrame and index.css defaults theme transition durations to 0ms', () => {
  const appSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/App.tsx'), 'utf8');
  const cssSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/index.css'), 'utf8');

  assert.equal(
    /requestAnimationFrame/.test(appSrc),
    false,
    'App.tsx should not rely on requestAnimationFrame for theme transitions'
  );
  assert.equal(
    /ts-theme-ready/.test(appSrc) || /ts-theme-ready/.test(cssSrc),
    false,
    'Legacy ts-theme-ready class should be fully replaced by CSS-variable transition activation'
  );
  assert.match(
    cssSrc,
    /:root\s*\{[\s\S]*?--ts-theme-dur-bg:\s*0ms;/,
    ':root should default --ts-theme-dur-bg to 0ms for zero startup reflow/flash'
  );
  assert.match(
    cssSrc,
    /:root\[data-theme-transition="active"\]\s*\{[\s\S]*?--ts-theme-dur-bg:\s*380ms;/,
    'Active theme transition attribute should enable 380ms background transitions via CSS variables'
  );
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
