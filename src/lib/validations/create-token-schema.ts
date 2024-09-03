import { z } from 'zod';

export const createTokenSchema = z.object({
  name: z.string().min(1, { message: 'Please provide a name for your token' }),
  symbol: z.string({ required_error: 'Please enter your message' }),
  description: z.string(),
  image: z.any(
    z.instanceof(File).refine(file => file.size < 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB'
    })
  ),
  liquidity: z.number().optional().nullish()
});

export type CreateTokenInput = z.infer<typeof createTokenSchema>;
