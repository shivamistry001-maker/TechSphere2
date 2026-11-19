/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const FONT_CACHE_STORAGE_KEY = 'techsphere_fonts_loaded_v1';
export const FONTS_LOADED_CLASS = 'ts-fonts-loaded';
export const DEFAULT_FONT_SWAP_TIMEOUT_MS = 3000;

export const GOOGLE_FONTS_STYLESHEET_URL =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap';

export type FontLoadingStatus = 'system' | 'loading' | 'loaded' | 'fallback';

/**
 * Calibrated metric overrides matching Plus Jakarta Sans and Outfit OpenType tables
 * against standard local sans-serif fallbacks to minimize Cumulative Layout Shift (CLS).
 */
export const FONT_FALLBACK_METRICS = {
  plusJakartaSans: {
    fallbackFamily: 'Plus Jakarta Sans Fallback',
    sizeAdjust: 104.5,
    ascentOverride: 95,
    descentOverride: 26,
    lineGapOverride: 0,
  },
  outfit: {
    fallbackFamily: 'Outfit Fallback',
    sizeAdjust: 103.5,
    ascentOverride: 97,
    descentOverride: 24,
    lineGapOverride: 0,
  },
} as const;

export const CRITICAL_FONT_DESCRIPTORS: readonly string[] = [
  '400 1em "Plus Jakarta Sans"',
  '600 1em "Plus Jakarta Sans"',
  '700 1em "Plus Jakarta Sans"',
  '600 1em "Outfit"',
  '700 1em "Outfit"',
  '800 1em "Outfit"',
];

export interface FontFaceSetLike {
  load(font: string, text?: string): Promise<unknown[]>;
  check?(font: string, text?: string): boolean;
  ready?: Promise<unknown>;
}

/**
 * Resolves initial font loading status before async webfont fetch completes.
 */
export function resolveInitialFontStatus(params: {
  isWarmCached: boolean;
  supportsFontLoadingApi: boolean;
}): FontLoadingStatus {
  if (params.isWarmCached) return 'loaded';
  return params.supportsFontLoadingApi ? 'loading' : 'system';
}

/**
 * Checks whether all critical webfont descriptors are already available in the browser.
 */
export function areCriticalFontsReady(
  fontFaceSet: Pick<FontFaceSetLike, 'check'> | null | undefined,
  descriptors: readonly string[] = CRITICAL_FONT_DESCRIPTORS
): boolean {
  if (!fontFaceSet || typeof fontFaceSet.check !== 'function') {
    return false;
  }
  return descriptors.every((descriptor) => {
    try {
      return fontFaceSet.check!(descriptor);
    } catch {
      return false;
    }
  });
}

export interface LoadWebFontsOptions {
  timeoutMs?: number;
  descriptors?: readonly string[];
  onBackgroundCache?: () => void;
}

/**
 * Loads Plus Jakarta Sans and Outfit asynchronously within a strict time budget.
 * - Resolves 'loaded' if fonts complete within timeoutMs (zero late layout shift).
 * - Resolves 'fallback' if fonts time out or fail, keeping metric-matched system fallbacks active.
 * - Optionally notifies `onBackgroundCache` if slow fonts finish caching after timeout so
 *   subsequent page loads can activate webfonts immediately.
 */
export async function loadWebFontsWithBudget(
  fontFaceSet: FontFaceSetLike | null | undefined,
  options: LoadWebFontsOptions = {}
): Promise<FontLoadingStatus> {
  if (!fontFaceSet || typeof fontFaceSet.load !== 'function') {
    return 'system';
  }

  const timeoutMs =
    typeof options.timeoutMs === 'number' && Number.isFinite(options.timeoutMs) && options.timeoutMs >= 0
      ? options.timeoutMs
      : DEFAULT_FONT_SWAP_TIMEOUT_MS;
  const descriptors = options.descriptors ?? CRITICAL_FONT_DESCRIPTORS;

  if (areCriticalFontsReady(fontFaceSet, descriptors)) {
    return 'loaded';
  }

  let timedOut = false;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const loadPromise = Promise.all(
    descriptors.map((descriptor) => fontFaceSet.load(descriptor))
  )
    .then((results) => {
      // Ensure at least one face actually resolved per descriptor when browsers return arrays
      const hasLoadedFaces = results.some((faces) => Array.isArray(faces) && faces.length > 0);
      if (hasLoadedFaces && timedOut && options.onBackgroundCache) {
        options.onBackgroundCache();
      }
      return hasLoadedFaces ? ('loaded' as const) : ('fallback' as const);
    })
    .catch(() => 'fallback' as const);

  const timeoutPromise = new Promise<FontLoadingStatus>((resolve) => {
    timerId = setTimeout(() => {
      timedOut = true;
      resolve('fallback');
    }, timeoutMs);
  });

  const outcome = await Promise.race([loadPromise, timeoutPromise]);
  if (timerId !== null) {
    clearTimeout(timerId);
  }
  return outcome;
}

function writeFontCacheFlag(): void {
  try {
    window.sessionStorage.setItem(FONT_CACHE_STORAGE_KEY, '1');
  } catch {
    // Ignore storage restriction errors (private browsing / sandboxed iframes)
  }
}

function readFontCacheFlag(): boolean {
  try {
    return window.sessionStorage.getItem(FONT_CACHE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function applyDocumentFontStatus(status: FontLoadingStatus): void {
  const root = document.documentElement;
  root.setAttribute('data-fonts-status', status);
  if (status === 'loaded') {
    root.classList.add(FONTS_LOADED_CLASS);
  } else {
    root.classList.remove(FONTS_LOADED_CLASS);
  }
}

/**
 * Ensures the asynchronous Google Fonts stylesheet link is activated and waits
 * for stylesheet application without blocking First Contentful Paint.
 */
function ensureAsyncStylesheetReady(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLLinkElement>('link[data-ts-fonts="google"]');
    if (!existing) {
      resolve();
      return;
    }

    if (existing.media === 'all' && existing.sheet) {
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (existing.media !== 'all') {
        existing.media = 'all';
      }
      resolve();
    };

    existing.addEventListener('load', finish, { once: true });
    existing.addEventListener('error', finish, { once: true });

    // If the link already finished loading before our listener attached
    if (existing.sheet) {
      finish();
      return;
    }

    window.setTimeout(finish, timeoutMs);
  });
}

let initialized = false;

/**
 * Initializes TechSphere's non-blocking, zero-CLS font-display strategy.
 * Safe to call once on app bootstrap in `src/main.tsx`.
 */
export function initFontLoadingStrategy(
  timeoutMs: number = DEFAULT_FONT_SWAP_TIMEOUT_MS
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined' || initialized) {
    return;
  }
  initialized = true;

  const isWarmCached = readFontCacheFlag();
  const supportsFontLoadingApi = typeof document.fonts !== 'undefined' && typeof document.fonts.load === 'function';
  const initialStatus = resolveInitialFontStatus({ isWarmCached, supportsFontLoadingApi });

  applyDocumentFontStatus(initialStatus);

  if (!supportsFontLoadingApi) {
    return;
  }

  void ensureAsyncStylesheetReady(timeoutMs).then(async () => {
    const result = await loadWebFontsWithBudget(document.fonts as unknown as FontFaceSetLike, {
      timeoutMs,
      onBackgroundCache: writeFontCacheFlag,
    });

    if (result === 'loaded') {
      writeFontCacheFlag();
      applyDocumentFontStatus('loaded');
    } else if (!isWarmCached) {
      applyDocumentFontStatus(result);
    }
  });
}
