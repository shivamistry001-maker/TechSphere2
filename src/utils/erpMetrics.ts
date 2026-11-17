/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ERPKPIMetric, ERPMetricScope } from '../types.ts';
import { easeOutCubic } from './motion.ts';

export const ERP_SCOPE_OPTIONS: Array<{
  id: ERPMetricScope;
  label: string;
  summary: string;
}> = [
  {
    id: 'all',
    label: 'All ERP Platforms',
    summary: 'Consolidated operational benchmarks measured across TechSphere ERPNext, Odoo, and Zoho deployments.',
  },
  {
    id: 'erpnext',
    label: 'ERPNext',
    summary: 'Verified workflow velocity, BOM costing accuracy, and open-source ROI from Frappe / ERPNext rollouts.',
  },
  {
    id: 'odoo',
    label: 'Odoo ERP',
    summary: 'Omnichannel order fulfillment, POS sync reliability, and automated invoicing gains across Odoo suites.',
  },
  {
    id: 'zoho',
    label: 'Zoho Suite',
    summary: 'Lead-to-cash acceleration, automated Deluge triggers, and cloud analytics speed on Zoho One.',
  },
];

export const ERP_PERFORMANCE_METRICS: ERPKPIMetric[] = [
  // Unified / All ERP Platforms
  {
    id: 'all-efficiency',
    scope: 'all',
    displayValue: '30%',
    numericTarget: 30,
    prefix: '+',
    suffix: '%',
    label: 'Operational Efficiency Increase',
    impactSummary: 'Cross-department throughput gains by replacing disconnected spreadsheets with unified workflows.',
    timeframe: 'Within 90 days post-go-live',
    baseline: 'vs. manual multi-sheet workflows',
    moduleContext: 'Core ERP · Process Automation',
    benchmarkPercent: 82,
  },
  {
    id: 'all-automation',
    scope: 'all',
    displayValue: '24/7',
    numericTarget: 24,
    secondaryTarget: 7,
    separator: '/',
    label: '24/7 Workflow Automation',
    impactSummary: 'Continuous background sync across approvals, low-stock reorder rules, and invoice dispatch.',
    timeframe: 'Always-on scheduled triggers',
    baseline: 'vs. manual end-of-day batch entry',
    moduleContext: 'Webhooks · Automated Rules',
    benchmarkPercent: 100,
  },
  {
    id: 'all-cycle-time',
    scope: 'all',
    displayValue: '45%',
    numericTarget: 45,
    suffix: '%',
    label: 'Faster Order-to-Cash Cycle',
    impactSummary: 'Accelerated progression from approved quotation to sales order, delivery note, and ledger posting.',
    timeframe: 'Measured across Q1–Q2 rollouts',
    baseline: 'vs. fragmented legacy billing',
    moduleContext: 'Sales · Accounting',
    benchmarkPercent: 76,
  },
  {
    id: 'all-stock-accuracy',
    scope: 'all',
    displayValue: '99.4%',
    numericTarget: 99.4,
    decimals: 1,
    suffix: '%',
    label: 'Real-Time Inventory Accuracy',
    impactSummary: 'Barcode-verified bin movements and valuation ledgers eliminate stockouts and write-offs.',
    timeframe: 'Continuous cycle-count audit',
    baseline: 'vs. ~84% manual stock counts',
    moduleContext: 'Inventory · Warehouse',
    benchmarkPercent: 99,
  },

  // ERPNext
  {
    id: 'erpnext-efficiency',
    scope: 'erpnext',
    displayValue: '34%',
    numericTarget: 34,
    prefix: '+',
    suffix: '%',
    label: 'Production & Team Efficiency',
    impactSummary: 'Shop-floor job cards, multi-level BOMs, and material requests keep lines supplied without bottlenecks.',
    timeframe: 'Average at 12 weeks post-launch',
    baseline: 'vs. paper job-card tracking',
    moduleContext: 'ERPNext · Manufacturing & MRP',
    benchmarkPercent: 85,
  },
  {
    id: 'erpnext-automation',
    scope: 'erpnext',
    displayValue: '24/7',
    numericTarget: 24,
    secondaryTarget: 7,
    separator: '/',
    label: '24/7 Ledger & Stock Automation',
    impactSummary: 'Frappe background workers reconcile perpetual inventory, GST filings, and bank alerts around the clock.',
    timeframe: 'Zero manual intervention',
    baseline: 'vs. weekly accounting close',
    moduleContext: 'Frappe Engine · Finance',
    benchmarkPercent: 100,
  },
  {
    id: 'erpnext-license-savings',
    scope: 'erpnext',
    displayValue: '60%',
    numericTarget: 60,
    suffix: '%',
    label: 'Lower 3-Year TCO',
    impactSummary: 'Open-source GNU GPLv3 architecture removes recurring per-user seat fees as headcount scales.',
    timeframe: '36-month total cost horizon',
    baseline: 'vs. per-seat proprietary ERPs',
    moduleContext: 'Open-Source Architecture',
    benchmarkPercent: 88,
  },
  {
    id: 'erpnext-close-speed',
    scope: 'erpnext',
    displayValue: '3.2x',
    numericTarget: 3.2,
    decimals: 1,
    suffix: 'x',
    label: 'Faster Month-End Financial Close',
    impactSummary: 'Automated AP/AR ageing, tax reconciliation, and P&L statements ready within days, not weeks.',
    timeframe: 'Monthly closing cycle',
    baseline: 'vs. 14-day manual ledger close',
    moduleContext: 'Accounting · P&L Analytics',
    benchmarkPercent: 80,
  },

  // Odoo ERP
  {
    id: 'odoo-efficiency',
    scope: 'odoo',
    displayValue: '32%',
    numericTarget: 32,
    prefix: '+',
    suffix: '%',
    label: 'Fulfillment Efficiency Gain',
    impactSummary: 'Unified CRM quotations, barcode picking routes, and vendor bills streamline high-volume order flows.',
    timeframe: 'Measured over first 6 months',
    baseline: 'vs. siloed CRM and billing tools',
    moduleContext: 'Odoo Sales · Inventory',
    benchmarkPercent: 83,
  },
  {
    id: 'odoo-automation',
    scope: 'odoo',
    displayValue: '24/7',
    numericTarget: 24,
    secondaryTarget: 7,
    separator: '/',
    label: '24/7 Omnichannel POS Sync',
    impactSummary: 'Storefront orders, POS registers, and central stock valuation stay continuously synchronized.',
    timeframe: 'Real-time store & web sync',
    baseline: 'vs. overnight CSV imports',
    moduleContext: 'Odoo POS · eCommerce',
    benchmarkPercent: 100,
  },
  {
    id: 'odoo-reconciliation',
    scope: 'odoo',
    displayValue: '50%',
    numericTarget: 50,
    suffix: '%',
    label: 'Reduction in Manual Data Entry',
    impactSummary: 'Automated PO-to-bill matching and bank statement rules eliminate repetitive clerical re-keying.',
    timeframe: 'Weekly finance operations',
    baseline: 'vs. duplicate invoice entry',
    moduleContext: 'Purchase · Accounting',
    benchmarkPercent: 78,
  },
  {
    id: 'odoo-onboarding',
    scope: 'odoo',
    displayValue: '96%',
    numericTarget: 96,
    suffix: '%',
    label: 'Team Adoption Within 30 Days',
    impactSummary: 'Clean Kanban pipelines and modular app workspaces shorten staff training across branches.',
    timeframe: 'First 30 days after training',
    baseline: 'across multi-branch rollouts',
    moduleContext: 'CRM · Operations UI',
    benchmarkPercent: 96,
  },

  // Zoho Suite
  {
    id: 'zoho-efficiency',
    scope: 'zoho',
    displayValue: '30%',
    numericTarget: 30,
    prefix: '+',
    suffix: '%',
    label: 'Sales & Ops Efficiency Increase',
    impactSummary: 'Connected Zoho CRM deals convert directly into Zoho Books invoices and Zoho Inventory shipments.',
    timeframe: 'Within 60 days of deployment',
    baseline: 'vs. disconnected CRM & invoicing',
    moduleContext: 'Zoho One · Revenue Ops',
    benchmarkPercent: 82,
  },
  {
    id: 'zoho-automation',
    scope: 'zoho',
    displayValue: '24/7',
    numericTarget: 24,
    secondaryTarget: 7,
    separator: '/',
    label: '24/7 Deluge Workflow Automation',
    impactSummary: 'Serverless Deluge functions route leads, trigger payment reminders, and sync stock webhooks nonstop.',
    timeframe: 'Cloud-native execution',
    baseline: 'vs. manual follow-up queues',
    moduleContext: 'Zoho Creator · Deluge',
    benchmarkPercent: 100,
  },
  {
    id: 'zoho-deployment',
    scope: 'zoho',
    displayValue: '4 Wks',
    numericTarget: 4,
    suffix: ' Wks',
    label: 'Rapid Cloud Time-to-Value',
    impactSummary: 'Zero server provisioning overhead enables fast configuration, data migration, and user rollout.',
    timeframe: 'Standard SME rollout sprint',
    baseline: 'vs. 16+ week on-prem setups',
    moduleContext: 'Cloud Deployment',
    benchmarkPercent: 86,
  },
  {
    id: 'zoho-reporting',
    scope: 'zoho',
    displayValue: '100%',
    numericTarget: 100,
    suffix: '%',
    label: 'Live Executive KPI Visibility',
    impactSummary: 'Zoho Analytics blends revenue, inventory aging, and department utilization into one live digest.',
    timeframe: 'Real-time scheduled digests',
    baseline: 'vs. static weekly Excel packs',
    moduleContext: 'Zoho Analytics · BI',
    benchmarkPercent: 100,
  },
];

