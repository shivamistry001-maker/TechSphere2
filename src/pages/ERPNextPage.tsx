/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import {
  ERPPlatformDetailPage,
  PlatformFeatureItem,
} from '../components/solutions/ERPPlatformDetailPage.tsx';

interface ERPNextPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

const ERPNEXT_CAPABILITIES: readonly PlatformFeatureItem[] = [
  {
    title: 'Deep Manufacturing & MRP',
    desc: 'Multi-level Bill of Materials (BOM), workstation capacities, job cards, scrap management, and automated stock replenishment.',
  },
  {
    title: 'Zero Recurring License Fees',
    desc: 'True 100% open-source software under GNU GPLv3. Add 50, 100, or 500 users without per-seat monthly license fees.',
  },
  {
    title: 'Frappe Framework Extensibility',
    desc: 'Build custom DocTypes, Python server scripts, custom REST APIs, and tailored approval workflows without hacking core code.',
  },
  {
    title: 'Complete Data Sovereignty',
    desc: 'Deploy on your own private cloud (AWS, DigitalOcean, Hetzner, or on-premise hardware) with 100% control over your database.',
  },
  {
    title: 'Integrated Double-Entry Accounting',
    desc: 'Automated general ledger, accounts payable/receivable, multi-currency valuation, GST/tax reconciliation, and financial reports.',
  },
  {
    title: 'Multi-Warehouse Inventory Control',
    desc: 'Batch tracking, serial number management, FIFO valuation, barcode scanning, and inter-warehouse material transfers.',
  },
];

export const ERPNextPage: React.FC<ERPNextPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => (
  <ERPPlatformDetailPage
    onNavigate={onNavigate}
    theme={theme}
    onBookConsultation={onBookConsultation}
    eyebrow="Open-Source Enterprise Mastery"
    heading="ERPNext Consulting, Implementation & Customization"
    subtitle="Unleash enterprise manufacturing, warehouse management, and double-entry finance with 100% data ownership and zero per-seat licensing penalties."
    primaryCtaLabel="Consult With an ERPNext Specialist"
    consultationServiceName="ERPNext Consulting & Implementation"
    features={ERPNEXT_CAPABILITIES}
    metricsScope="erpnext"
    metricsHeading="ERPNext Key Performance Metrics"
    strategicCallout={{
      eyebrow: 'Strategic Evaluation',
      heading: 'Why Manufacturers & Mid-Market Enterprises Select ERPNext',
      body: 'Proprietary ERP giants charge punitive monthly subscriptions per user while keeping your data locked in opaque schemas. ERPNext provides an industrial-grade alternative: complete code ownership, a Python-powered Frappe architecture, and a modern web interface built for high-throughput teams.',
      ctaLabel: 'Schedule ERPNext Architecture Call',
    }}
  />
);
