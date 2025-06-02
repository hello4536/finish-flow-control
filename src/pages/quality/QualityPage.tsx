
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQualityData } from "@/hooks/useQualityData";
import QualityStatCards from "./components/QualityStatCards";
import QualityDataTabs from "./components/QualityDataTabs";
import AddInspectionDialog from "./components/AddInspectionDialog";

const QualityPage = () => {
  const [search, setSearch] = useState("");
  const {
    inspections,
    isLoading,
    addInspection
  } = useQualityData();
  
  const handleAddInspection = (data: any) => {
    addInspection.mutate(data);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Quality Control
            </h1>
            <p className="text-slate-600 mt-2 font-medium">
              Monitor quality inspections, compliance issues, and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search quality data..." 
                className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg focus:bg-white transition-all duration-300" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
            <AddInspectionDialog onAddInspection={handleAddInspection} />
          </div>
        </div>
        
        <QualityStatCards inspections={inspections} />
        
        <QualityDataTabs search={search} inspections={inspections} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default QualityPage;