export function getMetricsForScope(scope: ERPMetricScope): ERPKPIMetric[] {
  const filtered = ERP_PERFORMANCE_METRICS.filter((item) => item.scope === scope);
  if (filtered.length > 0) return filtered;
  return ERP_PERFORMANCE_METRICS.filter((item) => item.scope === 'all');
}

export function getScopeOption(scope: ERPMetricScope) {
  return (
    ERP_SCOPE_OPTIONS.find((opt) => opt.id === scope) ?? ERP_SCOPE_OPTIONS[0]
  );
}

export function formatAnimatedMetricValue(
  metric: ERPKPIMetric,
  rawProgress: number
): string {
  const clamped = Math.max(0, Math.min(1, Number.isFinite(rawProgress) ? rawProgress : 0));
  if (clamped >= 1) {
    return `${metric.prefix ?? ''}${metric.displayValue}`;
  }

  const eased = easeOutCubic(clamped);
  const prefix = metric.prefix ?? '';
  const suffix = metric.suffix ?? '';

  if (typeof metric.secondaryTarget === 'number' && metric.separator) {
    const primary = Math.round(eased * metric.numericTarget);
    const secondary = Math.round(eased * metric.secondaryTarget);
    return `${prefix}${primary}${metric.separator}${secondary}${suffix}`;
  }

  const decimals = metric.decimals ?? 0;
  if (decimals > 0) {
    const current = (eased * metric.numericTarget).toFixed(decimals);
    return `${prefix}${current}${suffix}`;
  }

  const current = Math.round(eased * metric.numericTarget);
  return `${prefix}${current}${suffix}`;
}
