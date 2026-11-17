/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InsightArticle } from '../types.ts';

export const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'erp-selection-guide',
    title: 'Evaluating ERPNext vs. Odoo vs. Zoho: An Architectural Comparison for Growing Businesses',
    category: 'ERP',
    readTime: '6 min read',
    publishDate: 'Published for Strategic Planning',
    isDemo: true,
    summary:
      'A deep dive into open-source flexibility, modular ecosystems, and turnkey cloud suites. How to choose the right platform without buyer regret.',
    content: [
      'Selecting an enterprise resource planning system is one of the most critical technology investments an organization will undertake. The wrong choice introduces operational friction and costly re-implementations, while the right platform catalyzes scalable growth.',
      'ERPNext offers true open-source freedom without license ceilings, making it the premier choice for organizations with in-house technical ambition and deep manufacturing requirements.',
      'Odoo shines through its intuitive modular application catalog and native Point of Sale capabilities, making it a natural fit for multichannel retailers and dynamic service firms.',
      'Zoho provides an integrated cloud-first software suite requiring minimal DevOps overhead, ideal for agile teams looking for turnkey customer relationship management and automated accounting.',
      'A strategic roadmap should always evaluate total cost of ownership (TCO) across 3 to 5 years, data ownership stipulations, and customization requirements before committing to an ecosystem.',
    ],
  },
  {
    id: 'spreadsheet-to-erp-migration',
    title: 'From Spreadsheet Sprawl to Enterprise Clarity: The 5-Step Clean Data Migration Playbook',
    category: 'Digital Transformation',
    readTime: '5 min read',
    publishDate: 'Published for Strategic Planning',
    isDemo: true,
    summary:
      'Spreadsheets are versatile scratchpads, but dangerous operational backbones. Here is how to transition your data into a unified ERP with zero data loss.',
    content: [
      'Almost every successful business begins on spreadsheets. However, once an organization exceeds 10 team members or manages multiple physical warehouses, spreadsheets become liability centers riddled with broken links, version conflicts, and silent omissions.',
      'Step 1: Data Audit. Catalog every operational spreadsheet in active use across sales, procurement, inventory, and bookkeeping.',
      'Step 2: Normalization & Cleansing. Deduplicate vendor records, establish standardized naming conventions, and assign unified item codes (SKUs).',
      'Step 3: Schema Mapping. Map legacy spreadsheet columns to target ERP doctype fields, establishing proper relational foreign keys.',
      'Step 4: Trial Sandbox Migration. Perform trial migration runs in a staging environment to verify opening balances, credit histories, and tax calculations.',
      'Step 5: Cutover & Hypercare. Execute final data imports during off-hours, establish clear cutover protocols, and provide active real-time support during the first operational week.',
    ],
  },
  {
    id: 'business-automation-roi',
    title: 'Eliminating the "Copy-Paste Tax": How Automated Business Workflows Accelerate Working Capital',
    category: 'Business Automation',
    readTime: '4 min read',
    publishDate: 'Published for Strategic Planning',
    isDemo: true,
    summary:
      'Manual data transcription between web stores, invoices, and accounting ledgers drains hours daily. How modern webhook automations pay for themselves.',
    content: [
      'In many mid-sized enterprises, skilled administrators spend between 15 to 25 hours every week manually transcribing customer orders from eCommerce stores into accounting software, emailing purchase orders, and seeking internal sign-offs.',
      'By implementing automated webhook listeners and rule-based approval workflows, transactions flow instantly across systems without manual touchpoints.',
      'Automating recurring invoice dispatches and payment gateway reconciliations directly accelerates cash flow velocity, cutting days off Days Sales Outstanding (DSO).',
      'The result is not just reduced operational overhead, but vastly improved data accuracy, faster client response times, and higher employee satisfaction.',
    ],
  },
  {
    id: 'custom-erp-considerations',
    title: 'When Should You Build Custom Business Software Instead of Buying Off-the-Shelf ERP?',
    category: 'IT Solutions',
    readTime: '5 min read',
    publishDate: 'Published for Strategic Planning',
    isDemo: true,
    summary:
      'Standard ERP platforms solve 80% of common business requirements. What should you do when your competitive moat lies in the remaining 20%?',
    content: [
      'Commercial off-the-shelf ERP platforms are designed around standard industry conventions. When an enterprise attempts to bend a rigid off-the-shelf system to accommodate an unconventional proprietary pricing algorithm or complex supply chain workflow, the system often fights back.',
      'A hybrid architectural approach is frequently the most pragmatic: leveraging an established platform like ERPNext or Odoo for core general ledger accounting and inventory, while engineering a custom frontend web application or microservice for proprietary operational logic.',
      'This hybrid model preserves financial compliance and auditing standards while granting your business 100% control over the customer and partner digital touchpoints that define your market advantage.',
    ],
  },
];
