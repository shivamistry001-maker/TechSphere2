/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Pure rotation physics and segment-boundary crossing logic for the homepage
 * TechSphere orbital wheel. Decouples spin kinematics from React/DOM so tick audio
 * is strictly synchronized with actual angular rotation rather than a fixed interval.
 */

export const WHEEL_SPIN_DURATION_MS = 2600;
export const WHEEL_RESULT_DELAY_MS = 130;

/**
 * Smooth quintic ease-out curve (fast initial impulse, graceful realistic deceleration).
 */
export function easeOutQuint(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 5);
}

/**
 * Computes instantaneous normalized angular velocity (0..1) of easeOutQuint at progress t.
 * Used to subtly modulate tick timbre as the wheel naturally slows down.
 */
export function computeWheelVelocityFactor(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return Math.pow(1 - clamped, 4);
}

/**
 * Computes the wheel angle (in degrees) at progress t in [0, 1].
 */
export function computeWheelSpinAngle(
  startAngleDeg: number,
  totalDeltaDeg: number,
  progress: number
): number {
  return startAngleDeg + totalDeltaDeg * easeOutQuint(progress);
}

/**
 * Returns the cumulative integer segment index crossed by the wheel at a given angle.
 * Whenever this integer increments between animation frames, the wheel has physically
 * crossed a segment boundary and should emit a synchronized `wheel-tick`.
 */
export function getCumulativeWheelSegment(angleDeg: number, segmentCount: number): number {
  if (segmentCount <= 0) return 0;
  const degreesPerSegment = 360 / segmentCount;
  return Math.floor(angleDeg / degreesPerSegment);
}

/**
 * Computes the target rotation delta (in degrees) needed to spin `fullTurns` complete
 * revolutions plus land cleanly on `targetIndex` out of `segmentCount` segments.
 */
export function computeTargetSpinDelta(
  currentAngleDeg: number,
  targetIndex: number,
  segmentCount: number,
  fullTurns: number = 3
): number {
  if (segmentCount <= 0) return 0;
  const degreesPerSegment = 360 / segmentCount;
  const normalizedCurrent = ((currentAngleDeg % 360) + 360) % 360;
  const desiredMod = ((((targetIndex % segmentCount) + segmentCount) % segmentCount) * degreesPerSegment + degreesPerSegment * 0.5) % 360;
  let extra = desiredMod - normalizedCurrent;
  if (extra <= 0) extra += 360;
  return Math.max(1, fullTurns) * 360 + extra;
}

/**
 * Resolves the landed segment index [0, segmentCount - 1] from a final wheel angle.
 */
export function resolveLandedSegmentIndex(angleDeg: number, segmentCount: number): number {
  if (segmentCount <= 0) return 0;
  const degreesPerSegment = 360 / segmentCount;
  const normalized = ((angleDeg % 360) + 360) % 360;
  return Math.floor(normalized / degreesPerSegment) % segmentCount;
}

export type WheelAnimationPhase = 'idle' | 'spinning' | 'completed';

export interface WheelSoundCue {
  soundId: 'ui-click' | 'wheel-tick' | 'wheel-stop';
  pitchMultiplier?: number;
  bypassThrottle?: boolean;
}

export interface WheelFrameEvaluationInput {
  startAngleDeg: number;
  totalDeltaDeg: number;
  progress: number;
  lastCumulativeSegment: number;
  segmentCount: number;
  soundEnabled: boolean;
}

export interface WheelFrameEvaluation {
  angleDeg: number;
  segmentIndex: number;
  cumulativeSegment: number;
  crossedSegment: boolean;
  phase: WheelAnimationPhase;
  velocityFactor: number;
  soundCues: WheelSoundCue[];
}

/**
 * Pure frame evaluator synchronizing wheel rotation physics with animation phase and audio cues.
 * - While rotating (`progress < 1`): emits `wheel-tick` on minor segment boundaries and
 *   `ui-click` on major full-revolution index crossings (`cumulativeSegment % segmentCount === 0`),
 *   both subtly pitch-modulated by instantaneous angular velocity.
 * - Upon completion (`progress >= 1`): transitions to `'completed'` and emits `wheel-stop`.
 * - Respects the global sound mute state (`soundEnabled === false` emits zero audio cues).
 */
export function evaluateWheelSpinFrame(
  input: WheelFrameEvaluationInput
): WheelFrameEvaluation {
  const clampedProgress = Math.max(0, Math.min(1, input.progress));
  const angleDeg = computeWheelSpinAngle(
    input.startAngleDeg,
    input.totalDeltaDeg,
    clampedProgress
  );
  const cumulativeSegment = getCumulativeWheelSegment(angleDeg, input.segmentCount);
  const segmentIndex = resolveLandedSegmentIndex(angleDeg, input.segmentCount);
  const velocityFactor = computeWheelVelocityFactor(clampedProgress);
  const crossedSegment = cumulativeSegment > input.lastCumulativeSegment;
  const isCompleted = clampedProgress >= 1;
  const phase: WheelAnimationPhase = isCompleted ? 'completed' : 'spinning';

  const soundCues: WheelSoundCue[] = [];

  if (input.soundEnabled) {
    if (isCompleted) {
      soundCues.push({
        soundId: 'wheel-stop',
        bypassThrottle: true,
      });
    } else if (crossedSegment && input.segmentCount > 0) {
      const isMajorRevolutionIndex =
        ((cumulativeSegment % input.segmentCount) + input.segmentCount) % input.segmentCount === 0;
      if (isMajorRevolutionIndex) {
        soundCues.push({
          soundId: 'ui-click',
          pitchMultiplier: Number((0.94 + 0.12 * velocityFactor).toFixed(3)),
        });
      } else {
        soundCues.push({
          soundId: 'wheel-tick',
          pitchMultiplier: Number((0.88 + 0.24 * velocityFactor).toFixed(3)),
        });
      }
    }
  }

  return {
    angleDeg,
    segmentIndex,
    cumulativeSegment,
    crossedSegment,
    phase,
    velocityFactor,
    soundCues,
  };
}

