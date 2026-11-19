/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ERPMetricScope, PageId, ThemeMode } from '../../types.ts';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';
import { computeColumnParallax, scrollCardItemVariants } from '../../utils/motion.ts';
import { KeyPerformanceMetrics } from '../showcase/KeyPerformanceMetrics.tsx';

export interface PlatformFeatureItem {
  title: string;
  desc: string;
}

export interface PlatformStrategicCallout {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
}

export interface ERPPlatformDetailPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
  eyebrow: string;
  heading: string;
  subtitle: string;
  primaryCtaLabel: string;
  consultationServiceName: string;
  features: readonly PlatformFeatureItem[];
  metricsScope: ERPMetricScope;
  metricsHeading: string;
  strategicCallout?: PlatformStrategicCallout;
}

/**
 * Shared, data-driven template for dedicated ERP platform pages (ERPNext, Odoo, Zoho).
 * Preserves identical visual layout, parallax cadence, and KPI metrics while keeping
 * platform pages declarative and easy to extend.
 */
export const ERPPlatformDetailPage: React.FC<ERPPlatformDetailPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
  eyebrow,
  heading,
  subtitle,
  primaryCtaLabel,
  consultationServiceName,
  features,
  metricsScope,
  metricsHeading,
  strategicCallout,
}) => {
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const gridRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  });

  const handleConsult = () => {
    if (onBookConsultation) {
      onBookConsultation(consultationServiceName);
    } else {
      onNavigate('request-consultation');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          {eyebrow}
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          {heading}
        </h1>
        <p
          className={`text-base sm:text-lg mt-4 leading-relaxed ${
            isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
        <div className="pt-6 flex justify-center">
          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={handleConsult}
            className={`group min-h-[44px] px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                : 'text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 shadow-lg shadow-sky-600/30'
            }`}
          >
            <span>{primaryCtaLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </RevealSection>

      {/* Capabilities Grid */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <ScrollParallaxLayer
                key={item.title}
                scrollYProgress={scrollYProgress}
                yRange={computeColumnParallax(idx, 3, 12)}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.div
                  variants={scrollCardItemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                  onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  className={`group relative overflow-hidden h-full rounded-2xl p-6 border transition-colors ${
                    isDark
                      ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45'
                      : 'bg-white border-slate-200 shadow-md shadow-slate-200/40 hover:border-sky-300'
                  }`}
                >
                  <CardGlareOverlay theme={theme} subtle />
                  <div className="relative z-10">
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isDark ? 'text-white' : 'text-[#0284C7]'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <h3
                        className={`text-base font-bold ${
                          isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </ScrollParallaxLayer>
            ))}
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>

      {/* Key Performance Metrics */}
      <KeyPerformanceMetrics
        theme={theme}
        defaultScope={metricsScope}
        showScopeTabs={false}
        heading={metricsHeading}
      />

      {/* Optional Strategic Evaluation Callout */}
      {strategicCallout && (
        <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl p-8 sm:p-12 border ${
              isDark
                ? 'bg-[#111111] border-[#303030]'
                : 'bg-sky-50/70 border-sky-200 shadow-xl'
            }`}
          >
            <div className="max-w-3xl space-y-4">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                }`}
              >
                {strategicCallout.eyebrow}
              </span>
              <h2
                className={`text-2xl sm:text-3xl font-bold ${
                  isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
                }`}
              >
                {strategicCallout.heading}
              </h2>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-[#A3A3A3]' : 'text-slate-700'
                }`}
              >
                {strategicCallout.body}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  onClick={handleConsult}
                  className={`inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                      : 'text-white bg-sky-500 hover:bg-sky-400'
                  }`}
                >
                  {strategicCallout.ctaLabel}
                </motion.button>
              </div>
            </div>
          </div>
        </RevealSection>
      )}
    </div>
  );
};
