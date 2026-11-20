/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { ArrowRight, Globe, Info, Layers } from 'lucide-react';
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
import { useSectionDataLoader } from '../utils/sectionLoader.ts';
import { PortfolioGridSkeleton } from '../components/skeletons/SectionSkeletons.tsx';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  isLoading?: boolean;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  theme,
  isLoading: externalLoading = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
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

  const { items: visibleItems, isLoading } = useSectionDataLoader(
    filteredItems,
    `portfolio-catalog-${activeCategory}`,
    {
      externalLoading,
      prefersReducedMotion: Boolean(prefersReducedMotion),
      isFilterTransition: activeCategory !== 'All',
    }
  );

  return (
    <div className="ts-glass-canvas-primary min-h-screen space-y-14 sm:space-y-20 pt-8 sm:pt-14 pb-20 overflow-x-clip">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Conceptual Engineering Blueprints
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          System Architecture Prototypes
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Interactive technical prototypes and system architecture demonstrators created to showcase our capabilities.
        </p>
        <div
          data-glass-layer="portfolio-notice"
          className={`ts-glass-accent mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Note: Portfolio items below represent demonstrative architectural prototypes.</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('demo-websites')}
            className={`ts-glass-btn-secondary inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer ${
              isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Explore Live Website Demos</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('erp-showcase')}
            className={`ts-glass-btn-secondary inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer ${
              isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Explore ERP Showcase</span>
          </button>
        </div>
      </RevealSection>

      {/* Preserved Engineering Prototypes Catalog */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock className="flex flex-wrap items-center justify-center mb-10">
            <div
              role="group"
              data-glass-layer="portfolio-filter-tray"
              aria-label="Filter portfolio prototypes by category"
              className="ts-glass-accent inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? isDark
                        ? 'bg-white text-[#090909] shadow-sm'
                        : 'bg-[#101B35] text-white shadow-sm'
                      : isDark
                      ? 'bg-transparent text-[#D4D4D4] hover:text-white hover:bg-white/[0.08]'
                      : 'bg-transparent text-slate-700 hover:text-[#101B35] hover:bg-white/60'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollCascadeBlock>

          {/* Portfolio Cards Grid with Lightweight Skeleton Fallback */}
          <ScrollCascadeBlock>
            <ScrollParallaxLayer
              scrollYProgress={scrollYProgress}
              yRange={[10, -10]}
              enabled={isDesktop}
            >
              {isLoading ? (
                <PortfolioGridSkeleton theme={theme} count={filteredItems.length || 3} />
              ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      data-glass-layer="portfolio-card"
                      data-sound-hover="true"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.44, delay: Math.min(idx * 0.04, 0.24), ease: EASE_PREMIUM }}
                      whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                      onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                      className="ts-glass-card ts-glass-card-interactive group relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
                    >
                      <CardGlareOverlay theme={theme} subtle />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                              isDark
                                ? 'bg-white/[0.08] text-white border-white/15'
                                : 'bg-white/80 text-[#0284C7] border-white shadow-2xs'
                            }`}
                          >
                            {item.category}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                              isDark
                                ? 'bg-white/[0.05] border-white/10 text-[#A3A3A3]'
                                : 'bg-white/65 border-white/85 text-slate-600'
                            }`}
                          >
                            Demo Project
                          </span>
                        </div>

                        <h2 className={`text-lg font-bold mb-2 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                          {item.title}
                        </h2>

                        <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                          {item.description}
                        </p>

                        <div
                          className={`p-3 rounded-xl border mb-5 text-xs ${
                            isDark
                              ? 'bg-white/[0.05] border-white/12 text-[#D4D4D4]'
                              : 'bg-white/65 border-white/90 text-[#0369A1] shadow-2xs'
                          }`}
                        >
                          <strong>Highlight:</strong> {item.highlight}
                        </div>
                      </div>

                      <div className="relative z-10">
                        <div
                          className={`flex flex-wrap gap-1.5 pt-4 border-t mb-5 ${
                            isDark ? 'border-white/10' : 'border-[#101B35]/[0.08]'
                          }`}
                        >
                          {item.technologies.map((t) => (
                            <span
                              key={t}
                              className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                                isDark
                                  ? 'bg-white/[0.06] text-[#D4D4D4] border-white/12'
                                  : 'bg-white/75 text-slate-700 border-white/90'
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
                          className={`ts-glass-btn-primary w-full min-h-[44px] py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                            isDark ? 'text-[#090909]' : 'text-white'
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
              )}
            </ScrollParallaxLayer>
          </ScrollCascadeBlock>
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
