import { z } from "zod";

export const swapTokenSchema = z.object({
    amount: z.number()
});

export type SwapTokenInput = z.infer<typeof swapTokenSchema>;