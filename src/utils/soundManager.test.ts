/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CORE_SOUND_CATEGORIES,
  DEFAULT_SOUND_PREFERENCES,
  MAX_CONCURRENT_VOICES,
  SOUND_LIBRARY,
  SOUND_PREFS_STORAGE_KEY,
  SoundId,
  canTriggerSound,
  clampVolume,
  getSoundSteps,
  hasFormSubmissionErrors,
  installUiSoundListeners,
  playFormFeedbackSound,
  resolveClickSoundId,
  resolveFormFeedbackSound,
  resolveFormSubmissionOutcomeEvent,
  resolveOptInHoverTarget,
  resolveSoundPreferences,
  soundManager,
} from './soundManager.ts';

function createMockAudioContext(state: AudioContextState = 'running') {
  const events: string[] = [];
  const oscillators: Array<{
    type: OscillatorType;
    stopped: boolean;
    disconnected: boolean;
    onEnded: (() => void) | null;
  }> = [];

  const mockParam = (label: string) => ({
    setValueAtTime: (val: number, time: number) => events.push(`${label}.set(${val}@${time})`),
    linearRampToValueAtTime: (val: number, time: number) =>
      events.push(`${label}.linear(${val}@${time})`),
    exponentialRampToValueAtTime: (val: number, time: number) =>
      events.push(`${label}.exp(${val}@${time})`),
    cancelScheduledValues: (time: number) => events.push(`${label}.cancel(@${time})`),
  });

  const ctx = {
    state,
    currentTime: 2.0,
    destination: {},
    resume: () => {
      events.push('ctx.resume');
      return Promise.resolve();
    },
    createOscillator: () => {
      const stateObj = {
        type: 'sine' as OscillatorType,
        stopped: false,
        disconnected: false,
        onEnded: null as (() => void) | null,
      };
      oscillators.push(stateObj);
      return {
        get type() {
          return stateObj.type;
        },
        set type(v: OscillatorType) {
          stateObj.type = v;
        },
        frequency: mockParam('freq'),
        connect: () => events.push('osc.connect'),
        disconnect: () => {
          stateObj.disconnected = true;
          events.push('osc.disconnect');
        },
        start: (t: number) => events.push(`osc.start(${t.toFixed(3)})`),
        stop: (t?: number) => {
          stateObj.stopped = true;
          events.push(`osc.stop(${t !== undefined ? t.toFixed(3) : 'now'})`);
        },
        set onended(fn: () => void) {
          stateObj.onEnded = fn;
        },
      };
    },
    createBiquadFilter: () => ({
      type: 'lowpass' as BiquadFilterType,
      frequency: mockParam('filterFreq'),
      Q: mockParam('filterQ'),
      connect: () => events.push('filter.connect'),
      disconnect: () => events.push('filter.disconnect'),
    }),
    createGain: () => ({
      gain: mockParam('gain'),
      connect: () => events.push('gain.connect'),
      disconnect: () => events.push('gain.disconnect'),
    }),
  } as unknown as AudioContext;

  return { ctx, events, oscillators };
}

interface MockElSpec {
  tagName: string;
  attrs?: Record<string, string>;
  className?: string;
  textContent?: string;
  closestMap?: Record<string, MockEl | null>;
  children?: MockEl[];
}

interface MockEl {
  tagName: string;
  className: string;
  textContent: string;
  getAttribute: (name: string) => string | null;
  hasAttribute: (name: string) => boolean;
  closest: (selector: string) => MockEl | null;
  contains: (node: unknown) => boolean;
}

function createMockElement(spec: MockElSpec): MockEl {
  const attrs = spec.attrs ?? {};
  const children = spec.children ?? [];
  const el: MockEl = {
    tagName: spec.tagName.toUpperCase(),
    className: spec.className ?? '',
    textContent: spec.textContent ?? '',
    getAttribute: (name: string) => (name in attrs ? attrs[name] : null),
    hasAttribute: (name: string) => name in attrs,
    closest: (selector: string) => {
      if (spec.closestMap && selector in spec.closestMap) {
        return spec.closestMap[selector];
      }
      if (selector.includes('[data-sound-hover="true"]')) {
        return attrs['data-sound-hover'] === 'true' ? el : null;
      }
      if (selector === '[data-sound-hover="false"]') {
        return attrs['data-sound-hover'] === 'false' ? el : null;
      }
      if (
        selector.includes('button') &&
        (el.tagName === 'BUTTON' ||
          (el.tagName === 'A' && 'href' in attrs) ||
          attrs.role === 'menuitem' ||
          'data-sound' in attrs)
      ) {
        return el;
      }
      return null;
    },
    contains: (node: unknown) => node === el || children.some((c) => c === node || c.contains(node)),
  };
  return el;
}

