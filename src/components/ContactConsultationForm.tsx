/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useForm, ValidationError } from '@formspree/react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { ConsultationFormData, ThemeMode } from '../types.ts';
import { COMPANY_INFO } from '../data/companyData.ts';
import {
  CONSULTATION_SERVICES,
  DEFAULT_CONSULTATION_SERVICE,
  resolveConsultationService,
} from '../data/consultationServices.ts';
import {
  ContactValidationErrors,
  ContactValidationField,
  validateContactField,
  validateContactForm,
} from '../utils/formValidation.ts';

interface ContactConsultationFormProps {
  initialService?: string;
  initialMessage?: string;
  theme?: ThemeMode;
}

export const ContactConsultationForm: React.FC<ContactConsultationFormProps> = ({
  initialService = DEFAULT_CONSULTATION_SERVICE,
  initialMessage = '',
  theme = 'light',
}) => {
  const [state, handleSubmit, reset] = useForm('xaqrejgl');
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: 'Manufacturing',
    companySize: '16-50 employees',
    interestedService: resolveConsultationService(initialService),
    currentERP: 'Excel / Spreadsheets',
    message: initialMessage,
  });

  const [fieldErrors, setFieldErrors] = useState<ContactValidationErrors>({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      interestedService: resolveConsultationService(initialService || prev.interestedService),
      message: initialMessage,
    }));
  }, [initialService, initialMessage]);

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

  const handleValidatedChange = (field: ContactValidationField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      const error = validateContactField(field, value);
      setFieldErrors((prev) => {
        if (!error) {
          const { [field]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [field]: error };
      });
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const validation = validateContactForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (!validation.valid) {
      e.preventDefault();
      setFieldErrors(validation.errors);
      const fieldOrder: ContactValidationField[] = ['fullName', 'email', 'phone', 'message'];
      const firstInvalid = fieldOrder.find((field) => Boolean(validation.errors[field]));
      if (firstInvalid) {
        document.getElementById(firstInvalid)?.focus();
      }
      return;
    }

    setFieldErrors({});
    return handleSubmit(e);
  };

  const handleReset = () => {
    reset();
    setFieldErrors({});
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      industry: 'Manufacturing',
      companySize: '16-50 employees',
      interestedService: DEFAULT_CONSULTATION_SERVICE,
      currentERP: 'Excel / Spreadsheets',
      message: '',
    });
  };

  const getInputClass = (hasError?: boolean) =>
    isDark
      ? `w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm border transition-colors duration-200 outline-none bg-[#111111] text-[#F5F5F5] placeholder-[#737373] ${
          hasError
            ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/50'
            : 'border-[#303030] focus:border-white focus:ring-1 focus:ring-white/40'
        }`
      : `w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm border transition-colors duration-200 outline-none bg-white text-slate-900 placeholder-slate-400 ${
          hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
            : 'border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30'
        }`;

  const selectClass = isDark
    ? 'w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm border transition-colors duration-200 outline-none bg-[#111111] border-[#303030] text-[#F5F5F5] focus:border-white focus:ring-1 focus:ring-white/40'
    : 'w-full min-h-[44px] px-4 py-2.5 rounded-xl text-sm border transition-colors duration-200 outline-none bg-white border-slate-300 text-slate-900 focus:border-sky-500';

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-10 transition-colors ${
        isDark
          ? 'bg-[#171717] border-[#303030] shadow-2xl shadow-black/60'
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 backdrop-blur-xl'
      }`}
    >
      <div className="mb-8">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
          }`}
        >
          Direct Strategic Advisory
        </span>
        <h3 className={`text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
          Let&apos;s Build What&apos;s Next.
        </h3>
        <p className={`text-sm mt-2 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
          Tell us about your business, your challenges and what you want to improve. We respond within 24 business hours.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {state.succeeded ? (
          <motion.div
            key="success-view"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
            className="py-10 text-center space-y-5"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-2xl border flex items-center justify-center ${
                isDark
                  ? 'bg-[#1D1D1D] border-white/30 text-white'
                  : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-500 shadow-lg shadow-emerald-500/20'
              }`}
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Thank You!
              </h4>
              <p className={`text-base font-semibold ${isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'}`}>
                Your consultation request has been received. Our team will get back to you shortly.
              </p>
              {formData.fullName && (
                <p className={`text-sm max-w-md mx-auto leading-relaxed pt-1 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                  Thank you, <strong className={isDark ? 'text-white' : 'text-slate-900'}>{formData.fullName}</strong>. A senior TechSphere ERP &amp; IT consultant will review your specifications and connect shortly.
                </p>
              )}
            </div>

            <div
              className={`p-4 rounded-xl text-xs max-w-md mx-auto text-left space-y-1.5 border ${
                isDark ? 'bg-[#111111] border-[#303030] text-[#A3A3A3]' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div>
                <strong>Service Requested:</strong> {formData.interestedService}
              </div>
              <div>
                <strong>Current System:</strong> {formData.currentERP}
              </div>
              {formData.email && (
                <div>
                  <strong>Email Confirmation:</strong> {formData.email}
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-[#303030] hover:bg-[#252525] text-[#D4D4D4]'
                    : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
              >
                Submit Another Request
              </button>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hi TechSphere, I just submitted a consultation request for ${formData.companyName || formData.fullName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                Fast-Track via WhatsApp
              </a>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={onFormSubmit} noValidate className="space-y-5">
            {/* Formspree Error Banner */}
            {state.errors && (
              <div
                className={`p-4 rounded-xl border text-xs flex items-center gap-2 ${
                  isDark ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Unable to transmit your request at this moment.</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    Please check your inputs or reach out directly to {COMPANY_INFO.email} or call {COMPANY_INFO.phones[0].display}.
                  </p>
                  <ValidationError errors={state.errors} className={`text-[11px] mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                </div>
              </div>
            )}

            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                    value={formData.fullName}
                    onBlur={(e) => handleFieldBlur('fullName', e.target.value)}
                    onChange={(e) => handleValidatedChange('fullName', e.target.value)}
                    placeholder="e.g. John Doe"
                    className={getInputClass(Boolean(fieldErrors.fullName))}
                  />
                </div>
                {fieldErrors.fullName && (
                  <p id="fullName-error" role="alert" className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                    {fieldErrors.fullName}
                  </p>
                )}
                <ValidationError prefix="Full Name" field="fullName" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
                <ValidationError prefix="Full Name" field="name" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>

              <div>
                <label htmlFor="companyName" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Acme Industrial Corp"
                  className={getInputClass(false)}
                />
                <ValidationError prefix="Company Name" field="companyName" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  value={formData.email}
                  onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  onChange={(e) => handleValidatedChange('email', e.target.value)}
                  placeholder="name@company.com"
                  className={getInputClass(Boolean(fieldErrors.email))}
                />
                {fieldErrors.email && (
                  <p id="email-error" role="alert" className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                    {fieldErrors.email}
                  </p>
                )}
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>

              <div>
                <label htmlFor="phone" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                  value={formData.phone}
                  onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                  onChange={(e) => handleValidatedChange('phone', e.target.value)}
                  placeholder="e.g. +91 83208 06363"
                  className={getInputClass(Boolean(fieldErrors.phone))}
                />
                {fieldErrors.phone && (
                  <p id="phone-error" role="alert" className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                    {fieldErrors.phone}
                  </p>
                )}
                <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>
            </div>

            {/* Row 3: Industry & Company Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="industry" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className={selectClass}
                >
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail &amp; POS</option>
                  <option value="Distribution">Wholesale &amp; Distribution</option>
                  <option value="Ecommerce">E-commerce</option>
                  <option value="Services">Professional Services</option>
                  <option value="Logistics">Logistics &amp; Supply Chain</option>
                  <option value="Healthcare">Healthcare &amp; Clinics</option>
                  <option value="Education">Education &amp; Training</option>
                  <option value="Real Estate">Real Estate &amp; Property</option>
                  <option value="Startup">Startup / Scaleup</option>
                  <option value="Other">Other Specialized Sector</option>
                </select>
                <ValidationError prefix="Industry" field="industry" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>

              <div>
                <label htmlFor="companySize" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Company Size
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className={selectClass}
                >
                  <option value="1-15 employees">1 - 15 employees</option>
                  <option value="16-50 employees">16 - 50 employees</option>
                  <option value="51-200 employees">51 - 200 employees</option>
                  <option value="200+ employees">200+ employees</option>
                </select>
                <ValidationError prefix="Company Size" field="companySize" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>
            </div>

            {/* Row 4: Interested Service & Current ERP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="interestedService" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Interested Service
                </label>
                <select
                  id="interestedService"
                  name="interestedService"
                  value={formData.interestedService}
                  onChange={(e) => setFormData({ ...formData, interestedService: e.target.value })}
                  className={selectClass}
                >
                  {CONSULTATION_SERVICES.map((serviceOption) => (
                    <option key={serviceOption} value={serviceOption}>
                      {serviceOption}
                    </option>
                  ))}
                </select>
                <ValidationError prefix="Interested Service" field="interestedService" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>

              <div>
                <label htmlFor="currentERP" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                  Current ERP / Software
                </label>
                <select
                  id="currentERP"
                  name="currentERP"
                  value={formData.currentERP}
                  onChange={(e) => setFormData({ ...formData, currentERP: e.target.value })}
                  className={selectClass}
                >
                  <option value="None">None</option>
                  <option value="Excel / Spreadsheets">Excel / Spreadsheets</option>
                  <option value="ERPNext">ERPNext</option>
                  <option value="Odoo">Odoo</option>
                  <option value="Zoho">Zoho</option>
                  <option value="SAP">SAP</option>
                  <option value="Oracle">Oracle</option>
                  <option value="Tally">Tally</option>
                  <option value="Other">Other</option>
                </select>
                <ValidationError prefix="Current ERP" field="currentERP" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
              </div>
            </div>

            {/* Row 5: Message */}
            <div>
              <label htmlFor="message" className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                Message / Operational Pain Points <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                value={formData.message}
                onBlur={(e) => handleFieldBlur('message', e.target.value)}
                onChange={(e) => handleValidatedChange('message', e.target.value)}
                placeholder="Describe your current software setup, processes you want to automate, or goals for the ERP implementation..."
                className={`${getInputClass(Boolean(fieldErrors.message))} py-3 resize-y`}
              />
              {fieldErrors.message && (
                <p id="message-error" role="alert" className="text-[11px] text-red-500 dark:text-red-400 mt-1">
                  {fieldErrors.message}
                </p>
              )}
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-[11px] text-red-400 mt-1 block" />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className={`w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4] shadow-lg shadow-black/40'
                    : 'text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:via-sky-500 hover:to-blue-500 shadow-lg shadow-sky-600/30'
                }`}
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Request Consultation</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-white' : 'text-sky-500'}`} />
                <span>NDA &amp; Strict Confidentiality Protected</span>
              </div>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};
