import { z } from "zod";

export const MemberSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name is too long."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name is too long."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits."),

  membershipPlanId: z
    .string()
    .min(1, "Please select a membership plan."),

  height: z
    .number()
    .min(50, "Height seems too low.")
    .max(300, "Height seems too high.")
    .optional(),

  weight: z
    .number()
    .min(10, "Weight seems too low.")
    .max(500, "Weight seems too high.")
    .optional(),

  emergencyContactName: z
    .string()
    .trim()
    .max(100, "Emergency contact name is too long.")
    .optional(),

  emergencyContactPhone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Emergency contact phone must contain exactly 10 digits.")
    .optional()
    .or(z.literal("")),
});

export type MemberInput = z.infer<typeof MemberSchema>;
export type MemberFormInput = z.input<typeof MemberSchema>;