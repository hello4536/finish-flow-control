
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeatureSection from "./FeatureSection";
import { featureTabs } from "./types";

const ComprehensiveFeaturesSection = () => {
  return (
    <div className="relative">
      {/* Intro Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Complete Feature Overview
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Everything you need for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              finishing excellence
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover how each feature works together to create the most comprehensive finishing management platform available today.
          </p>
        </div>
      </section>

      {/* Individual Feature Sections */}
      {featureTabs.map((feature, index) => (
        <FeatureSection 
          key={feature.id} 
          feature={feature} 
          index={index}
        />
      ))}

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of finishing professionals who use Finivo to streamline their operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Link to="/auth/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComprehensiveFeaturesSection;
