/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ThemeMode } from '../../types.ts';
import {
  EASE_PREMIUM,
  SCROLL_SPRING_CONFIG,
  interpolateCounter,
  shouldTriggerScrollReveal,
  isRectWithinScrollTrigger,
  scrollSectionContainerVariants,
  scrollBlockItemVariants,
  scrollCascadeGridVariants,
} from '../../utils/motion.ts';

/* -------------------------------------------------------------------------- */
/* 0. Shared Responsive Breakpoint & Pointer Glare Helpers                    */
/* -------------------------------------------------------------------------- */
export function useIsDesktop(minWidth: number = 1024): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [minWidth]);

  return isDesktop;
}

export function updateCardGlareCoordinates(e: React.MouseEvent<HTMLElement>): void {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
  const y = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
  e.currentTarget.style.setProperty('--glare-x', `${x.toFixed(1)}%`);
  e.currentTarget.style.setProperty('--glare-y', `${y.toFixed(1)}%`);
}

export const CardGlareOverlay: React.FC<{
  theme: ThemeMode;
  subtle?: boolean;
}> = ({ theme, subtle = false }) => {
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0"
    >
      {/* Interactive pointer-tracking radial glare */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? `radial-gradient(380px circle at var(--glare-x, 50%) var(--glare-y, 35%), rgba(255, 255, 255, ${
                subtle ? '0.07' : '0.11'
              }), transparent 65%)`
            : `radial-gradient(380px circle at var(--glare-x, 50%) var(--glare-y, 35%), rgba(56, 189, 248, ${
                subtle ? '0.09' : '0.15'
              }), transparent 65%)`,
        }}
      />

      {/* Futuristic diagonal shine sweep beam triggered on hover */}
      <div
        className="ts-shine-beam absolute -top-12 -bottom-12 left-0 w-1/2"
        style={{
          background: isDark
            ? `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 26%, rgba(255, 255, 255, ${
                subtle ? '0.12' : '0.2'
              }) 50%, rgba(255, 255, 255, 0.03) 74%, transparent 100%)`
            : `linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.06) 24%, rgba(255, 255, 255, ${
                subtle ? '0.45' : '0.72'
              }) 48%, rgba(56, 189, 248, ${
                subtle ? '0.1' : '0.16'
              }) 56%, transparent 78%, transparent 100%)`,
        }}
      />

      {/* Crisp top-edge specular gleam on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.55), transparent)',
        }}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. Top Scroll Progress Indicator                                           */
/* -------------------------------------------------------------------------- */
export const ScrollProgressBar: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const isDark = theme === 'dark';

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
      className={`fixed top-0 left-0 right-0 h-[2.5px] origin-left z-[60] pointer-events-none ${
        isDark
          ? 'bg-gradient-to-r from-[#737373] via-[#D4D4D4] to-[#FFFFFF]'
          : 'bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0EA5E9]'
      }`}
    />
  );
};

