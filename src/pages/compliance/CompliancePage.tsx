import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useComplianceData } from "@/hooks/useComplianceData";
import ComplianceStatCards from "./components/ComplianceStatCards";
import ComplianceDataTabs from "./components/ComplianceDataTabs";
import AddCertificationDialog from "./components/AddCertificationDialog";
import AddComplianceIssueDialog from "./components/AddComplianceIssueDialog";
const CompliancePage = () => {
  const [search, setSearch] = useState("");
  const {
    certifications,
    complianceIssues,
    regulatoryCompliance,
    selectedRegion,
    setSelectedRegion,
    isLoading,
    addCertification,
    updateCertification,
    deleteCertification,
    addComplianceIssue,
    updateComplianceIssue,
    deleteComplianceIssue,
    seedSampleData
  } = useComplianceData();
  const handleAddCertification = (data: any) => {
    addCertification.mutate(data);
  };
  const handleAddComplianceIssue = (data: any) => {
    addComplianceIssue.mutate(data);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Compliance Management</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <AddCertificationDialog onAddCertification={handleAddCertification} />
          <AddComplianceIssueDialog onAddComplianceIssue={handleAddComplianceIssue} />
          
        </div>
      </div>
      
      <ComplianceStatCards certifications={certifications} complianceIssues={complianceIssues} />
      
      <ComplianceDataTabs search={search} certifications={certifications} complianceIssues={complianceIssues} regulatoryCompliance={regulatoryCompliance} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} isLoading={isLoading} updateCertification={updateCertification} deleteCertification={deleteCertification} updateComplianceIssue={updateComplianceIssue} deleteComplianceIssue={deleteComplianceIssue} />
    </div>;
};
export default CompliancePage;