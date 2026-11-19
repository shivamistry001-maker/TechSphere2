/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const indexCssPath = path.resolve(process.cwd(), 'src/index.css');
const indexCss = fs.readFileSync(indexCssPath, 'utf8');

test('Hybrid Liquid Glass defines all selective glass utilities and solid fallbacks', () => {
  const requiredClasses = [
    '.ts-glass-nav-plate',
    '.ts-glass-popover',
    '.ts-glass-accent',
    '.ts-glass-float-btn',
    '.ts-glass-control',
    '.ts-glass-drawer',
    '.ts-glass-modal-backdrop',
    '.ts-showcase-card-rim',
  ];

  for (const cls of requiredClasses) {
    assert.ok(indexCss.includes(cls), `Missing expected Liquid Glass class: ${cls}`);
  }

  assert.match(
    indexCss,
    /@supports not \(\(backdrop-filter: blur\(1px\)\) or \(-webkit-backdrop-filter: blur\(1px\)\)\)/,
    'Solid fallback @supports not rule is required for browsers without backdrop-filter'
  );

  assert.match(
    indexCss,
    /@media \(prefers-reduced-transparency: reduce\)/,
    'Reduced-transparency accessibility override is required'
  );

  assert.match(
    indexCss,
    /@media \(prefers-reduced-motion: reduce\)/,
    'Reduced-motion accessibility override is required'
  );
});

test('Mobile optimization lowers blur radius for mid-range devices and avoids excessive blur', () => {
  const desktopBlurs = [...indexCss.matchAll(/--ts-glass-blur-(?:nav|popover|accent):\s*(\d+)px;/g)].map(
    (m) => Number(m[1])
  );
  assert.ok(desktopBlurs.length >= 6, 'Expected desktop and mobile blur token declarations');
  for (const px of desktopBlurs) {
    assert.ok(px <= 16, `Blur radius ${px}px exceeds disciplined 16px maximum`);
  }

  assert.match(
    indexCss,
    /@media \(max-width: 767px\)\s*\{[\s\S]*?--ts-glass-blur-nav:\s*10px;/,
    'Mobile viewport should cap navbar blur at 10px'
  );
});

test('Dark mode Liquid Glass tokens contain zero blue background tints (strict monochrome)', () => {
  const darkBlockMatch = indexCss.match(/html\.dark\s*\{([\s\S]*?)\n\}/);
  assert.ok(darkBlockMatch, 'html.dark block must exist in src/index.css');
  const darkBlock = darkBlockMatch[1];

  const rgbaMatches = [...darkBlock.matchAll(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,/g)];
  assert.ok(rgbaMatches.length >= 10, 'Expected monochrome rgba tokens inside html.dark');

  for (const [, rStr, gStr, bStr] of rgbaMatches) {
    const r = Number(rStr);
    const g = Number(gStr);
    const b = Number(bStr);
    assert.equal(
      r === g && g === b,
      true,
      `Dark mode token rgba(${r}, ${g}, ${b}, ...) is not strictly monochrome`
    );
  }
});

test('Embedded .ts-glass-control never applies backdrop-filter (prevents nested glass)', () => {
  const controlBlockMatch = indexCss.match(/\.ts-glass-control\s*\{([\s\S]*?)\}/);
  assert.ok(controlBlockMatch, '.ts-glass-control rule must exist');
  assert.equal(
    /backdrop-filter/i.test(controlBlockMatch[1]),
    false,
    '.ts-glass-control must not declare backdrop-filter'
  );
});

test('No expensive SVG displacement filters exist and ContactConsultationForm remains solid', () => {
  assert.equal(
    /feDisplacementMap/i.test(indexCss),
    false,
    'Expensive SVG displacement filters must not be used'
  );

  const formSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/ContactConsultationForm.tsx'),
    'utf8'
  );
  assert.equal(
    /backdrop-blur|backdrop-filter/.test(formSrc),
    false,
    'ContactConsultationForm must remain on a readable solid surface'
  );
});
