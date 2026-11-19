/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THEME_CLICK_MIN_INTERVAL_MS,
  THEME_CLICK_SOUND_PROFILES,
  canTriggerThemeClickSound,
  getThemeClickSoundProfile,
  playThemeToggleClickSound,
} from './themeSound.ts';

test('theme click sound profiles stay subtle, short, and distinct between dark and light modes', () => {
  const dark = getThemeClickSoundProfile('dark');
  const light = getThemeClickSoundProfile('light');

  assert.equal(dark, THEME_CLICK_SOUND_PROFILES.dark);
  assert.equal(light, THEME_CLICK_SOUND_PROFILES.light);

  // Subtle peak gain and ultra-short tactile duration (< 50ms)
  assert.ok(dark.peakGain > 0 && dark.peakGain <= 0.08);
  assert.ok(light.peakGain > 0 && light.peakGain <= 0.08);
  assert.ok(dark.durationSec > 0.015 && dark.durationSec <= 0.05);
  assert.ok(light.durationSec > 0.015 && light.durationSec <= 0.05);

  // Dark descends gently, light ticks gently upward
  assert.ok(dark.endFreqHz < dark.startFreqHz);
  assert.ok(light.endFreqHz > light.startFreqHz);
});

test('canTriggerThemeClickSound enforces throttle window to prevent rapid-click clipping', () => {
  assert.equal(canTriggerThemeClickSound(100, 0), true);
  assert.equal(canTriggerThemeClickSound(110, 100), false);
  assert.equal(canTriggerThemeClickSound(100 + THEME_CLICK_MIN_INTERVAL_MS - 1, 100), false);
  assert.equal(canTriggerThemeClickSound(100 + THEME_CLICK_MIN_INTERVAL_MS, 100), true);
});

test('playThemeToggleClickSound schedules Web Audio graph cleanly and cleans up on end', () => {
  const events: string[] = [];
  const callbackState: { onEnded: (() => void) | null } = { onEnded: null };

  const mockParam = (label: string) => ({
    setValueAtTime: (val: number, time: number) => events.push(`${label}.set(${val}@${time})`),
    linearRampToValueAtTime: (val: number, time: number) =>
      events.push(`${label}.linear(${val}@${time})`),
    exponentialRampToValueAtTime: (val: number, time: number) =>
      events.push(`${label}.exp(${val}@${time})`),
  });

  const mockOsc = {
    type: 'sine' as OscillatorType,
    frequency: mockParam('freq'),
    connect: () => events.push('osc.connect'),
    disconnect: () => events.push('osc.disconnect'),
    start: (t: number) => events.push(`osc.start(${t})`),
    stop: (t: number) => events.push(`osc.stop(${t.toFixed(4)})`),
    set onended(fn: () => void) {
      callbackState.onEnded = fn;
    },
  };

  const mockFilter = {
    type: 'lowpass' as BiquadFilterType,
    frequency: mockParam('filterFreq'),
    Q: mockParam('filterQ'),
    connect: () => events.push('filter.connect'),
    disconnect: () => events.push('filter.disconnect'),
  };

  const mockGain = {
    gain: mockParam('gain'),
    connect: () => events.push('gain.connect'),
    disconnect: () => events.push('gain.disconnect'),
  };

  const mockCtx = {
    state: 'suspended',
    currentTime: 1.5,
    destination: {},
    resume: () => {
      events.push('ctx.resume');
      return Promise.resolve();
    },
    createOscillator: () => mockOsc,
    createBiquadFilter: () => mockFilter,
    createGain: () => mockGain,
  } as unknown as AudioContext;

  const played = playThemeToggleClickSound('dark', {
    audioContext: mockCtx,
    nowMs: 1000,
    bypassThrottle: true,
  });

  assert.equal(played, true);
  assert.ok(events.includes('ctx.resume'));
  assert.equal(mockOsc.type, 'triangle');
  assert.ok(events.includes('osc.connect'));
  assert.ok(events.includes('filter.connect'));
  assert.ok(events.includes('gain.connect'));
  assert.ok(events.includes('osc.start(1.5)'));

  // Trigger onended to verify node cleanup
  assert.ok(callbackState.onEnded !== null);
  callbackState.onEnded();
  assert.ok(events.includes('osc.disconnect'));
  assert.ok(events.includes('filter.disconnect'));
  assert.ok(events.includes('gain.disconnect'));

  // Gracefully returns false when audioContext is unavailable
  assert.equal(playThemeToggleClickSound('light', { audioContext: null, bypassThrottle: true }), false);
});
