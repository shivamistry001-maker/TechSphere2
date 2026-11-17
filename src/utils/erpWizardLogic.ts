/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ERPComparisonItem, QuizState } from '../types.ts';

export interface ERPRecommendationResult {
  primary: string;
  badge: string;
  description: string;
  alternatives: string[];
  matchReason: string;
}

/**
 * Evaluates the neutral ERP recommendation matrix based on wizard responses.
 * Preserves existing TechSphere recommendation calculations and business rules.
 */
export function getERPRecommendation(quizState: QuizState): ERPRecommendationResult {
  const {
    businessType,
    needsManufacturing,
    needsCRM,
    needsEcommerce,
    customizationExpectation,
  } = quizState;

  if (needsManufacturing === 'Yes' || businessType === 'Manufacturing') {
    return {
      primary: 'ERPNext',
      badge: 'Recommended for Deep Manufacturing & Operational Control',
      description:
        'Based on your emphasis on production workflows, multi-level BOMs, and inventory tracking, ERPNext represents an exceptional candidate. Its open-source architecture eliminates licensing ceilings as your workstation count grows.',
      alternatives: ['Odoo Manufacturing', 'Custom MRP Modules'],
      matchReason:
        'Unmatched native manufacturing, job cards, and unified data architecture without per-user module fees.',
    };
  }

  if (businessType === 'Retail' || needsEcommerce === 'POS_and_Ecom') {
    return {
      primary: 'Odoo',
      badge: 'Recommended for Omnichannel Retail & Modular Architecture',
      description:
        'Your operational focus on retail Point of Sale (POS) combined with eCommerce synchronization aligns closely with Odoo’s modular ecosystem. Its sleek user interface minimizes training time for floor staff.',
      alternatives: ['ERPNext with Retail POS', 'Zoho Inventory & Commerce'],
      matchReason:
        'Exceptional integrated Point-of-Sale (POS) and drag-and-drop modular application catalog.',
    };
  }

  if (businessType === 'Services' || businessType === 'Startup' || needsCRM === 'Critical') {
    return {
      primary: 'Zoho One / Books / CRM',
      badge: 'Recommended for Cloud Productivity & Fast Deployment',
      description:
        'For agile teams and services prioritizing client acquisition, project milestones, automated recurring invoicing, and cloud mobility, the Zoho suite delivers world-class velocity with zero server maintenance.',
      alternatives: ['Odoo Services', 'ERPNext Projects'],
      matchReason:
        'Industry-leading CRM automation, intuitive Zoho Books finance, and turnkey cloud infrastructure.',
    };
  }

  if (customizationExpectation === 'Heavy') {
    return {
      primary: 'Custom ERP or ERPNext Framework',
      badge: 'Recommended for Proprietary Operational Workflows',
      description:
        'Your requirement for deep custom logic indicates that rigid proprietary SaaS platforms may cause operational friction. A custom architecture or a headless Frappe/ERPNext framework will preserve your operational moat.',
      alternatives: ['Frappe Framework', 'Bespoke React + Node + PostgreSQL'],
      matchReason:
        'Tailored specifically around your proprietary algorithms with 100% intellectual property ownership.',
    };
  }

  return {
    primary: 'ERPNext or Odoo (Comparative Evaluation)',
    badge: 'Balanced Platform Assessment Recommended',
    description:
      'Your operational profile can be successfully addressed by either ERPNext (for comprehensive data ownership) or Odoo (for modular app-by-app adoption). We recommend a brief consultative discovery to evaluate your specific team preferences.',
    alternatives: ['Zoho One', 'Custom Architecture'],
    matchReason: 'Balanced operational needs across finance, inventory, and sales.',
  };
}

/**
 * Filters ERP comparison rows against a search query across all columns.
 */
export function filterERPComparison(
  rows: ERPComparisonItem[],
  query: string
): ERPComparisonItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(
    (item) =>
      item.category.toLowerCase().includes(q) ||
      item.erpnext.toLowerCase().includes(q) ||
      item.odoo.toLowerCase().includes(q) ||
      item.zoho.toLowerCase().includes(q) ||
      item.custom.toLowerCase().includes(q)
  );
}
