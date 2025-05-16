
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QualityInspection } from "@/types/quality";
import InspectionsTab from "./InspectionsTab";

interface QualityDataTabsProps {
  search: string;
  inspections: QualityInspection[];
  isLoading: boolean;
}

const QualityDataTabs: React.FC<QualityDataTabsProps> = ({
  search,
  inspections,
  isLoading
}) => {
  const filteredInspections = inspections.filter(
    (item) => 
      item.inspection_id.toLowerCase().includes(search.toLowerCase()) || 
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.inspector.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="inspections" className="w-full">
          <TabsList className="w-full justify-start rounded-b-none rounded-t-lg border-b p-0">
            <TabsTrigger value="inspections" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Quality Inspections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inspections" className="p-4">
            <InspectionsTab 
              inspections={filteredInspections} 
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QualityDataTabs;
