/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';

interface TechSphereLogoProps {
  variant?: 'full' | 'mark-only' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: 'dark' | 'light';
}

export const TechSphereLogo: React.FC<TechSphereLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  theme = 'dark',
}) => {
  const uid = useId().replace(/:/g, '');
  const isDark = theme === 'dark';

  // Dimensions for the visual mark
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  // Theme-calibrated palette (Sky-blue in Light mode; pure monochrome Black/Grey/White in Dark mode)
  const palette = isDark
    ? {
        bgAuraStart: '#FFFFFF',
        bgAuraMid: '#A3A3A3',
        circuit: '#D4D4D4',
        circuitDot: '#FFFFFF',
        globeOuter: '#737373',
        globeInner: '#F5F5F5',
        meridian: '#A3A3A3',
        strutPrimary: '#D4D4D4',
        strutSecondary: '#737373',
        nodeHighlight: '#FFFFFF',
        nodeMid: '#D4D4D4',
        nodeBase: '#737373',
        nodeDeep: '#404040',
        arrow0: '#737373',
        arrow1: '#D4D4D4',
        arrow2: '#F5F5F5',
        arrow3: '#FFFFFF',
      }
    : {
        bgAuraStart: '#0284c7',
        bgAuraMid: '#0369a1',
        circuit: '#38bdf8',
        circuitDot: '#0ea5e9',
        globeOuter: '#0284c7',
        globeInner: '#38bdf8',
        meridian: '#0ea5e9',
        strutPrimary: '#38bdf8',
        strutSecondary: '#0284c7',
        nodeHighlight: '#f0f9ff',
        nodeMid: '#38bdf8',
        nodeBase: '#0284c7',
        nodeDeep: '#0369a1',
        arrow0: '#0284c7',
        arrow1: '#0ea5e9',
        arrow2: '#38bdf8',
        arrow3: '#e0f2fe',
      };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Logo Mark */}
      <div
        className={`relative flex-shrink-0 ${iconDimensions} rounded-xl p-0.5 transition-transform duration-300 group-hover:scale-105 ${
          isDark
            ? 'bg-[#171717] shadow-lg shadow-black/50 ring-1 ring-[#303030]'
            : 'bg-slate-900 shadow-md shadow-sky-950/20'
        }`}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full object-contain"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="TechSphere Official Logo"
        >
          <defs>
            <radialGradient id={`markBgGlow-${uid}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={palette.bgAuraStart} stopOpacity={isDark ? '0.14' : '0.25'} />
              <stop offset="70%" stopColor={palette.bgAuraMid} stopOpacity="0.05" />
              <stop offset="100%" stopColor="#090909" stopOpacity="0" />
            </radialGradient>

            <linearGradient id={`markArrowGrad-${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={palette.arrow0} />
              <stop offset="35%" stopColor={palette.arrow1} />
              <stop offset="85%" stopColor={palette.arrow2} />
              <stop offset="100%" stopColor={palette.arrow3} />
            </linearGradient>

            <radialGradient id={`markNodeGlow-${uid}`} cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor={palette.nodeHighlight} />
              <stop offset="30%" stopColor={palette.nodeMid} />
              <stop offset="75%" stopColor={palette.nodeBase} />
              <stop offset="100%" stopColor={palette.nodeDeep} />
            </radialGradient>

            <filter id={`markGlow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={isDark ? '2' : '3.5'} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient soft aura */}
          <circle cx="200" cy="200" r="185" fill={`url(#markBgGlow-${uid})`} />

          {/* Background cyber circuit traces */}
          <g opacity="0.35" stroke={palette.circuit} strokeWidth="1">
            <line x1="25" y1="170" x2="80" y2="170" />
            <circle cx="80" cy="170" r="2.5" fill={palette.circuit} />
            <line x1="320" y1="200" x2="375" y2="200" strokeDasharray="3,3" />
            <circle cx="340" cy="200" r="2" fill={palette.circuitDot} />
          </g>

          {/* Globe Grid & Network Lines */}
          <g filter={`url(#markGlow-${uid})`}>
            <circle cx="200" cy="195" r="102" fill="none" stroke={palette.globeOuter} strokeWidth="3" opacity="0.8" />
            <circle cx="200" cy="195" r="102" fill="none" stroke={palette.globeInner} strokeWidth="1.2" opacity="0.95" />

            <path d="M 200,93 C 165,140 165,250 200,297" fill="none" stroke={palette.globeOuter} strokeWidth="2.2" opacity="0.8" />
            <path d="M 200,93 C 235,140 235,250 200,297" fill="none" stroke={palette.globeOuter} strokeWidth="2.2" opacity="0.8" />
            <path d="M 112,150 C 150,185 250,185 288,150" fill="none" stroke={palette.meridian} strokeWidth="2" opacity="0.75" />
            <path d="M 104,215 C 145,260 255,260 296,215" fill="none" stroke={palette.globeOuter} strokeWidth="2" opacity="0.7" />

            <line x1="200" y1="93" x2="152" y2="120" stroke={palette.meridian} strokeWidth="2.2" />
            <line x1="200" y1="93" x2="252" y2="122" stroke={palette.meridian} strokeWidth="2.2" />
            <line x1="152" y1="120" x2="180" y2="148" stroke={palette.strutPrimary} strokeWidth="2.2" />
            <line x1="180" y1="148" x2="245" y2="175" stroke={palette.strutSecondary} strokeWidth="2.2" />
            <line x1="152" y1="120" x2="118" y2="175" stroke={palette.strutSecondary} strokeWidth="2.2" />
            <line x1="118" y1="175" x2="148" y2="215" stroke={palette.strutPrimary} strokeWidth="2.2" />
            <line x1="148" y1="215" x2="180" y2="148" stroke={palette.strutSecondary} strokeWidth="2.2" />
            <line x1="180" y1="148" x2="215" y2="215" stroke={palette.strutPrimary} strokeWidth="2.4" />
            <line x1="215" y1="215" x2="245" y2="175" stroke={palette.strutSecondary} strokeWidth="2" />
            <line x1="215" y1="215" x2="242" y2="265" stroke={palette.meridian} strokeWidth="2" />
            <line x1="180" y1="255" x2="200" y2="297" stroke={palette.strutSecondary} strokeWidth="2.2" />
            <line x1="242" y1="265" x2="200" y2="297" stroke={palette.strutSecondary} strokeWidth="2.2" />
          </g>

          {/* Spherical Connected Nodes */}
          <g>
            <circle cx="200" cy="93" r="7" fill={`url(#markNodeGlow-${uid})`} />
            <circle cx="152" cy="120" r="7" fill={`url(#markNodeGlow-${uid})`} />
            <circle cx="118" cy="175" r="8" fill={`url(#markNodeGlow-${uid})`} />
            <circle cx="180" cy="148" r="14" fill={`url(#markNodeGlow-${uid})`} filter={`url(#markGlow-${uid})`} />
            <circle cx="252" cy="122" r="7" fill={`url(#markNodeGlow-${uid})`} />
            <circle cx="245" cy="175" r="9" fill={`url(#markNodeGlow-${uid})`} />
            <circle cx="215" cy="215" r="11" fill={`url(#markNodeGlow-${uid})`} filter={`url(#markGlow-${uid})`} />
            <circle cx="148" cy="215" r="12" fill={`url(#markNodeGlow-${uid})`} />
            <circle cx="180" cy="255" r="9" fill={`url(#markNodeGlow-${uid})`} />
            <circle cx="242" cy="265" r="12" fill={`url(#markNodeGlow-${uid})`} filter={`url(#markGlow-${uid})`} />
            <circle cx="200" cy="297" r="7" fill={`url(#markNodeGlow-${uid})`} />
          </g>

          {/* Ascending Curved Arrow Swoosh */}
          <g filter={`url(#markGlow-${uid})`}>
            <path
              d="M 102,246 C 115,272 175,276 226,238 C 268,206 288,166 312,135 L 298,131 L 332,108 L 322,148 L 308,141 C 278,178 252,226 202,258 C 152,282 114,270 102,246 Z"
              fill={`url(#markArrowGrad-${uid})`}
            />
            <path
              d="M 105,250 C 145,280 205,260 252,225 C 285,200 305,155 318,132 L 332,108 L 322,148 C 305,175 275,230 202,262 C 152,282 118,272 105,250 Z"
              fill="#ffffff"
              opacity="0.4"
            />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'mark-only' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-display font-extrabold tracking-tight ${
                size === 'sm'
                  ? 'text-lg'
                  : size === 'md'
                  ? 'text-xl sm:text-2xl'
                  : size === 'lg'
                  ? 'text-2xl sm:text-3xl'
                  : 'text-3xl sm:text-4xl'
              } ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}
            >
              TECH<span className={isDark ? 'text-[#D4D4D4]' : 'text-sky-400'}>SPHERE</span>
            </span>
          </div>
          {variant === 'full' && (
            <span
              className={`font-medium tracking-wider uppercase ${
                size === 'sm'
                  ? 'text-[9px]'
                  : size === 'md'
                  ? 'text-[10px] sm:text-[11px]'
                  : 'text-xs'
              } ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}
            >
              IT &amp; ERP Consultancy
            </span>
          )}
        </div>
      )}
    </div>
  );
};
