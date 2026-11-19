/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData.ts';
import { CheckCircle2, ArrowRight, Info } from 'lucide-react';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
} from '../components/motion/MotionPrimitives.tsx';
import { scrollCardItemVariants } from '../utils/motion.ts';

interface CaseStudiesPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Architecture &amp; Outcomes
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Sample Case Studies &amp; Transformation Models
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Examine realistic enterprise operational hurdles, our systematic engineering methodologies, and the tangible operational improvements achieved through unified ERP implementations.
        </p>
        <div
          className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
            isDark
              ? 'bg-[#171717] border-[#303030] text-[#D4D4D4]'
              : 'bg-sky-500/10 border-sky-400/20 text-[#0284C7]'
          }`}
        >
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Case studies are structured architectural samples reflecting real implementation paradigms.</span>
        </div>
      </RevealSection>

      {/* Case Studies Detailed Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer className="space-y-10">
          {CASE_STUDIES_DATA.map((cs) => (
            <motion.div
              key={cs.id}
              variants={scrollCardItemVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
            className={`group relative overflow-hidden rounded-3xl p-8 sm:p-12 border transition-colors ${
              isDark
                ? 'bg-[#171717] border-[#303030] hover:border-white/40'
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-sky-300'
            }`}
          >
            <CardGlareOverlay theme={theme} subtle />
            <div
              className={`relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b mb-6 ${
                isDark ? 'border-[#303030]' : 'border-slate-200'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    isDark
                      ? 'bg-[#1D1D1D] text-[#F5F5F5] border-[#303030]'
                      : 'bg-sky-500/15 text-[#0284C7] border-sky-500/30'
                  }`}
                >
                  {cs.industry}
                </span>
                <h2
                  className={`text-xl sm:text-2xl font-bold mt-2 ${
                    isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
                  }`}
                >
                  {cs.title}
                </h2>
              </div>
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded ${
                  isDark ? 'bg-[#111111] border border-[#303030] text-[#A3A3A3]' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Sample Case Study
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div>
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-[#D4D4D4]' : 'text-rose-500'
                    }`}
                  >
                    1. The Operational Challenge
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {cs.challenge}
                  </p>
                </div>

                <div>
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-[#D4D4D4]' : 'text-sky-500'
                    }`}
                  >
                    2. Discovery &amp; Architectural Approach
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {cs.approach}
                  </p>
                </div>

                <div>
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-[#D4D4D4]' : 'text-blue-500'
                    }`}
                  >
                    3. The Engineered Solution
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {cs.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark ? 'bg-[#111111] border-[#303030]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                    Implementation Process &amp; Milestones
                  </h3>
                  <ul className="space-y-2">
                    {cs.process.map((step) => (
                      <li key={step} className={`flex items-start gap-2 text-xs sm:text-sm ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                        <CheckCircle2
                          className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                            isDark ? 'text-white' : 'text-sky-500'
                          }`}
                        />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-4 pt-4 border-t ${isDark ? 'border-[#303030]' : 'border-slate-200'}`}>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-[#737373]' : 'text-slate-500'}`}>
                      Technology Stack Deployed
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cs.technology.map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] px-2 py-0.5 rounded font-mono border ${
                            isDark
                              ? 'bg-[#1D1D1D] text-[#F5F5F5] border-[#303030]'
                              : 'bg-sky-500/10 text-[#0284C7] border-sky-500/20'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    isDark
                      ? 'bg-[#1D1D1D] border-[#404040]'
                      : 'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                      isDark ? 'text-white' : 'text-emerald-600'
                    }`}
                  >
                    Verified Operational Outcome
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-[#D4D4D4]' : 'text-emerald-900'}`}>
                    {cs.outcome}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`relative z-10 mt-8 pt-6 border-t flex justify-end ${
                isDark ? 'border-[#303030]' : 'border-slate-200'
              }`}
            >
              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => onNavigate('request-consultation')}
                className={`group px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'text-white bg-sky-500 hover:bg-sky-400'
                }`}
              >
                <span>Discuss a Similar Architecture for Your Business</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        ))}
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
