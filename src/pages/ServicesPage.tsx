/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { CheckCircle2, ArrowRight, Database, Code, Globe, Zap, Cloud, Network } from 'lucide-react';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
} from '../components/motion/MotionPrimitives.tsx';
import { EASE_PREMIUM, scrollCardItemVariants } from '../utils/motion.ts';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onSelectServiceForConsultation?: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  theme,
  onSelectServiceForConsultation,
}) => {
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();

  const iconMap: { [key: string]: React.ElementType } = {
    'erp-consulting': Database,
    'custom-software': Code,
    'web-development': Globe,
    'business-automation': Zap,
    'cloud-infrastructure': Cloud,
    'system-integration': Network,
  };

  const handleConsultService = (srvTitle: string) => {
    if (onSelectServiceForConsultation) {
      onSelectServiceForConsultation(srvTitle);
    }
    onNavigate('request-consultation');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14 pb-16">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Professional Services Catalog
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Comprehensive IT &amp; ERP Engineering Services
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          From full enterprise ERP implementations and legacy data sanitization to bespoke cloud web applications and multi-system API connectors.
        </p>
      </RevealSection>

      {/* Services Detailed Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer className="space-y-10">
          {SERVICES_DATA.map((service, idx) => {
            const IconComp = iconMap[service.id] || Database;
            return (
              <motion.div
                key={service.id}
                variants={scrollCardItemVariants}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -4, transition: { duration: 0.22, ease: EASE_PREMIUM } }
              }
              onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
              className={`group relative overflow-hidden rounded-3xl p-8 sm:p-12 border transition-colors duration-300 ${
                isDark
                  ? 'bg-[#171717] border-[#303030] hover:border-white/45 hover:bg-[#1D1D1D] shadow-[0_18px_46px_rgba(0,0,0,0.45)]'
                  : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-sky-300'
              }`}
            >
              {/* Futuristic Hover Shine & Glare Gradient Overlay */}
              <CardGlareOverlay theme={theme} />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                        isDark
                          ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                          : 'bg-sky-500/10 text-sky-500'
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span
                        className={`text-xs font-mono font-semibold ${
                          isDark ? 'text-[#A3A3A3]' : 'text-[#0284C7]'
                        }`}
                      >
                        SERVICE 0{idx + 1}
                      </span>
                      <h2
                        className={`text-xl sm:text-2xl font-bold ${
                          isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
                        }`}
                      >
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                      Expected Business Deliverables
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.deliverables.map((item) => (
                        <div key={item} className={`flex items-start gap-2 text-xs sm:text-sm ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-white' : 'text-sky-500'}`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <motion.button
                      type="button"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                      onClick={() => handleConsultService(service.title)}
                      className={`group/btn px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                        isDark
                          ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                          : 'text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400'
                      }`}
                    >
                      <span>Consult On This Service</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 ${
                    isDark ? 'bg-[#111111] border-[#303030]' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h4
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-white' : 'text-[#0284C7]'
                    }`}
                  >
                    Core Focus Areas
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, sIdx) => (
                      <li key={feature} className={`flex items-start gap-3 text-xs sm:text-sm ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                        <span
                          className={`w-5 h-5 rounded-full font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isDark
                              ? 'bg-[#252525] text-white border border-[#303030]'
                              : 'bg-sky-500/20 text-sky-600'
                          }`}
                        >
                          {sIdx + 1}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`pt-4 border-t ${isDark ? 'border-[#303030]' : 'border-slate-200'}`}>
                    <span className={`text-[11px] font-semibold block mb-2 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                      Target Ecosystem
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['ERPNext', 'Odoo', 'Zoho', 'PostgreSQL', 'Cloud & APIs'].map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] px-2.5 py-1 rounded font-mono border ${
                            isDark
                              ? 'bg-[#1D1D1D] text-[#D4D4D4] border-[#303030]'
                              : 'bg-sky-500/10 text-sky-700 border-sky-500/20'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
