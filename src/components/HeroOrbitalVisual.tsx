/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ThemeMode } from '../types.ts';
import { AnimatedCounter } from './motion/MotionPrimitives.tsx';
import { EASE_PREMIUM } from '../utils/motion.ts';
import { playSound, soundManager, stopAllSounds } from '../utils/soundManager.ts';
import {
  WHEEL_RESULT_DELAY_MS,
  WHEEL_SPIN_DURATION_MS,
  WheelAnimationPhase,
  computeTargetSpinDelta,
  evaluateWheelSpinFrame,
  getCumulativeWheelSegment,
} from '../utils/wheelPhysics.ts';

interface OrbitalNode {
  id: string;
  label: string;
  sublabel: string;
  metric: string;
  angle: number;
  renderIcon: (isDark: boolean) => React.ReactNode;
}

const ORBITAL_NODES: OrbitalNode[] = [
  {
    id: 'erp',
    label: 'ERP Core',
    sublabel: 'Unified Ledger',
    metric: 'Real-Time Sync',
    angle: -52,
    renderIcon: (isDark) =>
      isDark ? (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <path d="M18 4L30 10.5L18 17L6 10.5L18 4Z" fill="#FFFFFF" />
          <path d="M6 10.5L18 17V29.5L6 23V10.5Z" fill="#404040" />
          <path d="M30 10.5L18 17V29.5L30 23V10.5Z" fill="#737373" />
          <path d="M6 16.5L18 23L30 16.5" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <path d="M18 4L30 10.5L18 17L6 10.5L18 4Z" fill="#38BDF8" />
          <path d="M6 10.5L18 17V29.5L6 23V10.5Z" fill="#101B35" />
          <path d="M30 10.5L18 17V29.5L30 23V10.5Z" fill="#1E2F54" />
          <path d="M6 16.5L18 23L30 16.5" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
  },
  {
    id: 'crm',
    label: 'CRM Suite',
    sublabel: 'Client Pipelines',
    metric: 'Lead → Order',
    angle: 16,
    renderIcon: (isDark) =>
      isDark ? (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="12" fill="#1D1D1D" stroke="#525252" strokeWidth="1.2" />
          <path d="M12 22L18 13L24 22" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22H24" stroke="#A3A3A3" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="12.5" r="3.2" fill="#FFFFFF" />
          <circle cx="12" cy="22" r="2.8" fill="#D4D4D4" />
          <circle cx="24" cy="22" r="2.8" fill="#737373" />
        </svg>
      ) : (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="12" fill="#F5FAFE" stroke="#BAE6FD" strokeWidth="1.2" />
          <path d="M12 22L18 13L24 22" stroke="#101B35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22H24" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="12.5" r="3.2" fill="#101B35" />
          <circle cx="12" cy="22" r="2.8" fill="#38BDF8" />
          <circle cx="24" cy="22" r="2.8" fill="#0284C7" />
        </svg>
      ),
  },
  {
    id: 'automation',
    label: 'Automation',
    sublabel: 'Smart Triggers',
    metric: 'Zero Manual Entry',
    angle: 95,
    renderIcon: (isDark) =>
      isDark ? (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="6" y="6" width="24" height="24" rx="7" fill="#252525" stroke="#404040" />
          <path
            d="M19.5 9.5L12.5 19H18L16.5 26.5L23.5 17H18L19.5 9.5Z"
            fill="#FFFFFF"
            stroke="#D4D4D4"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="6" y="6" width="24" height="24" rx="7" fill="#101B35" />
          <path
            d="M19.5 9.5L12.5 19H18L16.5 26.5L23.5 17H18L19.5 9.5Z"
            fill="#38BDF8"
            stroke="#E0F2FE"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
  },
  {
    id: 'cloud',
    label: 'Cloud & Web',
    sublabel: 'Scalable Infra',
    metric: 'API Connected',
    angle: 178,
    renderIcon: (isDark) =>
      isDark ? (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <path
            d="M11.5 25.5H24.5C27.5376 25.5 30 23.0376 30 20C30 17.1636 27.8528 14.8289 25.0951 14.5327C24.2229 10.7931 20.8691 8 16.875 8C12.2496 8 8.5 11.7496 8.5 16.375C8.5 16.7128 8.52002 17.046 8.55901 17.3735C6.53388 18.0819 5.08334 20.0086 5.08334 22.2727C5.08334 24.0551 6.52822 25.5 8.31061 25.5H11.5Z"
            fill="#252525"
          />
          <path
            d="M13 21.5H23.5C25.433 21.5 27 19.933 27 18C27 16.1973 25.6373 14.7131 23.8861 14.5218C23.2294 12.1997 21.0919 10.5 18.5556 10.5C15.4873 10.5 13 12.9873 13 16.0556"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <path
            d="M11.5 25.5H24.5C27.5376 25.5 30 23.0376 30 20C30 17.1636 27.8528 14.8289 25.0951 14.5327C24.2229 10.7931 20.8691 8 16.875 8C12.2496 8 8.5 11.7496 8.5 16.375C8.5 16.7128 8.52002 17.046 8.55901 17.3735C6.53388 18.0819 5.08334 20.0086 5.08334 22.2727C5.08334 24.0551 6.52822 25.5 8.31061 25.5H11.5Z"
            fill="#101B35"
          />
          <path
            d="M13 21.5H23.5C25.433 21.5 27 19.933 27 18C27 16.1973 25.6373 14.7131 23.8861 14.5218C23.2294 12.1997 21.0919 10.5 18.5556 10.5C15.4873 10.5 13 12.9873 13 16.0556"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
  },
  {
    id: 'analytics',
    label: 'Analytics',
    sublabel: 'Live Insights',
    metric: 'Executive KPIs',
    angle: 245,
    renderIcon: (isDark) =>
      isDark ? (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="6" y="20" width="5" height="10" rx="1.8" fill="#525252" />
          <rect x="13.5" y="15" width="5" height="15" rx="1.8" fill="#A3A3A3" />
          <rect x="21" y="10" width="5" height="20" rx="1.8" fill="#FFFFFF" />
          <path
            d="M7 14L14.5 9.5L20 12.5L28.5 6"
            stroke="#D4D4D4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
          <rect x="6" y="20" width="5" height="10" rx="1.8" fill="#BAE6FD" />
          <rect x="13.5" y="15" width="5" height="15" rx="1.8" fill="#38BDF8" />
          <rect x="21" y="10" width="5" height="20" rx="1.8" fill="#101B35" />
          <path
            d="M7 14L14.5 9.5L20 12.5L28.5 6"
            stroke="#0284C7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
  },
];

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

const HERO_STATS: StatItem[] = [
  { target: 360, suffix: '°', label: 'Business Visibility' },
  { target: 24, suffix: '/7', label: 'Operational Access' },
  { target: 100, suffix: '%', label: 'Tailored Architecture' },
];

const AnimatedStat: React.FC<{ stat: StatItem; delay: number; isDark: boolean }> = ({
  stat,
  delay,
  isDark,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: EASE_PREMIUM }}
      className="py-3.5 sm:py-4 first:pt-0 last:pb-0 text-center md:text-left"
    >
      <div
        className={`font-display font-bold tracking-tight text-2xl sm:text-3xl lg:text-[2.1rem] tabular-nums leading-none ${
          isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
        }`}
      >
        <AnimatedCounter target={stat.target} delay={delay} />
        <span className={isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'}>{stat.suffix}</span>
      </div>
      <div
        className={`mt-1.5 text-xs sm:text-[13px] font-medium leading-snug ${
          isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
        }`}
      >
        {stat.label}
      </div>
    </motion.div>
  );
};

interface HeroOrbitalVisualProps {
  theme?: ThemeMode;
}

export const HeroOrbitalVisual: React.FC<HeroOrbitalVisualProps> = ({ theme = 'light' }) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState<string>('erp');
  const [wheelPhase, setWheelPhase] = useState<WheelAnimationPhase>('idle');
  const gradId = useId().replace(/:/g, '');
  const isDark = theme === 'dark';

  const orbitRingRef = useRef<HTMLDivElement | null>(null);
  const nodeCounterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wheelAngleRef = useRef<number>(0);
  const spinRafRef = useRef<number | null>(null);
  const resultTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);
  const isSpinningRef = useRef<boolean>(false);

  const applyWheelRotation = useCallback((angleDeg: number) => {
    wheelAngleRef.current = angleDeg;
    if (orbitRingRef.current) {
      orbitRingRef.current.style.transform = `rotate(${angleDeg.toFixed(2)}deg)`;
    }
    for (const el of nodeCounterRefs.current) {
      if (el) {
        el.style.transform = `rotate(${(-angleDeg).toFixed(2)}deg)`;
      }
    }
  }, []);

  const cancelSpin = useCallback((haltAudio: boolean = false) => {
    if (spinRafRef.current !== null) {
      window.cancelAnimationFrame(spinRafRef.current);
      spinRafRef.current = null;
    }
    if (resultTimerRef.current !== null) {
      window.clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
    isSpinningRef.current = false;
    setWheelPhase('idle');
    if (haltAudio) {
      stopAllSounds();
    }
  }, []);

  // Immediately silence wheel audio & cancel pending result reveal if user mutes mid-spin
  useEffect(() => {
    return soundManager.subscribe((prefs) => {
      if (!prefs.enabled) {
        if (resultTimerRef.current !== null) {
          window.clearTimeout(resultTimerRef.current);
          resultTimerRef.current = null;
        }
        stopAllSounds();
      }
    });
  }, []);

  // Gentle ambient slow orbit (paused automatically during active user wheel spin or reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;
    let ambientRaf: number | null = null;
    let lastTs: number | null = null;
    const degPerMs = 360 / 40000;

    const tickAmbient = (ts: number) => {
      if (!isSpinningRef.current && lastTs !== null) {
        const dt = Math.min(ts - lastTs, 64);
        applyWheelRotation(wheelAngleRef.current + dt * degPerMs);
      }
      lastTs = ts;
      ambientRaf = window.requestAnimationFrame(tickAmbient);
    };

    ambientRaf = window.requestAnimationFrame(tickAmbient);
    return () => {
      if (ambientRaf !== null) {
        window.cancelAnimationFrame(ambientRaf);
      }
    };
  }, [prefersReducedMotion, applyWheelRotation]);

  // Clean up any active wheel spin animation & audio timers on unmount
  useEffect(() => {
    return () => {
      cancelSpin(true);
    };
  }, [cancelSpin]);

  const handleSpinWheel = useCallback(() => {
    cancelSpin(true);

    const segmentCount = ORBITAL_NODES.length;
    const currentIdx = Math.max(
      0,
      ORBITAL_NODES.findIndex((n) => n.id === activeNodeId)
    );
    // Advance by 1..segmentCount-1 segments so every spin lands on a fresh capability
    const offset = 1 + Math.floor(Math.random() * (segmentCount - 1));
    const targetIdx = (currentIdx + offset) % segmentCount;

    const startAngle = wheelAngleRef.current;
    const totalDelta = computeTargetSpinDelta(
      startAngle,
      targetIdx,
      segmentCount,
      prefersReducedMotion ? 1 : 3
    );
    const durationMs = prefersReducedMotion ? 360 : WHEEL_SPIN_DURATION_MS;

    isSpinningRef.current = true;
    setWheelPhase('spinning');

    // Tactile 'ui-click' engages the spin immediately when global sound is enabled
    if (soundManager.isEnabled()) {
      playSound('ui-click', { bypassThrottle: true });
    }

    let lastSegment = getCumulativeWheelSegment(startAngle, segmentCount);
    const startTime = performance.now();

    const step = (now: number) => {
      if (!isSpinningRef.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      const frame = evaluateWheelSpinFrame({
        startAngleDeg: startAngle,
        totalDeltaDeg: totalDelta,
        progress,
        lastCumulativeSegment: lastSegment,
        segmentCount,
        soundEnabled: soundManager.isEnabled(),
      });

      applyWheelRotation(frame.angleDeg);

      if (frame.crossedSegment) {
        lastSegment = frame.cumulativeSegment;
        setActiveNodeId(ORBITAL_NODES[frame.segmentIndex].id);
      }

      for (const cue of frame.soundCues) {
        playSound(cue.soundId, {
          pitchMultiplier: cue.pitchMultiplier,
          bypassThrottle: cue.bypassThrottle,
        });
      }

      if (frame.phase === 'spinning') {
        spinRafRef.current = window.requestAnimationFrame(step);
      } else {
        spinRafRef.current = null;
        isSpinningRef.current = false;
        setWheelPhase('completed');
        setActiveNodeId(ORBITAL_NODES[frame.segmentIndex].id);

        resultTimerRef.current = window.setTimeout(() => {
          resultTimerRef.current = null;
          if (soundManager.isEnabled()) {
            playSound('wheel-result', { bypassThrottle: true });
          }
        }, WHEEL_RESULT_DELAY_MS);

        settleTimerRef.current = window.setTimeout(() => {
          settleTimerRef.current = null;
          if (!isSpinningRef.current) {
            setWheelPhase('idle');
          }
        }, WHEEL_RESULT_DELAY_MS + 320);
      }
    };

    spinRafRef.current = window.requestAnimationFrame(step);
  }, [activeNodeId, applyWheelRotation, cancelSpin, prefersReducedMotion]);

  const activeNode = ORBITAL_NODES.find((n) => n.id === activeNodeId) || ORBITAL_NODES[0];

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-4 xl:gap-6">
      {/* Orbital Architecture + Sweeping Curved Track */}
      <div className="relative flex-1 flex items-center justify-center w-full py-4 sm:py-6">
        <div className="relative w-[300px] h-[300px] sm:w-[390px] sm:h-[390px] lg:w-[410px] lg:h-[410px] xl:w-[450px] xl:h-[450px] flex items-center justify-center select-none">
          {/* Soft Ambient Aura */}
          <div
            className="absolute inset-4 rounded-full pointer-events-none"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(163, 163, 163, 0.03) 58%, transparent 76%)'
                : 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.18) 0%, rgba(16, 27, 53, 0.04) 58%, transparent 76%)',
            }}
          />

          {/* Translucent Frosted Orbital Track Ring */}
          <div
            className={`absolute inset-2 rounded-full pointer-events-none border-[18px] sm:border-[24px] ${
              isDark
                ? 'border-white/[0.035] shadow-[inset_0_0_40px_rgba(255,255,255,0.04)]'
                : 'border-[#101B35]/[0.04] shadow-[inset_0_0_40px_rgba(56,189,248,0.1)]'
            }`}
          />

          {/* Outer Precision Hairline Ring */}
          <div
            className={`absolute inset-0 rounded-full border pointer-events-none ${
              isDark ? 'border-[#303030]' : 'border-[#101B35]/10'
            }`}
          />

          {/* Sweeping Orbital Energy Beam */}
          <motion.svg
            viewBox="0 0 460 460"
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`orbGrad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isDark ? '#FFFFFF' : '#38BDF8'} stopOpacity="0.95" />
                <stop offset="50%" stopColor={isDark ? '#A3A3A3' : '#0284C7'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={isDark ? '#090909' : '#101B35'} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <circle
              cx="230"
              cy="230"
              r="217"
              fill="none"
              stroke={`url(#orbGrad-${gradId})`}
              strokeWidth="3.5"
              strokeDasharray="320 1120"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Secondary Dashed Inner Orbit */}
          <motion.div
            className={`absolute inset-[16%] rounded-full border border-dashed pointer-events-none ${
              isDark ? 'border-white/15' : 'border-[#101B35]/15'
            }`}
            animate={prefersReducedMotion ? undefined : { rotate: -360 }}
            transition={{ repeat: Infinity, duration: 48, ease: 'linear' }}
          />

          {/* Floating Mini ERP Analytics Widget (Top Right of Orbital Frame) */}
          <motion.div
            data-glass-layer="hero-pulse-widget"
            animate={prefersReducedMotion ? undefined : { y: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className={`ts-glass-accent hidden sm:flex absolute -top-2 right-0 sm:right-2 z-20 items-center gap-2.5 px-3.5 py-2 rounded-xl ${
              isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
            }`}
          >
            <div className="flex items-end gap-0.5 h-5" aria-hidden="true">
              <span className={`w-1 h-2.5 rounded-full ${isDark ? 'bg-[#737373]' : 'bg-sky-300'}`} />
              <span className={`w-1 h-4 rounded-full ${isDark ? 'bg-[#D4D4D4]' : 'bg-[#38BDF8]'}`} />
              <span className={`w-1 h-5 rounded-full ${isDark ? 'bg-white' : 'bg-[#0284C7]'}`} />
            </div>
            <div className="text-left">
              <div
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#A3A3A3]' : 'text-[#0284C7]'
                }`}
              >
                System Pulse
              </div>
              <div className="text-[11px] font-bold leading-tight">{activeNode.metric}</div>
            </div>
          </motion.div>

          {/* Central Abstract 3D TechSphere Core (interactive spin trigger) */}
          <motion.button
            type="button"
            data-sound="none"
            data-testid="hero-wheel-spin-button"
            data-spinning={wheelPhase === 'spinning' ? 'true' : 'false'}
            data-wheel-state={wheelPhase}
            onClick={handleSpinWheel}
            animate={prefersReducedMotion ? undefined : { y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            aria-label={`Spin TechSphere capability wheel — active: ${activeNode.label}`}
            title="Spin TechSphere capability wheel"
            className={`relative z-10 w-[136px] h-[136px] sm:w-[158px] sm:h-[158px] rounded-full p-4 flex flex-col items-center justify-center text-center border cursor-pointer focus:outline-none focus-visible:ring-2 ${
              isDark
                ? 'bg-gradient-to-br from-[#1D1D1D] via-[#171717] to-[#111111] shadow-[0_26px_55px_rgba(0,0,0,0.65)] border-[#303030] focus-visible:ring-white'
                : 'bg-gradient-to-br from-[#101B35] via-[#17294F] to-[#0B1326] shadow-[0_26px_55px_rgba(16,27,53,0.32)] border-sky-400/30 focus-visible:ring-[#38BDF8]'
            }`}
          >
            <div
              className="absolute inset-1 rounded-full pointer-events-none"
              style={{
                background: isDark
                  ? 'radial-gradient(circle at 28% 25%, rgba(255, 255, 255, 0.14) 0%, transparent 62%)'
                  : 'radial-gradient(circle at 28% 25%, rgba(56, 189, 248, 0.35) 0%, transparent 62%)',
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center mb-2 ${
                  isDark
                    ? 'bg-[#252525] border-[#303030]'
                    : 'bg-sky-400/15 border-sky-400/35'
                }`}
              >
                {activeNode.renderIcon(isDark)}
              </div>
              <span
                className={`text-[9.5px] font-semibold uppercase tracking-[0.16em] ${
                  isDark ? 'text-[#A3A3A3]' : 'text-[#38BDF8]'
                }`}
              >
                TechSphere
              </span>
              <span className="text-xs sm:text-sm font-display font-bold text-white mt-0.5 leading-tight">
                {activeNode.label}
              </span>
              <span className={`text-[10px] mt-0.5 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-300'}`}>
                {activeNode.sublabel}
              </span>
            </div>
          </motion.button>

          {/* Orbiting Application Icon Tiles (rotation driven directly for 1:1 audio-visual sync) */}
          <div
            ref={orbitRingRef}
            className="absolute inset-0 pointer-events-none will-change-transform"
          >
            {ORBITAL_NODES.map((node, index) => {
              const isActive = activeNodeId === node.id;
              const angleRad = (node.angle * Math.PI) / 180;
              const radiusPct = 42.5;
              const leftPct = 50 + radiusPct * Math.cos(angleRad);
              const topPct = 50 + radiusPct * Math.sin(angleRad);

              return (
                <div
                  key={node.id}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  <div
                    ref={(el) => {
                      nodeCounterRefs.current[index] = el;
                    }}
                    className="will-change-transform"
                  >
                    <motion.button
                      type="button"
                      data-sound="none"
                      data-sound-hover="true"
                      onClick={() => {
                        if (isSpinningRef.current) {
                          cancelSpin(true);
                        }
                        if (soundManager.isEnabled()) {
                          playSound('ui-click');
                        }
                        setActiveNodeId(node.id);
                      }}
                      onMouseEnter={() => {
                        if (!isSpinningRef.current) {
                          setActiveNodeId(node.id);
                        }
                      }}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: index % 2 === 0 ? [-3, 3, -3] : [3, -3, 3] }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 3.6 + index * 0.4,
                        ease: 'easeInOut',
                      }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                      data-glass-layer={`orbital-node-${node.id}`}
                      className={`ts-glass-accent ts-glass-accent-interactive group flex items-center gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-2xl transition-transform duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 ${
                        isDark
                          ? isActive
                            ? 'ring-2 ring-white scale-105 focus-visible:ring-white'
                            : 'hover:scale-105 focus-visible:ring-white'
                          : isActive
                          ? 'ring-2 ring-[#38BDF8] scale-105 focus-visible:ring-[#38BDF8]'
                          : 'hover:scale-105 focus-visible:ring-[#38BDF8]'
                      }`}
                      aria-label={`Inspect ${node.label} — ${node.sublabel}`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                          isDark
                            ? 'bg-[#111111] border-[#303030]'
                            : 'bg-[#F5FAFE] border-[#101B35]/[0.06]'
                        }`}
                      >
                        {node.renderIcon(isDark)}
                      </div>
                      <div className="hidden sm:block text-left pr-1">
                        <div
                          className={`text-[11px] font-bold whitespace-nowrap leading-none ${
                            isDark ? 'text-[#F5F5F5]' : 'text-[#172033]'
                          }`}
                        >
                          {node.label}
                        </div>
                        <div
                          className={`text-[9.5px] font-medium whitespace-nowrap mt-0.5 leading-none ${
                            isDark ? 'text-[#A3A3A3]' : 'text-slate-500'
                          }`}
                        >
                          {node.sublabel}
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertically Arranged Capability Metrics */}
      <div className="w-full md:w-[158px] lg:w-[164px] flex-shrink-0">
        <div
          className={`grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-0 divide-x md:divide-x-0 md:divide-y rounded-2xl md:rounded-none p-4 md:p-0 border md:border-0 ${
            isDark
              ? 'divide-[#303030] bg-[#171717]/80 md:bg-transparent border-[#303030]'
              : 'divide-[#101B35]/10 bg-white/80 md:bg-transparent border-[#101B35]/[0.06]'
          }`}
        >
          {HERO_STATS.map((stat, idx) => (
            <div key={stat.label} className="px-2 first:pl-0 last:pr-0 md:px-0">
              <AnimatedStat stat={stat} delay={0.12 + idx * 0.1} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
