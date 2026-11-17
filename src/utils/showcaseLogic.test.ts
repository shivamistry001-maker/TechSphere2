import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampGalleryIndex,
  cycleGalleryIndex,
  filterWebsiteDemos,
} from './showcaseLogic';
import { LIVE_WEBSITE_DEMOS, ERP_DEMO_PLATFORMS } from '../data/showcaseData';

test('LIVE_WEBSITE_DEMOS contains the four required verified live Vercel demos', () => {
  assert.equal(LIVE_WEBSITE_DEMOS.length, 4);
  const urls = LIVE_WEBSITE_DEMOS.map((d) => d.liveUrl);
  assert.deepEqual(urls, [
    'https://demo-self-nu-33.vercel.app/',
    'https://demo2-ten-hazel.vercel.app/',
    'https://demo3-delta-three.vercel.app/',
    'https://demo4-oxix.vercel.app/',
  ]);
});

test('filterWebsiteDemos filters cleanly by category and returns all on All', () => {
  assert.equal(filterWebsiteDemos(LIVE_WEBSITE_DEMOS, 'All').length, 4);

  const hospitality = filterWebsiteDemos(LIVE_WEBSITE_DEMOS, 'Hospitality');
  assert.equal(hospitality.length, 1);
  assert.equal(hospitality[0].liveUrl, 'https://demo-self-nu-33.vercel.app/');

  const prof = filterWebsiteDemos(LIVE_WEBSITE_DEMOS, 'Professional Services');
  assert.equal(prof.length, 1);
  assert.equal(prof[0].liveUrl, 'https://demo2-ten-hazel.vercel.app/');

  const creative = filterWebsiteDemos(LIVE_WEBSITE_DEMOS, 'Creative Business');
  assert.equal(creative.length, 1);
  assert.equal(creative[0].liveUrl, 'https://demo3-delta-three.vercel.app/');

  const mfg = filterWebsiteDemos(LIVE_WEBSITE_DEMOS, 'Manufacturing');
  assert.equal(mfg.length, 1);
  assert.equal(mfg[0].liveUrl, 'https://demo4-oxix.vercel.app/');
});

test('cycleGalleryIndex wraps forward and backward safely across gallery slides', () => {
  assert.equal(cycleGalleryIndex(0, 3, 'next'), 1);
  assert.equal(cycleGalleryIndex(2, 3, 'next'), 0);
  assert.equal(cycleGalleryIndex(0, 3, 'prev'), 2);
  assert.equal(cycleGalleryIndex(1, 3, 'prev'), 0);
  assert.equal(cycleGalleryIndex(0, 0, 'next'), 0);
  assert.equal(clampGalleryIndex(-1, 3), 2);
});

test('ERP_DEMO_PLATFORMS covers ERPNext, Odoo ERP, and Zoho with local assets only', () => {
  assert.equal(ERP_DEMO_PLATFORMS.length, 3);
  for (const platform of ERP_DEMO_PLATFORMS) {
    assert.ok(platform.screenshots.length >= 3);
    for (const shot of platform.screenshots) {
      assert.ok(
        shot.src.startsWith('/assets/aistudio/'),
        `Expected local uploaded asset path, got ${shot.src}`
      );
    }
  }
});
