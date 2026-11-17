/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { CheckCircle2, ArrowRight, Database, Code, Globe, Zap, Cloud, Network } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onSelectServiceForConsultation?: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  theme,
  onSelectServiceForConsultation,
}) => {
  const isDark = theme === 'dark';

  const iconMap: { [key: string]: React.ElementType } = {
    'erp-consulting': Database,
    'custom-software': Code,
    'web-development': Globe,
    'business-automation': Zap,
    'cloud-infrastructure': Cloud,
    'system-integration': Network,
  };

  const handleConsultService = (srvTitle: string) => {
    if (onSelectServiceForConsultation) {
      onSelectServiceForConsultation(srvTitle);
    }
    onNavigate('request-consultation');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Professional Services Catalog
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Comprehensive IT &amp; ERP Engineering Services
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          From full enterprise ERP implementations and legacy data sanitization to bespoke cloud web applications and multi-system API connectors.
        </p>
      </section>

      {/* Services Detailed Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {SERVICES_DATA.map((service, idx) => {
          const IconComp = iconMap[service.id] || Database;
          return (
            <div
              key={service.id}
              className={`rounded-3xl p-8 sm:p-12 border transition-all ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-sky-500/30'
                  : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-sky-400 font-semibold">
                        SERVICE 0{idx + 1}
                      </span>
                      <h2
                        className={`text-xl sm:text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Expected Business Deliverables
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.deliverables.map((item) => (
                        <div key={item} className={`flex items-start gap-2 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleConsultService(service.title)}
                      className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 transition-all flex items-center gap-2"
                    >
                      <span>Consult On This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h4 className={`text-xs font-bold uppercase tracking-wider text-sky-400`}>
                    Core Focus Areas
                  </h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, sIdx) => (
                      <li key={feature} className={`flex items-start gap-3 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-500 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                      Target Ecosystem
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['ERPNext', 'Odoo', 'Zoho', 'PostgreSQL', 'Cloud & APIs'].map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded bg-sky-500/10 text-sky-300 font-mono border border-sky-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
