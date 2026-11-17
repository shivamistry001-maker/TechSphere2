/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronRight, Globe, Layers } from 'lucide-react';
import { PageId, ThemeMode } from '../types.ts';
import { EASE_PREMIUM } from '../utils/motion.ts';
import {
  ScrollCascadeBlock,
  ScrollSectionContainer,
} from '../components/motion/MotionPrimitives.tsx';
import { ERPDemoShowcaseSection } from '../components/showcase/ERPDemoShowcaseSection.tsx';
import { KeyPerformanceMetrics } from '../components/showcase/KeyPerformanceMetrics.tsx';

interface ERPShowcasePageProps {
  onNavigate: (page: PageId) => void;
  onBookConsultation: (serviceName: string) => void;
  theme: ThemeMode;
}

export const ERPShowcasePage: React.FC<ERPShowcasePageProps> = ({
  onNavigate,
  onBookConsultation,
  theme,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <div
      data-testid="erp-showcase-page"
      className="space-y-12 sm:space-y-16 pt-6 sm:pt-12 pb-16 overflow-x-clip"
    >
      {/* Hero + Breadcrumb */}
      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: EASE_PREMIUM }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-1.5 text-xs font-medium mb-6"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`transition-colors cursor-pointer ${
              isDark ? 'text-[#A3A3A3] hover:text-white' : 'text-slate-500 hover:text-[#0284C7]'
            }`}
          >
            Home
          </button>
          <ChevronRight
            className={`w-3.5 h-3.5 ${isDark ? 'text-[#737373]' : 'text-slate-400'}`}
            aria-hidden="true"
          />
          <span className={isDark ? 'text-white font-semibold' : 'text-[#101B35] font-semibold'}>
            ERP Showcase
          </span>
        </nav>

        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] px-3 py-1 rounded-full border ${
              isDark
                ? 'bg-[#171717] border-[#303030] text-[#D4D4D4]'
                : 'bg-[#F5FAFE] border-sky-400/25 text-[#0284C7]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ERP Software Demonstrations</span>
          </span>
        </div>

        <h1
          className={`font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] ${
            isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
          }`}
        >
          Explore ERP Solutions
        </h1>

        <p
          className={`text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
          }`}
        >
          Discover how modern ERP platforms help businesses streamline operations, manage resources and improve business visibility.
        </p>
      </motion.section>

      {/* Independent ERPNext, Odoo ERP, and Zoho Showcases */}
      <ERPDemoShowcaseSection theme={theme} hideSectionHeading className="!py-6 sm:!py-8" />

      {/* Quantified ERP Impact & Key Performance Metrics */}
      <KeyPerformanceMetrics theme={theme} defaultScope="all" showScopeTabs />

      {/* Page-Specific CTA + Cross Navigation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock
            className={`rounded-3xl border p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
              isDark
                ? 'bg-[#171717] border-[#303030] shadow-[0_18px_45px_rgba(0,0,0,0.45)]'
                : 'bg-[#F5FAFE] border-[#101B35]/10 shadow-[0_14px_34px_rgba(16,27,53,0.05)]'
            }`}
          >
            <div className="space-y-2 max-w-xl">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                  isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                }`}
              >
                Platform-Agnostic Advisory
              </p>
              <h2
                className={`font-display text-2xl sm:text-3xl font-bold leading-snug ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
                }`}
              >
                Looking for the Right ERP for Your Business? Book a Free Consultation.
              </h2>
              <p className={`text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                Compare ERPNext, Odoo ERP, and Zoho Business Applications side by side with a dedicated implementation architect tailored to your workflows.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                onClick={() => onBookConsultation('ERP Consultancy')}
                className={`group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'bg-[#101B35] text-white hover:bg-[#0284C7]'
                }`}
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.button>

              <button
                type="button"
                onClick={() => onNavigate('erp-solutions')}
                className={`px-4 py-3 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-[#303030] text-[#F5F5F5] hover:bg-[#252525]'
                    : 'border-[#101B35]/15 text-[#101B35] bg-white hover:border-[#38BDF8]'
                }`}
              >
                Compare Platforms
              </button>
            </div>
          </ScrollCascadeBlock>

          {/* Subtle Cross-Navigation Link */}
          <ScrollCascadeBlock className="pt-4 text-center">
            <button
              type="button"
              onClick={() => onNavigate('demo-websites')}
              className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#D4D4D4] hover:text-white'
                  : 'text-[#0284C7] hover:text-[#101B35]'
              }`}
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span>Explore Our Website Demonstrations</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </ScrollCascadeBlock>
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
