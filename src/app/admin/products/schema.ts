import { z } from 'zod';

export const createOrUpdateProductSchema = z.object({
  title: z.string().min(1, { message: 'Se requiere titulo' }),
  price: z.string().min(1, { message: 'Se requiere precio' }),
   maxQuantity: z.string().min(1, { message: 'Se requiere cantidad máxima' }),
  category: z.string().min(1, { message: 'Se requiere categoria' }),
  heroImage: z
  .any()
  .refine(
    file => Array.isArray(file) || file instanceof FileList ? file.length === 1 : false,
    'Se requiere una imagen'
  ),

  intent: z
    .enum(['create', 'update'], {
      message: 'La intención debe ser create o update',
    })
    .optional(),
  slug: z.string().optional(),
});

export type CreateOrUpdateProductSchema = z.infer<
  typeof createOrUpdateProductSchema
>;

export const createProductSchemaServer = z.object({
  title: z.string().min(1, { message: 'Se requiere título' }),
  price: z.number().positive({ message: 'Se requiere precio' }),
  maxQuantity: z.number().positive({ message: 'Se requiere cantidad máxima' }),
  category: z.number().positive({ message: 'Se requiere categoria' }),
  heroImage: z.string().url({ message: 'Se requiere imagen' }),
});

export type CreateProductSchemaServer = z.infer<
  typeof createProductSchemaServer
>;
