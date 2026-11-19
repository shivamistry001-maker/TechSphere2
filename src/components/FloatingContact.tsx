/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Phone, Mail, MessageSquare, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData.ts';
import { ThemeMode } from '../types.ts';
import { EASE_PREMIUM } from '../utils/motion.ts';

interface FloatingContactProps {
  theme?: ThemeMode;
}

export const FloatingContact: React.FC<FloatingContactProps> = React.memo(({ theme = 'light' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello TechSphere Consultancy, I would like to discuss an ERP / IT solution for our business.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end">
      {/* Expanded Quick Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-glass-layer="floating-contact"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.2, ease: EASE_PREMIUM }}
            className="ts-glass-popover mb-3 p-3 rounded-2xl flex flex-col space-y-2 min-w-[252px]"
          >
            <div
              className={`px-2 py-1.5 border-b text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'border-white/10 text-[#F5F5F5]' : 'border-[#101B35]/10 text-[#0284C7]'
              }`}
            >
              Connect With TechSphere
            </div>

            {/* WhatsApp Direct */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-white/[0.08] border-white/10'
                  : 'text-[#101B35] hover:bg-emerald-50/90 border-emerald-600/15'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#252525] text-white' : 'bg-emerald-500/15 text-emerald-700'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">WhatsApp Chat</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-emerald-700'}`}>
                  Instant Response
                </span>
              </div>
            </a>

            {/* Phone 1 */}
            <a
              href={`tel:${COMPANY_INFO.phones[0].international}`}
              className={`flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-white/[0.08] border-white/10'
                  : 'text-[#101B35] hover:bg-[#F5FAFE] border-[#101B35]/[0.08]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#252525] text-[#D4D4D4]' : 'bg-sky-500/15 text-[#0284C7]'
                }`}
              >
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{COMPANY_INFO.phones[0].display}</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                  Direct Consultation
                </span>
              </div>
            </a>

            {/* Phone 2 */}
            <a
              href={`tel:${COMPANY_INFO.phones[1].international}`}
              className={`flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-white/[0.08] border-white/10'
                  : 'text-[#101B35] hover:bg-[#F5FAFE] border-[#101B35]/[0.08]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#252525] text-[#D4D4D4]' : 'bg-sky-500/15 text-[#0284C7]'
                }`}
              >
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{COMPANY_INFO.phones[1].display}</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                  Technical Desk
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className={`flex items-center gap-3 min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-white/[0.08] border-white/10'
                  : 'text-[#101B35] hover:bg-[#F5FAFE] border-[#101B35]/[0.08]'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-[#252525] text-[#D4D4D4]' : 'bg-sky-500/15 text-[#0284C7]'
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate font-semibold">{COMPANY_INFO.email}</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                  Project Inquiries
                </span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-4 ${
          isDark
            ? 'bg-white text-[#090909] hover:bg-[#E5E5E5] shadow-[0_14px_30px_rgba(0,0,0,0.68),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/25 focus-visible:ring-white/40'
            : 'bg-[#0284C7] bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1] text-white shadow-[0_14px_30px_rgba(2,132,199,0.34),inset_0_1px_0_rgba(255,255,255,0.45)] border border-white/25 focus-visible:ring-sky-400/50'
        }`}
        aria-label={isOpen ? 'Close Quick Contact' : 'Open Quick Contact Options'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
});
