
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Certification, ComplianceIssue, RegulatoryCompliance, Region } from "@/types/quality";
import CertificationsTab from "./CertificationsTab";
import ComplianceIssuesTab from "./ComplianceIssuesTab";
import RegulatoryComplianceTab from "./RegulatoryComplianceTab";
import { UseMutationResult } from "@tanstack/react-query";

interface ComplianceDataTabsProps {
  search: string;
  certifications: Certification[];
  complianceIssues: ComplianceIssue[];
  regulatoryCompliance: RegulatoryCompliance[];
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  isLoading: boolean;
  updateCertification: UseMutationResult<any, any, any, any>;
  deleteCertification: UseMutationResult<any, any, any, any>;
  updateComplianceIssue: UseMutationResult<any, any, any, any>;
  deleteComplianceIssue: UseMutationResult<any, any, any, any>;
}

const ComplianceDataTabs: React.FC<ComplianceDataTabsProps> = ({
  search,
  certifications,
  complianceIssues,
  regulatoryCompliance,
  selectedRegion,
  setSelectedRegion,
  isLoading,
  updateCertification,
  deleteCertification,
  updateComplianceIssue,
  deleteComplianceIssue
}) => {
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
        <Tabs defaultValue="certifications" className="w-full">
          <TabsList className="w-full justify-start rounded-b-none rounded-t-lg border-b p-0">
            <TabsTrigger value="certifications" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Certifications
            </TabsTrigger>
            <TabsTrigger value="violations" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Compliance Issues
            </TabsTrigger>
            <TabsTrigger value="regulatory" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Regulatory Matrix
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="certifications" className="p-4">
            <CertificationsTab 
              certifications={filteredCertifications} 
              isLoading={isLoading}
              updateCertification={updateCertification}
              deleteCertification={deleteCertification}
            />
          </TabsContent>
          
          <TabsContent value="violations" className="p-4">
            <ComplianceIssuesTab 
              complianceIssues={filteredComplianceIssues} 
              isLoading={isLoading}
              updateComplianceIssue={updateComplianceIssue}
              deleteComplianceIssue={deleteComplianceIssue}
            />
          </TabsContent>
          
          <TabsContent value="regulatory" className="p-4">
            <RegulatoryComplianceTab 
              regulatoryCompliance={regulatoryCompliance}
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
              isLoading={isLoading} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComplianceDataTabs;
