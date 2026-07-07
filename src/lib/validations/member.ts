import { z } from "zod";

export const MemberSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),

  email: z.string().email().optional().or(z.literal("")),

  phone: z.string().min(10),

  membershipPlanId: z.string(),

  height: z.number().optional(),

  weight: z.number().optional(),

  emergencyContactName: z.string().optional(),

  emergencyContactPhone: z.string().optional(),
});

export type MemberInput = z.infer<typeof MemberSchema>;
