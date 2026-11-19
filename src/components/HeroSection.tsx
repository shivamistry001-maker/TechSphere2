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
      className={`relative min-h-[calc(100vh-12px)] flex items-center pt-28 sm:pt-32 lg:pt-32 pb-16 sm:pb-20 overflow-x-clip border-b ${
        isDark
          ? 'bg-[#090909] text-[#F5F5F5] border-[#303030]'
          : 'bg-white text-[#172033] border-[#101B35]/[0.07]'
      }`}
      aria-label="TechSphere Hero"
    >
      {/* Crossfading Light / Dark Atmospheric Gradient Layers (prevents 0ms background-image snap) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f5fafe 52%, #edf7fd 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'linear-gradient(135deg, #090909 0%, #111111 52%, #090909 100%)',
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
        } ${isDark ? 'opacity-0' : 'opacity-60'}`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(16, 27, 53, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 27, 53, 0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Ambient Radial Glow (GPU opacity crossfade) */}
      <div
        className={`absolute -top-24 right-0 w-[680px] h-[680px] rounded-full pointer-events-none transition-opacity ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.015) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute -top-24 right-0 w-[680px] h-[680px] rounded-full pointer-events-none transition-opacity ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Scanning Line & Low-Density Particles */}
      <ScanningLine theme={theme} />
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
                className={`group inline-flex items-center justify-center gap-2.5 min-h-[44px] px-6 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'bg-white hover:bg-[#D4D4D4] text-[#090909] shadow-[0_14px_30px_rgba(0,0,0,0.45)] focus-visible:ring-white'
                    : 'bg-[#101B35] hover:bg-[#192A52] text-white shadow-[0_14px_30px_rgba(16,27,53,0.18)] focus-visible:ring-[#38BDF8]'
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
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 border transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'bg-[#171717] hover:bg-[#252525] text-[#F5F5F5] border-[#303030] hover:border-[#D4D4D4]/50 focus-visible:ring-white'
                    : 'bg-white hover:bg-[#F5FAFE] text-[#101B35] border-[#101B35]/15 hover:border-[#38BDF8] shadow-[0_6px_18px_rgba(16,27,53,0.04)] focus-visible:ring-[#38BDF8]'
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
                animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                className={`relative rounded-2xl p-5 sm:p-6 border transition-colors overflow-hidden ${
                  isDark
                    ? 'bg-[#171717]/95 border-[#303030] hover:border-[#D4D4D4]/45 shadow-[0_24px_50px_rgba(0,0,0,0.6)]'
                    : 'bg-white border-[#101B35]/[0.07] hover:border-[#38BDF8]/50 shadow-[0_24px_50px_rgba(16,27,53,0.08)]'
                }`}
              >
                {/* Subtle animated top border highlight */}
                <motion.span
                  aria-hidden="true"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { x: ['-100%', '200%'] }
                  }
                  transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                  className={`absolute top-0 left-0 w-1/2 h-px pointer-events-none ${
                    isDark
                      ? 'bg-gradient-to-r from-transparent via-white/50 to-transparent'
                      : 'bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent'
                  }`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isDark
                              ? 'bg-[#252525] border border-[#303030]'
                              : 'bg-[#101B35]'
                          }`}
                          aria-hidden="true"
                        >
                          <Layers
                            className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-[#38BDF8]'}`}
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
                      className={`pt-2 border-t flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase ${
                        isDark
                          ? 'border-[#303030] text-[#D4D4D4]'
                          : 'border-[#101B35]/[0.06] text-[#0284C7]'
                      }`}
                    >
                      <span>ERPNext</span>
                      <span className="opacity-30" aria-hidden="true">·</span>
                      <span>Odoo</span>
                      <span className="opacity-30" aria-hidden="true">·</span>
                      <span>Automation</span>
                      <span className="opacity-30" aria-hidden="true">·</span>
                      <span>Web Apps</span>
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
