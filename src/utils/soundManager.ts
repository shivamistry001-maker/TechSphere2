/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeMode } from '../types.ts';

export const SOUND_PREFS_STORAGE_KEY = 'techsphere_sound_prefs_v2';

export type SoundId =
  | 'ui-click'
  | 'ui-click-secondary'
  | 'ui-click-icon'
  | 'ui-click-contact'
  | 'ui-click-download'
  | 'ui-hover'
  | 'ui-open'
  | 'ui-close'
  | 'ui-success'
  | 'ui-error'
  | 'navigation-transition'
  | 'theme-switch'
  | 'wheel-start'
  | 'wheel-tick'
  | 'wheel-stop'
  | 'wheel-result';

export const CORE_SOUND_CATEGORIES = [
  'ui-click',
  'ui-hover',
  'ui-open',
  'ui-close',
  'ui-success',
  'ui-error',
  'navigation-transition',
  'theme-switch',
  'wheel-start',
  'wheel-tick',
  'wheel-stop',
  'wheel-result',
] as const;

export interface SoundPreferences {
  enabled: boolean;
  volume: number; // 0.0 to 1.0
}

export const DEFAULT_SOUND_PREFERENCES: SoundPreferences = {
  enabled: false,
  volume: 0.7, // 70% balanced default level when enabled
};

export interface ToneStep {
  delaySec?: number;
  startFreqHz: number;
  endFreqHz: number;
  filterFreqHz: number;
  filterType?: BiquadFilterType;
  filterQ?: number;
  peakGain: number;
  attackSec: number;
  durationSec: number;
  oscillatorType: OscillatorType;
}

export interface SoundDefinition {
  id: SoundId;
  minIntervalMs: number;
  steps: readonly ToneStep[];
}

export type FormFeedbackEvent =
  | 'submit'
  | 'validation-error'
  | 'submission-error'
  | 'success';

export interface FormSubmissionSnapshot {
  submitting: boolean;
  succeeded: boolean;
  hasErrors: boolean;
  explicitSubmitPending: boolean;
}

export interface PlaySoundOptions {
  theme?: ThemeMode;
  audioContext?: AudioContext | null;
  nowMs?: number;
  bypassThrottle?: boolean;
  bypassEnabledCheck?: boolean;
  /** Optional subtle pitch multiplier (e.g. for velocity-mapped wheel ticks) */
  pitchMultiplier?: number;
}

export const MAX_CONCURRENT_VOICES = 4;

/**
 * Curated Apple-like & futuristic SaaS Web Audio synthesis library.
 * Every sound is short (< 0.45s), soft (low peakGain), lowpass-filtered, and micro-enveloped
 * to eliminate pops, harshness, and ear fatigue.
 */
