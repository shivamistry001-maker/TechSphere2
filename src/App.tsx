/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
import { EASE_PREMIUM } from './utils/motion.ts';
import {
  PAGE_SEO_META,
  getPageFromPathname,
  getPathForPage,
} from './utils/routing.ts';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ERPSolutionsPage } from './pages/ERPSolutionsPage.tsx';
import { ERPNextPage } from './pages/ERPNextPage.tsx';
import { OdooPage } from './pages/OdooPage.tsx';
import { ZohoPage } from './pages/ZohoPage.tsx';
import { ITSolutionsPage } from './pages/ITSolutionsPage.tsx';
import { DemoWebsitesPage } from './pages/DemoWebsitesPage.tsx';
import { ERPShowcasePage } from './pages/ERPShowcasePage.tsx';
import { IndustriesPage } from './pages/IndustriesPage.tsx';
import { CaseStudiesPage } from './pages/CaseStudiesPage.tsx';
import { PortfolioPage } from './pages/PortfolioPage.tsx';
import { InsightsPage } from './pages/InsightsPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    getPageFromPathname(window.location.pathname)
  );
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

  // Sync browser back/forward navigation with URL pathname
  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getPageFromPathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update document title & meta description per active route for SEO
  useEffect(() => {
    const seo = PAGE_SEO_META[currentPage] ?? PAGE_SEO_META.home;
    document.title = seo.title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', seo.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', seo.description);
    }
  }, [currentPage]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (page: PageId) => {
    const targetPath = getPathForPage(page);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion || currentPage !== page ? 'auto' : 'smooth' });
  };

  const handleConsultationSelect = (serviceName: string, notes: string = '') => {
    setSelectedService(serviceName);
    setSelectedMessage(notes);
    handleNavigate('request-consultation');
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${
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

      {/* Main Page Body with Instant Mount + Smooth Entrance Transition */}
      <main className={`flex-1 ${currentPage === 'home' ? '' : 'pt-24 pb-16'}`}>
        <motion.div
          key={currentPage}
          initial={prefersReducedMotion ? false : { opacity: 0.88, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: EASE_PREMIUM }}
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

            {currentPage === 'demo-websites' && (
              <DemoWebsitesPage
                onNavigate={handleNavigate}
                onBookConsultation={(svc) => handleConsultationSelect(svc)}
                theme={theme}
              />
            )}

            {currentPage === 'erp-showcase' && (
              <ERPShowcasePage
                onNavigate={handleNavigate}
                onBookConsultation={(svc) => handleConsultationSelect(svc)}
                theme={theme}
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
