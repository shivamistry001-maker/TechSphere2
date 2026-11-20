/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Calendar, Layers } from 'lucide-react';
import { PageId, ThemeMode } from '../types.ts';
import { HeroOrbitalVisual } from './HeroOrbitalVisual.tsx';
import {
  MagneticButton,
  ScanningLine,
  ScrollSectionContainer,
  SubtleTechParticles,
  useIsDesktop,
} from './motion/MotionPrimitives.tsx';
import { scrollBlockItemVariants } from '../utils/motion.ts';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, theme = 'light' }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const orbitalParallaxY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const enableParallax = !prefersReducedMotion && isDesktop;

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[calc(100vh-12px)] flex items-center pt-24 sm:pt-32 lg:pt-32 pb-16 sm:pb-20 overflow-x-clip border-b ${
        isDark
          ? 'bg-[#090909] text-[#F5F5F5] border-[#303030]'
          : 'bg-white text-[#172033] border-[#101B35]/[0.07]'
      }`}
      aria-label="TechSphere Hero"
    >
      {/* Crossfading Light / Dark Atmospheric Gradient Layers (high-contrast backdrop so frosted glass blur & refraction are unmistakably visible) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(56% 52% at 14% 16%, rgba(56, 189, 248, 0.28) 0%, rgba(186, 230, 253, 0.12) 48%, transparent 78%), radial-gradient(52% 48% at 84% 24%, rgba(14, 165, 233, 0.24) 0%, rgba(125, 211, 252, 0.10) 48%, transparent 76%), radial-gradient(48% 46% at 32% 86%, rgba(14, 165, 233, 0.22) 0%, rgba(186, 230, 253, 0.12) 52%, transparent 80%), linear-gradient(148deg, #e7f3fc 0%, #f5fafe 48%, #dceefa 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(54% 48% at 18% 18%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 48%, transparent 76%), radial-gradient(48% 44% at 84% 22%, rgba(255, 255, 255, 0.05) 0%, transparent 74%), linear-gradient(150deg, #080808 0%, #101010 52%, #080808 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Animated Architectural Grid */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          prefersReducedMotion ? '' : 'animate-grid-drift'
        } ${isDark ? 'opacity-60' : 'opacity-0'}`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          prefersReducedMotion ? '' : 'animate-grid-drift'
        } ${isDark ? 'opacity-0' : 'opacity-65'}`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(2, 132, 199, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(2, 132, 199, 0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Ambient Radial Light Pools (desktop & mobile) */}
      <div
        className={`absolute -top-24 right-0 w-[680px] h-[680px] rounded-full pointer-events-none transition-opacity ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.075) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute -top-24 right-0 w-[680px] h-[680px] rounded-full pointer-events-none transition-opacity ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.24) 0%, rgba(125, 211, 252, 0.08) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Scanning Line & Low-Density Particles (desktop-only for smooth mobile scrolling) */}
      <ScanningLine theme={theme} className="hidden md:block" />
      <SubtleTechParticles theme={theme} />

      <ScrollSectionContainer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* LEFT COLUMN: Editorial Headline, Copy, CTAs & Floating ERP Dashboard Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.p
              variants={scrollBlockItemVariants}
              className={`text-xs font-semibold uppercase tracking-[0.18em] mb-4 ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Empowering Businesses Through Tech
            </motion.p>

            {/* Oversized Editorial Headline */}
            <motion.h1
              variants={scrollBlockItemVariants}
              className={`font-display font-extrabold tracking-[-0.03em] leading-[1.05] text-balance ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(2.35rem, 4.1vw, 3.85rem)' }}
            >
              Technology That Moves Your{' '}
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${
                  isDark
                    ? 'from-white via-[#D4D4D4] to-[#A3A3A3]'
                    : 'from-[#0284C7] via-[#38BDF8] to-[#0EA5E9]'
                }`}
              >
                Business Forward.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={scrollBlockItemVariants}
              className={`mt-5 sm:mt-6 text-base sm:text-[17px] leading-relaxed max-w-lg ${
                isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
              }`}
            >
              We help businesses simplify operations, implement intelligent ERP systems, and build powerful digital experiences through technology.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              variants={scrollBlockItemVariants}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <MagneticButton
                type="button"
                onClick={() => onNavigate('services')}
                className={`ts-glass-btn-primary group inline-flex items-center justify-center gap-2.5 min-h-[44px] px-6 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'text-[#090909] focus-visible:ring-white'
                    : 'text-white focus-visible:ring-[#38BDF8]'
                }`}
              >
                <span>Explore Our Services</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 ${
                    isDark ? 'text-[#090909]' : 'text-[#38BDF8]'
                  }`}
                />
              </MagneticButton>

              <motion.button
                type="button"
                onClick={() => onNavigate('request-consultation')}
                data-glass-layer="hero-cta"
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className={`ts-glass-btn-secondary inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'text-[#F5F5F5] focus-visible:ring-white'
                    : 'text-[#101B35] focus-visible:ring-[#38BDF8]'
                }`}
              >
                <Calendar className={`w-4 h-4 ${isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'}`} />
                <span>Book a Free Consultation</span>
              </motion.button>
            </motion.div>

            {/* Floating ERP Dashboard Preview Card */}
            <motion.div
              variants={scrollBlockItemVariants}
              style={enableParallax ? { y: cardParallaxY } : undefined}
              className="mt-10 sm:mt-12 w-full max-w-md"
            >
              <motion.div
                data-glass-layer="hero-preview-card"
                animate={enableParallax ? { y: [0, -6, 0] } : undefined}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                whileHover={enableParallax ? { scale: 1.01 } : undefined}
                className="ts-glass-card ts-glass-card-interactive relative rounded-2xl p-5 sm:p-6 overflow-hidden"
              >
                {/* Subtle animated top border highlight */}
                <motion.span
                  aria-hidden="true"
                  animate={
                    enableParallax
                      ? { x: ['-100%', '200%'] }
                      : undefined
                  }
                  transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                  className={`absolute top-0 left-0 w-1/2 h-[1.5px] pointer-events-none ${
                    isDark
                      ? 'bg-gradient-to-r from-transparent via-white/60 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-white to-[#38BDF8]/70'
                  }`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="ts-glass-icon w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Layers
                            className={`w-4 h-4 ${isDark ? 'text-white' : 'text-[#0284C7]'}`}
                          />
                        </span>
                        <h2
                          className={`font-display text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] ${
                            isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
                          }`}
                        >
                          ERP &amp; Workflow Suite
                        </h2>
                      </div>
                      <span
                        className={`text-[11px] font-semibold ${
                          isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                        }`}
                      >
                        Unified Core
                      </span>
                    </div>

                    <p
                      className={`text-xs sm:text-[13.5px] leading-relaxed ${
                        isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                      }`}
                    >
                      Connect sales, procurement, inventory, and finance into one real-time operational workspace.
                    </p>

                    <div
                      className={`pt-2.5 border-t flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold tracking-[0.09em] uppercase ${
                        isDark
                          ? 'border-white/10 text-[#D4D4D4]'
                          : 'border-[#101B35]/[0.07] text-[#0284C7]'
                      }`}
                    >
                      <span className="whitespace-nowrap">ERPNext</span>
                      <span className="opacity-30" aria-hidden="true">·</span>
                      <span className="whitespace-nowrap">Odoo</span>
                      <span className="opacity-30" aria-hidden="true">·</span>
                      <span className="whitespace-nowrap">Automation</span>
                      <span className="opacity-30" aria-hidden="true">·</span>
                      <span className="whitespace-nowrap">Web Apps</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Sweeping Orbital Architecture & Analytics */}
          <motion.div
            variants={scrollBlockItemVariants}
            style={enableParallax ? { y: orbitalParallaxY } : undefined}
            className="lg:col-span-7 xl:col-span-7"
          >
            <HeroOrbitalVisual theme={theme} />
          </motion.div>
        </div>
      </ScrollSectionContainer>
    </section>
  );
};
