/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';
import { ArrowUpRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { ThemeMode, WebsiteDemoCategory, WebsiteDemoProject } from '../../types.ts';
import { LIVE_WEBSITE_DEMOS, WEBSITE_DEMO_CATEGORIES } from '../../data/showcaseData.ts';
import { filterWebsiteDemos } from '../../utils/showcaseLogic.ts';
import { computeCenteredPillScrollLeft } from '../../utils/portfolioFilter.ts';
import {
  CardGlareOverlay,
  ScrollCascadeBlock,
  ScrollParallaxLayer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';
import { PreviewImage } from './PreviewImage.tsx';
import { WebsiteDemosGridSkeleton } from '../skeletons/SectionSkeletons.tsx';

interface WebsiteDemosGridProps {
  theme: ThemeMode;
  sectionRef: React.RefObject<HTMLElement | null>;
  isLoading?: boolean;
}

interface WebsiteDemoCardProps {
  demo: WebsiteDemoProject;
  theme: ThemeMode;
  isDark: boolean;
  enableHoverEffects: boolean;
}

const WebsiteDemoCard: React.FC<WebsiteDemoCardProps> = React.memo(
  ({ demo, theme, isDark, enableHoverEffects }) => (
    <article
      data-testid={`website-demo-card-${demo.id}`}
      data-sound-hover="true"
      data-glass-layer="website-demo-card"
      onMouseMove={enableHoverEffects ? updateCardGlareCoordinates : undefined}
      className="ts-glass-card ts-glass-card-interactive group relative h-full rounded-2xl overflow-hidden flex flex-col justify-between md:hover:-translate-y-1 transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out"
    >
      {enableHoverEffects && <CardGlareOverlay theme={theme} subtle />}

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
        <div className="w-full h-full transition-transform duration-500 ease-out md:group-hover:scale-[1.04]">
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
          className={`ts-glass-float-btn absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-opacity duration-200 opacity-95 md:opacity-0 md:group-hover:opacity-100 ${
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
            className={`font-display text-lg font-bold leading-snug mb-2.5 md:min-h-[3.1rem] ${
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
          <a
            href={demo.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`ts-glass-btn-primary group/btn w-full min-h-[44px] py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 ${
              isDark
                ? 'text-[#090909] focus-visible:ring-white'
                : 'text-white focus-visible:ring-[#38BDF8]'
            }`}
          >
            <span>Explore Live Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  )
);

export const WebsiteDemosGrid: React.FC<WebsiteDemosGridProps> = ({
  theme,
  sectionRef,
  isLoading: externalLoading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WebsiteDemoCategory>('All Projects');
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const isDark = theme === 'dark';
  const filterTrayRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const filteredDemos = useMemo(
    () => filterWebsiteDemos(LIVE_WEBSITE_DEMOS, selectedCategory),
    [selectedCategory]
  );

  const handleSelectCategory = useCallback(
    (category: WebsiteDemoCategory, buttonEl: HTMLButtonElement | null) => {
      setSelectedCategory(category);
      const tray = filterTrayRef.current;
      if (tray && buttonEl && tray.scrollWidth > tray.clientWidth) {
        const nextScrollLeft = computeCenteredPillScrollLeft({
          containerWidth: tray.clientWidth,
          containerScrollWidth: tray.scrollWidth,
          pillOffsetLeft: buttonEl.offsetLeft,
          pillWidth: buttonEl.offsetWidth,
        });
        tray.scrollTo({
          left: nextScrollLeft,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [prefersReducedMotion]
  );

  const enableHoverEffects = isDesktop && !prefersReducedMotion;

  return (
    <>
      {/* Single-row scrollable Liquid Glass Category Filter Bar on mobile */}
      <ScrollCascadeBlock className="flex items-center mb-8 sm:mb-10">
        <div
          ref={filterTrayRef}
          role="group"
          data-testid="website-demo-filters"
          data-glass-layer="showcase-filter-tray"
          aria-label="Filter website demonstrations by industry"
          className="ts-glass-accent ts-no-scrollbar max-w-full inline-flex flex-nowrap items-center gap-1 p-1.5 rounded-full overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-mandatory"
        >
          {WEBSITE_DEMO_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={(e) => handleSelectCategory(category, e.currentTarget)}
                className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 snap-center transition-[color,background-color,box-shadow,transform] duration-150 ease-out active:scale-[0.97] cursor-pointer focus:outline-none focus-visible:ring-2 ${
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
              </button>
            );
          })}
        </div>
      </ScrollCascadeBlock>

      {/* Responsive 4-Col Desktop / 2-Col Tablet / 1-Col Mobile Grid (instant filter switch, no remount flicker) */}
      <ScrollCascadeBlock>
        <ScrollParallaxLayer
          scrollYProgress={scrollYProgress}
          yRange={[8, -8]}
          enabled={isDesktop}
        >
          {externalLoading ? (
            <WebsiteDemosGridSkeleton theme={theme} count={filteredDemos.length || 4} />
          ) : (
            <div
              data-testid="website-demos-grid"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch"
            >
              {filteredDemos.map((demo) => (
                <WebsiteDemoCard
                  key={demo.id}
                  demo={demo}
                  theme={theme}
                  isDark={isDark}
                  enableHoverEffects={enableHoverEffects}
                />
              ))}
            </div>
          )}
        </ScrollParallaxLayer>
      </ScrollCascadeBlock>
    </>
  );
};
