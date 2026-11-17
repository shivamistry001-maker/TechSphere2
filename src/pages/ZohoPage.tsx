/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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
import { KeyPerformanceMetrics } from '../components/showcase/KeyPerformanceMetrics.tsx';

interface ZohoPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const ZohoPage: React.FC<ZohoPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
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
      onBookConsultation('Zoho Ecosystem Implementation');
    }
    onNavigate('request-consultation');
  };

  const zohoApps = [
    {
      name: 'Zoho One',
      desc: 'The all-in-one operating suite granting your business access to 45+ integrated cloud applications under a unified user directory.',
    },
    {
      name: 'Zoho Books',
      desc: 'Compliant double-entry cloud accounting with automated banking feeds, e-invoicing, expense receipts, and balance sheet reporting.',
    },
    {
      name: 'Zoho CRM',
      desc: 'Omnichannel lead acquisition, automated sales pipelines, contact management, and intelligent deal stage progression.',
    },
    {
      name: 'Zoho Inventory',
      desc: 'Multichannel inventory synchronization across web storefronts, barcode labeling, purchase orders, and carrier shipping rates.',
    },
    {
      name: 'Zoho Creator & Deluge',
      desc: 'Custom low-code database applications, workflow automation routines, and webhook integrations using Deluge scripting.',
    },
    {
      name: 'Zoho Analytics',
      desc: 'Consolidated executive business intelligence, automated KPI dashboards, and scheduled operational digests.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* Header */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Cloud-Native Agility
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Zoho Ecosystem Implementation, Books &amp; CRM Automation
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Accelerate your operational velocity with zero DevOps server overhead. We configure, automate, and integrate the full Zoho suite for growing businesses.
        </p>
        <div className="pt-6 flex justify-center">
          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={handleConsult}
            className={`group px-7 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                : 'text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 shadow-lg shadow-sky-600/30'
            }`}
          >
            <span>Consult With a Zoho Specialist</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </RevealSection>

      {/* Grid */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zohoApps.map((app, idx) => (
              <ScrollParallaxLayer
                key={app.name}
                scrollYProgress={scrollYProgress}
                yRange={computeColumnParallax(idx, 3, 12)}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.div
                  variants={scrollCardItemVariants}
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                className={`group relative overflow-hidden h-full rounded-2xl p-6 border transition-all ${
                  isDark
                    ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45'
                    : 'bg-white border-slate-200 shadow-md shadow-slate-200/40 hover:border-sky-300'
                }`}
              >
                <CardGlareOverlay theme={theme} subtle />
                <div className="relative z-10">
                  <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white' : 'text-[#0284C7]'}`}>
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                      {app.name}
                    </h3>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {app.desc}
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
        defaultScope="zoho"
        showScopeTabs={false}
        heading="Zoho Suite Key Performance Metrics"
      />
    </div>
  );
};
