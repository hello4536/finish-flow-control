
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MaterialsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  materialTypes: string[];
  hasHazardousMaterials?: boolean;
}

const MaterialsTabs: React.FC<MaterialsTabsProps> = ({
  activeTab,
  onTabChange,
  materialTypes,
  hasHazardousMaterials = false
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-flow-col auto-cols-fr overflow-auto">
        <TabsTrigger value="all">All Materials</TabsTrigger>
        <TabsTrigger value="low">Low Stock</TabsTrigger>
        {hasHazardousMaterials && (
          <TabsTrigger value="hazardous">Hazardous</TabsTrigger>
        )}
        {materialTypes.map(type => (
          <TabsTrigger key={type} value={type.toLowerCase()}>
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default MaterialsTabs;
