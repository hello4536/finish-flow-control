
import { z } from "zod";

// Define the form schema
export const materialSchema = z.object({
  name: z.string().min(1, "Material name is required"),
  type: z.string().min(1, "Material type is required"),
  quantity: z.coerce.number().min(0, "Quantity must be a positive number"),
  unit: z.string().min(1, "Unit is required"),
  status: z.enum(["In Stock", "Low Stock", "Critical Low", "Out of Stock"]),
  supplier_id: z.string().optional()
});

export type MaterialFormValues = z.infer<typeof materialSchema>;

export const defaultValues: MaterialFormValues = {
  name: "",
  type: "",
  quantity: 0,
  unit: "",
  status: "In Stock",
  supplier_id: undefined
};
