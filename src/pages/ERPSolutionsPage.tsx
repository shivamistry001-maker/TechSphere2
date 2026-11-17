/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { ERP_MODULES, ERP_PLATFORMS } from '../data/erpData.ts';
import { ERPComparisonTool } from '../components/ERPComparisonTool.tsx';
import { FindYourERPWizard } from '../components/FindYourERPWizard.tsx';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollCascadeBlock,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../components/motion/MotionPrimitives.tsx';
import { computeColumnParallax, scrollCardItemVariants } from '../utils/motion.ts';
import { Database, ArrowRight } from 'lucide-react';

interface ERPSolutionsPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onSelectRecommendation?: (erpName: string, notes: string) => void;
}

export const ERPSolutionsPage: React.FC<ERPSolutionsPageProps> = ({
  onNavigate,
  theme,
  onSelectRecommendation,
}) => {
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const platformsRef = useRef<HTMLElement | null>(null);
  const modulesRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: platformsProgress } = useScroll({
    target: platformsRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: modulesProgress } = useScroll({
    target: modulesRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div className="space-y-20 sm:space-y-28 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* 1. Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Enterprise Systems Architecture
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Modern ERP Solutions: The Operating System for Your Business
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          An ERP is not just accounting software; it is the consolidated digital nervous system unifying procurement, production, inventory, customer relationships, and executive intelligence.
        </p>
      </RevealSection>

      {/* 2. Supported Platforms Grid */}
      <section ref={platformsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Platform Specializations
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
              Deep Framework Expertise
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
              We do not push one universal platform. We objectively configure the ecosystem that matches your operational architecture.
            </p>
          </ScrollCascadeBlock>

          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ERP_PLATFORMS.map((plat, idx) => (
              <ScrollParallaxLayer
                key={plat.id}
                scrollYProgress={platformsProgress}
                yRange={computeColumnParallax(idx, 4, 12)}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.div
                  variants={scrollCardItemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                className={`group relative overflow-hidden h-full rounded-3xl p-7 border transition-all flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45'
                    : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-sky-300'
                }`}
              >
                <CardGlareOverlay theme={theme} subtle />
                <div className="relative z-10">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider block mb-1 ${
                      isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                    }`}
                  >
                    {plat.badge}
                  </span>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                    {plat.name}
                  </h3>
                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {plat.tagline}
                  </p>

                  <div className={`space-y-1.5 pt-3 border-t mb-6 ${isDark ? 'border-[#303030]' : 'border-slate-100'}`}>
                    <span className={`text-[10px] uppercase font-bold tracking-wider block ${isDark ? 'text-[#737373]' : 'text-slate-400'}`}>
                      Ideal Profile
                    </span>
                    <p className={`text-xs ${isDark ? 'text-[#D4D4D4]' : 'text-slate-600'}`}>{plat.bestSuitedFor}</p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  onClick={() => {
                    if (plat.id === 'erpnext') onNavigate('erpnext');
                    else if (plat.id === 'odoo') onNavigate('odoo');
                    else if (plat.id === 'zoho') onNavigate('zoho');
                    else onNavigate('it-solutions');
                  }}
                  className={`relative z-10 w-full py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDark
                      ? 'bg-[#1D1D1D] hover:bg-white hover:text-[#090909] text-white border-[#303030]'
                      : 'bg-sky-500/10 hover:bg-sky-500 hover:text-white text-sky-600 border-sky-500/20'
                  }`}
                >
                  <span>Explore {plat.name} Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </motion.button>
              </motion.div>
            </ScrollParallaxLayer>
          ))}
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>

      {/* 3. Core Modules Catalog */}
      <section ref={modulesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Functional Coverage
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
              Standard &amp; Custom ERP Modules
            </h2>
          </ScrollCascadeBlock>

          <ScrollCascadeGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ERP_MODULES.map((mod, idx) => (
              <ScrollParallaxLayer
                key={mod.name}
                scrollYProgress={modulesProgress}
                yRange={computeColumnParallax(idx, 3, 10)}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.div
                  variants={scrollCardItemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                className={`group relative overflow-hidden h-full rounded-2xl p-6 border transition-all ${
                  isDark
                    ? 'bg-[#171717] border-[#303030] hover:border-white/40'
                    : 'bg-white border-slate-200 shadow-md hover:border-sky-300'
                }`}
              >
                <CardGlareOverlay theme={theme} subtle />
                <div className="relative z-10">
                  <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white' : 'text-[#0284C7]'}`}>
                    <Database className="w-4 h-4" />
                    <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                      {mod.name}
                    </h3>
                  </div>
                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {mod.description}
                  </p>
                  <div className={`pt-2 border-t flex flex-wrap gap-1 ${isDark ? 'border-[#303030]' : 'border-slate-100'}`}>
                    {mod.features.map((feat) => (
                      <span
                        key={feat}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          isDark ? 'bg-[#1D1D1D] text-[#D4D4D4] border border-[#303030]' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScrollParallaxLayer>
          ))}
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>

      {/* 4. Comparison Tool */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ERPComparisonTool onNavigate={onNavigate} theme={theme} />
      </RevealSection>

      {/* 5. Interactive Find Your ERP Wizard */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FindYourERPWizard
          onNavigate={onNavigate}
          theme={theme}
          onSelectRecommendation={onSelectRecommendation}
        />
      </RevealSection>
    </div>
  );
};
