import { NextResponse } from 'next/server';
import { createDocument } from 'zod-openapi';
import { CreateAssetRequestSchema } from '../assets/create-asset.request';
import { CreateAssetResponseSchema } from '../assets/create-asset.response';

export async function GET() {
  const document = createDocument({
    openapi: '3.1.0',
    info: {
      title: 'delta api docs',
      version: '1.0.0',
    },
    paths: {
      '/api/assets': {
        post: {
          summary: 'Create asset',
          tags: ['Assets'],
          requestBody: {
            content: {
              'application/json': { schema: CreateAssetRequestSchema },
            },
          },
          responses: {
            '201': {
              description: '201 Created',
              content: {
                'application/json': {
                  schema: CreateAssetResponseSchema,
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(document);
}
