import { z } from '@/app/utils/zod';

export const AssetTypeSchema = z.enum(['link', 'article', 'file', 'markdown']).openapi({
  description: 'Asset type that drives metadata interpretation',
  example: 'link',
});

export const CreateAssetRequestSchema = z
  .object({
    name: z.string().min(1).openapi({
      description: 'Display name for the asset',
      example: 'Intro to Linear Algebra',
    }),
    type: AssetTypeSchema,
    metadata: z.record(z.unknown()).default({}).openapi({
      description: 'Type-specific asset metadata',
      example: { url: 'https://example.com/lesson' },
    }),
  })
  .openapi({
    title: 'CreateAssetRequest',
  });

export type CreateAssetRequest = z.infer<typeof CreateAssetRequestSchema>;
