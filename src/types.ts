/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'erp-solutions'
  | 'erpnext'
  | 'odoo'
  | 'zoho'
  | 'it-solutions'
  | 'industries'
  | 'case-studies'
  | 'portfolio'
  | 'insights'
  | 'contact'
  | 'request-consultation';

export type ThemeMode = 'dark' | 'light';

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  iconName: string;
}

export interface ERPPlatform {
  id: 'erpnext' | 'odoo' | 'zoho' | 'custom';
  name: string;
  tagline: string;
  badge: string;
  description: string;
  strengths: string[];
  modules: string[];
  bestSuitedFor: string;
  routeId: PageId;
}

export interface ERPComparisonItem {
  category: string;
  erpnext: string;
  odoo: string;
  zoho: string;
  custom: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  challenges: string[];
  solutions: string[];
  recommendedERP: string[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  industry: string;
  isSample: true;
  challenge: string;
  approach: string;
  solution: string;
  technology: string[];
  process: string[];
  outcome: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Web' | 'ERP' | 'Applications' | 'Automation';
  isDemo: true;
  description: string;
  technologies: string[];
  highlight: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'ERP' | 'Business Automation' | 'Odoo' | 'ERPNext' | 'Zoho' | 'IT Solutions' | 'Digital Transformation';
  readTime: string;
  summary: string;
  content: string[];
  isDemo: true;
  publishDate: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'erp' | 'technical' | 'consultation';
}

export interface ConsultationFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  interestedService: string;
  currentERP: string;
  message: string;
}

export interface QuizState {
  businessType: string;
  employees: string;
  coreNeeds: string[];
  needsManufacturing: string;
  needsAccounting: string;
  needsCRM: string;
  needsEcommerce: string;
  customizationExpectation: string;
}
