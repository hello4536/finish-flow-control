
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductionChart } from "@/components/reports/ProductionChart";
import { QualityMetrics } from "@/components/reports/QualityMetrics";
import { MaterialUsageReport } from "@/components/reports/MaterialUsageReport";
import { EfficiencyReport } from "@/components/reports/EfficiencyReport";
import { ComplianceReport } from "@/components/reports/ComplianceReport";
import { useReportsData, DateRange } from "@/hooks/useReportsData";
import { useHazardousWaste } from "@/hooks/useHazardousWaste";
import { usePPERequirements } from "@/hooks/usePPERequirements";
import { Button } from "@/components/ui/button";
import { AlertTriangle, DatabaseZap } from "lucide-react";

const Reports = () => {
  const [dateRange, setDateRange] = useState<DateRange>("month");
  const {
    productionData,
    qualityData,
    materialUsageData,
    efficiencyData,
    efficiencyKPIs,
    isLoading,
    hasErrors,
    seedSampleData
  } = useReportsData(dateRange);
  
  const { hazardousWaste, isHazardousWasteLoading } = useHazardousWaste();
  const { ppeRequirements, isPPERequirementsLoading } = usePPERequirements();

  // Calculate compliance alerts
  const expiringCertifications = ppeRequirements.filter(
    ppe => new Date(ppe.next_inspection) <= new Date(new Date().setDate(new Date().getDate() + 30))
  ).length;
  const pendingWaste = hazardousWaste.filter(waste => waste.status === 'Pending').length;
  const complianceAlerts = expiringCertifications + pendingWaste;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Reports Dashboard
            </h1>
            <p className="text-slate-600 mt-2 font-medium">
              Analyze production metrics, material usage, quality control, efficiency, and compliance.
            </p>
          </div>
          
          <Button 
            onClick={seedSampleData} 
            variant="outline" 
            className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <DatabaseZap size={16} />
            Seed Sample Data
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="production" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Production</TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Quality</TabsTrigger>
            <TabsTrigger value="efficiency" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Efficiency</TabsTrigger>
            <TabsTrigger value="compliance" className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              Compliance
              {complianceAlerts > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {complianceAlerts}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <div className="flex justify-end mb-4">
            <Tabs value={dateRange} onValueChange={(value) => setDateRange(value as DateRange)} className="w-fit">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl">
                <TabsTrigger value="week" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Week</TabsTrigger>
                <TabsTrigger value="month" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Month</TabsTrigger>
                <TabsTrigger value="quarter" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Quarter</TabsTrigger>
                <TabsTrigger value="year" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">Production Overview</CardTitle>
                  <CardDescription className="text-center text-slate-600 font-medium">Units produced over time</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ProductionChart dateRange={dateRange} data={productionData} isLoading={isLoading} />
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-center">Quality Control</CardTitle>
                  <CardDescription className="text-center text-slate-600 font-medium">Quality metrics and defect rates</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <QualityMetrics dateRange={dateRange} data={qualityData} isLoading={isLoading} />
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-orange-50/30 to-amber-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent text-center">Material Usage</CardTitle>
                  <CardDescription className="text-center text-slate-600 font-medium">Consumption and waste metrics</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <MaterialUsageReport dateRange={dateRange} data={materialUsageData} isLoading={isLoading} />
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-purple-50/30 to-violet-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent text-center">Efficiency Metrics</CardTitle>
                  <CardDescription className="text-center text-slate-600 font-medium">Production efficiency and utilization</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <EfficiencyReport dateRange={dateRange} data={efficiencyData} kpiData={efficiencyKPIs} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-4">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Production Details</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Comprehensive production metrics</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ProductionChart dateRange={dateRange} detailed data={productionData} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-4">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-100/40 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Quality Analysis</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Detailed quality metrics and defect tracking</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <QualityMetrics dateRange={dateRange} detailed data={qualityData} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-4">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-purple-50/30 to-violet-100/40 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Efficiency Analysis</CardTitle>
                <CardDescription className="text-slate-600 font-medium">Detailed efficiency metrics and utilization rates</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <EfficiencyReport dateRange={dateRange} detailed data={efficiencyData} kpiData={efficiencyKPIs} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-4">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-red-50/30 to-rose-100/40 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Compliance Analysis</CardTitle>
                <CardDescription className="text-slate-600 font-medium">PPE requirements and hazardous waste management</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ComplianceReport 
                  dateRange={dateRange} 
                  detailed 
                  hazardousWaste={hazardousWaste} 
                  ppeRequirements={ppeRequirements} 
                  isLoading={isHazardousWasteLoading || isPPERequirementsLoading} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
