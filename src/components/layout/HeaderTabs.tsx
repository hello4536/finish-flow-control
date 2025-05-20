
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home } from "lucide-react";

interface HeaderTabsProps {
  currentPath: string;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({ currentPath }) => {
  return (
    <Tabs 
      value={currentPath} 
      className="hidden md:block" 
      onValueChange={value => {
        window.location.href = value;
      }}
    >
      <TabsList className="bg-blue-50">
        <TabsTrigger value="/" className={currentPath === '/' ? 'data-[state=active]' : ''}>
          <Home className="mr-2 h-4 w-4" />
          Home
        </TabsTrigger>
        <TabsTrigger value="/#features" className={currentPath === '/#features' ? 'data-[state=active]' : ''}>
          Features
        </TabsTrigger>
        <TabsTrigger value="/woodworking-finishing" className={currentPath.startsWith('/woodworking-finishing') ? 'data-[state=active]' : ''}>
          Woodworking Finishing
        </TabsTrigger>
        <TabsTrigger value="/auto-body-finishing" className={currentPath.startsWith('/auto-body-finishing') ? 'data-[state=active]' : ''}>
          Auto Body Finishing
        </TabsTrigger>
        <TabsTrigger value="/#pricing" className={currentPath === '/#pricing' ? 'data-[state=active]' : ''}>
          Pricing
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default HeaderTabs;
