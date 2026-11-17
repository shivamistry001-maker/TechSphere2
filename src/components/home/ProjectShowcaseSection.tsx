/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X, Layers, CheckCircle2 } from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';

interface ProjectShowcaseSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

type ShowcaseCategory =
  | 'All'
  | 'Manufacturing ERP'
  | 'Trading ERP'
  | 'Business Websites'
  | 'Photography Website'
  | 'Restaurant Website'
  | 'Professional Services Website';

interface ShowcaseProject {
  id: string;
  category: Exclude<ShowcaseCategory, 'All'>;
  title: string;
  statusLabel: string;
  description: string;
  architectureNote: string;
  stack: string[];
  accentColor: string;
  renderPreview: () => React.ReactNode;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'mfg-erp',
    category: 'Manufacturing ERP',
    title: 'Multi-Stage Manufacturing & BOM Console',
    statusLabel: 'Demo Architecture',
    description:
      'Production planning system linking multi-level Bills of Materials, shop-floor job cards, raw material stock, and landed unit costing.',
    architectureNote: 'Editable demo blueprint built on open-source ERP workflows.',
    stack: ['ERPNext', 'Frappe', 'PostgreSQL', 'Barcode QC'],
    accentColor: '#38BDF8',
    renderPreview: () => (
      <div className="w-full h-full bg-[#101B35] p-4 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between text-[10px] text-sky-300 font-mono">
          <span>WORK ORDER · WO-408</span>
          <span>BOM LEVEL 3</span>
        </div>
        <div className="grid grid-cols-3 gap-2 my-3">
          {['Raw Stock', 'Assembly', 'QC Ready'].map((stage, i) => (
            <div key={stage} className="rounded-lg bg-white/[0.07] border border-white/10 p-2">
              <div className="text-[9px] text-slate-400">Stage 0{i + 1}</div>
              <div className="text-[11px] font-semibold mt-0.5">{stage}</div>
              <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#38BDF8]"
                  style={{ width: `${100 - i * 25}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 border-t border-white/10 pt-2">
          <span>Material Req: Auto-Triggered</span>
          <span className="text-[#38BDF8]">Batch Synced</span>
        </div>
      </div>
    ),
  },
  {
    id: 'trading-erp',
    category: 'Trading ERP',
    title: 'Wholesale Trading & Distribution Hub',
    statusLabel: 'Demo Architecture',
    description:
      'High-volume order management featuring tiered dealer pricing, credit-limit validation, FIFO warehouse picking, and automated invoicing.',
    architectureNote: 'Editable concept preview for wholesale & multi-branch distributors.',
    stack: ['Odoo', 'ERPNext', 'REST APIs', 'B2B Portal'],
    accentColor: '#0284C7',
    renderPreview: () => (
      <div className="w-full h-full bg-[#F5FAFE] p-4 flex flex-col justify-between text-[#172033]">
        <div className="flex items-center justify-between text-[10px] font-semibold text-[#0284C7]">
          <span>DEALER DISPATCH BOARD</span>
          <span>FIFO PICKING</span>
        </div>
        <div className="space-y-2 my-2">
          {[
            { code: 'SO-8821', route: 'Hub A → Retailer', state: 'Dispatched' },
            { code: 'SO-8822', route: 'Hub B → Wholesaler', state: 'Packed' },
            { code: 'SO-8823', route: 'Hub A → Export', state: 'Invoiced' },
          ].map((row) => (
            <div
              key={row.code}
              className="flex items-center justify-between rounded-lg bg-white border border-[#101B35]/[0.07] px-3 py-1.5 text-[10px]"
            >
              <span className="font-mono font-bold text-[#101B35]">{row.code}</span>
              <span className="text-slate-500">{row.route}</span>
              <span className="font-semibold text-[#0284C7]">{row.state}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-slate-500 border-t border-[#101B35]/[0.06] pt-2 flex justify-between">
          <span>Credit Check: Automated</span>
          <span className="font-semibold text-[#101B35]">Multi-Warehouse</span>
        </div>
      </div>
    ),
  },
  {
    id: 'business-web',
    category: 'Business Websites',
    title: 'Enterprise Corporate Flagship & Lead Engine',
    statusLabel: 'Demo Showcase',
    description:
      'Fast, search-optimized B2B corporate web platform engineered with interactive service configurators and CRM-connected inquiry capture.',
    architectureNote: 'Responsive across desktop, tablet, and mobile viewports.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'SEO Schema'],
    accentColor: '#38BDF8',
    renderPreview: () => (
      <div className="w-full h-full bg-white p-4 flex flex-col justify-between text-[#172033] border-b border-slate-100">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span className="text-[10px] font-bold tracking-wide">CORP PLATFORM</span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded bg-[#101B35] text-white">GET QUOTE</span>
        </div>
        <div className="my-3 space-y-2">
          <div className="text-sm font-display font-extrabold leading-tight text-[#101B35]">
            Scalable Digital Flagship
          </div>
          <div className="h-2 w-3/4 rounded bg-slate-100" />
          <div className="h-2 w-1/2 rounded bg-sky-100" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 rounded-lg bg-[#F5FAFE] border border-sky-100" />
          <div className="h-10 rounded-lg bg-[#F5FAFE] border border-sky-100" />
          <div className="h-10 rounded-lg bg-[#101B35]" />
        </div>
      </div>
    ),
  },
  {
    id: 'photography-web',
    category: 'Photography Website',
    title: 'Editorial Photography Studio & Client Gallery',
    statusLabel: 'Demo Showcase',
    description:
      'Minimalist visual portfolio with curated gallery layouts, private client proofing links, and automated session booking requests.',
    architectureNote: 'Editable creative studio template for photographers & media studios.',
    stack: ['React', 'Motion', 'Responsive Grid', 'Booking Flow'],
    accentColor: '#0EA5E9',
    renderPreview: () => (
      <div className="w-full h-full bg-[#172033] p-4 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-slate-300">
          <span>STUDIO ARCHIVE</span>
          <span className="text-[#38BDF8]">01 / PORTFOLIO</span>
        </div>
        <div className="grid grid-cols-3 gap-2 my-3 flex-1">
          <div className="col-span-2 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 p-2 flex items-end">
            <span className="text-[9px] text-slate-300">Editorial Series</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 rounded-lg bg-sky-500/20 border border-sky-400/25" />
            <div className="flex-1 rounded-lg bg-slate-800 border border-white/10" />
          </div>
        </div>
        <div className="text-[10px] text-slate-400 flex justify-between">
          <span>Client Proofing Enabled</span>
          <span className="text-white font-semibold">Book Session →</span>
        </div>
      </div>
    ),
  },
  {
    id: 'restaurant-web',
    category: 'Restaurant Website',
    title: 'Modern Hospitality Menu & Table Reservation App',
    statusLabel: 'Demo Showcase',
    description:
      'Mobile-first restaurant web experience featuring interactive seasonal menus, instant table booking, and POS-ready order integration.',
    architectureNote: 'Editable hospitality showcase built for fast mobile browsing.',
    stack: ['React', 'Tailwind CSS', 'Reservation API', 'POS Ready'],
    accentColor: '#38BDF8',
    renderPreview: () => (
      <div className="w-full h-full bg-[#F5FAFE] p-4 flex flex-col justify-between text-[#172033]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#101B35]">
            BISTRO &amp; DINING
          </span>
          <span className="text-[9px] font-semibold text-[#0284C7]">RESERVE TABLE</span>
        </div>
        <div className="my-2 rounded-xl bg-white p-3 border border-[#101B35]/[0.07] space-y-1.5">
          <div className="flex justify-between text-[10px] font-semibold">
            <span>Seasonal Tasting Menu</span>
            <span className="text-[#0284C7]">Live Menu</span>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Table for 4 · Tonight 19:30</span>
            <span className="text-emerald-600 font-semibold">Available</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>Mobile QR Menu</span>
          <span className="font-semibold text-[#101B35]">Direct Ordering</span>
        </div>
      </div>
    ),
  },
  {
    id: 'prof-services-web',
    category: 'Professional Services Website',
    title: 'Advisory & Consulting Firm Client Portal',
    statusLabel: 'Demo Showcase',
    description:
      'Authority-driven consulting platform with interactive diagnostic tools, case briefs, and automated calendar consultation booking.',
    architectureNote: 'Editable B2B advisory showcase for agencies, legal, and finance firms.',
    stack: ['React', 'TypeScript', 'Zoho CRM Sync', 'Formspree'],
    accentColor: '#0284C7',
    renderPreview: () => (
      <div className="w-full h-full bg-[#101B35] p-4 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#38BDF8] font-semibold uppercase tracking-wider">
            CLIENT PORTAL
          </span>
          <span className="text-slate-400">ADVISORY SUITE</span>
        </div>
        <div className="my-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/10 p-2.5">
            <div className="text-[9px] text-slate-300">Active Retainer</div>
            <div className="text-xs font-bold mt-1">Milestone 03</div>
          </div>
          <div className="rounded-lg bg-sky-500/20 border border-sky-400/30 p-2.5">
            <div className="text-[9px] text-sky-200">Consultation</div>
            <div className="text-xs font-bold mt-1 text-white">Scheduled</div>
          </div>
        </div>
        <div className="text-[10px] text-slate-300 border-t border-white/10 pt-2 flex justify-between">
          <span>Secure Document Vault</span>
          <span className="text-[#38BDF8]">CRM Synced</span>
        </div>
      </div>
    ),
  },
];

const CATEGORIES: ShowcaseCategory[] = [
  'All',
  'Manufacturing ERP',
  'Trading ERP',
  'Business Websites',
  'Photography Website',
  'Restaurant Website',
  'Professional Services Website',
];

export const ProjectShowcaseSection: React.FC<ProjectShowcaseSectionProps> = ({
  onNavigate,
  theme = 'light',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ShowcaseCategory>('All');
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const visibleProjects =
    selectedCategory === 'All'
      ? SHOWCASE_PROJECTS
      : SHOWCASE_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      className={`py-20 sm:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#0B1429]' : 'bg-[#F5FAFE]'
      }`}
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0284C7] dark:text-[#38BDF8]">
              Project Showcase
            </p>
            <h2
              id="showcase-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
                isDark ? 'text-white' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
            >
              Architecture Blueprints &amp; Interactive Demo Projects.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:underline cursor-pointer shrink-0"
          >
            <span>Open Full Portfolio Page</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  active
                    ? 'bg-[#101B35] text-white dark:bg-[#38BDF8] dark:text-[#101B35] shadow-sm'
                    : isDark
                    ? 'bg-[#101B35]/70 text-slate-300 border border-white/10 hover:border-sky-400/40'
                    : 'bg-white text-slate-600 border border-[#101B35]/[0.08] hover:text-[#101B35] hover:border-[#38BDF8]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              layout
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#101B35] border-sky-400/15 hover:border-[#38BDF8]/50'
                  : 'bg-white border-[#101B35]/[0.07] hover:border-[#38BDF8]/60 shadow-[0_12px_32px_rgba(16,27,53,0.04)] hover:shadow-[0_22px_48px_rgba(16,27,53,0.09)]'
              }`}
            >
              {/* Visual UI Preview Frame */}
              <div className="h-44 sm:h-48 overflow-hidden border-b border-[#101B35]/[0.06] dark:border-white/10">
                {project.renderPreview()}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] font-medium mb-2">
                    <span className="text-[#0284C7] dark:text-[#38BDF8] font-semibold">
                      {project.category}
                    </span>
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                      {project.statusLabel}
                    </span>
                  </div>

                  <h3
                    className={`font-display text-lg font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-[#172033]'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                <div>
                  <div
                    className={`text-[11px] pb-4 mb-4 border-b ${
                      isDark
                        ? 'text-slate-400 border-white/10'
                        : 'text-slate-500 border-[#101B35]/[0.06]'
                    }`}
                  >
                    {project.stack.join(' · ')}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] dark:text-[#38BDF8] hover:underline cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Interactive Project Preview Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#101B35]/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-xl rounded-3xl border overflow-hidden shadow-2xl ${
                isDark
                  ? 'bg-[#101B35] border-sky-400/25 text-white'
                  : 'bg-white border-[#101B35]/10 text-[#172033]'
              }`}
            >
              <div className="h-52 relative border-b border-white/10">
                {activeProject.renderPreview()}
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#101B35]/80 text-white flex items-center justify-center hover:bg-[#101B35] cursor-pointer"
                  aria-label="Close project preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0284C7] dark:text-[#38BDF8]">
                    {activeProject.category}
                  </span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    {activeProject.statusLabel}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold">{activeProject.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {activeProject.description}
                </p>

                <div
                  className={`rounded-xl p-4 text-xs flex items-start gap-2.5 ${
                    isDark ? 'bg-white/5 text-slate-300' : 'bg-[#F5FAFE] text-slate-600'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                  <span>{activeProject.architectureNote}</span>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{activeProject.stack.join(' · ')}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveProject(null);
                      onNavigate('request-consultation');
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#101B35] text-white dark:bg-[#38BDF8] dark:text-[#101B35] cursor-pointer"
                  >
                    Request Similar Build
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
