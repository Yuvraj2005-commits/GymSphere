import { z } from "zod";

export const PlanSchema = z.object({
  name: z.string().min(2),

  description: z.string().optional(),

  durationDays: z.number().min(1),

  price: z.number().positive(),
});

export type PlanInput = z.infer<typeof PlanSchema>;