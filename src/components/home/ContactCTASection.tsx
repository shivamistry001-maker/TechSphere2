/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { PageId, ThemeMode } from '../../types.ts';
import { COMPANY_INFO } from '../../data/companyData.ts';

interface ContactCTASectionProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({
  onNavigate,
  theme = 'light',
}) => {
  const [state, handleSubmit, reset] = useForm('xaqrejgl');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('ERP Consultancy');
  const [requirements, setRequirements] = useState('');

  const isDark = theme === 'dark';

  const handleReset = () => {
    reset();
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setService('ERP Consultancy');
    setRequirements('');
  };

  const whatsappText = encodeURIComponent(
    `Hello TechSphere Team, I'd like to discuss ${service} for ${company || 'my business'}.`
  );

  return (
    <section
      className={`py-16 sm:py-24 transition-colors duration-300 ${
        isDark ? 'bg-[#070D1C]' : 'bg-[#F5FAFE]'
      }`}
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Deep Navy Rounded Split Container (Inspired by 00:06-00:07) */}
        <div className="rounded-3xl bg-[#101B35] text-white p-6 sm:p-10 lg:p-14 border border-sky-400/20 shadow-[0_30px_70px_rgba(16,27,53,0.22)] relative overflow-hidden">
          {/* Subtle Sky-Blue Corner Glow */}
          <div
            className="absolute -top-24 -left-24 w-[460px] h-[460px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN: Final CTA Copy, Action Buttons & WhatsApp Integration */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
                  Start Your Transformation
                </span>
                <h2
                  id="final-cta-heading"
                  className="font-display font-extrabold text-white tracking-tight leading-[1.08] text-balance"
                  style={{ fontSize: 'clamp(1.95rem, 3.4vw, 2.9rem)' }}
                >
                  Let&apos;s Build Something Powerful Together.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Have a business challenge? Let&apos;s find the right technology solution for your business.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('request-consultation')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#101B35] text-xs font-bold tracking-wide whitespace-nowrap transition-all cursor-pointer"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer"
                  >
                    <span>Contact TechSphere</span>
                  </button>
                </div>
              </div>

              {/* Advisory & Direct WhatsApp Integration Card (Inspired by 00:06-00:07 Left Overlay Card) */}
              <div className="rounded-2xl bg-[#0B1429]/90 border border-sky-400/20 p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#38BDF8]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Advisory &amp; Fast WhatsApp Connect</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Prefer a quick message or direct call? Connect directly with a TechSphere consultant for ERP advisory, Odoo/ERPNext demos, or web project scoping.
                </p>

                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.phones[0].raw}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>{COMPANY_INFO.phones[0].display}</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{COMPANY_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Embedded Formspree Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#0B1429]/90 border border-white/10 p-6 sm:p-8">
                {state.succeeded ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">Thank You!</h3>
                    <p className="text-sm text-[#38BDF8] font-medium max-w-md mx-auto">
                      Your consultation request has been received. Our team will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-white/20 text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {state.errors && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Please verify your required details and try again.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="home-name"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          Name <span className="text-[#38BDF8]">*</span>
                        </label>
                        <input
                          id="home-name"
                          name="fullName"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-400 outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                        />
                        <ValidationError
                          prefix="Name"
                          field="fullName"
                          errors={state.errors}
                          className="text-[11px] text-red-400 mt-1 block"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="home-company"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          Company
                        </label>
                        <input
                          id="home-company"
                          name="companyName"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Industries"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-400 outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="home-email"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          Email <span className="text-[#38BDF8]">*</span>
                        </label>
                        <input
                          id="home-email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-400 outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-[11px] text-red-400 mt-1 block"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="home-phone"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                        >
                          Phone <span className="text-[#38BDF8]">*</span>
                        </label>
                        <input
                          id="home-phone"
                          name="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 83208 06363"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-400 outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                        />
                        <ValidationError
                          prefix="Phone"
                          field="phone"
                          errors={state.errors}
                          className="text-[11px] text-red-400 mt-1 block"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="home-service"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                      >
                        Service Interested In
                      </label>
                      <select
                        id="home-service"
                        name="interestedService"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#101B35] border border-white/15 text-sm text-white outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]"
                      >
                        <option value="ERP Consultancy">ERP Consultancy</option>
                        <option value="Odoo ERP Solutions">Odoo ERP Solutions</option>
                        <option value="ERPNext Solutions">ERPNext Solutions</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Business Automation">Business Automation</option>
                        <option value="IT Consultancy">IT Consultancy</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="home-requirements"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                      >
                        Project Requirements <span className="text-[#38BDF8]">*</span>
                      </label>
                      <textarea
                        id="home-requirements"
                        name="message"
                        rows={3}
                        required
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Tell us about your current systems, processes to automate, or goals..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-400 outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] resize-y"
                      />
                      <ValidationError
                        prefix="Project Requirements"
                        field="message"
                        errors={state.errors}
                        className="text-[11px] text-red-400 mt-1 block"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-[#F5FAFE] text-[#101B35] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {state.submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <ArrowRight className="w-4 h-4 text-[#0284C7]" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
