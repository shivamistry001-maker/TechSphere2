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

test('Liquid Glass UI 2.0 defines all layered glass utilities and accessibility fallbacks', () => {
  const requiredClasses = [
    '.ts-glass-canvas-primary',
    '.ts-glass-canvas-tinted',
    '.ts-glass-nav-plate',
    '.ts-glass-nav-active',
    '.ts-glass-popover',
    '.ts-glass-dropdown',
    '.ts-glass-card',
    '.ts-glass-card-interactive',
    '.ts-glass-panel',
    '.ts-glass-accent',
    '.ts-glass-btn-primary',
    '.ts-glass-btn-secondary',
    '.ts-glass-float-btn',
    '.ts-glass-badge',
    '.ts-glass-control',
    '.ts-glass-icon',
    '.ts-glass-input',
    '.ts-glass-drawer',
    '.ts-glass-modal-backdrop',
  ];

  for (const cls of requiredClasses) {
    assert.ok(indexCss.includes(cls), `Missing expected Liquid Glass 2.0 class: ${cls}`);
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

test('Light Mode Liquid Glass 2.0 uses visible translucent glass surfaces (0.55-0.72) and luminous borders (>= 0.85)', () => {
  const rootMatch = indexCss.match(/:root\s*\{([\s\S]*?)\n\}/);
  assert.ok(rootMatch, ':root block must exist in src/index.css');
  const rootBlock = rootMatch[1];

  const cardBgMatch = rootBlock.match(/--ts-glass-card-bg:\s*rgba\(255,\s*255,\s*255,\s*([0-9.]+)\)/);
  assert.ok(cardBgMatch, 'Light Mode --ts-glass-card-bg must be translucent white rgba');
  const cardBgAlpha = Number(cardBgMatch[1]);
  assert.ok(
    cardBgAlpha >= 0.55 && cardBgAlpha <= 0.72,
    `Light Mode --ts-glass-card-bg alpha (${cardBgAlpha}) should be within 0.55-0.72`
  );

  const panelBgMatch = rootBlock.match(/--ts-glass-panel-bg:\s*rgba\(255,\s*255,\s*255,\s*([0-9.]+)\)/);
  assert.ok(panelBgMatch, 'Light Mode --ts-glass-panel-bg must be translucent white rgba');
  const panelBgAlpha = Number(panelBgMatch[1]);
  assert.ok(
    panelBgAlpha >= 0.55 && panelBgAlpha <= 0.72,
    `Light Mode --ts-glass-panel-bg alpha (${panelBgAlpha}) should be within 0.55-0.72`
  );

  const cardBorderMatch = rootBlock.match(/--ts-glass-card-border:\s*rgba\(255,\s*255,\s*255,\s*([0-9.]+)\)/);
  assert.ok(cardBorderMatch, 'Light Mode --ts-glass-card-border must be luminous white rgba');
  assert.ok(
    Number(cardBorderMatch[1]) >= 0.85,
    `Light Mode --ts-glass-card-border alpha (${cardBorderMatch[1]}) should be >= 0.85`
  );
});

test('Mobile optimization lowers blur radius for mid-range devices and caps blur <= 16px', () => {
  const blurValues = [
    ...indexCss.matchAll(/--ts-glass-blur-(?:nav|popover|accent|card|panel):\s*(\d+)px;/g),
  ].map((m) => Number(m[1]));
  assert.ok(blurValues.length >= 10, 'Expected desktop and mobile blur token declarations for all layers');
  for (const px of blurValues) {
    assert.ok(px <= 16, `Blur radius ${px}px exceeds disciplined 16px maximum`);
  }

  assert.match(
    indexCss,
    /@media \(max-width: 767px\)\s*\{[\s\S]*?--ts-glass-blur-nav:\s*10px;[\s\S]*?--ts-glass-blur-card:\s*10px;/,
    'Mobile viewport should cap navbar and card blur at 10px'
  );
});

test('Dark mode Liquid Glass tokens contain zero blue background tints (strict monochrome)', () => {
  const darkBlockMatch = indexCss.match(/html\.dark\s*\{([\s\S]*?)\n\}/);
  assert.ok(darkBlockMatch, 'html.dark block must exist in src/index.css');
  const darkBlock = darkBlockMatch[1];

  const rgbaMatches = [...darkBlock.matchAll(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,/g)];
  assert.ok(rgbaMatches.length >= 20, 'Expected monochrome rgba tokens inside html.dark');

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

test('Embedded glass classes never apply backdrop-filter (prevents nested glass compositing)', () => {
  const embeddedSelectors = [
    '.ts-glass-control',
    '.ts-glass-icon',
    '.ts-glass-input',
    '.ts-glass-drawer-item',
    '.ts-glass-nav-active',
  ];

  for (const selector of embeddedSelectors) {
    const escaped = selector.replace('.', '\\.');
    const match = indexCss.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`));
    assert.ok(match, `${selector} rule must exist`);
    assert.equal(
      /backdrop-filter/i.test(match[1]),
      false,
      `${selector} must not declare backdrop-filter`
    );
  }
});

test('No expensive SVG displacement filters exist and reusable GlassPrimitives exports are defined', () => {
  assert.equal(
    /feDisplacementMap/i.test(indexCss),
    false,
    'Expensive SVG displacement filters must not be used'
  );

  const primitivesSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/glass/GlassPrimitives.tsx'),
    'utf8'
  );
  const expectedExports = [
    'GlassNavbar',
    'GlassCard',
    'GlassPanel',
    'GlassDropdown',
    'GlassButton',
    'GlassInput',
  ];
  for (const sym of expectedExports) {
    assert.ok(
      primitivesSrc.includes(`export const ${sym}`),
      `GlassPrimitives.tsx must export ${sym}`
    );
  }

  const formSrc = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/ContactConsultationForm.tsx'),
    'utf8'
  );
  assert.ok(
    formSrc.includes('GlassPanel') && formSrc.includes('getGlassInputClass'),
    'ContactConsultationForm should use GlassPanel and non-nested GlassInput styles'
  );
});

test('.ts-glass-card applies a subtle monochrome semi-transparent SVG grain overlay without nested blur', () => {
  const rootMatch = indexCss.match(/:root\s*\{([\s\S]*?)\n\}/);
  const darkMatch = indexCss.match(/html\.dark\s*\{([\s\S]*?)\n\}/);
  assert.ok(rootMatch && darkMatch, ':root and html.dark token blocks must exist');

  const rootBlock = rootMatch[1];
  const darkBlock = darkMatch[1];

  // Semi-transparent monochrome SVG fractalNoise tile pattern
  assert.match(
    rootBlock,
    /--ts-glass-noise-pattern:\s*url\("data:image\/svg\+xml,[\s\S]*feTurbulence[\s\S]*stitchTiles='stitch'[\s\S]*feColorMatrix[^>]*saturate[^>]*values='0'[\s\S]*opacity='0\.\d+'/,
    '--ts-glass-noise-pattern must use a seamless, desaturated, semi-transparent SVG fractalNoise pattern'
  );

  const lightOpacityMatch = rootBlock.match(/--ts-glass-noise-opacity:\s*([0-9.]+);/);
  const darkOpacityMatch = darkBlock.match(/--ts-glass-noise-opacity:\s*([0-9.]+);/);
  assert.ok(lightOpacityMatch && darkOpacityMatch, 'Light and Dark noise opacity tokens must be defined');

  const lightOpacity = Number(lightOpacityMatch[1]);
  const darkOpacity = Number(darkOpacityMatch[1]);
  assert.ok(
    lightOpacity >= 0.03 && lightOpacity <= 0.18,
    `Light Mode noise opacity (${lightOpacity}) should remain subtle (0.03-0.18)`
  );
  assert.ok(
    darkOpacity >= 0.03 && darkOpacity <= 0.18,
    `Dark Mode noise opacity (${darkOpacity}) should remain subtle (0.03-0.18)`
  );

  // .ts-glass-card isolates stacking context and .ts-glass-card::before stays non-interactive & non-blurred
  const cardMatch = indexCss.match(/\.ts-glass-card\s*\{([\s\S]*?)\}/);
  const beforeMatch = indexCss.match(/\.ts-glass-card::before\s*\{([\s\S]*?)\}/);
  assert.ok(cardMatch && beforeMatch, '.ts-glass-card and .ts-glass-card::before rules must exist');

  assert.match(cardMatch[1], /position:\s*relative;/, '.ts-glass-card must establish positioning context');
  assert.match(cardMatch[1], /isolation:\s*isolate;/, '.ts-glass-card must isolate blend mode stacking context');

  assert.match(beforeMatch[1], /border-radius:\s*inherit;/, 'Noise overlay must inherit card border-radius');
  assert.match(beforeMatch[1], /pointer-events:\s*none;/, 'Noise overlay must never block pointer interactions');
  assert.match(beforeMatch[1], /z-index:\s*-1;/, 'Noise overlay should layer above card glass backdrop and behind card content');
  assert.match(beforeMatch[1], /var\(--ts-glass-noise-pattern\)/, 'Noise overlay must bind --ts-glass-noise-pattern');
  assert.equal(
    /backdrop-filter/i.test(beforeMatch[1]),
    false,
    '.ts-glass-card::before must not declare nested backdrop-filter'
  );

  assert.match(
    indexCss,
    /@media \(prefers-reduced-transparency: reduce\)[\s\S]*\.ts-glass-card::before,\s*\.ts-glass-card::after\s*\{[\s\S]*opacity:\s*0;/,
    'Reduced-transparency media query should disable grain and refraction-sheen overlays cleanly'
  );
});

test('.ts-glass-card::after provides a top-right refraction-sheen driven by --ts-refraction-sheen-opacity', () => {
  const afterMatch = indexCss.match(/\.ts-glass-card::after\s*\{([\s\S]*?)\}/);
  assert.ok(afterMatch, '.ts-glass-card::after refraction-sheen rule must exist');

  const body = afterMatch[1];
  assert.match(body, /top:\s*0;/, 'Refraction-sheen must anchor to top edge');
  assert.match(body, /right:\s*0;/, 'Refraction-sheen must anchor to right edge');
  assert.match(body, /border-top-right-radius:\s*inherit;/, 'Refraction-sheen must inherit top-right corner radius');
  assert.match(body, /pointer-events:\s*none;/, 'Refraction-sheen must never block pointer interactions');
  assert.match(
    body,
    /opacity:\s*var\(--ts-refraction-sheen-opacity,\s*var\(--ts-glass-refraction-base-opacity\)\);/,
    'Refraction-sheen opacity must dynamically bind --ts-refraction-sheen-opacity with base fallback'
  );
  assert.equal(
    /backdrop-filter/i.test(body),
    false,
    '.ts-glass-card::after must not introduce nested backdrop-filter'
  );
});

test('.ts-glass-card applies GPU-accelerated scroll depth-of-field offset and respects reduced motion', () => {
  const cardMatch = indexCss.match(/\.ts-glass-card\s*\{([\s\S]*?)\}/);
  assert.ok(cardMatch, '.ts-glass-card rule must exist');

  assert.match(
    cardMatch[1],
    /translate:\s*0\s+var\(--ts-glass-depth-y,\s*0px\)\s+0;/,
    '.ts-glass-card must apply GPU-composited 3D translate bound to --ts-glass-depth-y'
  );
  assert.match(
    cardMatch[1],
    /transform:\s*translate3d\(0,\s*0,\s*0\);/,
    '.ts-glass-card must promote a GPU compositor layer via translate3d'
  );
  assert.match(
    indexCss,
    /\.ts-glass-card\[data-glass-depth-active="true"\]\s*\{[\s\S]*will-change:\s*transform,\s*translate;/,
    'Only active in-viewport glass cards should hint will-change: transform, translate'
  );
  assert.match(
    indexCss,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.ts-glass-card\s*\{[\s\S]*translate:\s*0\s+0\s+0\s*!important;/,
    'Reduced-motion media query must lock scroll depth translate to 0'
  );
});



