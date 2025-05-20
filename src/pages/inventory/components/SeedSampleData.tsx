
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { mockInventoryItems, mockWarehouses } from "../data/mockData";
import { Database } from "lucide-react";

interface SeedSampleDataProps {
  onSuccess: () => void;
  inventoryCount: number;
}

const SeedSampleData: React.FC<SeedSampleDataProps> = ({
  onSuccess,
  inventoryCount
}) => {
  // Always return null to not render the component
  return null;
};

export default SeedSampleData;
