/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
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
import { EASE_PREMIUM, computeColumnParallax, scrollCardItemVariants } from '../../utils/motion.ts';
import {
  CardGlareOverlay,
  ScrollCascadeBlock,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';

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
      className="ts-glass-canvas-primary py-20 sm:py-28 overflow-x-clip transition-colors duration-300"
      aria-labelledby="why-techsphere-heading"
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <ScrollCascadeBlock className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7 space-y-3">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Why TechSphere
            </p>
            <h2
              id="why-techsphere-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.08] text-balance ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.95rem, 3.6vw, 3rem)' }}
            >
              Real Solutions. Real Business Impact.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end">
            <p
              className={`text-sm sm:text-base leading-relaxed lg:text-right ${
                isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
              }`}
            >
              Practical engineering paired with deep ERP domain fluency—built for companies ready to outgrow spreadsheets.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`group mt-2 inline-flex items-center gap-1.5 min-h-[44px] py-2.5 text-xs font-semibold hover:underline cursor-pointer ${
                isDark ? 'text-white' : 'text-[#0284C7]'
              }`}
            >
              <span>About Our Consultancy</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </ScrollCascadeBlock>

        {/* Stepped Floating Architectural Cards */}
        <ScrollCascadeGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 items-start">
          {STEPPED_HIGHLIGHTS.map((card, idx) => (
            <ScrollParallaxLayer
              key={card.label}
              scrollYProgress={scrollYProgress}
              yRange={computeColumnParallax(idx, 4, 14)}
              enabled={isDesktop}
              className={card.offset}
            >
              <motion.div
                variants={scrollCardItemVariants}
                data-glass-layer="why-card"
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -5, scale: 1.01, transition: { duration: 0.2, ease: EASE_PREMIUM } }
                }
                onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                className="ts-glass-card ts-glass-card-interactive group relative overflow-hidden rounded-2xl p-6"
              >
                <CardGlareOverlay theme={theme} subtle />
                <div className="relative z-10">
                  <div
                    className={`font-display text-2xl font-extrabold tracking-tight ${
                      isDark ? 'text-white' : 'text-[#0284C7]'
                    }`}
                  >
                    {card.metric}
                  </div>
                  <div
                    className={`mt-4 text-sm font-bold ${
                      isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                    }`}
                  >
                    {card.label}
                  </div>
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${
                      isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                    }`}
                  >
                    {card.detail}
                  </p>
                </div>
              </motion.div>
            </ScrollParallaxLayer>
          ))}
        </ScrollCascadeGrid>

        {/* 6 Core Consultancy Commitments Grid */}
        <ScrollCascadeGrid className="ts-glass-panel rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={scrollCardItemVariants}
                className="group flex items-start gap-4"
              >
                <div
                  className={`ts-glass-icon w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isDark ? 'text-white' : 'text-[#0284C7]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className={`font-display text-base font-bold leading-snug ${
                      isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-xs sm:text-[13px] leading-relaxed ${
                      isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                    }`}
                  >
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </ScrollCascadeGrid>
      </ScrollSectionContainer>
    </section>
  );
};
