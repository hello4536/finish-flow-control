
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductionChart } from "@/components/reports/ProductionChart";
import { QualityMetrics } from "@/components/reports/QualityMetrics";
import { MaterialUsageReport } from "@/components/reports/MaterialUsageReport";
import { EfficiencyReport } from "@/components/reports/EfficiencyReport";

const Reports = () => {
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month");
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
        <p className="text-muted-foreground">
          Analyze production metrics, material usage, quality control, and efficiency.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>
        
        <div className="flex justify-end mb-4">
          <Tabs value={dateRange} onValueChange={(value) => setDateRange(value as any)} className="w-fit">
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
                <CardTitle>Production Overview</CardTitle>
                <CardDescription>Units produced over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ProductionChart dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Control</CardTitle>
                <CardDescription>Quality metrics and defect rates</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <QualityMetrics dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Usage</CardTitle>
                <CardDescription>Consumption and waste metrics</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <MaterialUsageReport dateRange={dateRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Production efficiency and utilization</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <EfficiencyReport dateRange={dateRange} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Details</CardTitle>
              <CardDescription>Comprehensive production metrics</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ProductionChart dateRange={dateRange} detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality Analysis</CardTitle>
              <CardDescription>Detailed quality metrics and defect tracking</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <QualityMetrics dateRange={dateRange} detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Analysis</CardTitle>
              <CardDescription>Detailed efficiency metrics and utilization rates</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <EfficiencyReport dateRange={dateRange} detailed />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
