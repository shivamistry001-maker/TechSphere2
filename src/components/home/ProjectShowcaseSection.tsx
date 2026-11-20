/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';
import {
  ScrollCascadeBlock,
  ScrollSectionContainer,
} from '../motion/MotionPrimitives.tsx';
import { WebsiteDemosGrid } from '../showcase/WebsiteDemosGrid.tsx';

interface ProjectShowcaseSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

export const ProjectShowcaseSection: React.FC<ProjectShowcaseSectionProps> = ({
  onNavigate,
  theme = 'light',
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <section
      ref={sectionRef}
      id="website-demo-projects"
      className="ts-glass-canvas-tinted py-20 sm:py-28 scroll-mt-20 overflow-x-clip transition-colors duration-300"
      aria-labelledby="showcase-heading"
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollCascadeBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Live Website Demonstrations
            </p>
            <h2
              id="showcase-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
            >
              Website Demo Projects &amp; Industry Flagships.
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
              Explore four live, responsive business website demonstrations engineered across hospitality, chartered accountancy, creative photography, and industrial manufacturing.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { x: 2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={() => onNavigate('portfolio')}
            className={`group inline-flex items-center gap-1.5 min-h-[44px] py-2.5 text-xs sm:text-sm font-semibold hover:underline cursor-pointer shrink-0 ${
              isDark ? 'text-white' : 'text-[#0284C7]'
            }`}
          >
            <span>Open Full Portfolio Page</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </ScrollCascadeBlock>

        {/* Live Website Demo Cards Grid + Category Filters */}
        <WebsiteDemosGrid theme={theme} sectionRef={sectionRef} />
      </ScrollSectionContainer>
    </section>
  );
};
