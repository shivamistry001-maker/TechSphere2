import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DARK_PALETTE,
  EASE_PREMIUM,
  easeOutCubic,
  interpolateCounter,
  cardRevealVariants,
  computeColumnParallax,
  shouldTriggerScrollReveal,
  isRectWithinScrollTrigger,
  scrollSectionContainerVariants,
  scrollBlockItemVariants,
  scrollCascadeGridVariants,
  scrollCardItemVariants,
} from './motion';

test('easeOutCubic clamps boundaries and monotonically eases', () => {
  assert.equal(easeOutCubic(-0.5), 0);
  assert.equal(easeOutCubic(0), 0);
  assert.equal(easeOutCubic(1), 1);
  assert.equal(easeOutCubic(1.5), 1);
  assert.ok(easeOutCubic(0.5) > 0.5);
});

test('interpolateCounter computes rounded target fractions accurately', () => {
  assert.equal(interpolateCounter(360, 0), 0);
  assert.equal(interpolateCounter(360, 1), 360);
  assert.equal(interpolateCounter(100, 0.5), 88);
});

test('cardRevealVariants caps stagger delay to avoid slow entrances', () => {
  const visibleFn = cardRevealVariants.visible as (idx: number) => {
    transition: { delay: number; duration: number };
  };
  const first = visibleFn(0);
  const tenth = visibleFn(10);
  assert.equal(first.transition.delay, 0);
  assert.equal(tenth.transition.delay, 0.36);
  assert.ok(first.transition.duration >= 0.3 && first.transition.duration <= 0.8);
});

test('shouldTriggerScrollReveal enforces one-way trigger-once latch semantics', () => {
  assert.equal(shouldTriggerScrollReveal(0, false), false);
  assert.equal(shouldTriggerScrollReveal(0.005, false), false);
  assert.equal(shouldTriggerScrollReveal(NaN, false), false);
  assert.equal(shouldTriggerScrollReveal(0.01, false), true);
  assert.equal(shouldTriggerScrollReveal(0.45, false), true);
  // Once triggered, scrolling back up (progress drops to 0) must stay true
  assert.equal(shouldTriggerScrollReveal(0, true), true);
  assert.equal(shouldTriggerScrollReveal(-0.2, true), true);
});

test('isRectWithinScrollTrigger detects visible and partially entered containers cleanly', () => {
  assert.equal(isRectWithinScrollTrigger(800, 1200, 900), true);
  assert.equal(isRectWithinScrollTrigger(855, 1200, 900), true);
  assert.equal(isRectWithinScrollTrigger(860, 1200, 900), false);
  assert.equal(isRectWithinScrollTrigger(-200, 150, 900), true);
  assert.equal(isRectWithinScrollTrigger(-400, -10, 900), false);
  assert.equal(isRectWithinScrollTrigger(100, 300, 0), false);
});

test('unified scrollSectionContainerVariants configure staggerChildren cleanly', () => {
  const sectionVisible = scrollSectionContainerVariants.visible as {
    opacity: number;
    transition: { duration: number; staggerChildren: number; delayChildren: number };
  };
  assert.equal(sectionVisible.opacity, 1);
  assert.ok(sectionVisible.transition.staggerChildren > 0);
  assert.ok(sectionVisible.transition.duration >= 0.3 && sectionVisible.transition.duration <= 0.8);

  const blockVisible = scrollBlockItemVariants.visible as {
    opacity: number;
    y: number;
    transition: { duration: number };
  };
  assert.equal(blockVisible.opacity, 1);
  assert.equal(blockVisible.y, 0);
  assert.ok(blockVisible.transition.duration >= 0.3 && blockVisible.transition.duration <= 0.8);

  const gridVisible = scrollCascadeGridVariants.visible as {
    transition: { staggerChildren: number };
  };
  assert.ok(gridVisible.transition.staggerChildren > 0);

  const cardVisible = scrollCardItemVariants.visible as {
    opacity: number;
    transition: { duration: number };
  };
  assert.equal(cardVisible.opacity, 1);
  assert.ok(cardVisible.transition.duration >= 0.3 && cardVisible.transition.duration <= 0.8);
});

test('computeColumnParallax returns symmetric opposite scroll bounds per column', () => {
  const c0 = computeColumnParallax(0, 3, 12);
  const c1 = computeColumnParallax(1, 3, 12);
  const c2 = computeColumnParallax(2, 3, 12);
  assert.equal(c0[0], -c0[1]);
  assert.equal(c1[0], -c1[1]);
  assert.equal(c2[0], -c2[1]);
  assert.notDeepEqual(c0, c1);
  assert.deepEqual(computeColumnParallax(3, 3, 12), c0);
});

test('DARK_PALETTE uses strictly monochrome black, grey, and white hex values', () => {
  const hexValues = Object.values(DARK_PALETTE);
  for (const hex of hexValues) {
    assert.match(hex, /^#([0-9A-F]{2})\1\1$/i, `Expected neutral greyscale hex, got ${hex}`);
  }
  assert.equal(DARK_PALETTE.bgMain, '#090909');
  assert.equal(DARK_PALETTE.bgSecondary, '#111111');
  assert.equal(DARK_PALETTE.bgCard, '#171717');
  assert.equal(DARK_PALETTE.bgElevated, '#1D1D1D');
  assert.equal(DARK_PALETTE.border, '#303030');
  assert.equal(DARK_PALETTE.accent, '#FFFFFF');
  assert.equal(EASE_PREMIUM.length, 4);
});
