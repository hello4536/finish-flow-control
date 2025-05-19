
import { z } from "zod";

export const stainComponentSchema = z.object({
  name: z.string().min(1, "Component name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required")
});

export const stainSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  color: z.string().min(1, "Color is required"),
  notes: z.string().optional(),
  baseComponents: z.array(stainComponentSchema).optional().default([]),
  mixingInstructions: z.string().optional(),
  substrateCompatibility: z.array(z.string()).min(1, "Select at least one compatible substrate").optional(),
  applicationMethod: z.string().min(1, "Application method is required"),
  dryingTime: z.string().optional(),
  coatsRecommended: z.string().optional(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional()
});

export type StainFormValues = z.infer<typeof stainSchema>;

export const unitOptions = ["oz", "ml", "cups", "tbsp", "tsp", "parts", "grams", "liters", "%"];

export const applicationMethods = [
  "Brush", "Spray", "Wipe-on", "Dip", "Roll", "Padding", "Airless Spray", 
  "HVLP Spray", "Conventional Spray", "Rag Application"
];

export const substrates = [
  "Oak", "Maple", "Pine", "Cherry", "Walnut", "Birch", "Mahogany", 
  "Poplar", "Ash", "MDF", "Plywood", "Aluminum", "Steel", "Fiberglass", "Plastic"
];
