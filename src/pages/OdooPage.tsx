/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { CheckCircle2, ArrowRight, Store, ShoppingBag, Layers, Code, Zap } from 'lucide-react';

interface OdooPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const OdooPage: React.FC<OdooPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => {
  const isDark = theme === 'dark';

  const handleConsult = () => {
    if (onBookConsultation) {
      onBookConsultation('Odoo ERP Implementation');
    }
    onNavigate('request-consultation');
  };

  const odooFeatures = [
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

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Modular Business Ecosystem
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Odoo Implementation, Custom Modules &amp; POS Integration
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Unify sales channels, retail stores, and warehouse fulfillment into a slick, intuitive modular ERP suite engineered for modern retail and services.
        </p>
        <div className="pt-6 flex justify-center">
          <button
            onClick={handleConsult}
            className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2"
          >
            <span>Consult With an Odoo Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {odooFeatures.map((feat) => (
            <div
              key={feat.title}
              className={`rounded-2xl p-6 border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-md shadow-slate-200/40'
              }`}
            >
              <div className="flex items-center gap-2 text-sky-400 mb-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feat.title}
                </h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
