import { z } from '@/app/utils/zod';
import { AssetTypeSchema } from './create-asset.request';

export const CreateAssetResponseSchema = z
  .object({
    id: z.string().openapi({
      description: 'Unique identifier for the asset',
      example: 'ckv9f1p0w0000x8l0d6h0t1q2',
    }),
    name: z.string().min(1).openapi({
      description: 'Display name for the asset',
      example: 'Intro to Linear Algebra',
    }),
    type: AssetTypeSchema,
    createdById: z.string().nullable().openapi({
      description: 'User id that created the asset',
      example: 'ckv9f1p0w0000x8l0d6h0t1q2',
    }),
    createdAt: z.date().openapi({
      description: 'Creation timestamp of the asset',
      example: '2023-10-01T12:00:00Z',
    }),
    updatedById: z.string().nullable().openapi({
      description: 'User id that last updated the asset',
      example: 'ckv9f1p0w0000x8l0d6h0t1q2',
    }),
    updatedAt: z.date().openapi({
      description: 'Last update timestamp of the asset',
      example: '2023-10-01T12:00:00Z',
    }),
    metadata: z.record(z.unknown()).openapi({
      description: 'Type-specific asset metadata',
      example: { url: 'https://example.com/lesson' },
    }),
  })
  .openapi({
    title: 'CreateAssetResponse',
  });

export type CreateAssetResponse = z.infer<typeof CreateAssetResponseSchema>;