/* -------------------------------------------------------------------------- */
/* 1b. Global Theme Transition Top Progress Indicator                         */
/* -------------------------------------------------------------------------- */
export const ThemeTransitionProgressBar: React.FC<{
  active: boolean;
  runId: number;
  targetTheme: ThemeMode;
}> = ({ active, runId, targetTheme }) => {
  const prefersReducedMotion = useReducedMotion();
  const isTargetDark = targetTheme === 'dark';
  const showBar = active && !prefersReducedMotion && runId > 0;

  return (
    <div
      aria-hidden="true"
      data-no-theme-transition=""
      data-testid="theme-transition-progress"
      data-state={showBar ? 'active' : 'idle'}
      data-target-theme={targetTheme}
      className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none overflow-hidden"
    >
      {showBar && (
        <div
          key={`theme-progress-${runId}`}
          data-no-theme-transition=""
          className={`ts-theme-progress-bar h-full w-full ${
            isTargetDark
              ? 'bg-gradient-to-r from-[#737373] via-[#E5E5E5] to-[#FFFFFF] shadow-[0_0_12px_rgba(255,255,255,0.42)]'
              : 'bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#7DD3FC] shadow-[0_0_12px_rgba(56,189,248,0.4)]'
          }`}
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Floating Back-to-Top Button                                             */
/* -------------------------------------------------------------------------- */
export const BackToTopButton: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.07, y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.2, ease: EASE_PREMIUM }}
          aria-label="Back to top"
          title="Back to top"
          data-glass-layer="back-to-top"
          className={`ts-glass-float-btn fixed bottom-24 right-6 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
            isDark
              ? 'text-[#F5F5F5] focus-visible:ring-white'
              : 'text-[#101B35] focus-visible:ring-[#38BDF8]'
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Magnetic Desktop Button Wrapper                                         */
/* -------------------------------------------------------------------------- */
interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.18,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPointerFine, setIsPointerFine] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setIsPointerFine(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !isPointerFine || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const maxOffset = 6;
    x.set(Math.max(-maxOffset, Math.min(maxOffset, dx * strength)));
    y.set(Math.max(-maxOffset, Math.min(maxOffset, dy * strength)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      style={prefersReducedMotion || !isPointerFine ? undefined : { x: springX, y: springY }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.18, ease: EASE_PREMIUM }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Futuristic Non-Blocking Page Transition Overlay                         */
/* -------------------------------------------------------------------------- */
export const PageTransitionOverlay: React.FC<{
  transitionKey: string;
  theme: ThemeMode;
}> = ({ transitionKey, theme }) => {
  const prefersReducedMotion = useReducedMotion();
  const [showSweep, setShowSweep] = useState(false);
  const isFirstMount = useRef(true);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (prefersReducedMotion) return;
    setShowSweep(true);
    const timer = window.setTimeout(() => setShowSweep(false), 360);
    return () => window.clearTimeout(timer);
  }, [transitionKey, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {showSweep && (
        <motion.div
          key={`sweep-${transitionKey}`}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-[55] pointer-events-none overflow-hidden"
        >
          {/* Thin animated grid pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 0.34, ease: 'easeOut' }}
            className={`absolute inset-0 ${
              isDark ? 'tech-grid-bg' : 'tech-grid-bg-light'
            }`}
          />

          {/* Horizontal scanning light sweep */}
          <motion.div
            initial={{ y: '-8vh', opacity: 0.9 }}
            animate={{ y: '108vh', opacity: 0 }}
            transition={{ duration: 0.34, ease: EASE_PREMIUM }}
            className={`absolute left-0 right-0 h-[2px] ${
              isDark
                ? 'bg-gradient-to-r from-transparent via-white/70 to-transparent shadow-[0_0_16px_rgba(255,255,255,0.35)]'
                : 'bg-gradient-to-r from-transparent via-[#38BDF8]/80 to-transparent shadow-[0_0_16px_rgba(56,189,248,0.45)]'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Reusable Scroll-Triggered Counter                                       */
/* -------------------------------------------------------------------------- */
export const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
}> = ({ target, suffix = '', prefix = '', duration = 850, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }
    if (!isInView) return;

    let rafId = 0;
    const startTime = performance.now() + delay * 1000;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      setCount(interpolateCounter(target, progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, prefersReducedMotion, target, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Unified useScroll Trigger-Once Section Container & Cascade Primitives   */
/* -------------------------------------------------------------------------- */
export const ScrollSectionContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState<boolean>(() => Boolean(prefersReducedMotion));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.95', 'end 0.05'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setHasEntered((prev) => shouldTriggerScrollReveal(latest, prev));
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
      return;
    }
    if (hasEntered) return;

    const checkViewportEntry = () => {
      if (shouldTriggerScrollReveal(scrollYProgress.get(), false)) {
        setHasEntered(true);
        return;
      }
      const el = containerRef.current;
      if (el && typeof window !== 'undefined') {
        const rect = el.getBoundingClientRect();
        if (isRectWithinScrollTrigger(rect.top, rect.bottom, window.innerHeight, 0.95)) {
          setHasEntered(true);
        }
      }
    };

    checkViewportEntry();
    const rafId = window.requestAnimationFrame(checkViewportEntry);
    const t1 = window.setTimeout(checkViewportEntry, 140);
    const t2 = window.setTimeout(checkViewportEntry, 360);
    const t3 = window.setTimeout(checkViewportEntry, 680);

    window.addEventListener('scroll', checkViewportEntry, { passive: true });
    window.addEventListener('resize', checkViewportEntry, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setHasEntered(true);
              observer?.disconnect();
              break;
            }
          }
        },
        { threshold: 0, rootMargin: '0px 0px -5% 0px' }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener('scroll', checkViewportEntry);
      window.removeEventListener('resize', checkViewportEntry);
      observer?.disconnect();
    };
  }, [prefersReducedMotion, hasEntered, scrollYProgress]);

  const variants =
    delay > 0
      ? {
          hidden: scrollSectionContainerVariants.hidden,
          visible: {
            opacity: 1,
            transition: {
              duration: 0.36,
              delay,
              ease: EASE_PREMIUM,
              staggerChildren: 0.09,
              delayChildren: 0.03 + delay,
            },
          },
        }
      : scrollSectionContainerVariants;

  return (
    <motion.div
      ref={containerRef}
      data-scroll-container="true"
      data-entered={prefersReducedMotion || hasEntered ? 'true' : 'false'}
      variants={variants}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={prefersReducedMotion || hasEntered ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollCascadeBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div variants={scrollBlockItemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export const ScrollCascadeGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div variants={scrollCascadeGridVariants} className={className}>
      {children}
    </motion.div>
  );
};

export const RevealSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <ScrollSectionContainer className={className} delay={delay}>
      <ScrollCascadeBlock>{children}</ScrollCascadeBlock>
    </ScrollSectionContainer>
  );
};

