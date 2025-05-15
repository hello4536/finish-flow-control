
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QualityInspection, Certification, ComplianceIssue } from "@/types/quality";
import InspectionsTab from "./InspectionsTab";
import CertificationsTab from "./CertificationsTab";
import ComplianceIssuesTab from "./ComplianceIssuesTab";

interface QualityDataTabsProps {
  search: string;
  inspections: QualityInspection[];
  certifications: Certification[];
  complianceIssues: ComplianceIssue[];
  isLoading: boolean;
}

const QualityDataTabs: React.FC<QualityDataTabsProps> = ({
  search,
  inspections,
  certifications,
  complianceIssues,
  isLoading
}) => {
  const filteredInspections = inspections.filter(
    (item) => 
      item.inspection_id.toLowerCase().includes(search.toLowerCase()) || 
      item.product.toLowerCase().includes(search.toLowerCase()) ||
      item.inspector.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredCertifications = certifications.filter(
    (item) => 
      item.certification_id.toLowerCase().includes(search.toLowerCase()) || 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.authority.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredComplianceIssues = complianceIssues.filter(
    (item) => 
      item.issue_id.toLowerCase().includes(search.toLowerCase()) || 
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.assignee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="inspections" className="w-full">
          <TabsList className="w-full justify-start rounded-b-none rounded-t-lg border-b p-0">
            <TabsTrigger value="inspections" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Quality Inspections
            </TabsTrigger>
            <TabsTrigger value="certifications" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Certifications
            </TabsTrigger>
            <TabsTrigger value="violations" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Compliance Issues
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inspections" className="p-4">
            <InspectionsTab 
              inspections={filteredInspections} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="certifications" className="p-4">
            <CertificationsTab 
              certifications={filteredCertifications} 
              isLoading={isLoading} 
            />
          </TabsContent>
          
          <TabsContent value="violations" className="p-4">
            <ComplianceIssuesTab 
              complianceIssues={filteredComplianceIssues} 
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QualityDataTabs;
