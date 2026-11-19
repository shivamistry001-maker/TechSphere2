/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
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
import { useSectionDataLoader } from '../../utils/sectionLoader.ts';
import { ServiceShowcaseGridSkeleton } from '../skeletons/SectionSkeletons.tsx';

interface ServicesShowcaseSectionProps {
  onNavigate: (page: PageId) => void;
  onSelectService?: (serviceName: string) => void;
  theme?: ThemeMode;
  isLoading?: boolean;
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
  isLoading: externalLoading = false,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const isDark = theme === 'dark';

  const { items: services, isLoading } = useSectionDataLoader(
    FEATURED_SERVICES,
    'home-services-showcase',
    {
      externalLoading,
      prefersReducedMotion: Boolean(prefersReducedMotion),
    }
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 sm:py-28 overflow-x-clip transition-colors duration-300 ${
        isDark ? 'bg-[#111111]' : 'bg-[#F5FAFE]'
      }`}
      aria-labelledby="services-heading"
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <ScrollCascadeBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Core Capabilities
            </p>
            <h2
              id="services-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
            >
              Enterprise Technology &amp; ERP Services Built for Clarity.
            </h2>
          </div>

          <p
            className={`text-sm sm:text-base max-w-md leading-relaxed ${
              isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
            }`}
          >
            From impartial ERP platform advisory to bespoke web applications and workflow automation, every solution is engineered around your operational goals.
          </p>
        </ScrollCascadeBlock>

        {/* 6 Interactive Service Cards with Lightweight Skeleton Fallback, Hover Shine & Parallax */}
        {isLoading ? (
          <ServiceShowcaseGridSkeleton theme={theme} count={FEATURED_SERVICES.length} />
        ) : (
        <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const parallaxRange = computeColumnParallax(idx, 3, 14);
            return (
              <ScrollParallaxLayer
                key={service.id}
                scrollYProgress={scrollYProgress}
                yRange={parallaxRange}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.article
                  variants={scrollCardItemVariants}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -6, scale: 1.012, transition: { duration: 0.22, ease: EASE_PREMIUM } }
                  }
                  onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  className={`group relative h-full rounded-2xl p-7 border overflow-hidden transition-colors duration-300 flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#171717] border-[#303030] hover:border-white/45 hover:bg-[#1D1D1D] shadow-[0_16px_40px_rgba(0,0,0,0.45)]'
                      : 'bg-white border-[#101B35]/[0.07] hover:border-[#38BDF8]/70 shadow-[0_12px_32px_rgba(16,27,53,0.04)] hover:shadow-[0_24px_52px_rgba(16,27,53,0.1)]'
                  }`}
                >
                  {/* Futuristic Hover Shine & Interactive Glare Gradient Overlay */}
                  <CardGlareOverlay theme={theme} />

                  {/* Animated subtle corner glow on hover */}
                  <div
                    className="absolute -right-12 -top-12 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                    style={{
                      background: isDark
                        ? 'radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                          isDark
                            ? 'bg-[#252525] border border-[#303030] text-white'
                            : 'bg-[#F5FAFE] border border-[#38BDF8]/25 text-[#0284C7]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-medium ${
                          isDark ? 'text-[#737373]' : 'text-slate-500'
                        }`}
                      >
                        {service.tag}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-xl font-bold mb-2.5 ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                      }`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed mb-7 ${
                        isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div
                    className={`relative z-10 pt-4 border-t flex items-center justify-between ${
                      isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.06]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate(service.targetPage)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 rounded-md ${
                        isDark
                          ? 'text-white hover:text-[#D4D4D4] focus-visible:ring-white'
                          : 'text-[#0284C7] hover:text-[#101B35] focus-visible:ring-[#38BDF8]'
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
                            ? 'text-[#A3A3A3] hover:text-white'
                            : 'text-slate-500 hover:text-[#101B35]'
                        }`}
                      >
                        Request Quote
                      </button>
                    )}
                  </div>
                </motion.article>
              </ScrollParallaxLayer>
            );
          })}
        </ScrollCascadeGrid>
        )}
      </ScrollSectionContainer>
    </section>
  );
};
