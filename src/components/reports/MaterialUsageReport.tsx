
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

type DateRange = "week" | "month" | "quarter" | "year";

interface MaterialUsageReportProps {
  dateRange: DateRange;
  detailed?: boolean;
}

export function MaterialUsageReport({ dateRange, detailed = false }: MaterialUsageReportProps) {
  // Generate mock data based on date range
  const generateMaterialsData = () => {
    // This data doesn't change much with date range since it's a breakdown
    return [
      { name: "Aluminum", value: 35, color: "#1e40af" },  // Dark blue
      { name: "Steel", value: 28, color: "#6b7280" },     // Gray
      { name: "Plastic", value: 15, color: "#f59e0b" },   // Orange
      { name: "Rubber", value: 12, color: "#1f2937" },    // Dark gray
      { name: "Electronics", value: 10, color: "#10b981" } // Green
    ];
  };
  
  const generateWasteData = () => {
    // Change waste percentages slightly by date range
    let baseData = [
      { name: "Recycled", value: 65, color: "#22c55e" },       // Green
      { name: "Reused", value: 18, color: "#3b82f6" },         // Blue
      { name: "Disposal", value: 17, color: "#ef4444" }        // Red
    ];
    
    // Small variations based on date range
    switch(dateRange) {
      case "week":
        return baseData;
      case "month":
        baseData[0].value = 67;
        baseData[1].value = 18;
        baseData[2].value = 15;
        return baseData;
      case "quarter":
        baseData[0].value = 70;
        baseData[1].value = 17;
        baseData[2].value = 13;
        return baseData;
      case "year":
        baseData[0].value = 72;
        baseData[1].value = 16;
        baseData[2].value = 12;
        return baseData;
    }
    
    return baseData;
  };

  const materials = generateMaterialsData();
  const waste = generateWasteData();
  
  const chartConfig = {
    materials: { label: "Materials", color: "#0b2065" },
    waste: { label: "Waste Management", color: "#f59e0b" }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartContainer config={chartConfig} className="aspect-[4/3]">
        {/* Wrap multiple elements in a single fragment */}
        <>
          <div className="text-center mb-2 font-medium">Material Composition</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={materials}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {materials.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="font-medium">{payload[0].name}</div>
                        <div className="text-sm text-muted-foreground">
                          {payload[0].value}%
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </>
      </ChartContainer>

      <ChartContainer config={chartConfig} className="aspect-[4/3]">
        {/* Wrap multiple elements in a single fragment */}
        <>
          <div className="text-center mb-2 font-medium">Waste Management</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={waste}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {waste.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="font-medium">{payload[0].name}</div>
                        <div className="text-sm text-muted-foreground">
                          {payload[0].value}%
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </>
      </ChartContainer>
    </div>
  );
}
