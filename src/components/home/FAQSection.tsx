/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';

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
      className={`py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#070D1C]' : 'bg-white'
      }`}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header (Inspired by 00:08) */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7] dark:text-[#38BDF8]">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className={`font-display font-extrabold tracking-tight leading-[1.1] ${
              isDark ? 'text-white' : 'text-[#172033]'
            }`}
            style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
          >
            All About TechSphere, Explained
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Clear answers about ERP implementation, Odoo, custom engineering, web development, and ongoing support.
          </p>
        </div>

        {/* 2-Column Split Layout (Left Category Sidebar + Right Hairline Accordion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Category Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-row lg:flex-col flex-wrap gap-1.5">
              {FAQ_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      const first =
                        category === 'All'
                          ? HOME_FAQS[0]
                          : HOME_FAQS.find((f) => f.category === category);
                      if (first) setOpenId(first.id);
                    }}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-[#101B35] text-[#38BDF8] font-semibold'
                          : 'bg-[#F5FAFE] text-[#0284C7] font-semibold'
                        : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-500 hover:text-[#172033]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div
              className={`rounded-2xl p-5 border space-y-3 ${
                isDark
                  ? 'bg-[#101B35]/60 border-white/10'
                  : 'bg-[#F5FAFE] border-[#101B35]/[0.07]'
              }`}
            >
              <p
                className={`text-xs font-medium ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Didn&apos;t find your specific question?
              </p>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#101B35] text-white hover:bg-[#192A52] dark:bg-[#38BDF8] dark:text-[#101B35] transition-colors cursor-pointer"
              >
                <span>Contact TechSphere</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Accordion List */}
          <div
            className={`lg:col-span-8 divide-y border-t border-b ${
              isDark
                ? 'divide-white/10 border-white/10'
                : 'divide-[#101B35]/10 border-[#101B35]/10'
            }`}
          >
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? '' : faq.id)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-lg"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-base sm:text-lg font-semibold transition-colors ${
                        isOpen
                          ? 'text-[#0284C7] dark:text-[#38BDF8]'
                          : isDark
                          ? 'text-white group-hover:text-[#38BDF8]'
                          : 'text-[#172033] group-hover:text-[#0284C7]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#101B35] text-[#38BDF8] dark:bg-[#38BDF8] dark:text-[#101B35]'
                          : isDark
                          ? 'bg-white/5 text-slate-400 group-hover:text-white'
                          : 'bg-[#F5FAFE] text-[#172033] group-hover:bg-sky-50'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`pb-6 text-sm leading-relaxed max-w-2xl ${
                            isDark ? 'text-slate-300' : 'text-slate-600'
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
          </div>
        </div>
      </div>
    </section>
  );
};
