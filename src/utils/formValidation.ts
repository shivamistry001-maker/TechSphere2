/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactValidationInput {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactValidationField = keyof ContactValidationInput;

export type ContactValidationErrors = Partial<Record<ContactValidationField, string>>;

export interface ContactValidationResult {
  valid: boolean;
  errors: ContactValidationErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const PHONE_ALLOWED_CHARS = /^[+\d\s().-]+$/;

export function validateFullName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please enter your full name.';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters.';
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please enter your email address.';
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@company.com).';
  }
  return null;
}

export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please enter a valid phone number.';
  }
  if (!PHONE_ALLOWED_CHARS.test(trimmed)) {
    return 'Phone number may only include digits, spaces, +, -, and parentheses.';
  }
  // Ensure '+' if present appears only at the start
  if (trimmed.indexOf('+') > 0 || trimmed.indexOf('+') !== trimmed.lastIndexOf('+')) {
    return 'Please enter a valid international phone number (e.g. +91 83208 06363).';
  }
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return 'Phone number must contain between 7 and 15 digits.';
  }
  return null;
}

export function validateMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Please share your project requirements.';
  }
  if (trimmed.length < 5) {
    return 'Please provide at least 5 characters describing your requirements.';
  }
  return null;
}

export function validateContactField(
  field: ContactValidationField,
  value: string
): string | null {
  switch (field) {
    case 'fullName':
      return validateFullName(value);
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'message':
      return validateMessage(value);
  }
}

export function validateContactForm(
  input: ContactValidationInput
): ContactValidationResult {
  const errors: ContactValidationErrors = {};

  const fullNameError = validateFullName(input.fullName);
  if (fullNameError) errors.fullName = fullNameError;

  const emailError = validateEmail(input.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(input.phone);
  if (phoneError) errors.phone = phoneError;

  const messageError = validateMessage(input.message);
  if (messageError) errors.message = messageError;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
