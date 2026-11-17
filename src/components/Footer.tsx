/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
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

export const Footer: React.FC<FooterProps> = ({ onNavigate, theme, onOpenLegal }) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#090909] text-[#A3A3A3] border-[#303030]'
          : 'bg-[#101B35] text-slate-300 border-sky-400/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Top Footer Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b ${
            isDark ? 'border-[#303030]' : 'border-white/10'
          }`}
        >
          {/* Column 1: Logo, Tagline & Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`text-left group focus:outline-none focus-visible:ring-2 rounded-xl cursor-pointer ${
                isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
              }`}
            >
              <TechSphereLogo theme="dark" size="md" />
            </button>

            <p className={`text-sm leading-relaxed max-w-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
              <strong className={`font-semibold ${isDark ? 'text-white' : 'text-[#38BDF8]'}`}>
                {COMPANY_INFO.tagline}.
              </strong>{' '}
              Helping ambitious organizations simplify operations, deploy intelligent ERP platforms, and build scalable digital systems.
            </p>

            <div className={`space-y-2.5 pt-1 text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
              <div className="flex items-center gap-2.5">
                <Globe className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].raw}`}
                    className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'}`}
                  >
                    {COMPANY_INFO.phones[0].display}
                  </a>
                  <span className={isDark ? 'text-[#737373]' : 'text-slate-600'}>·</span>
                  <a
                    href={`tel:${COMPANY_INFO.phones[1].raw}`}
                    className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'}`}
                  >
                    {COMPANY_INFO.phones[1].display}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'}`}
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
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.05 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                    aria-label={`TechSphere on ${social.label}`}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                      isDark
                        ? 'bg-[#171717] border-[#303030] hover:border-white/50 hover:bg-[#252525] text-[#D4D4D4] hover:text-white'
                        : 'bg-white/[0.06] border-white/10 hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/15 text-slate-300 hover:text-[#38BDF8]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className={`text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-[#F5F5F5]' : 'text-white'}`}>
              Navigation
            </h4>
            <ul className={`space-y-2.5 text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
              {[
                { key: 'home', label: 'Home', page: 'home' as PageId },
                { key: 'about', label: 'About', page: 'about' as PageId },
                { key: 'services', label: 'Services', page: 'services' as PageId },
                { key: 'demo-websites', label: 'Demo Websites', page: 'demo-websites' as PageId },
                { key: 'erp-showcase', label: 'ERP Showcase', page: 'erp-showcase' as PageId },
                { key: 'industries', label: 'Industries', page: 'industries' as PageId },
                { key: 'case-studies', label: 'Case Studies', page: 'case-studies' as PageId },
                { key: 'portfolio', label: 'Portfolio', page: 'portfolio' as PageId },
                { key: 'contact', label: 'Contact', page: 'contact' as PageId },
              ].map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.page)}
                    className={`transition-colors text-left cursor-pointer ${
                      isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & ERP */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className={`text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-[#F5F5F5]' : 'text-white'}`}>
              Services &amp; Solutions
            </h4>
            <ul className={`space-y-2.5 text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
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
                    className={`transition-colors text-left cursor-pointer ${
                      isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Consultation Card */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className={`text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-[#F5F5F5]' : 'text-white'}`}>
              Ready to Modernize?
            </h4>
            <div
              className={`rounded-2xl border p-5 space-y-4 ${
                isDark
                  ? 'bg-[#171717] border-[#303030]'
                  : 'bg-[#0B1429] border-sky-400/20'
              }`}
            >
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
                Schedule an advisory discovery call to evaluate ERP platforms, automation opportunities, or custom web solutions.
              </p>
              <motion.button
                type="button"
                onClick={() => handleNav('request-consultation')}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className={`group w-full py-3 px-4 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'text-[#101B35] bg-[#38BDF8] hover:bg-[#7DD3FC]'
                }`}
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'text-[#737373]' : 'text-slate-400'
          }`}
        >
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
              <span>Privacy Policy</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
              <span>Terms &amp; Conditions</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'
              }`}
            >
              <Cookie className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
              <span>Cookie Policy</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
