/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Compass,
  Layers,
  Database,
  Globe,
  Zap,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';

interface ServicesShowcaseSectionProps {
  onNavigate: (page: PageId) => void;
  onSelectService?: (serviceName: string) => void;
  theme?: ThemeMode;
}

const FEATURED_SERVICES = [
  {
    id: 'erp-consultancy',
    title: 'ERP Consultancy',
    description:
      'ERP selection, implementation, customization, and business process optimization.',
    targetPage: 'erp-solutions' as PageId,
    icon: Compass,
    tag: 'Strategy & Architecture',
  },
  {
    id: 'odoo-erp',
    title: 'Odoo ERP Solutions',
    description:
      'Odoo implementation, configuration, customization, and training.',
    targetPage: 'odoo' as PageId,
    icon: Layers,
    tag: 'Modular Operations',
  },
  {
    id: 'erpnext',
    title: 'ERPNext Solutions',
    description:
      'Open-source ERP implementation, customization, and deployment.',
    targetPage: 'erpnext' as PageId,
    icon: Database,
    tag: 'Open-Source Control',
  },
  {
    id: 'website-dev',
    title: 'Website Development',
    description:
      'Modern, responsive, SEO-friendly business websites and web applications.',
    targetPage: 'it-solutions' as PageId,
    icon: Globe,
    tag: 'Web & Portals',
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    description:
      'Workflow automation, process optimization, and operational efficiency.',
    targetPage: 'services' as PageId,
    icon: Zap,
    tag: 'Workflow Engines',
  },
  {
    id: 'it-consultancy',
    title: 'IT Consultancy',
    description:
      'Technology planning, digital transformation, and technical consulting.',
    targetPage: 'it-solutions' as PageId,
    icon: Cpu,
    tag: 'Digital Advisory',
  },
];

export const ServicesShowcaseSection: React.FC<ServicesShowcaseSectionProps> = ({
  onNavigate,
  onSelectService,
  theme = 'light',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#0B1429]' : 'bg-[#F5FAFE]'
      }`}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7] dark:text-[#38BDF8]">
              Core Capabilities
            </p>
            <h2
              id="services-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
                isDark ? 'text-white' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
            >
              Enterprise Technology &amp; ERP Services Built for Clarity.
            </h2>
          </div>

          <p
            className={`text-sm sm:text-base max-w-md leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            From impartial ERP platform advisory to bespoke web applications and workflow automation, every solution is engineered around your operational goals.
          </p>
        </div>

        {/* 6 Interactive Minimal Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative rounded-2xl p-7 border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#101B35] border-sky-400/15 hover:border-[#38BDF8]/50 shadow-[0_16px_40px_rgba(0,0,0,0.3)]'
                    : 'bg-white border-[#101B35]/[0.07] hover:border-[#38BDF8]/60 shadow-[0_12px_32px_rgba(16,27,53,0.04)] hover:shadow-[0_22px_48px_rgba(16,27,53,0.09)]'
                }`}
              >
                {/* Animated subtle corner sky-blue glow on hover */}
                <div
                  className="absolute -right-12 -top-12 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                        isDark
                          ? 'bg-[#38BDF8]/10 border border-[#38BDF8]/25 text-[#38BDF8]'
                          : 'bg-[#F5FAFE] border border-[#38BDF8]/25 text-[#0284C7]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-xl font-bold mb-2.5 ${
                      isDark ? 'text-white' : 'text-[#172033]'
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-7 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between ${
                    isDark ? 'border-white/10' : 'border-[#101B35]/[0.06]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(service.targetPage)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-md ${
                      isDark
                        ? 'text-[#38BDF8] hover:text-sky-300'
                        : 'text-[#0284C7] hover:text-[#101B35]'
                    }`}
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {onSelectService && (
                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className={`text-[11px] font-medium transition-colors cursor-pointer ${
                        isDark
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-500 hover:text-[#101B35]'
                      }`}
                    >
                      Request Quote
                    </button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
