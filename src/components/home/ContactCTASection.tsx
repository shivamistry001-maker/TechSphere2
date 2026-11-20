/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
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
  CONSULTATION_SERVICES,
  DEFAULT_CONSULTATION_SERVICE,
} from '../../data/consultationServices.ts';
import {
  ContactValidationErrors,
  ContactValidationField,
  resolveFormspreeFormId,
  sanitizeContactPayload,
  validateContactField,
  validateContactForm,
} from '../../utils/formValidation.ts';
import { hasFormSubmissionErrors } from '../../utils/soundManager.ts';
import { useFormSoundFeedback } from '../../hooks/useFormSoundFeedback.ts';
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
  const [state, handleSubmit, reset] = useForm(resolveFormspreeFormId());
  const submitLockRef = useRef(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<string>(DEFAULT_CONSULTATION_SERVICE);
  const [requirements, setRequirements] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ContactValidationErrors>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop(1024);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const isDark = theme === 'dark';

  const handleFieldBlur = (field: ContactValidationField, value: string) => {
    const error = validateContactField(field, value);
    setFieldErrors((prev) => {
      if (!error) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: error };
    });
  };

  const clearOrRevalidateField = (field: ContactValidationField, value: string) => {
    if (!fieldErrors[field]) return;
    const error = validateContactField(field, value);
    setFieldErrors((prev) => {
      if (!error) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: error };
    });
  };

  const {
    notifyValidationError,
    notifySubmitAttempt,
    resetFormSoundState,
  } = useFormSoundFeedback({
    submitting: state.submitting,
    succeeded: state.succeeded,
    errors: state.errors,
  });

  useEffect(() => {
    if (!state.submitting) {
      submitLockRef.current = false;
    }
  }, [state.submitting]);

  const hasSubmissionErrors = hasFormSubmissionErrors(state.errors);
  const isSubmittedSuccessfully = state.succeeded && !hasSubmissionErrors;

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.submitting || submitLockRef.current) {
      return;
    }

    const validation = validateContactForm({
      fullName: name,
      email,
      phone,
      message: requirements,
    });

    if (!validation.valid) {
      setFieldErrors(validation.errors);
      notifyValidationError();
      const idByField: Record<ContactValidationField, string> = {
        fullName: 'home-name',
        email: 'home-email',
        phone: 'home-phone',
        message: 'home-requirements',
      };
      const firstInvalid = (['fullName', 'email', 'phone', 'message'] as ContactValidationField[]).find(
        (field) => Boolean(validation.errors[field])
      );
      if (firstInvalid) {
        document.getElementById(idByField[firstInvalid])?.focus();
      }
      return;
    }

    const sanitizedPayload = sanitizeContactPayload({
      fullName: name,
      companyName: company,
      email,
      phone,
      interestedService: service,
      message: requirements,
    });

    submitLockRef.current = true;
    setName(sanitizedPayload.fullName);
    setCompany(sanitizedPayload.companyName);
    setEmail(sanitizedPayload.email);
    setPhone(sanitizedPayload.phone);
    setRequirements(sanitizedPayload.message);
    setFieldErrors({});
    notifySubmitAttempt();
    return handleSubmit(sanitizedPayload);
  };

  const handleReset = () => {
    submitLockRef.current = false;
    reset();
    resetFormSoundState();
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setService(DEFAULT_CONSULTATION_SERVICE);
    setRequirements('');
    setFieldErrors({});
  };

  const whatsappText = encodeURIComponent(
    `Hello TechSphere Team, I'd like to discuss ${service} for ${company || 'my business'}.`
  );

  const getInputClass = (hasError?: boolean) =>
    isDark
      ? `ts-glass-input w-full min-h-[44px] px-4 py-3 rounded-xl text-sm text-[#F5F5F5] placeholder-[#737373] ${
          hasError ? 'border-red-400' : ''
        }`
      : `w-full min-h-[44px] px-4 py-3 rounded-xl bg-white/[0.10] border text-sm text-white placeholder-slate-300/80 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-200 ${
          hasError
            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/40'
            : 'border-white/20 focus:bg-white/[0.15] focus:border-[#7DD3FC] focus:ring-2 focus:ring-[#38BDF8]/35'
        }`;

  return (
    <section
      ref={sectionRef}
      className="ts-glass-canvas-tinted py-16 sm:py-24 overflow-x-clip transition-colors duration-300"
      aria-labelledby="final-cta-heading"
    >
      <ScrollSectionContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollCascadeBlock
          className={`rounded-3xl p-6 sm:p-10 lg:p-14 border relative overflow-hidden ${
            isDark
              ? 'ts-glass-panel text-[#F5F5F5]'
              : 'bg-gradient-to-br from-[#101B35] via-[#132346] to-[#0C162E] text-white border-sky-300/25 shadow-[0_32px_74px_rgba(15,55,96,0.28),inset_0_1.5px_0_rgba(255,255,255,0.20)]'
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
                    className={`group inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
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
                    className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 rounded-full border text-white text-xs font-semibold tracking-wide whitespace-nowrap transition-colors cursor-pointer ${
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
                    ? 'bg-white/[0.04] border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]'
                    : 'bg-white/[0.07] border-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]'
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
                    className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
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
                    href={`tel:${COMPANY_INFO.phones[0].international}`}
                    className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
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
                    ? 'bg-white/[0.04] border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                    : 'bg-white/[0.08] border-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_20px_46px_rgba(0,0,0,0.24)]'
                }`}
              >
                {isSubmittedSuccessfully ? (
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
                      className="mt-2 inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full text-xs font-semibold border border-white/20 text-neutral-200 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={onFormSubmit} noValidate className="space-y-4">
                    {hasSubmissionErrors && (
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
                          aria-invalid={Boolean(fieldErrors.fullName)}
                          aria-describedby={fieldErrors.fullName ? 'home-name-error' : undefined}
                          value={name}
                          onBlur={(e) => handleFieldBlur('fullName', e.target.value)}
                          onChange={(e) => {
                            setName(e.target.value);
                            clearOrRevalidateField('fullName', e.target.value);
                          }}
                          placeholder="John Doe"
                          className={getInputClass(Boolean(fieldErrors.fullName))}
                        />
                        {fieldErrors.fullName && (
                          <p id="home-name-error" role="alert" className="text-[11px] text-red-400 mt-1">
                            {fieldErrors.fullName}
                          </p>
                        )}
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
                          className={getInputClass(false)}
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
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? 'home-email-error' : undefined}
                          value={email}
                          onBlur={(e) => handleFieldBlur('email', e.target.value)}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            clearOrRevalidateField('email', e.target.value);
                          }}
                          placeholder="john@company.com"
                          className={getInputClass(Boolean(fieldErrors.email))}
                        />
                        {fieldErrors.email && (
                          <p id="home-email-error" role="alert" className="text-[11px] text-red-400 mt-1">
                            {fieldErrors.email}
                          </p>
                        )}
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
                          aria-invalid={Boolean(fieldErrors.phone)}
                          aria-describedby={fieldErrors.phone ? 'home-phone-error' : undefined}
                          value={phone}
                          onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            clearOrRevalidateField('phone', e.target.value);
                          }}
                          placeholder="+91 83208 06363"
                          className={getInputClass(Boolean(fieldErrors.phone))}
                        />
                        {fieldErrors.phone && (
                          <p id="home-phone-error" role="alert" className="text-[11px] text-red-400 mt-1">
                            {fieldErrors.phone}
                          </p>
                        )}
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
                        className={`w-full min-h-[44px] px-4 py-3 rounded-xl border text-sm text-white outline-none transition-colors duration-200 ${
                          isDark
                            ? 'bg-[#1D1D1D] border-[#303030] focus:border-white focus:ring-1 focus:ring-white'
                            : 'bg-[#101B35] border-white/15 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]'
                        }`}
                      >
                        {CONSULTATION_SERVICES.map((serviceOption) => (
                          <option key={serviceOption} value={serviceOption}>
                            {serviceOption}
                          </option>
                        ))}
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
                        aria-invalid={Boolean(fieldErrors.message)}
                        aria-describedby={fieldErrors.message ? 'home-requirements-error' : undefined}
                        value={requirements}
                        onBlur={(e) => handleFieldBlur('message', e.target.value)}
                        onChange={(e) => {
                          setRequirements(e.target.value);
                          clearOrRevalidateField('message', e.target.value);
                        }}
                        placeholder="Tell us about your current systems, processes to automate, or goals..."
                        className={`${getInputClass(Boolean(fieldErrors.message))} resize-y`}
                      />
                      {fieldErrors.message && (
                        <p id="home-requirements-error" role="alert" className="text-[11px] text-red-400 mt-1">
                          {fieldErrors.message}
                        </p>
                      )}
                      <ValidationError
                        prefix="Project Requirements"
                        field="message"
                        errors={state.errors}
                        className="text-[11px] text-red-400 mt-1 block"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      data-sound="none"
                      disabled={state.submitting}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                      className={`group w-full min-h-[44px] py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer ${
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
