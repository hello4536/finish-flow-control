
import React, { useMemo } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange } from "@/hooks/useReportsData";

interface MaterialUsageReportProps {
  dateRange: DateRange;
  detailed?: boolean;
  data: any[];
  isLoading: boolean;
}

export function MaterialUsageReport({ dateRange, detailed = false, data, isLoading }: MaterialUsageReportProps) {
  // Split the data into materials and waste
  const { materials, waste } = useMemo(() => {
    if (!data || data.length === 0) {
      return { materials: [], waste: [] };
    }
    
    const materialsData = data.filter(item => item.category === "Materials");
    const wasteData = data.filter(item => item.category === "Waste");
    
    return { materials: materialsData, waste: wasteData };
  }, [data]);
  
  const chartConfig = {
    materials: { label: "Materials", color: "#0b2065" },
    waste: { label: "Waste Management", color: "#f59e0b" }
  };

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-lg">
        <p className="text-muted-foreground">No material usage data available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartContainer config={chartConfig} className="aspect-[4/3]">
        <PieChart>
          <div className="text-center mb-2 font-medium">Material Composition</div>
          <Pie
            data={materials}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="material"
            label={({ material, percent }) => `${material} ${(percent * 100).toFixed(0)}%`}
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
                    <div className="font-medium">{payload[0].payload.material}</div>
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
      </ChartContainer>

      <ChartContainer config={chartConfig} className="aspect-[4/3]">
        <PieChart>
          <div className="text-center mb-2 font-medium">Waste Management</div>
          <Pie
            data={waste}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="material"
            label={({ material, percent }) => `${material} ${(percent * 100).toFixed(0)}%`}
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
                    <div className="font-medium">{payload[0].payload.material}</div>
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
      </ChartContainer>
    </div>
  );
}
