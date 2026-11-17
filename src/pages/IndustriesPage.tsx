/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { INDUSTRIES_DATA } from '../data/industriesData.ts';
import {
  Building2,
  Factory,
  Store,
  Truck,
  ShoppingBag,
  Briefcase,
  Navigation,
  Stethoscope,
  GraduationCap,
  Rocket,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (industryName: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(INDUSTRIES_DATA[0].id);
  const isDark = theme === 'dark';

  const iconMap: { [key: string]: React.ElementType } = {
    Factory,
    Store,
    Truck,
    ShoppingBag,
    Briefcase,
    Navigation,
    Stethoscope,
    GraduationCap,
    Building2,
    Rocket,
    Building,
  };

  const currentInd =
    INDUSTRIES_DATA.find((i) => i.id === selectedIndustry) || INDUSTRIES_DATA[0];

  const handleConsult = (indName: string) => {
    if (onBookConsultation) {
      onBookConsultation(`Consultation for ${indName} Industry`);
    }
    onNavigate('request-consultation');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Domain Expertise
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Specialized ERP &amp; IT Solutions Across 11 Key Industries
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Operational models differ fundamentally between discrete manufacturing, retail branch chains, and service agencies. We tailor architectures to industry realities.
        </p>
      </section>

      {/* Interactive Industry Selector & Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {INDUSTRIES_DATA.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                    : isDark
                    ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* Selected Industry Card */}
        <div
          className={`rounded-3xl p-8 sm:p-12 border transition-all ${
            isDark
              ? 'bg-slate-900/80 border-sky-500/20'
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
          }`}
        >
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {currentInd.name} Sector
                  </h2>
                  <p className="text-xs sm:text-sm text-sky-400 font-medium mt-0.5">
                    {currentInd.tagline}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleConsult(currentInd.name)}
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <span>Consult On {currentInd.name} ERP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {/* Challenges */}
            <div
              className={`p-6 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-rose-50/50 border-rose-100'
              }`}
            >
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>Typical Operational Challenges</span>
              </div>
              <ul className="space-y-3">
                {currentInd.challenges.map((ch) => (
                  <li key={ch} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-2" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div
              className={`p-6 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-emerald-50/50 border-emerald-100'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Engineered Technology Solutions</span>
              </div>
              <ul className="space-y-3">
                {currentInd.solutions.map((sol) => (
                  <li key={sol} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>

              <div className={`pt-5 mt-5 border-t ${isDark ? 'border-slate-800/80' : 'border-emerald-200/70'}`}>
                <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Recommended Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentInd.recommendedERP.map((r) => (
                    <span
                      key={r}
                      className={`text-xs px-2.5 py-1 rounded-md bg-sky-500/10 font-mono border border-sky-500/20 ${isDark ? 'text-sky-300' : 'text-sky-700'}`}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
