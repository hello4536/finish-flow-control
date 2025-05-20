
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { featureTabs } from "./types/featureTypes";
import FeatureTabsList from "./FeatureTabsList";
import FeatureTabContent from "./FeatureTabContent";

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(featureTabs[0].id);

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl tracking-tight font-extrabold text-blue-900 sm:text-5xl">
            Comprehensive Features for Finishing Operations
          </h2>
          <p className="mt-4 text-lg max-w-[800px] mx-auto text-blue-800 font-medium">
            Everything you need to manage your finishing department efficiently in one powerful platform.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation and Content */}
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
