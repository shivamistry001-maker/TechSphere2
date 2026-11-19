/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageId, ThemeMode } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingContact } from './components/FloatingContact.tsx';
import { LegalModal } from './components/LegalModal.tsx';
import {
  ScrollProgressBar,
  ThemeTransitionProgressBar,
  BackToTopButton,
  PageTransitionOverlay,
} from './components/motion/MotionPrimitives.tsx';
import { EASE_PREMIUM } from './utils/motion.ts';
import {
  PAGE_SEO_META,
  getPageFromPathname,
  getPathForPage,
} from './utils/routing.ts';
import {
  ThemeTransitionRunState,
  applyThemeToDocument,
  createThemeTransitionState,
  getNextTheme,
  persistTheme,
  readStoredTheme,
} from './utils/theme.ts';
import { playThemeToggleClickSound } from './utils/themeSound.ts';

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
  const [theme, setTheme] = useState<ThemeMode>(() => readStoredTheme('light'));
  const [selectedService, setSelectedService] = useState<string>('ERP Consultancy');
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Enable permanent global theme transitions once after initial paint (never toggled on clicks)
  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        document.documentElement.classList.add('ts-theme-ready');
      });
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, []);

  // Apply theme class, data-theme attribute, color-scheme, and persistence without redundant DOM writes
  useEffect(() => {
    applyThemeToDocument(theme);
    persistTheme(theme);
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

  const [themeTransition, setThemeTransition] = useState<ThemeTransitionRunState>(() => ({
    active: false,
    runId: 0,
    targetTheme: theme,
    durationMs: 0,
    totalMs: 0,
  }));
  const themeRef = useRef<ThemeMode>(theme);
  const runIdRef = useRef<number>(0);
  const themeProgressTimerRef = useRef<number | null>(null);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    return () => {
      if (themeProgressTimerRef.current !== null) {
        window.clearTimeout(themeProgressTimerRef.current);
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = getNextTheme(themeRef.current);
    themeRef.current = nextTheme;
    playThemeToggleClickSound(nextTheme);
    setTheme(nextTheme);

    if (themeProgressTimerRef.current !== null) {
      window.clearTimeout(themeProgressTimerRef.current);
      themeProgressTimerRef.current = null;
    }

    const nextRun = createThemeTransitionState(
      runIdRef.current,
      nextTheme,
      Boolean(prefersReducedMotion)
    );
    runIdRef.current = nextRun.runId;
    setThemeTransition(nextRun);

    if (nextRun.active && nextRun.totalMs > 0) {
      themeProgressTimerRef.current = window.setTimeout(() => {
        setThemeTransition((current) =>
          current.runId === nextRun.runId ? { ...current, active: false } : current
        );
        themeProgressTimerRef.current = null;
      }, nextRun.totalMs);
    }
  }, [prefersReducedMotion]);

  const handleNavigate = useCallback(
    (page: PageId) => {
      const targetPath = getPathForPage(page);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
      setCurrentPage((prevPage) => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion || prevPage !== page ? 'auto' : 'smooth',
        });
        return page;
      });
    },
    [prefersReducedMotion]
  );

  const handleConsultationSelect = useCallback(
    (serviceName: string, notes: string = '') => {
      setSelectedService(serviceName);
      setSelectedMessage(notes);
      handleNavigate('request-consultation');
    },
    [handleNavigate]
  );

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${
        isDark
          ? 'bg-[#090909] text-[#F5F5F5] selection:bg-white selection:text-[#090909]'
          : 'bg-white text-[#172033] selection:bg-sky-500 selection:text-white'
      }`}
    >
      {/* Global Theme Switch Top Progress Indicator */}
      <ThemeTransitionProgressBar
        active={themeTransition.active}
        runId={themeTransition.runId}
        targetTheme={themeTransition.targetTheme}
      />

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
