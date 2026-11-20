/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId } from '../../types.ts';
import {
  ROUTE_SKELETON_PRESETS,
  createRouteSkeletonContainerVariants,
  createRouteSkeletonItemVariants,
  getSkeletonShimmerDelayClass,
  resolveRouteSkeletonVariant,
} from '../../utils/routeSkeleton.ts';

interface RouteLoadingFallbackProps {
  isDark: boolean;
  page?: PageId;
}

/**
 * Staggered, route-aware skeleton fallback displayed during lazy page transitions.
 * Mirrors TechSphere's editorial, catalog, and consultation layouts with realistic
 * non-uniform text block proportions, theme-faithful surfaces, and reduced-motion safety.
 */
export const RouteLoadingFallback: React.FC<RouteLoadingFallbackProps> = ({
  isDark,
  page,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const variant = resolveRouteSkeletonVariant(page);
  const preset = ROUTE_SKELETON_PRESETS[variant];

  const containerVariants = useMemo(
    () => createRouteSkeletonContainerVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );
  const itemVariants = useMemo(
    () => createRouteSkeletonItemVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  // Strict monochrome dark mode surfaces vs crisp light mode slate/sky tones
  const shimmerThemeClass = isDark ? 'ts-skeleton-dark' : 'ts-skeleton-light';
  const eyebrowBarClass = isDark ? 'bg-[#2F2F2F]' : 'bg-sky-100/90';
  const headingBarClass = isDark ? 'bg-[#2D2D2D]' : 'bg-[#DCE6F2]';
  const bodyBarClass = isDark ? 'bg-[#242424]' : 'bg-[#E9EFF6]';
  const mutedBarClass = isDark ? 'bg-[#202020]' : 'bg-[#F1F5F9]';
  const cardSurfaceClass = isDark
    ? 'bg-[#171717] border-[#303030]'
    : 'bg-white border-[#101B35]/[0.07] shadow-[0_12px_32px_rgba(16,27,53,0.04)]';
  const insetSurfaceClass = isDark
    ? 'bg-[#111111] border-[#303030]'
    : 'bg-[#F8FAFC] border-[#101B35]/[0.07]';
  const dividerClass = isDark ? 'border-[#2A2A2A]' : 'border-[#101B35]/[0.06]';

  const delayClass = (slot: number) =>
    getSkeletonShimmerDelayClass(slot, prefersReducedMotion);

  return (
    <motion.div
      role="status"
      aria-busy="true"
      aria-label="Loading page"
      data-testid="route-loading-fallback"
      data-skeleton-variant={variant}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10"
    >
      <span className="sr-only">Loading page content...</span>

      {/* Staggered Hero Header Block with Realistic Eyebrow, Multi-Line Headline & Lead Copy */}
      <div className="max-w-3xl space-y-5">
        <motion.div
          variants={itemVariants}
          custom={0}
          data-skeleton-stage="eyebrow"
          className="flex items-center gap-3"
        >
          <div
            aria-hidden="true"
            className={`h-6 ${preset.eyebrowWidthClass} rounded-full ts-skeleton-block ${shimmerThemeClass} ${eyebrowBarClass} ${delayClass(0)}`}
          />
          {variant === 'editorial' && (
            <div
              aria-hidden="true"
              className={`h-3.5 w-20 rounded-md ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${delayClass(0)}`}
            />
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          custom={1}
          data-skeleton-stage="headline"
          className="space-y-3"
        >
          {preset.headingLineClasses.map((widthClass, idx) => (
            <div
              key={`heading-line-${idx}`}
              aria-hidden="true"
              className={`h-9 sm:h-10 max-w-full rounded-xl ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${widthClass} ${delayClass(1)}`}
            />
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          custom={2}
          data-skeleton-stage="lead"
          className="space-y-2.5 pt-1 max-w-2xl"
        >
          {preset.leadParagraphLineClasses.map((widthClass, idx) => (
            <div
              key={`lead-line-${idx}`}
              aria-hidden="true"
              className={`h-4 rounded-lg ts-skeleton-block ${shimmerThemeClass} ${bodyBarClass} ${widthClass} ${delayClass(2)}`}
            />
          ))}
        </motion.div>

        {preset.actionButtonWidthClasses.length > 0 && (
          <motion.div
            variants={itemVariants}
            custom={3}
            data-skeleton-stage="actions"
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {preset.actionButtonWidthClasses.map((widthClass, idx) => (
              <div
                key={`action-btn-${idx}`}
                aria-hidden="true"
                className={`h-11 rounded-full ts-skeleton-block ${shimmerThemeClass} ${
                  idx === 0 ? headingBarClass : mutedBarClass
                } ${widthClass} ${delayClass(3)}`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Catalog Filter Bar Variation */}
      {preset.filterChipWidthClasses.length > 0 && (
        <motion.div
          variants={itemVariants}
          custom={3}
          data-skeleton-stage="filters"
          className={`flex flex-wrap items-center gap-2.5 pb-6 border-b ${dividerClass}`}
        >
          {preset.filterChipWidthClasses.map((widthClass, idx) => (
            <div
              key={`filter-chip-${idx}`}
              aria-hidden="true"
              className={`h-9 rounded-full ts-skeleton-block ${shimmerThemeClass} ${
                idx === 0 ? headingBarClass : bodyBarClass
              } ${widthClass} ${delayClass(3)}`}
            />
          ))}
        </motion.div>
      )}

      {/* Editorial & Catalog Realistic Varied Card Grid */}
      {preset.cards.length > 0 && (
        <div
          data-skeleton-stage="cards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {preset.cards.map((card, cardIdx) => {
            const stageIndex = 4 + cardIdx;
            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                custom={stageIndex}
                data-skeleton-card={card.id}
                className={`rounded-2xl p-6 sm:p-7 border flex flex-col justify-between gap-6 ${cardSurfaceClass}`}
              >
                <div className="space-y-4">
                  {/* Card Icon + Category Tag */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      aria-hidden="true"
                      className={`w-11 h-11 rounded-xl shrink-0 ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${delayClass(stageIndex)}`}
                    />
                    <div
                      aria-hidden="true"
                      className={`h-5 rounded-full ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${card.badgeWidthClass} ${delayClass(stageIndex)}`}
                    />
                  </div>

                  {/* Varied 1-to-2 Line Card Title */}
                  <div className="space-y-2 pt-1">
                    {card.titleLineClasses.map((widthClass, tIdx) => (
                      <div
                        key={`${card.id}-title-${tIdx}`}
                        aria-hidden="true"
                        className={`h-5 rounded-lg ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${widthClass} ${delayClass(stageIndex)}`}
                      />
                    ))}
                  </div>

                  {/* Realistic Non-Uniform Multi-Line Paragraph */}
                  <div className="space-y-2">
                    {card.paragraphLineClasses.map((widthClass, pIdx) => (
                      <div
                        key={`${card.id}-para-${pIdx}`}
                        aria-hidden="true"
                        className={`h-3.5 rounded-md ts-skeleton-block ${shimmerThemeClass} ${bodyBarClass} ${widthClass} ${delayClass(stageIndex)}`}
                      />
                    ))}
                  </div>

                  {/* Varied Meta Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {card.metaChipWidthClasses.map((widthClass, mIdx) => (
                      <div
                        key={`${card.id}-chip-${mIdx}`}
                        aria-hidden="true"
                        className={`h-6 rounded-md ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${widthClass} ${delayClass(stageIndex)}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Footer Action Row */}
                <div className={`pt-4 border-t flex items-center justify-between ${dividerClass}`}>
                  <div
                    aria-hidden="true"
                    className={`h-4 rounded-md ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${card.footerActionWidthClass} ${delayClass(stageIndex)}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`h-4 w-5 rounded-md ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${delayClass(stageIndex)}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Contact / Consultation Split Layout Variation */}
      {variant === 'contact' && (
        <div
          data-skeleton-stage="contact-split"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left 5 Columns: Direct Channel Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {preset.contactRows.map((row, rowIdx) => {
              const stageIndex = 3 + rowIdx;
              return (
                <motion.div
                  key={row.id}
                  variants={itemVariants}
                  custom={stageIndex}
                  className={`rounded-2xl p-5 border flex items-start gap-4 ${cardSurfaceClass}`}
                >
                  <div
                    aria-hidden="true"
                    className={`w-11 h-11 rounded-xl shrink-0 ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${delayClass(stageIndex)}`}
                  />
                  <div className="flex-1 space-y-2.5 pt-0.5">
                    <div
                      aria-hidden="true"
                      className={`h-3 rounded-md ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${row.labelWidthClass} ${delayClass(stageIndex)}`}
                    />
                    <div
                      aria-hidden="true"
                      className={`h-4 rounded-md ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${row.primaryValueWidthClass} ${delayClass(stageIndex)}`}
                    />
                    <div
                      aria-hidden="true"
                      className={`h-3.5 rounded-md ts-skeleton-block ${shimmerThemeClass} ${bodyBarClass} ${row.secondaryValueWidthClass} ${delayClass(stageIndex)}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right 7 Columns: Consultation Form Surface */}
          <motion.div
            variants={itemVariants}
            custom={5}
            className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border space-y-6 ${cardSurfaceClass}`}
          >
            <div className="space-y-2">
              <div
                aria-hidden="true"
                className={`h-6 w-52 rounded-lg ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${delayClass(4)}`}
              />
              <div
                aria-hidden="true"
                className={`h-3.5 w-[78%] rounded-md ts-skeleton-block ${shimmerThemeClass} ${bodyBarClass} ${delayClass(4)}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['w-20', 'w-24'].map((labelWidth, idx) => (
                <div key={`field-row-1-${idx}`} className="space-y-2">
                  <div
                    aria-hidden="true"
                    className={`h-3 ${labelWidth} rounded ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${delayClass(5)}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`h-11 w-full rounded-xl border ${insetSurfaceClass} ts-skeleton-block ${shimmerThemeClass} ${delayClass(5)}`}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div
                aria-hidden="true"
                className={`h-3 w-32 rounded ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${delayClass(5)}`}
              />
              <div
                aria-hidden="true"
                className={`h-11 w-full rounded-xl border ${insetSurfaceClass} ts-skeleton-block ${shimmerThemeClass} ${delayClass(5)}`}
              />
            </div>

            <div className="space-y-2">
              <div
                aria-hidden="true"
                className={`h-3 w-28 rounded ts-skeleton-block ${shimmerThemeClass} ${mutedBarClass} ${delayClass(5)}`}
              />
              <div
                aria-hidden="true"
                className={`h-24 w-full rounded-xl border ${insetSurfaceClass} ts-skeleton-block ${shimmerThemeClass} ${delayClass(5)}`}
              />
            </div>

            <div
              aria-hidden="true"
              className={`h-12 w-full sm:w-56 rounded-full ts-skeleton-block ${shimmerThemeClass} ${headingBarClass} ${delayClass(5)}`}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
