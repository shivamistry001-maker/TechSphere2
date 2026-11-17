/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';
import { TechSphereLogo } from './TechSphereLogo.tsx';
import { PageId, ThemeMode } from '../types.ts';
import { COMPANY_INFO } from '../data/companyData.ts';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  // Monitor scroll for smooth transparent-to-glass navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu or dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (solutionsDropdownOpen) setSolutionsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, solutionsDropdownOpen]);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  const navLinkClass = (active: boolean) =>
    `relative px-2.5 xl:px-3 py-2 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-lg ${
      active
        ? isDark
          ? 'text-[#38BDF8] font-semibold'
          : 'text-[#0284C7] font-semibold'
        : isDark
        ? 'text-slate-300 hover:text-white'
        : 'text-[#172033]/80 hover:text-[#101B35]'
    }`;

  const ActiveIndicator = () => (
    <motion.span
      layoutId="nav-active-indicator"
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className="absolute left-2.5 right-2.5 bottom-0.5 h-[2px] rounded-full bg-[#38BDF8]"
    />
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#101B35]/88 backdrop-blur-xl border-b border-sky-400/15 shadow-[0_8px_30px_rgba(0,0,0,0.35)] py-3'
              : 'bg-white/88 backdrop-blur-xl border-b border-[#101B35]/[0.08] shadow-[0_6px_24px_rgba(16,27,53,0.06)] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: TechSphere Logo & Company Name */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-xl cursor-pointer"
              aria-label="TechSphere Home"
            >
              <TechSphereLogo theme={theme} size="sm" variant="full" />
            </button>

            {/* Center: Single-Row Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Primary Navigation">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={navLinkClass(currentPage === 'home')}
              >
                <span>Home</span>
                {currentPage === 'home' && <ActiveIndicator />}
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className={navLinkClass(currentPage === 'about')}
              >
                <span>About</span>
                {currentPage === 'about' && <ActiveIndicator />}
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('services')}
                className={navLinkClass(currentPage === 'services')}
              >
                <span>Services</span>
                {currentPage === 'services' && <ActiveIndicator />}
              </button>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                onMouseLeave={() => setSolutionsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('erp-solutions')}
                  className={`inline-flex items-center gap-1 ${navLinkClass(
                    ['erp-solutions', 'erpnext', 'odoo', 'zoho', 'it-solutions'].includes(currentPage)
                  )}`}
                  aria-expanded={solutionsDropdownOpen}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      solutionsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {['erp-solutions', 'erpnext', 'odoo', 'zoho', 'it-solutions'].includes(
                    currentPage
                  ) && <ActiveIndicator />}
                </button>

                {solutionsDropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-64 z-50">
                    <div
                      className={`rounded-2xl p-2 shadow-2xl ring-1 transition-all ${
                        isDark
                          ? 'bg-[#101B35]/95 backdrop-blur-xl border border-sky-400/20 shadow-black/60 ring-white/5'
                          : 'bg-white/95 backdrop-blur-xl border border-[#101B35]/10 shadow-[0_20px_45px_rgba(16,27,53,0.12)] ring-black/5'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick('erp-solutions')}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center justify-between ${
                          isDark
                            ? 'hover:bg-slate-800 text-slate-200'
                            : 'hover:bg-[#F5FAFE] text-[#172033]'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs">All ERP Solutions</span>
                          <span className="text-[11px] text-[#0284C7] dark:text-[#38BDF8]">
                            Comparison &amp; Overview
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                      </button>
                      <div
                        className={`my-1 border-t ${
                          isDark ? 'border-slate-800' : 'border-slate-100'
                        }`}
                      />
                      {[
                        { page: 'erpnext' as PageId, title: 'ERPNext', sub: 'Open-source & manufacturing' },
                        { page: 'odoo' as PageId, title: 'Odoo', sub: 'Modular & retail POS' },
                        { page: 'zoho' as PageId, title: 'Zoho Ecosystem', sub: 'Books, CRM & cloud suite' },
                        { page: 'it-solutions' as PageId, title: 'IT & Web Solutions', sub: 'Custom apps & automation' },
                      ].map((item) => (
                        <button
                          key={item.page}
                          type="button"
                          onClick={() => handleNavClick(item.page)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors block ${
                            isDark
                              ? 'hover:bg-slate-800 text-slate-300'
                              : 'hover:bg-[#F5FAFE] text-[#172033]'
                          }`}
                        >
                          <span className="font-semibold block">{item.title}</span>
                          <span
                            className={`block text-[10px] ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {item.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleNavClick('industries')}
                className={navLinkClass(currentPage === 'industries')}
              >
                <span>Industries</span>
                {currentPage === 'industries' && <ActiveIndicator />}
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('case-studies')}
                className={navLinkClass(currentPage === 'case-studies')}
              >
                <span>Case Studies</span>
                {currentPage === 'case-studies' && <ActiveIndicator />}
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className={navLinkClass(currentPage === 'contact')}
              >
                <span>Contact</span>
                {currentPage === 'contact' && <ActiveIndicator />}
              </button>
            </nav>

            {/* Right: Theme Toggle & Book a Consultation CTA */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  isDark
                    ? 'bg-[#101B35]/80 border-sky-400/20 text-[#38BDF8] hover:bg-slate-800'
                    : 'bg-white/80 border-[#101B35]/10 text-[#101B35] hover:bg-[#F5FAFE]'
                }`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('request-consultation')}
                className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  isDark
                    ? 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-[#7DD3FC] hover:to-[#0EA5E9] text-[#101B35] shadow-md shadow-sky-500/25'
                    : 'bg-[#101B35] hover:bg-[#192A52] text-white shadow-[0_8px_20px_rgba(16,27,53,0.16)]'
                }`}
              >
                <span>Book a Consultation</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isDark ? 'text-[#101B35]' : 'text-[#38BDF8]'}`} />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] ${
                  isDark
                    ? 'bg-[#101B35]/90 border-sky-400/20 text-slate-100 hover:bg-slate-800'
                    : 'bg-white/90 border-[#101B35]/10 text-[#101B35] hover:bg-[#F5FAFE]'
                }`}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ANIMATED MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-40 lg:hidden overflow-y-auto pt-24 pb-8 px-6 backdrop-blur-xl ${
              isDark ? 'bg-[#101B35]/98 text-white' : 'bg-white/98 text-[#172033]'
            }`}
          >
            <div className="max-w-md mx-auto flex flex-col space-y-1.5">
              <div
                className={`border-b pb-3 mb-2 ${
                  isDark ? 'border-white/10' : 'border-[#101B35]/10'
                }`}
              >
                <span className="text-xs uppercase tracking-widest text-[#0284C7] dark:text-[#38BDF8] font-semibold">
                  Navigation
                </span>
              </div>

              {[
                { label: 'Home', page: 'home' as PageId },
                { label: 'About', page: 'about' as PageId },
                { label: 'Services', page: 'services' as PageId },
                { label: 'Solutions Overview', page: 'erp-solutions' as PageId },
                { label: '• ERPNext Solutions', page: 'erpnext' as PageId },
                { label: '• Odoo ERP Solutions', page: 'odoo' as PageId },
                { label: '• Zoho Ecosystem', page: 'zoho' as PageId },
                { label: 'IT & Web Solutions', page: 'it-solutions' as PageId },
                { label: 'Industries', page: 'industries' as PageId },
                { label: 'Case Studies', page: 'case-studies' as PageId },
                { label: 'Portfolio', page: 'portfolio' as PageId },
                { label: 'Insights & Blog', page: 'insights' as PageId },
                { label: 'Contact', page: 'contact' as PageId },
              ].map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left py-2.5 px-3.5 rounded-xl text-base font-medium transition-colors ${
                    currentPage === item.page
                      ? isDark
                        ? 'text-[#38BDF8] bg-sky-500/15 font-semibold'
                        : 'text-[#0284C7] bg-[#F5FAFE] font-semibold'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-[#172033]/80 hover:text-[#101B35] hover:bg-[#F5FAFE]'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div
                className={`pt-4 mt-4 border-t flex flex-col space-y-3 ${
                  isDark ? 'border-white/10' : 'border-[#101B35]/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('request-consultation')}
                  className="w-full py-3.5 px-4 rounded-full text-center font-semibold text-sm text-white bg-[#101B35] hover:bg-[#192A52] dark:bg-gradient-to-r dark:from-[#38BDF8] dark:to-[#0284C7] dark:text-[#101B35] shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#38BDF8] dark:text-[#101B35]" />
                </button>

                <div
                  className={`flex flex-col space-y-2 pt-2 text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].raw}`}
                    className="flex items-center gap-2 hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                    <span>{COMPANY_INFO.phones[0].display}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="flex items-center gap-2 hover:text-[#0284C7] dark:hover:text-[#38BDF8] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0284C7] dark:text-[#38BDF8]" />
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
