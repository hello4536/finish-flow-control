
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { seedUsers } from "@/utils/seedUsers";
import { supabase } from "@/integrations/supabase/client";

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  seedDemoData: () => Promise<void>;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [isDevMode, setIsDevMode] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check if dev mode was previously enabled
  useEffect(() => {
    const storedDevMode = localStorage.getItem("finivi_dev_mode");
    if (storedDevMode === "true") {
      setIsDevMode(true);
      toast({
        title: "Developer Mode Active",
        description: "Authentication is bypassed. Mock data is available.",
        variant: "default",
        duration: 5000,
      });
    }
  }, []);

  const toggleDevMode = () => {
    const newDevMode = !isDevMode;
    setIsDevMode(newDevMode);
    
    if (newDevMode) {
      localStorage.setItem("finivi_dev_mode", "true");
      toast({
        title: "Developer Mode Activated",
        description: "You can now access all pages without logging in.",
        variant: "default",
      });
      
      // Navigate to dashboard when dev mode is activated
      setTimeout(() => navigate("/dashboard"), 500);
    } else {
      localStorage.removeItem("finivi_dev_mode");
      toast({
        title: "Developer Mode Deactivated",
        description: "Normal authentication is now required.",
        variant: "default",
      });
      
      // Navigate to home when dev mode is deactivated
      navigate("/");
    }
  };
  
  const seedDemoData = async () => {
    try {
      toast({
        title: "Seeding Demo Data",
        description: "Please wait while we populate the app with sample data...",
      });
      
      // Add users
      await seedUsers();
      
      // Seed inventory items
      const { data: inventoryItems, count: inventoryCount } = await supabase
        .from('inventory_items')
        .select('*', { count: 'exact' });
      
      if (!inventoryItems || inventoryItems.length === 0) {
        // Import and use the mock data from inventory
        const { mockInventoryItems, mockWarehouses } = await import('@/pages/inventory/data/mockData');
        
        // Seed inventory items
        for (const item of mockInventoryItems) {
          await supabase.from('inventory_items').insert({
            name: item.name,
            sku: item.sku ? item.sku : `SKU-${Date.now()}`,
            category: item.category,
            in_stock: item.in_stock || 0,
            allocated: item.allocated || 0,
            available: item.available || 0,
            location: item.location || "Main Storage",
            product_type: "Finished Good"
          });
        }
        
        // Seed warehouses
        for (const warehouse of mockWarehouses) {
          await supabase.from('warehouses').insert({
            name: warehouse.name,
            location: warehouse.location,
            capacity: warehouse.capacity,
            utilized: warehouse.utilized
          });
        }
      }
      
      // Seed workflows
      const { data: workflows } = await supabase
        .from('workflows')
        .select('*');
      
      if (!workflows || workflows.length === 0) {
        // Fix: Import the WorkflowSeeder module and call the seedWorkflows function directly
        const { seedWorkflows } = await import('@/pages/workflows/components/WorkflowSeeder');
        await seedWorkflows();
      }
      
      // Seed quality data
      const { data: qualityInspections } = await supabase
        .from('quality_inspections')
        .select('*');
      
      if (!qualityInspections || qualityInspections.length === 0) {
        const { useSampleQualityData } = await import('@/hooks/useSampleQualityData');
        const { seedSampleData } = useSampleQualityData();
        await seedSampleData();
      }
      
      // Seed compliance data
      const { data: certifications } = await supabase
        .from('certifications')
        .select('*');
      
      if (!certifications || certifications.length === 0) {
        const { useSampleComplianceData } = await import('@/hooks/useSampleComplianceData');
        const { seedSampleData } = useSampleComplianceData();
        await seedSampleData();
      }
      
      toast({
        title: "Demo Data Seeded",
        description: "The app has been populated with sample data.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error seeding demo data:", error);
      toast({
        title: "Error Seeding Data",
        description: error.message || "Failed to seed demo data",
        variant: "destructive",
      });
    }
  };

  const value = {
    isDevMode,
    toggleDevMode,
    seedDemoData,
  };

  return <DevModeContext.Provider value={value}>{children}</DevModeContext.Provider>;
}

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return context;
};
