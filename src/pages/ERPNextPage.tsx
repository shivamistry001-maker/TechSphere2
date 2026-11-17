/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import {
  Database,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Factory,
  Cpu,
  Layers,
  Code2,
  Lock,
} from 'lucide-react';

interface ERPNextPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const ERPNextPage: React.FC<ERPNextPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => {
  const isDark = theme === 'dark';

  const handleConsult = () => {
    if (onBookConsultation) {
      onBookConsultation('ERPNext Consulting & Implementation');
    }
    onNavigate('request-consultation');
  };

  const capabilities = [
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

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Open-Source Enterprise Mastery
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          ERPNext Consulting, Implementation &amp; Customization
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Unleash enterprise manufacturing, warehouse management, and double-entry finance with 100% data ownership and zero per-seat licensing penalties.
        </p>
        <div className="pt-6 flex justify-center">
          <button
            onClick={handleConsult}
            className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2"
          >
            <span>Consult With an ERPNext Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className={`rounded-2xl p-6 border ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-md shadow-slate-200/40'
              }`}
            >
              <div className="flex items-center gap-2 text-sky-400 mb-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {cap.title}
                </h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Businesses Choose ERPNext */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl p-8 sm:p-12 border ${
            isDark
              ? 'bg-slate-900/80 border-sky-500/20'
              : 'bg-sky-50/70 border-sky-200 shadow-xl'
          }`}
        >
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Strategic Evaluation
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why Manufacturers &amp; Mid-Market Enterprises Select ERPNext
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Proprietary ERP giants charge punitive monthly subscriptions per user while keeping your data locked in opaque schemas. ERPNext provides an industrial-grade alternative: complete code ownership, a Python-powered Frappe architecture, and a modern web interface built for high-throughput teams.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={handleConsult}
                className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-sky-500 hover:bg-sky-400 transition-colors"
              >
                Schedule ERPNext Architecture Call
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