export const SOUND_LIBRARY: Record<SoundId, SoundDefinition> = {
  // Primary CTA & Navbar link — soft tactile glass click
  'ui-click': {
    id: 'ui-click',
    minIntervalMs: 40,
    steps: [
      {
        startFreqHz: 780,
        endFreqHz: 520,
        filterFreqHz: 2200,
        peakGain: 0.044,
        attackSec: 0.002,
        durationSec: 0.028,
        oscillatorType: 'triangle',
      },
    ],
  },
  // Secondary button — lighter, airier tap
  'ui-click-secondary': {
    id: 'ui-click-secondary',
    minIntervalMs: 40,
    steps: [
      {
        startFreqHz: 940,
        endFreqHz: 720,
        filterFreqHz: 2400,
        peakGain: 0.032,
        attackSec: 0.0018,
        durationSec: 0.022,
        oscillatorType: 'sine',
      },
    ],
  },
  // Icon button — tiny crisp digital tap
  'ui-click-icon': {
    id: 'ui-click-icon',
    minIntervalMs: 35,
    steps: [
      {
        startFreqHz: 1180,
        endFreqHz: 920,
        filterFreqHz: 2800,
        peakGain: 0.028,
        attackSec: 0.0015,
        durationSec: 0.018,
        oscillatorType: 'sine',
      },
    ],
  },
  // Contact / WhatsApp / Call button — soft warm confirmation click
  'ui-click-contact': {
    id: 'ui-click-contact',
    minIntervalMs: 60,
    steps: [
      {
        startFreqHz: 620,
        endFreqHz: 760,
        filterFreqHz: 2100,
        peakGain: 0.042,
        attackSec: 0.0025,
        durationSec: 0.042,
        oscillatorType: 'sine',
      },
    ],
  },
  // Download button — subtle downward-to-upward transfer start blip
  'ui-click-download': {
    id: 'ui-click-download',
    minIntervalMs: 80,
    steps: [
      {
        startFreqHz: 680,
        endFreqHz: 540,
        filterFreqHz: 2000,
        peakGain: 0.036,
        attackSec: 0.002,
        durationSec: 0.045,
        oscillatorType: 'sine',
      },
      {
        delaySec: 0.038,
        startFreqHz: 540,
        endFreqHz: 820,
        filterFreqHz: 2300,
        peakGain: 0.034,
        attackSec: 0.002,
        durationSec: 0.055,
        oscillatorType: 'sine',
      },
    ],
  },
  // Primary nav links & main action cards — very subtle, high-frequency crystalline hover tick
  'ui-hover': {
    id: 'ui-hover',
    minIntervalMs: 85,
    steps: [
      {
        startFreqHz: 2450,
        endFreqHz: 1980,
        filterFreqHz: 4600,
        filterType: 'lowpass',
        filterQ: 0.75,
        peakGain: 0.014,
        attackSec: 0.0012,
        durationSec: 0.018,
        oscillatorType: 'sine',
      },
    ],
  },
  // Dropdown / Mobile Drawer / Modal open — gentle airy glass pop
  'ui-open': {
    id: 'ui-open',
    minIntervalMs: 70,
    steps: [
      {
        startFreqHz: 460,
        endFreqHz: 760,
        filterFreqHz: 2200,
        peakGain: 0.04,
        attackSec: 0.004,
        durationSec: 0.068,
        oscillatorType: 'sine',
      },
      {
        delaySec: 0.02,
        startFreqHz: 920,
        endFreqHz: 1180,
        filterFreqHz: 2800,
        peakGain: 0.018,
        attackSec: 0.003,
        durationSec: 0.055,
        oscillatorType: 'sine',
      },
    ],
  },
  // Dropdown / Mobile Drawer / Modal close — gentle retracting click
  'ui-close': {
    id: 'ui-close',
    minIntervalMs: 70,
    steps: [
      {
        startFreqHz: 680,
        endFreqHz: 410,
        filterFreqHz: 1750,
        peakGain: 0.036,
        attackSec: 0.003,
        durationSec: 0.058,
        oscillatorType: 'sine',
      },
    ],
  },
  // Form submission success / Wizard recommendation — pleasant soft two-note chime
  'ui-success': {
    id: 'ui-success',
    minIntervalMs: 180,
    steps: [
      {
        startFreqHz: 587.33, // D5
        endFreqHz: 587.33,
        filterFreqHz: 2400,
        peakGain: 0.048,
        attackSec: 0.006,
        durationSec: 0.14,
        oscillatorType: 'sine',
      },
      {
        delaySec: 0.085,
        startFreqHz: 880, // A5
        endFreqHz: 884,
        filterFreqHz: 2800,
        peakGain: 0.052,
        attackSec: 0.006,
        durationSec: 0.22,
        oscillatorType: 'sine',
      },
    ],
  },
  // Form validation / submission error — gentle low-pitched soft notification (never harsh)
  'ui-error': {
    id: 'ui-error',
    minIntervalMs: 160,
    steps: [
      {
        startFreqHz: 320,
        endFreqHz: 240,
        filterFreqHz: 920,
        peakGain: 0.046,
        attackSec: 0.005,
        durationSec: 0.11,
        oscillatorType: 'triangle',
      },
      {
        delaySec: 0.075,
        startFreqHz: 250,
        endFreqHz: 205,
        filterFreqHz: 800,
        peakGain: 0.038,
        attackSec: 0.005,
        durationSec: 0.12,
        oscillatorType: 'sine',
      },
    ],
  },
  // Switching between major pages — very subtle futuristic digital transition shimmer
  'navigation-transition': {
    id: 'navigation-transition',
    minIntervalMs: 140,
    steps: [
      {
        startFreqHz: 520,
        endFreqHz: 780,
        filterFreqHz: 1950,
        peakGain: 0.026,
        attackSec: 0.006,
        durationSec: 0.075,
        oscillatorType: 'sine',
      },
      {
        delaySec: 0.035,
        startFreqHz: 1040,
        endFreqHz: 1240,
        filterFreqHz: 2600,
        peakGain: 0.015,
        attackSec: 0.005,
        durationSec: 0.07,
        oscillatorType: 'sine',
      },
    ],
  },
  // Theme toggle (Dark / Light) — smooth digital shimmer (directional pitch shift via theme option)
  'theme-switch': {
    id: 'theme-switch',
    minIntervalMs: 60,
    steps: [
      {
        startFreqHz: 580,
        endFreqHz: 310,
        filterFreqHz: 1900,
        peakGain: 0.048,
        attackSec: 0.003,
        durationSec: 0.052,
        oscillatorType: 'triangle',
      },
      {
        delaySec: 0.022,
        startFreqHz: 880,
        endFreqHz: 660,
        filterFreqHz: 2400,
        peakGain: 0.022,
        attackSec: 0.004,
        durationSec: 0.07,
        oscillatorType: 'sine',
      },
    ],
  },
  // Homepage wheel spin start — crisp futuristic activation sweep
  'wheel-start': {
    id: 'wheel-start',
    minIntervalMs: 120,
    steps: [
      {
        startFreqHz: 340,
        endFreqHz: 720,
        filterFreqHz: 2100,
        peakGain: 0.05,
        attackSec: 0.005,
        durationSec: 0.095,
        oscillatorType: 'triangle',
      },
      {
        delaySec: 0.03,
        startFreqHz: 720,
        endFreqHz: 1080,
        filterFreqHz: 2600,
        peakGain: 0.024,
        attackSec: 0.004,
        durationSec: 0.075,
        oscillatorType: 'sine',
      },
    ],
  },
  // Homepage wheel segment tick — crisp precision mechanical detent synchronized to wheel rotation
  'wheel-tick': {
    id: 'wheel-tick',
    minIntervalMs: 28,
    steps: [
      {
        startFreqHz: 1020,
        endFreqHz: 640,
        filterFreqHz: 2500,
        peakGain: 0.04,
        attackSec: 0.0012,
        durationSec: 0.019,
        oscillatorType: 'triangle',
      },
    ],
  },
  // Homepage wheel landing stop — soft cushioned settle detent
  'wheel-stop': {
    id: 'wheel-stop',
    minIntervalMs: 80,
    steps: [
      {
        startFreqHz: 420,
        endFreqHz: 220,
        filterFreqHz: 1350,
        peakGain: 0.052,
        attackSec: 0.0025,
        durationSec: 0.068,
        oscillatorType: 'triangle',
      },
    ],
  },
  // Homepage wheel result reveal — premium futuristic harmonic confirmation
  'wheel-result': {
    id: 'wheel-result',
    minIntervalMs: 160,
    steps: [
      {
        startFreqHz: 523.25, // C5
        endFreqHz: 523.25,
        filterFreqHz: 2400,
        peakGain: 0.044,
        attackSec: 0.006,
        durationSec: 0.14,
        oscillatorType: 'sine',
      },
      {
        delaySec: 0.065,
        startFreqHz: 659.25, // E5
        endFreqHz: 659.25,
        filterFreqHz: 2600,
        peakGain: 0.048,
        attackSec: 0.006,
        durationSec: 0.16,
        oscillatorType: 'sine',
      },
      {
        delaySec: 0.13,
        startFreqHz: 1046.5, // C6
        endFreqHz: 1052,
        filterFreqHz: 3100,
        peakGain: 0.052,
        attackSec: 0.008,
        durationSec: 0.25,
        oscillatorType: 'sine',
      },
    ],
  },
};

