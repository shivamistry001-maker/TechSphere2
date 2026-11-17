/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { CheckCircle2, ArrowRight, Layers, ExternalLink, Info } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, theme }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const isDark = theme === 'dark';

  const categories = ['All', 'Web', 'ERP', 'Applications', 'Automation'];

  const filteredItems =
    activeCategory === 'All'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Architecture Prototypes
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Engineering Portfolio &amp; System Prototypes
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Explore technical blueprints, ERP custom modules, B2B wholesale portals, and automated webhook pipelines demonstrating our engineering architecture.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs text-sky-400">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Projects in this portfolio are functional demo and conceptual implementations.</span>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25'
                  : isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/5'
                  : 'bg-white border-slate-200 shadow-lg shadow-slate-200/40 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/25">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Demo Project
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className={`p-3 rounded-xl border mb-5 text-xs ${isDark ? 'bg-sky-500/5 border-sky-500/15 text-sky-300' : 'bg-[#F5FAFE] border-sky-200 text-[#0284C7]'}`}>
                  <strong>Highlight:</strong> {item.highlight}
                </div>
              </div>

              <div>
                <div className={`flex flex-wrap gap-1.5 pt-4 border-t mb-5 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('request-consultation')}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-sky-500/10 hover:bg-sky-500 hover:text-white text-sky-400 border border-sky-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Inquire About Similar Build</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
