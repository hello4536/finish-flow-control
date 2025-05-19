
import { useState } from "react";
import { MaterialFormValues } from "./schema";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Supplier } from "@/types/materials";

interface UseAddMaterialProps {
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useAddMaterial = ({ onSuccess, onOpenChange }: UseAddMaterialProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: MaterialFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Insert the new material into the database
      const { data: materialData, error: materialError } = await supabase
        .from('materials')
        .insert([{
          name: values.name,
          type: values.type,
          quantity: values.quantity,
          unit: values.unit,
          status: values.status
        }])
        .select('id');

      if (materialError) throw materialError;
      
      // If a supplier was selected, create the relationship
      if (values.supplier_id && materialData && materialData[0]) {
        const { error: relationError } = await supabase
          .from('material_suppliers')
          .insert([{
            material_id: materialData[0].id,
            supplier_id: values.supplier_id
          }]);

        if (relationError) throw relationError;
      }

      toast({
        title: "Material added",
        description: `${values.name} has been added successfully.`
      });
      
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      console.error('Error adding material:', error);
      toast({
        title: "Error adding material",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
