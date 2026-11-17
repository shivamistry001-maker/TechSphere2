/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ERPDemoPlatform, ThemeMode } from '../../types.ts';

interface ERPPlatformLogoProps {
  platformId: ERPDemoPlatform['id'];
  theme: ThemeMode;
}

export const ERPPlatformLogo: React.FC<ERPPlatformLogoProps> = ({ platformId, theme }) => {
  const isDark = theme === 'dark';

  if (platformId === 'erpnext') {
    return (
      <div
        aria-hidden="true"
        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-display font-extrabold text-lg tracking-tight ${
          isDark
            ? 'bg-[#111111] border-[#303030] text-white'
            : 'bg-[#EFF6FF] border-[#0284C7]/25 text-[#0284C7]'
        }`}
      >
        E
      </div>
    );
  }

  if (platformId === 'odoo') {
    return (
      <div
        aria-hidden="true"
        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-display font-extrabold text-sm tracking-tight lowercase ${
          isDark
            ? 'bg-[#111111] border-[#303030] text-white'
            : 'bg-[#F5FAFE] border-[#101B35]/15 text-[#101B35]'
        }`}
      >
        odoo
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-display font-extrabold text-base tracking-tight ${
        isDark
          ? 'bg-[#111111] border-[#303030] text-white'
          : 'bg-[#EFF6FF] border-[#38BDF8]/30 text-[#0284C7]'
      }`}
    >
      Z
    </div>
  );
};
