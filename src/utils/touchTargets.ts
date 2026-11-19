/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/** WCAG 2.2 Level AA (SC 2.5.8) minimum target size in CSS pixels. */
export const WCAG_TOUCH_TARGET_AA_PX = 24;

/** WCAG 2.2 Level AAA (SC 2.5.5) & mobile ergonomics recommended minimum target size in CSS pixels. */
export const WCAG_TOUCH_TARGET_AAA_PX = 44;

export type TouchTargetComplianceLevel = 'AA' | 'AAA';

export interface TouchTargetRect {
  width: number;
  height: number;
}

export interface TouchTargetEvaluation {
  width: number;
  height: number;
  minRequired: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  passes: boolean;
  deficitWidth: number;
  deficitHeight: number;
}

/**
 * Evaluates whether an interactive control's bounding box meets WCAG touch target
 * size thresholds (Level AA: 24x24px, Level AAA / mobile best practice: 44x44px).
 */
export function evaluateTouchTargetSize(
  rect: TouchTargetRect,
  level: TouchTargetComplianceLevel = 'AAA'
): TouchTargetEvaluation {
  const width = Number.isFinite(rect.width) ? Math.max(0, rect.width) : 0;
  const height = Number.isFinite(rect.height) ? Math.max(0, rect.height) : 0;
  const minRequired = level === 'AAA' ? WCAG_TOUCH_TARGET_AAA_PX : WCAG_TOUCH_TARGET_AA_PX;

  const meetsAA = width >= WCAG_TOUCH_TARGET_AA_PX && height >= WCAG_TOUCH_TARGET_AA_PX;
  const meetsAAA = width >= WCAG_TOUCH_TARGET_AAA_PX && height >= WCAG_TOUCH_TARGET_AAA_PX;

  return {
    width,
    height,
    minRequired,
    meetsAA,
    meetsAAA,
    passes: level === 'AAA' ? meetsAAA : meetsAA,
    deficitWidth: Math.max(0, Math.ceil(minRequired - width)),
    deficitHeight: Math.max(0, Math.ceil(minRequired - height)),
  };
}

export interface PositionedTouchTarget extends TouchTargetRect {
  x: number;
  y: number;
}

/**
 * Checks whether two adjacent touch targets have non-overlapping bounding boxes
 * and computes edge-to-edge separation in CSS pixels.
 */
export function computeTouchTargetGap(
  a: PositionedTouchTarget,
  b: PositionedTouchTarget
): { horizontalGap: number; verticalGap: number; overlaps: boolean } {
  const horizontalGap = Math.max(b.x - (a.x + a.width), a.x - (b.x + b.width));
  const verticalGap = Math.max(b.y - (a.y + a.height), a.y - (b.y + b.height));
  const overlaps = horizontalGap < 0 && verticalGap < 0;

  return {
    horizontalGap,
    verticalGap,
    overlaps,
  };
}
