/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

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
  // Dimensions for the visual mark
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Logo Mark: Faithful representation of the uploaded TechSphere official cyber globe with ascending dynamic arrow */}
      <div
        className={`relative flex-shrink-0 ${iconDimensions} rounded-xl p-0.5 transition-transform duration-300 group-hover:scale-105 ${
          theme === 'light'
            ? 'bg-slate-900 shadow-md shadow-sky-950/20'
            : 'bg-slate-900/90 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/20'
        }`}
      >
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full object-contain"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="TechSphere Official Logo"
        >
          <defs>
            <radialGradient id="markBgGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#0369a1" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="markArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="35%" stopColor="#0ea5e9" />
              <stop offset="85%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>

            <radialGradient id="markNodeGlow" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="30%" stopColor="#38bdf8" />
              <stop offset="75%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>

            <filter id="markGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ambient soft aura */}
          <circle cx="200" cy="200" r="185" fill="url(#markBgGlow)" />

          {/* Background cyber circuit traces */}
          <g opacity="0.35" stroke="#38bdf8" strokeWidth="1">
            <line x1="25" y1="170" x2="80" y2="170" />
            <circle cx="80" cy="170" r="2.5" fill="#38bdf8" />
            <line x1="320" y1="200" x2="375" y2="200" strokeDasharray="3,3" />
            <circle cx="340" cy="200" r="2" fill="#0ea5e9" />
          </g>

          {/* Globe Grid & Network Lines */}
          <g filter="url(#markGlow)">
            {/* Outer Globe Boundary */}
            <circle cx="200" cy="195" r="102" fill="none" stroke="#0284c7" strokeWidth="3" opacity="0.8" />
            <circle cx="200" cy="195" r="102" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.95" />

            {/* Meridians & Parallels */}
            <path d="M 200,93 C 165,140 165,250 200,297" fill="none" stroke="#0284c7" strokeWidth="2.2" opacity="0.8" />
            <path d="M 200,93 C 235,140 235,250 200,297" fill="none" stroke="#0284c7" strokeWidth="2.2" opacity="0.8" />
            <path d="M 112,150 C 150,185 250,185 288,150" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.75" />
            <path d="M 104,215 C 145,260 255,260 296,215" fill="none" stroke="#0284c7" strokeWidth="2" opacity="0.7" />

            {/* Diagonal Network Struts */}
            <line x1="200" y1="93" x2="152" y2="120" stroke="#0ea5e9" strokeWidth="2.2" />
            <line x1="200" y1="93" x2="252" y2="122" stroke="#0ea5e9" strokeWidth="2.2" />
            <line x1="152" y1="120" x2="180" y2="148" stroke="#38bdf8" strokeWidth="2.2" />
            <line x1="180" y1="148" x2="245" y2="175" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="152" y1="120" x2="118" y2="175" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="118" y1="175" x2="148" y2="215" stroke="#38bdf8" strokeWidth="2.2" />
            <line x1="148" y1="215" x2="180" y2="148" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="180" y1="148" x2="215" y2="215" stroke="#38bdf8" strokeWidth="2.4" />
            <line x1="215" y1="215" x2="245" y2="175" stroke="#0284c7" strokeWidth="2" />
            <line x1="215" y1="215" x2="242" y2="265" stroke="#0ea5e9" strokeWidth="2" />
            <line x1="180" y1="255" x2="200" y2="297" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="242" y1="265" x2="200" y2="297" stroke="#0284c7" strokeWidth="2" />
          </g>

          {/* Spherical Connected Nodes */}
          <g>
            <circle cx="200" cy="93" r="7" fill="url(#markNodeGlow)" />
            <circle cx="152" cy="120" r="7" fill="url(#markNodeGlow)" />
            <circle cx="118" cy="175" r="8" fill="url(#markNodeGlow)" />
            <circle cx="180" cy="148" r="14" fill="url(#markNodeGlow)" filter="url(#markGlow)" />
            <circle cx="252" cy="122" r="7" fill="url(#markNodeGlow)" />
            <circle cx="245" cy="175" r="9" fill="url(#markNodeGlow)" />
            <circle cx="215" cy="215" r="11" fill="url(#markNodeGlow)" filter="url(#markGlow)" />
            <circle cx="148" cy="215" r="12" fill="url(#markNodeGlow)" />
            <circle cx="180" cy="255" r="9" fill="url(#markNodeGlow)" />
            <circle cx="242" cy="265" r="12" fill="url(#markNodeGlow)" filter="url(#markGlow)" />
            <circle cx="200" cy="297" r="7" fill="url(#markNodeGlow)" />
          </g>

          {/* The Iconic Ascending Curved Arrow Swoosh */}
          <g filter="url(#markGlow)">
            <path
              d="M 102,246 C 115,272 175,276 226,238 C 268,206 288,166 312,135 L 298,131 L 332,108 L 322,148 L 308,141 C 278,178 252,226 202,258 C 152,282 114,270 102,246 Z"
              fill="url(#markArrowGrad)"
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
              } ${
                theme === 'light'
                  ? 'text-slate-900'
                  : 'text-white'
              }`}
            >
              TECH<span className="text-sky-400">SPHERE</span>
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
              } ${
                theme === 'light' ? 'text-slate-600' : 'text-sky-300/80'
              }`}
            >
              IT &amp; ERP Consultancy
            </span>
          )}
        </div>
      )}
    </div>
  );
};
