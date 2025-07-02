// src/domain/schemas/taskSchema.js
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  completed: z.boolean().optional()
});
