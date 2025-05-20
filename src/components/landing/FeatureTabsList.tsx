
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featureTabs } from "./types/featureTypes";
import { 
  Calendar, 
  PackageOpen, 
  Shield, 
  PaintBucket, 
  Sparkles, 
  Users, 
  LayoutDashboard 
} from "lucide-react";

// Map of icon names to icon components
const iconMap = {
  Calendar: <Calendar className="h-5 w-5" />,
  PackageOpen: <PackageOpen className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  PaintBucket: <PaintBucket className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  LayoutDashboard: <LayoutDashboard className="h-5 w-5" />
};

const FeatureTabsList = () => {
  return (
    <div className="flex justify-center mb-8">
      <TabsList className="h-auto p-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1">
        {featureTabs.map(tab => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id} 
            className="flex items-center gap-1.5 h-10 px-3"
          >
            {iconMap[tab.icon as keyof typeof iconMap]}
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default FeatureTabsList;