export function clampVolume(volume: number): number {
  if (!Number.isFinite(volume)) return DEFAULT_SOUND_PREFERENCES.volume;
  return Math.max(0, Math.min(1, Math.round(volume * 100) / 100));
}

export function resolveSoundPreferences(raw: string | null | undefined): SoundPreferences {
  if (!raw) return { ...DEFAULT_SOUND_PREFERENCES };
  try {
    const parsed = JSON.parse(raw) as Partial<SoundPreferences>;
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_SOUND_PREFERENCES.enabled,
      volume: typeof parsed.volume === 'number' ? clampVolume(parsed.volume) : DEFAULT_SOUND_PREFERENCES.volume,
    };
  } catch {
    return { ...DEFAULT_SOUND_PREFERENCES };
  }
}

export function canTriggerSound(
  nowMs: number,
  lastTriggeredMs: number,
  minIntervalMs: number
): boolean {
  if (lastTriggeredMs <= 0) return true;
  return nowMs - lastTriggeredMs >= minIntervalMs;
}

export function getSoundSteps(soundId: SoundId, theme?: ThemeMode): readonly ToneStep[] {
  if (soundId === 'theme-switch' && theme === 'light') {
    return [
      {
        startFreqHz: 640,
        endFreqHz: 940,
        filterFreqHz: 2500,
        peakGain: 0.044,
        attackSec: 0.003,
        durationSec: 0.05,
        oscillatorType: 'sine',
      },
      {
        delaySec: 0.022,
        startFreqHz: 960,
        endFreqHz: 1280,
        filterFreqHz: 2900,
        peakGain: 0.02,
        attackSec: 0.004,
        durationSec: 0.068,
        oscillatorType: 'sine',
      },
    ];
  }
  return SOUND_LIBRARY[soundId].steps;
}

