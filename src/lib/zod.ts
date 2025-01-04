import { z } from 'zod';

export const formRegisterSchema = z.object({
  name: z
    .string()
    .min(4, 'Mínimo 4 caracteres.')
    .max(100, 'Máximo 100 caracteres.')
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: 'El nombre no es válido',
    }),
  lastname: z
    .string()
    .min(2, 'Mínimo 4 caracteres.')
    .max(100, 'Máximo 100 caracteres.')
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: 'El apellido no es válido',
    }),
  email: z
    .string()
    .min(1, {
      message: 'Requerido',
    })
    .email('Debe ingresar un correo electrónico válido.'),
  password: z
    .string()
    .min(6, {
      message: 'Mínimo 6 caracteres',
    })
    .max(15, {
      message: 'Máximo 15 caracteres',
    }),
});

export const formLoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Requerido',
    })
    .email('Debe ingresar un correo electrónico válido.'),
  password: z
    .string()
    .min(6, {
      message: 'Mínimo 6 caracteres',
    })
    .max(15, {
      message: 'Máximo 15 caracteres',
    }),
});

export const formCategorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Requerido')
    .max(50, 'Máximo 50 caracteres.')
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: 'El nombre no es válido',
    }),
  description: z.string().max(100, 'Máximo 100 caracteres.').optional(),
});

export const formTaskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, 'Requerido')
    .max(50, 'Máximo 50 caracteres.')
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: 'El título no es válido',
    }),
  description: z.string().min(1, 'Requerido').max(100, 'Máximo 100 caracteres.'),
  category: z.string(),
  state: z
    .enum(['pending', 'in progress', 'review', 'completed', 'deleted'])
    .optional(),
});