const PASSTHROUGH_VARIANTS = {
  hidden: {},
  visible: {},
};

export const ScrollParallaxLayer: React.FC<{
  children: React.ReactNode;
  scrollYProgress: MotionValue<number>;
  yRange: [number, number];
  enabled?: boolean;
  className?: string;
}> = ({ children, scrollYProgress, yRange, enabled = true, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const rawY = useTransform(scrollYProgress, [0, 1], yRange);
  const smoothY = useSpring(rawY, SCROLL_SPRING_CONFIG);

  return (
    <motion.div
      variants={PASSTHROUGH_VARIANTS}
      style={prefersReducedMotion || !enabled ? undefined : { y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Futuristic Scanning Line & Subtle Ambient Tech Particles                */
/* -------------------------------------------------------------------------- */
export const ScanningLine: React.FC<{ theme: ThemeMode; className?: string }> = ({
  theme,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <motion.div
        initial={{ y: '-10%' }}
        animate={{ y: '110%' }}
        transition={{
          repeat: Infinity,
          duration: 7.5,
          ease: 'linear',
        }}
        className={`w-full h-px ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent'
        }`}
      />
    </div>
  );
};

const PARTICLE_NODES = [
  { left: '12%', top: '24%', size: 4, duration: 7, delay: 0 },
  { left: '28%', top: '72%', size: 3, duration: 9, delay: 1.2 },
  { left: '46%', top: '18%', size: 3.5, duration: 8, delay: 0.6 },
  { left: '66%', top: '80%', size: 4, duration: 10, delay: 1.8 },
  { left: '84%', top: '30%', size: 3, duration: 7.5, delay: 0.4 },
  { left: '91%', top: '64%', size: 3.5, duration: 8.5, delay: 1.5 },
];

export const SubtleTechParticles: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none"
    >
      {PARTICLE_NODES.map((node, idx) => (
        <motion.span
          key={idx}
          style={{
            left: node.left,
            top: node.top,
            width: node.size,
            height: node.size,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.18, 0.55, 0.18],
          }}
          transition={{
            repeat: Infinity,
            duration: node.duration,
            delay: node.delay,
            ease: 'easeInOut',
          }}
          className={`absolute rounded-full ${
            isDark ? 'bg-[#D4D4D4]' : 'bg-[#38BDF8]'
          }`}
        />
      ))}
    </div>
  );
};
