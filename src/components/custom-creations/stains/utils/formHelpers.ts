
import { StainComponent } from "@/hooks/stains/types";
import { StainFormValues } from "../validation/stainSchema";

export const validateAndProcessFormData = (values: StainFormValues, selectedSubstrates: string[]) => {
  // Validate baseComponents to ensure all required fields are filled
  const validComponents = (values.baseComponents || [])
    .filter(component => 
      component.name && 
      component.quantity && 
      component.unit
    ) as StainComponent[];

  // Add timestamp and user info
  return {
    ...values,
    createdBy: "Current User", // This would be replaced with actual user info in a real auth system
    createdAt: new Date(),
    // Ensure required fields are present
    name: values.name,
    brand: values.brand,
    color: values.color,
    // Use only valid components
    baseComponents: validComponents.length > 0 ? validComponents : undefined,
    substrateCompatibility: selectedSubstrates.length > 0 ? selectedSubstrates : undefined
  };
};
