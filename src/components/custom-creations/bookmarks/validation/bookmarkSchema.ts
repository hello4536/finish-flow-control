
import { z } from "zod";

export const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  category: z.string().default("general"),
  notes: z.string().optional(),
});

export type BookmarkFormValues = z.infer<typeof bookmarkSchema>;
