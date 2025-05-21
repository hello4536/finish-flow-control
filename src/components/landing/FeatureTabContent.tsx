
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { FeatureTab } from "./types/featureTypes";
import { Link } from "react-router-dom";

interface FeatureTabContentProps {
  tab: FeatureTab;
}

const FeatureTabContent: React.FC<FeatureTabContentProps> = ({ tab }) => {
  return (
    <TabsContent key={tab.id} value={tab.id} className="focus-visible:outline-none">
      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3">
          <div className="rounded-xl overflow-hidden border shadow-lg bg-white">
            <img src={tab.screenshot} alt={tab.altText} className="w-full h-auto" />
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-blue-900">{tab.label}</h3>
          <p className="text-gray-600 text-lg">{tab.description}</p>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Key Features</h4>
            <ul className="space-y-3">
              {tab.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild className="mt-6 rounded-md bg-blue-900 hover:bg-blue-800">
              <Link to="/auth/signup">
                Try this feature
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default FeatureTabContent;
