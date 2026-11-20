/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WHEEL_SPIN_DURATION_MS,
  computeTargetSpinDelta,
  computeWheelSpinAngle,
  computeWheelVelocityFactor,
  easeOutQuint,
  evaluateWheelSpinFrame,
  getCumulativeWheelSegment,
  resolveLandedSegmentIndex,
} from './wheelPhysics.ts';

test('easeOutQuint and velocity factor monotonically decelerate from fast start to smooth stop', () => {
  assert.equal(easeOutQuint(0), 0);
  assert.equal(easeOutQuint(1), 1);
  assert.ok(easeOutQuint(0.2) > 0.65);

  const v0 = computeWheelVelocityFactor(0);
  const vMid = computeWheelVelocityFactor(0.5);
  const vLate = computeWheelVelocityFactor(0.85);
  const vEnd = computeWheelVelocityFactor(1);

  assert.equal(v0, 1);
  assert.ok(v0 > vMid && vMid > vLate && vLate > vEnd);
  assert.equal(vEnd, 0);
});

test('segment tick timestamps slow down monotonically in sync with actual wheel deceleration', () => {
  const segmentCount = 5;
  const startAngle = 12;
  const totalDelta = computeTargetSpinDelta(startAngle, 3, segmentCount, 3);
  let lastSeg = getCumulativeWheelSegment(startAngle, segmentCount);
  const tickTimesMs: number[] = [];

  for (let ms = 0; ms <= WHEEL_SPIN_DURATION_MS; ms += 4) {
    const angle = computeWheelSpinAngle(startAngle, totalDelta, ms / WHEEL_SPIN_DURATION_MS);
    const seg = getCumulativeWheelSegment(angle, segmentCount);
    if (seg > lastSeg) {
      lastSeg = seg;
      tickTimesMs.push(ms);
    }
  }

  // Must cross multiple segments across 3+ full revolutions
  assert.ok(tickTimesMs.length >= 14, `Expected >=14 segment ticks, got ${tickTimesMs.length}`);

  // Compare early tick intervals vs final tick intervals to prove real deceleration sync
  const earlyInterval = tickTimesMs[2] - tickTimesMs[1];
  const lateInterval =
    tickTimesMs[tickTimesMs.length - 1] - tickTimesMs[tickTimesMs.length - 2];
  assert.ok(
    lateInterval > earlyInterval * 3,
    `Expected late tick interval (${lateInterval}ms) to be much slower than early (${earlyInterval}ms)`
  );
});

test('computeTargetSpinDelta lands cleanly on requested segment index', () => {
  const segmentCount = 5;
  for (let target = 0; target < segmentCount; target += 1) {
    const startAngle = 47.5;
    const delta = computeTargetSpinDelta(startAngle, target, segmentCount, 3);
    const finalAngle = computeWheelSpinAngle(startAngle, delta, 1);
    assert.equal(resolveLandedSegmentIndex(finalAngle, segmentCount), target);
  }
});

test('evaluateWheelSpinFrame emits synchronized ui-click, wheel-tick, and wheel-stop cues and respects global mute', () => {
  const segmentCount = 5;
  const startAngle = 10;
  const totalDelta = computeTargetSpinDelta(startAngle, 2, segmentCount, 3);

  // Run full spin simulation with sound ENABLED
  let lastSeg = getCumulativeWheelSegment(startAngle, segmentCount);
  const emittedCues: Array<'ui-click' | 'wheel-tick' | 'wheel-stop'> = [];
  let finalPhase: string = 'idle';

  for (let ms = 0; ms <= WHEEL_SPIN_DURATION_MS; ms += 8) {
    const frame = evaluateWheelSpinFrame({
      startAngleDeg: startAngle,
      totalDeltaDeg: totalDelta,
      progress: ms / WHEEL_SPIN_DURATION_MS,
      lastCumulativeSegment: lastSeg,
      segmentCount,
      soundEnabled: true,
    });
    if (frame.crossedSegment) {
      lastSeg = frame.cumulativeSegment;
    }
    for (const cue of frame.soundCues) {
      emittedCues.push(cue.soundId);
    }
    finalPhase = frame.phase;
  }

  assert.equal(finalPhase, 'completed');
  assert.ok(emittedCues.includes('ui-click'), 'Expected ui-click on revolution index crossings');
  assert.ok(emittedCues.includes('wheel-tick'), 'Expected wheel-tick on segment crossings');
  assert.equal(
    emittedCues[emittedCues.length - 1],
    'wheel-stop',
    'Expected wheel-stop as the completion cue'
  );
  assert.equal(
    emittedCues.filter((c) => c === 'wheel-stop').length,
    1,
    'wheel-stop must fire exactly once on completion'
  );

  // Run full spin simulation with sound MUTED -> 0 cues emitted while physics still completes
  let mutedLastSeg = getCumulativeWheelSegment(startAngle, segmentCount);
  let mutedCueCount = 0;
  let mutedFinalPhase = 'idle';

  for (let ms = 0; ms <= WHEEL_SPIN_DURATION_MS; ms += 8) {
    const frame = evaluateWheelSpinFrame({
      startAngleDeg: startAngle,
      totalDeltaDeg: totalDelta,
      progress: ms / WHEEL_SPIN_DURATION_MS,
      lastCumulativeSegment: mutedLastSeg,
      segmentCount,
      soundEnabled: false,
    });
    if (frame.crossedSegment) {
      mutedLastSeg = frame.cumulativeSegment;
    }
    mutedCueCount += frame.soundCues.length;
    mutedFinalPhase = frame.phase;
  }

  assert.equal(mutedCueCount, 0);
  assert.equal(mutedFinalPhase, 'completed');
});
