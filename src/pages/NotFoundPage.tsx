/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Compass, Layers, Briefcase, Mail } from 'lucide-react';
import { PageId, ThemeMode } from '../types.ts';
import { RevealSection } from '../components/motion/MotionPrimitives.tsx';

interface NotFoundPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  requestedPath?: string;
}

const QUICK_DESTINATIONS: Array<{
  page: PageId;
  label: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    page: 'services',
    label: 'Services Catalog',
    description: 'ERP implementation, customization, web apps, and automation.',
    icon: Compass,
  },
  {
    page: 'erp-solutions',
    label: 'ERP Solutions',
    description: 'Compare ERPNext, Odoo, Zoho, and bespoke architectures.',
    icon: Layers,
  },
  {
    page: 'portfolio',
    label: 'Portfolio & Prototypes',
    description: 'Explore enterprise systems, portals, and web architectures.',
    icon: Briefcase,
  },
  {
    page: 'contact',
    label: 'Contact TechSphere',
    description: 'Connect directly with a senior ERP & IT specialist.',
    icon: Mail,
  },
];

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigate,
  theme,
  requestedPath,
}) => {
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pt-8 sm:pt-14 pb-20 overflow-x-clip">
      <RevealSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl border p-8 sm:p-12 text-center ${
            isDark
              ? 'bg-[#171717] border-[#303030] shadow-2xl shadow-black/50'
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
          }`}
        >
          <span
            className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest border ${
              isDark
                ? 'bg-[#111111] border-[#303030] text-[#D4D4D4]'
                : 'bg-sky-500/10 border-sky-500/20 text-[#0284C7]'
            }`}
          >
            Error 404
          </span>

          <h1
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-5 font-display ${
              isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
            }`}
          >
            Page Not Found
          </h1>

          <p
            className={`text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed ${
              isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
            }`}
          >
            The page you requested doesn&apos;t exist or may have moved.
            {requestedPath ? (
              <>
                {' '}
                Requested path:{' '}
                <code
                  className={`px-2 py-0.5 rounded font-mono text-xs break-all ${
                    isDark ? 'bg-[#111111] text-[#F5F5F5] border border-[#303030]' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {requestedPath}
                </code>
              </>
            ) : null}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button
              type="button"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              onClick={() => onNavigate('home')}
              className={`inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                  : 'bg-[#101B35] text-white hover:bg-[#192A52]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Homepage</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              onClick={() => onNavigate('request-consultation')}
              className={`inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#111111] border-[#303030] text-[#F5F5F5] hover:bg-[#252525]'
                  : 'bg-[#F5FAFE] border-[#101B35]/15 text-[#101B35] hover:border-[#38BDF8]'
              }`}
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div
            className={`mt-10 pt-8 border-t text-left grid grid-cols-1 sm:grid-cols-2 gap-4 ${
              isDark ? 'border-[#303030]' : 'border-slate-200'
            }`}
          >
            {QUICK_DESTINATIONS.map((dest) => {
              const Icon = dest.icon;
              return (
                <button
                  key={dest.page}
                  type="button"
                  onClick={() => onNavigate(dest.page)}
                  className={`group flex items-start gap-3.5 min-h-[44px] p-4 rounded-2xl border text-left transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-[#111111] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/40'
                      : 'bg-[#F5FAFE]/70 border-slate-200 hover:bg-white hover:border-[#38BDF8]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isDark
                        ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                        : 'bg-sky-500/10 text-[#0284C7]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-sm font-bold flex items-center gap-1.5 ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                      }`}
                    >
                      <span>{dest.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                      {dest.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </RevealSection>
    </div>
  );
};