/**
 * Maps explicit form interaction events to their semantic TechSphere sound IDs.
 */
export function resolveFormFeedbackSound(event: FormFeedbackEvent): SoundId {
  switch (event) {
    case 'success':
      return 'ui-success';
    case 'validation-error':
    case 'submission-error':
      return 'ui-error';
    case 'submit':
    default:
      return 'ui-click';
  }
}

/**
 * Safely determines whether a Formspree / async form errors payload actually contains errors.
 */
export function hasFormSubmissionErrors(errors: unknown): boolean {
  if (!errors) return false;
  if (Array.isArray(errors)) return errors.length > 0;
  if (typeof errors === 'object') {
    const candidate = errors as {
      getFormErrors?: () => unknown[];
      getAllFieldErrors?: () => unknown[];
    };
    const hasGetters =
      typeof candidate.getFormErrors === 'function' ||
      typeof candidate.getAllFieldErrors === 'function';
    if (hasGetters) {
      const formErrs =
        typeof candidate.getFormErrors === 'function' ? candidate.getFormErrors() : [];
      const fieldErrs =
        typeof candidate.getAllFieldErrors === 'function' ? candidate.getAllFieldErrors() : [];
      return formErrs.length > 0 || fieldErrs.length > 0;
    }
    return Object.keys(errors as Record<string, unknown>).length > 0;
  }
  return Boolean(errors);
}

/**
 * Pure state-transition resolver for async form submission outcomes.
 * Guarantees 'success' and 'submission-error' sounds fire ONLY after an explicit user submit
 * transitions out of submitting into a terminal outcome (never on mount, typing, blur, or re-renders).
 */
export function resolveFormSubmissionOutcomeEvent(
  prev: FormSubmissionSnapshot,
  next: FormSubmissionSnapshot
): 'success' | 'submission-error' | null {
  if (!next.explicitSubmitPending || next.submitting) {
    return null;
  }

  if (next.succeeded && !prev.succeeded) {
    return 'success';
  }

  if (next.hasErrors && (prev.submitting || !prev.hasErrors)) {
    return 'submission-error';
  }

  return null;
}

type AudioContextConstructor = new () => AudioContext;

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: AudioContextConstructor;
}

interface ActiveVoice {
  oscillator: OscillatorNode;
  cleanup: () => void;
}

type PreferencesListener = (prefs: SoundPreferences) => void;

class TechSphereSoundManager {
  private prefs: SoundPreferences;
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeVoices = new Set<ActiveVoice>();
  private lastPlayedById = new Map<SoundId, number>();
  private listeners = new Set<PreferencesListener>();

  constructor() {
    this.prefs = this.readPersistedPreferences();
  }

