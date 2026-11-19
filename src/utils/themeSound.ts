/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeMode } from '../types.ts';

export interface ThemeClickSoundProfile {
  startFreqHz: number;
  endFreqHz: number;
  filterFreqHz: number;
  peakGain: number;
  attackSec: number;
  durationSec: number;
  oscillatorType: OscillatorType;
}

export const THEME_CLICK_MIN_INTERVAL_MS = 30;

/**
 * Subtle, non-intrusive tactile click sound profiles synthesized via Web Audio API.
 * Dark mode uses a slightly warmer downward micro-detent; Light mode uses a crisp upward tick.
 * Peak gain is intentionally restrained (~0.048-0.052) with a smooth attack/decay to avoid pops.
 */
export const THEME_CLICK_SOUND_PROFILES: Record<ThemeMode, ThemeClickSoundProfile> = {
  dark: {
    startFreqHz: 560,
    endFreqHz: 290,
    filterFreqHz: 1850,
    peakGain: 0.052,
    attackSec: 0.002,
    durationSec: 0.034,
    oscillatorType: 'triangle',
  },
  light: {
    startFreqHz: 660,
    endFreqHz: 940,
    filterFreqHz: 2400,
    peakGain: 0.048,
    attackSec: 0.002,
    durationSec: 0.03,
    oscillatorType: 'sine',
  },
};

export function getThemeClickSoundProfile(targetTheme: ThemeMode): ThemeClickSoundProfile {
  return THEME_CLICK_SOUND_PROFILES[targetTheme];
}

export function canTriggerThemeClickSound(
  nowMs: number,
  lastTriggeredMs: number,
  minIntervalMs: number = THEME_CLICK_MIN_INTERVAL_MS
): boolean {
  if (lastTriggeredMs <= 0) return true;
  return nowMs - lastTriggeredMs >= minIntervalMs;
}

type AudioContextConstructor = new () => AudioContext;

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: AudioContextConstructor;
}

let sharedAudioContext: AudioContext | null = null;
let lastClickTimeMs = 0;

function getOrCreateAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (sharedAudioContext && sharedAudioContext.state !== 'closed') {
    return sharedAudioContext;
  }

  const win = window as WindowWithWebkitAudio;
  const AudioCtx = window.AudioContext ?? win.webkitAudioContext;
  if (!AudioCtx) return null;

  sharedAudioContext = new AudioCtx();
  return sharedAudioContext;
}

export interface PlayThemeClickOptions {
  audioContext?: AudioContext | null;
  nowMs?: number;
  bypassThrottle?: boolean;
}

/**
 * Plays a minimal-latency synthesized UI click sound using the Web Audio API.
 * Must be invoked directly within a user gesture handler (e.g., button click).
 * Fails silently in unsupported or restricted audio environments.
 */
export function playThemeToggleClickSound(
  targetTheme: ThemeMode,
  options: PlayThemeClickOptions = {}
): boolean {
  try {
    const nowMs = options.nowMs ?? (typeof performance !== 'undefined' ? performance.now() : Date.now());
    if (!options.bypassThrottle && !canTriggerThemeClickSound(nowMs, lastClickTimeMs)) {
      return false;
    }

    const ctx = options.audioContext !== undefined ? options.audioContext : getOrCreateAudioContext();
    if (!ctx || ctx.state === 'closed') {
      return false;
    }

    if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
      void ctx.resume().catch(() => {
        // Ignore browser autoplay restrictions silently
      });
    }

    const profile = getThemeClickSoundProfile(targetTheme);
    const startTime = ctx.currentTime;
    const attackEnd = startTime + profile.attackSec;
    const stopTime = startTime + profile.durationSec;

    const oscillator = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    oscillator.type = profile.oscillatorType;
    oscillator.frequency.setValueAtTime(profile.startFreqHz, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(profile.endFreqHz, stopTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(profile.filterFreqHz, startTime);
    filter.Q.setValueAtTime(0.7, startTime);

    // Smooth micro-envelope prevents speaker pop artifacts on start and stop
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(profile.peakGain, attackEnd);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.onended = () => {
      try {
        oscillator.disconnect();
        filter.disconnect();
        gainNode.disconnect();
      } catch {
        // Ignore cleanup errors if context was closed
      }
    };

    oscillator.start(startTime);
    oscillator.stop(stopTime + 0.005);

    lastClickTimeMs = nowMs;
    return true;
  } catch {
    return false;
  }
}
