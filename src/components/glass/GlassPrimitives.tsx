/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeMode } from '../../types.ts';

function joinClasses(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/* -------------------------------------------------------------------------- */
/* 1. GlassNavbar — Non-nested frosted glass plate for top navigation         */
/* -------------------------------------------------------------------------- */
export interface GlassNavbarProps {
  scrolled: boolean;
  className?: string;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({ scrolled, className }) => (
  <div
    aria-hidden="true"
    data-glass-layer="navbar"
    data-scrolled={scrolled ? 'true' : 'false'}
    className={joinClasses(
      'ts-glass-nav-plate pointer-events-none absolute inset-0 -z-10 transition-colors duration-300',
      className
    )}
  />
);

/* -------------------------------------------------------------------------- */
/* 2. GlassCard — Layered translucent frosted card for showcases & services   */
/* -------------------------------------------------------------------------- */
export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  layerName?: string;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ interactive = false, layerName = 'card', className, children, ...rest }, ref) => (
    <div
      ref={ref}
      data-glass-layer={layerName}
      className={joinClasses(
        'ts-glass-card relative',
        interactive && 'ts-glass-card-interactive',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
);
GlassCard.displayName = 'GlassCard';

/* -------------------------------------------------------------------------- */
/* 3. GlassPanel — Frosted glass container for forms, modals & feature blocks */
/* -------------------------------------------------------------------------- */
export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  layerName?: string;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ layerName = 'panel', className, children, ...rest }, ref) => (
    <div
      ref={ref}
      data-glass-layer={layerName}
      className={joinClasses('ts-glass-panel relative', className)}
      {...rest}
    >
      {children}
    </div>
  )
);
GlassPanel.displayName = 'GlassPanel';

/* -------------------------------------------------------------------------- */
/* 4. GlassDropdown — Detached frosted glass popover / menu surface           */
/* -------------------------------------------------------------------------- */
export interface GlassDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  layerName?: string;
}

export const GlassDropdown = React.forwardRef<HTMLDivElement, GlassDropdownProps>(
  ({ layerName = 'dropdown', className, children, ...rest }, ref) => (
    <div
      ref={ref}
      data-glass-layer={layerName}
      className={joinClasses('ts-glass-dropdown', className)}
      {...rest}
    >
      {children}
    </div>
  )
);
GlassDropdown.displayName = 'GlassDropdown';

/* -------------------------------------------------------------------------- */
/* 5. GlassButton — Glossy Primary or Translucent Frosted Secondary CTA       */
/* -------------------------------------------------------------------------- */
export type GlassButtonVariant = 'primary' | 'secondary' | 'embedded';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: ThemeMode;
  variant?: GlassButtonVariant;
}

export function getGlassButtonClass(
  theme: ThemeMode,
  variant: GlassButtonVariant = 'primary',
  extra?: string
): string {
  const isDark = theme === 'dark';

  if (variant === 'primary') {
    return joinClasses(
      'ts-glass-btn-primary cursor-pointer font-semibold focus:outline-none focus-visible:ring-2',
      isDark
        ? 'text-[#090909] focus-visible:ring-white'
        : 'text-white focus-visible:ring-[#38BDF8]',
      extra
    );
  }

  if (variant === 'embedded') {
    return joinClasses(
      'ts-glass-control cursor-pointer font-semibold transition-colors focus:outline-none focus-visible:ring-2',
      isDark
        ? 'text-[#F5F5F5] focus-visible:ring-white'
        : 'text-[#101B35] focus-visible:ring-[#38BDF8]',
      extra
    );
  }

  return joinClasses(
    'ts-glass-btn-secondary cursor-pointer font-semibold focus:outline-none focus-visible:ring-2',
    isDark
      ? 'text-[#F5F5F5] focus-visible:ring-white'
      : 'text-[#101B35] focus-visible:ring-[#38BDF8]',
    extra
  );
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ theme, variant = 'primary', className, type = 'button', children, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={getGlassButtonClass(theme, variant, className)}
      {...rest}
    >
      {children}
    </button>
  )
);
GlassButton.displayName = 'GlassButton';

/* -------------------------------------------------------------------------- */
/* 6. GlassInput — Translucent form field (zero nested backdrop-filter)       */
/* -------------------------------------------------------------------------- */
export function getGlassInputClass(
  theme: ThemeMode,
  hasError: boolean = false,
  extra?: string
): string {
  const isDark = theme === 'dark';
  return joinClasses(
    'ts-glass-input w-full rounded-xl px-4 py-3 text-base sm:text-sm',
    isDark
      ? 'text-[#F5F5F5] placeholder:text-[#737373]'
      : 'text-[#101B35] placeholder:text-[#6B7C93]',
    hasError && 'border-red-500/80',
    extra
  );
}

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme: ThemeMode;
  hasError?: boolean;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ theme, hasError = false, className, ...rest }, ref) => (
    <input
      ref={ref}
      aria-invalid={hasError ? 'true' : undefined}
      className={getGlassInputClass(theme, hasError, className)}
      {...rest}
    />
  )
);
GlassInput.displayName = 'GlassInput';
