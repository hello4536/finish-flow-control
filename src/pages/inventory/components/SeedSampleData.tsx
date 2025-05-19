
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { mockInventoryItems, mockWarehouses } from "../data/mockData";

interface SeedSampleDataProps {
  onSuccess: () => void;
  inventoryCount: number;
}

const SeedSampleData: React.FC<SeedSampleDataProps> = ({ onSuccess, inventoryCount }) => {
  const { toast } = useToast();

  const seedSampleData = async () => {
    try {
      // Add some auto body shop specific data to the mock items
      const autoBodyItems = [
        {
          name: "Premium Basecoat - Deep Blue Metallic",
          sku: "BC-DB-M-" + Date.now(),
          category: "Basecoats",
          in_stock: 15,
          allocated: 3,
          available: 12,
          location: "Paint Room",
          product_type: "Paint",
          brand: "PPG",
          voc_content: 420,
          hazard_class: "Flammable",
          expiration_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          is_consumable: true,
          min_quantity: 5,
          storage_zone: "Flammable Cabinet A"
        },
        {
          name: "High-Build Primer - Gray",
          sku: "PR-HB-G-" + Date.now(),
          category: "Primers",
          in_stock: 8,
          allocated: 1,
          available: 7,
          location: "Paint Room",
          product_type: "Primer",
          brand: "Sherwin-Williams",
          voc_content: 250,
          hazard_class: "Harmful",
          expiration_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          is_consumable: true,
          min_quantity: 3,
          storage_zone: "Flammable Cabinet B"
        },
        {
          name: "Fine Grit Sandpaper - 2000",
          sku: "SP-FG-2000-" + Date.now(),
          category: "Abrasives",
          in_stock: 45,
          allocated: 0,
          available: 45,
          location: "Supply Room",
          product_type: "Sandpaper",
          brand: "3M",
          grit: 2000,
          hazard_class: "None",
          is_consumable: true,
          min_quantity: 10
        },
        {
          name: "HVLP Spray Gun - Premium",
          sku: "TL-HVLP-P-" + Date.now(),
          category: "Tools",
          in_stock: 3,
          allocated: 1,
          available: 2,
          location: "Tool Room",
          product_type: "Tool",
          brand: "SATA",
          hazard_class: "None",
          is_consumable: false,
          min_quantity: 1,
          storage_zone: "Tool Cabinet C"
        },
        {
          name: "Automotive Clear Coat",
          sku: "CC-AUTO-" + Date.now(),
          category: "Clearcoats",
          in_stock: 12,
          allocated: 2,
          available: 10,
          location: "Paint Room",
          product_type: "Clear Coat",
          brand: "PPG",
          voc_content: 350,
          hazard_class: "Flammable",
          expiration_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          is_consumable: true,
          min_quantity: 4,
          storage_zone: "Flammable Cabinet A",
          sds_link: "https://example.com/sds/clearcoat"
        }
      ];
      
      // Seed inventory items
      for (const item of [...mockInventoryItems, ...autoBodyItems]) {
        await supabase.from('inventory_items').insert({
          name: item.name,
          sku: item.sku ? item.sku : `SKU-${Date.now()}`,
          category: item.category,
          in_stock: item.in_stock || 0,
          allocated: item.allocated || 0,
          available: item.available || 0,
          location: item.location || "Main Storage",
          product_type: (item as any).product_type,
          brand: (item as any).brand,
          grit: (item as any).grit,
          voc_content: (item as any).voc_content,
          hazard_class: (item as any).hazard_class,
          expiration_date: (item as any).expiration_date,
          sds_link: (item as any).sds_link,
          is_consumable: (item as any).is_consumable !== undefined ? (item as any).is_consumable : true,
          min_quantity: (item as any).min_quantity || 5,
          storage_zone: (item as any).storage_zone
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
      
      toast({
        title: "Sample data added",
        description: "Sample inventory items and warehouses have been added to the database."
      });
      
      onSuccess();
    } catch (error: any) {
      console.error("Error seeding sample data:", error);
      toast({
        title: "Error adding sample data",
        description: error.message || "Failed to add sample data",
        variant: "destructive"
      });
    }
  };

  if (inventoryCount > 0) {
    return null;
  }

  return (
    <Button onClick={seedSampleData}>Seed Sample Data</Button>
  );
};

export default SeedSampleData;
