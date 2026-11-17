/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { COMPANY_INFO } from '../data/companyData.ts';
import {
  Target,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe2,
  Layers,
  ArrowRight,
  Code2,
  Lock,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';

  const values = [
    {
      title: 'Engineering Rigor Over Fluff',
      description:
        'We do not sell pre-packaged buzzwords or generic templates. We inspect your data schemas, interview line managers, and engineer robust digital systems that stand up to high transaction volumes.',
      icon: Code2,
    },
    {
      title: 'Zero Vendor Lock-In',
      description:
        'We champion open architectures, clean standard APIs, and complete client data sovereignty. You own your code, your database, and your infrastructure.',
      icon: Lock,
    },
    {
      title: 'Pragmatic, Staged Rollouts',
      description:
        'Big-bang enterprise IT migrations frequently cause operational shock. We deploy modular, phased rollouts that prove value at every milestone without disrupting daily fulfillment.',
      icon: Layers,
    },
    {
      title: 'Long-Term Partnership & Hypercare',
      description:
        'Go-live is not the finish line; it is the beginning of optimization. We provide active hypercare, staff training, and proactive maintenance as your operations evolve.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pt-8 sm:pt-14">
      {/* 1. Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          About TechSphere
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Engineering Scalable Business Systems for the Modern Enterprise.
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {COMPANY_INFO.name} was established with a clear mandate: bridge the divide between complex operational challenges and modern, open-source and cloud ERP technologies.
        </p>
      </section>

      {/* 2. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`rounded-3xl p-8 border ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Mission
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {COMPANY_INFO.about.mission}
            </p>
          </div>

          <div
            className={`rounded-3xl p-8 border ${
              isDark
                ? 'bg-slate-900/60 border-slate-800'
                : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Vision
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {COMPANY_INFO.about.vision}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Guiding Philosophy
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Built on Transparency &amp; Craftsmanship
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const IconComp = v.icon;
            return (
              <div
                key={v.title}
                className={`rounded-2xl p-6 border transition-all ${
                  isDark
                    ? 'bg-slate-900/40 border-slate-800 hover:border-sky-500/30'
                    : 'bg-white border-slate-200 shadow-md shadow-slate-200/30'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {v.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Remote Worldwide Delivery Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl p-8 sm:p-12 border ${
            isDark
              ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-sky-500/20'
              : 'bg-gradient-to-r from-sky-50 via-white to-sky-50 border-slate-200 shadow-xl'
          }`}
        >
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400">
              <Globe2 className="w-4 h-4" />
              <span>Global Operational Reach</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Remote Worldwide Delivery, Local Precision
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              We operate seamlessly across international timezones using modern cloud development sandboxes, automated version control, and clear asynchronous documentation. Whether you are scaling manufacturing in Gujarat, distributing wholesale across the United States, or running an agency in Europe, TechSphere delivers consistent velocity.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('request-consultation')}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 transition-all flex items-center gap-2"
              >
                <span>Book a Strategic Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
