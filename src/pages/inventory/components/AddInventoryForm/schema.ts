import { z } from "zod";

// Shared arrays for select options
export const inventoryCategories = ["Furniture", "Kitchen", "Office", "Basecoats", "Clearcoats", "Primers", "Masking Supplies", "Tools", "Abrasives", "PPE"];
export const hazardClasses = ["None", "Flammable", "Toxic", "Corrosive", "Oxidizing", "Compressed Gas", "Harmful", "Irritant"];
export const productTypes = ["Paint", "Primer", "Abrasive", "Clear Coat", "Filler", "Tape", "Sandpaper", "Respirator", "Tool", "Other"];

// Define form schema with validation
export const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  sku: z.string().min(2, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  in_stock: z.coerce.number().min(0, "Stock must be a positive number"),
  allocated: z.coerce.number().min(0, "Allocated must be a positive number"),
  location: z.string().min(1, "Location is required"),
  // New location reference
  location_id: z.string().nullish(),
  // Other fields
  product_type: z.string().nullish(),
  brand: z.string().nullish(),
  grit: z.coerce.number().min(0).nullish(),
  voc_content: z.coerce.number().min(0).nullish(),
  hazard_class: z.string().nullish(),
  expiration_date: z.date().nullish(),
  sds_link: z.string().url("Must be a valid URL").nullish().or(z.literal("")),
  is_consumable: z.boolean().default(true),
  min_quantity: z.coerce.number().min(0).default(5),
  storage_zone: z.string().nullish(),
  barcode: z.string().nullish()
});
