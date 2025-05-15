
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type DateRange = "week" | "month" | "quarter" | "year";

interface QualityMetricsProps {
  dateRange: DateRange;
  detailed?: boolean;
}

export function QualityMetrics({ dateRange, detailed = false }: QualityMetricsProps) {
  // Generate mock data based on date range
  const generateData = () => {
    let data = [];
    
    switch(dateRange) {
      case "week":
        data = [
          { name: "Mon", defectRate: 1.2, firstPassYield: 97.5, rework: 2.5 },
          { name: "Tue", defectRate: 1.5, firstPassYield: 97.0, rework: 3.0 },
          { name: "Wed", defectRate: 0.8, firstPassYield: 98.2, rework: 1.8 },
          { name: "Thu", defectRate: 1.1, firstPassYield: 97.8, rework: 2.2 },
          { name: "Fri", defectRate: 1.3, firstPassYield: 97.2, rework: 2.8 },
          { name: "Sat", defectRate: 0.9, firstPassYield: 98.0, rework: 2.0 },
          { name: "Sun", defectRate: 0.7, firstPassYield: 98.5, rework: 1.5 },
        ];
        break;
      case "month":
        data = Array.from({ length: detailed ? 30 : 10 }, (_, i) => ({
          name: `${i + 1}${detailed ? "" : "th"}`,
          defectRate: +(Math.random() * 1.5 + 0.5).toFixed(1),
          firstPassYield: +(Math.random() * 3 + 96).toFixed(1),
          rework: +(Math.random() * 3 + 1).toFixed(1)
        }));
        break;
      case "quarter":
        data = [
          { name: "Jan", defectRate: 1.1, firstPassYield: 97.5, rework: 2.5 },
          { name: "Feb", defectRate: 1.3, firstPassYield: 97.0, rework: 3.0 },
          { name: "Mar", defectRate: 0.9, firstPassYield: 98.2, rework: 1.8 },
        ];
        break;
      case "year":
        data = [
          { name: "Q1", defectRate: 1.1, firstPassYield: 97.8, rework: 2.2 },
          { name: "Q2", defectRate: 1.0, firstPassYield: 98.0, rework: 2.0 },
          { name: "Q3", defectRate: 0.9, firstPassYield: 98.3, rework: 1.7 },
          { name: "Q4", defectRate: 0.8, firstPassYield: 98.5, rework: 1.5 },
        ];
        break;
    }
    
    return data;
  };

  const data = generateData();
  const chartConfig = {
    defectRate: { label: "Defect Rate (%)", theme: { light: "#ef4444", dark: "#ef4444" } }, // Red
    firstPassYield: { label: "First Pass Yield (%)", theme: { light: "#22c55e", dark: "#22c55e" } }, // Green
    rework: { label: "Rework Rate (%)", theme: { light: "#f59e0b", dark: "#f59e0b" } } // Orange
  };

  // Calculate metrics
  const avgDefectRate = +(data.reduce((sum, item) => sum + item.defectRate, 0) / data.length).toFixed(2);
  const avgYield = +(data.reduce((sum, item) => sum + item.firstPassYield, 0) / data.length).toFixed(2);
  const avgRework = +(data.reduce((sum, item) => sum + item.rework, 0) / data.length).toFixed(2);

  return (
    <div className="space-y-6">
      {detailed && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-red-500">{avgDefectRate}%</div>
              <div className="text-sm text-muted-foreground">Avg Defect Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-500">{avgYield}%</div>
              <div className="text-sm text-muted-foreground">Avg First Pass Yield</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-amber-500">{avgRework}%</div>
              <div className="text-sm text-muted-foreground">Avg Rework Rate</div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <ChartContainer config={chartConfig} className="aspect-[4/3]">
        <ResponsiveContainer width="100%" height={detailed ? 400 : 300}>
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              domain={[0, 2]} 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Defect & Rework %', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[95, 100]} 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'First Pass Yield %', angle: -90, position: 'insideRight' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="defectRate" 
              stroke="var(--color-defectRate)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="firstPassYield" 
              stroke="var(--color-firstPassYield)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="rework" 
              stroke="var(--color-rework)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
