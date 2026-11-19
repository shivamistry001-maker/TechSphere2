/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
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
import {
  ScrollCascadeBlock,
  ScrollCascadeGrid,
  ScrollParallaxLayer,
  ScrollSectionContainer,
  useIsDesktop,
} from '../motion/MotionPrimitives.tsx';

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

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

  const inputBaseClass = isDark
    ? 'w-full px-4 py-3 rounded-xl bg-[#1D1D1D] border border-[#303030] text-sm text-[#F5F5F5] placeholder-[#737373] outline-none transition-colors duration-200 focus:border-white focus:ring-1 focus:ring-white'
    : 'w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-sm text-white placeholder-slate-400 outline-none transition-colors duration-200 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]';

  return (
    <section
      ref={sectionRef}
      className={`py-16 sm:py-24 overflow-x-clip transition-colors duration-300 ${
        isDark ? 'bg-[#090909]' : 'bg-[#F5FAFE]'
      }`}
      aria-labelledby="final-cta-heading"
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollCascadeBlock
          className={`rounded-3xl p-6 sm:p-10 lg:p-14 border relative overflow-hidden ${
            isDark
              ? 'bg-[#111111] text-[#F5F5F5] border-[#303030] shadow-[0_30px_70px_rgba(0,0,0,0.65)]'
              : 'bg-[#101B35] text-white border-sky-400/20 shadow-[0_30px_70px_rgba(16,27,53,0.22)]'
          }`}
        >
          {/* Subtle Parallax Corner Glow */}
          <ScrollParallaxLayer
            scrollYProgress={scrollYProgress}
            yRange={[20, -20]}
            enabled={isDesktop}
            className="absolute -top-24 -left-24 w-[460px] h-[460px] pointer-events-none"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: isDark
                  ? 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
          </ScrollParallaxLayer>

          <ScrollCascadeGrid className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN: Final CTA Copy, Action Buttons & WhatsApp Integration */}
            <ScrollCascadeBlock className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                    isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'
                  }`}
                >
                  Start Your Transformation
                </span>
                <h2
                  id="final-cta-heading"
                  className="font-display font-extrabold text-white tracking-tight leading-[1.08] text-balance"
                  style={{ fontSize: 'clamp(1.95rem, 3.4vw, 2.9rem)' }}
                >
                  Let&apos;s Build Something Powerful Together.
                </h2>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    isDark ? 'text-[#A3A3A3]' : 'text-slate-300'
                  }`}
                >
                  Have a business challenge? Let&apos;s find the right technology solution for your business.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                  <motion.button
                    type="button"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    onClick={() => onNavigate('request-consultation')}
                    className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-white hover:bg-[#D4D4D4] text-[#090909]'
                        : 'bg-[#38BDF8] hover:bg-[#7DD3FC] text-[#101B35]'
                    }`}
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    onClick={() => onNavigate('contact')}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border text-white text-xs font-semibold tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-[#171717] hover:bg-[#252525] border-[#303030]'
                        : 'bg-white/10 hover:bg-white/15 border-white/15'
                    }`}
                  >
                    <span>Contact TechSphere</span>
                  </motion.button>
                </div>
              </div>

              {/* Advisory & Direct WhatsApp Integration Card */}
              <div
                className={`rounded-2xl border p-6 space-y-4 ${
                  isDark
                    ? 'bg-[#171717] border-[#303030]'
                    : 'bg-[#0B1429]/90 border-sky-400/20'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-semibold ${
                    isDark ? 'text-white' : 'text-[#38BDF8]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Advisory &amp; Fast WhatsApp Connect</span>
                </div>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-[#A3A3A3]' : 'text-slate-300'
                  }`}
                >
                  Prefer a quick message or direct call? Connect directly with a TechSphere consultant for ERP advisory, Odoo/ERPNext demos, or web project scoping.
                </p>

                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isDark
                        ? 'bg-white hover:bg-[#D4D4D4] text-[#090909]'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </motion.a>
                  <motion.a
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    href={`tel:${COMPANY_INFO.phones[0].raw}`}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                      isDark
                        ? 'bg-[#1D1D1D] hover:bg-[#252525] border-[#303030] text-[#F5F5F5]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                    }`}
                  >
                    <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-[#38BDF8]'}`} />
                    <span>{COMPANY_INFO.phones[0].display}</span>
                  </motion.a>
                </div>

                <div
                  className={`pt-2 border-t flex items-center gap-2 text-xs ${
                    isDark ? 'border-[#303030] text-[#A3A3A3]' : 'border-white/10 text-slate-400'
                  }`}
                >
                  <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-[#38BDF8]'}`} />
                  <span>{COMPANY_INFO.email}</span>
                </div>
              </div>
            </ScrollCascadeBlock>

            {/* RIGHT COLUMN: Embedded Formspree Contact Form */}
            <ScrollCascadeBlock className="lg:col-span-7">
              <div
                className={`rounded-2xl border p-6 sm:p-8 ${
                  isDark
                    ? 'bg-[#171717] border-[#303030]'
                    : 'bg-[#0B1429]/90 border-white/10'
                }`}
              >
                {state.succeeded ? (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div
                      className={`w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center ${
                        isDark
                          ? 'bg-[#1D1D1D] border-white/30 text-white'
                          : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400'
                      }`}
                    >
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">Thank You!</h3>
                    <p
                      className={`text-sm font-medium max-w-md mx-auto ${
                        isDark ? 'text-[#D4D4D4]' : 'text-[#38BDF8]'
                      }`}
                    >
                      Your consultation request has been received. Our team will get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-2 px-5 py-2.5 rounded-full text-xs font-semibold border border-white/20 text-neutral-200 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
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
                          className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                            isDark ? 'text-[#D4D4D4]' : 'text-slate-300'
                          }`}
                        >
                          Name <span className={isDark ? 'text-white' : 'text-[#38BDF8]'}>*</span>
                        </label>
                        <input
                          id="home-name"
                          name="fullName"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className={inputBaseClass}
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
                          className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                            isDark ? 'text-[#D4D4D4]' : 'text-slate-300'
                          }`}
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
                          className={inputBaseClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="home-email"
                          className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                            isDark ? 'text-[#D4D4D4]' : 'text-slate-300'
                          }`}
                        >
                          Email <span className={isDark ? 'text-white' : 'text-[#38BDF8]'}>*</span>
                        </label>
                        <input
                          id="home-email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className={inputBaseClass}
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
                          className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                            isDark ? 'text-[#D4D4D4]' : 'text-slate-300'
                          }`}
                        >
                          Phone <span className={isDark ? 'text-white' : 'text-[#38BDF8]'}>*</span>
                        </label>
                        <input
                          id="home-phone"
                          name="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 83208 06363"
                          className={inputBaseClass}
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
                        className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                          isDark ? 'text-[#D4D4D4]' : 'text-slate-300'
                        }`}
                      >
                        Service Interested In
                      </label>
                      <select
                        id="home-service"
                        name="interestedService"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white outline-none transition-colors duration-200 ${
                          isDark
                            ? 'bg-[#1D1D1D] border-[#303030] focus:border-white focus:ring-1 focus:ring-white'
                            : 'bg-[#101B35] border-white/15 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]'
                        }`}
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
                        className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                          isDark ? 'text-[#D4D4D4]' : 'text-slate-300'
                        }`}
                      >
                        Project Requirements{' '}
                        <span className={isDark ? 'text-white' : 'text-[#38BDF8]'}>*</span>
                      </label>
                      <textarea
                        id="home-requirements"
                        name="message"
                        rows={3}
                        required
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Tell us about your current systems, processes to automate, or goals..."
                        className={`${inputBaseClass} resize-y`}
                      />
                      <ValidationError
                        prefix="Project Requirements"
                        field="message"
                        errors={state.errors}
                        className="text-[11px] text-red-400 mt-1 block"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={state.submitting}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                      className={`group w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer ${
                        isDark
                          ? 'bg-white hover:bg-[#D4D4D4] text-[#090909]'
                          : 'bg-white hover:bg-[#F5FAFE] text-[#101B35]'
                      }`}
                    >
                      {state.submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <ArrowRight
                            className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                              isDark ? 'text-[#090909]' : 'text-[#0284C7]'
                            }`}
                          />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollCascadeBlock>
          </ScrollCascadeGrid>
        </ScrollCascadeBlock>
      </ScrollSectionContainer>
    </section>
  );
};
