/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WCAG_TOUCH_TARGET_AA_PX,
  WCAG_TOUCH_TARGET_AAA_PX,
  computeTouchTargetGap,
  evaluateTouchTargetSize,
} from './touchTargets';

test('evaluateTouchTargetSize enforces WCAG AA (24px) and AAA (44px) minimum touch targets', () => {
  assert.equal(WCAG_TOUCH_TARGET_AA_PX, 24);
  assert.equal(WCAG_TOUCH_TARGET_AAA_PX, 44);

  const passAAA = evaluateTouchTargetSize({ width: 44, height: 44 }, 'AAA');
  assert.equal(passAAA.passes, true);
  assert.equal(passAAA.meetsAA, true);
  assert.equal(passAAA.meetsAAA, true);
  assert.equal(passAAA.deficitWidth, 0);
  assert.equal(passAAA.deficitHeight, 0);

  const midTarget = evaluateTouchTargetSize({ width: 38, height: 38 }, 'AAA');
  assert.equal(midTarget.meetsAA, true);
  assert.equal(midTarget.meetsAAA, false);
  assert.equal(midTarget.passes, false);
  assert.equal(midTarget.deficitWidth, 6);
  assert.equal(midTarget.deficitHeight, 6);

  const tinyDot = evaluateTouchTargetSize({ width: 8, height: 8 }, 'AA');
  assert.equal(tinyDot.meetsAA, false);
  assert.equal(tinyDot.passes, false);
  assert.equal(tinyDot.deficitWidth, 16);
  assert.equal(tinyDot.deficitHeight, 16);
});

test('computeTouchTargetGap detects overlapping targets and calculates edge spacing accurately', () => {
  const spaced = computeTouchTargetGap(
    { x: 0, y: 0, width: 44, height: 44 },
    { x: 52, y: 0, width: 44, height: 44 }
  );
  assert.equal(spaced.overlaps, false);
  assert.equal(spaced.horizontalGap, 8);

  const overlapping = computeTouchTargetGap(
    { x: 0, y: 0, width: 44, height: 44 },
    { x: 40, y: 10, width: 44, height: 44 }
  );
  assert.equal(overlapping.overlaps, true);
});
