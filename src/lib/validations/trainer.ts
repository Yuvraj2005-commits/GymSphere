import { z } from "zod";

export const TrainerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Trainer name must be at least 2 characters.")
    .max(100, "Trainer name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  specialization: z
    .string()
    .trim()
    .min(2, "Specialization must be at least 2 characters.")
    .max(100, "Specialization is too long."),
});

export type TrainerInput = z.infer<typeof TrainerSchema>;