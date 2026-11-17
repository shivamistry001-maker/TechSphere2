/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { ERP_MODULES, ERP_PLATFORMS } from '../data/erpData.ts';
import { ERPComparisonTool } from '../components/ERPComparisonTool.tsx';
import {
  Database,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Boxes,
  Users2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface ERPSolutionsPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const ERPSolutionsPage: React.FC<ERPSolutionsPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-20 sm:space-y-28 pt-8 sm:pt-14">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Enterprise Systems Architecture
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Modern ERP Solutions: The Operating System for Your Business
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          An ERP is not just accounting software; it is the consolidated digital nervous system unifying procurement, production, inventory, customer relationships, and executive intelligence.
        </p>
      </section>

      {/* 2. Supported Platforms Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Platform Specializations
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Deep Framework Expertise
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            We do not push one universal platform. We objectively configure the ecosystem that matches your operational architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ERP_PLATFORMS.map((plat) => (
            <div
              key={plat.id}
              className={`rounded-3xl p-7 border transition-all flex flex-col justify-between ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-sky-500/40'
                  : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-sky-300'
              }`}
            >
              <div>
                <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block mb-1">
                  {plat.badge}
                </span>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {plat.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {plat.tagline}
                </p>

                <div className={`space-y-1.5 pt-3 border-t mb-6 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Ideal Profile
                  </span>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{plat.bestSuitedFor}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (plat.id === 'erpnext') onNavigate('erpnext');
                  else if (plat.id === 'odoo') onNavigate('odoo');
                  else if (plat.id === 'zoho') onNavigate('zoho');
                  else onNavigate('it-solutions');
                }}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-sky-500/10 hover:bg-sky-500 hover:text-white text-sky-400 border border-sky-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Explore {plat.name} Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Modules Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Functional Coverage
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Standard &amp; Custom ERP Modules
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ERP_MODULES.map((mod) => (
            <div
              key={mod.name}
              className={`rounded-2xl p-6 border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-sky-400">
                <Database className="w-4 h-4" />
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {mod.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {mod.description}
              </p>
              <div className={`pt-2 border-t flex flex-wrap gap-1 ${isDark ? 'border-slate-800/60' : 'border-slate-100'}`}>
                {mod.features.map((feat) => (
                  <span
                    key={feat}
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Comparison Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ERPComparisonTool onNavigate={onNavigate} theme={theme} />
      </section>
    </div>
  );
};
