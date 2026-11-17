/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types.ts';

export const PAGE_PATHS: Readonly<Record<PageId, string>> = {
  home: '/',
  about: '/about',
  services: '/services',
  'erp-solutions': '/erp-solutions',
  erpnext: '/erp-solutions/erpnext',
  odoo: '/erp-solutions/odoo',
  zoho: '/erp-solutions/zoho',
  'it-solutions': '/it-solutions',
  'demo-websites': '/demo-websites',
  'erp-showcase': '/erp-showcase',
  industries: '/industries',
  'case-studies': '/case-studies',
  portfolio: '/portfolio',
  insights: '/insights',
  contact: '/contact',
  'request-consultation': '/request-consultation',
};

export interface PageSEOMeta {
  title: string;
  description: string;
}

export const PAGE_SEO_META: Readonly<Record<PageId, PageSEOMeta>> = {
  home: {
    title: 'TechSphere IT & ERP Consultancy | Empowering Businesses Through Tech',
    description:
      'TechSphere provides enterprise-grade IT solutions and strategic ERP consultancy for ERPNext, Odoo, Zoho, and custom architectures. Digitize, automate, and scale.',
  },
  about: {
    title: 'About TechSphere | Enterprise IT & ERP Consultancy',
    description:
      'Learn about TechSphere IT & ERP Consultancy, our vendor-neutral advisory methodology, engineering standards, and global remote delivery model.',
  },
  services: {
    title: 'Services | TechSphere IT & ERP Consultancy',
    description:
      'Explore TechSphere services including ERP consultancy, Odoo and ERPNext implementation, website development, workflow automation, and IT advisory.',
  },
  'erp-solutions': {
    title: 'ERP Solutions & Platform Comparison | TechSphere',
    description:
      'Compare ERPNext, Odoo, Zoho, and bespoke ERP architectures to select the right enterprise platform for your operational workflows.',
  },
  erpnext: {
    title: 'ERPNext Implementation & Customization | TechSphere',
    description:
      'Open-source ERPNext implementation, manufacturing BoMs, accounting, inventory control, and custom workflow automation by TechSphere.',
  },
  odoo: {
    title: 'Odoo ERP Implementation & Modular Apps | TechSphere',
    description:
      'Modular Odoo ERP configuration, CRM, POS, inventory, manufacturing, and custom module engineering tailored to your operations.',
  },
  zoho: {
    title: 'Zoho Business Applications & Ecosystem | TechSphere',
    description:
      'Integrated Zoho CRM, Zoho Books, Zoho Inventory, and Zoho Analytics implementations engineered for agile growing enterprises.',
  },
  'it-solutions': {
    title: 'IT & Custom Web Application Solutions | TechSphere',
    description:
      'Modern web portals, API integrations, custom business software, and process automation tailored for operational clarity.',
  },
  'demo-websites': {
    title: 'Website Development Demonstrations | TechSphere IT & ERP Consultancy',
    description:
      'Explore our industry-specific live website demonstrations for hospitality, chartered accountant firms, photography studios, and manufacturing companies.',
  },
  'erp-showcase': {
    title: 'ERP Software Demonstrations | TechSphere IT & ERP Consultancy',
    description:
      'Inspect authentic ERPNext, Odoo ERP, and Zoho Business Applications dashboards, module walkthroughs, and interactive screenshot galleries.',
  },
  industries: {
    title: 'Industries We Serve | TechSphere IT & ERP Consultancy',
    description:
      'Sector-specific ERP and digital solutions across manufacturing, trading, retail, logistics, professional services, and SMEs.',
  },
  'case-studies': {
    title: 'Case Studies & Sample Blueprints | TechSphere',
    description:
      'Review illustrative enterprise transformation scenarios spanning ERP implementation, inventory control, and workflow automation.',
  },
  portfolio: {
    title: 'System Architecture Portfolio | TechSphere IT & ERP Consultancy',
    description:
      'Browse TechSphere engineering prototypes, custom portal architectures, ERP automation systems, and digital platform blueprints.',
  },
  insights: {
    title: 'Insights & ERP Knowledge Hub | TechSphere',
    description:
      'Technical guides and strategic insights on ERP selection, automation architecture, Odoo, ERPNext, and digital transformation.',
  },
  contact: {
    title: 'Contact TechSphere | Book an Advisory Call',
    description:
      'Connect with TechSphere IT & ERP Consultancy via consultation request, email, phone, or WhatsApp to discuss your technology roadmap.',
  },
  'request-consultation': {
    title: 'Book a Free Consultation | TechSphere IT & ERP Consultancy',
    description:
      'Schedule a discovery call with TechSphere to scope ERP implementation, website development, or business workflow automation.',
  },
};

export function normalizePathname(pathname: string): string {
  const clean = pathname.split('?')[0].split('#')[0].trim().toLowerCase();
  if (!clean || clean === '/') return '/';
  return clean.endsWith('/') ? clean.slice(0, -1) : clean;
}

export function getPageFromPathname(pathname: string): PageId {
  const normalized = normalizePathname(pathname);
  for (const [pageId, routePath] of Object.entries(PAGE_PATHS) as [PageId, string][]) {
    if (routePath === normalized) {
      return pageId;
    }
  }
  return 'home';
}

export function getPathForPage(page: PageId): string {
  return PAGE_PATHS[page] ?? '/';
}
