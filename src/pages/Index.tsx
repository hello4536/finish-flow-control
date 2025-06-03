
import React from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesPreviewSection from "@/components/landing/FeaturesPreviewSection";
import CtaSection from "@/components/landing/CtaSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import ResourcesSection from "@/components/landing/ResourcesSection";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/context/AuthContext";
import ProductOverviewSection from "@/components/landing/ProductOverviewSection";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <ProductOverviewSection />
        <BenefitsSection />
        <FeaturesPreviewSection />
        <HowItWorksSection />
        <ResourcesSection />
        <CtaSection />
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
