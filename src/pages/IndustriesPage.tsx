/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { INDUSTRIES_DATA } from '../data/industriesData.ts';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollCascadeBlock,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
} from '../components/motion/MotionPrimitives.tsx';
import { EASE_PREMIUM } from '../utils/motion.ts';

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string, notes?: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(INDUSTRIES_DATA[0].id);
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();

  const currentInd =
    INDUSTRIES_DATA.find((i) => i.id === selectedIndustry) || INDUSTRIES_DATA[0];

  const handleConsult = (indName: string) => {
    if (onBookConsultation) {
      onBookConsultation(
        'ERP Consultancy',
        `Industry Focus: ${indName} Sector — interested in tailored ERP & IT architecture.`
      );
    } else {
      onNavigate('request-consultation');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Domain Expertise
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Specialized ERP &amp; IT Solutions Across 11 Key Industries
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Operational models differ fundamentally between discrete manufacturing, retail branch chains, and service agencies. We tailor architectures to industry realities.
        </p>
      </RevealSection>

      {/* Interactive Industry Selector & Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {INDUSTRIES_DATA.map((ind) => {
            const isSelected = selectedIndustry === ind.id;
            return (
              <motion.button
                key={ind.id}
                type="button"
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors border cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-white text-[#090909] border-white shadow-md'
                      : 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                    : isDark
                    ? 'bg-[#171717] border-[#303030] text-[#A3A3A3] hover:text-white hover:border-white/40'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                {ind.name}
              </motion.button>
            );
          })}
        </ScrollCascadeBlock>

        {/* Selected Industry Card */}
        <ScrollCascadeBlock>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInd.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
            className={`group relative overflow-hidden rounded-3xl p-8 sm:p-12 border transition-colors ${
              isDark
                ? 'bg-[#171717] border-[#303030]'
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
            }`}
          >
            <CardGlareOverlay theme={theme} subtle />
            <div
              className={`relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b ${
                isDark ? 'border-[#303030]' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isDark
                        ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                        : 'bg-sky-500/10 text-sky-500'
                    }`}
                  >
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                      {currentInd.name} Sector
                    </h2>
                    <p
                      className={`text-xs sm:text-sm font-medium mt-0.5 ${
                        isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                      }`}
                    >
                      {currentInd.tagline}
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => handleConsult(currentInd.name)}
                className={`group min-h-[44px] px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400'
                }`}
              >
                <span>Consult On {currentInd.name} ERP</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {/* Challenges */}
              <div
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#111111] border-[#303030]' : 'bg-rose-50/50 border-rose-100'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 ${
                    isDark ? 'text-[#D4D4D4]' : 'text-rose-500'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Typical Operational Challenges</span>
                </div>
                <ul className="space-y-3">
                  {currentInd.challenges.map((ch) => (
                    <li key={ch} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-700'}`}>
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${
                          isDark ? 'bg-[#737373]' : 'bg-rose-400'
                        }`}
                      />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div
                className={`p-6 rounded-2xl border ${
                  isDark ? 'bg-[#111111] border-[#303030]' : 'bg-emerald-50/50 border-emerald-100'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4 ${
                    isDark ? 'text-white' : 'text-emerald-600'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Engineered Technology Solutions</span>
                </div>
                <ul className="space-y-3">
                  {currentInd.solutions.map((sol) => (
                    <li key={sol} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          isDark ? 'text-white' : 'text-emerald-500'
                        }`}
                      />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>

                <div className={`pt-5 mt-5 border-t ${isDark ? 'border-[#303030]' : 'border-emerald-200/70'}`}>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider block mb-1.5 ${isDark ? 'text-[#737373]' : 'text-slate-600'}`}>
                    Recommended Architecture
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentInd.recommendedERP.map((r) => (
                      <span
                        key={r}
                        className={`text-xs px-2.5 py-1 rounded-md font-mono border ${
                          isDark
                            ? 'bg-[#1D1D1D] border-[#303030] text-[#F5F5F5]'
                            : 'bg-sky-500/10 border-sky-500/20 text-sky-700'
                        }`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </ScrollCascadeBlock>
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
