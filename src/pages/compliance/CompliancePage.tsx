
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Search, ShieldCheck, FileCheck } from "lucide-react";
import { useComplianceData } from "@/hooks/useComplianceData";
import ComplianceStatCards from "./components/ComplianceStatCards";
import ComplianceDataTabs from "./components/ComplianceDataTabs";
import AddCertificationDialog from "./components/AddCertificationDialog";
import AddComplianceIssueDialog from "./components/AddComplianceIssueDialog";
import AddHazardousWasteDialog from "./components/AddHazardousWasteDialog";
import AddPPERequirementDialog from "./components/AddPPERequirementDialog";

const CompliancePage = () => {
  const [search, setSearch] = useState("");
  const {
    certifications,
    complianceIssues,
    regulatoryCompliance,
    hazardousWaste,
    ppeRequirements,
    selectedRegion,
    setSelectedRegion,
    isLoading,
    addCertification,
    updateCertification,
    deleteCertification,
    addComplianceIssue,
    updateComplianceIssue,
    deleteComplianceIssue,
    addHazardousWaste,
    updateHazardousWaste,
    deleteHazardousWaste,
    addPPERequirement,
    updatePPERequirement,
    deletePPERequirement,
    seedSampleData
  } = useComplianceData();
  
  const handleAddCertification = (data: any) => {
    addCertification.mutate(data);
  };
  
  const handleAddComplianceIssue = (data: any) => {
    addComplianceIssue.mutate(data);
  };
  
  const handleAddHazardousWaste = (data: any) => {
    addHazardousWaste.mutate(data);
  };
  
  const handleAddPPERequirement = (data: any) => {
    addPPERequirement.mutate(data);
  };
  
  // Calculate some compliance stats
  const expiringCertifications = certifications.filter(cert => cert.status === 'Expiring Soon').length;
  const openIssues = complianceIssues.filter(issue => issue.status !== 'Resolved').length;
  const pendingDisposal = hazardousWaste.filter(waste => waste.status === 'Pending').length;
  const nonCompliantPPE = ppeRequirements.filter(ppe => ppe.status === 'Non-Compliant').length;
  
  const totalIssues = expiringCertifications + openIssues + pendingDisposal + nonCompliantPPE;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Compliance Management</h1>
          {totalIssues > 0 && (
            <div className="flex items-center gap-1 mt-1 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">{totalIssues} compliance items requiring attention</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search compliance data..." 
              className="pl-8" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          <div className="flex gap-2">
            <AddCertificationDialog onAddCertification={handleAddCertification} />
            <AddComplianceIssueDialog onAddComplianceIssue={handleAddComplianceIssue} />
            <AddHazardousWasteDialog onAddHazardousWaste={handleAddHazardousWaste} />
            <AddPPERequirementDialog onAddPPERequirement={handleAddPPERequirement} />
            <Button variant="outline" onClick={() => seedSampleData()}>
              Add Sample Data
            </Button>
          </div>
        </div>
      </div>
      
      <ComplianceStatCards 
        certifications={certifications} 
        complianceIssues={complianceIssues} 
        hazardousWaste={hazardousWaste}
        ppeRequirements={ppeRequirements}
      />
      
      <ComplianceDataTabs 
        search={search} 
        certifications={certifications} 
        complianceIssues={complianceIssues} 
        regulatoryCompliance={regulatoryCompliance}
        hazardousWaste={hazardousWaste}
        ppeRequirements={ppeRequirements}
        selectedRegion={selectedRegion} 
        setSelectedRegion={setSelectedRegion} 
        isLoading={isLoading} 
        updateCertification={updateCertification} 
        deleteCertification={deleteCertification} 
        updateComplianceIssue={updateComplianceIssue} 
        deleteComplianceIssue={deleteComplianceIssue}
        updateHazardousWaste={updateHazardousWaste}
        deleteHazardousWaste={deleteHazardousWaste}
        updatePPERequirement={updatePPERequirement}
        deletePPERequirement={deletePPERequirement}
      />
    </div>
  );
};

export default CompliancePage;
