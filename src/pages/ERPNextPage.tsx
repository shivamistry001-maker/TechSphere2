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

interface ERPNextPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const ERPNextPage: React.FC<ERPNextPageProps> = ({
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
      onBookConsultation('ERPNext Consulting & Implementation');
    }
    onNavigate('request-consultation');
  };

  const capabilities = [
    {
      title: 'Deep Manufacturing & MRP',
      desc: 'Multi-level Bill of Materials (BOM), workstation capacities, job cards, scrap management, and automated stock replenishment.',
    },
    {
      title: 'Zero Recurring License Fees',
      desc: 'True 100% open-source software under GNU GPLv3. Add 50, 100, or 500 users without per-seat monthly license fees.',
    },
    {
      title: 'Frappe Framework Extensibility',
      desc: 'Build custom DocTypes, Python server scripts, custom REST APIs, and tailored approval workflows without hacking core code.',
    },
    {
      title: 'Complete Data Sovereignty',
      desc: 'Deploy on your own private cloud (AWS, DigitalOcean, Hetzner, or on-premise hardware) with 100% control over your database.',
    },
    {
      title: 'Integrated Double-Entry Accounting',
      desc: 'Automated general ledger, accounts payable/receivable, multi-currency valuation, GST/tax reconciliation, and financial reports.',
    },
    {
      title: 'Multi-Warehouse Inventory Control',
      desc: 'Batch tracking, serial number management, FIFO valuation, barcode scanning, and inter-warehouse material transfers.',
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
          Open-Source Enterprise Mastery
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          ERPNext Consulting, Implementation &amp; Customization
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Unleash enterprise manufacturing, warehouse management, and double-entry finance with 100% data ownership and zero per-seat licensing penalties.
        </p>
        <div className="pt-6 flex justify-center">
          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={handleConsult}
            className={`group px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                : 'text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 shadow-lg shadow-sky-600/30'
            }`}
          >
            <span>Consult With an ERPNext Specialist</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </RevealSection>

      {/* Capabilities */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <ScrollParallaxLayer
                key={cap.title}
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
                  <div className={`flex items-center gap-2 mb-2 ${isDark ? 'text-white' : 'text-[#0284C7]'}`}>
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <h3 className={`text-base font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                      {cap.title}
                    </h3>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {cap.desc}
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
        defaultScope="erpnext"
        showScopeTabs={false}
        heading="ERPNext Key Performance Metrics"
      />

      {/* Why Businesses Choose ERPNext */}
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
              Strategic Evaluation
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
              Why Manufacturers &amp; Mid-Market Enterprises Select ERPNext
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-700'}`}>
              Proprietary ERP giants charge punitive monthly subscriptions per user while keeping your data locked in opaque schemas. ERPNext provides an industrial-grade alternative: complete code ownership, a Python-powered Frappe architecture, and a modern web interface built for high-throughput teams.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={handleConsult}
                className={`px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'text-white bg-sky-500 hover:bg-sky-400'
                }`}
              >
                Schedule ERPNext Architecture Call
              </motion.button>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
};
