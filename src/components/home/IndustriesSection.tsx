/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
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
import { computeColumnParallax, scrollCardItemVariants } from '../../utils/motion.ts';
import {
  CardGlareOverlay,
  ScrollCascadeBlock,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className="ts-glass-canvas-tinted py-20 sm:py-28 overflow-x-clip transition-colors duration-300"
      aria-labelledby="industries-heading"
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollCascadeBlock className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Industries We Serve
            </p>
            <h2
              id="industries-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
            >
              Tailored Systems Across Core Operational Sectors.
            </h2>
          </div>

          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { x: 2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={() => onNavigate('industries')}
            className={`group inline-flex items-center gap-2 min-h-[44px] py-2.5 text-xs sm:text-sm font-semibold hover:underline cursor-pointer shrink-0 ${
              isDark ? 'text-white' : 'text-[#0284C7]'
            }`}
          >
            <span>Explore All Industries</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </ScrollCascadeBlock>

        <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES_SHOWCASE.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollParallaxLayer
                key={item.id}
                scrollYProgress={scrollYProgress}
                yRange={computeColumnParallax(idx, 3, 12)}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.div
                  variants={scrollCardItemVariants}
                  data-sound-hover="true"
                  data-glass-layer="industry-card"
                  whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                  onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  onClick={() => onNavigate('industries')}
                  className="ts-glass-card ts-glass-card-interactive group relative overflow-hidden h-full rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col justify-between"
                >
                  <CardGlareOverlay theme={theme} subtle />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`ts-glass-icon w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 ${
                          isDark ? 'text-white' : 'text-[#0284C7]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-medium ${
                          isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                        }`}
                      >
                        {item.systems}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-lg font-bold mb-2 ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`relative z-10 mt-5 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                      isDark
                        ? 'border-white/10 text-white'
                        : 'border-[#101B35]/[0.08] text-[#0284C7]'
                    }`}
                  >
                    <span>View Industry Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </ScrollParallaxLayer>
            );
          })}
        </ScrollCascadeGrid>
      </ScrollSectionContainer>
    </section>
  );
};
