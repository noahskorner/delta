import { z } from '@/app/utils/zod';

export const CreateCourseResponseSchema = z
  .object({
    id: z.string().openapi({
      description: 'Unique identifier for the course',
      example: 'ckv9f1p0w0000x8l0d6h0t1q2',
    }),
    name: z.string().min(1).openapi({
      description: 'Course name',
      example: 'Algebra I',
    }),
    subject: z.string().min(1).openapi({
      description: 'Course subject or category',
      example: 'Mathematics',
    }),
    createdById: z.string().openapi({
      description: 'User id that created the course',
      example: 'ckv9f1p0w0000x8l0d6h0t1q2',
    }),
    createdAt: z.date().openapi({
      description: 'Creation timestamp of the course',
      example: '2023-10-01T12:00:00Z',
    }),
    updatedById: z.string().openapi({
      description: 'User id that last updated the course',
      example: 'ckv9f1p0w0000x8l0d6h0t1q2',
    }),
    updatedAt: z.date().openapi({
      description: 'Last update timestamp of the course',
      example: '2023-10-01T12:00:00Z',
    }),
  })
  .openapi({
    title: 'CreateCourseResponse',
  });

export const ErrorResponseSchema = z
  .object({
    error: z.string().openapi({
      description: 'Error message',
      example: 'Unauthorized',
    }),
  })
  .openapi({
    title: 'ErrorResponse',
  });

export type CreateCourseResponse = z.infer<typeof CreateCourseResponseSchema>;
