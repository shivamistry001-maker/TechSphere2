/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { COMPANY_INFO } from '../data/companyData.ts';
import { ContactConsultationForm } from '../components/ContactConsultationForm.tsx';
import { Phone, Mail, Globe, MessageSquare, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  initialService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  theme,
  initialService,
}) => {
  const isDark = theme === 'dark';

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello TechSphere Consultancy, I would like to schedule an ERP / IT consultation.'
  )}`;

  return (
    <div className="space-y-16 sm:space-y-24 pt-8 sm:pt-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Direct Access
        </span>
        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Connect With Our ERP &amp; IT Specialists
        </h1>
        <p className={`text-base sm:text-lg mt-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Whether you need a full ERPNext or Odoo migration, custom cloud software engineering, or an impartial technology review, our advisory team is ready.
        </p>
      </section>

      {/* Main Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div
              className={`rounded-3xl p-7 sm:p-8 border space-y-6 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
              }`}
            >
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Direct Channels
              </h2>

              <div className="space-y-4 text-sm">
                {/* Phone Numbers */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Direct Telephone</span>
                    <div className="flex flex-col space-y-1 font-semibold text-sm sm:text-base mt-0.5">
                      <a
                        href={`tel:${COMPANY_INFO.phones[0].raw}`}
                        className={`hover:text-sky-400 transition-colors ${
                          isDark ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        {COMPANY_INFO.phones[0].display}
                      </a>
                      <a
                        href={`tel:${COMPANY_INFO.phones[1].raw}`}
                        className={`hover:text-sky-400 transition-colors ${
                          isDark ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        {COMPANY_INFO.phones[1].display}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Official Inquiries</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className={`font-semibold hover:text-sky-400 transition-colors block mt-0.5 ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">WhatsApp Business</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors block mt-0.5"
                    >
                      Chat on WhatsApp (+91 83208 06363)
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Headquarters &amp; Coverage</span>
                    <span className={`font-semibold block mt-0.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {COMPANY_INFO.location}
                    </span>
                    <span className="text-xs text-slate-400">Serving global clients remotely across timezones.</span>
                  </div>
                </div>
              </div>

              {/* Consultation Guarantee */}
              <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2 text-xs text-sky-500 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>24-Hour Business Response Guarantee</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Every submitted inquiry is routed directly to a senior systems consultant, not an automated sales chatbot.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <ContactConsultationForm
              initialService={initialService || 'ERP Consultancy'}
              theme={theme}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
