/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseStudyItem } from '../types.ts';

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  {
    id: 'sample-case-mfg-consolidation',
    title: 'Precision Component Manufacturer: Eliminating Disconnected Spreadsheets',
    industry: 'Industrial Manufacturing',
    isSample: true,
    challenge:
      'The client operated across 3 physical facilities managing inventory and Bill of Materials on over 40 distinct spreadsheets. Stock discrepancies caused frequent assembly stoppages, and costing calculations were delayed by several weeks.',
    approach:
      'TechSphere conducted a 2-week operational discovery mapping all production routing, raw material grades, and work center bottlenecks. We designed a unified open-source ERP schema to replace redundant spreadsheets.',
    solution:
      'Configured ERPNext with customized BOMs, automated material requests tied to reorder levels, and deployed simplified tablet-based job cards directly onto the workshop floor.',
    technology: ['ERPNext', 'Frappe Framework', 'PostgreSQL', 'Docker', 'Linux Server'],
    process: [
      'Comprehensive workflow & BOM audit across all facilities',
      'Master data sanitization and historical inventory reconciliation',
      'Staged pilot testing with shop floor foremen and machine operators',
      'Phased cutover over a long weekend with on-site and remote hypercare',
    ],
    outcome:
      'Achieved real-time visibility of raw material stock across all 3 plants, eliminated spreadsheet duplication, and enabled instant daily production cost calculations.',
  },
  {
    id: 'sample-case-retail-omnichannel',
    title: 'Multi-Branch Retail Brand: Unifying In-Store POS & Online eCommerce',
    industry: 'Retail & Consumer Goods',
    isSample: true,
    challenge:
      'The company ran 4 physical retail boutiques with separate desktop cash registers and an independent online storefront. E-commerce shoppers frequently purchased items already sold in-store, resulting in manual cancellations and customer frustration.',
    approach:
      'We architected an integrated ERP strategy centered on a single central inventory database with sub-second webhook triggers connecting the web store to retail POS registers.',
    solution:
      'Implemented Odoo Enterprise with integrated Point of Sale and bidirectional connector to the web shop. When an item scans at a register, online inventory decrements immediately.',
    technology: ['Odoo', 'PostgreSQL', 'Barcode Scanners', 'Stripe POS', 'REST API Webhooks'],
    process: [
      'Standardized product barcode numbering and variant structures',
      'Configured fast-responsive POS interfaces with touch-friendly navigation',
      'Implemented bi-directional synchronization middleware with retry logic',
      'Conducted staff cash-register drills and customer receipt customization',
    ],
    outcome:
      'Eliminated inventory overselling, unified customer purchase history across online and physical channels, and reduced daily store reconciliation time to under 15 minutes.',
  },
  {
    id: 'sample-case-services-automation',
    title: 'Professional Engineering Consultancy: Streamlining Project Billing & Timesheets',
    industry: 'Professional Services',
    isSample: true,
    challenge:
      'Engineers recorded hours on manual timesheet forms submitted at the end of the month. Project managers lacked live visibility into budget burn-rates, causing projects to routinely exceed planned hours before invoicing occurred.',
    approach:
      'Designed a cloud-native workflow connecting mobile time logging directly to project milestones and automated client invoicing rules.',
    solution:
      'Deployed Zoho One (Zoho Projects & Zoho Books) with automated milestone alerts, automated client approval portals, and integrated expense claim logging.',
    technology: ['Zoho One', 'Zoho Projects', 'Zoho Books', 'Zoho Analytics', 'Mobile Apps'],
    process: [
      'Defined standardized rate cards, employee cost rates, and milestone templates',
      'Integrated corporate banking feeds with automated expense matching',
      'Trained project leads on milestone profitability dashboards',
      'Rolled out mobile app for field engineers with 1-click timer tracking',
    ],
    outcome:
      'Accelerated billing turnaround from weeks to days, established real-time project profitability tracking, and removed administrative friction for technical consultants.',
  },
  {
    id: 'sample-case-distribution-b2b',
    title: 'Wholesale Distributor: Automated Credit Limits & B2B Self-Service Ordering',
    industry: 'Wholesale & Distribution',
    isSample: true,
    challenge:
      'Over 200 retail dealers placed orders via phone calls and messaging apps. Sales coordinators manually validated credit limits against the accounting ledger, causing dispatch backlogs and order entry errors.',
    approach:
      'Engineered a secure B2B dealer portal integrated directly with the backend ERP to automate order placement and credit verification.',
    solution:
      'Built a custom React-based B2B ordering portal connected via secure APIs to ERPNext, featuring customer-specific tier pricing, live credit limit status, and automated dispatch note generation.',
    technology: ['React', 'TypeScript', 'Node.js', 'ERPNext API', 'Tailwind CSS'],
    process: [
      'Security audit and customer authentication architecture design',
      'Developed API gateway with cached pricing tables for rapid catalog search',
      'Configured automated credit hold workflows and payment gateway links',
      'Gradual rollout to top 20 dealers followed by full network onboarding',
    ],
    outcome:
      'Dealers self-serve orders 24/7 without manual phone calls, eliminating ordering errors and freeing the sales team to focus on new account acquisition.',
  },
];
