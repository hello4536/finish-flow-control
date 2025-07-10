
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
import { useIsMobile } from "@/hooks/use-mobile";
import StickyMobileCTA from "@/components/mobile/StickyMobileCTA";
import MobileOptimizedHero from "@/components/mobile/MobileOptimizedHero";
import TouchFriendlyDemo from "@/components/mobile/TouchFriendlyDemo";
import MobilePricingCards from "@/components/mobile/MobilePricingCards";
import SwipeableTestimonials from "@/components/mobile/SwipeableTestimonials";

const Index = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Mobile-optimized hero or desktop hero */}
        {isMobile ? <MobileOptimizedHero /> : <HeroSection />}
        
        <LeadCapture />
        
        {/* Mobile-optimized demo or desktop demo */}
        {isMobile ? <TouchFriendlyDemo /> : <InteractiveDemo />}
        
        <ProductOverviewSection />
        <CompetitiveAdvantage />
        <BenefitsSection />
        <FeaturesPreviewSection />
        <HowItWorksSection />
        
        {/* Mobile-optimized testimonials or desktop CTA */}
        {isMobile ? <SwipeableTestimonials /> : <CtaSection />}
        
        {/* Mobile-optimized pricing or desktop pricing */}
        {isMobile ? <MobilePricingCards /> : <PricingSection />}
      </main>
      
      <Footer />
      
      {/* Mobile sticky CTA */}
      <StickyMobileCTA />
      
      {/* Add bottom padding on mobile to account for sticky CTA */}
      {isMobile && <div className="h-20" />}
    </div>
  );
};

export default Index;
