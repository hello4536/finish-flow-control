
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { featureTabs } from "./types/featureTypes";
import FeatureTabsList from "./FeatureTabsList";
import FeatureTabContent from "./FeatureTabContent";

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(featureTabs[0].id);

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Powerful Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Everything you need for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              finishing operations
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how Finivo can transform your finishing department with our comprehensive feature set designed by industry experts
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue={featureTabs[0].id} onValueChange={setActiveTab}>
            <FeatureTabsList />
            {featureTabs.map(tab => (
              <FeatureTabContent key={tab.id} tab={tab} />
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
