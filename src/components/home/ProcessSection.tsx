/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Search,
  ClipboardList,
  Compass,
  Code2,
  ShieldCheck,
  LifeBuoy,
} from 'lucide-react';
import { ThemeMode } from '../../types.ts';

interface ProcessSectionProps {
  theme?: ThemeMode;
}

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Understand Your Business',
    summary:
      'We study your operational workflows, departmental pain points, bottlenecks, and long-term business goals before recommending any tool.',
    deliverable: 'Operational Discovery Brief',
    icon: Search,
  },
  {
    number: '02',
    title: 'Analyze Requirements',
    summary:
      'Detailed mapping of inventory rules, approval hierarchies, accounting structures, user roles, and third-party integration touchpoints.',
    deliverable: 'System & Data Blueprint',
    icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Recommend the Right Solution',
    summary:
      'Impartial comparison across ERPNext, Odoo, Zoho, or custom web architecture with clear timelines and milestone scoping.',
    deliverable: 'Platform & Roadmap Plan',
    icon: Compass,
  },
  {
    number: '04',
    title: 'Implementation and Development',
    summary:
      'Structured module configuration, custom workflow scripting, clean master-data migration, and responsive web or portal engineering.',
    deliverable: 'Staging & Core Deployment',
    icon: Code2,
  },
  {
    number: '05',
    title: 'Testing and Training',
    summary:
      'Rigorous end-to-end User Acceptance Testing (UAT), balance verification, and practical role-based training for your staff.',
    deliverable: 'UAT Sign-Off & Team Onboarding',
    icon: ShieldCheck,
  },
  {
    number: '06',
    title: 'Ongoing Support',
    summary:
      'Post-launch hypercare, system monitoring, iterative feature refinements, and continuous process optimization as you grow.',
    deliverable: 'Continuous Technical Care',
    icon: LifeBuoy,
  },
];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ theme = 'light' }) => {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <section
      className={`py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#070D1C]' : 'bg-white'
      }`}
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7] dark:text-[#38BDF8]">
            Our Working Process
          </p>
          <h2
            id="process-heading"
            className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
              isDark ? 'text-white' : 'text-[#172033]'
            }`}
            style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
          >
            A Structured Path From Discovery to Live Operations.
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Every engagement follows six transparent milestones designed to minimize operational disruption and drive lasting team adoption.
          </p>
        </div>

        {/* Desktop Connecting Timeline Indicator Bar */}
        <div className="hidden lg:block relative mb-10">
          <div
            className={`h-[2px] w-full rounded-full ${
              isDark ? 'bg-white/10' : 'bg-[#101B35]/10'
            }`}
          />
          <motion.div
            className="absolute top-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#38BDF8] to-[#0284C7]"
            initial={false}
            animate={{ width: `${((activeStep + 1) / PROCESS_STEPS.length) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="grid grid-cols-6 gap-4 -mt-[9px]">
            {PROCESS_STEPS.map((step, idx) => {
              const isCompleted = idx <= activeStep;
              const isCurrent = idx === activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="flex flex-col items-start text-left group cursor-pointer focus:outline-none"
                  aria-label={`Step ${step.number}: ${step.title}`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      isCurrent
                        ? 'bg-[#38BDF8] border-[#101B35] dark:border-white scale-125 shadow-[0_0_14px_rgba(56,189,248,0.65)]'
                        : isCompleted
                        ? 'bg-[#0284C7] border-[#38BDF8]'
                        : isDark
                        ? 'bg-[#070D1C] border-slate-600 group-hover:border-[#38BDF8]'
                        : 'bg-white border-slate-300 group-hover:border-[#0284C7]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isDark
                      ? 'bg-[#101B35] border-[#38BDF8] shadow-[0_18px_40px_rgba(56,189,248,0.12)]'
                      : 'bg-white border-[#38BDF8] shadow-[0_18px_42px_rgba(16,27,53,0.08)]'
                    : isDark
                    ? 'bg-[#0B1429] border-white/10 hover:border-sky-400/35'
                    : 'bg-[#F5FAFE] border-[#101B35]/[0.07] hover:border-[#38BDF8]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`font-display text-2xl font-extrabold tabular-nums transition-colors ${
                        isSelected
                          ? 'text-[#0284C7] dark:text-[#38BDF8]'
                          : isDark
                          ? 'text-slate-500'
                          : 'text-[#101B35]/35'
                      }`}
                    >
                      {step.number}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-[#101B35] border-[#101B35] text-[#38BDF8] dark:bg-[#38BDF8] dark:border-[#38BDF8] dark:text-[#101B35]'
                          : isDark
                          ? 'bg-[#101B35] border-white/10 text-[#38BDF8]'
                          : 'bg-white border-[#101B35]/[0.08] text-[#0284C7]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3
                    className={`font-display text-lg font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-[#172033]'
                    }`}
                  >
                    {step.number} – {step.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {step.summary}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t text-[11px] font-medium ${
                    isDark
                      ? 'border-white/10 text-slate-400'
                      : 'border-[#101B35]/[0.07] text-slate-500'
                  }`}
                >
                  Output: <span className="font-semibold text-[#0284C7] dark:text-[#38BDF8]">{step.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
