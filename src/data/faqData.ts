/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FAQItem } from '../types.ts';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What does TechSphere do?',
    answer:
      'TechSphere is an IT Solutions & ERP Consultancy specializing in helping businesses digitize operations, automate manual workflows, implement enterprise ERP platforms, and build scalable digital products. We assist organizations from initial strategic evaluation and architecture design through implementation, customization, data migration, and long-term optimization.',
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'Which ERP platforms do you work with?',
    answer:
      'We work extensively with modern platforms including ERPNext, Odoo, and Zoho (Zoho One, Zoho Books, Zoho CRM), as well as custom-built ERP architectures. We independently evaluate your business size, industry requirements, workflows, and budget to recommend and implement the platform that best aligns with your goals.',
    category: 'erp',
  },
  {
    id: 'faq-3',
    question: 'How do I choose between ERPNext, Odoo and Zoho?',
    answer:
      'The right choice depends on your operational priorities. ERPNext is ideal for manufacturers, distributors, and organizations seeking 100% open-source control and deep customization without recurring user licensing penalties. Odoo excels for businesses prioritizing modern modular design, integrated retail POS, and omnichannel eCommerce. Zoho is suited for services, agencies, and startups seeking rapid cloud deployment, low maintenance overhead, and world-class CRM capabilities. TechSphere offers an interactive "Find Your ERP" diagnostic tool and personalized consultation to guide this decision.',
    category: 'erp',
  },
  {
    id: 'faq-4',
    question: 'Can you customize an ERP?',
    answer:
      'Yes. While standard ERP modules cover standard workflows, most businesses possess unique competitive processes. We engineer custom doctypes, tailored workflows, specialized approval hierarchies, automated validation scripts, custom print formats, and executive KPI dashboards tailored to your exact operational requirements.',
    category: 'technical',
  },
  {
    id: 'faq-5',
    question: 'Can you migrate data from an existing system?',
    answer:
      'Yes. A core component of our implementation methodology is secure data migration. We extract, sanitize, deduplicate, and map historical data from spreadsheets (Excel, Google Sheets) or legacy software (Tally, legacy desktop accounting, proprietary databases) to ensure a smooth transition with opening balance reconciliation and zero data loss.',
    category: 'technical',
  },
  {
    id: 'faq-6',
    question: 'Can you integrate ERP with other software?',
    answer:
      'Yes. Modern businesses rely on specialized tools. We build robust, secure API integrations and webhook listeners connecting your ERP with eCommerce platforms (Shopify, WooCommerce, Amazon), payment gateways (Stripe, Razorpay, PayPal), shipping and logistics carriers, third-party CRMs, and custom web applications.',
    category: 'technical',
  },
  {
    id: 'faq-7',
    question: 'Do you work with businesses outside India?',
    answer:
      'Yes. TechSphere operates as a remote worldwide consultancy. We collaborate with businesses across North America, Europe, the Middle East, Southeast Asia, Australia, and Africa using modern collaborative tools, asynchronous communication, and flexible scheduling to match your team’s working hours.',
    category: 'general',
  },
  {
    id: 'faq-8',
    question: 'Can you build custom business software?',
    answer:
      'Yes. When off-the-shelf software packages cannot accommodate your unique business rules or proprietary operational algorithms, our engineering team designs and develops bespoke web applications, B2B customer/supplier portals, automated microservices, and database solutions using modern stacks like React, TypeScript, Node.js, and PostgreSQL.',
    category: 'technical',
  },
  {
    id: 'faq-9',
    question: 'How does an ERP consultation work?',
    answer:
      'An initial consultation with TechSphere begins with an open discussion of your current operational bottlenecks, existing software stack, and business objectives. We review your departmental processes, highlight potential risks or inefficiencies, and outline a pragmatic roadmap with recommended platforms, estimated timelines, and architectural milestones. There is zero pressure and no obligation.',
    category: 'consultation',
  },
];
