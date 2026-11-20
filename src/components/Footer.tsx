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

export const Footer: React.FC<FooterProps> = React.memo(({ onNavigate, theme, onOpenLegal }) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer
      className={`relative overflow-hidden border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#090909] text-[#A3A3A3] border-white/10'
          : 'bg-[#101B35] text-slate-300 border-sky-400/20'
      }`}
    >
      {/* Subtle Top Reflective Specular Hairline */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-white/25 to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#38BDF8]/55 to-transparent'
        }`}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
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
              className={`inline-flex items-center min-h-[44px] py-0.5 text-left group focus:outline-none focus-visible:ring-2 rounded-xl cursor-pointer ${
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
                <div className="flex flex-wrap items-center gap-x-2">
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].international}`}
                    className={`inline-flex items-center min-h-[44px] lg:min-h-0 transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'}`}
                  >
                    {COMPANY_INFO.phones[0].display}
                  </a>
                  <span className={isDark ? 'text-[#737373]' : 'text-slate-600'}>·</span>
                  <a
                    href={`tel:${COMPANY_INFO.phones[1].international}`}
                    className={`inline-flex items-center min-h-[44px] lg:min-h-0 transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'}`}
                  >
                    {COMPANY_INFO.phones[1].display}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className={`inline-flex items-center min-h-[44px] lg:min-h-0 transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'}`}
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Links (rendered only when official TechSphere profile URLs are configured) */}
            {COMPANY_INFO.socialLinks.length > 0 && (
              <div className="flex items-center gap-2.5 pt-2">
                {COMPANY_INFO.socialLinks.map((social) => {
                  const iconByPlatform = {
                    linkedin: Linkedin,
                    twitter: Twitter,
                    github: Github,
                    instagram: Instagram,
                  } as const;
                  const Icon = iconByPlatform[social.platform];
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.05 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                      aria-label={`TechSphere on ${social.label}`}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center transition-[color,background-color,border-color,transform] duration-200 ${
                        isDark
                          ? 'ts-glass-control text-[#D4D4D4] hover:text-white'
                          : 'bg-white/[0.08] border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] hover:border-[#38BDF8]/60 hover:bg-[#38BDF8]/20 text-slate-200 hover:text-white'
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className={`text-xs font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-[#F5F5F5]' : 'text-white'}`}>
              Navigation
            </h4>
            <ul className={`space-y-0 lg:space-y-2.5 text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
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
                    className={`inline-flex items-center min-h-[44px] min-w-[44px] lg:min-h-0 lg:min-w-0 transition-colors text-left cursor-pointer ${
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
            <ul className={`space-y-0 lg:space-y-2.5 text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
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
                    className={`inline-flex items-center min-h-[44px] min-w-[44px] lg:min-h-0 lg:min-w-0 transition-colors text-left cursor-pointer ${
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
              data-glass-layer="footer-card"
              className={`rounded-2xl border p-5 space-y-4 ${
                isDark
                  ? 'ts-glass-footer-card'
                  : 'bg-white/[0.07] border-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_20px_40px_rgba(0,0,0,0.26)] backdrop-blur-md'
              }`}
            >
              <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A3A3A3]' : 'text-slate-200'}`}>
                Schedule an advisory discovery call to evaluate ERP platforms, automation opportunities, or custom web solutions.
              </p>
              <motion.button
                type="button"
                onClick={() => handleNav('request-consultation')}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className={`group w-full min-h-[44px] py-3 px-4 rounded-full text-xs font-bold transition-[color,background-color,box-shadow,transform] duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'ts-glass-btn-primary text-[#090909]'
                    : 'text-[#101B35] bg-gradient-to-b from-[#7DD3FC] to-[#38BDF8] hover:from-[#BAE6FD] hover:to-[#38BDF8] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_24px_rgba(56,189,248,0.28)]'
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
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className={`min-h-[44px] lg:min-h-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
              <span>Privacy Policy</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className={`min-h-[44px] lg:min-h-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark ? 'hover:text-white' : 'hover:text-[#38BDF8]'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}`} />
              <span>Terms &amp; Conditions</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('cookies')}
              className={`min-h-[44px] lg:min-h-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
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
});
