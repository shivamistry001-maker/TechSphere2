/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { ERPKPIMetric, ERPMetricScope, ThemeMode } from '../../types.ts';
import { EASE_PREMIUM } from '../../utils/motion.ts';
import {
  ERP_SCOPE_OPTIONS,
  formatAnimatedMetricValue,
  getMetricsForScope,
  getScopeOption,
} from '../../utils/erpMetrics.ts';
import {
  CardGlareOverlay,
  updateCardGlareCoordinates,
} from '../motion/MotionPrimitives.tsx';

interface KeyPerformanceMetricsProps {
  theme: ThemeMode;
  defaultScope?: ERPMetricScope;
  showScopeTabs?: boolean;
  heading?: string;
  subtitle?: string;
  className?: string;
}

const MetricCounterValue: React.FC<{
  metric: ERPKPIMetric;
  active: boolean;
}> = ({ metric, active }) => {
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState<string>(() =>
    prefersReducedMotion ? `${metric.prefix ?? ''}${metric.displayValue}` : `${metric.prefix ?? ''}${metric.displayValue}`
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(`${metric.prefix ?? ''}${metric.displayValue}`);
      return;
    }
    if (!active) return;

    let rafId = 0;
    const duration = 780;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(formatAnimatedMetricValue(metric, progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    setDisplay(formatAnimatedMetricValue(metric, 0));
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, metric, prefersReducedMotion]);

  return <span className="tabular-nums">{display}</span>;
};

export const KeyPerformanceMetrics: React.FC<KeyPerformanceMetricsProps> = ({
  theme,
  defaultScope = 'all',
  showScopeTabs = true,
  heading = 'Key Performance Metrics',
  subtitle,
  className = '',
}) => {
  const [selectedScope, setSelectedScope] = useState<ERPMetricScope>(defaultScope);
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  useEffect(() => {
    setSelectedScope(defaultScope);
  }, [defaultScope]);

  const activeScopeMeta = getScopeOption(selectedScope);
  const metrics = getMetricsForScope(selectedScope);

  return (
    <section
      ref={containerRef}
      aria-labelledby="erp-key-performance-metrics-heading"
      data-testid="erp-key-performance-metrics"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div
        className={`rounded-3xl border p-6 sm:p-10 ${
          isDark
            ? 'bg-[#111111] border-[#303030]'
            : 'bg-[#F5FAFE] border-[#101B35]/[0.08]'
        }`}
      >
        {/* Header Row + Optional Segmented Platform Filter */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b ${
            isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.08]'
          }`}
        >
          <div className="max-w-2xl space-y-2">
            <p
              className={`text-xs font-semibold tracking-[0.14em] uppercase ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Measured Business Impact
            </p>
            <h2
              id="erp-key-performance-metrics-heading"
              className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-balance ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
              }`}
            >
              {heading}
            </h2>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
              }`}
            >
              {subtitle ?? activeScopeMeta.summary}
            </p>
          </div>

          {showScopeTabs && (
            <div
              role="group"
              aria-label="Filter KPI benchmarks by ERP platform"
              data-testid="kpi-scope-selector"
              className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border self-start lg:self-auto ${
                isDark
                  ? 'bg-[#171717] border-[#303030]'
                  : 'bg-white border-[#101B35]/10'
              }`}
            >
              {ERP_SCOPE_OPTIONS.map((option) => {
                const isSelected = selectedScope === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedScope(option.id)}
                    className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                      isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
                    } ${
                      isSelected
                        ? isDark
                          ? 'bg-white text-[#090909]'
                          : 'bg-[#101B35] text-white'
                        : isDark
                        ? 'text-[#A3A3A3] hover:text-white hover:bg-[#252525]'
                        : 'text-slate-600 hover:text-[#101B35] hover:bg-slate-50'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4-Column KPI Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedScope}
            initial={prefersReducedMotion ? false : { opacity: 0.85, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0.85, y: -4 }}
            transition={{ duration: 0.2, ease: EASE_PREMIUM }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
          >
            {metrics.map((metric, idx) => (
              <motion.article
                key={metric.id}
                data-testid={`erp-kpi-card-${metric.id}`}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.18, ease: EASE_PREMIUM }}
                onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                className={`group relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/40'
                    : 'bg-white border-[#101B35]/[0.08] hover:border-[#38BDF8]/60 shadow-[0_8px_24px_rgba(16,27,53,0.04)]'
                }`}
              >
                <CardGlareOverlay theme={theme} subtle />

                <div className="relative z-10 space-y-3">
                  {/* Quiet Unboxed Editorial Context */}
                  <p
                    className={`text-[11px] font-medium ${
                      isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                    }`}
                  >
                    {metric.moduleContext}
                  </p>

                  {/* Primary Metric Figure */}
                  <div
                    className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-none ${
                      isDark ? 'text-white' : 'text-[#101B35]'
                    }`}
                  >
                    <MetricCounterValue
                      metric={metric}
                      active={prefersReducedMotion ? true : isInView}
                    />
                  </div>

                  {/* Metric Label */}
                  <h3
                    className={`font-display text-sm sm:text-base font-bold leading-snug ${
                      isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                    }`}
                  >
                    {metric.label}
                  </h3>

                  {/* Quantitative Impact Explanation */}
                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                    }`}
                  >
                    {metric.impactSummary}
                  </p>
                </div>

                {/* Benchmark Progress Line + Explicit Baseline & Timeframe */}
                <div
                  className={`relative z-10 mt-6 pt-4 border-t space-y-2.5 ${
                    isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.08]'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`h-1 w-full rounded-full overflow-hidden ${
                      isDark ? 'bg-[#252525]' : 'bg-slate-100'
                    }`}
                  >
                    <motion.div
                      initial={prefersReducedMotion ? { scaleX: metric.benchmarkPercent / 100 } : { scaleX: 0 }}
                      animate={{
                        scaleX: isInView || prefersReducedMotion ? metric.benchmarkPercent / 100 : 0,
                      }}
                      transition={{
                        duration: 0.65,
                        delay: prefersReducedMotion ? 0 : idx * 0.06,
                        ease: EASE_PREMIUM,
                      }}
                      style={{ transformOrigin: 'left' }}
                      className={`h-full rounded-full ${
                        isDark ? 'bg-white' : 'bg-[#0284C7]'
                      }`}
                    />
                  </div>

                  <div
                    className={`flex flex-col gap-0.5 text-[11px] ${
                      isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                    }`}
                  >
                    <span className={isDark ? 'text-[#D4D4D4] font-medium' : 'text-slate-700 font-medium'}>
                      {metric.timeframe}
                    </span>
                    <span>{metric.baseline}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
