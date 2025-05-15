
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define types for our reports data
export type DateRange = "week" | "month" | "quarter" | "year";

export interface ProductionData {
  id: string;
  date: string;
  completed: number;
  planned: number;
  in_progress: number | null;
  date_range: DateRange;
}

export interface QualityData {
  id: string;
  date: string;
  defect_rate: number;
  first_pass_yield: number;
  rework: number;
  date_range: DateRange;
}

export interface MaterialUsage {
  id: string;
  material: string;
  value: number;
  color: string;
  category: string;
  date_range: DateRange;
}

export interface EfficiencyData {
  id: string;
  date: string;
  efficiency: number;
  downtime: number;
  utilization: number;
  date_range: DateRange;
}

export interface EfficiencyKPI {
  id: string;
  subject: string;
  score: number;
  full_mark: number;
  date_range: DateRange;
}

export const useReportsData = (dateRange: DateRange) => {
  const queryClient = useQueryClient();

  // Fetch production reports data
  const {
    data: productionData = [],
    isLoading: isLoadingProduction,
    error: productionError,
  } = useQuery({
    queryKey: ["production-reports", dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("production_reports")
        .select("*")
        .eq("date_range", dateRange)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as ProductionData[];
    },
  });

  // Fetch quality metrics data
  const {
    data: qualityData = [],
    isLoading: isLoadingQuality,
    error: qualityError,
  } = useQuery({
    queryKey: ["quality-metrics", dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quality_metrics")
        .select("*")
        .eq("date_range", dateRange)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as QualityData[];
    },
  });

  // Fetch material usage data
  const {
    data: materialUsageData = [],
    isLoading: isLoadingMaterials,
    error: materialsError,
  } = useQuery({
    queryKey: ["material-usage", dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("material_usage")
        .select("*")
        .eq("date_range", dateRange);

      if (error) throw error;
      return data as MaterialUsage[];
    },
  });

  // Fetch efficiency reports data
  const {
    data: efficiencyData = [],
    isLoading: isLoadingEfficiency,
    error: efficiencyError,
  } = useQuery({
    queryKey: ["efficiency-reports", dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("efficiency_reports")
        .select("*")
        .eq("date_range", dateRange)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as EfficiencyData[];
    },
  });

  // Fetch efficiency KPIs data
  const {
    data: efficiencyKPIs = [],
    isLoading: isLoadingKPIs,
    error: kpisError,
  } = useQuery({
    queryKey: ["efficiency-kpis", dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("efficiency_kpis")
        .select("*")
        .eq("date_range", dateRange);

      if (error) throw error;
      return data as EfficiencyKPI[];
    },
  });

  // Function to populate mock data for testing
  const seedSampleData = async () => {
    try {
      // Helper function to generate dates based on range
      const generateDates = (range: DateRange): string[] => {
        const today = new Date();
        const dates: string[] = [];
        
        switch (range) {
          case "week":
            // Last 7 days
            for (let i = 6; i >= 0; i--) {
              const date = new Date();
              date.setDate(today.getDate() - i);
              dates.push(date.toISOString().split('T')[0]);
            }
            break;
          case "month":
            // Last 30 days, but just 10 samples
            for (let i = 0; i < 10; i++) {
              const date = new Date();
              date.setDate(today.getDate() - Math.floor(i * 3));
              dates.push(date.toISOString().split('T')[0]);
            }
            break;
          case "quarter":
            // Last 3 months
            for (let i = 2; i >= 0; i--) {
              const date = new Date();
              date.setMonth(today.getMonth() - i);
              date.setDate(15); // Middle of month
              dates.push(date.toISOString().split('T')[0]);
            }
            break;
          case "year":
            // 4 quarters
            for (let i = 3; i >= 0; i--) {
              const date = new Date();
              date.setMonth(today.getMonth() - (i * 3));
              date.setDate(15); // Middle of quarter
              dates.push(date.toISOString().split('T')[0]);
            }
            break;
        }
        
        return dates;
      };
      
      const dates = generateDates(dateRange);
      
      // Clear existing data for this date range
      await supabase.from("production_reports").delete().eq("date_range", dateRange);
      await supabase.from("quality_metrics").delete().eq("date_range", dateRange);
      await supabase.from("material_usage").delete().eq("date_range", dateRange);
      await supabase.from("efficiency_reports").delete().eq("date_range", dateRange);
      await supabase.from("efficiency_kpis").delete().eq("date_range", dateRange);
      
      // Add production data
      const productionPromises = dates.map((date, index) => {
        return supabase.from("production_reports").insert({
          date,
          completed: Math.floor(Math.random() * 15) + 60,
          planned: 70,
          in_progress: Math.floor(Math.random() * 10) + 10,
          date_range: dateRange
        });
      });
      
      // Add quality metrics
      const qualityPromises = dates.map((date) => {
        return supabase.from("quality_metrics").insert({
          date,
          defect_rate: +(Math.random() * 1.5 + 0.5).toFixed(1),
          first_pass_yield: +(Math.random() * 3 + 96).toFixed(1),
          rework: +(Math.random() * 3 + 1).toFixed(1),
          date_range: dateRange
        });
      });
      
      // Add material usage data
      const materials = [
        { material: "Aluminum", value: 35, color: "#1e40af", category: "Materials" },
        { material: "Steel", value: 28, color: "#6b7280", category: "Materials" },
        { material: "Plastic", value: 15, color: "#f59e0b", category: "Materials" },
        { material: "Rubber", value: 12, color: "#1f2937", category: "Materials" },
        { material: "Electronics", value: 10, color: "#10b981", category: "Materials" }
      ];
      
      const waste = [
        { material: "Recycled", value: 65, color: "#22c55e", category: "Waste" },
        { material: "Reused", value: 18, color: "#3b82f6", category: "Waste" },
        { material: "Disposal", value: 17, color: "#ef4444", category: "Waste" }
      ];
      
      const materialPromises = [
        ...materials.map(item => {
          return supabase.from("material_usage").insert({
            ...item,
            date_range: dateRange
          });
        }),
        ...waste.map(item => {
          return supabase.from("material_usage").insert({
            ...item,
            date_range: dateRange
          });
        })
      ];
      
      // Add efficiency data
      const efficiencyPromises = dates.map((date) => {
        return supabase.from("efficiency_reports").insert({
          date,
          efficiency: Math.floor(Math.random() * 15) + 75,
          downtime: +(Math.random() * 10 + 3).toFixed(1),
          utilization: Math.floor(Math.random() * 12) + 75,
          date_range: dateRange
        });
      });
      
      // Add KPI data
      const kpis = [
        { subject: 'OEE', score: 85 },
        { subject: 'Throughput', score: 78 },
        { subject: 'Quality', score: 92 },
        { subject: 'Delivery', score: 88 },
        { subject: 'Safety', score: 95 },
        { subject: 'Cost', score: 82 }
      ];
      
      const kpiPromises = kpis.map(kpi => {
        return supabase.from("efficiency_kpis").insert({
          ...kpi,
          full_mark: 100,
          date_range: dateRange
        });
      });
      
      // Execute all promises
      await Promise.all([
        ...productionPromises,
        ...qualityPromises,
        ...materialPromises,
        ...efficiencyPromises,
        ...kpiPromises
      ]);
      
      // Invalidate queries to reload data
      queryClient.invalidateQueries({ queryKey: ["production-reports"] });
      queryClient.invalidateQueries({ queryKey: ["quality-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["material-usage"] });
      queryClient.invalidateQueries({ queryKey: ["efficiency-reports"] });
      queryClient.invalidateQueries({ queryKey: ["efficiency-kpis"] });
      
      toast.success("Sample reports data has been generated!");
    } catch (error) {
      console.error("Error seeding sample data:", error);
      toast.error("Failed to generate sample data");
    }
  };

  return {
    productionData,
    qualityData,
    materialUsageData,
    efficiencyData,
    efficiencyKPIs,
    isLoading: isLoadingProduction || isLoadingQuality || isLoadingMaterials || isLoadingEfficiency || isLoadingKPIs,
    hasErrors: !!productionError || !!qualityError || !!materialsError || !!efficiencyError || !!kpisError,
    seedSampleData
  };
};
