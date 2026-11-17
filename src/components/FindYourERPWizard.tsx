/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Building,
  Users,
  Factory,
  Calculator,
  Compass,
  ShoppingBag,
  Sliders,
  Check,
} from 'lucide-react';
import { PageId, ThemeMode, QuizState } from '../types.ts';

interface FindYourERPWizardProps {
  onNavigate: (page: PageId) => void;
  theme?: ThemeMode;
  onSelectRecommendation?: (erpName: string, notes: string) => void;
}

export const FindYourERPWizard: React.FC<FindYourERPWizardProps> = ({
  onNavigate,
  theme = 'dark',
  onSelectRecommendation,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({
    businessType: '',
    employees: '',
    coreNeeds: [],
    needsManufacturing: '',
    needsAccounting: '',
    needsCRM: '',
    needsEcommerce: '',
    customizationExpectation: '',
  });

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
    setQuizState({ ...quizState, [field]: value });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Results step
    }
  };

  // Evaluate Neutral Recommendation Matrix
  const getRecommendation = () => {
    const { businessType, needsManufacturing, needsCRM, needsEcommerce, customizationExpectation, employees } = quizState;

    // Neutral scoring logic
    if (needsManufacturing === 'Yes' || businessType === 'Manufacturing') {
      return {
        primary: 'ERPNext',
        badge: 'Recommended for Deep Manufacturing & Operational Control',
        description:
          'Based on your emphasis on production workflows, multi-level BOMs, and inventory tracking, ERPNext represents an exceptional candidate. Its open-source architecture eliminates licensing ceilings as your workstation count grows.',
        alternatives: ['Odoo Manufacturing', 'Custom MRP Modules'],
        matchReason: 'Unmatched native manufacturing, job cards, and unified data architecture without per-user module fees.',
      };
    }

    if (businessType === 'Retail' || needsEcommerce === 'POS_and_Ecom') {
      return {
        primary: 'Odoo',
        badge: 'Recommended for Omnichannel Retail & Modular Architecture',
        description:
          'Your operational focus on retail Point of Sale (POS) combined with eCommerce synchronization aligns closely with Odoo’s modular ecosystem. Its sleek user interface minimizes training time for floor staff.',
        alternatives: ['ERPNext with Retail POS', 'Zoho Inventory & Commerce'],
        matchReason: 'Exceptional integrated Point-of-Sale (POS) and drag-and-drop modular application catalog.',
      };
    }

    if (businessType === 'Services' || businessType === 'Startup' || needsCRM === 'Critical') {
      return {
        primary: 'Zoho One / Books / CRM',
        badge: 'Recommended for Cloud Productivity & Fast Deployment',
        description:
          'For agile teams and services prioritizing client acquisition, project milestones, automated recurring invoicing, and cloud mobility, the Zoho suite delivers world-class velocity with zero server maintenance.',
        alternatives: ['Odoo Services', 'ERPNext Projects'],
        matchReason: 'Industry-leading CRM automation, intuitive Zoho Books finance, and turnkey cloud infrastructure.',
      };
    }

    if (customizationExpectation === 'Heavy') {
      return {
        primary: 'Custom ERP or ERPNext Framework',
        badge: 'Recommended for Proprietary Operational Workflows',
        description:
          'Your requirement for deep custom logic indicates that rigid proprietary SaaS platforms may cause operational friction. A custom architecture or a headless Frappe/ERPNext framework will preserve your operational moat.',
        alternatives: ['Frappe Framework', 'Bespoke React + Node + PostgreSQL'],
        matchReason: 'Tailored specifically around your proprietary algorithms with 100% intellectual property ownership.',
      };
    }

    // Balanced default
    return {
      primary: 'ERPNext or Odoo (Comparative Evaluation)',
      badge: 'Balanced Platform Assessment Recommended',
      description:
        'Your operational profile can be successfully addressed by either ERPNext (for comprehensive data ownership) or Odoo (for modular app-by-app adoption). We recommend a brief consultative discovery to evaluate your specific team preferences.',
      alternatives: ['Zoho One', 'Custom Architecture'],
      matchReason: 'Balanced operational needs across finance, inventory, and sales.',
    };
  };

  const recommendation = getRecommendation();

  const handleBookConsultationWithPrefill = () => {
    if (onSelectRecommendation) {
      onSelectRecommendation(
        recommendation.primary,
        `Find Your ERP Quiz Result: Business: ${quizState.businessType}, Team: ${quizState.employees}, Mfg: ${quizState.needsManufacturing}, CRM: ${quizState.needsCRM}, POS/Ecom: ${quizState.needsEcommerce}, Customization: ${quizState.customizationExpectation}`
      );
    }
    onNavigate('request-consultation');
  };

  return (
    <div
      className={`rounded-3xl border p-6 sm:p-10 transition-all ${
        isDark
          ? 'bg-slate-900/80 border-sky-500/20 shadow-2xl shadow-black/60 backdrop-blur-xl'
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 backdrop-blur-xl'
      }`}
    >
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-sky-500/10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            Interactive Diagnostic Tool
          </span>
          <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Find Your ERP
          </h3>
        </div>

        {currentStep < questions.length ? (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Step {currentStep + 1} of {questions.length}
            </span>
            <div className={`w-24 sm:w-32 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Quiz</span>
          </button>
        )}
      </div>

      {/* Quiz Step Content */}
      {currentStep < questions.length ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h4 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {questions[currentStep].title}
              </h4>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {questions[currentStep].description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {questions[currentStep].options.map((option) => {
                const currentVal = (quizState as any)[questions[currentStep].id];
                const isSelected = currentVal === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleSelectOption(questions[currentStep].id as keyof QuizState, option.value)
                    }
                    className={`p-4 rounded-xl text-left border transition-all flex items-start justify-between group ${
                      isSelected
                        ? isDark
                          ? 'bg-sky-500/15 border-sky-400 text-white shadow-md shadow-sky-500/10'
                          : 'bg-sky-50 border-sky-500 text-slate-900 shadow-md shadow-sky-500/10'
                        : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-sky-500/40 hover:bg-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-white'
                    }`}
                  >
                    <span className="text-sm font-medium pr-3">{option.label}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-sky-400 bg-sky-500 text-white'
                          : 'border-slate-600 group-hover:border-sky-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back Button */}
            {currentStep > 0 && (
              <div className="pt-4">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={`inline-flex items-center gap-1.5 text-xs transition-colors ${
                    isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Question</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Results View */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent border border-sky-500/30">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Impartial Diagnostic Output
            </span>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h4 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {recommendation.primary}
              </h4>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-400/30 ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                {recommendation.badge}
              </span>
            </div>

            <p className={`mt-4 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {recommendation.description}
            </p>

            <div className={`mt-4 pt-4 border-t border-sky-500/20 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong>Key Factor:</strong> {recommendation.matchReason}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between gap-4 ${
              isDark ? 'bg-slate-950/70 text-slate-400' : 'bg-slate-50 text-slate-600'
            }`}
          >
            <span>
              <strong>Note on objectivity:</strong> No single platform is universally superior. TechSphere independently evaluates workflows to engineer the right implementation.
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleBookConsultationWithPrefill}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Discuss Your Requirements With TechSphere</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('erp-solutions')}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm border transition-colors ${
                isDark
                  ? 'border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              View Detailed Comparison
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
