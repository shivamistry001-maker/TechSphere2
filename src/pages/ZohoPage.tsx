/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { CheckCircle2, ArrowRight, Cloud, Zap, BarChart3, Users2, Database } from 'lucide-react';

interface ZohoPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const ZohoPage: React.FC<ZohoPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => {
  const isDark = theme === 'dark';

  const handleConsult = () => {
    if (onBookConsultation) {
      onBookConsultation('Zoho Ecosystem Implementation');
    }
    onNavigate('request-consultation');
  };

  const zohoApps = [
    {
      name: 'Zoho One',
      desc: 'The all-in-one operating suite granting your business access to 45+ integrated cloud applications under a unified user directory.',
    },
    {
      name: 'Zoho Books',
      desc: 'Compliant double-entry cloud accounting with automated banking feeds, e-invoicing, expense receipts, and balance sheet reporting.',
    },
    {
      name: 'Zoho CRM',
      desc: 'Omnichannel lead acquisition, automated sales pipelines, contact management, and intelligent deal stage progression.',
    },
    {
      name: 'Zoho Inventory',
      desc: 'Multichannel inventory synchronization across web storefronts, barcode labeling, purchase orders, and carrier shipping rates.',
    },
    {
      name: 'Zoho Creator & Deluge',
      desc: 'Custom low-code database applications, workflow automation routines, and webhook integrations using Deluge scripting.',
    },
    {
      name: 'Zoho Analytics',
      desc: 'Consolidated executive business intelligence, automated KPI dashboards, and scheduled operational digests.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Cloud-Native Agility
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Zoho Ecosystem Implementation, Books &amp; CRM Automation
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Accelerate your operational velocity with zero DevOps server overhead. We configure, automate, and integrate the full Zoho suite for growing businesses.
        </p>
        <div className="pt-6 flex justify-center">
          <button
            onClick={handleConsult}
            className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2"
          >
            <span>Consult With a Zoho Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zohoApps.map((app) => (
            <div
              key={app.name}
              className={`rounded-2xl p-6 border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-md shadow-slate-200/40'
              }`}
            >
              <div className="flex items-center gap-2 text-sky-400 mb-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {app.name}
                </h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {app.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
