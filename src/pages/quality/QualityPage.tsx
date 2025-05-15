
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQualityData } from "@/hooks/useQualityData";
import QualityStatCards from "./components/QualityStatCards";
import QualityDataTabs from "./components/QualityDataTabs";

const QualityPage = () => {
  const [search, setSearch] = useState("");
  const { 
    inspections, 
    certifications, 
    complianceIssues, 
    isLoading,
    seedSampleData
  } = useQualityData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quality Control & Compliance</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={seedSampleData} variant="outline" size="sm">
            Seed Sample Data
          </Button>
        </div>
      </div>
      
      <QualityStatCards 
        inspections={inspections} 
        certifications={certifications}
        complianceIssues={complianceIssues}
      />
      
      <QualityDataTabs 
        search={search}
        inspections={inspections}
        certifications={certifications}
        complianceIssues={complianceIssues}
        isLoading={isLoading}
      />
    </div>
  );
};

export default QualityPage;
