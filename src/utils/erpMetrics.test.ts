/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ERP_SCOPE_OPTIONS,
  formatAnimatedMetricValue,
  getMetricsForScope,
  getScopeOption,
} from './erpMetrics.ts';

test('getMetricsForScope returns 4 complete impact metrics for every supported scope', () => {
  for (const option of ERP_SCOPE_OPTIONS) {
    const items = getMetricsForScope(option.id);
    assert.equal(items.length, 4, `Expected 4 metrics for scope ${option.id}`);
    for (const item of items) {
      assert.ok(item.displayValue.length > 0);
      assert.ok(item.label.length > 0);
      assert.ok(item.timeframe.length > 0);
      assert.ok(item.baseline.length > 0);
      assert.ok(item.benchmarkPercent >= 0 && item.benchmarkPercent <= 100);
    }
  }
});

test('all-platform showcase metrics explicitly feature 30% efficiency and 24/7 automation benchmarks', () => {
  const allMetrics = getMetricsForScope('all');
  const values = allMetrics.map((m) => m.displayValue);
  assert.ok(values.includes('30%'), 'Expected 30% operational efficiency metric');
  assert.ok(values.includes('24/7'), 'Expected 24/7 workflow automation metric');
});

test('formatAnimatedMetricValue interpolates numeric, decimal, and ratio values deterministically', () => {
  const [eff, auto] = getMetricsForScope('all');
  assert.equal(formatAnimatedMetricValue(eff, 0), '+0%');
  assert.equal(formatAnimatedMetricValue(eff, 1), '+30%');
  assert.equal(formatAnimatedMetricValue(eff, 1.5), '+30%');

  assert.equal(formatAnimatedMetricValue(auto, 0), '0/0');
  assert.equal(formatAnimatedMetricValue(auto, 1), '24/7');

  const erpNextClose = getMetricsForScope('erpnext').find((m) => m.decimals === 1);
  assert.ok(erpNextClose);
  assert.equal(formatAnimatedMetricValue(erpNextClose, 0), '0.0x');
  assert.equal(formatAnimatedMetricValue(erpNextClose, 1), '3.2x');
});

test('getScopeOption resolves metadata for active platform scope cleanly', () => {
  assert.equal(getScopeOption('odoo').label, 'Odoo ERP');
  assert.equal(getScopeOption('zoho').label, 'Zoho Suite');
});
