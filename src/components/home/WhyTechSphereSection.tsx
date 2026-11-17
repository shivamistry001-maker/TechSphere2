/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Target,
  Sliders,
  Maximize2,
  Wallet,
  HeadphonesIcon,
  Workflow,
  ArrowRight,
} from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';

interface WhyTechSphereSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

const VALUE_PILLARS = [
  {
    title: 'Business-focused technology consulting',
    description:
      'Every architecture recommendation starts from your operational bottlenecks, margins, and team workflows—never unnecessary software complexity.',
    icon: Target,
  },
  {
    title: 'Customized implementation strategies',
    description:
      'We tailor ERPNext, Odoo, Zoho, or custom web systems around your real approval rules, pricing tiers, and reporting structure.',
    icon: Sliders,
  },
  {
    title: 'Scalable solutions',
    description:
      'Modular cloud architectures engineered to grow cleanly from a single warehouse or branch to multi-entity global operations.',
    icon: Maximize2,
  },
  {
    title: 'Cost-effective technology',
    description:
      'Smart open-source and right-sized cloud choices that eliminate inflated licensing fees and maximize long-term operational return.',
    icon: Wallet,
  },
  {
    title: 'Ongoing technical support',
    description:
      'Dedicated post-launch hypercare, team training, version upgrades, and continuous enhancements as your business evolves.',
    icon: HeadphonesIcon,
  },
  {
    title: 'Business process optimization',
    description:
      'Eliminate duplicate manual entry by connecting sales, purchasing, inventory, accounting, and web portals into one smooth pipeline.',
    icon: Workflow,
  },
];

// Honest conceptual architecture placeholders (no fabricated client stats)
const STEPPED_HIGHLIGHTS = [
  {
    metric: 'Phase-Driven',
    label: 'Milestone Delivery',
    detail: 'Structured sprints from discovery to UAT sign-off.',
    offset: 'lg:mt-0',
  },
  {
    metric: 'Platform-Agnostic',
    label: 'Unbiased Advisory',
    detail: 'ERPNext, Odoo, Zoho, or bespoke React & Node.js stacks.',
    offset: 'lg:mt-8',
  },
  {
    metric: 'API-First',
    label: 'Connected Systems',
    detail: 'Seamless webhooks for eCommerce, payments, and logistics.',
    offset: 'lg:mt-16',
  },
  {
    metric: 'Remote Worldwide',
    label: 'Global Collaboration',
    detail: 'Agile advisory and execution across international time zones.',
    offset: 'lg:mt-24',
  },
];

export const WhyTechSphereSection: React.FC<WhyTechSphereSectionProps> = ({
  onNavigate,
  theme = 'light',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#070D1C]' : 'bg-white'
      }`}
      aria-labelledby="why-techsphere-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7] dark:text-[#38BDF8]">
              Why TechSphere
            </p>
            <h2
              id="why-techsphere-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.08] text-balance ${
                isDark ? 'text-white' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.95rem, 3.6vw, 3rem)' }}
            >
              Real Solutions. Real Business Impact.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end">
            <p
              className={`text-sm sm:text-base leading-relaxed lg:text-right ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Practical engineering paired with deep ERP domain fluency—built for companies ready to outgrow spreadsheets.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:underline cursor-pointer"
            >
              <span>About Our Consultancy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Stepped Floating Architectural Cards (Inspired by 00:12 Staircase Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 items-start">
          {STEPPED_HIGHLIGHTS.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${card.offset} rounded-2xl p-6 border transition-all duration-300 ${
                isDark
                  ? 'bg-[#101B35] border-sky-400/20 hover:border-[#38BDF8]/50'
                  : 'bg-[#F5FAFE] border-[#101B35]/[0.07] hover:border-[#38BDF8]/50 shadow-[0_10px_28px_rgba(16,27,53,0.03)]'
              }`}
            >
              <div className="font-display text-2xl font-extrabold text-[#0284C7] dark:text-[#38BDF8] tracking-tight">
                {card.metric}
              </div>
              <div
                className={`mt-4 text-sm font-bold ${
                  isDark ? 'text-white' : 'text-[#172033]'
                }`}
              >
                {card.label}
              </div>
              <p
                className={`mt-1.5 text-xs leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {card.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 6 Core Consultancy Commitments Grid */}
        <div
          className={`rounded-3xl p-6 sm:p-10 border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            isDark
              ? 'bg-[#101B35]/60 border-sky-400/15'
              : 'bg-[#F5FAFE]/70 border-[#101B35]/[0.07]'
          }`}
        >
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-start gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                    isDark
                      ? 'bg-[#0B1429] border-sky-400/25 text-[#38BDF8]'
                      : 'bg-white border-[#101B35]/[0.08] text-[#0284C7] shadow-sm'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className={`font-display text-base font-bold leading-snug ${
                      isDark ? 'text-white' : 'text-[#172033]'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-xs sm:text-[13px] leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
