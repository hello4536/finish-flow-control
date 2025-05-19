
import { z } from "zod";

export interface IngredientInput {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  cookingTime?: string;
  ingredients: IngredientInput[];
  instructions: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  cookingTime: z.string().optional(),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Ingredient name is required"),
      amount: z.string(),
      unit: z.string(),
    })
  ).min(1, "At least one ingredient is required"),
  instructions: z.string().min(1, "Instructions are required"),
  isFavorite: z.boolean().default(false)
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;

export const unitOptions = ["oz", "ml", "cups", "tbsp", "tsp", "parts", "grams", "liters", "%"];
