import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PAGE_PATHS,
  PAGE_SEO_META,
  getPageFromPathname,
  getPathForPage,
  normalizePathname,
} from './routing';

test('normalizePathname strips trailing slashes and query params cleanly', () => {
  assert.equal(normalizePathname('/demo-websites/'), '/demo-websites');
  assert.equal(normalizePathname('/erp-showcase?tab=odoo'), '/erp-showcase');
  assert.equal(normalizePathname('/'), '/');
  assert.equal(normalizePathname(''), '/');
});

test('getPageFromPathname resolves /demo-websites, /erp-showcase, and fallback paths accurately', () => {
  assert.equal(getPageFromPathname('/demo-websites'), 'demo-websites');
  assert.equal(getPageFromPathname('/demo-websites/'), 'demo-websites');
  assert.equal(getPageFromPathname('/erp-showcase'), 'erp-showcase');
  assert.equal(getPageFromPathname('/erp-showcase/'), 'erp-showcase');
  assert.equal(getPageFromPathname('/portfolio'), 'portfolio');
  assert.equal(getPageFromPathname('/unknown-route'), 'home');
});

test('getPathForPage and PAGE_SEO_META define dedicated routes and titles for showcase pages', () => {
  assert.equal(getPathForPage('demo-websites'), '/demo-websites');
  assert.equal(getPathForPage('erp-showcase'), '/erp-showcase');
  assert.ok(PAGE_SEO_META['demo-websites'].title.includes('Website Development Demonstrations'));
  assert.ok(PAGE_SEO_META['erp-showcase'].title.includes('ERP Software Demonstrations'));
  assert.notEqual(
    PAGE_SEO_META['demo-websites'].description,
    PAGE_SEO_META['erp-showcase'].description
  );
  for (const pageId of Object.keys(PAGE_PATHS) as Array<keyof typeof PAGE_PATHS>) {
    assert.ok(PAGE_SEO_META[pageId].title.length > 10);
    assert.ok(PAGE_SEO_META[pageId].description.length > 20);
  }
});
