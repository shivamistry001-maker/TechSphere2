import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  validateEmail,
  validateFullName,
  validateMessage,
  validatePhone,
} from './formValidation.ts';

test('validateFullName rejects empty, whitespace-only, and single-char names', () => {
  assert.ok(validateFullName(''));
  assert.ok(validateFullName('    '));
  assert.ok(validateFullName('A'));
  assert.equal(validateFullName('Priya Shah'), null);
});

test('validateEmail rejects malformed emails like a@b and whitespace-only values', () => {
  assert.ok(validateEmail(''));
  assert.ok(validateEmail('   '));
  assert.ok(validateEmail('a@b'));
  assert.ok(validateEmail('a@b.c'));
  assert.ok(validateEmail('user@domain'));
  assert.ok(validateEmail('user name@company.com'));
  assert.equal(validateEmail('cto@acme-industries.co.in'), null);
  assert.equal(validateEmail('  john@company.com  '), null);
});

test('validatePhone rejects non-phone strings like abc!!, whitespace, and too-short numbers', () => {
  assert.ok(validatePhone(''));
  assert.ok(validatePhone('   '));
  assert.ok(validatePhone('abc!!'));
  assert.ok(validatePhone('12345'));
  assert.ok(validatePhone('91+8320806363'));
  assert.ok(validatePhone('++918320806363'));
  assert.equal(validatePhone('+91 83208 06363'), null);
  assert.equal(validatePhone('(415) 555-0199'), null);
  assert.equal(validatePhone('8320806363'), null);
});

test('validateMessage rejects empty, whitespace-only, and overly short messages', () => {
  assert.ok(validateMessage(''));
  assert.ok(validateMessage('     \n\t  '));
  assert.ok(validateMessage('Hi'));
  assert.equal(validateMessage('Looking to migrate from Tally to ERPNext.'), null);
});

test('validateContactForm blocks whitespace-only and invalid submissions cleanly', () => {
  const bad = validateContactForm({
    fullName: '   ',
    email: 'a@b',
    phone: 'abc!!',
    message: '   ',
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.fullName);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.phone);
  assert.ok(bad.errors.message);

  const good = validateContactForm({
    fullName: 'Aarav Patel',
    email: 'aarav@patelmanufacturing.com',
    phone: '+91 83208 06363',
    message: 'We need an ERPNext rollout across 3 warehouses.',
  });
  assert.equal(good.valid, true);
  assert.deepEqual(good.errors, {});
});
