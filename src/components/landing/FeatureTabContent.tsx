
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { FeatureTab } from "./types/featureTypes";
import { Link } from "react-router-dom";

interface FeatureTabContentProps {
  tab: FeatureTab;
}

const FeatureTabContent: React.FC<FeatureTabContentProps> = ({ tab }) => {
  return (
    <TabsContent key={tab.id} value={tab.id} className="focus-visible:outline-none">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium">
              {tab.label}
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {tab.label}
            </h3>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {tab.description}
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="w-4 h-4 text-white" />
              </span>
              Key Benefits
            </h4>
            
            <div className="grid gap-3">
              {tab.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors duration-200 group">
                  <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <Link to="/auth/signup" className="flex items-center">
                Try this feature
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-2xl"></div>
          <div className="relative rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl bg-white">
            <img src={tab.screenshot} alt={tab.altText} className="w-full h-auto" />
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg rotate-12 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </TabsContent>
  );
};

export default FeatureTabContent;
