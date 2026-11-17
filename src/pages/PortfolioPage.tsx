/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { ArrowRight, Info } from 'lucide-react';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollCascadeBlock,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../components/motion/MotionPrimitives.tsx';
import { EASE_PREMIUM } from '../utils/motion.ts';
import { WebsiteDemosGrid } from '../components/showcase/WebsiteDemosGrid.tsx';
import { ERPDemoShowcaseSection } from '../components/showcase/ERPDemoShowcaseSection.tsx';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const liveDemosRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  });

  const categories = ['All', 'Web', 'ERP', 'Applications', 'Automation'];

  const filteredItems =
    activeCategory === 'All'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Live Demonstrations &amp; Architecture Prototypes
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Website Demos, ERP Galleries &amp; System Portfolio
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Inspect live deployed industry websites, browse authentic ERPNext, Odoo, and Zoho platform interfaces, and review our conceptual ERP architecture prototypes.
        </p>
        <div
          className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
            isDark
              ? 'bg-[#171717] border-[#303030] text-[#D4D4D4]'
              : 'bg-sky-500/10 border-sky-400/20 text-[#0284C7]'
          }`}
        >
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Explore live website demos in a new tab or inspect real ERP interface galleries below.</span>
        </div>
      </RevealSection>

      {/* Part 1: Live Website Demo Projects */}
      <section ref={liveDemosRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock className="max-w-2xl mb-8 space-y-2">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Website Demo Projects
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
              Live Deployed Website Demonstrations
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
              Filter by sector and launch any demonstration directly to experience responsive layouts and UI engineering live.
            </p>
          </ScrollCascadeBlock>
          <WebsiteDemosGrid theme={theme} sectionRef={liveDemosRef} />
        </ScrollSectionContainer>
      </section>

      {/* Part 2: Explore ERP Solutions Screenshot Galleries */}
      <ERPDemoShowcaseSection theme={theme} className="!py-12 sm:!py-16" />

      {/* Part 3: Preserved Engineering Prototypes Catalog */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Engineering Blueprints
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold font-display ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
              System Architecture Prototypes
            </h2>
          </ScrollCascadeBlock>
          <ScrollCascadeBlock className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              whileHover={prefersReducedMotion ? undefined : { y: -1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                activeCategory === cat
                  ? isDark
                    ? 'bg-white text-[#090909] border-white shadow-md'
                    : 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : isDark
                  ? 'bg-[#171717] border-[#303030] text-[#A3A3A3] hover:text-white hover:border-white/40'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </ScrollCascadeBlock>

        {/* Portfolio Cards Grid */}
        <ScrollCascadeBlock>
          <ScrollParallaxLayer
            scrollYProgress={scrollYProgress}
            yRange={[10, -10]}
            enabled={isDesktop}
          >
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.44, delay: Math.min(idx * 0.04, 0.24), ease: EASE_PREMIUM }}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                  onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45'
                      : 'bg-white border-slate-200 shadow-lg shadow-slate-200/40 hover:border-sky-300'
                  }`}
                >
                  <CardGlareOverlay theme={theme} subtle />
                  <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        isDark
                          ? 'bg-[#1D1D1D] text-white border-[#303030]'
                          : 'bg-sky-500/15 text-[#0284C7] border-sky-500/25'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isDark ? 'bg-[#111111] border border-[#303030] text-[#A3A3A3]' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      Demo Project
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {item.description}
                  </p>

                  <div
                    className={`p-3 rounded-xl border mb-5 text-xs ${
                      isDark
                        ? 'bg-[#111111] border-[#303030] text-[#D4D4D4]'
                        : 'bg-[#F5FAFE] border-sky-200 text-[#0284C7]'
                    }`}
                  >
                    <strong>Highlight:</strong> {item.highlight}
                  </div>
                </div>

                <div className="relative z-10">
                  <div
                    className={`flex flex-wrap gap-1.5 pt-4 border-t mb-5 ${
                      isDark ? 'border-[#303030]' : 'border-slate-100'
                    }`}
                  >
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          isDark ? 'bg-[#1D1D1D] text-[#D4D4D4] border border-[#303030]' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    onClick={() => onNavigate('request-consultation')}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isDark
                        ? 'bg-[#1D1D1D] hover:bg-white hover:text-[#090909] text-white border-[#303030]'
                        : 'bg-sky-500/10 hover:bg-sky-500 hover:text-white text-[#0284C7] border-sky-500/20'
                    }`}
                  >
                    <span>Inquire About Similar Build</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </ScrollParallaxLayer>
        </ScrollCascadeBlock>
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
