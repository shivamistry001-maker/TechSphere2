/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ERPPlatform, ERPComparisonItem } from '../types.ts';

export const ERP_DISCLAIMER =
  'TechSphere provides consultancy and implementation support across modern ERP ecosystems. We independently evaluate business requirements to match and implement the most suitable platform for each client.';

export const ERP_PLATFORMS: ERPPlatform[] = [
  {
    id: 'erpnext',
    name: 'ERPNext',
    badge: 'Open-Source & Comprehensive',
    tagline: '100% open-source, monolithic power with zero artificial licensing hurdles.',
    description:
      'ERPNext is a full-featured, completely open-source business management platform engineered for businesses seeking transparency, deep customization, and unified data architecture without per-user subscription lock-in.',
    strengths: [
      'Pure open-source with Python / Frappe framework flexibility',
      'Unified data model with all modules included out of the box',
      'Outstanding manufacturing (BOM, Work Orders) and accounting modules',
      'No per-module paywalls or hidden license tier restrictions',
      'Self-hostable on any private cloud or managed cloud hosting',
    ],
    modules: [
      'Accounting & Financial Management',
      'CRM & Opportunity Management',
      'Sales & Quotation Processing',
      'Purchase & Supplier Management',
      'Inventory & Multi-Warehouse Tracking',
      'Manufacturing & Production Planning',
      'Human Resources & Payroll',
      'Project Management & Timesheets',
      'Portal & Built-in Website Builder',
    ],
    bestSuitedFor:
      'Growing manufacturers, distributors, trading companies, and engineering businesses seeking deep operational control, customizable workflows, and ownership of their entire codebase.',
    routeId: 'erpnext',
  },
  {
    id: 'odoo',
    name: 'Odoo',
    badge: 'Modular & High Polish',
    tagline: 'Versatile modular architecture with a vibrant app ecosystem.',
    description:
      'Odoo offers an intuitive, modular ecosystem where organizations can start with a single app (like CRM or Invoicing) and incrementally expand into comprehensive manufacturing, eCommerce, and inventory management.',
    strengths: [
      'Modular app-by-app rollout capability',
      'Sleek modern user interface with intuitive drag-and-drop views',
      'Vast third-party community module marketplace',
      'Native dual-direction eCommerce and Point of Sale (POS) synchronization',
      'Strong international accounting localization presets',
    ],
    modules: [
      'CRM & Sales Pipeline',
      'Sales Management',
      'Double-Entry Accounting & Invoicing',
      'Inventory & Barcode Scanning',
      'Manufacturing (MRP & Work Centers)',
      'Purchasing & Procurement Automation',
      'Human Resources & Recruitment',
      'Omnichannel Website & eCommerce',
      'Project Management & Helpdesk',
    ],
    bestSuitedFor:
      'Retailers, omnichannel eCommerce brands, service companies, and diversified businesses that value modern UI aesthetics, integrated point-of-sale, and modular step-by-step expansion.',
    routeId: 'odoo',
  },
  {
    id: 'zoho',
    name: 'Zoho One / Books / CRM',
    badge: 'Cloud-Native SaaS Ecosystem',
    tagline: 'All-in-one cloud productivity, financial, and customer relationship suite.',
    description:
      'The Zoho ecosystem provides tightly integrated cloud-native SaaS applications covering front-office CRM, back-office Books, inventory tracking, analytics, and HR with virtually zero server management overhead.',
    strengths: [
      'Zero server maintenance or DevOps infrastructure requirement',
      'Class-leading CRM, marketing automation, and email synchronization',
      'Intuitive accounting with Zoho Books and bank automated feeds',
      'Zoho Analytics with powerful BI dashboards and visual query builders',
      'Zoho Creator for rapid low-code custom business applications',
    ],
    modules: [
      'Zoho CRM (Lead, Account, & Deal Lifecycle)',
      'Zoho Books (Accounting, Invoicing, Tax Compliance)',
      'Zoho Inventory (Order Management & Fulfillment)',
      'Zoho Projects (Agile Task & Milestone Tracking)',
      'Zoho Analytics (Business Intelligence & Reporting)',
      'Zoho People (Employee Management & Attendance)',
      'Zoho Creator (Low-Code Custom App Development)',
    ],
    bestSuitedFor:
      'Startups, professional services firms, agencies, consultancies, and distributed teams looking for rapid cloud setup, world-class CRM automation, and turnkey cloud finance.',
    routeId: 'zoho',
  },
  {
    id: 'custom',
    name: 'Custom ERP & Business Systems',
    badge: 'Tailored Architecture',
    tagline: 'Engineered specifically around proprietary workflows and unique business models.',
    description:
      'When your business operates specialized proprietary workflows that cannot be accommodated by standard commercial packages, TechSphere engineers custom-built business architectures tailored to your specific metrics.',
    strengths: [
      '100% alignment with proprietary operational algorithms',
      'Zero bloat, unnecessary fields, or irrelevant feature modules',
      'Complete intellectual property ownership and custom API design',
      'Maximum database performance tuned for your exact query patterns',
      'Tailored UI designed specifically for your staff’s exact daily tasks',
    ],
    modules: [
      'Custom Operational Engines',
      'Proprietary Calculation & Quoting Modules',
      'Specialized Multi-Tier Approval Gates',
      'Bespoke Partner & Supplier Portals',
      'Dedicated Real-Time Operational Dashboards',
      'Custom Data Lake & Warehouse Sync',
    ],
    bestSuitedFor:
      'Organizations with complex proprietary pricing models, specialized logistics chains, or unique compliance demands where adapting to generic ERP templates would cause operational friction.',
    routeId: 'erp-solutions',
  },
];

