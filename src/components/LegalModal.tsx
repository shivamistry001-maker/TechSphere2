/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData.ts';
import { ThemeMode } from '../types.ts';
import { modalBackdropVariants, modalContentVariants } from '../utils/motion.ts';
import { playSound } from '../utils/soundManager.ts';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
  theme?: ThemeMode;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();
  const prevTypeRef = useRef<typeof type>(null);

  useEffect(() => {
    if (type && !prevTypeRef.current) {
      playSound('ui-open');
    } else if (!type && prevTypeRef.current) {
      playSound('ui-close');
    }
    prevTypeRef.current = type;
  }, [type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && type) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  // Lock background scroll while modal is open
  useEffect(() => {
    if (!type) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [type]);

  const headingAccent = isDark ? 'font-bold text-white' : 'font-bold text-sky-600';
  const linkAccent = isDark
    ? 'inline-flex items-center min-h-[44px] sm:min-h-0 text-white underline hover:text-[#D4D4D4]'
    : 'inline-flex items-center min-h-[44px] sm:min-h-0 text-sky-600 underline';

  const contentMap = type
    ? {
        privacy: {
          title: 'Privacy Policy',
          icon: ShieldCheck,
          body: (
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <p>
                At <strong>{COMPANY_INFO.name}</strong> (&quot;TechSphere&quot;, &quot;we&quot;, &quot;our&quot;), we respect your privacy and are committed to safeguarding the proprietary information and data you share with us.
              </p>
              <h5 className={headingAccent}>1. Information We Collect</h5>
              <p>
                When you request a consultation, submit inquiry forms, or engage our advisory services, we collect contact details (such as your full name, company name, email address, and phone number) as well as operational context regarding your technology stack and workflow objectives.
              </p>
              <h5 className={headingAccent}>2. How We Use Your Information</h5>
              <p>
                We use your data solely to respond to project inquiries, conduct technology compatibility evaluations, provide ERP architecture recommendations, and deliver contractual implementation services. We never sell, rent, or trade your data to third parties.
              </p>
              <h5 className={headingAccent}>3. Enterprise Confidentiality (NDA)</h5>
              <p>
                We treat all proprietary operational diagrams, inventory records, financial schemas, and software credentials with strict confidentiality, backed by standard non-disclosure agreements prior to system access.
              </p>
              <h5 className={headingAccent}>4. Contact Inquiries</h5>
              <p>
                For privacy inquiries or data removal requests, contact us directly at{' '}
                <a href={`mailto:${COMPANY_INFO.email}`} className={linkAccent}>
                  {COMPANY_INFO.email}
                </a>
                .
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
              <h5 className={headingAccent}>1. Advisory &amp; Consultancy Services</h5>
              <p>
                TechSphere provides strategic IT consulting, open-source and modular ERP implementation (including ERPNext, Odoo, and Zoho ecosystems), workflow automation, and custom web software engineering. Specific deliverables, scope, and warranties are governed by signed Statements of Work (SOW).
              </p>
              <h5 className={headingAccent}>2. Third-Party Software &amp; Trademarks</h5>
              <p>
                ERPNext, Odoo, Zoho, Tally, SAP, and other named software systems and registered trademarks belong to their respective owners. TechSphere operates as an independent consultancy and technology integrator.
              </p>
              <h5 className={headingAccent}>3. Intellectual Property</h5>
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
              <h5 className={headingAccent}>1. Essential Local Storage</h5>
              <p>
                We store basic preference keys such as your chosen color theme in your browser&apos;s local storage. This data remains on your device and does not track your browsing across other websites.
              </p>
              <h5 className={headingAccent}>2. Disabling Cookies</h5>
              <p>
                You can configure your browser settings to decline local storage and cookies; however, your theme preference may reset upon page refresh.
              </p>
            </div>
          ),
        },
      }[type]
    : null;

  const IconComp = contentMap?.icon;

  return (
    <AnimatePresence>
      {contentMap && IconComp && (
        <motion.div
          key="legal-modal"
          variants={prefersReducedMotion ? undefined : modalBackdropVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          exit={prefersReducedMotion ? undefined : 'exit'}
          onClick={onClose}
          className="ts-glass-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          {/* Modal Window */}
          <motion.div
            variants={prefersReducedMotion ? undefined : modalContentVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            exit={prefersReducedMotion ? undefined : 'exit'}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 sm:p-8 overflow-y-auto z-10 border shadow-2xl ${
              isDark
                ? 'bg-[#171717] border-[#303030] text-[#D4D4D4] shadow-black'
                : 'bg-white border-slate-200 text-slate-700 shadow-slate-300'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-4 border-b mb-6 ${
                isDark ? 'border-[#303030]' : 'border-sky-500/15'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-[#252525] text-white border border-[#303030]' : 'bg-sky-500/15 text-sky-600'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                </div>
                <h3
                  id="legal-modal-title"
                  className={`text-lg sm:text-xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}
                >
                  {contentMap.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                  isDark
                    ? 'text-[#A3A3A3] hover:text-white hover:bg-[#252525]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto">{contentMap.body}</div>

            <div
              className={`pt-6 mt-6 border-t flex justify-end ${
                isDark ? 'border-[#303030]' : 'border-sky-500/10'
              }`}
            >
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-white hover:bg-[#D4D4D4] text-[#090909]'
                    : 'bg-sky-500 hover:bg-sky-600 text-white'
                }`}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