  private readPersistedPreferences(): SoundPreferences {
    if (typeof window === 'undefined') return { ...DEFAULT_SOUND_PREFERENCES };
    try {
      return resolveSoundPreferences(window.localStorage.getItem(SOUND_PREFS_STORAGE_KEY));
    } catch {
      return { ...DEFAULT_SOUND_PREFERENCES };
    }
  }

  private persistPreferences(prefs: SoundPreferences): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(SOUND_PREFS_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore private-mode / storage quota restrictions
    }
  }

  private notifyListeners(): void {
    const snapshot = this.getPreferences();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }

  public getPreferences(): SoundPreferences {
    return { ...this.prefs };
  }

  public isEnabled(): boolean {
    return this.prefs.enabled;
  }

  public getVolume(): number {
    return this.prefs.volume;
  }

  public subscribe(listener: PreferencesListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public setEnabled(enabled: boolean): SoundPreferences {
    if (this.prefs.enabled === enabled) return this.getPreferences();
    this.prefs = { ...this.prefs, enabled };
    this.persistPreferences(this.prefs);

    if (!enabled) {
      this.stopAll();
    } else {
      this.unlock();
      this.syncMasterGain();
    }

    this.notifyListeners();
    return this.getPreferences();
  }

  public toggleEnabled(): SoundPreferences {
    const nextEnabled = !this.prefs.enabled;
    const updated = this.setEnabled(nextEnabled);
    if (nextEnabled) {
      this.play('ui-open', { bypassThrottle: true });
    }
    return updated;
  }

  public setVolume(volume: number): SoundPreferences {
    const clamped = clampVolume(volume);
    if (this.prefs.volume === clamped) return this.getPreferences();
    this.prefs = { ...this.prefs, volume: clamped };
    this.persistPreferences(this.prefs);
    this.syncMasterGain();
    this.notifyListeners();
    return this.getPreferences();
  }

  /**
   * Resets in-memory state cleanly (primarily for deterministic unit testing).
   */
  public resetForTests(initialPrefs: Partial<SoundPreferences> = {}): void {
    this.stopAll();
    this.lastPlayedById.clear();
    this.audioContext = null;
    this.masterGain = null;
    this.prefs = {
      ...DEFAULT_SOUND_PREFERENCES,
      ...initialPrefs,
      volume: clampVolume(initialPrefs.volume ?? DEFAULT_SOUND_PREFERENCES.volume),
    };
  }

  private ensureAudioContext(allowCreate: boolean = true): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (this.audioContext && this.audioContext.state !== 'closed') {
      return this.audioContext;
    }
    if (!allowCreate) return null;

    const win = window as WindowWithWebkitAudio;
    const AudioCtx = window.AudioContext ?? win.webkitAudioContext;
    if (!AudioCtx) return null;

    this.audioContext = new AudioCtx();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.setValueAtTime(
      this.prefs.enabled ? this.prefs.volume : 0.0001,
      this.audioContext.currentTime
    );
    this.masterGain.connect(this.audioContext.destination);
    return this.audioContext;
  }

  private syncMasterGain(): void {
    if (!this.audioContext || !this.masterGain || this.audioContext.state === 'closed') return;
    try {
      const now = this.audioContext.currentTime;
      const targetGain = this.prefs.enabled ? Math.max(0.0001, this.prefs.volume) : 0.0001;
      this.masterGain.gain.cancelScheduledValues?.(now);
      this.masterGain.gain.setValueAtTime(targetGain, now);
    } catch {
      // Ignore if context is closing
    }
  }

  public unlock(customCtx?: AudioContext | null): boolean {
    try {
      const ctx = customCtx !== undefined ? customCtx : this.ensureAudioContext(true);
      if (!ctx || ctx.state === 'closed') return false;
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        void ctx.resume().catch(() => {
          // Ignore browser autoplay restrictions silently
        });
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Immediately halts all active UI sounds and clears oscillators (used on mute, reset, or unmount).
   */
  public stopAll(): void {
    if (this.audioContext && this.masterGain && this.audioContext.state !== 'closed') {
      try {
        const now = this.audioContext.currentTime;
        this.masterGain.gain.cancelScheduledValues?.(now);
        this.masterGain.gain.setValueAtTime(0.0001, now);
      } catch {
        // Ignore
      }
    }

    for (const voice of [...this.activeVoices]) {
      try {
        voice.oscillator.stop();
      } catch {
        // Already stopped
      }
      voice.cleanup();
    }
    this.activeVoices.clear();
  }

  public getActiveVoiceCount(): number {
    return this.activeVoices.size;
  }

  public play(soundId: SoundId, options: PlaySoundOptions = {}): boolean {
    try {
      if (!options.bypassEnabledCheck && (!this.prefs.enabled || this.prefs.volume <= 0)) {
        return false;
      }

      const def = SOUND_LIBRARY[soundId];
      if (!def) return false;

      const nowMs =
        options.nowMs ?? (typeof performance !== 'undefined' ? performance.now() : Date.now());
      const lastPlayed = this.lastPlayedById.get(soundId) ?? 0;

      if (!options.bypassThrottle && !canTriggerSound(nowMs, lastPlayed, def.minIntervalMs)) {
        return false;
      }

      const isHover = soundId === 'ui-hover';
      const userActivated =
        typeof navigator !== 'undefined' &&
        Boolean(navigator.userActivation?.hasBeenActive || navigator.userActivation?.isActive);

      const ctx =
        options.audioContext !== undefined
          ? options.audioContext
          : this.ensureAudioContext(!isHover || userActivated);

      if (!ctx || ctx.state === 'closed') {
        return false;
      }

      if (ctx.state === 'suspended') {
        if (isHover && options.audioContext === undefined && !userActivated) {
          return false;
        }
        if (typeof ctx.resume === 'function') {
          void ctx.resume().catch(() => {
            // Ignore autoplay restriction silently
          });
        }
      }

      // Cap concurrent voices to prevent overlapping distortion
      while (this.activeVoices.size >= MAX_CONCURRENT_VOICES) {
        const oldest = this.activeVoices.values().next().value as ActiveVoice | undefined;
        if (!oldest) break;
        try {
          oldest.oscillator.stop();
        } catch {
          // Ignore
        }
        oldest.cleanup();
      }

      const useInternalMaster =
        options.audioContext === undefined &&
        this.masterGain !== null &&
        ctx === this.audioContext;

      if (useInternalMaster) {
        this.syncMasterGain();
      }

      const destination: AudioNode = useInternalMaster && this.masterGain ? this.masterGain : ctx.destination;
      const gainScale = useInternalMaster ? 1 : Math.max(0, this.prefs.volume);
      const pitchMult =
        options.pitchMultiplier && Number.isFinite(options.pitchMultiplier)
          ? Math.max(0.65, Math.min(1.45, options.pitchMultiplier))
          : 1;

      const baseTime = ctx.currentTime;
      const steps = getSoundSteps(soundId, options.theme);

      for (const step of steps) {
        const startTime = baseTime + (step.delaySec ?? 0);
        const attackEnd = startTime + step.attackSec;
        const stopTime = startTime + step.durationSec;

        const oscillator = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        oscillator.type = step.oscillatorType;
        oscillator.frequency.setValueAtTime(step.startFreqHz * pitchMult, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          Math.max(20, step.endFreqHz * pitchMult),
          stopTime
        );

        filter.type = step.filterType ?? 'lowpass';
        filter.frequency.setValueAtTime(step.filterFreqHz, startTime);
        filter.Q.setValueAtTime(step.filterQ ?? 0.7, startTime);

        const peak = Math.max(0.0002, step.peakGain * gainScale);
        gainNode.gain.setValueAtTime(0.0001, startTime);
        gainNode.gain.linearRampToValueAtTime(peak, attackEnd);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, stopTime);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(destination);

        let cleaned = false;
        const voice: ActiveVoice = {
          oscillator,
          cleanup: () => {
            if (cleaned) return;
            cleaned = true;
            this.activeVoices.delete(voice);
            try {
              oscillator.disconnect();
              filter.disconnect();
              gainNode.disconnect();
            } catch {
              // Ignore cleanup errors if context was closed
            }
          },
        };

        this.activeVoices.add(voice);
        oscillator.onended = voice.cleanup;

        oscillator.start(startTime);
        oscillator.stop(stopTime + 0.006);
      }

      this.lastPlayedById.set(soundId, nowMs);
      return true;
    } catch {
      return false;
    }
  }

  public playFormFeedback(event: FormFeedbackEvent, options?: PlaySoundOptions): boolean {
    const soundId = resolveFormFeedbackSound(event);
    return this.play(soundId, options);
  }

  public dispose(): void {
    this.stopAll();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      void this.audioContext.close().catch(() => {
        // Ignore close errors
      });
    }
    this.audioContext = null;
    this.masterGain = null;
  }
}

