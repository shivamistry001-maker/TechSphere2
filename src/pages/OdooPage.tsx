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

interface OdooPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

const ODOO_FEATURES: readonly PlatformFeatureItem[] = [
  {
    title: 'Modular App-by-App Adoption',
    desc: 'Activate only the applications your team needs today (e.g. Invoicing and CRM) and incrementally add Inventory, Manufacturing, and POS as operations scale.',
  },
  {
    title: 'Omnichannel Retail & Offline POS',
    desc: 'Fast, touch-optimized Point of Sale registers that continue working during internet dropouts and sync automatically with central warehouse stocks.',
  },
  {
    title: 'Community vs. Enterprise Guidance',
    desc: 'Impartial advisory on whether the free Community edition meets your scope or if Enterprise licensing is justified for mobile apps and advanced features.',
  },
  {
    title: 'Custom Module Development',
    desc: 'Our Python engineers build tailored Odoo addons, custom fields, specialized views, and automated server actions that respect your distinct business rules.',
  },
  {
    title: 'E-Commerce & Payment Gateways',
    desc: 'Seamless bidirectional synchronization with Shopify, WooCommerce, Amazon, and payment processors like Stripe and Razorpay.',
  },
  {
    title: 'Intuitive Modern UX',
    desc: 'A user-friendly, responsive interface that drastically minimizes staff onboarding resistance and administrative training time.',
  },
];

export const OdooPage: React.FC<OdooPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => (
  <ERPPlatformDetailPage
    onNavigate={onNavigate}
    theme={theme}
    onBookConsultation={onBookConsultation}
    eyebrow="Modular Business Ecosystem"
    heading="Odoo Implementation, Custom Modules & POS Integration"
    subtitle="Unify sales channels, retail stores, and warehouse fulfillment into a slick, intuitive modular ERP suite engineered for modern retail and services."
    primaryCtaLabel="Consult With an Odoo Specialist"
    consultationServiceName="Odoo ERP Implementation"
    features={ODOO_FEATURES}
    metricsScope="odoo"
    metricsHeading="Odoo ERP Key Performance Metrics"
  />
);
