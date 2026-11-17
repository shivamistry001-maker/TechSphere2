/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { CheckCircle2, ArrowRight, Code, Cloud, Network, ShieldCheck, Database, Cpu } from 'lucide-react';

interface ITSolutionsPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onBookConsultation?: (serviceName: string) => void;
}

export const ITSolutionsPage: React.FC<ITSolutionsPageProps> = ({
  onNavigate,
  theme,
  onBookConsultation,
}) => {
  const isDark = theme === 'dark';

  const handleConsult = () => {
    if (onBookConsultation) {
      onBookConsultation('Custom IT & Cloud Architecture');
    }
    onNavigate('request-consultation');
  };

  const capabilities = [
    {
      title: 'Custom Business Web Applications',
      desc: 'High-throughput B2B dealer portals, customer self-service extranets, and field technician mobile apps engineered with React, TypeScript, Node.js, and PostgreSQL.',
      icon: Code,
    },
    {
      title: 'Cloud Infrastructure & Linux DevOps',
      desc: 'Production-ready deployment on AWS, DigitalOcean, Hetzner, or private data centers using Docker containers, Nginx reverse proxies, SSL automation, and automated backups.',
      icon: Cloud,
    },
    {
      title: 'API Engineering & Webhook Pipelines',
      desc: 'Robust RESTful middleware connecting ERP databases with payment processors (Stripe, Razorpay), logistics carriers, CRM systems, and marketplace storefronts.',
      icon: Network,
    },
    {
      title: 'Database Architecture & Query Optimization',
      desc: 'Relational data modeling, index optimization, foreign key constraints, connection pooling, and automated incremental database backups with zero data loss.',
      icon: Database,
    },
    {
      title: 'Workflow Automation & Scripting',
      desc: 'Eliminate manual copy-paste tasks between systems using automated scheduled background jobs, webhook triggers, and event-driven microservices.',
      icon: Cpu,
    },
    {
      title: 'Security Hardening & Access Control',
      desc: 'Role-based access control (RBAC), multi-factor authentication enforcement, encrypted data transmission, and audit trail logging.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Digital Engineering
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Custom IT Solutions, Cloud Architecture &amp; Web Applications
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          When commercial off-the-shelf software falls short of your operational moat, our engineering team designs, builds, and maintains custom software architectures tailored to your exact rules.
        </p>
        <div className="pt-6 flex justify-center">
          <button
            onClick={handleConsult}
            className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 shadow-lg shadow-sky-600/30 transition-all flex items-center gap-2"
          >
            <span>Discuss Custom Software Engineering</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const IconComp = cap.icon;
            return (
              <div
                key={cap.title}
                className={`rounded-2xl p-6 border ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200 shadow-md shadow-slate-200/40'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {cap.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
