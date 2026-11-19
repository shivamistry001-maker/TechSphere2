/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Maximize2,
  X,
  Images,
} from 'lucide-react';
import { ERPDemoPlatform, ThemeMode } from '../../types.ts';
import { ERP_DEMO_PLATFORMS } from '../../data/showcaseData.ts';
import { cycleGalleryIndex } from '../../utils/showcaseLogic.ts';
import {
  EASE_PREMIUM,
  computeColumnParallax,
  modalBackdropVariants,
  modalContentVariants,
  scrollCardItemVariants,
} from '../../utils/motion.ts';
import {
  CardGlareOverlay,
  ScrollCascadeBlock,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  updateCardGlareCoordinates,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';
import { PreviewImage } from './PreviewImage.tsx';
import { ERPPlatformLogo } from './ERPPlatformLogo.tsx';

interface ERPDemoShowcaseSectionProps {
  theme: ThemeMode;
  className?: string;
  hideSectionHeading?: boolean;
}

interface LightboxState {
  platformId: ERPDemoPlatform['id'];
  index: number;
}

export const ERPDemoShowcaseSection: React.FC<ERPDemoShowcaseSectionProps> = ({
  theme,
  className = '',
  hideSectionHeading = false,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);
  const isDark = theme === 'dark';

  // Track inline slide index independently per ERP platform card
  const [slideIndices, setSlideIndices] = useState<Record<ERPDemoPlatform['id'], number>>({
    erpnext: 0,
    odoo: 0,
    zoho: 0,
  });

  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const handleCardSlide = (
    platformId: ERPDemoPlatform['id'],
    total: number,
    direction: 'prev' | 'next'
  ) => {
    setSlideIndices((prev) => ({
      ...prev,
      [platformId]: cycleGalleryIndex(prev[platformId] ?? 0, total, direction),
    }));
  };

  const handleSelectCardThumbnail = (platformId: ERPDemoPlatform['id'], index: number) => {
    setSlideIndices((prev) => ({
      ...prev,
      [platformId]: index,
    }));
  };

  const openLightbox = (platformId: ERPDemoPlatform['id'], index: number) => {
    setLightbox({ platformId, index });
  };

  const activeLightboxPlatform = lightbox
    ? ERP_DEMO_PLATFORMS.find((p) => p.id === lightbox.platformId) ?? null
    : null;

  const activeLightboxScreenshot =
    activeLightboxPlatform && lightbox
      ? activeLightboxPlatform.screenshots[lightbox.index] ?? activeLightboxPlatform.screenshots[0]
      : null;

  // Modal scroll lock + Escape / Left / Right keyboard navigation
  useEffect(() => {
    if (!lightbox || !activeLightboxPlatform) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const total = activeLightboxPlatform.screenshots.length;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowRight') {
        setLightbox((prev) =>
          prev ? { ...prev, index: cycleGalleryIndex(prev.index, total, 'next') } : null
        );
      } else if (e.key === 'ArrowLeft') {
        setLightbox((prev) =>
          prev ? { ...prev, index: cycleGalleryIndex(prev.index, total, 'prev') } : null
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightbox, activeLightboxPlatform]);

  return (
    <section
      ref={sectionRef}
      id="explore-erp-solutions"
      aria-labelledby="erp-demo-showcase-heading"
      className={`py-20 sm:py-28 scroll-mt-20 overflow-x-clip ${
        isDark ? 'bg-[#090909]' : 'bg-white'
      } ${className}`}
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        {!hideSectionHeading && (
          <ScrollCascadeBlock className="max-w-3xl mb-12 space-y-3">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
              }`}
            >
              ERP Software Walkthroughs
            </p>
            <h2
              id="erp-demo-showcase-heading"
              className={`font-display font-extrabold tracking-tight leading-[1.1] text-balance ${
                isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
              }`}
              style={{ fontSize: 'clamp(1.85rem, 3.4vw, 2.85rem)' }}
            >
              Explore ERP Solutions
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
              }`}
            >
              Discover how modern ERP platforms can streamline business operations, improve visibility, and simplify management.
            </p>
          </ScrollCascadeBlock>
        )}

        {/* Three ERP Platform Gallery Cards */}
        <ScrollCascadeGrid className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {ERP_DEMO_PLATFORMS.map((platform, idx) => {
            const currentIdx = slideIndices[platform.id] ?? 0;
            const currentShot = platform.screenshots[currentIdx] ?? platform.screenshots[0];
            const totalShots = platform.screenshots.length;

            return (
              <ScrollParallaxLayer
                key={platform.id}
                scrollYProgress={scrollYProgress}
                yRange={computeColumnParallax(idx, 3, 10)}
                enabled={isDesktop}
                className="h-full"
              >
                <motion.article
                  variants={scrollCardItemVariants}
                  data-testid={`erp-showcase-card-${platform.id}`}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  onMouseMove={prefersReducedMotion ? undefined : updateCardGlareCoordinates}
                  className={`group relative h-full rounded-3xl border overflow-hidden flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#171717] border-[#303030] hover:bg-[#1D1D1D] hover:border-white/45 shadow-[0_16px_40px_rgba(0,0,0,0.45)]'
                      : 'bg-white border-[#101B35]/[0.08] hover:border-[#38BDF8]/60 shadow-[0_14px_34px_rgba(16,27,53,0.05)] hover:shadow-[0_24px_50px_rgba(16,27,53,0.09)]'
                  }`}
                >
                  <CardGlareOverlay theme={theme} subtle />

                  {/* Interactive Gallery Header + Main Viewport */}
                  <div className="relative z-10 p-5 sm:p-6 pb-0">
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <ERPPlatformLogo platformId={platform.id} theme={theme} />
                        <div className="min-w-0">
                          <p
                            className={`text-[11px] font-semibold tracking-wide truncate ${
                              isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                            }`}
                          >
                            {platform.subtitle}
                          </p>
                          <h3
                            className={`font-display text-xl sm:text-2xl font-bold leading-tight mt-0.5 ${
                              isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                            }`}
                          >
                            {platform.name}
                          </h3>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-mono tabular-nums shrink-0 mt-1 ${
                          isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                        }`}
                      >
                        {currentIdx + 1} / {totalShots}
                      </span>
                    </div>

                    {/* Screenshot Viewer */}
                    <div
                      className={`relative aspect-[16/10] rounded-2xl border overflow-hidden ${
                        isDark ? 'border-[#303030] bg-[#111111]' : 'border-[#101B35]/10 bg-slate-50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(platform.id, currentIdx)}
                        aria-label={`Enlarge ${platform.name} screenshot: ${currentShot.title}`}
                        className="block w-full h-full text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentShot.id}
                            initial={prefersReducedMotion ? false : { opacity: 0.25, scale: 1.015 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={prefersReducedMotion ? undefined : { opacity: 0.2 }}
                            transition={{ duration: 0.24, ease: EASE_PREMIUM }}
                            className="w-full h-full"
                          >
                            <PreviewImage
                              src={currentShot.src}
                              alt={currentShot.alt}
                              fallbackTitle={currentShot.title}
                              fallbackSubtitle={platform.name}
                              theme={theme}
                              eager
                            />
                          </motion.div>
                        </AnimatePresence>
                      </button>

                      {/* Gallery Prev / Next Controls */}
                      <div className="absolute inset-x-2.5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-between pointer-events-none">
                        <motion.button
                          type="button"
                          whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardSlide(platform.id, totalShots, 'prev');
                          }}
                          aria-label={`Previous ${platform.name} screenshot`}
                          className={`pointer-events-auto w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-md shadow-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                            isDark
                              ? 'bg-[#090909]/85 border-[#303030] text-white hover:bg-white hover:text-[#090909] focus-visible:ring-white'
                              : 'bg-white/90 border-[#101B35]/15 text-[#101B35] hover:bg-[#101B35] hover:text-white focus-visible:ring-[#38BDF8]'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </motion.button>

                        <motion.button
                          type="button"
                          whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardSlide(platform.id, totalShots, 'next');
                          }}
                          aria-label={`Next ${platform.name} screenshot`}
                          className={`pointer-events-auto w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-md shadow-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                            isDark
                              ? 'bg-[#090909]/85 border-[#303030] text-white hover:bg-white hover:text-[#090909] focus-visible:ring-white'
                              : 'bg-white/90 border-[#101B35]/15 text-[#101B35] hover:bg-[#101B35] hover:text-white focus-visible:ring-[#38BDF8]'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Subtle Maximize Affordance */}
                      <button
                        type="button"
                        onClick={() => openLightbox(platform.id, currentIdx)}
                        aria-label={`Open full preview of ${currentShot.title}`}
                        className={`absolute bottom-2.5 right-2.5 z-20 w-7 h-7 rounded-lg border flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-[#090909]/80 border-[#303030] text-white hover:bg-white hover:text-[#090909]'
                            : 'bg-[#101B35]/80 border-white/15 text-white hover:bg-[#0284C7]'
                        }`}
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Active Slide Caption */}
                    <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
                      <span className={`font-semibold truncate ${isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'}`}>
                        {currentShot.title}
                      </span>
                      <span className={`text-[11px] shrink-0 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                        {currentShot.module}
                      </span>
                    </div>

                    {/* Thumbnail Selector Strip */}
                    <div className="mt-2.5 grid grid-cols-3 gap-2" role="group" aria-label={`${platform.name} screenshot thumbnails`}>
                      {platform.screenshots.map((shot, sIdx) => {
                        const isSelected = sIdx === currentIdx;
                        return (
                          <button
                            key={shot.id}
                            type="button"
                            onClick={() => handleSelectCardThumbnail(platform.id, sIdx)}
                            aria-label={`Select ${platform.name} screenshot ${sIdx + 1}: ${shot.title}`}
                            aria-pressed={isSelected}
                            className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 ${
                              isSelected
                                ? isDark
                                  ? 'border-white ring-1 ring-white/70 opacity-100'
                                  : 'border-[#0284C7] ring-1 ring-[#38BDF8] opacity-100'
                                : isDark
                                ? 'border-[#303030] opacity-60 hover:opacity-95'
                                : 'border-slate-200 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <PreviewImage
                              src={shot.src}
                              alt={shot.title}
                              fallbackTitle={shot.title}
                              theme={theme}
                              eager
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description, Module Coverage & View Screenshots CTA */}
                  <div className="relative z-10 p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                          isDark ? 'text-[#A3A3A3]' : 'text-slate-600'
                        }`}
                      >
                        {platform.description}
                      </p>

                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5">
                        {platform.highlights.map((item) => (
                          <div
                            key={item}
                            className={`flex items-start gap-1.5 text-xs ${
                              isDark ? 'text-[#D4D4D4]' : 'text-slate-700'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isDark ? 'text-white' : 'text-[#0284C7]'
                              }`}
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`pt-4 border-t ${
                        isDark ? 'border-[#303030]' : 'border-[#101B35]/[0.06]'
                      }`}
                    >
                      <motion.button
                        type="button"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                        onClick={() => openLightbox(platform.id, currentIdx)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 ${
                          isDark
                            ? 'bg-white text-[#090909] hover:bg-[#D4D4D4] focus-visible:ring-white'
                            : 'bg-[#101B35] text-white hover:bg-[#0284C7] focus-visible:ring-[#38BDF8]'
                        }`}
                      >
                        <Images className="w-3.5 h-3.5" />
                        <span>View Screenshots</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              </ScrollParallaxLayer>
            );
          })}
        </ScrollCascadeGrid>
      </ScrollSectionContainer>

      {/* Interactive Large Image Preview Modal (Lightbox) */}
      <AnimatePresence>
        {lightbox && activeLightboxPlatform && activeLightboxScreenshot && (
          <motion.div
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeLightboxPlatform.name} screenshot gallery preview`}
            data-testid="erp-lightbox-modal"
            className={`fixed inset-0 z-[70] backdrop-blur-md flex items-center justify-center p-3 sm:p-6 ${
              isDark ? 'bg-black/90' : 'bg-[#101B35]/80'
            }`}
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl flex flex-col max-h-[92vh] ${
                isDark
                  ? 'bg-[#171717] border-[#303030] text-[#F5F5F5]'
                  : 'bg-white border-[#101B35]/15 text-[#172033]'
              }`}
            >
              {/* Modal Top Bar */}
              <div
                className={`px-5 sm:px-6 py-4 border-b flex items-center justify-between gap-4 ${
                  isDark ? 'border-[#303030] bg-[#111111]' : 'border-slate-200 bg-[#F5FAFE]'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0284C7]'}`}>
                      {activeLightboxPlatform.name}
                    </span>
                    <span aria-hidden="true" className="opacity-40">·</span>
                    <span className={isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}>
                      {activeLightboxScreenshot.module}
                    </span>
                    <span aria-hidden="true" className="opacity-40">·</span>
                    <span className={`font-mono tabular-nums ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
                      {lightbox.index + 1} / {activeLightboxPlatform.screenshots.length}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold truncate mt-0.5">
                    {activeLightboxScreenshot.title}
                  </h3>
                </div>

                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                  onClick={() => setLightbox(null)}
                  aria-label="Close screenshot preview"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                    isDark
                      ? 'bg-[#1D1D1D] border-[#303030] text-white hover:bg-white hover:text-[#090909] focus-visible:ring-white'
                      : 'bg-white border-slate-200 text-[#101B35] hover:bg-[#101B35] hover:text-white focus-visible:ring-[#38BDF8]'
                  }`}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Large Clear Screenshot Canvas */}
              <div
                className={`relative flex-1 min-h-[260px] sm:min-h-[420px] flex items-center justify-center p-3 sm:p-6 overflow-hidden ${
                  isDark ? 'bg-[#090909]' : 'bg-slate-100'
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLightboxScreenshot.id}
                    initial={prefersReducedMotion ? false : { opacity: 0.65, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0.5, x: -10 }}
                    transition={{ duration: 0.16, ease: EASE_PREMIUM }}
                    className="w-full h-[46vh] sm:h-[58vh] rounded-xl overflow-hidden bg-white shadow-lg ring-1 ring-black/10 p-1.5 sm:p-2"
                  >
                    <PreviewImage
                      src={activeLightboxScreenshot.src}
                      alt={activeLightboxScreenshot.alt}
                      fallbackTitle={activeLightboxScreenshot.title}
                      fallbackSubtitle={activeLightboxPlatform.name}
                      theme="light"
                      eager
                      imgClassName="w-full h-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next Navigation Buttons */}
                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                  onClick={() =>
                    setLightbox((prev) =>
                      prev
                        ? {
                            ...prev,
                            index: cycleGalleryIndex(
                              prev.index,
                              activeLightboxPlatform.screenshots.length,
                              'prev'
                            ),
                          }
                        : null
                    )
                  }
                  aria-label="Previous screenshot"
                  className={`absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border flex items-center justify-center shadow-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                    isDark
                      ? 'bg-[#171717]/95 border-[#303030] text-white hover:bg-white hover:text-[#090909] focus-visible:ring-white'
                      : 'bg-white/95 border-slate-200 text-[#101B35] hover:bg-[#101B35] hover:text-white focus-visible:ring-[#38BDF8]'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                  onClick={() =>
                    setLightbox((prev) =>
                      prev
                        ? {
                            ...prev,
                            index: cycleGalleryIndex(
                              prev.index,
                              activeLightboxPlatform.screenshots.length,
                              'next'
                            ),
                          }
                        : null
                    )
                  }
                  aria-label="Next screenshot"
                  className={`absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border flex items-center justify-center shadow-lg transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                    isDark
                      ? 'bg-[#171717]/95 border-[#303030] text-white hover:bg-white hover:text-[#090909] focus-visible:ring-white'
                      : 'bg-white/95 border-slate-200 text-[#101B35] hover:bg-[#101B35] hover:text-white focus-visible:ring-[#38BDF8]'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Caption + Navigation Indicators + Thumbnail Bar */}
              <div
                className={`px-5 sm:px-6 py-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDark ? 'border-[#303030] bg-[#171717]' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="space-y-2 max-w-2xl">
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                    {activeLightboxScreenshot.caption}
                  </p>
                  <div className="flex items-center gap-1.5" role="group" aria-label="Image navigation indicators">
                    {activeLightboxPlatform.screenshots.map((shot, dotIdx) => {
                      const active = dotIdx === lightbox.index;
                      return (
                        <button
                          key={shot.id}
                          type="button"
                          onClick={() =>
                            setLightbox((prev) => (prev ? { ...prev, index: dotIdx } : null))
                          }
                          aria-label={`View slide ${dotIdx + 1} of ${activeLightboxPlatform.screenshots.length}`}
                          aria-current={active ? 'true' : undefined}
                          className={`h-2 rounded-full transition-[width,background-color] duration-200 cursor-pointer ${
                            active
                              ? isDark
                                ? 'w-6 bg-white'
                                : 'w-6 bg-[#0284C7]'
                              : isDark
                              ? 'w-2 bg-[#404040] hover:bg-[#737373]'
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeLightboxPlatform.screenshots.map((shot, sIdx) => {
                    const isSelected = sIdx === lightbox.index;
                    return (
                      <button
                        key={shot.id}
                        type="button"
                        onClick={() =>
                          setLightbox((prev) => (prev ? { ...prev, index: sIdx } : null))
                        }
                        aria-label={`Jump to screenshot ${sIdx + 1}: ${shot.title}`}
                        className={`w-16 h-10 rounded-lg overflow-hidden border transition-opacity cursor-pointer ${
                          isSelected
                            ? isDark
                              ? 'border-white ring-2 ring-white/60 opacity-100'
                              : 'border-[#0284C7] ring-2 ring-[#38BDF8]/70 opacity-100'
                            : 'border-transparent opacity-55 hover:opacity-95'
                        }`}
                      >
                        <PreviewImage
                          src={shot.src}
                          alt={shot.title}
                          fallbackTitle={shot.title}
                          theme={theme}
                          eager
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
