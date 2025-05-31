
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home } from "lucide-react";

interface HeaderTabsProps {
  currentPath: string;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({
  currentPath
}) => {
  return (
    <Tabs value={currentPath} className="hidden md:block" onValueChange={value => {
      window.location.href = value;
    }}>
      <TabsList className="bg-blue-50 mx-[50px] px-[12px]">
        <TabsTrigger value="/" className={currentPath === '/' ? 'data-[state=active]' : ''}>
          <Home className="mr-2 h-4 w-4" />
          Home
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default HeaderTabs;
