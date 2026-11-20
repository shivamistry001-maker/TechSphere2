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
          data-glass-layer="showcase-filter-tray"
          aria-label="Filter website demonstrations by industry"
          className="ts-glass-accent inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full"
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
                className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
                } ${
                  active
                    ? isDark
                      ? 'bg-white text-[#090909] shadow-sm'
                      : 'bg-[#101B35] text-white shadow-sm'
                    : isDark
                    ? 'bg-transparent text-[#D4D4D4] hover:text-white hover:bg-white/[0.08]'
                    : 'bg-transparent text-slate-700 hover:text-[#101B35] hover:bg-[#101B35]/[0.05]'
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
                  data-sound-hover="true"
                  data-glass-layer="website-demo-card"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.28,
                    delay: idx * 0.04,
                    ease: EASE_PREMIUM,
                  }}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                  onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  className="ts-glass-card ts-glass-card-interactive group relative h-full rounded-2xl overflow-hidden flex flex-col justify-between"
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
                        ? 'border-white/10 focus-visible:ring-white'
                        : 'border-white/70 focus-visible:ring-[#38BDF8]'
                    }`}
                  >
                    <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                      <PreviewImage
                        src={demo.previewImage}
                        alt={demo.previewAlt}
                        fallbackTitle={demo.title}
                        fallbackSubtitle={demo.categoryLabel}
                        theme={theme}
                      />
                    </div>
                    <span
                      data-glass-layer="showcase-category-label"
                      className={`ts-glass-badge absolute top-2.5 left-2.5 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                        isDark ? 'text-white' : 'text-[#101B35]'
                      }`}
                    >
                      {demo.categoryLabel}
                    </span>
                    <span
                      data-glass-layer="showcase-badge"
                      className={`ts-glass-float-btn absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${
                        isDark ? 'text-white' : 'text-[#101B35]'
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
                              ? 'bg-white/[0.06] border-white/12 text-[#D4D4D4]'
                              : 'bg-white/75 border-white/90 text-slate-600 shadow-2xs'
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
                        isDark ? 'border-white/10' : 'border-[#101B35]/[0.08]'
                      }`}
                    >
                      <motion.a
                        href={demo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                        className={`ts-glass-btn-primary group/btn w-full min-h-[44px] py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 ${
                          isDark
                            ? 'text-[#090909] focus-visible:ring-white'
                            : 'text-white focus-visible:ring-[#38BDF8]'
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
