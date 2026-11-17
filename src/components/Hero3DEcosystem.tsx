/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Database,
  TrendingUp,
  Cpu,
  BarChart3,
  Boxes,
  Zap,
  CheckCircle2,
  Users2,
  Activity,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ThemeMode } from '../types.ts';

interface Hero3DEcosystemProps {
  theme?: ThemeMode;
}

export const Hero3DEcosystem: React.FC<Hero3DEcosystemProps> = ({ theme = 'dark' }) => {
  const [activeCard, setActiveCard] = useState<string | null>('erp-core');
  const isDark = theme === 'dark';

  const stages = [
    { name: 'Business', icon: Users2, color: 'text-sky-400' },
    { name: 'ERP', icon: Database, color: 'text-blue-400' },
    { name: 'Automation', icon: Zap, color: 'text-cyan-400' },
    { name: 'Analytics', icon: BarChart3, color: 'text-indigo-400' },
    { name: 'Growth', icon: TrendingUp, color: 'text-emerald-400' },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none select-none">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/20 via-blue-600/10 to-transparent rounded-3xl filter blur-3xl -z-10 pointer-events-none" />

      {/* Main Container Frame */}
      <div
        className={`relative rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-slate-900/70 border border-sky-500/20 shadow-2xl shadow-sky-950/50 backdrop-blur-xl'
            : 'bg-white/80 border border-sky-200/80 shadow-2xl shadow-sky-900/10 backdrop-blur-xl'
        }`}
      >
        {/* Top Header Bar of Ecosystem Console */}
        <div className="flex items-center justify-between pb-6 border-b border-sky-500/15">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
            </div>
            <span
              className={`text-xs font-mono font-medium tracking-wide ${
                isDark ? 'text-sky-400' : 'text-sky-700'
              }`}
            >
              techsphere://ecosystem.live
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Synced Real-Time
            </span>
          </div>
        </div>

        {/* Dynamic Business Transformation Flow: Business → ERP → Automation → Analytics → Growth */}
        <div className="py-6 border-b border-sky-500/10">
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none">
            {stages.map((stg, idx) => {
              const IconComp = stg.icon;
              return (
                <React.Fragment key={stg.name}>
                  <div className="flex flex-col items-center min-w-[60px] text-center">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                        isDark
                          ? 'bg-slate-800/80 border border-sky-500/30 text-white shadow-md shadow-sky-500/10'
                          : 'bg-sky-50 border border-sky-200 text-slate-800 shadow-sm'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${stg.color}`} />
                    </div>
                    <span className={`mt-2 text-[10px] sm:text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {stg.name}
                    </span>
                  </div>
                  {idx < stages.length - 1 && (
                    <div className="flex-1 flex items-center justify-center px-1">
                      <div className="w-full h-0.5 bg-gradient-to-r from-sky-500/40 via-sky-400 to-sky-500/40 relative">
                        <motion.div
                          animate={{ x: [0, 24, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                          className="absolute -top-1 w-2 h-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400"
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Central 3D Interactive Ecosystem Canvas with Floating Cards */}
        <div className="relative pt-6 min-h-[340px] flex items-center justify-center">
          {/* Central ERP Brain / Hub */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                '0 0 20px rgba(14,165,233,0.2)',
                '0 0 35px rgba(14,165,233,0.35)',
                '0 0 20px rgba(14,165,233,0.2)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className={`z-20 w-36 sm:w-44 p-4 rounded-2xl text-center border transition-all ${
              isDark
                ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-sky-400/40 ring-1 ring-sky-400/30'
                : 'bg-white border-sky-300 ring-2 ring-sky-100 shadow-xl'
            }`}
          >
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
              <Database className="w-5 h-5" />
            </div>
            <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ERP CORE
            </h4>
            <p className="text-[10px] text-sky-400 font-medium">Single Source of Truth</p>
            <div className="mt-2 text-[9px] text-slate-400 font-mono">
              ERPNext • Odoo • Zoho
            </div>
          </motion.div>

          {/* Floating UI Card 1: Finance (Top Left) */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
            className={`absolute top-2 left-0 sm:left-4 z-10 w-36 sm:w-44 p-3 rounded-xl border backdrop-blur-md text-xs shadow-lg ${
              isDark
                ? 'bg-slate-900/85 border-sky-500/20 text-slate-200'
                : 'bg-white/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold flex items-center gap-1.5 text-sky-400">
                <BarChart3 className="w-3.5 h-3.5" /> Finance
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                +18.4%
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">Automated Ledger</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Multi-currency &amp; P&amp;L</p>
          </motion.div>

          {/* Floating UI Card 2: Inventory (Top Right) */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 0.5 }}
            className={`absolute top-2 right-0 sm:right-4 z-10 w-36 sm:w-44 p-3 rounded-xl border backdrop-blur-md text-xs shadow-lg ${
              isDark
                ? 'bg-slate-900/85 border-sky-500/20 text-slate-200'
                : 'bg-white/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold flex items-center gap-1.5 text-blue-400">
                <Boxes className="w-3.5 h-3.5" /> Inventory
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono">
                Multi-Bin
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">Zero Stockouts</div>
            <p className="text-[10px] text-slate-400 mt-0.5">FIFO &amp; Batch Traceability</p>
          </motion.div>

          {/* Floating UI Card 3: CRM & Sales (Bottom Left) */}
          <motion.div
            animate={{ y: [3, -5, 3] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
            className={`absolute bottom-2 left-0 sm:left-4 z-10 w-36 sm:w-44 p-3 rounded-xl border backdrop-blur-md text-xs shadow-lg ${
              isDark
                ? 'bg-slate-900/85 border-sky-500/20 text-slate-200'
                : 'bg-white/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold flex items-center gap-1.5 text-cyan-400">
                <Users2 className="w-3.5 h-3.5" /> Sales &amp; CRM
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">
                Pipeline
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">1-Click Quotes</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Omnichannel Ingestion</p>
          </motion.div>

          {/* Floating UI Card 4: Automation (Bottom Right) */}
          <motion.div
            animate={{ y: [-5, 3, -5] }}
            transition={{ repeat: Infinity, duration: 3.9, ease: 'easeInOut', delay: 1.5 }}
            className={`absolute bottom-2 right-0 sm:right-4 z-10 w-36 sm:w-44 p-3 rounded-xl border backdrop-blur-md text-xs shadow-lg ${
              isDark
                ? 'bg-slate-900/85 border-sky-500/20 text-slate-200'
                : 'bg-white/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold flex items-center gap-1.5 text-emerald-400">
                <Zap className="w-3.5 h-3.5" /> Automation
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                Active
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">Webhook Flow</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Automated Approvals</p>
          </motion.div>

          {/* SVG Connecting Circuit Traces */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="75%" y1="20%" x2="50%" y2="50%" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="25%" y1="80%" x2="50%" y2="50%" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="75%" y1="80%" x2="50%" y2="50%" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3,3" />
          </svg>
        </div>

        {/* Ecosystem Bottom Trust Footer */}
        <div className="mt-4 pt-3 border-t border-sky-500/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            Enterprise-grade data security &amp; RBAC
          </span>
          <span className="font-mono text-sky-400">REST APIs • Webhooks • Cloud Sync</span>
        </div>
      </div>
    </div>
  );
};
