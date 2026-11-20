/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';
import {
  ScrollCascadeBlock,
  ScrollSectionContainer,
} from '../motion/MotionPrimitives.tsx';
import { playSound } from '../../utils/soundManager.ts';

interface FAQSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

type FAQCategory = 'All' | 'ERP & Strategy' | 'Customization & Web' | 'Timeline & Support';

interface FAQEntry {
  id: string;
  category: Exclude<FAQCategory, 'All'>;
  question: string;
  answer: string;
}

const HOME_FAQS: FAQEntry[] = [
  {
    id: 'faq-erp-impl',
    category: 'ERP & Strategy',
    question: 'What is ERP implementation?',
    answer:
      'ERP implementation is the structured process of planning, configuring, migrating data into, and launching an Enterprise Resource Planning system so your sales, inventory, procurement, manufacturing, and accounting operate on one shared real-time database.',
  },
  {
    id: 'faq-which-erp',
    category: 'ERP & Strategy',
    question: 'Which ERP software do you recommend?',
    answer:
      'We are platform-agnostic and recommend based on your operations and budget. ERPNext fits manufacturing and businesses seeking full open-source ownership; Odoo suits modular workflows, retail POS, and eCommerce; Zoho One excels for service teams needing rapid cloud CRM and finance; and custom architectures serve specialized workflows.',
  },
  {
    id: 'faq-odoo',
    category: 'ERP & Strategy',
    question: 'Does TechSphere provide Odoo implementation?',
    answer:
      'Yes. We handle end-to-end Odoo consulting, module setup, custom module development, data migration from legacy tools or spreadsheets, third-party API integrations, and staff training across Community and Enterprise editions.',
  },
  {
    id: 'faq-custom-erp',
    category: 'Customization & Web',
    question: 'Can you develop customized ERP solutions?',
    answer:
      'Yes. When standard out-of-the-box modules do not match your approval hierarchies, pricing logic, or industry workflows, we engineer custom fields, automated server scripts, tailored dashboards, and bespoke ERP modules or portals.',
  },
  {
    id: 'faq-web-dev',
    category: 'Customization & Web',
    question: 'Do you provide website development?',
    answer:
      'Yes. We design and build fast, responsive, SEO-friendly business websites, customer and dealer portals, and custom web applications using modern React, TypeScript, and Node.js architectures—seamlessly integrated with your CRM or ERP.',
  },
  {
    id: 'faq-duration',
    category: 'Timeline & Support',
    question: 'How long does ERP implementation take?',
    answer:
      'Timelines depend on module scope, data cleanliness, and customization depth. Core cloud setups can go live in a few weeks, while multi-department manufacturing or multi-branch ERP rollouts follow phased milestones over several weeks to a few months.',
  },
  {
    id: 'faq-support',
    category: 'Timeline & Support',
    question: 'Do you provide ongoing support?',
    answer:
      'Yes. After go-live, TechSphere provides structured hypercare, user adoption guidance, bug resolution, version maintenance, and iterative automation enhancements as your business scales.',
  },
];

const FAQ_CATEGORIES: FAQCategory[] = [
  'All',
  'ERP & Strategy',
  'Customization & Web',
  'Timeline & Support',
];

export const FAQSection: React.FC<FAQSectionProps> = ({ onNavigate, theme = 'light' }) => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('All');
  const [openId, setOpenId] = useState<string>(HOME_FAQS[0].id);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const filteredFaqs =
    selectedCategory === 'All'
      ? HOME_FAQS
      : HOME_FAQS.filter((item) => item.category === selectedCategory);

  return (
    <section
      className="ts-glass-canvas-primary py-20 sm:py-28 overflow-x-clip transition-colors duration-300"
      aria-labelledby="faq-heading"
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <ScrollCascadeBlock className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
            }`}
          >
            FAQ
          </p>
          <h2
            id="faq-heading"
            className={`font-display font-extrabold tracking-tight leading-[1.1] ${
              isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
            }`}
            style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
          >
            All About TechSphere, Explained
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
            Clear answers about ERP implementation, Odoo, custom engineering, web development, and ongoing support.
          </p>
        </ScrollCascadeBlock>

        {/* 2-Column Split Layout (Left Category Sidebar + Right Hairline Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Category Sidebar */}
          <ScrollCascadeBlock className="lg:col-span-4 space-y-8">
            <div className="flex flex-row lg:flex-col flex-wrap gap-1.5">
              {FAQ_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <motion.button
                    key={category}
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    onClick={() => {
                      setSelectedCategory(category);
                      const first =
                        category === 'All'
                          ? HOME_FAQS[0]
                          : HOME_FAQS.find((f) => f.category === category);
                      if (first) setOpenId(first.id);
                    }}
                    className={`inline-flex items-center text-left min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'ts-glass-accent text-white font-semibold'
                          : 'ts-glass-accent text-[#0284C7] font-semibold'
                        : isDark
                        ? 'text-[#A3A3A3] hover:text-white hover:bg-white/[0.06]'
                        : 'text-slate-600 hover:text-[#172033] hover:bg-white/55'
                    }`}
                  >
                    {category}
                  </motion.button>
                );
              })}
            </div>

            <div
              data-glass-layer="faq-sidebar-card"
              className="ts-glass-card rounded-2xl p-5 space-y-3"
            >
              <p
                className={`text-xs font-medium ${
                  isDark ? 'text-[#D4D4D4]' : 'text-slate-600'
                }`}
              >
                Didn&apos;t find your specific question?
              </p>
              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={() => onNavigate('contact')}
                className={`ts-glass-btn-primary group inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer ${
                  isDark ? 'text-[#090909]' : 'text-white'
                }`}
              >
                <span>Contact TechSphere</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </ScrollCascadeBlock>

          {/* Right Accordion List */}
          <ScrollCascadeBlock
            className={`ts-glass-panel lg:col-span-8 rounded-3xl px-5 sm:px-7 divide-y ${
              isDark ? 'divide-white/10' : 'divide-[#101B35]/10'
            }`}
          >
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    data-sound="none"
                    onClick={() => {
                      playSound(isOpen ? 'ui-close' : 'ui-open');
                      setOpenId(isOpen ? '' : faq.id);
                    }}
                    className={`w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 rounded-lg ${
                      isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-base sm:text-lg font-semibold transition-colors ${
                        isOpen
                          ? isDark
                            ? 'text-white'
                            : 'text-[#0284C7]'
                          : isDark
                          ? 'text-[#D4D4D4] group-hover:text-white'
                          : 'text-[#172033] group-hover:text-[#0284C7]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={prefersReducedMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? isDark
                            ? 'bg-white text-[#090909]'
                            : 'bg-[#101B35] text-[#38BDF8]'
                          : isDark
                          ? 'ts-glass-control text-[#A3A3A3] group-hover:text-white'
                          : 'ts-glass-control text-[#172033]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`pb-6 text-sm leading-relaxed max-w-2xl ${
                            isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                          }`}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </ScrollCascadeBlock>
        </div>
      </ScrollSectionContainer>
    </section>
  );
};
