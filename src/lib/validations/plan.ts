import { z } from "zod";

export const PlanSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Plan name must be at least 2 characters.")
    .max(100, "Plan name is too long."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  durationDays: z.coerce
    .number()
    .min(1, "Duration must be at least 1 day.")
    .max(3650, "Duration cannot exceed 10 years."),

  price: z.coerce
    .number()
    .positive("Price must be greater than 0.")
    .max(1000000, "Price is too high."),
});

export type PlanInput = z.infer<typeof PlanSchema>;
export type PlanFormInput = z.input<typeof PlanSchema>;