/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem } from '../types.ts';

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'demo-erp-mfg',
    title: 'Precision Manufacturing & Inventory Control Portal',
    category: 'ERP',
    isDemo: true,
    description:
      'Conceptual multi-stage Bill of Materials (BOM) architecture with automated job-card tracking, production scheduling, and batch quality gates built on an open-source ERP framework.',
    technologies: ['ERPNext', 'Python / Frappe', 'PostgreSQL', 'Docker', 'REST API'],
    highlight: 'Unified shop-floor work orders, raw material replenishment, and automated valuation.',
  },
  {
    id: 'demo-b2b-portal',
    title: 'Enterprise B2B Wholesale & Ordering Portal',
    category: 'Applications',
    isDemo: true,
    description:
      'High-throughput distributor portal allowing approved dealers to view tiered wholesale pricing, submit purchase orders against assigned credit limits, and view real-time shipping tracking.',
    technologies: ['React', 'TypeScript', 'Node.js', 'ERP Webhook Sync', 'Tailwind CSS'],
    highlight: 'Sub-second catalog browsing, automated credit validation, and PDF dispatch notes.',
  },
  {
    id: 'demo-omnichannel-retail',
    title: 'Omnichannel Retail & Warehouse Sync Architecture',
    category: 'ERP',
    isDemo: true,
    description:
      'Unified multi-location retail setup connecting physical POS terminals and eCommerce storefronts to a central inventory ledger with instant barcode verification.',
    technologies: ['Odoo', 'PostgreSQL', 'Python', 'Stripe Integration', 'REST APIs'],
    highlight: 'Instant multi-branch stock reconciliation and centralized loyalty database.',
  },
  {
    id: 'demo-corp-platform',
    title: 'Global Logistics Corporate Platform & Fleet Tracking',
    category: 'Web',
    isDemo: true,
    description:
      'Modern, accessible, search-optimized digital flagship website with interactive transit duration estimators, quote request generators, and driver checkpoint feeds.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Schema.org JSON-LD'],
    highlight: 'Achieved 95+ Core Web Vitals score, responsive across 320px to 2560px displays.',
  },
  {
    id: 'demo-automation-pipeline',
    title: 'Automated Procurement & Multi-Level Approval Engine',
    category: 'Automation',
    isDemo: true,
    description:
      'Process automation system that monitors inventory safety thresholds, drafts supplier purchase orders, and routes them via interactive notifications for managerial approval.',
    technologies: ['Node.js', 'Webhooks', 'REST APIs', 'Email Gateways', 'ERPNext Scripts'],
    highlight: 'Eliminated manual email chasing for purchase approvals and automated audit logs.',
  },
  {
    id: 'demo-analytics-dashboard',
    title: 'Executive Financial & Operational KPI Console',
    category: 'Applications',
    isDemo: true,
    description:
      'Real-time business intelligence dashboard consolidating sales conversion rates, departmental gross margins, cashflow velocity, and supplier delivery performance.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zoho Analytics Integration', 'REST'],
    highlight: 'Live interactive filtering, drill-down financial statements, and scheduled executive digests.',
  },
  {
    id: 'demo-saas-billing',
    title: 'Recurring Billing & Subscription Ledger Connector',
    category: 'Automation',
    isDemo: true,
    description:
      'Automated reconciliation engine connecting payment gateway webhooks directly to double-entry accounting ledgers with automatic tax compliance invoice generation.',
    technologies: ['TypeScript', 'Node.js', 'Payment APIs', 'Accounting Webhooks', 'Docker'],
    highlight: 'Automated revenue recognition, failed payment retries, and ledger synchronization.',
  },
  {
    id: 'demo-field-service-app',
    title: 'Mobile Field Service & Work-Order Ticket Tracker',
    category: 'Applications',
    isDemo: true,
    description:
      'PWA-ready technician application for logging repair diagnostics, recording spare parts consumed from van inventory, and capturing client electronic sign-off.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Service Workers', 'Odoo API'],
    highlight: 'Offline caching with auto-synchronization once cellular connectivity is restored.',
  },
];
