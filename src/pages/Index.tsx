
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PricingSection />
        <div className="container mx-auto my-10 px-4 text-center">
          {user ? (
            <Button asChild size="lg" className="px-8">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
