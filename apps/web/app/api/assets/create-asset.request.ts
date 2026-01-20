import { z } from '@/app/utils/zod';

export const AssetTypeSchema = z.enum(['link', 'article', 'file', 'markdown']).meta({
  description: 'Asset type that drives metadata interpretation',
  example: 'link',
});

export const CreateAssetRequestSchema = z
  .object({
    name: z.string().min(1).meta({
      description: 'Display name for the asset',
      example: 'Intro to Linear Algebra',
    }),
    type: AssetTypeSchema,
    metadata: z
      .record(z.string(), z.unknown())
      .default({})
      .meta({
        description: 'Type-specific asset metadata',
        example: { url: 'https://example.com/lesson' },
      }),
  })
  .meta({
    title: 'CreateAssetRequest',
  });

export type CreateAssetRequest = z.infer<typeof CreateAssetRequestSchema>;
