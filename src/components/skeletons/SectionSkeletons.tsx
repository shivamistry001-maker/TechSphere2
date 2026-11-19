/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeMode } from '../../types.ts';
import { resolveSkeletonCount } from '../../utils/sectionLoader.ts';

interface SkeletonBlockProps {
  theme: ThemeMode;
  className?: string;
}

/**
 * Lightweight GPU-composited shimmer primitive that automatically adapts
 * to monochrome Dark Mode (#1D1D1D/#262626) and crisp Light Mode (#E8EEF5).
 */
export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ theme, className = '' }) => {
  const isDark = theme === 'dark';
  return (
    <div
      aria-hidden="true"
      className={`ts-skeleton-block ${
        isDark ? 'ts-skeleton-dark bg-[#222222]' : 'ts-skeleton-light bg-[#E8EEF5]'
      } ${className}`}
    />
  );
};

interface GridSkeletonProps {
  theme: ThemeMode;
  count?: number;
}

/**
 * Skeleton grid matching Home ServicesShowcaseSection (6-card 3-column grid).
 */
export const ServiceShowcaseGridSkeleton: React.FC<GridSkeletonProps> = ({
  theme,
  count = 6,
}) => {
  const isDark = theme === 'dark';
  const total = resolveSkeletonCount(count, 6, 6);

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading services"
      data-testid="services-showcase-skeleton"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <span className="sr-only">Loading enterprise technology and ERP services...</span>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={`service-showcase-skeleton-${idx}`}
          className={`h-full rounded-2xl p-7 border flex flex-col justify-between ${
            isDark
              ? 'bg-[#171717] border-[#303030]'
              : 'bg-white border-[#101B35]/[0.07] shadow-[0_12px_32px_rgba(16,27,53,0.04)]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <SkeletonBlock theme={theme} className="w-12 h-12 rounded-2xl" />
              <SkeletonBlock theme={theme} className="w-24 h-3.5 rounded-md" />
            </div>

            <SkeletonBlock theme={theme} className="w-3/4 h-6 rounded-lg mb-3" />
            <div className="space-y-2 mb-7">
              <SkeletonBlock theme={theme} className="w-full h-3.5 rounded-md" />
              <SkeletonBlock theme={theme} className="w-5/6 h-3.5 rounded-md" />
            </div>
          </div>

          <div
            className={`pt-4 border-t flex items-center justify-between ${
              isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.06]'
            }`}
          >
            <SkeletonBlock theme={theme} className="w-24 h-4 rounded-md" />
            <SkeletonBlock theme={theme} className="w-20 h-3.5 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton list matching ServicesPage detailed 12-column breakdown cards.
 */
export const ServiceCatalogListSkeleton: React.FC<GridSkeletonProps> = ({
  theme,
  count = 3,
}) => {
  const isDark = theme === 'dark';
  const total = resolveSkeletonCount(count, 3, 6);

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading services catalog"
      data-testid="services-catalog-skeleton"
      className="space-y-10"
    >
      <span className="sr-only">Loading comprehensive IT and ERP engineering services...</span>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={`service-catalog-skeleton-${idx}`}
          className={`rounded-3xl p-8 sm:p-12 border ${
            isDark
              ? 'bg-[#171717] border-[#303030]'
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 columns */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <SkeletonBlock theme={theme} className="w-12 h-12 rounded-2xl shrink-0" />
                <div className="space-y-2 flex-1 max-w-sm">
                  <SkeletonBlock theme={theme} className="w-20 h-3 rounded-md" />
                  <SkeletonBlock theme={theme} className="w-3/4 h-6 rounded-lg" />
                </div>
              </div>

              <div className="space-y-2.5">
                <SkeletonBlock theme={theme} className="w-full h-4 rounded-md" />
                <SkeletonBlock theme={theme} className="w-11/12 h-4 rounded-md" />
                <SkeletonBlock theme={theme} className="w-2/3 h-4 rounded-md" />
              </div>

              <div className="pt-2 space-y-3">
                <SkeletonBlock theme={theme} className="w-44 h-3 rounded-md" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Array.from({ length: 4 }).map((__, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <SkeletonBlock theme={theme} className="w-4 h-4 rounded-full shrink-0" />
                      <SkeletonBlock theme={theme} className="w-4/5 h-3.5 rounded-md" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <SkeletonBlock theme={theme} className="w-52 h-11 rounded-xl" />
              </div>
            </div>

            {/* Right 5 columns */}
            <div
              className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 ${
                isDark ? 'bg-[#111111] border-[#303030]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <SkeletonBlock theme={theme} className="w-32 h-3.5 rounded-md" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((__, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <SkeletonBlock theme={theme} className="w-5 h-5 rounded-full shrink-0" />
                    <SkeletonBlock theme={theme} className="w-5/6 h-3.5 rounded-md" />
                  </div>
                ))}
              </div>
              <div className={`pt-4 border-t ${isDark ? 'border-[#303030]' : 'border-slate-200'}`}>
                <SkeletonBlock theme={theme} className="w-28 h-3 rounded-md mb-2.5" />
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: 5 }).map((__, tIdx) => (
                    <SkeletonBlock key={tIdx} theme={theme} className="w-16 h-6 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton grid matching PortfolioPage prototype cards (3-column layout).
 */
export const PortfolioGridSkeleton: React.FC<GridSkeletonProps> = ({
  theme,
  count = 6,
}) => {
  const isDark = theme === 'dark';
  const total = resolveSkeletonCount(count, 6, 6);

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading portfolio prototypes"
      data-testid="portfolio-grid-skeleton"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <span className="sr-only">Loading portfolio architecture prototypes...</span>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={`portfolio-skeleton-${idx}`}
          className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between ${
            isDark
              ? 'bg-[#171717] border-[#303030]'
              : 'bg-white border-slate-200 shadow-lg shadow-slate-200/40'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <SkeletonBlock theme={theme} className="w-20 h-5 rounded-full" />
              <SkeletonBlock theme={theme} className="w-24 h-4 rounded" />
            </div>

            <SkeletonBlock theme={theme} className="w-4/5 h-5 rounded-lg mb-3" />

            <div className="space-y-2 mb-4">
              <SkeletonBlock theme={theme} className="w-full h-3.5 rounded-md" />
              <SkeletonBlock theme={theme} className="w-11/12 h-3.5 rounded-md" />
              <SkeletonBlock theme={theme} className="w-3/4 h-3.5 rounded-md" />
            </div>

            <div
              className={`p-3 rounded-xl border mb-5 space-y-2 ${
                isDark ? 'bg-[#111111] border-[#303030]' : 'bg-[#F5FAFE] border-sky-200/60'
              }`}
            >
              <SkeletonBlock theme={theme} className="w-full h-3 rounded-md" />
              <SkeletonBlock theme={theme} className="w-2/3 h-3 rounded-md" />
            </div>
          </div>

          <div>
            <div
              className={`flex flex-wrap gap-1.5 pt-4 border-t mb-5 ${
                isDark ? 'border-[#303030]' : 'border-slate-100'
              }`}
            >
              {Array.from({ length: 4 }).map((__, tIdx) => (
                <SkeletonBlock key={tIdx} theme={theme} className="w-14 h-5 rounded" />
              ))}
            </div>
            <SkeletonBlock theme={theme} className="w-full h-10 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton grid matching WebsiteDemosGrid (4-column live demo cards).
 */
export const WebsiteDemosGridSkeleton: React.FC<GridSkeletonProps> = ({
  theme,
  count = 4,
}) => {
  const isDark = theme === 'dark';
  const total = resolveSkeletonCount(count, 4, 4);

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading website demonstrations"
      data-testid="website-demos-skeleton"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch"
    >
      <span className="sr-only">Loading live website demonstrations...</span>
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={`website-demo-skeleton-${idx}`}
          className={`h-full rounded-2xl border overflow-hidden flex flex-col justify-between ${
            isDark
              ? 'bg-[#171717] border-[#303030]'
              : 'bg-white border-[#101B35]/[0.08] shadow-[0_12px_32px_rgba(16,27,53,0.04)]'
          }`}
        >
          <div>
            <div
              className={`aspect-[16/10] border-b ${
                isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.06]'
              }`}
            >
              <SkeletonBlock theme={theme} className="w-full h-full rounded-none" />
            </div>

            <div className="p-5 sm:p-6 pb-0">
              <div className="flex items-center justify-between gap-2 mb-3">
                <SkeletonBlock theme={theme} className="w-20 h-3 rounded-md" />
                <SkeletonBlock theme={theme} className="w-24 h-4 rounded-md" />
              </div>

              <SkeletonBlock theme={theme} className="w-5/6 h-5 rounded-lg mb-2" />
              <SkeletonBlock theme={theme} className="w-3/5 h-5 rounded-lg mb-3.5" />

              <div className="space-y-2 mb-4">
                <SkeletonBlock theme={theme} className="w-full h-3 rounded-md" />
                <SkeletonBlock theme={theme} className="w-4/5 h-3 rounded-md" />
              </div>

              <div className="space-y-2 mb-5">
                {Array.from({ length: 4 }).map((__, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2">
                    <SkeletonBlock theme={theme} className="w-3.5 h-3.5 rounded-full shrink-0" />
                    <SkeletonBlock theme={theme} className="w-4/5 h-3 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 pt-0">
            <div
              className={`pt-4 border-t ${
                isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.06]'
              }`}
            >
              <SkeletonBlock theme={theme} className="w-full h-10 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
