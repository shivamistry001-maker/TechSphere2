/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusinessProblem {
  id: string;
  problem: string;
  impact: string;
  solutionMapping: string;
  iconName: string;
}

export const BUSINESS_PROBLEMS: BusinessProblem[] = [
  {
    id: 'spreadsheets',
    problem: 'Too many spreadsheets',
    impact: 'Multiple conflicting versions, broken formulas, and zero audit trails across departments.',
    solutionMapping: 'Centralized ERP Database',
    iconName: 'FileSpreadsheet',
  },
  {
    id: 'disconnected-systems',
    problem: 'Disconnected systems',
    impact: 'Sales uses one tool, accounting uses another, and inventory is managed in a separate silo.',
    solutionMapping: 'End-to-End System Integration',
    iconName: 'Unlink',
  },
  {
    id: 'manual-data-entry',
    problem: 'Manual data entry',
    impact: 'Staff spends dozens of hours weekly copying data between invoices, orders, and emails.',
    solutionMapping: 'Automated Workflows & Webhooks',
    iconName: 'Keyboard',
  },
  {
    id: 'inventory-blindspots',
    problem: 'Inventory visibility issues',
    impact: 'Stockouts, excess working capital locked up, and inaccurate fulfillment tracking.',
    solutionMapping: 'Real-Time Multi-Warehouse Inventory',
    iconName: 'Boxes',
  },
  {
    id: 'poor-reporting',
    problem: 'Poor reporting',
    impact: 'Leadership waits days or weeks for end-of-month numbers, leading to delayed decisions.',
    solutionMapping: 'Executive Business Intelligence & Dashboards',
    iconName: 'BarChart3',
  },
  {
    id: 'scattered-crm',
    problem: 'Scattered customer information',
    impact: 'Customer history lost across employee inboxes and forgotten notes, hurting sales conversions.',
    solutionMapping: 'Integrated CRM & Deal Pipeline',
    iconName: 'Users2',
  },
  {
    id: 'slow-approvals',
    problem: 'Slow approval workflows',
    impact: 'Purchase orders and expense approvals stall waiting on managers’ desk, halting operations.',
    solutionMapping: 'Mobile & Automated Approval Hierarchies',
    iconName: 'ClockAlert',
  },
  {
    id: 'legacy-software',
    problem: 'Legacy software',
    impact: 'Antiquated on-premise desktop apps that crash, lack remote access, and cannot integrate.',
    solutionMapping: 'Cloud-Native ERP Modernization',
    iconName: 'ServerCrash',
  },
];

export const TECHSPHERE_SOLUTION_PILLARS = [
  {
    title: 'Modern ERP Systems',
    description: 'Unified single-source-of-truth spanning finance, supply chain, CRM, and manufacturing.',
    iconName: 'Cpu',
  },
  {
    title: 'Process Automation',
    description: 'Intelligent triggers that eliminate repetitive human coordination and manual entry.',
    iconName: 'Zap',
  },
  {
    title: 'Seamless Integrations',
    description: 'Direct API pipelines syncing eCommerce, banks, logistics providers, and internal tools.',
    iconName: 'Network',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Live interactive KPI metrics and financial summaries accessible anywhere on any device.',
    iconName: 'LineChart',
  },
  {
    title: 'Custom Software',
    description: 'Purpose-engineered digital portals and applications when off-the-shelf software falls short.',
    iconName: 'Code',
  },
];
