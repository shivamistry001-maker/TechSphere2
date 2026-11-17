/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'motion/react';
import {
  ArrowRight,
  UserPlus,
  Users,
  FileText,
  ShoppingCart,
  PackageCheck,
  Boxes,
  Landmark,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';
import {
  ScanningLine,
  ScrollCascadeBlock,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';
import { EASE_PREMIUM } from '../../utils/motion.ts';

interface TechnologyShowcaseSectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

interface WorkflowStage {
  id: string;
  label: string;
  title: string;
  summary: string;
  recordCode: string;
  route: string;
  owner: string;
  status: string;
  details: { key: string; value: string }[];
  icon: React.ComponentType<{ className?: string }>;
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'lead',
    label: 'Lead',
    title: 'Automated Lead Capture',
    summary:
      'Inbound inquiries from website forms, WhatsApp, and email automatically create qualified lead records without manual spreadsheets.',
    recordCode: 'LD-2026-0412',
    route: 'Web Inquiry → CRM Queue',
    owner: 'Sales Intake Engine',
    status: 'Qualified & Assigned',
    details: [
      { key: 'Source Channel', value: 'Website & Direct Inquiry' },
      { key: 'Assigned Team', value: 'Regional Advisory Desk' },
      { key: 'Next Action', value: 'Discovery Call Scheduled' },
    ],
    icon: UserPlus,
  },
  {
    id: 'crm',
    label: 'CRM',
    title: 'Unified CRM Pipeline',
    summary:
      'Every client touchpoint, call note, and requirement specification lives inside a structured pipeline synced across teams.',
    recordCode: 'CRM-OPP-1084',
    route: 'Lead → Opportunity Stage',
    owner: 'Account Management',
    status: 'Proposal Ready',
    details: [
      { key: 'Pipeline Stage', value: 'Technical Scoping' },
      { key: 'Communication Log', value: 'Email & Call Synced' },
      { key: 'Priority Tier', value: 'Enterprise Rollout' },
    ],
    icon: Users,
  },
  {
    id: 'quotation',
    label: 'Quotation',
    title: 'Dynamic Quotation & Pricing',
    summary:
      'Generate accurate multi-currency quotations with automated tax calculations, margin checks, and one-click client approval.',
    recordCode: 'QTN-2026-0891',
    route: 'CRM → Approved Quotation',
    owner: 'Pricing & Commercials',
    status: 'Client Approved',
    details: [
      { key: 'Pricing Matrix', value: 'Tiered B2B Rules Applied' },
      { key: 'Tax & Compliance', value: 'Auto-Calculated' },
      { key: 'Delivery Format', value: 'Branded PDF + Portal Link' },
    ],
    icon: FileText,
  },
  {
    id: 'sales-order',
    label: 'Sales Order',
    title: 'Instant Sales Order Conversion',
    summary:
      'Approved quotations convert straight into confirmed Sales Orders, reserving stock and triggering fulfillment automatically.',
    recordCode: 'SO-2026-3319',
    route: 'Quotation → Fulfillment Trigger',
    owner: 'Order Operations',
    status: 'Confirmed & Reserved',
    details: [
      { key: 'Stock Allocation', value: 'Primary Warehouse Reserved' },
      { key: 'Payment Terms', value: 'Net 30 Milestone Linked' },
      { key: 'Downstream Sync', value: 'Purchase & Dispatch Ready' },
    ],
    icon: ShoppingCart,
  },
  {
    id: 'purchase',
    label: 'Purchase',
    title: 'Smart Procurement & Vendor RFQs',
    summary:
      'Low-stock or make-to-order requirements automatically generate purchase requests and route supplier POs for fast approval.',
    recordCode: 'PO-2026-7740',
    route: 'Reorder Rule → Supplier PO',
    owner: 'Procurement Desk',
    status: 'Dispatched to Supplier',
    details: [
      { key: 'Trigger Type', value: 'Safety Stock Threshold' },
      { key: 'Approval Flow', value: '2-Step Digital Sign-Off' },
      { key: 'Lead Time Tracking', value: 'ETA Synced to Warehouse' },
    ],
    icon: PackageCheck,
  },
  {
    id: 'inventory',
    label: 'Inventory',
    title: 'Real-Time Multi-Warehouse Stock',
    summary:
      'Track batch numbers, serials, bin locations, and inter-branch stock transfers with barcode-ready accuracy.',
    recordCode: 'INV-WH-0192',
    route: 'Receipt → Bin Valuation',
    owner: 'Warehouse Control',
    status: 'Batch Verified',
    details: [
      { key: 'Tracking Method', value: 'FIFO / Batch & Serial' },
      { key: 'Stock Valuation', value: 'Perpetual Automated Ledger' },
      { key: 'Branch Sync', value: 'Central + Satellite Hubs' },
    ],
    icon: Boxes,
  },
  {
    id: 'accounting',
    label: 'Accounting',
    title: 'Automated Double-Entry Ledger',
    summary:
      'Invoices, vendor bills, tax entries, and bank reconciliations post automatically from operational transactions.',
    recordCode: 'ACC-INV-5520',
    route: 'Delivery → General Ledger',
    owner: 'Finance & Compliance',
    status: 'Reconciled',
    details: [
      { key: 'Journal Posting', value: 'Zero Manual Re-Entry' },
      { key: 'Receivables', value: 'Automated Aging Alerts' },
      { key: 'Audit Trail', value: 'Timestamped & Role-Locked' },
    ],
    icon: Landmark,
  },
  {
    id: 'reports',
    label: 'Reports',
    title: 'Executive KPI & BI Dashboards',
    summary:
      'Monitor cashflow, gross margins, inventory turnover, and departmental performance from a single live executive view.',
    recordCode: 'RPT-EXEC-LIVE',
    route: 'Ledger → Executive Console',
    owner: 'Leadership & Strategy',
    status: 'Live Telemetry',
    details: [
      { key: 'Financial View', value: 'Real-Time P&L & Cashflow' },
      { key: 'Operational View', value: 'Order Cycle & Stock Turn' },
      { key: 'Export Options', value: 'Scheduled PDF & CSV Digests' },
    ],
    icon: BarChart3,
  },
];

export const TechnologyShowcaseSection: React.FC<TechnologyShowcaseSectionProps> = ({
  onNavigate,
  theme = 'light',
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const isDark = theme === 'dark';
  const activeStage = WORKFLOW_STAGES[activeIndex];
  const ActiveIcon = activeStage.icon;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 sm:py-28 text-white overflow-x-clip transition-colors duration-300 ${
        isDark ? 'bg-[#090909] border-t border-b border-[#303030]' : 'bg-[#101B35]'
      }`}
      aria-labelledby="tech-showcase-heading"
    >
      {/* Subtle Atmospheric Glow */}
      <div
        className="absolute top-0 right-1/4 w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(9, 9, 9, 0) 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(16, 27, 53, 0) 70%)',
        }}
        aria-hidden="true"
      />

      <ScrollSectionContainer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT COLUMN: Editorial Heading & Interactive Process Steps */}
          <ScrollParallaxLayer
            scrollYProgress={scrollYProgress}
            yRange={[14, -14]}
            enabled={isDesktop}
            className="lg:col-span-5"
          >
            <ScrollCascadeBlock className="space-y-8">
            <div className="space-y-4">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                  isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'
                }`}
              >
                Connected ERP Architecture
              </p>
              <h2
                id="tech-showcase-heading"
                className="font-display font-extrabold text-white tracking-tight leading-[1.08] text-balance"
                style={{ fontSize: 'clamp(1.95rem, 3.6vw, 3rem)' }}
              >
                See How Technology Transforms Your Business.
              </h2>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-[#A3A3A3]' : 'text-slate-300'
                }`}
              >
                Replace disconnected spreadsheets with one intelligent pipeline. Select any stage below to inspect how data flows seamlessly from first inquiry to executive reporting.
              </p>
            </div>

            {/* Interactive Stage List */}
            <div
              className={`divide-y border-t border-b ${
                isDark
                  ? 'divide-[#303030] border-[#303030]'
                  : 'divide-white/10 border-white/10'
              }`}
            >
              {WORKFLOW_STAGES.map((stage, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full py-3.5 px-2 flex items-center justify-between text-left transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 rounded-lg ${
                      isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
                    } ${
                      isActive
                        ? 'text-white'
                        : isDark
                        ? 'text-[#737373] hover:text-[#D4D4D4]'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono tabular-nums transition-colors ${
                          isActive
                            ? isDark
                              ? 'text-white font-bold'
                              : 'text-[#38BDF8] font-bold'
                            : isDark
                            ? 'text-[#737373]'
                            : 'text-slate-500'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-[15px] font-semibold">
                        {stage.label}
                      </span>
                      {idx < WORKFLOW_STAGES.length - 1 && (
                        <span
                          className={`hidden sm:inline text-[11px] ${
                            isDark ? 'text-[#737373]' : 'text-slate-500'
                          }`}
                        >
                          → {WORKFLOW_STAGES[idx + 1].label}
                        </span>
                      )}
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-200 ${
                        isActive
                          ? isDark
                            ? 'text-white translate-x-0 opacity-100'
                            : 'text-[#38BDF8] translate-x-0 opacity-100'
                          : isDark
                          ? 'text-[#737373] -translate-x-1 opacity-40 group-hover:opacity-80'
                          : 'text-slate-600 -translate-x-1 opacity-40 group-hover:opacity-80'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => onNavigate('erp-solutions')}
                className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'text-white hover:text-[#D4D4D4]'
                    : 'text-[#38BDF8] hover:text-sky-300'
                }`}
              >
                <span>Compare ERPNext, Odoo &amp; Zoho Architectures</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
            </ScrollCascadeBlock>
          </ScrollParallaxLayer>

          {/* RIGHT COLUMN: Dashboard Interface with Animated Funnel Connections */}
          <ScrollParallaxLayer
            scrollYProgress={scrollYProgress}
            yRange={[-16, 16]}
            enabled={isDesktop}
            className="lg:col-span-7"
          >
            <ScrollCascadeBlock>
            <div
              className={`rounded-3xl border p-5 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.45)] relative overflow-hidden ${
                isDark
                  ? 'bg-[#111111] border-[#303030]'
                  : 'bg-[#0B1429]/95 border-sky-400/20'
              }`}
            >
              {/* Subtle Scanning Line Effect */}
              <ScanningLine theme={theme} />

              {/* Top Interactive 8-Node Pipeline Bar */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 relative z-10">
                {WORKFLOW_STAGES.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isActive = idx === activeIndex;
                  return (
                    <motion.button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                      className={`flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl border text-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                        isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
                      } ${
                        isActive
                          ? isDark
                            ? 'bg-white text-[#090909] border-white shadow-[0_0_20px_rgba(255,255,255,0.18)]'
                            : 'bg-[#38BDF8]/15 border-[#38BDF8] text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                          : isDark
                          ? 'bg-[#171717] border-[#303030] text-[#A3A3A3] hover:border-[#737373] hover:text-white'
                          : 'bg-[#101B35]/90 border-white/10 text-slate-400 hover:border-sky-400/35 hover:text-slate-200'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 mb-1.5 ${
                          isActive
                            ? isDark
                              ? 'text-[#090909]'
                              : 'text-[#38BDF8]'
                            : isDark
                            ? 'text-[#A3A3A3]'
                            : 'text-slate-400'
                        }`}
                      />
                      <span className="text-[10px] font-semibold whitespace-nowrap">
                        {stage.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Animated SVG Funnel Convergence to Central Core */}
              <div className="relative h-32 sm:h-36 flex items-center justify-center my-2">
                <svg
                  viewBox="0 0 600 130"
                  className="w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {[40, 114, 188, 262, 338, 412, 486, 560].map((startX, idx) => {
                    const isActivePath = idx === activeIndex;
                    const activeStroke = isDark ? '#FFFFFF' : '#38BDF8';
                    const idleStroke = isDark
                      ? 'rgba(163, 163, 163, 0.22)'
                      : 'rgba(148, 163, 184, 0.22)';
                    return (
                      <path
                        key={startX}
                        d={`M ${startX} 0 C ${startX} 60, 300 50, 300 105`}
                        fill="none"
                        stroke={isActivePath ? activeStroke : idleStroke}
                        strokeWidth={isActivePath ? '2.5' : '1.2'}
                        strokeDasharray={isActivePath ? 'none' : '4 4'}
                      />
                    );
                  })}
                </svg>

                {/* Central Luminous Processing Sphere */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : isDark
                      ? {
                          boxShadow: [
                            '0 0 18px rgba(255,255,255,0.2)',
                            '0 0 32px rgba(255,255,255,0.38)',
                            '0 0 18px rgba(255,255,255,0.2)',
                          ],
                        }
                      : {
                          boxShadow: [
                            '0 0 24px rgba(56,189,248,0.45)',
                            '0 0 42px rgba(56,189,248,0.75)',
                            '0 0 24px rgba(56,189,248,0.45)',
                          ],
                        }
                  }
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className={`absolute bottom-1 w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                    isDark
                      ? 'bg-gradient-to-br from-white via-[#D4D4D4] to-[#737373] border-white/80'
                      : 'bg-gradient-to-br from-[#7DD3FC] via-[#38BDF8] to-[#0284C7] border-white/60'
                  }`}
                >
                  <ActiveIcon className={`w-6 h-6 ${isDark ? 'text-[#090909]' : 'text-[#101B35]'}`} />
                </motion.div>
              </div>

              {/* Dynamic Output Record Summary Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: EASE_PREMIUM }}
                  className={`rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border ${
                    isDark
                      ? 'bg-[#171717] border-[#303030] text-[#F5F5F5]'
                      : 'bg-white border-transparent text-[#172033]'
                  }`}
                >
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 pb-4 border-b ${
                      isDark ? 'border-[#303030]' : 'border-slate-200/80'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          isDark ? 'text-[#A3A3A3]' : 'text-[#0284C7]'
                        }`}
                      >
                        Stage 0{activeIndex + 1} · {activeStage.label}
                      </span>
                      <h3
                        className={`font-display text-lg sm:text-xl font-bold mt-0.5 ${
                          isDark ? 'text-white' : 'text-[#101B35]'
                        }`}
                      >
                        {activeStage.title}
                      </h3>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                        isDark
                          ? 'text-[#F5F5F5] bg-[#252525] border-[#303030]'
                          : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-emerald-600'}`}
                      />
                      <span>{activeStage.status}</span>
                    </div>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mt-4 ${
                      isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                    }`}
                  >
                    {activeStage.summary}
                  </p>

                  {/* Structured Data Output Rows */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeStage.details.map((item) => (
                      <div
                        key={item.key}
                        className={`rounded-xl border p-3 ${
                          isDark
                            ? 'bg-[#1D1D1D] border-[#303030]'
                            : 'bg-[#F5FAFE] border-[#101B35]/[0.06]'
                        }`}
                      >
                        <div
                          className={`text-[10px] font-semibold uppercase tracking-wider ${
                            isDark ? 'text-[#737373]' : 'text-slate-500'
                          }`}
                        >
                          {item.key}
                        </div>
                        <div
                          className={`text-xs sm:text-[13px] font-bold mt-1 ${
                            isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
                          }`}
                        >
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] ${
                      isDark
                        ? 'border-[#303030] text-[#737373]'
                        : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    <span
                      className={`font-mono font-semibold ${
                        isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                      }`}
                    >
                      {activeStage.recordCode}
                    </span>
                    <span>
                      {activeStage.route} · {activeStage.owner}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            </ScrollCascadeBlock>
          </ScrollParallaxLayer>
        </div>
      </ScrollSectionContainer>
    </section>
  );
};
