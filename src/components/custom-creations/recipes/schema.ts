
import { z } from "zod";

export const materialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Material name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required"),
});

export const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  materials: z.array(materialSchema).min(1, "At least one material is required"),
  instructions: z.string().min(1, "Instructions are required"),
  totalVolume: z.string().optional(),
  isSop: z.boolean().default(false),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;

export const unitOptions = ["oz", "ml", "cups", "tbsp", "tsp", "parts", "grams", "liters", "%"];
