/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ERP_COMPARISON_DATA, ERP_PLATFORMS, ERP_DISCLAIMER } from '../data/erpData.ts';
import { filterERPComparison } from '../utils/erpWizardLogic.ts';
import { PageId, ThemeMode } from '../types.ts';
import { Info, ArrowRight, Search, X } from 'lucide-react';

interface ERPComparisonToolProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

export const ERPComparisonTool: React.FC<ERPComparisonToolProps> = ({
  onNavigate,
  theme = 'dark',
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'erpnext',
    'odoo',
    'zoho',
    'custom',
  ]);
  const [filterQuery, setFilterQuery] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const isDark = theme === 'dark';

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const filteredComparison = filterERPComparison(ERP_COMPARISON_DATA, filterQuery);

  return (
    <div className="w-full">
      {/* Platform Toggle Selector & Quick Dimension Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3
            className={`text-lg sm:text-xl font-bold ${
              isDark ? 'text-[#F5F5F5]' : 'text-slate-900'
            }`}
          >
            Which Platform Fits Your Business?
          </h3>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
            Compare ERPNext, Odoo, Zoho, and Custom architectures impartially.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search
              className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                isDark ? 'text-[#737373]' : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter dimensions..."
              aria-label="Filter comparison dimensions"
              className={`pl-8 pr-7 py-1.5 rounded-lg text-xs border outline-none transition-colors w-44 sm:w-48 ${
                isDark
                  ? 'bg-[#171717] border-[#303030] text-[#F5F5F5] placeholder-[#737373] focus:border-white'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#0284C7]'
              }`}
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                aria-label="Clear filter"
                className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer ${
                  isDark ? 'text-[#A3A3A3] hover:text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ERP_PLATFORMS.map((platform) => {
              const isSelected = selectedPlatforms.includes(platform.id);
              return (
                <motion.button
                  key={platform.id}
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  onClick={() => togglePlatform(platform.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-white text-[#090909] border-white shadow-sm'
                        : 'bg-sky-100 text-sky-800 border-sky-300'
                      : isDark
                      ? 'bg-[#171717] text-[#737373] border-[#303030] hover:text-[#D4D4D4]'
                      : 'bg-slate-100 text-slate-400 border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  {platform.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison Table Container */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-xl transition-colors ${
          isDark
            ? 'bg-[#171717] border-[#303030] shadow-black/50'
            : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'bg-[#111111] border-[#303030]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <th
                  className={`py-4 px-5 text-xs font-bold uppercase tracking-wider w-1/5 ${
                    isDark ? 'text-white' : 'text-[#0284C7]'
                  }`}
                >
                  Evaluation Dimension
                </th>
                {selectedPlatforms.includes('erpnext') && (
                  <th className="py-4 px-5 text-xs font-bold w-1/5">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ERPNext
                      </span>
                      <span className={`text-[10px] font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                        Open-Source Monolith
                      </span>
                    </div>
                  </th>
                )}
                {selectedPlatforms.includes('odoo') && (
                  <th className="py-4 px-5 text-xs font-bold w-1/5">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Odoo
                      </span>
                      <span className={`text-[10px] font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                        Modular Suite
                      </span>
                    </div>
                  </th>
                )}
                {selectedPlatforms.includes('zoho') && (
                  <th className="py-4 px-5 text-xs font-bold w-1/5">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Zoho Ecosystem
                      </span>
                      <span className={`text-[10px] font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                        Cloud SaaS &amp; Books
                      </span>
                    </div>
                  </th>
                )}
                {selectedPlatforms.includes('custom') && (
                  <th className="py-4 px-5 text-xs font-bold w-1/5">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Custom ERP
                      </span>
                      <span className={`text-[10px] font-normal ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                        Bespoke Architecture
                      </span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody
              className={`divide-y text-xs sm:text-sm ${
                isDark ? 'divide-[#303030] text-[#D4D4D4]' : 'divide-slate-200 text-slate-700'
              }`}
            >
              <AnimatePresence initial={false}>
                {filteredComparison.length > 0 ? (
                  filteredComparison.map((row, idx) => (
                    <motion.tr
                      key={row.category}
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`transition-colors ${
                        idx % 2 === 0
                          ? isDark
                            ? 'bg-[#171717]'
                            : 'bg-white'
                          : isDark
                          ? 'bg-[#141414]'
                          : 'bg-slate-50/50'
                      } ${isDark ? 'hover:bg-[#252525]' : 'hover:bg-sky-500/5'}`}
                    >
                      <td
                        className={`py-4 px-5 font-semibold text-xs uppercase tracking-wide ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {row.category}
                      </td>
                      {selectedPlatforms.includes('erpnext') && (
                        <td className="py-4 px-5 leading-relaxed">{row.erpnext}</td>
                      )}
                      {selectedPlatforms.includes('odoo') && (
                        <td className="py-4 px-5 leading-relaxed">{row.odoo}</td>
                      )}
                      {selectedPlatforms.includes('zoho') && (
                        <td className="py-4 px-5 leading-relaxed">{row.zoho}</td>
                      )}
                      {selectedPlatforms.includes('custom') && (
                        <td className="py-4 px-5 leading-relaxed">{row.custom}</td>
                      )}
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={selectedPlatforms.length + 1}
                      className={`py-8 px-5 text-center text-sm ${
                        isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                      }`}
                    >
                      No comparison rows match &ldquo;{filterQuery}&rdquo;.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Disclaimer & Action Banner */}
        <div
          className={`p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark
              ? 'bg-[#111111] border-[#303030] text-[#A3A3A3]'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-start gap-2.5 text-xs max-w-xl">
            <Info
              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                isDark ? 'text-white' : 'text-sky-500'
              }`}
            />
            <p className="leading-normal">{ERP_DISCLAIMER}</p>
          </div>

          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={() => onNavigate('request-consultation')}
            className={`group flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
              isDark
                ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                : 'text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-600/25'
            }`}
          >
            <span>Talk to an ERP Consultant</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
