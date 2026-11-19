/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { COMPANY_INFO } from '../data/companyData.ts';
import {
  Target,
  Compass,
  ShieldCheck,
  Globe2,
  Layers,
  ArrowRight,
  Code2,
  Lock,
} from 'lucide-react';
import {
  CardGlareOverlay,
  RevealSection,
  ScrollCascadeBlock,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../components/motion/MotionPrimitives.tsx';
import { computeColumnParallax, scrollCardItemVariants } from '../utils/motion.ts';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const valuesRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesRef,
    offset: ['start end', 'end start'],
  });

  const values = [
    {
      title: 'Engineering Rigor Over Fluff',
      description:
        'We do not sell pre-packaged buzzwords or generic templates. We inspect your data schemas, interview line managers, and engineer robust digital systems that stand up to high transaction volumes.',
      icon: Code2,
    },
    {
      title: 'Zero Vendor Lock-In',
      description:
        'We champion open architectures, clean standard APIs, and complete client data sovereignty. You own your code, your database, and your infrastructure.',
      icon: Lock,
    },
    {
      title: 'Pragmatic, Staged Rollouts',
      description:
        'Big-bang enterprise IT migrations frequently cause operational shock. We deploy modular, phased rollouts that prove value at every milestone without disrupting daily fulfillment.',
      icon: Layers,
    },
    {
      title: 'Long-Term Partnership & Hypercare',
      description:
        'Go-live is not the finish line; it is the beginning of optimization. We provide active hypercare, staff training, and proactive maintenance as your operations evolve.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pt-8 sm:pt-14 pb-16 overflow-x-clip">
      {/* 1. Header Section */}
      <RevealSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          About TechSphere
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Engineering Scalable Business Systems for the Modern Enterprise.
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          {COMPANY_INFO.name} was established with a clear mandate: bridge the divide between complex operational challenges and modern, open-source and cloud ERP technologies.
        </p>
      </RevealSection>

      {/* 2. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={scrollCardItemVariants}
              whileHover={prefersReducedMotion ? undefined : { y: -5 }}
              onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
            className={`group relative overflow-hidden rounded-3xl p-8 border transition-colors ${
              isDark
                ? 'bg-[#171717] border-[#303030] hover:border-white/45'
                : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-sky-300'
            }`}
          >
            <CardGlareOverlay theme={theme} subtle />
            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 ${
                  isDark
                    ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                    : 'bg-sky-500/10 text-sky-500'
                }`}
              >
                <Target className="w-6 h-6" />
              </div>
              <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                Our Mission
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                {COMPANY_INFO.about.mission}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={scrollCardItemVariants}
            whileHover={prefersReducedMotion ? undefined : { y: -5 }}
            onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
            className={`group relative overflow-hidden rounded-3xl p-8 border transition-colors ${
              isDark
                ? 'bg-[#171717] border-[#303030] hover:border-white/45'
                : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-sky-300'
            }`}
          >
            <CardGlareOverlay theme={theme} subtle />
            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 ${
                  isDark
                    ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                    : 'bg-blue-500/10 text-blue-500'
                }`}
              >
                <Compass className="w-6 h-6" />
              </div>
              <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                Our Vision
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                {COMPANY_INFO.about.vision}
              </p>
            </div>
          </motion.div>
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>

      {/* 3. Core Values */}
      <section ref={valuesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeBlock className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              Guiding Philosophy
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
              Built on Transparency &amp; Craftsmanship
            </h2>
          </ScrollCascadeBlock>

          <ScrollCascadeGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <ScrollParallaxLayer
                  key={v.title}
                  scrollYProgress={valuesProgress}
                  yRange={computeColumnParallax(idx, 4, 10)}
                  enabled={isDesktop}
                  className="h-full"
                >
                  <motion.div
                    variants={scrollCardItemVariants}
                    whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.01 }}
                    onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  className={`group relative overflow-hidden h-full rounded-2xl p-6 border transition-colors ${
                    isDark
                      ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45'
                      : 'bg-white border-slate-200 shadow-md shadow-slate-200/30 hover:border-sky-300'
                  }`}
                >
                  <CardGlareOverlay theme={theme} subtle />
                  <div className="relative z-10">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
                        isDark
                          ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                          : 'bg-sky-500/10 text-sky-500'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                      {v.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollParallaxLayer>
            );
          })}
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>

      {/* 4. Remote Worldwide Delivery Model */}
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl p-8 sm:p-12 border ${
            isDark
              ? 'bg-[#111111] border-[#303030] shadow-2xl shadow-black/50'
              : 'bg-gradient-to-r from-sky-50 via-white to-sky-50 border-slate-200 shadow-xl'
          }`}
        >
          <div className="max-w-3xl space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                isDark
                  ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                  : 'bg-sky-500/15 text-sky-600'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span>Global Operational Reach</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-bold font-display ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
              Remote Worldwide Delivery, Local Precision
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
              We operate seamlessly across international timezones using modern cloud development sandboxes, automated version control, and clear asynchronous documentation. Whether you are scaling manufacturing in Gujarat, distributing wholesale across the United States, or running an agency in Europe, TechSphere delivers consistent velocity.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => onNavigate('request-consultation')}
                className={`group min-h-[44px] px-6 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400'
                }`}
              >
                <span>Book a Strategic Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
};
