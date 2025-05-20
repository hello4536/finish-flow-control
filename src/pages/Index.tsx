import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CtaSection from "@/components/landing/CtaSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
const Index = () => {
  const {
    user
  } = useAuth();
  return <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PricingSection />
        
      </main>
      
      <Footer />
    </div>;
};
export default Index;