/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { PageId, ThemeMode } from '../types.ts';
import { ArrowRight, Code, Cloud, Network, ShieldCheck, Database, Cpu } from 'lucide-react';
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

interface ITSolutionsPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const ITSolutionsPage: React.FC<ITSolutionsPageProps> = ({
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
      onBookConsultation('Custom IT & Cloud Architecture');
    }
    onNavigate('request-consultation');
  };

  const capabilities = [
    {
      title: 'Custom Business Web Applications',
      desc: 'High-throughput B2B dealer portals, customer self-service extranets, and field technician mobile apps engineered with React, TypeScript, Node.js, and PostgreSQL.',
      icon: Code,
    },
    {
      title: 'Cloud Infrastructure & Linux DevOps',
      desc: 'Production-ready deployment on AWS, DigitalOcean, Hetzner, or private data centers using Docker containers, Nginx reverse proxies, SSL automation, and automated backups.',
      icon: Cloud,
    },
    {
      title: 'API Engineering & Webhook Pipelines',
      desc: 'Robust RESTful middleware connecting ERP databases with payment processors (Stripe, Razorpay), logistics carriers, CRM systems, and marketplace storefronts.',
      icon: Network,
    },
    {
      title: 'Database Architecture & Query Optimization',
      desc: 'Relational data modeling, index optimization, foreign key constraints, connection pooling, and automated incremental database backups with zero data loss.',
      icon: Database,
    },
    {
      title: 'Workflow Automation & Scripting',
      desc: 'Eliminate manual copy-paste tasks between systems using automated scheduled background jobs, webhook triggers, and event-driven microservices.',
      icon: Cpu,
    },
    {
      title: 'Security Hardening & Access Control',
      desc: 'Role-based access control (RBAC), multi-factor authentication enforcement, encrypted data transmission, and audit trail logging.',
      icon: ShieldCheck,
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
          Digital Engineering
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
          }`}
        >
          Custom IT Solutions, Cloud Architecture &amp; Web Applications
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          When commercial off-the-shelf software falls short of your operational moat, our engineering team designs, builds, and maintains custom software architectures tailored to your exact rules.
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
            <span>Discuss Custom Software Engineering</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </RevealSection>

      {/* Grid */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollSectionContainer>
          <ScrollCascadeGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => {
              const IconComp = cap.icon;
              return (
                <ScrollParallaxLayer
                  key={cap.title}
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
                      {cap.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                      {cap.desc}
                    </p>
                  </div>
                </motion.div>
              </ScrollParallaxLayer>
            );
          })}
          </ScrollCascadeGrid>
        </ScrollSectionContainer>
      </section>
    </div>
  );
};
