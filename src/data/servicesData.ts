/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem } from '../types.ts';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'erp-consultancy',
    title: 'ERP Consultancy',
    tagline: 'Strategic advisory to select the optimal ERP platform and architecture.',
    description:
      'Strategic ERP consulting to identify the right platform, architecture and implementation roadmap. We evaluate your business model, operational bottlenecks, compliance needs, and growth trajectory to choose the right fit between ERPNext, Odoo, Zoho, or custom systems.',
    features: [
      'Comprehensive business process mapping',
      'Platform readiness & gap analysis',
      'Architecture & data model design',
      'Total Cost of Ownership (TCO) evaluation',
      'Phased implementation roadmapping',
    ],
    deliverables: [
      'ERP Requirement Specification Document',
      'Platform Comparison & Justification Report',
      'Implementation Timeline & Milestone Blueprint',
      'Resource Allocation & Training Plan',
    ],
    iconName: 'Compass',
  },
  {
    id: 'erp-implementation',
    title: 'ERP Implementation',
    tagline: 'End-to-end execution, configuration, and go-live deployment.',
    description:
      'End-to-end implementation planning, configuration, deployment and optimization. We ensure that your ERP matches real-world operational workflows while training your internal team for high adoption and minimal operational friction.',
    features: [
      'Core module setup & parameter configuration',
      'Role-based access control (RBAC) setup',
      'Chart of Accounts & financial workflow configuration',
      'Master data sanitization & validation',
      'Pilot testing & user acceptance testing (UAT)',
    ],
    deliverables: [
      'Configured Production ERP Environment',
      'Departmental Standard Operating Procedures (SOPs)',
      'Admin & End-User Training Sessions',
      'Go-Live Readiness Checklist & Hypercare Support',
    ],
    iconName: 'Settings2',
  },
  {
    id: 'erp-customization',
    title: 'ERP Customization',
    tagline: 'Tailoring modules, custom fields, and logic around unique operations.',
    description:
      'Customize ERP workflows, modules and interfaces around business requirements. When standard out-of-the-box settings are insufficient, we engineer custom doctypes, print formats, server scripts, and specialized dashboards.',
    features: [
      'Custom doctypes, schemas & fields',
      'Automated server-side validations & triggers',
      'Custom report generation & business KPI dashboards',
      'Customized invoice & delivery note print formats',
      'Industry-specific workflow adaptations',
    ],
    deliverables: [
      'Custom Modules & Script Repositories',
      'Technical Code Documentation',
      'Regression Testing Reports',
      'Version-Control Managed Upgrades',
    ],
    iconName: 'Wrench',
  },
  {
    id: 'erp-migration',
    title: 'ERP Migration',
    tagline: 'Seamlessly transition legacy spreadsheets and antiquated databases.',
    description:
      'Help businesses move from legacy systems and spreadsheets to modern ERP platforms. We extract, clean, map, and import critical financial history, customer databases, inventory ledgers, and transaction records with zero data loss.',
    features: [
      'Legacy database & spreadsheet extraction',
      'Data deduplication, cleansing, and normalization',
      'Historical ledger & opening balances reconciliation',
      'Pre-migration trial runs & schema validation',
      'Cutover planning to eliminate operational downtime',
    ],
    deliverables: [
      'Data Mapping & Migration Matrix',
      'Reconciliation Balance Validation Sign-off',
      'Archival Strategy for Legacy Data',
      'Post-Cutover Integrity Verification',
    ],
    iconName: 'Database',
  },
  {
    id: 'erp-integration',
    title: 'ERP Integration',
    tagline: 'Connect ERP with CRM, eCommerce, payment gateways, and logistics.',
    description:
      'Connect ERP platforms with CRM, accounting, e-commerce, payment, logistics and other systems. We build robust, bidirectional API connectors and webhook listeners so information flows automatically without manual double-entry.',
    features: [
      'eCommerce synchronization (Shopify, WooCommerce, Amazon)',
      'Payment gateway reconciliation (Stripe, Razorpay, PayPal)',
      'Logistics & shipping carrier tracking integration',
      'Third-party CRM & marketing automation pipelines',
      'Secure webhook handling & error retry mechanisms',
    ],
    deliverables: [
      'Bi-Directional API Integration Middleware',
      'Sync Log Dashboards & Webhook Monitors',
      'API Authentication & Security Configuration',
      'Failover & Notification Protocols',
    ],
    iconName: 'Network',
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    tagline: 'Eliminate repetitive manual tasks and accelerate approval cycles.',
    description:
      'Automate repetitive processes and improve operational efficiency. We identify time-draining manual chores across sales, procurement, inventory alerts, and approvals, replacing them with intelligent automated triggers.',
    features: [
      'Multi-level purchase & expense approval hierarchies',
      'Automated inventory replenishment triggers & alerts',
      'Customer email notifications & invoice dispatching',
      'Lead auto-assignment & lifecycle status progression',
      'Scheduled automated reporting to management',
    ],
    deliverables: [
      'Automated Workflow Logic Map',
      'Configured Alert & Notification Engine',
      'Self-Service Automation Dashboards',
      'Process Efficiency Benchmark Review',
    ],
    iconName: 'Zap',
  },
  {
    id: 'website-web-applications',
    title: 'Website & Web Applications',
    tagline: 'High-performance digital products engineered for conversion and speed.',
    description:
      'Modern responsive websites and web applications for businesses. Built with React, TypeScript, modern CSS, and headless architectures, our digital products are fast, secure, search-engine optimized, and responsive across all viewports.',
    features: [
      'Modern responsive frontend architecture',
      'Customer & vendor web portals connected to backend ERP',
      'High-converting corporate websites & landing pages',
      'SEO-optimized, accessible, and fast-loading code',
      'Interactive tools, calculators, and client dashboards',
    ],
    deliverables: [
      'Production-Ready Source Code & Build Pipelines',
      'Responsive Cross-Browser & Mobile Compatibility',
      'CMS / Headless Integration',
      'Core Web Vitals Performance Audit',
    ],
    iconName: 'Layout',
  },
  {
    id: 'custom-it-solutions',
    title: 'Custom IT Solutions',
    tagline: 'Bespoke technology systems engineered around specialized workflows.',
    description:
      'Technology solutions designed around specific business requirements. When commercial off-the-shelf software fails to accommodate your proprietary business rules, we architect and deploy dedicated bespoke software.',
    features: [
      'Full-stack custom software development',
      'Microservice & REST API architecture design',
      'Internal operational tools & admin backends',
      'Database schema engineering & optimization',
      'Secure authentication & role-based permissions',
    ],
    deliverables: [
      'Custom Application Architecture & Codebase',
      'System Architecture Blueprints',
      'Deployment & Containerization (Docker) Setup',
      'Maintenance & Code Documentation',
    ],
    iconName: 'Code2',
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    tagline: 'Modernize legacy business operations with scalable cloud technologies.',
    description:
      'Modernize business processes using cloud technologies, automation and intelligent systems. We guide organizations away from fragmented paper forms, isolated desktop files, and manual coordination into unified cloud-native infrastructure.',
    features: [
      'Digital readiness assessment & maturity audit',
      'Legacy software phase-out & risk mitigation',
      'Cloud migration & infrastructure modernization',
      'Collaborative team tools & digital workflow adoption',
      'Data-driven decision making & KPI instrumentation',
    ],
    deliverables: [
      'Digital Transformation Roadmap',
      'Cloud Architecture Specifications',
      'Change Management & Staff Adoption Guidance',
      'Ongoing Strategic Advisory Retainer',
    ],
    iconName: 'Layers',
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    tagline: 'Pragmatic technology strategy and architecture for ambitious businesses.',
    description:
      'Technology strategy and consulting for growing businesses. We function as your strategic technology advisor, helping you make informed software investments, avoid vendor lock-in, and build infrastructure that scales reliably.',
    features: [
      'IT infrastructure & security audit',
      'Vendor selection & contract technical evaluation',
      'Disaster recovery & data backup strategy',
      'Scalability planning for business expansions',
      'Fractional CTO / IT advisory support',
    ],
    deliverables: [
      'Comprehensive IT Health & Security Report',
      'Technology Stack Recommendation Matrix',
      'Business Continuity & Security Action Plan',
      'Quarterly Technology Strategy Reviews',
    ],
    iconName: 'Cpu',
  },
];
