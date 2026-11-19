import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PAGE_PATHS,
  PAGE_SEO_META,
  getCanonicalUrl,
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

test('getPageFromPathname resolves /demo-websites, /erp-showcase, and unknown 404 paths accurately', () => {
  assert.equal(getPageFromPathname('/'), 'home');
  assert.equal(getPageFromPathname('/demo-websites'), 'demo-websites');
  assert.equal(getPageFromPathname('/demo-websites/'), 'demo-websites');
  assert.equal(getPageFromPathname('/erp-showcase'), 'erp-showcase');
  assert.equal(getPageFromPathname('/erp-showcase/'), 'erp-showcase');
  assert.equal(getPageFromPathname('/portfolio'), 'portfolio');
  assert.equal(getPageFromPathname('/insights'), 'not-found');
  assert.equal(getPageFromPathname('/unknown-route'), 'not-found');
  assert.equal(getPageFromPathname('/bad/nested/path'), 'not-found');
});

test('getPathForPage and PAGE_SEO_META define dedicated routes and titles for showcase and 404 pages', () => {
  assert.equal(getPathForPage('demo-websites'), '/demo-websites');
  assert.equal(getPathForPage('erp-showcase'), '/erp-showcase');
  assert.ok(PAGE_SEO_META['demo-websites'].title.includes('Website Development Demonstrations'));
  assert.ok(PAGE_SEO_META['erp-showcase'].title.includes('ERP Software Demonstrations'));
  assert.ok(PAGE_SEO_META['not-found'].title.includes('404'));
  assert.notEqual(PAGE_SEO_META['not-found'].title, PAGE_SEO_META.home.title);
  assert.notEqual(
    PAGE_SEO_META['demo-websites'].description,
    PAGE_SEO_META['erp-showcase'].description
  );
  for (const pageId of Object.keys(PAGE_PATHS) as Array<keyof typeof PAGE_PATHS>) {
    assert.ok(PAGE_SEO_META[pageId].title.length > 10);
    assert.ok(PAGE_SEO_META[pageId].description.length > 20);
  }
});

test('getCanonicalUrl builds clean absolute canonical URLs for every page', () => {
  assert.equal(getCanonicalUrl('home'), 'https://techsphere.consulting/');
  assert.equal(getCanonicalUrl('demo-websites'), 'https://techsphere.consulting/demo-websites');
  assert.equal(getCanonicalUrl('odoo'), 'https://techsphere.consulting/erp-solutions/odoo');
});
