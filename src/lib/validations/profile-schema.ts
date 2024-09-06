import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, { message: 'Please provide a name for your token' }),
  bio: z.string(),
  image: z.any(
    z.instanceof(File).refine(file => file.size < 5 * 1024 * 1024, {
      message: 'File size must be less than 5MB'
    })
  )
});

export type ProfileInput = z.infer<typeof profileSchema>;

export const commentSchema = z.object({
  message: z.string()
});

export type CommentInput = z.infer<typeof commentSchema>;
