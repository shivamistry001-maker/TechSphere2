/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Single source of truth for consultation service options shared across
 * every "Consult / Request Quote" CTA, ERP recommendation wizard, and
 * consultation form dropdown so the selected option, submitted payload,
 * and confirmation summary always match exactly.
 */
export const CONSULTATION_SERVICES = [
  'ERP Consultancy',
  'ERP Implementation',
  'ERP Customization',
  'ERP Migration',
  'ERP Integration',
  'ERPNext',
  'Odoo',
  'Zoho',
  'Custom ERP',
  'Website Development',
  'Business Automation',
  'Custom IT Solutions',
  'Digital Transformation',
  'IT Consulting',
  'Other',
] as const;

export type ConsultationServiceOption = (typeof CONSULTATION_SERVICES)[number];

export const DEFAULT_CONSULTATION_SERVICE: ConsultationServiceOption = 'ERP Consultancy';

const SERVICE_SET = new Set<string>(CONSULTATION_SERVICES);

const SERVICE_ALIASES: Readonly<Record<string, ConsultationServiceOption>> = {
  'erpnext consulting & implementation': 'ERPNext',
  'erpnext solutions': 'ERPNext',
  'odoo erp implementation': 'Odoo',
  'odoo erp solutions': 'Odoo',
  'zoho ecosystem implementation': 'Zoho',
  'zoho one / books / crm': 'Zoho',
  'custom erp or erpnext framework': 'Custom ERP',
  'erpnext or odoo (comparative evaluation)': 'ERP Consultancy',
  'website & web applications': 'Website Development',
  'custom it & cloud architecture': 'Custom IT Solutions',
  'it consultancy': 'IT Consulting',
  automation: 'Business Automation',
};

/**
 * Resolves any incoming service label to a guaranteed member of
 * CONSULTATION_SERVICES so the <select> dropdown never falls out of sync
 * with React state or submitted Formspree payloads.
 */
export function resolveConsultationService(
  serviceName?: string | null
): ConsultationServiceOption {
  const trimmed = (serviceName ?? '').trim();
  if (!trimmed) return DEFAULT_CONSULTATION_SERVICE;

  if (SERVICE_SET.has(trimmed)) {
    return trimmed as ConsultationServiceOption;
  }

  const lower = trimmed.toLowerCase();
  const exactCaseInsensitive = CONSULTATION_SERVICES.find(
    (option) => option.toLowerCase() === lower
  );
  if (exactCaseInsensitive) {
    return exactCaseInsensitive;
  }

  if (lower in SERVICE_ALIASES) {
    return SERVICE_ALIASES[lower];
  }

  return DEFAULT_CONSULTATION_SERVICE;
}
