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

interface ZohoPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

const ZOHO_APPS: readonly PlatformFeatureItem[] = [
  {
    title: 'Zoho One',
    desc: 'The all-in-one operating suite granting your business access to 45+ integrated cloud applications under a unified user directory.',
  },
  {
    title: 'Zoho Books',
    desc: 'Compliant double-entry cloud accounting with automated banking feeds, e-invoicing, expense receipts, and balance sheet reporting.',
  },
  {
    title: 'Zoho CRM',
    desc: 'Omnichannel lead acquisition, automated sales pipelines, contact management, and intelligent deal stage progression.',
  },
  {
    title: 'Zoho Inventory',
    desc: 'Multichannel inventory synchronization across web storefronts, barcode labeling, purchase orders, and carrier shipping rates.',
  },
  {
    title: 'Zoho Creator & Deluge',
    desc: 'Custom low-code database applications, workflow automation routines, and webhook integrations using Deluge scripting.',
  },
  {
    title: 'Zoho Analytics',
    desc: 'Consolidated executive business intelligence, automated KPI dashboards, and scheduled operational digests.',
  },
];

export const ZohoPage: React.FC<ZohoPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => (
  <ERPPlatformDetailPage
    onNavigate={onNavigate}
    theme={theme}
    onBookConsultation={onBookConsultation}
    eyebrow="Cloud-Native Agility"
    heading="Zoho Ecosystem Implementation, Books & CRM Automation"
    subtitle="Accelerate your operational velocity with zero DevOps server overhead. We configure, automate, and integrate the full Zoho suite for growing businesses."
    primaryCtaLabel="Consult With a Zoho Specialist"
    consultationServiceName="Zoho"
    features={ZOHO_APPS}
    metricsScope="zoho"
    metricsHeading="Zoho Suite Key Performance Metrics"
  />
);
