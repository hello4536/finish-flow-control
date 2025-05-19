
import { z } from "zod";

export const paintColorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  hexCode: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid hex color code"),
  rgbValues: z.string().optional(),
  cmykValues: z.string().optional(),
  labValues: z.string().optional(),
  substrateType: z.string().optional(),
  applicationMethod: z.string().optional(),
  environmentalNotes: z.string().optional(),
  deltaE: z.string().optional(),
  temperature: z.string().optional(),
  humidity: z.string().optional(),
  boothLighting: z.string().optional(),
  notes: z.string().optional()
});

export type PaintColorFormValues = z.infer<typeof paintColorSchema>;
