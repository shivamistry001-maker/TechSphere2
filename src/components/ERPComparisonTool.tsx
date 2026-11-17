/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ERP_COMPARISON_DATA, ERP_PLATFORMS, ERP_DISCLAIMER } from '../data/erpData.ts';
import { PageId, ThemeMode } from '../types.ts';
import { Check, Info, ArrowRight, HelpCircle, Layers, SlidersHorizontal } from 'lucide-react';

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

  const filteredComparison = ERP_COMPARISON_DATA.filter((item) =>
    item.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.erpnext.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.odoo.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.zoho.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.custom.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Platform Toggle Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3
            className={`text-lg sm:text-xl font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Which Platform Fits Your Business?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Compare ERPNext, Odoo, Zoho, and Custom architectures impartially.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {ERP_PLATFORMS.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform.id);
            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSelected
                    ? isDark
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
                      : 'bg-sky-100 text-sky-800 border-sky-300'
                    : isDark
                    ? 'bg-slate-900 text-slate-500 border-slate-800 opacity-60'
                    : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                }`}
              >
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table Container */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-xl transition-all ${
          isDark
            ? 'bg-slate-900/60 border-slate-800/80 shadow-black/40'
            : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-sky-400 w-1/5">
                  Evaluation Dimension
                </th>
                {selectedPlatforms.includes('erpnext') && (
                  <th className="py-4 px-5 text-xs font-bold text-sky-300 w-1/5">
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-bold">ERPNext</span>
                      <span className="text-[10px] text-slate-400 font-normal">Open-Source Monolith</span>
                    </div>
                  </th>
                )}
                {selectedPlatforms.includes('odoo') && (
                  <th className="py-4 px-5 text-xs font-bold text-sky-300 w-1/5">
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-bold">Odoo</span>
                      <span className="text-[10px] text-slate-400 font-normal">Modular Suite</span>
                    </div>
                  </th>
                )}
                {selectedPlatforms.includes('zoho') && (
                  <th className="py-4 px-5 text-xs font-bold text-sky-300 w-1/5">
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-bold">Zoho Ecosystem</span>
                      <span className="text-[10px] text-slate-400 font-normal">Cloud SaaS &amp; Books</span>
                    </div>
                  </th>
                )}
                {selectedPlatforms.includes('custom') && (
                  <th className="py-4 px-5 text-xs font-bold text-sky-300 w-1/5">
                    <div className="flex flex-col">
                      <span className="text-sm text-white font-bold">Custom ERP</span>
                      <span className="text-[10px] text-slate-400 font-normal">Bespoke Architecture</span>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody
              className={`divide-y text-xs sm:text-sm ${
                isDark ? 'divide-slate-800/80 text-slate-300' : 'divide-slate-200 text-slate-700'
              }`}
            >
              {filteredComparison.map((row, idx) => (
                <tr
                  key={row.category}
                  className={`transition-colors ${
                    idx % 2 === 0
                      ? isDark
                        ? 'bg-slate-900/30'
                        : 'bg-white'
                      : isDark
                      ? 'bg-slate-950/30'
                      : 'bg-slate-50/50'
                  } hover:bg-sky-500/5`}
                >
                  <td
                    className={`py-4 px-5 font-semibold text-xs uppercase tracking-wide ${
                      isDark ? 'text-slate-200' : 'text-slate-900'
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer & Action Banner */}
        <div
          className={`p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark
              ? 'bg-slate-950/60 border-slate-800 text-slate-400'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-start gap-2.5 text-xs max-w-xl">
            <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <p className="leading-normal">{ERP_DISCLAIMER}</p>
          </div>

          <button
            onClick={() => onNavigate('request-consultation')}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-600/25 transition-all"
          >
            <span>Talk to an ERP Consultant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
