/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData.ts';
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Info } from 'lucide-react';

interface CaseStudiesPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Architecture &amp; Outcomes
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Sample Case Studies &amp; Transformation Models
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Examine realistic enterprise operational hurdles, our systematic engineering methodologies, and the tangible operational improvements achieved through unified ERP implementations.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs text-sky-400">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Case studies are structured architectural samples reflecting real implementation paradigms.</span>
        </div>
      </section>

      {/* Case Studies Detailed Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {CASE_STUDIES_DATA.map((cs) => (
          <div
            key={cs.id}
            className={`rounded-3xl p-8 sm:p-12 border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  {cs.industry}
                </span>
                <h2
                  className={`text-xl sm:text-2xl font-bold mt-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {cs.title}
                </h2>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-400">
                Sample Case Study
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1.5">
                    1. The Operational Challenge
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {cs.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-sky-500 mb-1.5">
                    2. Discovery &amp; Architectural Approach
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {cs.approach}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1.5">
                    3. The Engineered Solution
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {cs.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Implementation Process &amp; Milestones
                  </h3>
                  <ul className="space-y-2">
                    {cs.process.map((step, idx) => (
                      <li key={step} className={`flex items-start gap-2 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Technology Stack Deployed
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cs.technology.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 font-mono border border-sky-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Verified Operational Outcome
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-emerald-200' : 'text-emerald-900'}`}>
                    {cs.outcome}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => onNavigate('request-consultation')}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors flex items-center gap-1.5"
              >
                <span>Discuss a Similar Architecture for Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
