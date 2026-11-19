/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'motion/react';
import { ArrowUpRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { ThemeMode, WebsiteDemoCategory } from '../../types.ts';
import { LIVE_WEBSITE_DEMOS, WEBSITE_DEMO_CATEGORIES } from '../../data/showcaseData.ts';
import { filterWebsiteDemos } from '../../utils/showcaseLogic.ts';
import { EASE_PREMIUM } from '../../utils/motion.ts';
import {
  CardGlareOverlay,
  ScrollCascadeBlock,
  ScrollParallaxLayer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';
import { PreviewImage } from './PreviewImage.tsx';
import { useSectionDataLoader } from '../../utils/sectionLoader.ts';
import { WebsiteDemosGridSkeleton } from '../skeletons/SectionSkeletons.tsx';

interface WebsiteDemosGridProps {
  theme: ThemeMode;
  sectionRef: React.RefObject<HTMLElement | null>;
  isLoading?: boolean;
}

export const WebsiteDemosGrid: React.FC<WebsiteDemosGridProps> = ({
  theme,
  sectionRef,
  isLoading: externalLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WebsiteDemoCategory>('All Projects');
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const filteredDemos = filterWebsiteDemos(LIVE_WEBSITE_DEMOS, selectedCategory);
  const { items: visibleDemos, isLoading } = useSectionDataLoader(
    filteredDemos,
    `website-demos-${selectedCategory}`,
    {
      externalLoading,
      prefersReducedMotion: Boolean(prefersReducedMotion),
      isFilterTransition: selectedCategory !== 'All Projects',
    }
  );

  return (
    <>
      {/* Category Filter Buttons */}
      <ScrollCascadeBlock className="flex flex-wrap items-center gap-2 mb-10">
        <div
          role="group"
          data-testid="website-demo-filters"
          aria-label="Filter website demonstrations by industry"
          className="flex flex-wrap items-center gap-2"
        >
          {WEBSITE_DEMO_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <motion.button
                key={category}
                type="button"
                aria-pressed={active}
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
                } ${
                  active
                    ? isDark
                      ? 'bg-white text-[#090909] shadow-sm'
                      : 'bg-[#101B35] text-white shadow-sm'
                    : isDark
                    ? 'bg-[#171717] text-[#A3A3A3] border border-[#303030] hover:text-white hover:border-white/40'
                    : 'bg-white text-slate-600 border border-[#101B35]/[0.08] hover:text-[#101B35] hover:border-[#38BDF8]'
                }`}
              >
                {category}
              </motion.button>
            );
          })}
        </div>
      </ScrollCascadeBlock>

      {/* Responsive 4-Col Desktop / 2-Col Tablet / 1-Col Mobile Grid */}
      <ScrollCascadeBlock>
        <ScrollParallaxLayer
          scrollYProgress={scrollYProgress}
          yRange={[8, -8]}
          enabled={isDesktop}
        >
          {isLoading ? (
            <WebsiteDemosGridSkeleton theme={theme} count={filteredDemos.length || 4} />
          ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              data-testid="website-demos-grid"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6, transition: { duration: 0.14 } }}
              transition={{ duration: 0.24, ease: EASE_PREMIUM }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch"
            >
              {visibleDemos.map((demo, idx) => (
                <motion.article
                  key={demo.id}
                  data-testid={`website-demo-card-${demo.id}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.28,
                    delay: idx * 0.04,
                    ease: EASE_PREMIUM,
                  }}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                  onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  className={`group relative h-full rounded-2xl border overflow-hidden transition-colors duration-300 flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45 shadow-[0_14px_34px_rgba(0,0,0,0.45)]'
                      : 'bg-white border-[#101B35]/[0.08] hover:border-[#38BDF8]/60 shadow-[0_12px_32px_rgba(16,27,53,0.04)] hover:shadow-[0_22px_48px_rgba(16,27,53,0.09)]'
                  }`}
                >
                  <CardGlareOverlay theme={theme} subtle />

                  {/* Top Preview Thumbnail */}
                  <a
                    href={demo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${demo.title} live demonstration in a new tab`}
                    className={`relative z-10 block aspect-[16/10] overflow-hidden border-b focus:outline-none focus-visible:ring-2 ${
                      isDark
                        ? 'border-[#303030] focus-visible:ring-white'
                        : 'border-[#101B35]/[0.06] focus-visible:ring-[#38BDF8]'
                    }`}
                  >
                    <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                      <PreviewImage
                        src={demo.previewImage}
                        alt={demo.previewAlt}
                        fallbackTitle={demo.title}
                        fallbackSubtitle={demo.categoryLabel}
                        theme={theme}
                        eager
                      />
                    </div>
                    <span
                      className={`absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold backdrop-blur-md border transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${
                        isDark
                          ? 'bg-[#090909]/85 text-white border-[#303030]'
                          : 'bg-[#101B35]/85 text-white border-white/15'
                      }`}
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </a>

                  {/* Card Body */}
                  <div className="relative z-10 p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <p
                          className={`text-[11px] font-semibold tracking-wide ${
                            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                          }`}
                        >
                          {demo.categoryLabel}
                        </p>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-[#111111] border-[#303030] text-[#A3A3A3]'
                              : 'bg-[#F5FAFE] border-[#101B35]/10 text-slate-600'
                          }`}
                        >
                          Live Website Demonstration
                        </span>
                      </div>

                      <h3
                        className={`font-display text-lg font-bold leading-snug mb-2.5 min-h-[3.1rem] ${
                          isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                        }`}
                      >
                        {demo.title}
                      </h3>

                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed mb-4 ${
                          isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                        }`}
                      >
                        {demo.description}
                      </p>

                      <ul className="space-y-1.5 mb-5" aria-label={`${demo.title} highlights`}>
                        {demo.features.map((feat) => (
                          <li
                            key={feat}
                            className={`flex items-start gap-2 text-xs ${
                              isDark ? 'text-[#D4D4D4]' : 'text-slate-700'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isDark ? 'text-white' : 'text-[#0284C7]'
                              }`}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`pt-4 border-t ${
                        isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.06]'
                      }`}
                    >
                      <motion.a
                        href={demo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                        className={`group/btn w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 ${
                          isDark
                            ? 'bg-white text-[#090909] hover:bg-[#D4D4D4] focus-visible:ring-white'
                            : 'bg-[#101B35] text-white hover:bg-[#0284C7] focus-visible:ring-[#38BDF8]'
                        }`}
                      >
                        <span>Explore Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
          )}
        </ScrollParallaxLayer>
      </ScrollCascadeBlock>
    </>
  );
};
