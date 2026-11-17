/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ERPDemoPlatform,
  WebsiteDemoCategory,
  WebsiteDemoProject,
} from '../types.ts';

export const WEBSITE_DEMO_CATEGORIES: WebsiteDemoCategory[] = [
  'All Projects',
  'Hospitality',
  'Professional Services',
  'Creative Business',
  'Manufacturing',
];

export const LIVE_WEBSITE_DEMOS: WebsiteDemoProject[] = [
  {
    id: 'cafe-restaurant-demo',
    title: 'Cafe & Restaurant Website',
    category: 'Hospitality',
    categoryLabel: 'Hospitality',
    liveUrl: 'https://demo-self-nu-33.vercel.app/',
    previewImage: '/assets/demos/cafe-restaurant.png',
    previewAlt:
      'Live preview of The Warm Hearth Cafe & Restaurant website demonstration with hero imagery and reservation call-to-action',
    description:
      'A modern website demonstration for cafes, restaurants and hospitality businesses.',
    features: [
      'Restaurant website design',
      'Menu presentation',
      'Modern UI',
      'Responsive layout',
      'Professional business presentation',
    ],
  },
  {
    id: 'ca-firm-demo',
    title: 'Chartered Accountant Firm Website',
    category: 'Professional Services',
    categoryLabel: 'Professional Services',
    liveUrl: 'https://demo2-ten-hazel.vercel.app/',
    previewImage: '/assets/demos/ca-firm.png',
    previewAlt:
      'Live preview of FinAxis Chartered Accountant Firm website demonstration featuring corporate advisory sections and consultation CTA',
    description:
      'A professional corporate website demonstration for Chartered Accountant firms and financial consultancy businesses.',
    features: [
      'Corporate website design',
      'Professional service presentation',
      'Business information',
      'Client-focused layout',
      'Responsive experience',
    ],
  },
  {
    id: 'photography-business-demo',
    title: 'Photography & Videography Website',
    category: 'Creative Business',
    categoryLabel: 'Creative Business',
    liveUrl: 'https://demo3-delta-three.vercel.app/',
    previewImage: '/assets/demos/photography-business.png',
    previewAlt:
      'Live preview of Minesh Mistry Photography & Videography portfolio website demonstration with editorial typography',
    description:
      'A creative portfolio website demonstration for photography and videography businesses.',
    features: [
      'Photography gallery',
      'Portfolio presentation',
      'Creative layouts',
      'Visual storytelling',
      'Responsive design',
    ],
  },
  {
    id: 'manufacturing-company-demo',
    title: 'Manufacturing Company Website',
    category: 'Manufacturing',
    categoryLabel: 'Manufacturing',
    liveUrl: 'https://demo4-oxix.vercel.app/',
    previewImage: '/assets/demos/manufacturing-company.png',
    previewAlt:
      'Live preview of PrimeForge Manufacturing corporate website demonstration featuring industrial engineering highlights',
    description:
      'A corporate website demonstration for manufacturing and industrial companies.',
    features: [
      'Industrial business presentation',
      'Product and service showcase',
      'Corporate information',
      'Professional layout',
      'Responsive design',
    ],
  },
];

