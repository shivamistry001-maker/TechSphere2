/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { INSIGHTS_DATA } from '../data/insightsData.ts';
import { BookOpen, ArrowRight, Clock, Info } from 'lucide-react';

interface InsightsPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate, theme }) => {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const activeArticle = INSIGHTS_DATA.find((a) => a.id === activeArticleId);

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Knowledge &amp; Strategy
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Insights, Guides &amp; ERP Architecture Briefs
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Strategic frameworks, migration checklists, and technical evaluations to guide CTOs, business owners, and operations directors.
        </p>
        <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-xs ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Articles provided are sample insights developed for strategic planning.</span>
        </div>
      </section>

      {/* Article Modal / Reader if active */}
      {activeArticle && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl p-8 sm:p-12 border ${
              isDark ? 'bg-slate-900 border-sky-500/30 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-xl'
            }`}
          >
            <div className={`flex items-center justify-between pb-6 border-b mb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/15 ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticleId(null)}
                className="text-xs text-sky-500 hover:underline font-semibold"
              >
                Close Article
              </button>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {activeArticle.title}
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className={`mt-8 pt-6 border-t flex justify-between items-center ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                onClick={() => setActiveArticleId(null)}
                className={`text-xs ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Back to all articles
              </button>
              <button
                onClick={() => onNavigate('request-consultation')}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-colors"
              >
                Discuss This Topic With Us
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INSIGHTS_DATA.map((article) => (
            <div
              key={article.id}
              className={`rounded-3xl p-7 sm:p-8 border transition-all flex flex-col justify-between ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-sky-500/30'
                  : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {article.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {article.summary}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center justify-between ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                <span className="text-[11px] font-mono text-slate-500">Sample Article</span>
                <button
                  onClick={() => {
                    setActiveArticleId(article.id);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>Read Full Article</span>
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
