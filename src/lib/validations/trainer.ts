import { z } from "zod";

export const TrainerSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.string().email("Invalid email"),

  specialization: z.string().min(2, "Specialization is required"),
});

export type TrainerInput = z.infer<typeof TrainerSchema>;