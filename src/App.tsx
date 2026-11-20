/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useState, useEffect, useCallback, useRef } from 'react';
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
  getCanonicalUrl,
  getPageFromPathname,
  getPathForPage,
} from './utils/routing.ts';
import {
  DEFAULT_CONSULTATION_SERVICE,
  resolveConsultationService,
} from './data/consultationServices.ts';
import {
  ThemeTransitionRunState,
  applyThemeToDocument,
  clearThemeTransitionState,
  createThemeTransitionState,
  getNextTheme,
  persistTheme,
  readStoredTheme,
  scheduleThemeTransitionCleanup,
} from './utils/theme.ts';
import {
  installUiSoundListeners,
  playSound,
} from './utils/soundManager.ts';
import { installGlassRefractionListener } from './utils/glassRefraction.ts';
import { installGlassScrollDepthListener } from './utils/glassScrollDepth.ts';
import { RouteLoadingFallback } from './components/skeletons/RouteLoadingFallback.tsx';
import { isRouteFallbackPreviewEnabled } from './utils/routeSkeleton.ts';

// Eager HomePage for instant initial paint (LCP)
import { HomePage } from './pages/HomePage.tsx';

// Route-level code splitting for secondary pages
const AboutPage = lazy(() =>
  import('./pages/AboutPage.tsx').then((m) => ({ default: m.AboutPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage.tsx').then((m) => ({ default: m.ServicesPage }))
);
const ERPSolutionsPage = lazy(() =>
  import('./pages/ERPSolutionsPage.tsx').then((m) => ({ default: m.ERPSolutionsPage }))
);
const ERPNextPage = lazy(() =>
  import('./pages/ERPNextPage.tsx').then((m) => ({ default: m.ERPNextPage }))
);
const OdooPage = lazy(() =>
  import('./pages/OdooPage.tsx').then((m) => ({ default: m.OdooPage }))
);
const ZohoPage = lazy(() =>
  import('./pages/ZohoPage.tsx').then((m) => ({ default: m.ZohoPage }))
);
const ITSolutionsPage = lazy(() =>
  import('./pages/ITSolutionsPage.tsx').then((m) => ({ default: m.ITSolutionsPage }))
);
const DemoWebsitesPage = lazy(() =>
  import('./pages/DemoWebsitesPage.tsx').then((m) => ({ default: m.DemoWebsitesPage }))
);
const ERPShowcasePage = lazy(() =>
  import('./pages/ERPShowcasePage.tsx').then((m) => ({ default: m.ERPShowcasePage }))
);
const IndustriesPage = lazy(() =>
  import('./pages/IndustriesPage.tsx').then((m) => ({ default: m.IndustriesPage }))
);
const CaseStudiesPage = lazy(() =>
  import('./pages/CaseStudiesPage.tsx').then((m) => ({ default: m.CaseStudiesPage }))
);
const PortfolioPage = lazy(() =>
  import('./pages/PortfolioPage.tsx').then((m) => ({ default: m.PortfolioPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage.tsx').then((m) => ({ default: m.ContactPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage.tsx').then((m) => ({ default: m.NotFoundPage }))
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    getPageFromPathname(window.location.pathname)
  );
  const [theme, setTheme] = useState<ThemeMode>(() => readStoredTheme('light'));
  const [selectedService, setSelectedService] = useState<string>(DEFAULT_CONSULTATION_SERVICE);
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Idempotent root sync on mount (no-op when index.html bootstrap or toggleTheme already applied)
  useEffect(() => {
    applyThemeToDocument(theme);
    persistTheme(theme);
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#090909' : '#101B35');
    }
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

  // Update document title, meta description, OpenGraph, and canonical URL per active route
  useEffect(() => {
    const seo = PAGE_SEO_META[currentPage] ?? PAGE_SEO_META.home;
    const canonicalUrl = getCanonicalUrl(currentPage);
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

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seo.title);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', seo.description);
    }

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute(
        'content',
        currentPage === 'not-found' ? 'noindex, nofollow' : 'index, follow'
      );
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
  const cancelThemeTransitionCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Install centralized delegated UI click & opt-in hover sound listeners
  useEffect(() => installUiSoundListeners(), []);

  // Install delegated pointer-move refraction-sheen listener for all .ts-glass-card elements
  useEffect(() => installGlassRefractionListener(), []);

  // Install batched scroll depth-of-field vertical offset listener for all .ts-glass-card elements
  useEffect(() => installGlassScrollDepthListener(), []);

  useEffect(() => {
    return () => {
      if (themeProgressTimerRef.current !== null) {
        window.clearTimeout(themeProgressTimerRef.current);
      }
      if (cancelThemeTransitionCleanupRef.current) {
        cancelThemeTransitionCleanupRef.current();
        cancelThemeTransitionCleanupRef.current = null;
      }
      clearThemeTransitionState();
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = getNextTheme(themeRef.current);
    const animate = !prefersReducedMotion;
    themeRef.current = nextTheme;

    if (cancelThemeTransitionCleanupRef.current) {
      cancelThemeTransitionCleanupRef.current();
      cancelThemeTransitionCleanupRef.current = null;
    }

    // Synchronously update root theme tokens + CSS-variable transition flag in the same
    // frame as React's state update (eliminates post-paint useEffect desync & rAF).
    applyThemeToDocument(nextTheme, undefined, { animate });
    persistTheme(nextTheme);
    playSound('theme-switch', { theme: nextTheme });
    setTheme(nextTheme);

    if (animate) {
      cancelThemeTransitionCleanupRef.current = scheduleThemeTransitionCleanup();
    }

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
        if (prevPage !== page) {
          playSound('navigation-transition');
        }
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
      setSelectedService(resolveConsultationService(serviceName));
      setSelectedMessage(notes);
      handleNavigate('request-consultation');
    },
    [handleNavigate]
  );

  const handleServiceConsultation = useCallback(
    (serviceName: string) => {
      handleConsultationSelect(serviceName);
    },
    [handleConsultationSelect]
  );

  const handleOpenLegal = useCallback((type: 'privacy' | 'terms' | 'cookies') => {
    setLegalModalType(type);
  }, []);

  const handleCloseLegal = useCallback(() => {
    setLegalModalType(null);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--ts-bg-main)] text-[var(--ts-text-primary)] selection:bg-[var(--ts-selection-bg)] selection:text-[var(--ts-selection-text)]">
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
          {isRouteFallbackPreviewEnabled() ? (
            <RouteLoadingFallback isDark={isDark} page={currentPage} />
          ) : (
            <Suspense fallback={<RouteLoadingFallback isDark={isDark} page={currentPage} />}>
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={handleNavigate}
                  theme={theme}
                  onSelectServiceForConsultation={handleServiceConsultation}
                />
              )}

            {currentPage === 'about' && (
              <AboutPage onNavigate={handleNavigate} theme={theme} />
            )}

            {currentPage === 'services' && (
              <ServicesPage
                onNavigate={handleNavigate}
                theme={theme}
                onSelectServiceForConsultation={handleServiceConsultation}
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
                onBookConsultation={handleServiceConsultation}
              />
            )}

            {currentPage === 'odoo' && (
              <OdooPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={handleServiceConsultation}
              />
            )}

            {currentPage === 'zoho' && (
              <ZohoPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={handleServiceConsultation}
              />
            )}

            {currentPage === 'it-solutions' && (
              <ITSolutionsPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={handleServiceConsultation}
              />
            )}

            {currentPage === 'demo-websites' && (
              <DemoWebsitesPage
                onNavigate={handleNavigate}
                onBookConsultation={handleServiceConsultation}
                theme={theme}
              />
            )}

            {currentPage === 'erp-showcase' && (
              <ERPShowcasePage
                onNavigate={handleNavigate}
                onBookConsultation={handleServiceConsultation}
                theme={theme}
              />
            )}

            {currentPage === 'industries' && (
              <IndustriesPage
                onNavigate={handleNavigate}
                theme={theme}
                onBookConsultation={handleConsultationSelect}
              />
            )}

            {currentPage === 'case-studies' && (
              <CaseStudiesPage onNavigate={handleNavigate} theme={theme} />
            )}

            {currentPage === 'portfolio' && (
              <PortfolioPage onNavigate={handleNavigate} theme={theme} />
            )}

            {(currentPage === 'contact' || currentPage === 'request-consultation') && (
              <ContactPage
                onNavigate={handleNavigate}
                theme={theme}
                initialService={selectedService}
                initialMessage={selectedMessage}
              />
            )}

              {currentPage === 'not-found' && (
                <NotFoundPage
                  onNavigate={handleNavigate}
                  theme={theme}
                  requestedPath={window.location.pathname}
                />
              )}
            </Suspense>
          )}
        </motion.div>
      </main>

      {/* Global Enterprise Footer */}
      <Footer
        onNavigate={handleNavigate}
        theme={theme}
        onOpenLegal={handleOpenLegal}
      />

      {/* Floating Back-to-Top Control */}
      <BackToTopButton theme={theme} />

      {/* Floating Action Controls (WhatsApp, Direct Telephone, Email) */}
      <FloatingContact theme={theme} />

      {/* Legal & Policy Modals (Privacy, Terms, Cookies) */}
      <LegalModal
        type={legalModalType}
        onClose={handleCloseLegal}
        theme={theme}
      />
    </div>
  );
}
