import { z } from 'zod';

const socialLinksSchema = z.object({
  website: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional()
});

export const createTokenSchema = z.object({
  name: z.string().min(1, { message: 'Please provide a name for your token' }),
  symbol: z.string().min(1, { message: 'Please provide a symbol for your token' }),
  totalSupply: z.string().optional(),
  image: z
    .any(
      z.instanceof(File).refine(file => file.size < 5 * 1024 * 1024, {
        message: 'File size must be less than 5MB'
      })
    )
    .optional(),
  logoUrl: z.string(),
  contractAddress: z.string(),
  description: z.string(),
  socialLinks: socialLinksSchema
});

export type CreateTokenInput = z.infer<typeof createTokenSchema>;