export const ERP_COMPARISON_DATA: ERPComparisonItem[] = [
  {
    category: 'Target Business Size',
    erpnext: 'SMEs to mid-market enterprises (10 to 500+ users)',
    odoo: 'Startups to large enterprises (5 to 1,000+ users)',
    zoho: 'Solopreneurs, startups to mid-sized businesses (5 to 250+ users)',
    custom: 'Specialized SMEs to high-volume niche enterprises',
  },
  {
    category: 'Customization Flexibility',
    erpnext: 'High — Open-source code, custom doctypes, Python scripts, client scripts',
    odoo: 'High — Odoo Studio (Enterprise) and custom Python/XML modules',
    zoho: 'Moderate — Zoho Creator (Deluge script) and workflow rules',
    custom: 'Complete — Unlimited bespoke flexibility from UI to database',
  },
  {
    category: 'Financial & Accounting',
    erpnext: 'Deep double-entry ledger, cost centers, multi-currency, consolidated P&L',
    odoo: 'Comprehensive multi-currency accounting with smart reconciliation',
    zoho: 'Exceptionally intuitive Zoho Books with automatic bank feeds & e-invoicing',
    custom: 'Custom tailored accounting integration or built-in ledger schema',
  },
  {
    category: 'CRM & Pipeline',
    erpnext: 'Built-in lead capture, opportunity stages, email communication tracking',
    odoo: 'Interactive Kanban pipeline, quotation templates, VoIP integration',
    zoho: 'Industry-leading CRM with AI scoring, omni-channel messaging, blueprints',
    custom: 'Purpose-built sales workflows and deal tracking',
  },
  {
    category: 'Inventory & Warehousing',
    erpnext: 'Batch/serial tracking, multiple warehouses, FIFO/moving avg valuation',
    odoo: 'Double-entry inventory logic, barcode scanner support, multi-location dropship',
    zoho: 'Multi-channel inventory management synced with popular eCommerce channels',
    custom: 'Custom bin-level logic, specialized batch rules, RFID integration',
  },
  {
    category: 'Manufacturing (MRP)',
    erpnext: 'Robust multi-level BOMs, operations, work stations, production orders',
    odoo: 'Visual work centers, IoT box integration, quality control checkpoints',
    zoho: 'Basic assembly/bundling (advanced MRP requires third-party add-ons)',
    custom: 'Bespoke machinery telemetry, custom scrap tracking, custom scheduling',
  },
  {
    category: 'Process Automation',
    erpnext: 'Automated notification rules, scheduled cron scripts, webhook triggers',
    odoo: 'Automated actions, stage triggers, scheduled server activities',
    zoho: 'Rich visual workflow rules, Blueprint process enforcement, webhooks',
    custom: 'Microservice-driven asynchronous workers and custom queues',
  },
  {
    category: 'Integrations & APIs',
    erpnext: 'Full REST API, webhooks, Frappe framework API tokens',
    odoo: 'XML-RPC / JSON-RPC APIs, external API connectors',
    zoho: 'REST APIs, Zoho Flow connector, pre-built ecosystem sync',
    custom: 'Custom REST / GraphQL endpoints tailored to your exact payload schemas',
  },
  {
    category: 'Scalability & Hosting',
    erpnext: 'Self-hosted (Linux/Docker/Kubernetes) or managed Frappe Cloud',
    odoo: 'Odoo Online (SaaS), Odoo.sh (PaaS), or On-Premise',
    zoho: '100% managed cloud SaaS by Zoho Corporation',
    custom: 'Cloud-native (AWS, GCP, DigitalOcean, or hybrid private clouds)',
  },
  {
    category: 'Deployment Timeline',
    erpnext: 'Typically 4 to 12 weeks depending on customization scope',
    odoo: 'Typically 4 to 16 weeks depending on modules selected',
    zoho: 'Typically 2 to 8 weeks for standard cloud setup',
    custom: 'Typically 8 to 24 weeks phased development roadmap',
  },
  {
    category: 'Best Use Cases',
    erpnext: 'Manufacturing, distribution, engineering firms wanting total data control',
    odoo: 'Retail, omni-channel eCommerce, service firms seeking modular elegance',
    zoho: 'Consulting, services, tech startups, agencies wanting quick SaaS rollout',
    custom: 'Proprietary business models, non-standard compliance, bespoke workflows',
  },
];

