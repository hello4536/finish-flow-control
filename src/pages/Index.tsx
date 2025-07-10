
import React from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesPreviewSection from "@/components/landing/FeaturesPreviewSection";
import CtaSection from "@/components/landing/CtaSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/context/AuthContext";
import ProductOverviewSection from "@/components/landing/ProductOverviewSection";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import CompetitiveAdvantage from "@/components/landing/CompetitiveAdvantage";
import LeadCapture from "@/components/landing/LeadCapture";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <LeadCapture />
        <InteractiveDemo />
        <ProductOverviewSection />
        <CompetitiveAdvantage />
        <BenefitsSection />
        <FeaturesPreviewSection />
        <HowItWorksSection />
        <CtaSection />
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
