import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Play, CheckCircle2, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const MobileOptimizedHero = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const benefits = [
    { icon: <CheckCircle2 className="h-4 w-4" />, text: "30% Less Waste" },
    { icon: <Shield className="h-4 w-4" />, text: "100% Compliant" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "40% Faster Jobs" }
  ];

  return (
    <section className="pt-20 pb-12 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/40 to-purple-50/40 blur-3xl"></div>
      
      <div className="relative z-10 max-w-lg mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          #1 Finishing Management Software
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold mb-4 leading-tight">
          <span className="text-gray-900">Transform Your</span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Finishing Operations
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          Cut waste, ensure compliance, and boost efficiency with AI-powered finishing management
        </p>

        {/* Benefits horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-2 text-sm font-medium text-gray-700 whitespace-nowrap flex-shrink-0"
            >
              <div className="text-green-600">{benefit.icon}</div>
              {benefit.text}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mb-8">
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold text-base h-12 shadow-lg"
          >
            <Link to="/auth/signup" className="flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full font-semibold text-base h-12"
          >
            <Link to="#demo" className="flex items-center justify-center">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              Free 30-day trial
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              No credit card
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            💰 30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* Mobile-optimized hero image */}
      <div className="mt-8 px-4">
        <div className="relative bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm shadow-lg">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-1/3"></div>
              <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                Live Dashboard
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xs text-blue-600 mb-1">Efficiency</div>
                <div className="text-lg font-bold text-blue-900">87%</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-green-600 mb-1">Savings</div>
                <div className="text-lg font-bold text-green-900">$12.5K</div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedHero;