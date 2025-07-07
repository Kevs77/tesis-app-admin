import { z } from 'zod';

export const createCategorySchema = z.object({
  image: z.any().refine(file => file.length === 1, 'La imagen es obligatoria'),
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  intent: z
    .enum(['create', 'update'], {
      message: 'La intención debe ser create o update',
    })
    .optional(),
  slug: z.string().optional(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const createCategorySchemaServer = z.object({ 
  imageUrl: z.string().min(1, { message: 'La imagen es obligatoria' }),
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
});

export type CreateCategorySchemaServer = z.infer<
  typeof createCategorySchemaServer
>;

export const updateCategorySchema = z.object({
  imageUrl: z.string().min(1, { message: 'La imagen es obligatoria' }),
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  intent: z.enum(['create', 'update'], {
    message: 'La intención debe ser create o update',
  }),
  slug: z.string().min(1, { message: 'Slug es una cadena obligatoria' }),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
 