
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { FeatureTab } from "./types/featureTypes";

interface FeatureTabContentProps {
  tab: FeatureTab;
}

const FeatureTabContent: React.FC<FeatureTabContentProps> = ({ tab }) => {
  return (
    <TabsContent key={tab.id} value={tab.id} className="focus-visible:outline-none">
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-lg">
        {/* Screenshot Section */}
        <div className="aspect-video w-full relative">
          <img src={tab.screenshot} alt={tab.altText} className="w-full h-full object-contain" />
        </div>
        
        {/* Features Section */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">{tab.label}</h3>
          <p className="text-lg text-blue-800 mb-6">{tab.description}</p>
          
          <div>
            <h4 className="text-xl font-semibold text-blue-900 mb-4">Key Features & Benefits</h4>
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
              {tab.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                  <span className="text-blue-800">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 flex justify-center">
              <Button className="px-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default FeatureTabContent;
