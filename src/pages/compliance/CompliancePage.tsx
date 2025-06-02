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
    deletePPERequirement
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Compliance Management
            </h1>
            <p className="text-slate-600 mt-2 font-medium">
              Monitor regulatory compliance, certifications, and safety requirements
            </p>
            {totalIssues > 0 && (
              <div className="flex items-center gap-1 mt-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">{totalIssues} compliance items requiring attention</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search compliance data..." 
                className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg focus:bg-white transition-all duration-300" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
          </div>
        </div>
        
        <ComplianceStatCards 
          certifications={certifications} 
          complianceIssues={complianceIssues} 
          hazardousWaste={hazardousWaste} 
          ppeRequirements={ppeRequirements}
          onAddCertification={handleAddCertification}
          onAddComplianceIssue={handleAddComplianceIssue}
          onAddHazardousWaste={handleAddHazardousWaste}
          onAddPPERequirement={handleAddPPERequirement}
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
        
        {/* Hidden dialogs - keeping for backward compatibility */}
        <div className="hidden">
          <AddCertificationDialog onAddCertification={handleAddCertification} />
          <AddComplianceIssueDialog onAddComplianceIssue={handleAddComplianceIssue} />
          <AddHazardousWasteDialog onAddHazardousWaste={handleAddHazardousWaste} />
          <AddPPERequirementDialog onAddPPERequirement={handleAddPPERequirement} />
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
