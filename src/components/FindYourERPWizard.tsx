/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Building,
  Users,
  Factory,
  Compass,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { PageId, ThemeMode, QuizState } from '../types.ts';
import { getERPRecommendation } from '../utils/erpWizardLogic.ts';

interface FindYourERPWizardProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
  onSelectRecommendation?: (erpName: string, notes: string) => void;
}

const INITIAL_QUIZ_STATE: QuizState = {
  businessType: '',
  employees: '',
  coreNeeds: [],
  needsManufacturing: '',
  needsAccounting: '',
  needsCRM: '',
  needsEcommerce: '',
  customizationExpectation: '',
};

export const FindYourERPWizard: React.FC<FindYourERPWizardProps> = ({
  onNavigate,
  theme = 'dark',
  onSelectRecommendation,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE);
  const prefersReducedMotion = useReducedMotion();

  const isDark = theme === 'dark';

  const questions = [
    {
      id: 'businessType',
      title: '1. What type of business do you operate?',
      description: 'Different industries have drastically different operational workflows.',
      options: [
        { label: 'Discrete or Process Manufacturing', value: 'Manufacturing', icon: Factory },
        { label: 'Wholesale, Trading or Distribution', value: 'Distribution', icon: Building },
        { label: 'Retail, Multi-Store or Omnichannel', value: 'Retail', icon: ShoppingBag },
        { label: 'Professional Services / Agency', value: 'Services', icon: Users },
        { label: 'Technology / Startup / SaaS', value: 'Startup', icon: Sparkles },
        { label: 'Other Specialized Business Model', value: 'Specialized', icon: Compass },
      ],
    },
    {
      id: 'employees',
      title: '2. How many employees do you have?',
      description: 'Helps determine whether you need a lightweight cloud SaaS or enterprise deployment.',
      options: [
        { label: '1 - 15 Employees (Agile Team)', value: '1-15' },
        { label: '16 - 50 Employees (Expanding SME)', value: '16-50' },
        { label: '51 - 200 Employees (Mid-Market)', value: '51-200' },
        { label: '200+ Employees (Large Enterprise)', value: '200+' },
      ],
    },
    {
      id: 'needsManufacturing',
      title: '3. Do you need manufacturing & production planning (MRP)?',
      description: 'Multi-level Bill of Materials (BOM), shop-floor routing, and work orders.',
      options: [
        { label: 'Yes — Crucial requirement (BOMs, workstations, job cards)', value: 'Yes' },
        { label: 'Light assembly or kitting only', value: 'Light' },
        { label: 'No manufacturing needs', value: 'No' },
      ],
    },
    {
      id: 'needsAccounting',
      title: '4. Do you need full double-entry accounting in the ERP?',
      description: 'General ledger, tax invoicing, automated bank feeds, and balance sheets.',
      options: [
        { label: 'Yes — Full double-entry ledger & compliance inside ERP', value: 'Yes' },
        { label: 'Keep existing external accounting software (e.g., Tally/QuickBooks)', value: 'External' },
        { label: 'Simple invoicing & expense tracking is sufficient', value: 'Simple' },
      ],
    },
    {
      id: 'needsCRM',
      title: '5. How central is CRM and sales pipeline management?',
      description: 'Lead scoring, marketing automation, omni-channel messaging, and quotes.',
      options: [
        { label: 'Very Critical — Advanced sales automation & customer tracking', value: 'Critical' },
        { label: 'Standard — Quotations and basic opportunity stages', value: 'Standard' },
        { label: 'Not a priority right now', value: 'Low' },
      ],
    },
    {
      id: 'needsEcommerce',
      title: '6. Do you need online eCommerce or Retail POS integration?',
      description: 'Syncing online web orders (Shopify/Woo) or physical store cash registers.',
      options: [
        { label: 'Yes — Physical Retail Point of Sale (POS) and online shop', value: 'POS_and_Ecom' },
        { label: 'Yes — Online eCommerce storefront only (Shopify / WooCommerce)', value: 'Ecom_Only' },
        { label: 'No — Primarily B2B with direct purchase orders', value: 'B2B_Only' },
      ],
    },
    {
      id: 'customizationExpectation',
      title: '7. How much customization do you anticipate?',
      description: 'Adapting to proprietary workflows versus adopting industry-standard processes.',
      options: [
        { label: 'Standard out-of-the-box workflows with minor tweaks', value: 'Standard' },
        { label: 'Moderate custom fields, custom doctypes, and approval scripts', value: 'Moderate' },
        { label: 'Deep bespoke engineering tailored around proprietary algorithms', value: 'Heavy' },
      ],
    },
  ];

  const handleSelectOption = (field: keyof QuizState, value: string) => {
    setQuizState((prev) => ({ ...prev, [field]: value }));
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(questions.length);
    }
  };

  const handleRestart = () => {
    setQuizState(INITIAL_QUIZ_STATE);
    setCurrentStep(0);
  };

  const recommendation = getERPRecommendation(quizState);

  const handleBookConsultationWithPrefill = () => {
    if (onSelectRecommendation) {
      onSelectRecommendation(
        recommendation.consultationService,
        `Find Your ERP Quiz Result (${recommendation.primary}): Business: ${quizState.businessType}, Team: ${quizState.employees}, Mfg: ${quizState.needsManufacturing}, CRM: ${quizState.needsCRM}, POS/Ecom: ${quizState.needsEcommerce}, Customization: ${quizState.customizationExpectation}`
      );
    }
    onNavigate('request-consultation');
  };

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-10 transition-colors ${
        isDark
          ? 'bg-[#171717] border-[#303030] shadow-2xl shadow-black/60'
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
      }`}
    >
      {/* Quiz Progress Header */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b ${
          isDark ? 'border-[#303030]' : 'border-sky-500/15'
        }`}
      >
        <div>
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
            }`}
          >
            Interactive Diagnostic Tool
          </span>
          <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
            Find Your ERP
          </h3>
        </div>

        {currentStep < questions.length ? (
          <div className="flex items-center gap-2.5">
            <span className={`text-xs font-mono font-medium ${isDark ? 'text-[#A3A3A3]' : 'text-slate-500'}`}>
              Step {currentStep + 1} of {questions.length}
            </span>
            <div className={`w-24 sm:w-32 h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#252525]' : 'bg-slate-200'}`}>
              <motion.div
                className={
                  isDark
                    ? 'h-full bg-gradient-to-r from-[#A3A3A3] to-white'
                    : 'h-full bg-gradient-to-r from-sky-400 to-blue-500'
                }
                initial={false}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ) : (
          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            onClick={handleRestart}
            className={`inline-flex items-center gap-1.5 min-h-[44px] px-2 text-xs font-medium transition-colors cursor-pointer ${
              isDark ? 'text-white hover:text-[#D4D4D4]' : 'text-sky-600 hover:text-sky-500'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Quiz</span>
          </motion.button>
        )}
      </div>

      {/* Quiz Step Content */}
      <AnimatePresence mode="wait">
        {currentStep < questions.length ? (
          <motion.div
            key={currentStep}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, x: -18 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <h4 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-[#F5F5F5]' : 'text-slate-900'}`}>
                {questions[currentStep].title}
              </h4>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A3A3A3]' : 'text-slate-600'}`}>
                {questions[currentStep].description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {questions[currentStep].options.map((option) => {
                const currentVal = quizState[questions[currentStep].id as keyof QuizState];
                const isSelected = currentVal === option.value;
                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                    onClick={() =>
                      handleSelectOption(questions[currentStep].id as keyof QuizState, option.value)
                    }
                    className={`min-h-[44px] p-4 rounded-xl text-left border transition-colors flex items-start justify-between group cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-[#1D1D1D] border-white text-white shadow-md'
                          : 'bg-sky-50 border-sky-500 text-slate-900 shadow-md shadow-sky-500/10'
                        : isDark
                        ? 'bg-[#111111] border-[#303030] text-[#D4D4D4] hover:border-white/45 hover:bg-[#1D1D1D]'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-white'
                    }`}
                  >
                    <span className="text-sm font-medium pr-3">{option.label}</span>
                    <motion.div
                      animate={prefersReducedMotion ? undefined : { scale: isSelected ? 1.08 : 1 }}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? isDark
                            ? 'border-white bg-white text-[#090909]'
                            : 'border-sky-400 bg-sky-500 text-white'
                          : isDark
                          ? 'border-[#525252] group-hover:border-white'
                          : 'border-slate-400 group-hover:border-sky-500'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Back Button */}
            {currentStep > 0 && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={`inline-flex items-center gap-1.5 min-h-[44px] py-2 text-xs transition-colors cursor-pointer ${
                    isDark ? 'text-[#A3A3A3] hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Question</span>
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* Results View */
          <motion.div
            key="wizard-results"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div
              className={`p-6 rounded-2xl border ${
                isDark
                  ? 'bg-[#1D1D1D] border-[#404040]'
                  : 'bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent border-sky-500/30'
              }`}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'
                }`}
              >
                Impartial Diagnostic Output
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h4 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {recommendation.primary}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    isDark
                      ? 'bg-[#111111] border-[#404040] text-[#F5F5F5]'
                      : 'bg-sky-500/15 border-sky-400/30 text-sky-700'
                  }`}
                >
                  {recommendation.badge}
                </span>
              </div>

              <p className={`mt-4 text-sm sm:text-base leading-relaxed ${isDark ? 'text-[#D4D4D4]' : 'text-slate-700'}`}>
                {recommendation.description}
              </p>

              <div
                className={`mt-4 pt-4 border-t text-xs ${
                  isDark ? 'border-[#303030] text-[#A3A3A3]' : 'border-sky-500/20 text-slate-600'
                }`}
              >
                <strong className={isDark ? 'text-white' : undefined}>Key Factor:</strong>{' '}
                {recommendation.matchReason}
              </div>
            </div>

            <div
              className={`p-4 rounded-xl text-xs flex items-center justify-between gap-4 border ${
                isDark
                  ? 'bg-[#111111] border-[#303030] text-[#A3A3A3]'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <span>
                <strong className={isDark ? 'text-[#F5F5F5]' : undefined}>Note on objectivity:</strong>{' '}
                No single platform is universally superior. TechSphere independently evaluates workflows to engineer the right implementation.
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <motion.button
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={handleBookConsultationWithPrefill}
                className={`group w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-white text-[#090909] hover:bg-[#D4D4D4]'
                    : 'text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-600/30'
                }`}
              >
                <span>Discuss Your Requirements With TechSphere</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>

              <button
                type="button"
                onClick={handleRestart}
                className={`w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-xl font-medium text-sm border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-[#303030] text-[#D4D4D4] hover:bg-[#252525] hover:text-white'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Retake Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