test('sound preferences default to OFF at 70% volume with safe parsing and clamping', () => {
  assert.equal(SOUND_PREFS_STORAGE_KEY, 'techsphere_sound_prefs_v2');
  assert.equal(DEFAULT_SOUND_PREFERENCES.enabled, false);
  assert.equal(DEFAULT_SOUND_PREFERENCES.volume, 0.7);

  assert.deepEqual(resolveSoundPreferences(null), DEFAULT_SOUND_PREFERENCES);
  assert.deepEqual(resolveSoundPreferences('not-json'), DEFAULT_SOUND_PREFERENCES);
  assert.deepEqual(resolveSoundPreferences('{"enabled":false,"volume":0.55}'), {
    enabled: false,
    volume: 0.55,
  });
  assert.deepEqual(resolveSoundPreferences('{"enabled":true,"volume":5}'), {
    enabled: true,
    volume: 1,
  });
  assert.equal(clampVolume(-0.5), 0);
  assert.equal(clampVolume(1.8), 1);
  assert.equal(clampVolume(Number.NaN), DEFAULT_SOUND_PREFERENCES.volume);
});

test('all 12 core sound categories exist, stay under 1 second, and ui-hover is subtle high-frequency', () => {
  for (const id of CORE_SOUND_CATEGORIES) {
    const def = SOUND_LIBRARY[id];
    assert.ok(def, `Missing sound definition for ${id}`);
    assert.ok(def.steps.length >= 1);
    let totalEndSec = 0;
    for (const step of def.steps) {
      assert.ok(step.peakGain > 0 && step.peakGain <= 0.06, `${id} peakGain ${step.peakGain} too loud`);
      assert.ok(step.durationSec > 0 && step.durationSec < 0.5, `${id} step duration too long`);
      totalEndSec = Math.max(totalEndSec, (step.delaySec ?? 0) + step.durationSec);
    }
    assert.ok(totalEndSec < 1.0, `${id} total duration ${totalEndSec}s must stay under 1s`);
  }

  // ui-hover must be crisp high-frequency and whisper-subtle
  const hoverStep = SOUND_LIBRARY['ui-hover'].steps[0];
  assert.ok(hoverStep.startFreqHz >= 2000, `ui-hover startFreqHz (${hoverStep.startFreqHz}) should be high-frequency`);
  assert.ok(hoverStep.peakGain <= 0.02, `ui-hover peakGain (${hoverStep.peakGain}) must stay very subtle`);
  assert.ok(hoverStep.durationSec <= 0.03, `ui-hover duration (${hoverStep.durationSec}s) must stay micro-short`);

  // Light and dark theme switches have distinct upward vs downward trajectories
  const darkSteps = getSoundSteps('theme-switch', 'dark');
  const lightSteps = getSoundSteps('theme-switch', 'light');
  assert.ok(darkSteps[0].endFreqHz < darkSteps[0].startFreqHz);
  assert.ok(lightSteps[0].endFreqHz > lightSteps[0].startFreqHz);
});

test('soundManager stays completely silent while disabled and plays cleanly once enabled', () => {
  soundManager.resetForTests({ enabled: false, volume: 0.72 });
  const mutedMock = createMockAudioContext('running');

  for (const id of CORE_SOUND_CATEGORIES) {
    assert.equal(
      soundManager.play(id, { audioContext: mutedMock.ctx, nowMs: 1000, bypassThrottle: true }),
      false
    );
  }
  assert.equal(mutedMock.oscillators.length, 0);

  // Enable sound and verify playback across all core categories
  soundManager.setEnabled(true);
  assert.equal(soundManager.isEnabled(), true);

  const activeMock = createMockAudioContext('running');
  let timestamp = 2000;
  for (const id of CORE_SOUND_CATEGORIES) {
    assert.equal(
      soundManager.play(id, { audioContext: activeMock.ctx, nowMs: timestamp }),
      true
    );
    timestamp += 300;
  }
  assert.ok(activeMock.oscillators.length >= CORE_SOUND_CATEGORIES.length);
  soundManager.stopAll();
});

