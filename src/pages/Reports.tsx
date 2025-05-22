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
  const {
    hazardousWaste,
    isHazardousWasteLoading
  } = useHazardousWaste();
  const {
    ppeRequirements,
    isPPERequirementsLoading
  } = usePPERequirements();

  // Calculate compliance alerts
  const expiringCertifications = ppeRequirements.filter(ppe => new Date(ppe.next_inspection) <= new Date(new Date().setDate(new Date().getDate() + 30))).length;
  const pendingWaste = hazardousWaste.filter(waste => waste.status === 'Pending').length;
  const complianceAlerts = expiringCertifications + pendingWaste;
  return <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-purple-600">Reports Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze production metrics, material usage, quality control, efficiency, and compliance.
          </p>
        </div>
        
        <Button onClick={seedSampleData} variant="outline" className="gap-2">
          <DatabaseZap size={16} />
          Seed Sample Data
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="compliance" className="relative">
            Compliance
            {complianceAlerts > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {complianceAlerts}
              </span>}
          </TabsTrigger>
        </TabsList>
        
        <div className="flex justify-end mb-4">
          <Tabs value={dateRange} onValueChange={value => setDateRange(value as DateRange)} className="w-fit">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 text-center">Production Overview</CardTitle>
                <CardDescription className="text-center">Units produced over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ProductionChart dateRange={dateRange} data={productionData} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 text-center">Quality Control</CardTitle>
                <CardDescription className="text-center">Quality metrics and defect rates</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <QualityMetrics dateRange={dateRange} data={qualityData} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 text-center">Material Usage</CardTitle>
                <CardDescription className="text-center">Consumption and waste metrics</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <MaterialUsageReport dateRange={dateRange} data={materialUsageData} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600 text-center">Efficiency Metrics</CardTitle>
                <CardDescription className="text-center">Production efficiency and utilization</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <EfficiencyReport dateRange={dateRange} data={efficiencyData} kpiData={efficiencyKPIs} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Production Details</CardTitle>
              <CardDescription>Comprehensive production metrics</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ProductionChart dateRange={dateRange} detailed data={productionData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Quality Analysis</CardTitle>
              <CardDescription>Detailed quality metrics and defect tracking</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <QualityMetrics dateRange={dateRange} detailed data={qualityData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Efficiency Analysis</CardTitle>
              <CardDescription>Detailed efficiency metrics and utilization rates</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <EfficiencyReport dateRange={dateRange} detailed data={efficiencyData} kpiData={efficiencyKPIs} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Compliance Analysis</CardTitle>
              <CardDescription>PPE requirements and hazardous waste management</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ComplianceReport dateRange={dateRange} detailed hazardousWaste={hazardousWaste} ppeRequirements={ppeRequirements} isLoading={isHazardousWasteLoading || isPPERequirementsLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default Reports;