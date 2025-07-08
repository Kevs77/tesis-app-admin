

import { z } from 'zod'

// Esquema para cliente
export const createOrUpdateUserSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: 'Se requiere nombre' }),
    ap_paterno: z.string().min(1, { message: 'Se requiere apellido paterno' }),
    ap_materno: z.string().min(1, { message: 'Se requiere apellido materno' }),
    email: z.string().min(1, { message: 'Se requiere email' }).email({ message: 'Debe ser un email válido' }),
    ci: z.string().min(1, { message: 'Se requiere CI' }),
    expedido_en: z.string().min(1, { message: 'Se requiere lugar de expedición' }),
    fecha_nacimiento: z.string().min(1, { message: 'Se requiere fecha de nacimiento' }),
    phone: z.string().min(1, { message: 'Se requiere número de teléfono' }),
    address: z.string().min(1, { message: 'Se requiere dirección' }),
    avatar_url: z.string().url({ message: 'Debe ser una URL válida' }).optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    type: z.enum(['ADMIN', 'PROVEEDOR', 'USER'], {
      message: 'Debe seleccionar un tipo de usuario válido',
    }),
    intent: z.enum(['create', 'update']),
  })
  .superRefine((data, ctx) => {
    if (data.intent === 'create') {
      if (!data.password || data.password.length < 8) {
        ctx.addIssue({
          path: ['password'],
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 8,
          inclusive: true,
          message: 'La contraseña debe tener al menos 8 caracteres',
        })
      }

      if (!data.confirmPassword || data.confirmPassword.length < 8) {
        ctx.addIssue({
          path: ['confirmPassword'],
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 8,
          inclusive: true,
          message: 'Confirma la contraseña',
        })
      }

      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          path: ['confirmPassword'],
          code: z.ZodIssueCode.custom,
          message: 'Las contraseñas no coinciden',
        })
      }
    }
  })

export type CreateOrUpdateUserSchema = z.infer<typeof createOrUpdateUserSchema>
// Esquema para servidor
export const createUserSchemaServer = z.object({
  name: z.string().min(1),
  ap_paterno: z.string().min(1),
  ap_materno: z.string().min(1),
  email: z.string().email(),
  ci: z.string().min(1),
  expedido_en: z.string().min(1),
  fecha_nacimiento: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  password: z.string().min(8),
  type: z.enum(['admin', 'proveedor', 'vendedor']),
})

export type CreateUserSchemaServer = z.infer<typeof createUserSchemaServer>