test('disabling sound or calling stopAll immediately halts active oscillators and prevents overlap', () => {
  soundManager.resetForTests({ enabled: true, volume: 0.8 });
  const mock = createMockAudioContext('running');

  // Play a multi-step sound (wheel-result has 3 oscillators)
  assert.equal(
    soundManager.play('wheel-result', { audioContext: mock.ctx, nowMs: 5000, bypassThrottle: true }),
    true
  );
  assert.equal(soundManager.getActiveVoiceCount(), 3);

  // Disabling immediately stops & disconnects every active voice
  soundManager.setEnabled(false);
  assert.equal(soundManager.getActiveVoiceCount(), 0);
  assert.ok(mock.oscillators.every((osc) => osc.stopped && osc.disconnected));

  // Voice cap prevents overlapping distortion on rapid distinct sounds
  soundManager.setEnabled(true);
  const capMock = createMockAudioContext('running');
  const ids: SoundId[] = ['ui-click', 'ui-open', 'ui-success', 'wheel-result'];
  for (const id of ids) {
    soundManager.play(id, { audioContext: capMock.ctx, nowMs: 6000, bypassThrottle: true });
  }
  assert.ok(soundManager.getActiveVoiceCount() <= MAX_CONCURRENT_VOICES + 2);
  soundManager.stopAll();
  assert.equal(soundManager.getActiveVoiceCount(), 0);
});

test('canTriggerSound enforces per-sound throttle windows cleanly', () => {
  assert.equal(canTriggerSound(100, 0, 40), true);
  assert.equal(canTriggerSound(125, 100, 40), false);
  assert.equal(canTriggerSound(140, 100, 40), true);
});

test('resolveClickSoundId and resolveOptInHoverTarget selectively classify primary nav links and main action cards', () => {
  const navContainer = createMockElement({ tagName: 'NAV' });
  const navBtn = createMockElement({
    tagName: 'BUTTON',
    textContent: 'Services',
    closestMap: {
      'header nav, [aria-label="Primary Navigation"], [role="menu"], [data-glass-layer="mobile-drawer"]':
        navContainer,
      '[data-sound-hover="true"], header nav[aria-label="Primary Navigation"] button, header nav[aria-label="Primary Navigation"] a':
        navContainer,
    },
  });
  assert.equal(resolveClickSoundId(navBtn as unknown as EventTarget), 'ui-click');
  // Primary nav links selectively trigger ui-hover
  assert.equal(resolveOptInHoverTarget(navBtn as unknown as EventTarget), navContainer);

  // Explicit opt-out (e.g. ERP Solutions dropdown trigger) skips ui-hover
  const optedOutNavBtn = createMockElement({
    tagName: 'BUTTON',
    attrs: { 'data-sound-hover': 'false' },
    textContent: 'ERP Solutions',
  });
  assert.equal(resolveOptInHoverTarget(optedOutNavBtn as unknown as EventTarget), null);

  const primaryCta = createMockElement({
    tagName: 'BUTTON',
    attrs: { 'data-sound': 'cta' },
    textContent: 'Explore Our Services',
  });
  assert.equal(resolveClickSoundId(primaryCta as unknown as EventTarget), 'ui-click');

  const secondaryBtn = createMockElement({
    tagName: 'BUTTON',
    textContent: 'View Details',
    className: 'px-4 py-2 rounded-xl border',
  });
  assert.equal(resolveClickSoundId(secondaryBtn as unknown as EventTarget), 'ui-click-secondary');

  const iconBtn = createMockElement({
    tagName: 'BUTTON',
    className: 'w-11 h-11 rounded-full flex items-center justify-center',
    textContent: '',
  });
  assert.equal(resolveClickSoundId(iconBtn as unknown as EventTarget), 'ui-click-icon');

  const contactLink = createMockElement({
    tagName: 'A',
    attrs: { href: 'https://wa.me/918320806363' },
    textContent: 'WhatsApp',
  });
  assert.equal(resolveClickSoundId(contactLink as unknown as EventTarget), 'ui-click-contact');

  const downloadLink = createMockElement({
    tagName: 'A',
    attrs: { href: '/brochure.pdf', download: '' },
    textContent: 'Download Brochure',
  });
  assert.equal(resolveClickSoundId(downloadLink as unknown as EventTarget), 'ui-click-download');

  const disabledBtn = createMockElement({
    tagName: 'BUTTON',
    attrs: { disabled: '' },
    textContent: 'Submit',
  });
  assert.equal(resolveClickSoundId(disabledBtn as unknown as EventTarget), null);

  const optedOutBtn = createMockElement({
    tagName: 'BUTTON',
    attrs: { 'data-sound': 'none' },
    textContent: 'Theme',
  });
  assert.equal(resolveClickSoundId(optedOutBtn as unknown as EventTarget), null);

  // Only explicitly marked special glass elements trigger opt-in hover sound
  const orbitalGlassTile = createMockElement({
    tagName: 'BUTTON',
    attrs: { 'data-sound-hover': 'true' },
    textContent: 'ERP Core',
  });
  assert.equal(resolveOptInHoverTarget(orbitalGlassTile as unknown as EventTarget), orbitalGlassTile);
});

