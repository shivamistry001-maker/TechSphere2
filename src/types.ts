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
  | 'demo-websites'
  | 'erp-showcase'
  | 'industries'
  | 'case-studies'
  | 'portfolio'
  | 'contact'
  | 'request-consultation'
  | 'not-found';

export type ShowcaseSectionId = 'website-demo-projects' | 'explore-erp-solutions';

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

export type WebsiteDemoCategory =
  | 'All Projects'
  | 'All'
  | 'Hospitality'
  | 'Professional Services'
  | 'Creative Business'
  | 'Manufacturing';

export interface WebsiteDemoProject {
  id: string;
  title: string;
  category: Exclude<WebsiteDemoCategory, 'All'>;
  categoryLabel: string;
  liveUrl: string;
  previewImage: string;
  previewAlt: string;
  description: string;
  features: string[];
}

export interface ERPScreenshotItem {
  id: string;
  src: string;
  title: string;
  module: string;
  caption: string;
  alt: string;
}

export interface ERPDemoPlatform {
  id: 'erpnext' | 'odoo' | 'zoho';
  name: string;
  subtitle: string;
  description: string;
  highlights: string[];
  screenshots: ERPScreenshotItem[];
}

export type ERPMetricScope = 'all' | 'erpnext' | 'odoo' | 'zoho';

export interface ERPKPIMetric {
  id: string;
  scope: ERPMetricScope;
  displayValue: string;
  numericTarget: number;
  secondaryTarget?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  label: string;
  impactSummary: string;
  timeframe: string;
  baseline: string;
  moduleContext: string;
  benchmarkPercent: number;
}

