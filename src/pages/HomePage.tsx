/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId, ThemeMode } from '../types.ts';
import { HeroSection } from '../components/HeroSection.tsx';
import { ServicesShowcaseSection } from '../components/home/ServicesShowcaseSection.tsx';
import { TechnologyShowcaseSection } from '../components/home/TechnologyShowcaseSection.tsx';
import { WhyTechSphereSection } from '../components/home/WhyTechSphereSection.tsx';
import { IndustriesSection } from '../components/home/IndustriesSection.tsx';
import { ProcessSection } from '../components/home/ProcessSection.tsx';
import { ProjectShowcaseSection } from '../components/home/ProjectShowcaseSection.tsx';
import { ERPDemoShowcaseSection } from '../components/showcase/ERPDemoShowcaseSection.tsx';
import { FAQSection } from '../components/home/FAQSection.tsx';
import { ContactCTASection } from '../components/home/ContactCTASection.tsx';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onSelectServiceForConsultation?: (serviceName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  theme,
  onSelectServiceForConsultation,
}) => {
  return (
    <div className="flex flex-col">
      {/* 1. Full-Screen Hero Section (White / #F5FAFE Canvas + Orbital Architecture) */}
      <HeroSection onNavigate={onNavigate} theme={theme} />

      {/* 2. Premium Services Showcase (6 Minimal Interactive Cards) */}
      <ServicesShowcaseSection
        onNavigate={onNavigate}
        onSelectService={onSelectServiceForConsultation}
        theme={theme}
      />

      {/* 3. Dark Interactive Technology Showcase (Lead -> Reports Pipeline) */}
      <TechnologyShowcaseSection onNavigate={onNavigate} theme={theme} />

      {/* 4. Why TechSphere (Real Solutions. Real Business Impact.) */}
      <WhyTechSphereSection onNavigate={onNavigate} theme={theme} />

      {/* 5. Industries We Serve */}
      <IndustriesSection onNavigate={onNavigate} theme={theme} />

      {/* 6. Our Working Process (01 - 06 Animated Workflow) */}
      <ProcessSection theme={theme} />

      {/* 7. Project Showcase (4 Live Website Demos + Category Filters) */}
      <ProjectShowcaseSection onNavigate={onNavigate} theme={theme} />

      {/* 8. Explore ERP Solutions (ERPNext, Odoo ERP, Zoho Screenshot Galleries) */}
      <ERPDemoShowcaseSection theme={theme} />

      {/* 9. Interactive FAQ Split Accordion */}
      <FAQSection onNavigate={onNavigate} theme={theme} />

      {/* 9. Final CTA & Embedded Formspree Consultation Form */}
      <ContactCTASection onNavigate={onNavigate} theme={theme} />
    </div>
  );
};
