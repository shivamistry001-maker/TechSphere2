/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData.ts';
import { ThemeMode } from '../types.ts';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
  theme?: ThemeMode;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && type) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>
            At <strong>{COMPANY_INFO.name}</strong> ("TechSphere", "we", "our"), we respect your privacy and are committed to safeguarding the proprietary information and data you share with us.
          </p>
          <h5 className="font-bold text-sky-400">1. Information We Collect</h5>
          <p>
            When you request a consultation, submit inquiry forms, or engage our advisory services, we collect contact details (such as your full name, company name, email address, and phone number) as well as operational context regarding your technology stack and workflow objectives.
          </p>
          <h5 className="font-bold text-sky-400">2. How We Use Your Information</h5>
          <p>
            We use your data solely to respond to project inquiries, conduct technology compatibility evaluations, provide ERP architecture recommendations, and deliver contractual implementation services. We never sell, rent, or trade your data to third parties.
          </p>
          <h5 className="font-bold text-sky-400">3. Enterprise Confidentiality (NDA)</h5>
          <p>
            We treat all proprietary operational diagrams, inventory records, financial schemas, and software credentials with strict confidentiality, backed by standard non-disclosure agreements prior to system access.
          </p>
          <h5 className="font-bold text-sky-400">4. Contact Inquiries</h5>
          <p>
            For privacy inquiries or data removal requests, contact us directly at{' '}
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-sky-400 underline">
              {COMPANY_INFO.email}
            </a>.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>
            Welcome to <strong>{COMPANY_INFO.name}</strong>. By accessing this website or engaging our technology consultancy, you agree to these Terms and Conditions.
          </p>
          <h5 className="font-bold text-sky-400">1. Advisory & Consultancy Services</h5>
          <p>
            TechSphere provides strategic IT consulting, open-source and modular ERP implementation (including ERPNext, Odoo, and Zoho ecosystems), workflow automation, and custom web software engineering. Specific deliverables, scope, and warranties are governed by signed Statements of Work (SOW).
          </p>
          <h5 className="font-bold text-sky-400">2. Third-Party Software & Trademarks</h5>
          <p>
            ERPNext, Odoo, Zoho, Tally, SAP, and other named software systems and registered trademarks belong to their respective owners. TechSphere operates as an independent consultancy and technology integrator.
          </p>
          <h5 className="font-bold text-sky-400">3. Intellectual Property</h5>
          <p>
            Unless explicitly specified in a custom development agreement, client bespoke configurations and proprietary integrations developed under contract belong to the client upon full payment.
          </p>
        </div>
      ),
    },
    cookies: {
      title: 'Cookie Policy',
      icon: Cookie,
      body: (
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>
            This website uses essential cookies and local storage tokens solely to maintain your theme preferences (Dark/Light mode) and facilitate smooth navigation during your session.
          </p>
          <h5 className="font-bold text-sky-400">1. Essential Local Storage</h5>
          <p>
            We store basic preference keys such as your chosen color theme in your browser's local storage. This data remains on your device and does not track your browsing across other websites.
          </p>
          <h5 className="font-bold text-sky-400">2. Disabling Cookies</h5>
          <p>
            You can configure your browser settings to decline local storage and cookies; however, your theme preference may reset upon page refresh.
          </p>
        </div>
      ),
    },
  }[type];

  const IconComp = contentMap.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 sm:p-8 overflow-y-auto z-10 border shadow-2xl ${
            isDark
              ? 'bg-slate-900 border-sky-500/25 text-slate-300 shadow-black'
              : 'bg-white border-slate-200 text-slate-700 shadow-slate-300'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-sky-500/15 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <IconComp className="w-4 h-4" />
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {contentMap.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto">{contentMap.body}</div>

          <div className="pt-6 mt-6 border-t border-sky-500/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
