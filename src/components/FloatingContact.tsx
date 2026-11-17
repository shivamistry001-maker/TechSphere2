/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MessageSquare, X, ChevronUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData.ts';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp click handler
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello TechSphere Consultancy, I would like to discuss an ERP / IT solution for our business.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ duration: 0.18 }}
            className="mb-3 p-3 bg-slate-900/95 backdrop-blur-xl border border-sky-500/25 rounded-2xl shadow-2xl shadow-black/80 flex flex-col space-y-2 min-w-[240px]"
          >
            <div className="px-2 py-1 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-sky-400">
              Connect With TechSphere
            </div>

            {/* WhatsApp Direct */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-emerald-300 hover:bg-emerald-950/40 hover:text-emerald-200 transition-colors border border-emerald-500/20"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">WhatsApp Chat</span>
                <span className="text-[10px] text-emerald-400/80">Instant Response</span>
              </div>
            </a>

            {/* Phone 1 */}
            <a
              href={`tel:${COMPANY_INFO.phones[0].raw}`}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-sky-200 hover:bg-sky-950/40 hover:text-white transition-colors border border-sky-500/15"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>{COMPANY_INFO.phones[0].display}</span>
                <span className="text-[10px] text-slate-400">Direct Consultation</span>
              </div>
            </a>

            {/* Phone 2 */}
            <a
              href={`tel:${COMPANY_INFO.phones[1].raw}`}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-sky-200 hover:bg-sky-950/40 hover:text-white transition-colors border border-sky-500/15"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span>{COMPANY_INFO.phones[1].display}</span>
                <span className="text-[10px] text-slate-400">Technical Desk</span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors border border-slate-700/60"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate">{COMPANY_INFO.email}</span>
                <span className="text-[10px] text-slate-400">Project Inquiries</span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white shadow-xl shadow-sky-600/35 hover:shadow-sky-500/50 hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/50"
        aria-label={isOpen ? 'Close Quick Contact' : 'Open Quick Contact Options'}
        aria-expanded={isOpen}
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400"></span>
        </span>
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};
