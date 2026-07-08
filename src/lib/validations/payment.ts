import { z } from "zod";

export const PaymentSchema = z.object({
  memberId: z.string(),

  amount: z.coerce.number().positive(),

  paymentMethod: z.string().min(2),

  notes: z.string().optional(),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;