export interface ERPModuleItem {
  name: string;
  description: string;
  features: string[];
}

export const ERP_MODULES: ERPModuleItem[] = [
  {
    name: 'Accounting & Finance',
    description: 'Double-entry general ledger, AP/AR, cash flow forecasting, multi-currency, and automated financial statements.',
    features: ['General Ledger', 'Accounts Payable', 'Accounts Receivable', 'Asset Depreciation', 'Tax Reconciliation'],
  },
  {
    name: 'Inventory & Warehouse Management',
    description: 'Multi-location real-time stock levels, batch/lot tracking, serial numbers, and automated reorder points.',
    features: ['Multi-Warehouse', 'Batch/Serial Tracking', 'Stock Aging', 'Automated Reorders', 'Barcode Scanner Support'],
  },
  {
    name: 'Manufacturing & Production (MRP)',
    description: 'Multi-level Bill of Materials (BOM), work orders, job cards, routing, capacity planning, and scrap tracking.',
    features: ['Multi-Level BOM', 'Work Orders', 'Routing & Workstations', 'Capacity Planning', 'Material Requirement Planning'],
  },
  {
    name: 'CRM & Sales Pipeline',
    description: 'Omnichannel lead capture, quotation generation, pipeline stages, contract renewals, and customer histories.',
    features: ['Lead Scoring', 'Quotation Engine', 'Sales Orders', 'Customer 360', 'Commissions & Incentives'],
  },
  {
    name: 'Procurement & Supplier Management',
    description: 'Purchase requests, RFQs, vendor evaluations, purchase orders, automated 3-way matching, and debit notes.',
    features: ['Purchase Requisitions', 'Vendor Scorecards', '3-Way Matching', 'Price Lists', 'Automated Replenishment'],
  },
  {
    name: 'Human Resources & Payroll',
    description: 'Employee profiles, automated salary computation, attendance tracking, leave requests, and tax deductions.',
    features: ['Salary Structure', 'Attendance Logs', 'Leave Approvals', 'Expense Claims', 'Performance Appraisals'],
  },
  {
    name: 'Supply Chain & Logistics',
    description: 'Carrier shipping integrations, airway bills, dispatch tracking, landed cost calculation, and freight management.',
    features: ['Shipping Rate APIs', 'Landed Cost Vouchers', 'Dispatch Tracking', 'Fleet Logs', 'Drop-shipping'],
  },
  {
    name: 'Project Management & Billing',
    description: 'Timesheets, milestone billings, task dependencies, project budgets, and employee hourly cost calculations.',
    features: ['Gantt Charts', 'Task Dependencies', 'Timesheet Invoicing', 'Budget vs Actuals', 'Milestone Tracking'],
  },
  {
    name: 'Business Intelligence & Executive Analytics',
    description: 'Custom executive dashboards, scheduled email digests, KPI monitors, and real-time operational trend analysis.',
    features: ['Live Dashboards', 'Drill-Down Reports', 'Automated PDF Digests', 'Cohort Analysis', 'Custom SQL Queries'],
  },
];

