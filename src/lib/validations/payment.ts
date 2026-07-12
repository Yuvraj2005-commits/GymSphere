import { z } from "zod";

export const PaymentSchema = z.object({
  memberId: z
    .string()
    .min(1, "Please select a member."),

  amount: z
    .coerce
    .number()
    .positive("Amount must be greater than 0.")
    .max(1000000, "Amount is too large."),

  paymentMethod: z
    .string()
    .trim()
    .min(2, "Payment method is required.")
    .max(50, "Payment method is too long."),

  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;
export type PaymentFormInput = z.input<typeof PaymentSchema>;