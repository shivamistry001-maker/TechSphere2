/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeMode } from '../types.ts';

export const THEME_STORAGE_KEY = 'techsphere_theme_v2';

export const THEME_TRANSITION_TIMINGS = {
  backgroundMs: 380,
  textAndBorderMs: 280,
  shadowAndOpacityMs: 340,
  progressFadeOutMs: 140,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export interface ThemeTransitionRunState {
  active: boolean;
  runId: number;
  targetTheme: ThemeMode;
  durationMs: number;
  totalMs: number;
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

/**
 * Synchronizes document root classes, data-theme attribute, and color-scheme
 * without triggering duplicate DOM mutations or layout reads.
 */
export function applyThemeToDocument(theme: ThemeMode, root?: HTMLElement | null): boolean {
  const target = root ?? (typeof document !== 'undefined' ? document.documentElement : null);
  if (!target) return false;

  const currentAttr = target.getAttribute('data-theme');
  const hasMatchingClass = target.classList.contains(theme);
  const oppositeTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
  const hasOppositeClass = target.classList.contains(oppositeTheme);

  if (!shouldApplyThemeUpdate(currentAttr, theme) && hasMatchingClass && !hasOppositeClass) {
    return false;
  }

  target.classList.toggle('dark', theme === 'dark');
  target.classList.toggle('light', theme === 'light');
  target.setAttribute('data-theme', theme);
  target.style.colorScheme = theme;
  return true;
}
