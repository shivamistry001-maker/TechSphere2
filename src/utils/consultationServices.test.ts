import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONSULTATION_SERVICES,
  DEFAULT_CONSULTATION_SERVICE,
  resolveConsultationService,
} from '../data/consultationServices.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { getERPRecommendation } from './erpWizardLogic.ts';
import type { QuizState } from '../types.ts';

test('every CONSULTATION_SERVICES option resolves to itself identically', () => {
  for (const option of CONSULTATION_SERVICES) {
    assert.equal(resolveConsultationService(option), option);
  }
});

test('every service in SERVICES_DATA resolves to an exact valid dropdown option', () => {
  const optionSet = new Set<string>(CONSULTATION_SERVICES);
  for (const service of SERVICES_DATA) {
    const resolved = resolveConsultationService(service.title);
    assert.ok(
      optionSet.has(resolved),
      `Service "${service.title}" resolved to "${resolved}" which is not in CONSULTATION_SERVICES`
    );
    // Website & Web Applications maps cleanly to Website Development; all others match directly
    if (service.title === 'Website & Web Applications') {
      assert.equal(resolved, 'Website Development');
    } else {
      assert.equal(resolved, service.title);
    }
  }
});

test('every ERP wizard recommendation exposes a valid consultationService in CONSULTATION_SERVICES', () => {
  const optionSet = new Set<string>(CONSULTATION_SERVICES);
  const base: QuizState = {
    businessType: '',
    employees: '16-50',
    coreNeeds: [],
    needsManufacturing: 'No',
    needsAccounting: 'Yes',
    needsCRM: 'Standard',
    needsEcommerce: 'B2B_Only',
    customizationExpectation: 'Standard',
  };

  const cases: Array<{ state: QuizState; expected: string }> = [
    { state: { ...base, businessType: 'Manufacturing', needsManufacturing: 'Yes' }, expected: 'ERPNext' },
    { state: { ...base, businessType: 'Retail', needsEcommerce: 'POS_and_Ecom' }, expected: 'Odoo' },
    { state: { ...base, businessType: 'Services', needsCRM: 'Critical' }, expected: 'Zoho' },
    { state: { ...base, businessType: 'Distribution', customizationExpectation: 'Heavy' }, expected: 'Custom ERP' },
    { state: { ...base, businessType: 'Distribution' }, expected: 'ERP Consultancy' },
  ];

  for (const c of cases) {
    const rec = getERPRecommendation(c.state);
    assert.ok(optionSet.has(rec.consultationService));
    assert.equal(rec.consultationService, c.expected);
  }
});

test('resolveConsultationService maps legacy aliases and falls back safely for unknown values', () => {
  assert.equal(resolveConsultationService('Odoo ERP Implementation'), 'Odoo');
  assert.equal(resolveConsultationService('ERPNext Consulting & Implementation'), 'ERPNext');
  assert.equal(resolveConsultationService('Zoho Ecosystem Implementation'), 'Zoho');
  assert.equal(resolveConsultationService('Custom IT & Cloud Architecture'), 'Custom IT Solutions');
  assert.equal(resolveConsultationService('IT Consultancy'), 'IT Consulting');
  assert.equal(resolveConsultationService('   '), DEFAULT_CONSULTATION_SERVICE);
  assert.equal(resolveConsultationService('Unrecognized Service'), DEFAULT_CONSULTATION_SERVICE);
});
