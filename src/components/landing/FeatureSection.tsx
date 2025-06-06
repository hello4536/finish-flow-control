
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FeatureTab } from "./types/FeatureTab";

interface FeatureSectionProps {
  feature: FeatureTab;
  index: number;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ feature, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <section className={`py-24 ${isEven ? 'bg-white' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Content */}
          <div className={`space-y-8 ${!isEven ? 'lg:col-start-2' : ''}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                {feature.label}
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                {feature.label}
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
            
            {/* Key Benefits */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle className="w-4 h-4 text-white" />
                </span>
                Key Benefits
              </h3>
              
              <div className="grid gap-4">
                {feature.features.slice(0, 6).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl hover:bg-blue-50/50 transition-colors duration-200 group">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group px-8 py-3 text-lg"
              >
                <Link to="/auth/signup" className="flex items-center">
                  Try {feature.label}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Screenshot */}
          <div className={`relative ${!isEven ? 'lg:col-start-1' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-2xl transform rotate-1"></div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl bg-white transform hover:scale-105 transition-transform duration-300">
              <img 
                src={feature.screenshot} 
                alt={feature.altText} 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
