/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TechSphereLogo } from './TechSphereLogo.tsx';
import { PageId, ThemeMode } from '../types.ts';
import { COMPANY_INFO } from '../data/companyData.ts';
import {
  Phone,
  Mail,
  Globe,
  ArrowRight,
  ShieldCheck,
  FileText,
  Cookie,
  Linkedin,
  Github,
  Twitter,
  Instagram,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101B35] text-slate-300 border-t border-sky-400/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Logo, Tagline & Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-xl cursor-pointer"
            >
              <TechSphereLogo theme="dark" size="md" />
            </button>

            <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
              <strong className="text-[#38BDF8] font-semibold">
                {COMPANY_INFO.tagline}.
              </strong>{' '}
              Helping ambitious organizations simplify operations, deploy intelligent ERP platforms, and build scalable digital systems.
            </p>

            <div className="space-y-2.5 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].raw}`}
                    className="hover:text-[#38BDF8] transition-colors"
                  >
                    {COMPANY_INFO.phones[0].display}
                  </a>
                  <span className="text-slate-600">·</span>
                  <a
                    href={`tel:${COMPANY_INFO.phones[1].raw}`}
                    className="hover:text-[#38BDF8] transition-colors"
                  >
                    {COMPANY_INFO.phones[1].display}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com' },
                { label: 'X (Twitter)', icon: Twitter, href: 'https://x.com' },
                { label: 'GitHub', icon: Github, href: 'https://github.com' },
                { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`TechSphere on ${social.label}`}
                    className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/15 text-slate-300 hover:text-[#38BDF8] flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {[
                { label: 'Home', page: 'home' as PageId },
                { label: 'About', page: 'about' as PageId },
                { label: 'Services', page: 'services' as PageId },
                { label: 'Industries', page: 'industries' as PageId },
                { label: 'Case Studies', page: 'case-studies' as PageId },
                { label: 'Portfolio', page: 'portfolio' as PageId },
                { label: 'Contact', page: 'contact' as PageId },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.page)}
                    className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & ERP */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Services &amp; Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {[
                { label: 'ERP Consultancy', page: 'erp-solutions' as PageId },
                { label: 'Odoo ERP Solutions', page: 'odoo' as PageId },
                { label: 'ERPNext Solutions', page: 'erpnext' as PageId },
                { label: 'Zoho Ecosystem', page: 'zoho' as PageId },
                { label: 'Website Development', page: 'it-solutions' as PageId },
                { label: 'Business Automation', page: 'services' as PageId },
                { label: 'IT Consultancy', page: 'it-solutions' as PageId },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.page)}
                    className="hover:text-[#38BDF8] transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Consultation Card */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Ready to Modernize?
            </h4>
            <div className="rounded-2xl bg-[#0B1429] border border-sky-400/20 p-5 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Schedule an advisory discovery call to evaluate ERP platforms, automation opportunities, or custom web solutions.
              </p>
              <button
                type="button"
                onClick={() => handleNav('request-consultation')}
                className="w-full py-3 px-4 rounded-full text-xs font-bold text-[#101B35] bg-[#38BDF8] hover:bg-[#7DD3FC] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#38BDF8] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Privacy Policy</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#38BDF8] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Terms &amp; Conditions</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-[#38BDF8] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Cookie className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Cookie Policy</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
