import { z } from "zod";

export const GymSchema = z.object({
  name: z.string().min(3, "Gym name is required"),

  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers and '-' allowed"),

  phone: z.string().min(10),

  email: z.string().email().optional().or(z.literal("")),

  address: z.string().min(5),
});

export type GymInput = z.infer<typeof GymSchema>;