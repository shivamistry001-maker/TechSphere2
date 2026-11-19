/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { INSIGHTS_DATA } from '../data/insightsData.ts';
import { ArrowRight, Clock, Info } from 'lucide-react';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../components/motion/MotionPrimitives.tsx';
import { computeColumnParallax, scrollCardItemVariants } from '../utils/motion.ts';

interface InsightsPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate, theme }) => {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const gridRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  });

  const activeArticle = INSIGHTS_DATA.find((a) => a.id === activeArticleId);

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Knowledge &amp; Strategy
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Insights, Guides &amp; ERP Architecture Briefs
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Strategic frameworks, migration checklists, and technical evaluations to guide CTOs, business owners, and operations directors.
        </p>
        <div
          className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
            isDark
              ? 'bg-[#171717] border-[#303030] text-[#D4D4D4]'
              : 'bg-sky-500/10 border-sky-400/20 text-sky-700'
          }`}
        >
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Articles provided are sample insights developed for strategic planning.</span>
        </div>
      </RevealSection>

      {/* Article Reader if active */}
      <AnimatePresence mode="wait">
        {activeArticle && (
          <motion.section
            key={activeArticle.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div
              className={`rounded-3xl p-8 sm:p-12 border ${
                isDark
                  ? 'bg-[#171717] border-[#303030] text-[#D4D4D4]'
                  : 'bg-white border-slate-200 text-slate-700 shadow-xl'
              }`}
            >
              <div
                className={`flex items-center justify-between pb-6 border-b mb-6 ${
                  isDark ? 'border-[#303030]' : 'border-slate-200'
                }`}
              >
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isDark ? 'bg-[#1D1D1D] text-white border border-[#303030]' : 'bg-sky-500/15 text-sky-700'
                  }`}
                >
                  {activeArticle.category}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticleId(null)}
                  className={`text-xs hover:underline font-semibold cursor-pointer ${
                    isDark ? 'text-white' : 'text-[#0284C7]'
                  }`}
                >
                  Close Article
                </button>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                {activeArticle.title}
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div
                className={`mt-8 pt-6 border-t flex flex-wrap gap-3 justify-between items-center ${
                  isDark ? 'border-[#303030]' : 'border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveArticleId(null)}
                  className={`text-xs cursor-pointer ${
                    isDark ? 'text-[#A3A3A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Back to all articles
                </button>
                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  onClick={() => onNavigate('request-consultation')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                      : 'bg-sky-500 hover:bg-sky-400 text-white'
                  }`}
                >
                  Discuss This Topic With Us
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Articles Grid */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INSIGHTS_DATA.map((article, idx) => (
              <ScrollParallaxLayer
                key={article.id}
                scrollYProgress={scrollYProgress}
                yRange={computeColumnParallax(idx, 2, 10)}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.div
                  variants={scrollCardItemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                className={`group relative overflow-hidden h-full rounded-3xl p-7 sm:p-8 border transition-colors flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45'
                    : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-sky-300'
                }`}
              >
                <CardGlareOverlay theme={theme} subtle />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        isDark
                          ? 'bg-[#1D1D1D] text-white border-[#303030]'
                          : 'bg-sky-500/10 text-[#0284C7] border-sky-500/20'
                      }`}
                    >
                      {article.category}
                    </span>
                    <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                    {article.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {article.summary}
                  </p>
                </div>

                <div
                  className={`relative z-10 pt-4 border-t flex items-center justify-between ${
                    isDark ? 'border-[#303030]' : 'border-slate-200'
                  }`}
                >
                  <span className={`text-[11px] font-mono ${isDark ? 'text-[#737373]' : 'text-slate-500'}`}>
                    Sample Article
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveArticleId(article.id);
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }}
                    className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                      isDark ? 'text-white hover:text-[#D4D4D4]' : 'text-[#0284C7] hover:text-sky-500'
                    }`}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </ScrollParallaxLayer>
          ))}
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
