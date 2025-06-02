
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  bio: z.string().max(160).optional(),
  jobTitle: z.string().max(50).optional(),
  department: z.string().max(50).optional()
});

export const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  jobCompletionAlerts: z.boolean().default(true),
  materialAlerts: z.boolean().default(true),
  weeklyReports: z.boolean().default(true)
});

export const securityFormSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  loginMethod: z.enum(["password", "sso"], {
    required_error: "You need to select a login method."
  }),
  sessionTimeout: z.enum(["30min", "1hour", "4hours", "always"], {
    required_error: "You need to select a session timeout."
  })
});

export const appearanceFormSchema = z.object({
  language: z.enum(["en", "es", "fr"], {
    required_error: "Please select a language."
  }),
  compactMode: z.boolean().default(false)
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
export type SecurityFormValues = z.infer<typeof securityFormSchema>;
export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
