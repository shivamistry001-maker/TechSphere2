/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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
import { MagneticButton } from './motion/MotionPrimitives.tsx';
import { dropdownVariants, EASE_PREMIUM } from '../utils/motion.ts';
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key and outside click to close mobile menu or dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (solutionsDropdownOpen) setSolutionsDropdownOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, solutionsDropdownOpen]);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const isDark = theme === 'dark';

  const navLinkClass = (active: boolean) =>
    `relative px-2.5 xl:px-3 py-2 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 rounded-lg ${
      isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
    } ${
      active
        ? isDark
          ? 'text-white font-semibold'
          : 'text-[#0284C7] font-semibold'
        : isDark
        ? 'text-[#A3A3A3] hover:text-[#F5F5F5]'
        : 'text-[#172033]/80 hover:text-[#101B35]'
    }`;

  const ActiveIndicator = () => (
    <motion.span
      layoutId="nav-active-indicator"
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className={`absolute left-2.5 right-2.5 bottom-0.5 h-[2px] rounded-full ${
        isDark ? 'bg-white' : 'bg-[#38BDF8]'
      }`}
    />
  );

  const isSolutionsActive = ['erp-solutions', 'erpnext', 'odoo', 'zoho', 'it-solutions'].includes(
    currentPage
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-[#090909]/88 backdrop-blur-xl border-b border-[#303030] shadow-[0_8px_30px_rgba(0,0,0,0.65)] py-3'
              : 'bg-white/88 backdrop-blur-xl border-b border-[#101B35]/[0.08] shadow-[0_6px_24px_rgba(16,27,53,0.06)] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: TechSphere Logo & Company Name */}
            <motion.button
              type="button"
              onClick={() => handleNavClick('home')}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className={`flex items-center text-left group shrink-0 focus:outline-none focus-visible:ring-2 rounded-xl cursor-pointer ${
                isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
              }`}
              aria-label="TechSphere Home"
            >
              <TechSphereLogo theme={theme} size="sm" variant="full" />
            </motion.button>

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
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                onMouseLeave={() => setSolutionsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('erp-solutions')}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setSolutionsDropdownOpen(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1 ${navLinkClass(isSolutionsActive)}`}
                  aria-expanded={solutionsDropdownOpen}
                  aria-haspopup="menu"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      solutionsDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {isSolutionsActive && <ActiveIndicator />}
                </button>

                <AnimatePresence>
                  {solutionsDropdownOpen && (
                    <motion.div
                      variants={prefersReducedMotion ? undefined : dropdownVariants}
                      initial={prefersReducedMotion ? false : 'hidden'}
                      animate="visible"
                      exit={prefersReducedMotion ? undefined : 'exit'}
                      className="absolute left-0 top-full pt-2 w-64 z-50 origin-top-left"
                      role="menu"
                    >
                      <div
                        className={`rounded-2xl p-2 shadow-2xl ring-1 transition-all ${
                          isDark
                            ? 'bg-[#171717]/95 backdrop-blur-xl border border-[#303030] shadow-black/80 ring-white/5'
                            : 'bg-white/95 backdrop-blur-xl border border-[#101B35]/10 shadow-[0_20px_45px_rgba(16,27,53,0.12)] ring-black/5'
                        }`}
                      >
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => handleNavClick('erp-solutions')}
                          className={`group/item w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center justify-between cursor-pointer ${
                            isDark
                              ? 'hover:bg-[#252525] text-[#F5F5F5]'
                              : 'hover:bg-[#F5FAFE] text-[#172033]'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-xs">All ERP Solutions</span>
                            <span
                              className={`text-[11px] ${
                                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                              }`}
                            >
                              Comparison &amp; Overview
                            </span>
                          </div>
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-transform duration-200 group-hover/item:translate-x-0.5 ${
                              isDark ? 'text-white' : 'text-[#38BDF8]'
                            }`}
                          />
                        </button>
                        <div
                          className={`my-1 border-t ${
                            isDark ? 'border-[#303030]' : 'border-slate-100'
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
                            role="menuitem"
                            onClick={() => handleNavClick(item.page)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors block cursor-pointer ${
                              currentPage === item.page
                                ? isDark
                                  ? 'bg-[#252525] text-white'
                                  : 'bg-[#F5FAFE] text-[#0284C7]'
                                : isDark
                                ? 'hover:bg-[#252525] text-[#F5F5F5]'
                                : 'hover:bg-[#F5FAFE] text-[#172033]'
                            }`}
                          >
                            <span className="font-semibold block">{item.title}</span>
                            <span
                              className={`block text-[10px] ${
                                isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                              }`}
                            >
                              {item.sub}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              <motion.button
                type="button"
                onClick={onToggleTheme}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                className={`p-2 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 overflow-hidden ${
                  isDark
                    ? 'bg-[#171717] border-[#303030] text-[#F5F5F5] hover:bg-[#252525] focus-visible:ring-white'
                    : 'bg-white/80 border-[#101B35]/10 text-[#101B35] hover:bg-[#F5FAFE] focus-visible:ring-[#38BDF8]'
                }`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.span
                      key="sun"
                      initial={prefersReducedMotion ? false : { rotate: -45, opacity: 0, scale: 0.7 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={prefersReducedMotion ? undefined : { rotate: 45, opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.16, ease: EASE_PREMIUM }}
                      className="block"
                    >
                      <Sun className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={prefersReducedMotion ? false : { rotate: 45, opacity: 0, scale: 0.7 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={prefersReducedMotion ? undefined : { rotate: -45, opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.16, ease: EASE_PREMIUM }}
                      className="block"
                    >
                      <Moon className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <MagneticButton
                type="button"
                onClick={() => handleNavClick('request-consultation')}
                className={`group hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'bg-white hover:bg-[#D4D4D4] text-[#090909] shadow-md shadow-black/40 focus-visible:ring-white'
                    : 'bg-[#101B35] hover:bg-[#192A52] text-white shadow-[0_8px_20px_rgba(16,27,53,0.16)] focus-visible:ring-[#38BDF8]'
                }`}
              >
                <span>Book a Consultation</span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${
                    isDark ? 'text-[#090909]' : 'text-[#38BDF8]'
                  }`}
                />
              </MagneticButton>

              {/* Mobile Hamburger Toggle */}
              <motion.button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                className={`lg:hidden p-2.5 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'bg-[#171717] border-[#303030] text-[#F5F5F5] hover:bg-[#252525] focus-visible:ring-white'
                    : 'bg-white/90 border-[#101B35]/10 text-[#101B35] hover:bg-[#F5FAFE] focus-visible:ring-[#38BDF8]'
                }`}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* ANIMATED MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
            transition={{ duration: 0.22, ease: EASE_PREMIUM }}
            className={`fixed inset-0 z-40 lg:hidden overflow-y-auto pt-24 pb-8 px-6 backdrop-blur-xl ${
              isDark ? 'bg-[#090909]/98 text-[#F5F5F5]' : 'bg-white/98 text-[#172033]'
            }`}
          >
            <div className="max-w-md mx-auto flex flex-col space-y-1.5">
              <div
                className={`border-b pb-3 mb-2 ${
                  isDark ? 'border-[#303030]' : 'border-[#101B35]/10'
                }`}
              >
                <span
                  className={`text-xs uppercase tracking-widest font-semibold ${
                    isDark ? 'text-[#A3A3A3]' : 'text-[#0284C7]'
                  }`}
                >
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
              ].map((item, idx) => (
                <motion.button
                  key={item.page}
                  type="button"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: Math.min(idx * 0.02, 0.2) }}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left py-2.5 px-3.5 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    currentPage === item.page
                      ? isDark
                        ? 'text-white bg-[#1D1D1D] border border-[#303030] font-semibold'
                        : 'text-[#0284C7] bg-[#F5FAFE] font-semibold'
                      : isDark
                      ? 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#171717]'
                      : 'text-[#172033]/80 hover:text-[#101B35] hover:bg-[#F5FAFE]'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <div
                className={`pt-4 mt-4 border-t flex flex-col space-y-3 ${
                  isDark ? 'border-[#303030]' : 'border-[#101B35]/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick('request-consultation')}
                  className={`w-full py-3.5 px-4 rounded-full text-center font-semibold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                    isDark
                      ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                      : 'bg-[#101B35] hover:bg-[#192A52] text-white'
                  }`}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight
                    className={`w-4 h-4 ${isDark ? 'text-[#090909]' : 'text-[#38BDF8]'}`}
                  />
                </button>

                <div
                  className={`flex flex-col space-y-2 pt-2 text-xs ${
                    isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                  }`}
                >
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].raw}`}
                    className={`flex items-center gap-2 transition-colors ${
                      isDark ? 'hover:text-white' : 'hover:text-[#0284C7]'
                    }`}
                  >
                    <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'}`} />
                    <span>{COMPANY_INFO.phones[0].display}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className={`flex items-center gap-2 transition-colors ${
                      isDark ? 'hover:text-white' : 'hover:text-[#0284C7]'
                    }`}
                  >
                    <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'}`} />
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