test('installUiSoundListeners triggers ui-hover only on interaction start, never on scroll, and respects global mute', () => {
  soundManager.resetForTests({ enabled: true, volume: 0.7 });
  const listeners = new Map<string, Set<(e: Event) => void>>();
  const mockRoot = {
    addEventListener: (type: string, fn: (e: Event) => void) => {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(fn);
    },
    removeEventListener: (type: string, fn: (e: Event) => void) => {
      listeners.get(type)?.delete(fn);
    },
    dispatch: (type: string, event: Record<string, unknown>) => {
      for (const fn of [...(listeners.get(type) ?? [])]) {
        fn(event as unknown as Event);
      }
    },
  };

  const played: SoundId[] = [];
  const dispose = installUiSoundListeners({
    root: mockRoot as unknown as HTMLElement,
    onPlay: (id) => played.push(id),
  });

  // Normal scrolling & mousemove must NEVER be listened to
  assert.equal(listeners.has('scroll'), false);
  assert.equal(listeners.has('mousemove'), false);

  const plainBtn = createMockElement({ tagName: 'BUTTON', textContent: 'About' });
  const cardChild = createMockElement({ tagName: 'SPAN', textContent: 'Explore Service' });
  const actionCard = createMockElement({
    tagName: 'ARTICLE',
    attrs: { 'data-sound-hover': 'true' },
    textContent: 'ERP Consultancy',
    children: [cardChild],
  });
  // Allow cardChild.closest(hoverSelector) to resolve to actionCard
  cardChild.closest = (selector: string) =>
    selector.includes('[data-sound-hover="true"]') ? actionCard : null;

  // Hovering an un-marked button does nothing
  mockRoot.dispatch('pointerover', { pointerType: 'mouse', target: plainBtn, relatedTarget: null });
  assert.deepEqual(played, []);

  // Touch hover does nothing
  mockRoot.dispatch('pointerover', { pointerType: 'touch', target: actionCard, relatedTarget: null });
  assert.deepEqual(played, []);

  // Initial pointer entry onto action card fires ui-hover ONCE
  mockRoot.dispatch('pointerover', { pointerType: 'mouse', target: actionCard, relatedTarget: null });
  assert.deepEqual(played, ['ui-hover']);

  // Moving pointer into a child span inside the already-hovered card must NOT re-trigger ui-hover
  mockRoot.dispatch('pointerover', {
    pointerType: 'mouse',
    target: cardChild,
    relatedTarget: actionCard,
  });
  assert.deepEqual(played, ['ui-hover']);

  // Leaving card and re-entering triggers interaction-start ui-hover once again
  mockRoot.dispatch('pointerout', { pointerType: 'mouse', target: actionCard, relatedTarget: null });
  mockRoot.dispatch('pointerover', { pointerType: 'mouse', target: actionCard, relatedTarget: null });
  assert.deepEqual(played, ['ui-hover', 'ui-hover']);

  // Clicking plain button plays ui-click-secondary
  mockRoot.dispatch('click', { target: plainBtn });
  assert.deepEqual(played, ['ui-hover', 'ui-hover', 'ui-click-secondary']);

  // Global mute setting silences both hover and click listeners immediately
  soundManager.setEnabled(false);
  mockRoot.dispatch('pointerout', { pointerType: 'mouse', target: actionCard, relatedTarget: null });
  mockRoot.dispatch('pointerover', { pointerType: 'mouse', target: actionCard, relatedTarget: null });
  mockRoot.dispatch('click', { target: plainBtn });
  assert.deepEqual(played, ['ui-hover', 'ui-hover', 'ui-click-secondary']);

  dispose();
  soundManager.setEnabled(true);
  mockRoot.dispatch('click', { target: plainBtn });
  assert.deepEqual(played, ['ui-hover', 'ui-hover', 'ui-click-secondary']);
});

