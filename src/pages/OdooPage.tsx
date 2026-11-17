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

interface OdooPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const OdooPage: React.FC<OdooPageProps> = ({
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
      onBookConsultation('Odoo ERP Implementation');
    }
    onNavigate('request-consultation');
  };

  const odooFeatures = [
    {
      title: 'Modular App-by-App Adoption',
      desc: 'Activate only the applications your team needs today (e.g. Invoicing and CRM) and incrementally add Inventory, Manufacturing, and POS as operations scale.',
    },
    {
      title: 'Omnichannel Retail & Offline POS',
      desc: 'Fast, touch-optimized Point of Sale registers that continue working during internet dropouts and sync automatically with central warehouse stocks.',
    },
    {
      title: 'Community vs. Enterprise Guidance',
      desc: 'Impartial advisory on whether the free Community edition meets your scope or if Enterprise licensing is justified for mobile apps and advanced features.',
    },
    {
      title: 'Custom Module Development',
      desc: 'Our Python engineers build tailored Odoo addons, custom fields, specialized views, and automated server actions that respect your distinct business rules.',
    },
    {
      title: 'E-Commerce & Payment Gateways',
      desc: 'Seamless bidirectional synchronization with Shopify, WooCommerce, Amazon, and payment processors like Stripe and Razorpay.',
    },
    {
      title: 'Intuitive Modern UX',
      desc: 'A user-friendly, responsive interface that drastically minimizes staff onboarding resistance and administrative training time.',
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
          Modular Business Ecosystem
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Odoo Implementation, Custom Modules &amp; POS Integration
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Unify sales channels, retail stores, and warehouse fulfillment into a slick, intuitive modular ERP suite engineered for modern retail and services.
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
            <span>Consult With an Odoo Specialist</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </RevealSection>

      {/* Grid */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {odooFeatures.map((feat, idx) => (
              <ScrollParallaxLayer
                key={feat.title}
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
                      {feat.title}
                    </h3>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            </ScrollParallaxLayer>
          ))}
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
