/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Calendar, Layers } from 'lucide-react';
import { PageId, ThemeMode } from '../types.ts';
import { HeroOrbitalVisual } from './HeroOrbitalVisual.tsx';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, theme = 'light' }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const orbitalParallaxY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [0, -16]);

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[calc(100vh-12px)] flex items-center pt-28 sm:pt-32 lg:pt-32 pb-16 sm:pb-20 overflow-x-clip border-b transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-[#070D1C] via-[#101B35] to-[#0B1429] text-white border-sky-400/15'
          : 'bg-gradient-to-br from-white via-[#F5FAFE] to-[#EDF7FD] text-[#172033] border-[#101B35]/[0.07]'
      }`}
      aria-label="TechSphere Hero"
    >
      {/* Subtle Architectural Grid & Soft Sky-Blue Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(16, 27, 53, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 27, 53, 0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 right-0 w-[680px] h-[680px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* LEFT COLUMN: Editorial Headline, Copy, CTAs & Floating ERP Dashboard Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7] dark:text-[#38BDF8] mb-4"
            >
              Empowering Businesses Through Tech
            </motion.p>

            {/* Oversized Editorial Headline */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display font-extrabold tracking-[-0.03em] leading-[1.05] text-balance ${
                isDark ? 'text-white' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(2.35rem, 4.1vw, 3.85rem)' }}
            >
              Technology That Moves Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0EA5E9]">
                Business Forward.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className={`mt-5 sm:mt-6 text-base sm:text-[17px] leading-relaxed max-w-lg ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              We help businesses simplify operations, implement intelligent ERP systems, and build powerful digital experiences through technology.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#101B35] hover:bg-[#192A52] dark:bg-gradient-to-r dark:from-[#38BDF8] dark:to-[#0284C7] text-white text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 shadow-[0_14px_30px_rgba(16,27,53,0.18)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8] dark:text-white transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('request-consultation')}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-white border-sky-400/25 hover:border-sky-400'
                    : 'bg-white hover:bg-[#F5FAFE] text-[#101B35] border-[#101B35]/15 hover:border-[#38BDF8] shadow-[0_6px_18px_rgba(16,27,53,0.04)]'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
                <span>Book a Free Consultation</span>
              </button>
            </motion.div>

            {/* Floating ERP Dashboard Preview Card (Inspired by Reference Lower-Left Card) */}
            <motion.div
              style={prefersReducedMotion ? undefined : { y: cardParallaxY }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 sm:mt-12 w-full max-w-md"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                className={`rounded-2xl p-5 sm:p-6 border transition-colors ${
                  isDark
                    ? 'bg-[#101B35]/90 border-sky-400/20 shadow-[0_24px_50px_rgba(0,0,0,0.45)]'
                    : 'bg-white border-[#101B35]/[0.07] shadow-[0_24px_50px_rgba(16,27,53,0.08)]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-7 h-7 rounded-lg bg-[#101B35] dark:bg-sky-500/20 flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                        </span>
                        <h2
                          className={`font-display text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em] ${
                            isDark ? 'text-white' : 'text-[#101B35]'
                          }`}
                        >
                          ERP &amp; Workflow Suite
                        </h2>
                      </div>
                      <span className="text-[11px] font-semibold text-[#0284C7] dark:text-[#38BDF8]">
                        Unified Core
                      </span>
                    </div>

                    <p
                      className={`text-xs sm:text-[13.5px] leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      Connect sales, procurement, inventory, and finance into one real-time operational workspace.
                    </p>

                    <div
                      className={`pt-2 border-t flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase ${
                        isDark ? 'border-white/10 text-[#38BDF8]' : 'border-[#101B35]/[0.06] text-[#0284C7]'
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
            style={prefersReducedMotion ? undefined : { y: orbitalParallaxY }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <HeroOrbitalVisual theme={theme} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
