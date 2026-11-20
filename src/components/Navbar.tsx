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
  Globe,
  Layers,
} from 'lucide-react';
import { TechSphereLogo } from './TechSphereLogo.tsx';
import { GlassNavbar, GlassDropdown } from './glass/GlassPrimitives.tsx';
import { MagneticButton } from './motion/MotionPrimitives.tsx';
import { dropdownVariants } from '../utils/motion.ts';
import { PageId, ThemeMode } from '../types.ts';
import { COMPANY_INFO } from '../data/companyData.ts';
import { SHOWCASE_NAV_TARGETS, isShowcaseNavActive } from '../utils/showcaseLogic.ts';
import { playSound } from '../utils/soundManager.ts';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const ThemeToggleIcons: React.FC<{
  isDark: boolean;
  prefersReducedMotion: boolean;
  sizeClass: string;
}> = ({ isDark, prefersReducedMotion, sizeClass }) => {
  const iconTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 360, damping: 24, mass: 0.75 };

  return (
    <span className={`relative block shrink-0 ${sizeClass}`}>
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.55,
          rotate: isDark ? 0 : -65,
        }}
        transition={iconTransition}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className={sizeClass} />
      </motion.span>
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.55 : 1,
          rotate: isDark ? 65 : 0,
        }}
        transition={iconTransition}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className={sizeClass} />
      </motion.span>
    </span>
  );
};

