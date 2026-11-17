/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Database,
  TrendingUp,
  BarChart3,
  Boxes,
  Zap,
  Users2,
  ShieldCheck,
} from 'lucide-react';
import { ThemeMode } from '../types.ts';

interface Hero3DEcosystemProps {
  theme?: ThemeMode;
}

export const Hero3DEcosystem: React.FC<Hero3DEcosystemProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const stages = [
    { name: 'Business', icon: Users2, color: isDark ? 'text-white' : 'text-sky-400' },
    { name: 'ERP', icon: Database, color: isDark ? 'text-[#D4D4D4]' : 'text-blue-400' },
    { name: 'Automation', icon: Zap, color: isDark ? 'text-white' : 'text-cyan-400' },
    { name: 'Analytics', icon: BarChart3, color: isDark ? 'text-[#D4D4D4]' : 'text-indigo-400' },
    { name: 'Growth', icon: TrendingUp, color: isDark ? 'text-white' : 'text-emerald-400' },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none select-none">
      {/* Background ambient radial glow */}
      <div
        className={`absolute inset-0 rounded-3xl filter blur-3xl -z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-tr from-white/10 via-neutral-600/10 to-transparent'
            : 'bg-gradient-to-tr from-sky-600/20 via-blue-600/10 to-transparent'
        }`}
      />

      {/* Main Container Frame */}
      <div
        className={`relative rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-[#171717] border border-[#303030] shadow-2xl shadow-black/60'
            : 'bg-white/80 border border-sky-200/80 shadow-2xl shadow-sky-900/10 backdrop-blur-xl'
        }`}
      >
        {/* Top Header Bar of Ecosystem Console */}
        <div
          className={`flex items-center justify-between pb-6 border-b ${
            isDark ? 'border-[#303030]' : 'border-sky-500/15'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className={`w-3 h-3 rounded-full inline-block ${isDark ? 'bg-[#404040]' : 'bg-red-400/80'}`} />
              <span className={`w-3 h-3 rounded-full inline-block ${isDark ? 'bg-[#737373]' : 'bg-amber-400/80'}`} />
              <span className={`w-3 h-3 rounded-full inline-block ${isDark ? 'bg-white' : 'bg-emerald-400/80'}`} />
            </div>
            <span
              className={`text-xs font-mono font-medium tracking-wide ${
                isDark ? 'text-[#D4D4D4]' : 'text-sky-700'
              }`}
            >
              techsphere://ecosystem.live
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-white' : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-white' : 'bg-emerald-500'
                }`}
              />
            </span>
            <span className={`text-[11px] font-medium ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
              Synced Real-Time
            </span>
          </div>
        </div>

        {/* Dynamic Business Transformation Flow */}
        <div className={`py-6 border-b ${isDark ? 'border-[#303030]' : 'border-sky-500/10'}`}>
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none">
            {stages.map((stg, idx) => {
              const IconComp = stg.icon;
              return (
                <React.Fragment key={stg.name}>
                  <div className="flex flex-col items-center min-w-[60px] text-center">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                        isDark
                          ? 'bg-[#1D1D1D] border border-[#303030] text-white'
                          : 'bg-sky-50 border border-sky-200 text-slate-800 shadow-sm'
                      }`}
                    >
                      <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${stg.color}`} />
                    </div>
                    <span className={`mt-2 text-[10px] sm:text-xs font-semibold ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                      {stg.name}
                    </span>
                  </div>
                  {idx < stages.length - 1 && (
                    <div className="flex-1 flex items-center justify-center px-1">
                      <div
                        className={`w-full h-0.5 relative ${
                          isDark
                            ? 'bg-gradient-to-r from-[#303030] via-white to-[#303030]'
                            : 'bg-gradient-to-r from-sky-500/40 via-sky-400 to-sky-500/40'
                        }`}
                      >
                        <motion.div
                          animate={{ x: [0, 24, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                          className={`absolute -top-1 w-2 h-2 rounded-full ${
                            isDark ? 'bg-white shadow-sm' : 'bg-sky-400 shadow-sm shadow-sky-400'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Central Interactive Ecosystem Canvas */}
        <div className="relative pt-6 min-h-[340px] flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className={`z-20 w-36 sm:w-44 p-4 rounded-2xl text-center border transition-all ${
              isDark
                ? 'bg-[#111111] border-white/40 ring-1 ring-white/20 shadow-2xl'
                : 'bg-white border-sky-300 ring-2 ring-sky-100 shadow-xl'
            }`}
          >
            <div
              className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                isDark
                  ? 'bg-white text-[#090909]'
                  : 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30'
              }`}
            >
              <Database className="w-5 h-5" />
            </div>
            <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ERP CORE
            </h4>
            <p className={`text-[10px] font-medium ${isDark ? 'text-[#D4D4D4]' : 'text-sky-500'}`}>
              Single Source of Truth
            </p>
            <div className={`mt-2 text-[9px] font-mono ${isDark ? 'text-[#737373]' : 'text-slate-400'}`}>
              ERPNext • Odoo • Zoho
            </div>
          </motion.div>

          {/* Floating UI Card 1: Finance */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
            className={`absolute top-2 left-0 sm:left-4 z-10 w-36 sm:w-44 p-3 rounded-xl border text-xs shadow-lg ${
              isDark
                ? 'bg-[#1D1D1D] border-[#303030] text-[#F5F5F5]'
                : 'bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-sky-500'}`}>
                <BarChart3 className="w-3.5 h-3.5" /> Finance
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-[#252525] text-white' : 'bg-emerald-500/20 text-emerald-600'}`}>
                +18.4%
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">Automated Ledger</div>
            <p className={`text-[10px] mt-0.5 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-400'}`}>
              Multi-currency &amp; P&amp;L
            </p>
          </motion.div>

          {/* Floating UI Card 2: Inventory */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 0.5 }}
            className={`absolute top-2 right-0 sm:right-4 z-10 w-36 sm:w-44 p-3 rounded-xl border text-xs shadow-lg ${
              isDark
                ? 'bg-[#1D1D1D] border-[#303030] text-[#F5F5F5]'
                : 'bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-blue-500'}`}>
                <Boxes className="w-3.5 h-3.5" /> Inventory
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-[#252525] text-white' : 'bg-sky-500/20 text-sky-600'}`}>
                Multi-Bin
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">Zero Stockouts</div>
            <p className={`text-[10px] mt-0.5 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-400'}`}>
              FIFO &amp; Batch Traceability
            </p>
          </motion.div>

          {/* Floating UI Card 3: CRM & Sales */}
          <motion.div
            animate={{ y: [3, -5, 3] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
            className={`absolute bottom-2 left-0 sm:left-4 z-10 w-36 sm:w-44 p-3 rounded-xl border text-xs shadow-lg ${
              isDark
                ? 'bg-[#1D1D1D] border-[#303030] text-[#F5F5F5]'
                : 'bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-cyan-600'}`}>
                <Users2 className="w-3.5 h-3.5" /> Sales &amp; CRM
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-[#252525] text-white' : 'bg-blue-500/20 text-blue-600'}`}>
                Pipeline
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">1-Click Quotes</div>
            <p className={`text-[10px] mt-0.5 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-400'}`}>
              Omnichannel Ingestion
            </p>
          </motion.div>

          {/* Floating UI Card 4: Automation */}
          <motion.div
            animate={{ y: [-5, 3, -5] }}
            transition={{ repeat: Infinity, duration: 3.9, ease: 'easeInOut', delay: 1.5 }}
            className={`absolute bottom-2 right-0 sm:right-4 z-10 w-36 sm:w-44 p-3 rounded-xl border text-xs shadow-lg ${
              isDark
                ? 'bg-[#1D1D1D] border-[#303030] text-[#F5F5F5]'
                : 'bg-white/90 border-slate-200 text-slate-800 backdrop-blur-md'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-emerald-600'}`}>
                <Zap className="w-3.5 h-3.5" /> Automation
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-[#252525] text-white' : 'bg-emerald-500/20 text-emerald-600'}`}>
                Active
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold">Webhook Flow</div>
            <p className={`text-[10px] mt-0.5 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-400'}`}>
              Automated Approvals
            </p>
          </motion.div>

          {/* SVG Connecting Circuit Traces */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="25%"
              y1="20%"
              x2="50%"
              y2="50%"
              stroke={isDark ? '#FFFFFF' : '#0ea5e9'}
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <line
              x1="75%"
              y1="20%"
              x2="50%"
              y2="50%"
              stroke={isDark ? '#FFFFFF' : '#0ea5e9'}
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <line
              x1="25%"
              y1="80%"
              x2="50%"
              y2="50%"
              stroke={isDark ? '#FFFFFF' : '#0ea5e9'}
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <line
              x1="75%"
              y1="80%"
              x2="50%"
              y2="50%"
              stroke={isDark ? '#FFFFFF' : '#0ea5e9'}
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          </svg>
        </div>

        {/* Ecosystem Bottom Trust Footer */}
        <div
          className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] ${
            isDark ? 'border-[#303030] text-[#A3A3A3]' : 'border-sky-500/10 text-slate-500'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-sky-500'}`} />
            Enterprise-grade data security &amp; RBAC
          </span>
          <span className={`font-mono ${isDark ? 'text-[#D4D4D4]' : 'text-sky-600'}`}>
            REST APIs • Webhooks • Cloud Sync
          </span>
        </div>
      </div>
    </div>
  );
};
