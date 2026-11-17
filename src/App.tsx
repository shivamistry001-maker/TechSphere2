/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PageId, ThemeMode } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingContact } from './components/FloatingContact.tsx';
import { LegalModal } from './components/LegalModal.tsx';
import {
  ScrollProgressBar,
  BackToTopButton,
  PageTransitionOverlay,
} from './components/motion/MotionPrimitives.tsx';
import { pageTransitionVariants } from './utils/motion.ts';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ERPSolutionsPage } from './pages/ERPSolutionsPage.tsx';
import { ERPNextPage } from './pages/ERPNextPage.tsx';
import { OdooPage } from './pages/OdooPage.tsx';
import { ZohoPage } from './pages/ZohoPage.tsx';
import { ITSolutionsPage } from './pages/ITSolutionsPage.tsx';
import { IndustriesPage } from './pages/IndustriesPage.tsx';
import { CaseStudiesPage } from './pages/CaseStudiesPage.tsx';
import { PortfolioPage } from './pages/PortfolioPage.tsx';
import { InsightsPage } from './pages/InsightsPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('techsphere_theme_v2');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light';
  });
  const [selectedService, setSelectedService] = useState<string>('ERP Consultancy');
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('techsphere_theme_v2', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const handleConsultationSelect = (serviceName: string, notes: string = '') => {
    setSelectedService(serviceName);
    setSelectedMessage(notes);
    setCurrentPage('request-consultation');
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#090909] text-[#F5F5F5] selection:bg-white selection:text-[#090909]'
          : 'bg-white text-[#172033] selection:bg-sky-500 selection:text-white'
      }`}
    >
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar theme={theme} />

      {/* Non-Blocking Futuristic Page Transition Sweep */}
      <PageTransitionOverlay transitionKey={currentPage} theme={theme} />

      {/* Top Sticky Enterprise Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Body with Animated Transition */}
      <main className={`flex-1 ${currentPage === 'home' ? '' : 'pt-24 pb-16'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={prefersReducedMotion ? undefined : pageTransitionVariants}
            initial={prefersReducedMotion ? false : 'initial'}
            animate="animate"
            exit={prefersReducedMotion ? undefined : 'exit'}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                theme={theme}
                onSelectServiceForConsultation={(svc) => handleConsultationSelect(svc)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage onNavigate={handleNavigate} theme={theme} />
            )}

            {currentPage === 'services' && (
              <ServicesPage
                onNavigate={handleNavigate}
                theme={theme}
                onSelectServiceForConsultation={(svc) => handleConsultationSelect(svc)}
              />
            )}

            {currentPage === 'erp-solutions' && (
              <ERPSolutionsPage
                onNavigate={handleNavigate}
                theme={theme}
                onSelectRecommendation={handleConsultationSelect}
              />
            )}

            {currentPage === 'erpnext' && (
              <ERPNextPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={(svc) => handleConsultationSelect(svc)}
              />
            )}

            {currentPage === 'odoo' && (
              <OdooPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={(svc) => handleConsultationSelect(svc)}
              />
            )}

            {currentPage === 'zoho' && (
              <ZohoPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={(svc) => handleConsultationSelect(svc)}
              />
            )}

            {currentPage === 'it-solutions' && (
              <ITSolutionsPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={(svc) => handleConsultationSelect(svc)}
              />
            )}

            {currentPage === 'industries' && (
              <IndustriesPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={(svc) => handleConsultationSelect(svc)}
              />
            )}

            {currentPage === 'case-studies' && (
              <CaseStudiesPage onNavigate={handleNavigate} theme={theme} />
            )}

            {currentPage === 'portfolio' && (
              <PortfolioPage onNavigate={handleNavigate} theme={theme} />
            )}

            {currentPage === 'insights' && (
              <InsightsPage onNavigate={handleNavigate} theme={theme} />
            )}

            {(currentPage === 'contact' || currentPage === 'request-consultation') && (
              <ContactPage
                onNavigate={handleNavigate}
                theme={theme}
                initialService={selectedService}
                initialMessage={selectedMessage}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Enterprise Footer */}
      <Footer
        onNavigate={handleNavigate}
        theme={theme}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Floating Back-to-Top Control */}
      <BackToTopButton theme={theme} />

      {/* Floating Action Controls (WhatsApp, Direct Telephone, Email) */}
      <FloatingContact theme={theme} />

      {/* Legal & Policy Modals (Privacy, Terms, Cookies) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        theme={theme}
      />
    </div>
  );
}
