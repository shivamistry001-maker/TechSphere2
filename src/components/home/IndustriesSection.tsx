/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Factory,
  PackageSearch,
  Store,
  Truck,
  Briefcase,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';

interface IndustriesSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

const INDUSTRIES_SHOWCASE = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description:
      'Multi-level Bills of Materials, shop-floor job cards, raw material planning, and accurate production costing.',
    systems: 'ERPNext · Odoo MRP',
    icon: Factory,
  },
  {
    id: 'trading-distribution',
    title: 'Trading and Distribution',
    description:
      'High-volume order processing, tiered wholesale pricing, FIFO/batch tracking, and credit limit enforcement.',
    systems: 'ERPNext · B2B Portals',
    icon: PackageSearch,
  },
  {
    id: 'retail',
    title: 'Retail',
    description:
      'Fast Point-of-Sale terminals synced in real time with multi-branch inventory, barcodes, and customer loyalty.',
    systems: 'Odoo POS · Zoho Inventory',
    icon: Store,
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description:
      'Fleet dispatch coordination, shipment checkpoints, digital proof of delivery, and automated freight billing.',
    systems: 'Custom Web · API Sync',
    icon: Truck,
  },
  {
    id: 'professional-services',
    title: 'Professional Services',
    description:
      'Project milestone tracking, billable timesheets, resource allocation, and automated recurring client invoicing.',
    systems: 'Zoho One · Odoo Projects',
    icon: Briefcase,
  },
  {
    id: 'sme',
    title: 'Small and Medium Enterprises',
    description:
      'Right-sized digital foundations that replace scattered spreadsheets with unified sales, stock, and finance.',
    systems: 'ERPNext · Zoho · Custom',
    icon: Building2,
  },
];

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onNavigate,
  theme = 'light',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#0B1429]' : 'bg-[#F5FAFE]'
      }`}
      aria-labelledby="industries-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7] dark:text-[#38BDF8]">
              Industries We Serve
            </p>
            <h2
              id="industries-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
                isDark ? 'text-white' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
            >
              Tailored Systems Across Core Operational Sectors.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('industries')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:underline cursor-pointer shrink-0"
          >
            <span>Explore All Industries</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_SHOWCASE.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => onNavigate('industries')}
                className={`group rounded-2xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#101B35] border-sky-400/15 hover:border-[#38BDF8]/50 hover:-translate-y-1'
                    : 'bg-white border-[#101B35]/[0.07] hover:border-[#38BDF8]/60 shadow-[0_10px_28px_rgba(16,27,53,0.04)] hover:shadow-[0_20px_44px_rgba(16,27,53,0.08)] hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
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
                      {item.systems}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-lg font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-[#172033]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#101B35]/[0.06] dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8]">
                  <span>View Industry Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