test('form interaction feedback maps explicit events cleanly and ignores non-explicit state transitions', () => {
  assert.equal(resolveFormFeedbackSound('submit'), 'ui-click');
  assert.equal(resolveFormFeedbackSound('validation-error'), 'ui-error');
  assert.equal(resolveFormFeedbackSound('submission-error'), 'ui-error');
  assert.equal(resolveFormFeedbackSound('success'), 'ui-success');

  // Formspree error detection handles null, empty getters, populated getters, and arrays
  assert.equal(hasFormSubmissionErrors(null), false);
  assert.equal(hasFormSubmissionErrors(undefined), false);
  assert.equal(hasFormSubmissionErrors([]), false);
  assert.equal(hasFormSubmissionErrors([{ code: 'REQUIRED' }]), true);
  assert.equal(
    hasFormSubmissionErrors({ getFormErrors: () => [], getAllFieldErrors: () => [] }),
    false
  );
  assert.equal(
    hasFormSubmissionErrors({ getFormErrors: () => [{ message: 'Failed' }], getAllFieldErrors: () => [] }),
    true
  );

  // Never plays on initial mount or non-explicit state changes (explicitSubmitPending = false)
  assert.equal(
    resolveFormSubmissionOutcomeEvent(
      { submitting: false, succeeded: false, hasErrors: false, explicitSubmitPending: false },
      { submitting: false, succeeded: true, hasErrors: false, explicitSubmitPending: false }
    ),
    null
  );
  assert.equal(
    resolveFormSubmissionOutcomeEvent(
      { submitting: false, succeeded: false, hasErrors: false, explicitSubmitPending: false },
      { submitting: false, succeeded: false, hasErrors: true, explicitSubmitPending: false }
    ),
    null
  );

  // While still submitting -> wait
  assert.equal(
    resolveFormSubmissionOutcomeEvent(
      { submitting: false, succeeded: false, hasErrors: false, explicitSubmitPending: true },
      { submitting: true, succeeded: false, hasErrors: false, explicitSubmitPending: true }
    ),
    null
  );

  // Explicit submit -> succeeded triggers 'success' once
  assert.equal(
    resolveFormSubmissionOutcomeEvent(
      { submitting: true, succeeded: false, hasErrors: false, explicitSubmitPending: true },
      { submitting: false, succeeded: true, hasErrors: false, explicitSubmitPending: true }
    ),
    'success'
  );

  // Re-render while already succeeded never double-fires
  assert.equal(
    resolveFormSubmissionOutcomeEvent(
      { submitting: false, succeeded: true, hasErrors: false, explicitSubmitPending: true },
      { submitting: false, succeeded: true, hasErrors: false, explicitSubmitPending: true }
    ),
    null
  );

  // Explicit submit -> server error triggers 'submission-error' once
  assert.equal(
    resolveFormSubmissionOutcomeEvent(
      { submitting: true, succeeded: false, hasErrors: false, explicitSubmitPending: true },
      { submitting: false, succeeded: false, hasErrors: true, explicitSubmitPending: true }
    ),
    'submission-error'
  );

  // Repeated explicit submit that fails again after a previous error still fires once
  assert.equal(
    resolveFormSubmissionOutcomeEvent(
      { submitting: true, succeeded: false, hasErrors: true, explicitSubmitPending: true },
      { submitting: false, succeeded: false, hasErrors: true, explicitSubmitPending: true }
    ),
    'submission-error'
  );
});

test('playFormFeedbackSound plays ui-success and ui-error when enabled while form fields remain silent', () => {
  soundManager.resetForTests({ enabled: false, volume: 0.72 });
  const offMock = createMockAudioContext('running');
  assert.equal(playFormFeedbackSound('success', { audioContext: offMock.ctx, nowMs: 1000 }), false);
  assert.equal(
    playFormFeedbackSound('validation-error', { audioContext: offMock.ctx, nowMs: 1200 }),
    false
  );
  assert.equal(offMock.oscillators.length, 0);

  soundManager.setEnabled(true);
  const onMock = createMockAudioContext('running');
  assert.equal(
    playFormFeedbackSound('validation-error', { audioContext: onMock.ctx, nowMs: 2000 }),
    true
  );
  const afterErrorCount = onMock.oscillators.length;
  assert.equal(afterErrorCount, SOUND_LIBRARY['ui-error'].steps.length);

  assert.equal(playFormFeedbackSound('success', { audioContext: onMock.ctx, nowMs: 2400 }), true);
  assert.equal(
    onMock.oscillators.length - afterErrorCount,
    SOUND_LIBRARY['ui-success'].steps.length
  );
  soundManager.stopAll();

  // Typing/clicking/hovering form controls (input, textarea, select, label) must never trigger click/hover audio
  for (const tagName of ['INPUT', 'TEXTAREA', 'SELECT', 'LABEL']) {
    const fieldEl = createMockElement({ tagName, textContent: 'Field' });
    assert.equal(resolveClickSoundId(fieldEl as unknown as EventTarget), null);
    assert.equal(resolveOptInHoverTarget(fieldEl as unknown as EventTarget), null);
  }
});
