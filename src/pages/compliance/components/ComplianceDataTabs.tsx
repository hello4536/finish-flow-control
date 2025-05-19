
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Certification, ComplianceIssue, RegulatoryCompliance, Region, HazardousWaste, PPERequirement } from "@/types/quality";
import CertificationsTab from "./CertificationsTab";
import ComplianceIssuesTab from "./ComplianceIssuesTab";
import RegulatoryComplianceTab from "./RegulatoryComplianceTab";
import HazardousWasteTab from "./HazardousWasteTab";
import PPERequirementsTab from "./PPERequirementsTab";
import { UseMutationResult } from "@tanstack/react-query";

interface ComplianceDataTabsProps {
  search: string;
  certifications: Certification[];
  complianceIssues: ComplianceIssue[];
  regulatoryCompliance: RegulatoryCompliance[];
  hazardousWaste: HazardousWaste[];
  ppeRequirements: PPERequirement[];
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  isLoading: boolean;
  updateCertification: UseMutationResult<any, any, any, any>;
  deleteCertification: UseMutationResult<any, any, any, any>;
  updateComplianceIssue: UseMutationResult<any, any, any, any>;
  deleteComplianceIssue: UseMutationResult<any, any, any, any>;
  updateHazardousWaste: UseMutationResult<any, any, any, any>;
  deleteHazardousWaste: UseMutationResult<any, any, any, any>;
  updatePPERequirement: UseMutationResult<any, any, any, any>;
  deletePPERequirement: UseMutationResult<any, any, any, any>;
}

const ComplianceDataTabs: React.FC<ComplianceDataTabsProps> = ({
  search,
  certifications,
  complianceIssues,
  regulatoryCompliance,
  hazardousWaste,
  ppeRequirements,
  selectedRegion,
  setSelectedRegion,
  isLoading,
  updateCertification,
  deleteCertification,
  updateComplianceIssue,
  deleteComplianceIssue,
  updateHazardousWaste,
  deleteHazardousWaste,
  updatePPERequirement,
  deletePPERequirement
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

  const filteredHazardousWaste = hazardousWaste.filter(
    (item) => 
      item.waste_id.toLowerCase().includes(search.toLowerCase()) || 
      item.material.toLowerCase().includes(search.toLowerCase()) ||
      item.handler.toLowerCase().includes(search.toLowerCase()) ||
      (item.manifest_number && item.manifest_number.toLowerCase().includes(search.toLowerCase()))
  );
  
  const filteredPPERequirements = ppeRequirements.filter(
    (item) => 
      item.requirement_id.toLowerCase().includes(search.toLowerCase()) || 
      item.department.toLowerCase().includes(search.toLowerCase()) ||
      item.equipment.toLowerCase().includes(search.toLowerCase()) ||
      item.standard.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-0">
        <Tabs defaultValue="certifications" className="w-full">
          <TabsList className="w-full justify-start rounded-b-none rounded-t-lg border-b p-0">
            <TabsTrigger value="certifications" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Certifications
            </TabsTrigger>
            <TabsTrigger value="issues" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Compliance Issues
            </TabsTrigger>
            <TabsTrigger value="waste" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              Hazardous Waste
            </TabsTrigger>
            <TabsTrigger value="ppe" className="rounded-t-lg rounded-b-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
              PPE Requirements
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
          
          <TabsContent value="issues" className="p-4">
            <ComplianceIssuesTab 
              complianceIssues={filteredComplianceIssues} 
              isLoading={isLoading}
              updateComplianceIssue={updateComplianceIssue}
              deleteComplianceIssue={deleteComplianceIssue}
            />
          </TabsContent>
          
          <TabsContent value="waste" className="p-4">
            <HazardousWasteTab 
              hazardousWaste={filteredHazardousWaste} 
              isLoading={isLoading}
              updateHazardousWaste={updateHazardousWaste}
              deleteHazardousWaste={deleteHazardousWaste}
            />
          </TabsContent>
          
          <TabsContent value="ppe" className="p-4">
            <PPERequirementsTab 
              ppeRequirements={filteredPPERequirements} 
              isLoading={isLoading}
              updatePPERequirement={updatePPERequirement}
              deletePPERequirement={deletePPERequirement}
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
