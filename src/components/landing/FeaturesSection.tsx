
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { featureTabs } from "./types/featureTypes";
import FeatureTabsList from "./FeatureTabsList";
import FeatureTabContent from "./FeatureTabContent";

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(featureTabs[0].id);

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-900 mb-4">
            Our Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need for finishing operations
          </h2>
          <p className="text-lg text-gray-600 max-w-[800px] mx-auto">
            Discover how Finivi can transform your finishing department with our comprehensive feature set
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