export const Navbar: React.FC<NavbarProps> = React.memo(({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const wasMobileMenuOpenRef = useRef(false);
  const lockedScrollYRef = useRef(0);
  const didNavigateFromDrawerRef = useRef(false);

  // Monitor scroll for smooth transparent-to-glass navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Deterministic GPU-accelerated mount/unmount lifecycle for the mobile drawer
  // Avoids AnimatePresence stuck-exit overlays during rapid taps, Escape key, or body-lock reflows.
  useEffect(() => {
    if (mobileMenuOpen) {
      setDrawerMounted(true);
      if (prefersReducedMotion) {
        setDrawerVisible(true);
        return undefined;
      }
      const rafId = window.requestAnimationFrame(() => {
        setDrawerVisible(true);
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    setDrawerVisible(false);
    if (!drawerMounted) return undefined;

    if (prefersReducedMotion) {
      setDrawerMounted(false);
      return undefined;
    }

    const unmountTimer = window.setTimeout(() => {
      setDrawerMounted(false);
    }, 210);
    return () => window.clearTimeout(unmountTimer);
  }, [mobileMenuOpen, prefersReducedMotion, drawerMounted]);

  // Robust cross-browser body scroll lock (iOS Safari + Android Chrome) with exact scrollY restoration
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (mobileMenuOpen) {
      wasMobileMenuOpenRef.current = true;
      didNavigateFromDrawerRef.current = false;
      lockedScrollYRef.current = window.scrollY;
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${lockedScrollYRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      return () => {
        html.style.overflow = '';
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        const targetScrollY = didNavigateFromDrawerRef.current ? 0 : lockedScrollYRef.current;
        window.scrollTo({ top: targetScrollY, left: 0, behavior: 'instant' as ScrollBehavior });
      };
    }

    if (wasMobileMenuOpenRef.current) {
      wasMobileMenuOpenRef.current = false;
      if (!didNavigateFromDrawerRef.current) {
        mobileToggleRef.current?.focus({ preventScroll: true });
      }
      didNavigateFromDrawerRef.current = false;
    }
    return undefined;
  }, [mobileMenuOpen]);

  const setDropdownWithSound = (nextOpen: boolean) => {
    setSolutionsDropdownOpen((prev) => {
      if (prev !== nextOpen) {
        playSound(nextOpen ? 'ui-open' : 'ui-close');
      }
      return nextOpen;
    });
  };

  const setMobileMenuWithSound = (nextOpen: boolean) => {
    setMobileMenuOpen((prev) => {
      if (prev !== nextOpen) {
        playSound(nextOpen ? 'ui-open' : 'ui-close');
      }
      return nextOpen;
    });
  };

  // Handle ESC key and outside click to close mobile menu or dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuWithSound(false);
        if (solutionsDropdownOpen) setDropdownWithSound(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownWithSound(false);
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
    if (mobileMenuOpen) {
      didNavigateFromDrawerRef.current = true;
    }
    onNavigate(page);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  };

  const isDark = theme === 'dark';

  const navLinkClass = (active: boolean) =>
    `relative px-2.5 2xl:px-3 py-2 text-[12.5px] 2xl:text-[13px] font-medium whitespace-nowrap shrink-0 transition-[color,background-color,border-color,box-shadow] duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 rounded-xl ${
      isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
    } ${
      active
        ? isDark
          ? 'ts-glass-nav-active text-white font-semibold'
          : 'ts-glass-nav-active text-[#0284C7] font-semibold'
        : isDark
        ? 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-white/[0.06]'
        : 'text-[#172033]/85 hover:text-[#101B35] hover:bg-white/60'
    }`;

  const ActiveIndicator = () => (
    <motion.span
      layoutId="nav-active-indicator"
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className={`absolute left-3 right-3 bottom-0.5 h-[2px] rounded-full ${
        isDark ? 'bg-white' : 'bg-[#0284C7]'
      }`}
    />
  );

  const isSolutionsActive = [
    'erp-solutions',
    'erpnext',
    'odoo',
    'zoho',
    'it-solutions',
    'case-studies',
  ].includes(currentPage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? 'py-2.5 sm:py-3' : 'py-3 sm:py-4'
        }`}
      >
        {/* Sibling Liquid Glass Backdrop Plate (prevents nested backdrop-filter on child dropdowns) */}
        <GlassNavbar scrolled={isScrolled} className="z-0" />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-white/22 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#38BDF8]/45 to-transparent'
          }`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: TechSphere Logo & Company Name */}
            <motion.button
              type="button"
              onClick={() => handleNavClick('home')}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className={`flex items-center min-h-[44px] py-0.5 text-left group shrink-0 focus:outline-none focus-visible:ring-2 rounded-xl cursor-pointer ${
                isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
              }`}
              aria-label="TechSphere Home"
            >
              <TechSphereLogo theme={theme} size="sm" variant="full" />
            </motion.button>

            {/* Center: Single-Row Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1" aria-label="Primary Navigation">
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

              {/* ERP Solutions Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setDropdownWithSound(true)}
                onMouseLeave={() => setDropdownWithSound(false)}
              >
                <button
                  type="button"
                  data-sound-hover="false"
                  onClick={() => handleNavClick('erp-solutions')}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setDropdownWithSound(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1 ${navLinkClass(isSolutionsActive)}`}
                  aria-expanded={solutionsDropdownOpen}
                  aria-haspopup="menu"
                >
                  <span>ERP Solutions</span>
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
                      key="erp-solutions-dropdown"
                      variants={prefersReducedMotion ? undefined : dropdownVariants}
                      initial={prefersReducedMotion ? false : 'hidden'}
                      animate="visible"
                      exit={prefersReducedMotion ? undefined : 'exit'}
                      className="absolute left-0 top-full pt-2 w-64 z-50 origin-top-left"
                      role="menu"
                    >
                      <GlassDropdown layerName="dropdown" className="rounded-2xl p-2">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => handleNavClick('erp-solutions')}
                          className={`group/item w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center justify-between cursor-pointer ${
                            isDark
                              ? 'hover:bg-white/[0.08] text-[#F5F5F5]'
                              : 'hover:bg-white/80 text-[#172033]'
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
                              isDark ? 'text-white' : 'text-[#0284C7]'
                            }`}
                          />
                        </button>
                        <div
                          className={`my-1 border-t ${
                            isDark ? 'border-white/10' : 'border-[#101B35]/10'
                          }`}
                        />
                        {[
                          { page: 'erpnext' as PageId, title: 'ERPNext', sub: 'Open-source & manufacturing' },
                          { page: 'odoo' as PageId, title: 'Odoo', sub: 'Modular & retail POS' },
                          { page: 'zoho' as PageId, title: 'Zoho Ecosystem', sub: 'Books, CRM & cloud suite' },
                          { page: 'it-solutions' as PageId, title: 'IT & Web Solutions', sub: 'Custom apps & automation' },
                          { page: 'case-studies' as PageId, title: 'Case Studies', sub: 'Real client transformations' },
                        ].map((item) => (
                          <button
                            key={item.page}
                            type="button"
                            role="menuitem"
                            onClick={() => handleNavClick(item.page)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors block cursor-pointer ${
                              currentPage === item.page
                                ? isDark
                                  ? 'bg-white/[0.11] text-white'
                                  : 'bg-white/85 text-[#0284C7] shadow-xs'
                                : isDark
                                ? 'hover:bg-white/[0.08] text-[#F5F5F5]'
                                : 'hover:bg-white/75 text-[#172033]'
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
                      </GlassDropdown>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                onClick={() => handleNavClick(SHOWCASE_NAV_TARGETS.demoWebsites.page)}
                className={`inline-flex items-center gap-1.5 ${navLinkClass(
                  isShowcaseNavActive(currentPage, SHOWCASE_NAV_TARGETS.demoWebsites.page)
                )}`}
              >
                <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" aria-hidden="true" />
                <span>{SHOWCASE_NAV_TARGETS.demoWebsites.label}</span>
                {isShowcaseNavActive(currentPage, SHOWCASE_NAV_TARGETS.demoWebsites.page) && (
                  <ActiveIndicator />
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                onClick={() => handleNavClick(SHOWCASE_NAV_TARGETS.erpShowcase.page)}
                className={`inline-flex items-center gap-1.5 ${navLinkClass(
                  isShowcaseNavActive(currentPage, SHOWCASE_NAV_TARGETS.erpShowcase.page)
                )}`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0 opacity-80" aria-hidden="true" />
                <span>{SHOWCASE_NAV_TARGETS.erpShowcase.label}</span>
                {isShowcaseNavActive(currentPage, SHOWCASE_NAV_TARGETS.erpShowcase.page) && (
                  <ActiveIndicator />
                )}
              </motion.button>

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
                onClick={() => handleNavClick('portfolio')}
                className={navLinkClass(currentPage === 'portfolio')}
              >
                <span>Portfolio</span>
                {currentPage === 'portfolio' && <ActiveIndicator />}
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
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                type="button"
                onClick={onToggleTheme}
                data-testid="theme-toggle-button"
                data-sound="none"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.07 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.91 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24, mass: 0.7 }}
                className={`ts-glass-control relative w-11 h-11 flex items-center justify-center rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 overflow-hidden ${
                  isDark
                    ? 'text-[#F5F5F5] focus-visible:ring-white'
                    : 'text-[#101B35] focus-visible:ring-[#38BDF8]'
                }`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                aria-pressed={isDark}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {/* Subtle GPU-friendly icon crossfade & spring rotation (non-blocking for rapid clicks) */}
                <ThemeToggleIcons
                  isDark={isDark}
                  prefersReducedMotion={Boolean(prefersReducedMotion)}
                  sizeClass="w-[18px] h-[18px]"
                />
              </motion.button>

              <MagneticButton
                type="button"
                onClick={() => handleNavClick('request-consultation')}
                className={`ts-glass-btn-primary group hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'text-[#090909] focus-visible:ring-white'
                    : 'text-white focus-visible:ring-[#38BDF8]'
                }`}
              >
                <span>Book a Consultation</span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${
                    isDark ? 'text-[#090909]' : 'text-[#38BDF8]'
                  }`}
                />
              </MagneticButton>

              {/* Mobile & Tablet Hamburger Toggle */}
              <motion.button
                ref={mobileToggleRef}
                type="button"
                data-sound="none"
                data-testid="mobile-menu-toggle"
                onClick={() => setMobileMenuWithSound(!mobileMenuOpen)}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                className={`ts-glass-control xl:hidden w-11 h-11 flex items-center justify-center rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                  isDark
                    ? 'text-[#F5F5F5] focus-visible:ring-white'
                    : 'text-[#101B35] focus-visible:ring-[#38BDF8]'
                }`}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* ANIMATED MOBILE & TABLET NAVIGATION DRAWER */}
      {drawerMounted && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          data-glass-layer="mobile-drawer"
          className={`ts-glass-drawer fixed inset-0 z-40 xl:hidden h-[100dvh] overflow-y-auto overscroll-contain pt-[82px] pb-[max(2rem,env(safe-area-inset-bottom))] px-5 sm:px-6 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
            drawerVisible
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-3 pointer-events-none'
          } ${isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'}`}
        >
          <div className="max-w-md mx-auto flex flex-col space-y-1">
            <div
              className={`border-b pb-3 mb-2 flex items-center justify-between gap-3 ${
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
              <button
                type="button"
                onClick={onToggleTheme}
                data-testid="mobile-drawer-theme-toggle"
                data-sound="none"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                aria-pressed={isDark}
                className={`ts-glass-control inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold transition-[color,background-color,transform] duration-150 active:scale-95 cursor-pointer ${
                  isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'
                }`}
              >
                <ThemeToggleIcons
                  isDark={isDark}
                  prefersReducedMotion={Boolean(prefersReducedMotion)}
                  sizeClass="w-4 h-4"
                />
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

              {[
                { key: 'home', label: 'Home', page: 'home' as PageId },
                { key: 'about', label: 'About', page: 'about' as PageId },
                { key: 'services', label: 'Services', page: 'services' as PageId },
                { key: 'erp-solutions', label: 'ERP Solutions Overview', page: 'erp-solutions' as PageId },
                { key: 'erpnext', label: '• ERPNext Solutions', page: 'erpnext' as PageId },
                { key: 'odoo', label: '• Odoo ERP Solutions', page: 'odoo' as PageId },
                { key: 'zoho', label: '• Zoho Ecosystem', page: 'zoho' as PageId },
                { key: 'it-solutions', label: 'IT & Web Solutions', page: 'it-solutions' as PageId },
                {
                  key: 'demo-websites',
                  label: SHOWCASE_NAV_TARGETS.demoWebsites.label,
                  page: SHOWCASE_NAV_TARGETS.demoWebsites.page,
                  icon: 'globe' as const,
                },
                {
                  key: 'erp-showcase',
                  label: SHOWCASE_NAV_TARGETS.erpShowcase.label,
                  page: SHOWCASE_NAV_TARGETS.erpShowcase.page,
                  icon: 'layers' as const,
                },
                { key: 'industries', label: 'Industries', page: 'industries' as PageId },
                { key: 'portfolio', label: 'Portfolio', page: 'portfolio' as PageId },
                { key: 'case-studies', label: 'Case Studies', page: 'case-studies' as PageId },
                { key: 'contact', label: 'Contact', page: 'contact' as PageId },
              ].map((item) => {
                const isItemActive = currentPage === item.page;

                return (
                  <button
                    key={item.key}
                    type="button"
                    aria-current={isItemActive ? 'page' : undefined}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center gap-2.5 text-left min-h-[44px] py-2.5 px-3.5 rounded-xl text-[15px] sm:text-base font-medium transition-colors active:scale-[0.99] cursor-pointer focus:outline-none focus-visible:ring-2 ${
                      isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-[#38BDF8]'
                    } ${
                      isItemActive
                        ? isDark
                          ? 'ts-glass-drawer-item text-white font-semibold'
                          : 'ts-glass-drawer-item text-[#0284C7] font-semibold'
                        : isDark
                        ? 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-white/[0.06]'
                        : 'text-[#172033]/85 hover:text-[#101B35] hover:bg-white/65'
                    }`}
                  >
                    {item.icon === 'globe' && (
                      <Globe className="w-4 h-4 shrink-0 opacity-80" aria-hidden="true" />
                    )}
                    {item.icon === 'layers' && (
                      <Layers className="w-4 h-4 shrink-0 opacity-80" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div
                className={`pt-4 mt-4 border-t flex flex-col space-y-3 ${
                  isDark ? 'border-white/10' : 'border-[#101B35]/10'
                }`}
              >
                <button
                  type="button"
                  data-sound="cta"
                  onClick={() => handleNavClick('request-consultation')}
                  className={`ts-glass-btn-primary w-full py-3.5 px-4 rounded-full text-center font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer ${
                    isDark ? 'text-[#090909]' : 'text-white'
                  }`}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight
                    className={`w-4 h-4 ${isDark ? 'text-[#090909]' : 'text-[#38BDF8]'}`}
                  />
                </button>

                <div
                  className={`flex flex-col pt-1 text-xs ${
                    isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                  }`}
                >
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].international}`}
                    className={`flex items-center gap-2.5 min-h-[44px] py-2 transition-colors ${
                      isDark ? 'hover:text-white' : 'hover:text-[#0284C7]'
                    }`}
                  >
                    <Phone className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'}`} />
                    <span>{COMPANY_INFO.phones[0].display}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className={`flex items-center gap-2.5 min-h-[44px] py-2 transition-colors ${
                      isDark ? 'hover:text-white' : 'hover:text-[#0284C7]'
                    }`}
                  >
                    <Mail className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'}`} />
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
});
