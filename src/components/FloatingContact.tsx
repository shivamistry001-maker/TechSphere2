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

export const FloatingContact: React.FC<FloatingContactProps> = ({ theme = 'light' }) => {
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
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.2, ease: EASE_PREMIUM }}
            className={`mb-3 p-3 backdrop-blur-xl border rounded-2xl shadow-2xl flex flex-col space-y-2 min-w-[248px] ${
              isDark
                ? 'bg-[#171717]/95 border-[#303030] shadow-black/85'
                : 'bg-slate-900/95 border-sky-500/25 shadow-black/60'
            }`}
          >
            <div
              className={`px-2 py-1 border-b text-[11px] font-semibold uppercase tracking-wider ${
                isDark ? 'border-[#303030] text-[#F5F5F5]' : 'border-slate-800 text-sky-400'
              }`}
            >
              Connect With TechSphere
            </div>

            {/* WhatsApp Direct */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-[#252525] border-[#303030]'
                  : 'text-emerald-300 hover:bg-emerald-950/40 hover:text-emerald-200 border-emerald-500/20'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-[#252525] text-white' : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">WhatsApp Chat</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-emerald-400/80'}`}>
                  Instant Response
                </span>
              </div>
            </a>

            {/* Phone 1 */}
            <a
              href={`tel:${COMPANY_INFO.phones[0].raw}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-[#252525] border-[#303030]'
                  : 'text-sky-200 hover:bg-sky-950/40 hover:text-white border-sky-500/15'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-[#252525] text-[#D4D4D4]' : 'bg-sky-500/20 text-sky-400'
                }`}
              >
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>{COMPANY_INFO.phones[0].display}</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-slate-400'}`}>
                  Direct Consultation
                </span>
              </div>
            </a>

            {/* Phone 2 */}
            <a
              href={`tel:${COMPANY_INFO.phones[1].raw}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-[#252525] border-[#303030]'
                  : 'text-sky-200 hover:bg-sky-950/40 hover:text-white border-sky-500/15'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-[#252525] text-[#D4D4D4]' : 'bg-sky-500/20 text-sky-400'
                }`}
              >
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>{COMPANY_INFO.phones[1].display}</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-slate-400'}`}>
                  Technical Desk
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors border ${
                isDark
                  ? 'text-[#F5F5F5] hover:bg-[#252525] border-[#303030]'
                  : 'text-slate-200 hover:bg-slate-800 border-slate-700/60'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-[#252525] text-[#D4D4D4]' : 'bg-slate-800 text-sky-400'
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate">{COMPANY_INFO.email}</span>
                <span className={`text-[10px] ${isDark ? 'text-[#A3A3A3]' : 'text-slate-400'}`}>
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
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.93 }}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-4 ${
          isDark
            ? 'bg-white text-[#090909] hover:bg-[#D4D4D4] shadow-black/70 border border-[#303030] focus-visible:ring-white/40'
            : 'bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white shadow-sky-600/35 hover:shadow-sky-500/50 focus-visible:ring-sky-400/50'
        }`}
        aria-label={isOpen ? 'Close Quick Contact' : 'Open Quick Contact Options'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};
