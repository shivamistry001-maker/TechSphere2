import test from 'node:test';
import assert from 'node:assert/strict';
import { getERPRecommendation, filterERPComparison } from './erpWizardLogic';
import { ERP_COMPARISON_DATA } from '../data/erpData';
import type { QuizState } from '../types';

const baseState: QuizState = {
  businessType: '',
  employees: '16-50',
  coreNeeds: [],
  needsManufacturing: 'No',
  needsAccounting: 'Yes',
  needsCRM: 'Standard',
  needsEcommerce: 'B2B_Only',
  customizationExpectation: 'Standard',
};

test('recommends ERPNext for manufacturing businesses', () => {
  const res = getERPRecommendation({
    ...baseState,
    businessType: 'Manufacturing',
    needsManufacturing: 'Yes',
  });
  assert.equal(res.primary, 'ERPNext');
});

test('recommends Odoo for retail and POS + eCommerce', () => {
  const res = getERPRecommendation({
    ...baseState,
    businessType: 'Retail',
    needsEcommerce: 'POS_and_Ecom',
  });
  assert.equal(res.primary, 'Odoo');
});

test('recommends Zoho for professional services or critical CRM', () => {
  const res = getERPRecommendation({
    ...baseState,
    businessType: 'Services',
    needsCRM: 'Critical',
  });
  assert.equal(res.primary, 'Zoho One / Books / CRM');
});

test('recommends Custom ERP when heavy customization is required', () => {
  const res = getERPRecommendation({
    ...baseState,
    businessType: 'Distribution',
    customizationExpectation: 'Heavy',
  });
  assert.equal(res.primary, 'Custom ERP or ERPNext Framework');
});

test('falls back to balanced comparative evaluation for general profiles', () => {
  const res = getERPRecommendation({
    ...baseState,
    businessType: 'Distribution',
  });
  assert.equal(res.primary, 'ERPNext or Odoo (Comparative Evaluation)');
});

test('filterERPComparison filters accurately across dimensions', () => {
  assert.equal(filterERPComparison(ERP_COMPARISON_DATA, '').length, ERP_COMPARISON_DATA.length);
  const mfgRows = filterERPComparison(ERP_COMPARISON_DATA, 'Manufacturing');
  assert.ok(mfgRows.length >= 1);
  assert.equal(filterERPComparison(ERP_COMPARISON_DATA, 'xyznonexistent').length, 0);
});