export const soundManager = new TechSphereSoundManager();

export function playSound(soundId: SoundId, options?: PlaySoundOptions): boolean {
  return soundManager.play(soundId, options);
}

export function playFormFeedbackSound(
  event: FormFeedbackEvent,
  options?: PlaySoundOptions
): boolean {
  return soundManager.playFormFeedback(event, options);
}

export function stopAllSounds(): void {
  soundManager.stopAll();
}

/* -------------------------------------------------------------------------- */
/* Delegated Click & Opt-In Hover Classification                              */
/* -------------------------------------------------------------------------- */

const CLICK_CANDIDATE_SELECTOR = 'button, a[href], [role="menuitem"], [data-sound]';
const PRIMARY_NAV_SELECTOR =
  'header nav, [aria-label="Primary Navigation"], [role="menu"], [data-glass-layer="mobile-drawer"]';
const PRIMARY_CTA_CLASS_PATTERN =
  /\b(bg-\[#101B35\]|bg-\[#38BDF8\]|bg-white\b|from-sky-500|bg-emerald-600)/;
const ICON_BUTTON_CLASS_PATTERN = /\bw-(9|10|11|12|14)\s+h-(9|10|11|12|14)\b/;

/**
 * Classifies a clicked DOM element into its appropriate semantic UI sound category.
 * Returns null for disabled controls, non-interactive elements, or explicit data-sound="none".
 */
export function resolveClickSoundId(target: EventTarget | null): SoundId | null {
  if (!target || typeof (target as Element).closest !== 'function') {
    return null;
  }

  const candidate = (target as Element).closest(CLICK_CANDIDATE_SELECTOR);
  if (!candidate) return null;

  const explicit = candidate.getAttribute('data-sound');
  if (explicit === 'none' || explicit === 'off') return null;

  if (
    candidate.hasAttribute('disabled') ||
    candidate.getAttribute('aria-disabled') === 'true'
  ) {
    return null;
  }

  if (explicit) {
    if (explicit === 'cta') return 'ui-click';
    if (explicit === 'secondary') return 'ui-click-secondary';
    if (explicit === 'icon') return 'ui-click-icon';
    if (explicit === 'contact') return 'ui-click-contact';
    if (explicit === 'download') return 'ui-click-download';
    if (explicit in SOUND_LIBRARY) return explicit as SoundId;
  }

  const tagName = candidate.tagName.toUpperCase();
  const href = candidate.getAttribute('href') ?? '';

  if (candidate.hasAttribute('download')) {
    return 'ui-click-download';
  }

  if (
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.includes('wa.me/')
  ) {
    return 'ui-click-contact';
  }

  // Primary navbar links & dropdown menu items -> soft premium glass click
  if (
    candidate.getAttribute('role') === 'menuitem' ||
    Boolean(candidate.closest(PRIMARY_NAV_SELECTOR))
  ) {
    return 'ui-click';
  }

  const className = typeof candidate.className === 'string' ? candidate.className : '';
  const textContent = (candidate.textContent ?? '').trim();

  // Icon-only circular/square controls
  if (tagName === 'BUTTON' && (!textContent || ICON_BUTTON_CLASS_PATTERN.test(className))) {
    return 'ui-click-icon';
  }

  // Primary CTA buttons
  if (tagName === 'BUTTON' && PRIMARY_CTA_CLASS_PATTERN.test(className)) {
    return 'ui-click';
  }

  if (tagName === 'BUTTON') {
    return 'ui-click-secondary';
  }

  // Styled action links (e.g., Launch Live Demo)
  if (tagName === 'A' && /\b(rounded-full|rounded-xl|rounded-2xl)\b/.test(className)) {
    return 'ui-click-secondary';
  }

  return null;
}

const OPT_IN_HOVER_SELECTOR =
  '[data-sound-hover="true"], header nav[aria-label="Primary Navigation"] button, header nav[aria-label="Primary Navigation"] a';

/**
 * Resolves ONLY primary navigation links and explicitly opted-in main action cards
 * (`data-sound-hover="true"`). Elements with `data-sound-hover="false"` or disabled state
 * are ignored so hover audio remains selective and restrained.
 */
export function resolveOptInHoverTarget(target: EventTarget | null): Element | null {
  if (!target || typeof (target as Element).closest !== 'function') {
    return null;
  }
  const targetEl = target as Element;
  if (targetEl.closest('[data-sound-hover="false"]')) {
    return null;
  }
  const el = targetEl.closest(OPT_IN_HOVER_SELECTOR);
  if (!el) return null;
  if (
    el.getAttribute('data-sound-hover') === 'false' ||
    el.hasAttribute('disabled') ||
    el.getAttribute('aria-disabled') === 'true'
  ) {
    return null;
  }
  return el;
}

export interface SoundListenersOptions {
  root?: Document | HTMLElement | null;
  onPlay?: (soundId: SoundId, element: Element) => void;
}

/**
 * Installs a single lightweight delegated listener for UI click sounds and selective
 * interaction-start hover highlights on primary nav links and main action cards.
 * Never attaches scroll or continuous mousemove listeners, and respects global mute.
 */
export function installUiSoundListeners(options: SoundListenersOptions = {}): () => void {
  const root = options.root ?? (typeof document !== 'undefined' ? document : null);
  if (!root) return () => {};

  let activeHoverEl: Element | null = null;

  const trigger = (soundId: SoundId, element: Element) => {
    if (options.onPlay) {
      if (!soundManager.isEnabled()) return;
      options.onPlay(soundId, element);
    } else {
      soundManager.play(soundId);
    }
  };

  const handleFirstGestureUnlock = () => {
    if (soundManager.isEnabled()) {
      soundManager.unlock();
    }
  };

  const handleClick = (rawEvent: Event) => {
    if (!soundManager.isEnabled()) return;
    const soundId = resolveClickSoundId(rawEvent.target);
    if (!soundId) return;
    const el = (rawEvent.target as Element).closest(CLICK_CANDIDATE_SELECTOR);
    if (el) {
      trigger(soundId, el);
    }
  };

  const handlePointerOver = (rawEvent: Event) => {
    if (!soundManager.isEnabled()) {
      activeHoverEl = null;
      return;
    }
    const event = rawEvent as PointerEvent;
    if (event.pointerType === 'touch') return;

    const match = resolveOptInHoverTarget(event.target);
    if (!match) {
      activeHoverEl = null;
      return;
    }

    // Interaction-start guard: never re-fire while moving within the same hovered element
    if (match === activeHoverEl) return;
    if (
      event.relatedTarget &&
      typeof match.contains === 'function' &&
      match.contains(event.relatedTarget as Node)
    ) {
      activeHoverEl = match;
      return;
    }

    activeHoverEl = match;
    trigger('ui-hover', match);
  };

  const handlePointerOut = (rawEvent: Event) => {
    if (!activeHoverEl) return;
    const event = rawEvent as PointerEvent;
    const related = event.relatedTarget as Node | null;
    if (!related || !activeHoverEl.contains(related)) {
      activeHoverEl = null;
    }
  };

  const handlePointerLeave = () => {
    activeHoverEl = null;
  };

  root.addEventListener('pointerdown', handleFirstGestureUnlock, { passive: true });
  root.addEventListener('keydown', handleFirstGestureUnlock, { passive: true });
  root.addEventListener('click', handleClick, { passive: true });
  root.addEventListener('pointerover', handlePointerOver, { passive: true });
  root.addEventListener('pointerout', handlePointerOut, { passive: true });
  root.addEventListener('pointerleave', handlePointerLeave, { passive: true });

  return () => {
    activeHoverEl = null;
    root.removeEventListener('pointerdown', handleFirstGestureUnlock);
    root.removeEventListener('keydown', handleFirstGestureUnlock);
    root.removeEventListener('click', handleClick);
    root.removeEventListener('pointerover', handlePointerOver);
    root.removeEventListener('pointerout', handlePointerOut);
    root.removeEventListener('pointerleave', handlePointerLeave);
  };
}
