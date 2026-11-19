/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeMode } from '../types.ts';

export const THEME_STORAGE_KEY = 'techsphere_theme_v2';
export const THEME_TRANSITION_ATTR = 'data-theme-transition';
export const THEME_TRANSITION_ACTIVE_VALUE = 'active';

export const THEME_TRANSITION_TIMINGS = {
  backgroundMs: 380,
  textAndBorderMs: 280,
  shadowAndOpacityMs: 340,
  progressFadeOutMs: 140,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export interface ApplyThemeOptions {
  /**
   * When true, activates CSS-variable-driven transition durations synchronously
   * in the same style frame as the theme switch (no requestAnimationFrame needed).
   */
  animate?: boolean;
}

export interface ThemeCssVariables {
  '--ts-theme-dur-bg': string;
  '--ts-theme-dur-text': string;
  '--ts-theme-dur-shadow': string;
  '--ts-theme-ease': string;
}

export interface ThemeTransitionRunState {
  active: boolean;
  runId: number;
  targetTheme: ThemeMode;
  durationMs: number;
  totalMs: number;
}

/**
 * Returns the CSS custom property values governing theme transition timings.
 * Defaults to 0ms when not actively transitioning so initial paint and idle browsing
 * incur zero transition or post-FCP style-invalidation overhead.
 */
export function getThemeCssVariables(animate: boolean): ThemeCssVariables {
  if (!animate) {
    return {
      '--ts-theme-dur-bg': '0ms',
      '--ts-theme-dur-text': '0ms',
      '--ts-theme-dur-shadow': '0ms',
      '--ts-theme-ease': THEME_TRANSITION_TIMINGS.easing,
    };
  }
  return {
    '--ts-theme-dur-bg': `${THEME_TRANSITION_TIMINGS.backgroundMs}ms`,
    '--ts-theme-dur-text': `${THEME_TRANSITION_TIMINGS.textAndBorderMs}ms`,
    '--ts-theme-dur-shadow': `${THEME_TRANSITION_TIMINGS.shadowAndOpacityMs}ms`,
    '--ts-theme-ease': THEME_TRANSITION_TIMINGS.easing,
  };
}

/**
 * Returns the sweep duration (in ms) for the global top theme progress indicator.
 * Respects prefers-reduced-motion by returning 0ms when reduced motion is enabled.
 */
export function getThemeProgressDurationMs(prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? 0 : THEME_TRANSITION_TIMINGS.backgroundMs;
}

/**
 * Returns total lifecycle duration (sweep + subtle fade-out) for the top progress indicator.
 */
export function getThemeProgressTotalMs(prefersReducedMotion: boolean): number {
  if (prefersReducedMotion) return 0;
  return THEME_TRANSITION_TIMINGS.backgroundMs + THEME_TRANSITION_TIMINGS.progressFadeOutMs;
}

/**
 * Computes the next global theme transition progress state.
 * Monotonically increments runId so rapid repeated clicks cleanly restart the GPU sweep.
 */
export function createThemeTransitionState(
  previousRunId: number,
  targetTheme: ThemeMode,
  prefersReducedMotion: boolean
): ThemeTransitionRunState {
  const durationMs = getThemeProgressDurationMs(prefersReducedMotion);
  const totalMs = getThemeProgressTotalMs(prefersReducedMotion);
  return {
    active: totalMs > 0,
    runId: previousRunId + 1,
    targetTheme,
    durationMs,
    totalMs,
  };
}

/**
 * Safely resolves a persisted theme string to a valid ThemeMode.
 */
export function resolveInitialTheme(
  savedValue: string | null | undefined,
  fallback: ThemeMode = 'light'
): ThemeMode {
  if (savedValue === 'dark' || savedValue === 'light') {
    return savedValue;
  }
  return fallback;
}

/**
 * Returns the opposite theme mode.
 */
export function getNextTheme(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

/**
 * Prevents redundant DOM mutations when the target theme is already applied.
 */
export function shouldApplyThemeUpdate(
  currentApplied: string | null | undefined,
  nextTheme: ThemeMode
): boolean {
  return currentApplied !== nextTheme;
}

/**
 * Safely reads the stored theme preference from browser storage.
 */
export function readStoredTheme(fallback: ThemeMode = 'light'): ThemeMode {
  if (typeof window === 'undefined') return fallback;
  try {
    return resolveInitialTheme(window.localStorage.getItem(THEME_STORAGE_KEY), fallback);
  } catch {
    return fallback;
  }
}

/**
 * Safely writes the theme preference to browser storage.
 */
export function persistTheme(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(THEME_STORAGE_KEY) !== theme) {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

export const THEME_TRANSITION_CLEANUP_FALLBACK_MS = 1200;

/**
 * Clears the active CSS-variable theme transition attribute after a theme switch finishes.
 * Returns true if the attribute was present and removed, false when already idle.
 */
export function clearThemeTransitionState(root?: HTMLElement | null): boolean {
  const target = root ?? (typeof document !== 'undefined' ? document.documentElement : null);
  if (!target || !target.hasAttribute(THEME_TRANSITION_ATTR)) {
    return false;
  }
  target.removeAttribute(THEME_TRANSITION_ATTR);
  return true;
}

/**
 * Schedules removal of data-theme-transition="active" as soon as the root element's
 * longest transition (`background-color`, 380ms) emits `transitionend`, with a
 * safety fallback timer for backgrounded tabs or interrupted transitions.
 * Returns a disposer to cancel pending cleanup on rapid consecutive toggles or unmount.
 */
export function scheduleThemeTransitionCleanup(
  root?: HTMLElement | null,
  fallbackMs: number = THEME_TRANSITION_CLEANUP_FALLBACK_MS
): () => void {
  const target = root ?? (typeof document !== 'undefined' ? document.documentElement : null);
  if (!target) return () => {};

  let done = false;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const cleanup = () => {
    if (done) return;
    done = true;
    target.removeEventListener('transitionend', onTransitionEnd as EventListener);
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  const finish = () => {
    cleanup();
    clearThemeTransitionState(target);
  };

  const onTransitionEnd = (event: TransitionEvent) => {
    if (event.target === target && event.propertyName === 'background-color') {
      finish();
    }
  };

  target.addEventListener('transitionend', onTransitionEnd as EventListener);
  timerId = setTimeout(finish, fallbackMs);

  return cleanup;
}

/**
 * Synchronizes document root classes, data-theme attribute, color-scheme, and optional
 * CSS-variable transition activation in a single synchronous write batch — eliminating
 * requestAnimationFrame scheduling, forced reflows, and post-paint useEffect desyncs.
 */
export function applyThemeToDocument(
  theme: ThemeMode,
  root?: HTMLElement | null,
  options: ApplyThemeOptions = {}
): boolean {
  const target = root ?? (typeof document !== 'undefined' ? document.documentElement : null);
  if (!target) return false;

  const currentAttr = target.getAttribute('data-theme');
  const hasMatchingClass = target.classList.contains(theme);
  const oppositeTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
  const hasOppositeClass = target.classList.contains(oppositeTheme);

  if (!shouldApplyThemeUpdate(currentAttr, theme) && hasMatchingClass && !hasOppositeClass) {
    return false;
  }

  if (options.animate === true) {
    if (target.getAttribute(THEME_TRANSITION_ATTR) !== THEME_TRANSITION_ACTIVE_VALUE) {
      target.setAttribute(THEME_TRANSITION_ATTR, THEME_TRANSITION_ACTIVE_VALUE);
    }
  } else if (options.animate === false) {
    target.removeAttribute(THEME_TRANSITION_ATTR);
  }

  target.classList.toggle('dark', theme === 'dark');
  target.classList.toggle('light', theme === 'light');
  target.setAttribute('data-theme', theme);
  target.style.colorScheme = theme;
  return true;
}
