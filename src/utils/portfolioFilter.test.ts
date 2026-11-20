/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import {
  PORTFOLIO_CATEGORIES,
  computeCenteredPillScrollLeft,
  filterPortfolioItems,
} from './portfolioFilter.ts';

test('PORTFOLIO_CATEGORIES preserves all five exact portfolio categories in order', () => {
  assert.deepEqual(
    [...PORTFOLIO_CATEGORIES],
    ['All', 'Web', 'ERP', 'Applications', 'Automation']
  );
});

test('filterPortfolioItems returns exact matches synchronously for every category', () => {
  const all = filterPortfolioItems(PORTFOLIO_DATA, 'All');
  assert.equal(all, PORTFOLIO_DATA);
  assert.ok(all.length > 0);

  for (const cat of PORTFOLIO_CATEGORIES) {
    if (cat === 'All') continue;
    const filtered = filterPortfolioItems(PORTFOLIO_DATA, cat);
    assert.ok(filtered.length > 0, `Category ${cat} should have at least one portfolio item`);
    assert.equal(
      filtered.every((item) => item.category === cat),
      true,
      `All filtered items for ${cat} must match category`
    );
  }
});

test('computeCenteredPillScrollLeft centers overflowing mobile pills within safe scroll bounds', () => {
  // No overflow -> always 0
  assert.equal(
    computeCenteredPillScrollLeft({
      containerWidth: 500,
      containerScrollWidth: 420,
      pillOffsetLeft: 180,
      pillWidth: 90,
    }),
    0
  );

  // Overflowing mobile bar (320px container, 460px scrollWidth): pill near end clamps to maxScroll (140)
  assert.equal(
    computeCenteredPillScrollLeft({
      containerWidth: 320,
      containerScrollWidth: 460,
      pillOffsetLeft: 360,
      pillWidth: 100,
    }),
    140
  );

  // Overflowing mobile bar: first pill clamps to 0
  assert.equal(
    computeCenteredPillScrollLeft({
      containerWidth: 320,
      containerScrollWidth: 460,
      pillOffsetLeft: 6,
      pillWidth: 52,
    }),
    0
  );

  // Middle pill centers cleanly
  assert.equal(
    computeCenteredPillScrollLeft({
      containerWidth: 320,
      containerScrollWidth: 520,
      pillOffsetLeft: 200,
      pillWidth: 80,
    }),
    80
  );
});