export const ERP_DEMO_PLATFORMS: ERPDemoPlatform[] = [
  {
    id: 'erpnext',
    name: 'ERPNext',
    subtitle: 'Open-Source Integrated ERP',
    description:
      'Explore an integrated open-source ERP platform designed to manage business operations.',
    highlights: [
      'Dashboard',
      'CRM',
      'Sales',
      'Purchase',
      'Inventory',
      'Accounting',
      'Manufacturing',
      'Human Resources',
    ],
    screenshots: [
      {
        id: 'erpnext-accounting-analytics',
        src: '/assets/aistudio/imagee6fe1d_a1bba182.png',
        title: 'Accounting & Financial Analytics',
        module: 'Accounting Dashboard',
        caption:
          'ERPNext Accounting workspace showing incoming and outgoing billing summaries, AP/AR ageing, Profit & Loss, and budget variance.',
        alt: 'ERPNext Accounting dashboard showing incoming bills, outgoing bills, accounts payable ageing, profit and loss, and budget variance charts',
      },
      {
        id: 'erpnext-payables-receivables',
        src: '/assets/aistudio/images_b3ca8d32.png',
        title: 'Payables, Bank & Receivables View',
        module: 'Financial Ledger',
        caption:
          'ERPNext financial charts tracking daily accounts payable, monthly bank balance movements, and daily accounts receivable.',
        alt: 'ERPNext Accounting screen displaying daily payable bar chart, monthly bank line chart, and daily receivable bar chart',
      },
      {
        id: 'erpnext-pnl-summary',
        src: '/assets/aistudio/FinalProduct_f6717bcd.jpeg',
        title: 'Financial Overview & Invoice Summary',
        module: 'Finance Reporting',
        caption:
          'Executive Profit and Loss, expense category breakdown, bank cash balance, and open invoice collection overview.',
        alt: 'Financial summary dashboard showing Profit and Loss, Expenses donut chart, Bank accounts, and Invoices status',
      },
    ],
  },
  {
    id: 'odoo',
    name: 'Odoo ERP',
    subtitle: 'Modular Business Management',
    description:
      'Explore a modular ERP platform with applications for managing sales, CRM, inventory, accounting, manufacturing and business operations.',
    highlights: [
      'Dashboard',
      'CRM',
      'Sales',
      'Inventory',
      'Purchase',
      'Accounting',
      'Manufacturing',
      'Projects',
    ],
    screenshots: [
      {
        id: 'odoo-crm-pipeline',
        src: '/assets/aistudio/my-dashboard_32e6e223.png',
        title: 'CRM Pipeline & Orders to Invoice',
        module: 'CRM & Sales Management',
        caption:
          'Odoo My Dashboard combining live Kanban pipeline stages, sales orders awaiting invoicing, and top customer rankings.',
        alt: 'Odoo My Dashboard displaying My pipeline Kanban cards, Orders to invoice list, and Top customers bar chart',
      },
      {
        id: 'odoo-purchase-vendor',
        src: '/assets/aistudio/purchase-vendor-analysis_342ab565.png',
        title: 'Purchase & Vendor Analysis Dashboard',
        module: 'Procurement & Logistics',
        caption:
          'Odoo analytical view tracking total purchased value, confirmation trends, and vendor on-time delivery performance.',
        alt: 'Odoo Dashboards screen showing Purchase and Vendor Analysis KPIs, line graph by confirmation date, and vendor delivery bar chart',
      },
      {
        id: 'odoo-operations-overview',
        src: '/assets/aistudio/images_3ea7bc3c.jpeg',
        title: 'Integrated Operations Dashboard',
        module: 'Cross-Module Dashboards',
        caption:
          'Unified Odoo navigation sidebar spanning CRM, Finance, Logistics, Services, Marketing, and Website KPIs.',
        alt: 'Odoo Dashboards interface with CRM, Finance, Logistics, Services, Marketing, and Website sidebar navigation and operational charts',
      },
    ],
  },
  {
    id: 'zoho',
    name: 'Zoho Business Applications',
    subtitle: 'Cloud Business Applications Suite',
    description:
      'Explore business applications for managing customers, sales, finance, inventory and business operations.',
    highlights: [
      'Dashboard',
      'CRM',
      'Sales',
      'Finance',
      'Inventory',
      'Analytics',
    ],
    screenshots: [
      {
        id: 'zoho-inventory-dashboard',
        src: '/assets/aistudio/the-dashboard_47e79349.png',
        title: 'Inventory & Fulfillment Dashboard',
        module: 'Zoho Inventory',
        caption:
          'Zoho Inventory workspace highlighting top-selling items, sales by channel, and pending sales, purchase, and warehouse actions.',
        alt: 'Zoho Inventory dashboard showing top selling items, top stocked items, sales by channel, and pending sales and purchase actions',
      },
      {
        id: 'zoho-analytics-sales',
        src: '/assets/aistudio/analytics-banner-image_b42defc6.jpg',
        title: 'Order Management Monthly Sales',
        module: 'Zoho Analytics',
        caption:
          'Visual analytics report builder plotting monthly revenue performance with interactive chart tooltips and filter controls.',
        alt: 'Zoho Analytics Order Management Monthly Sales line chart tracking revenue from January to October',
      },
      {
        id: 'zoho-org-departments',
        src: '/assets/aistudio/OD_Departments_d8e2b987.png',
        title: 'Organization & Department Overview',
        module: 'Operations & HR',
        caption:
          'Departmental progress cards tracking pipelines and active capacity across Sales, Software Development, Inventory, and QA.',
        alt: 'Zoho Org Overview interface showing departmental breakdown cards for Sales and Marketing, Software Development, Inventory Store, and Quality Assurance',
      },
    ],
  },
];
